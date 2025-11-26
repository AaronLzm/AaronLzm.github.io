---
date: 2025-09-17 11:19:05
title: Chapter_12
category: Causal inference
tags: [DeepSeek-R1-0528,response_md]

---
<think>
We are summarizing Chapter 12 of the book "Causal Inference: What If" by Hernán and Robins. The chapter is titled "IP Weighting and Marginal Structural Models". The chapter is divided into several sections. We will summarize each section in order, extracting technical points and fine points as required.

The chapter uses the example of estimating the average causal effect of smoking cessation (treatment A) on weight gain (outcome Y) using data from the NHEFS (National Health and Nutrition Examination Survey Data I Epidemiologic Follow-up Study).

We will follow the structure of the chapter:

12.1 The causal question
12.2 Estimating IP weights via modeling
12.3 Stabilized IP weights
12.4 Marginal structural models
12.5 Effect modification and marginal structural models
12.6 Censoring and missing data

We note that the chapter includes a Fine Point (12.1 and 12.2) and a Technical Point (12.1 and 12.2). We will summarize these as they appear.

Let's begin with section 12.1.
</think>
### Chapter 12: IP Weighting and Marginal Structural Models

#### 12.1 The causal question  
**技术重点 (Technical Points)**:
- **核心理论**: 因果推断的目标是估计吸烟戒烟（处理变量 \(A\)，1=戒烟，0=未戒烟）对体重增加（结果变量 \(Y\)，单位kg）的平均因果效应（ACE），定义为反事实均值之差：  
  $$E[Y^{a=1}] - E[Y^{a=0}]$$  
  其中 \(E[Y^{a=1}]\) 表示若全部人群戒烟时的平均增重，\(E[Y^{a=0}]\) 表示若全部人群未戒烟时的平均增重。
- **关键公式**: 观测到的关联性差异 \(E[Y|A=1] - E[Y|A=0] = 2.5\) kg（95% CI: 1.7, 3.4）不等于因果效应，因存在混杂（如年龄、性别等）。
- **重要概念**: 
  - 混杂变量（Confounders）是既影响处理 \(A\) 又影响结果 \(Y\) 的变量（如年龄：戒烟者平均比非戒烟者年长4岁，且年龄独立影响体重）。
  - 需调整的混杂变量 \(L\)：性别（0:男,1:女）、年龄（岁）、种族（0:白人,1:其他）、教育（5级）、吸烟强度（每日支数）、吸烟年限、日常活动量（3级）、运动量（3级）、基线体重（kg）——共9维变量。
- **应用场景**: 使用NHEFS观测数据估计戒烟对体重增加的因果效应，需通过IP加权调整混杂。

**细节要点 (Fine Points)**:
- **案例分析**: 基于1566名25-74岁吸烟者的数据（基线：1971-75年；随访：1982年）。戒烟组平均增重4.5kg，非戒烟组2.0kg。
- **辅助信息**: 表12.1显示戒烟组与非戒烟组基线特征差异（如戒烟组年龄更大、男性比例更高）。
- **相关背景**: 观测性研究中，直接比较处理组与对照组会导致偏倚，因两组基线特征不均衡（Fine Point 12.1指出可能存在选择偏倚，但本章暂忽略）。

---

#### 12.2 Estimating IP weights via modeling  
**技术重点 (Technical Points)**:
- **核心理论**: IP加权通过权重 \(W^A = 1 / f(A|L)\) 创建伪总体（pseudo-population），其中 \(A\) 与 \(L\) 独立，且 \(E_{ps}[Y|A=a]\) 等于实际总体的标准化均值 \(\sum_l E[Y|A=a,L=l] \Pr[L=l]\)。若条件可交换性 \(Y^a \perp\!\!\!\perp A | L\) 成立，则伪总体中关联即因果。
- **关键公式**: 
  - 二分处理 \(A\) 的倾向评分：\(\Pr[A=1|L]\)（通过Logistic回归估计）。
  - 饱和线性模型：\(E[Y|A] = \theta_0 + \theta_1 A\)，加权最小二乘估计（权重 \(\hat{W}^A\))。
- **重要概念**: 
  - 高维数据下需参数化估计 \(\Pr[A=1|L]\)（非参数方法因"维数诅咒"不可行）。
  - 使用Hajek估计量（Technical Point 12.1）提高稳定性：  
    $$\hat{E}[Y^a] = \frac{\sum_i \hat{W}_i^A I(A_i=a) Y_i}{\sum_i \hat{W}_i^A I(A_i=a)}$$
- **应用场景**: 通过Logistic回归拟合 \(\Pr[A=1|L]\)（含年龄、体重等变量的线性/二次项），计算权重后拟合加权线性模型。

**细节要点 (Fine Points)**:
- **案例分析**: 估计 \(\hat{\theta}_1 = 3.4\) kg（95% CI: 2.4, 4.5），即戒烟平均增重3.4kg。
- **辅助信息**: 
  - 权重范围：1.05–16.7，均值2.00。
  - 方差估计：使用稳健方差（保守置信区间）或自助法（bootstrapping）。
- **相关背景**: 若 \(\Pr[A=1|L]\) 模型错误指定，估计将偏倚（Technical Point 12.1讨论非正概率下的估计问题）。

---

#### 12.3 Stabilized IP weights  
**技术重点 (Technical Points)**:
- **核心理论**: 稳定化权重 \(SW^A = f(A) / f(A|L)\) 创建相同大小的伪总体（权重均值=1），其因果效应估计与非稳定化权重 \(W^A\) 一致，但置信区间更窄（尤其当加权模型非饱和时）。
- **关键公式**: 
  - 分子 \(f(A)\) 通过边际概率估计（如 \(\Pr[A=1] = 403/1566\))。
  - 二分处理下，\(SW^A = \frac{\Pr[A=1]}{\Pr[A=1|L]}\)（戒烟组）或 \(\frac{\Pr[A=0]}{1 - \Pr[A=1|L]}\)（非戒烟组）。
