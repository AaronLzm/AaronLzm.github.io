---
title: Chapter_12
category: Causal inference
tags: [DeepSeek-R1-0528-2nd,response_md]

---
<think>
We are summarizing Chapter 12 of the provided PDF. The chapter is titled "IP WEIGHTING AND MARGINAL STRUCTURAL MODELS". We will break it down by sections and subsections as per the provided text.

The chapter has the following sections:
12.1 The causal question
12.2 Estimating IP weights via modeling
12.3 Stabilized IP weights
12.4 Marginal structural models
12.5 Effect modification and marginal structural models
12.6 Censoring and missing data

We also have a Fine Point (12.1) and a Technical Point (12.1) that are part of the text.

We'll structure the summary according to the given format, including:
- Chapter and section titles
- Technical Points (core theories, key formulas, important concepts, application scenarios)
- Fine Points (specific cases, auxiliary information, background)

Note: The text includes tables and images, but we are only provided with the extracted text and one image (page_6_img_1.jpeg). Since we cannot view the image, we will note its presence and rely on the surrounding text.

Let's proceed step by step.
</think>
### Chapter 12: IP Weighting and Marginal Structural Models

#### 12.1 The Causal Question  
**技术重点 (Technical Points):**  
- **核心理论**: 估计吸烟戒烟（处理变量 \(A\)）对体重增加（结果变量 \(Y\)) 的平均因果效应 \(E[Y^{a=1}] - E[Y^{a=0}]\)。  
- **关键公式**:  
  - 观测关联差异: \(E[Y|A=1] - E[Y|A=0] = 2.5\)（95% CI: 1.7, 3.4）  
  - 因果效应定义: \(E[Y^{a=1}] - E[Y^{a=0}]\)（标准化均值差）  
- **重要概念**:  
  - 混杂因素（如年龄、性别、种族等）需调整，因戒烟组与非戒烟组基线特征不均衡（见表12.1）。  
- **应用场景**: 使用NHEFS观察性研究数据（1566名吸烟者），调整9个基线协变量（\(L\)）：性别、年龄、种族、教育、吸烟强度/时长、体力活动、体重。  

**细节要点 (Fine Points):**  
- **案例分析**: 戒烟组平均增重4.5kg，非戒烟组2.0kg；但年龄等混杂导致观测关联（2.5kg）可能低估真实因果效应（年龄与增重负相关）。  
- **辅助信息**: 数据来自NHEFS（美国国家健康与营养调查随访研究），公开数据集详见[wwwn.cdc.gov/nchs/nhanes/nhefs/](https://wwwn.cdc.gov/nchs/nhanes/nhefs/)。  
- **相关背景**: 表12.1显示戒烟组年龄更大（46.2岁 vs. 42.8岁），教育程度更高（大学比例15.4% vs. 9.9%）。  

---

#### 12.2 Estimating IP Weights via Modeling  
**技术重点 (Technical Points):**  
- **核心理论**: IP加权创建伪总体，消除 \(L \rightarrow A\) 的路径，使 \(A\) 与 \(L\) 独立，且 \(E_{\text{ps}}[Y|A=a] = \sum_l E[Y|A=a,L=l] \Pr[L=l]\)。  
- **关键公式**:  
  - IP权重: \(W^A = 1 / f(A|L)\)  
  - 二值处理下: \(f(A|L) = \Pr[A=1|L]\)（倾向评分）  
- **重要概念**:  
  - 高维数据需参数化建模 \(\Pr[A=1|L]\)（逻辑回归含线性/二次项）。  
  - 伪总体中关联即因果（若条件可交换性 \(Y^a \perp\!\!\!\perp A | L\) 成立）。  
- **应用场景**: 加权最小二乘拟合饱和模型 \(E[Y|A] = \theta_0 + \theta_1 A\)，估计 \(\hat{\theta}_1 = 3.4\)（95% CI: 2.4, 4.5）。  

**细节要点 (Fine Points):**  
- **辅助信息**:  
  - 非参数估计不可行（协变量组合超200万种，样本量1566）。  
  - 使用稳健方差估计（保守置信区间）。  
- **相关背景**: 估计权重 \(W^A\) 范围1.05–16.7，均值2.0（Program 12.2）。  

---

#### 12.3 Stabilized IP Weights  
**技术重点 (Technical Points):**  
- **核心理论**: 稳定权重 \(SW^A = f(A) / f(A|L)\) 保持伪总体规模不变（均值=1），统计效率更高。  
- **关键公式**:  
  - \(f(A)\) 为边际处理概率（非参数估计）。  
- **重要概念**:  
  - 与未稳定权重 \(W^A\) 因果估计相同（\(\hat{\theta}_1 = 3.4\)），但置信区间更窄。  
- **应用场景**: 饱和模型下二者等价；非饱和模型（如连续处理）优先用 \(SW^A\)。  

**细节要点 (Fine Points):**  
- **辅助信息**: \(SW^A\) 范围0.33–4.30，均值1.00（Program 12.3）。  
- **正性检查**:  
  - 随机违反（如66岁白人女性戒烟概率=0）需参数模型插值（假设非正性随机）。  
  - 结构违反（如"休假"无法暴露）需限制推断范围。  

---

#### 12.4 Marginal Structural Models  
**技术重点 (Technical Points):**  
- **核心理论**: 反事实结局的边际结构模型（MSM）直接建模 \(E[Y^a]\)。  
- **关键公式**:  
  - 二值处理: \(E[Y^a] = \beta_0 + \beta_1 a\)（饱和模型，\(\beta_1 = E[Y^{a=1}] - E[Y^{a=0}]\)）  
  - 连续处理（吸烟强度变化）: \(E[Y^a] = \beta_0 + \beta_1 a + \beta_2 a^2\)  
- **重要概念**:  
  - 通过IP加权伪总体拟合关联模型估计参数（如 \(\hat{\theta}_1 = \hat{\beta}_1\)）。  
  - 零假设下模型永不错定（零保护性）。  
- **应用场景**:  
  - 连续处理需假设 \(f(A|L)\) 分布（如正态），估计 \(E[Y^{a=20}] - E[Y^{a=0}] = 1.10\) kg（Program 12.4）。  
  - 二值结局MSM: \(\text{logit} \Pr[D^a=1] = \alpha_0 + \alpha_1 a\)（OR=1.0, 95% CI: 0.8–1.4）。  

**细节要点 (Fine Points):**  
- **辅助信息**: 连续处理密度估计敏感（需谨慎验证模型）。  

---

#### 12.5 Effect Modification and MSMs  
**技术重点 (Technical Points):**  
- **核心理论**: MSM中加入协变量 \(V\)（如性别）评估效应修饰:  
  \[
  E[Y^a | V] = \beta_0 + \beta_1 a + \beta_2 V a + \beta_3 V
  \]  
- **重要概念**:  
  - \(\beta_2 \neq 0\) 表示加法效应修饰。  
  - 使用 \(SW^A(V) = f(A|V)/f(A|L)\) 提高效率。  
- **应用场景**: 性别无显著修饰（\(\hat{\theta}_2\) 95% CI: -2.2, 1.9）。  

**细节要点 (Fine Points):**  
- **辅助信息**: 包含所有 \(L\) 的MSM退化为传统回归模型（"faux MSM"）。  

---

#### 12.6 Censoring and Missing Data  
**技术重点 (Technical Points):**  
- **核心理论**: 删失（\(C=1\)）引入选择偏倚，需IP加权调整:  
  - 权重 \(W^{A,C} = W^A \times W^C\)，其中 \(W^C = 1 / \Pr[C=0|L,A]\)。  
  - 稳定权重 \(SW^{A,C} = SW^A \times SW^C\)（\(SW^C = \Pr[C=0|A] / \Pr[C=0|L,A]\)）。  
- **关键公式**: 目标参数 \(E[Y^{a,c=0}]\)（无人删失时的因果效应）。  
- **应用场景**: 估计 \(\hat{\theta}_1 = 3.5\) kg（95% CI: 2.5, 4.5），与未调整相近（Program 12.7）。  

**细节要点 (Fine Points):**  
- **选择偏倚来源**: 删失与 \(A\) 相关（戒烟组删失率5.8% vs. 非戒烟组3.2%），且 \(L\)（如基线体重）预测 \(C\)。  
- **辅助信息**: \(SW^{A,C}\) 范围0.35–4.09，均值1.00。  

---

### 逻辑关联性  
本章延续第2章IP加权基础，引入参数模型处理高维数据，逐步扩展至连续处理、效应修饰和删失调整。核心是通过伪总体实现"关联即因果"，为后续标准化方法（第13章）铺垫。所有分析基于NHEFS数据，强调模型假设（如正性、交换性）的实践挑战。