- **重要概念**: 稳定化权重减少权重变异性，提高统计效率。
- **应用场景**: 同12.2节，估计 \(\hat{\theta}_1 = 3.4\) kg（95% CI: 2.4, 4.5），权重范围0.33–4.30，均值1.00。

**细节要点 (Fine Points)**:
- **辅助信息**: 需检查权重均值是否为1（偏离提示模型错误或非正概率）。
- **案例分析**: Fine Point 12.2讨论非正概率问题：
  - **结构非正**（Structural nonpositivity）：某些 \(L\) 下处理概率为0（如66岁白人女性戒烟概率为0），需限制推断范围。
  - **随机非正**（Random nonpositivity）：有限样本导致的零单元（通过参数模型插值处理）。

---

#### 12.4 Marginal structural models  
**技术重点 (Technical Points)**:
- **核心理论**: 边际结构模型（MSM）直接建模反事实均值 \(E[Y^a]\)，如：
  - 二分处理：\(E[Y^a] = \beta_0 + \beta_1 a\)（饱和模型）。
  - 连续处理（如吸烟强度变化量 \(A\)）：\(E[Y^a] = \beta_0 + \beta_1 a + \beta_2 a^2\)（非饱和）。
- **关键公式**: 
  - 因果效应：\(E[Y^{a=20}] - E[Y^{a=0}] = 20\beta_1 + 400\beta_2\)。
  - 估计：用稳定化权重 \(SW^A\) 创建伪总体，拟合关联模型 \(E[Y|A] = \theta_0 + \theta_1 A + \theta_2 A^2\)。
- **重要概念**: 
  - 连续处理需估计条件密度 \(f(A|L)\)（假设正态分布，用线性回归建模）。
  - MSM具有零保护性（Null preservation）：无因果效应时模型不会误设。
- **应用场景**: 
  - 连续处理示例：\(\hat{\beta}_0 = 2.005, \hat{\beta}_1 = -0.109, \hat{\beta}_2 = 0.003\)，吸烟强度增加20支/日的效应为1.10kg。
  - 二分结局（如死亡风险）：Logistic MSM \(\text{logit} \Pr[D^a=1] = \alpha_0 + \alpha_1 a\)，估计OR=1.0（95% CI: 0.8, 1.4）。

**细节要点 (Fine Points)**:
- **辅助信息**: 连续处理的权重估计对模型敏感（需稳健方法）。
- **相关背景**: 高维连续处理下，\(f(A|L)\) 估计不稳定（研究前沿：Imai & Ratkovic 2015）。

---

#### 12.5 Effect modification and marginal structural models  
**技术重点 (Technical Points)**:
- **核心理论**: 在MSM中加入协变量 \(V\)（如性别）评估效应修饰：
  $$E[Y^a | V] = \beta_0 + \beta_1 a + \beta_2 V a + \beta_3 V$$
  - \(\beta_2 \neq 0\) 表示加法效应修饰。
- **关键公式**: 使用稳定化权重 \(SW^A(V) = f(A|V) / f(A|L)\) 提高效率（缩小CI）。
- **重要概念**: 
  - \(V\) 需包含在混杂集 \(L\) 中以保证估计效率。
  - 若MSM包含所有 \(L\)（"伪MSM"），则无需加权（等价于结局回归调整）。
- **应用场景**: 性别修饰效应估计 \(\hat{\theta}_2 = -0.15\)（95% CI: -2.2, 1.9），无修饰证据。

**细节要点 (Fine Points)**:
- **辅助信息**: 效应修饰与混杂调整逻辑不同：前者通过乘积项，后者通过IP加权。

---

#### 12.6 Censoring and missing data  
**技术重点 (Technical Points)**:
- **核心理论**: 若结局存在删失（\(C=1\) 缺失，\(C=0\) 观测），需使用联合处理 \((A,C)\) 的IP权重 \(W^{A,C} = W^A \times W^C\) 调整混杂和选择偏倚：
  - \(W^C = 1 / \Pr[C=0|L,A]\)（非稳定化），或 \(SW^C = \Pr[C=0|A] / \Pr[C=0|L,A]\)（稳定化）。
- **关键公式**: 目标参数 \(E[Y^{a,c=0}]\)（无人删失时的反事实均值）。
- **重要概念**: 需满足联合可交换性 \(Y^{a,c=0} \perp\!\!\!\perp (A,C) | L\)、正概率和一致性。
- **应用场景**: 估计删失权重后，\(\hat{\theta}_1 = 3.5\) kg（95% CI: 2.5, 4.5），与未调整结果相似。

**细节要点 (Fine Points)**:
- **案例分析**: 删失率：戒烟组5.8% vs. 非戒烟组3.2%；删失者基线体重更高（76.6kg vs. 70.8kg）。
- **辅助信息**: 稳定化权重 \(SW^{A,C}\) 范围0.35–4.09，均值1.00（Technical Point 12.2讨论稳定化权重的一般形式）。

---

### 逻辑连贯性说明  
本章延续第2章IP加权基础，扩展至高维数据和连续处理场景，并引入边际结构模型（MSM）统一因果效应表达。12.6节衔接第8章选择偏倚问题，为第III部分时变处理铺垫。所有方法基于NHEFS案例，强调从非参数到参数化建模的必要性。