---
date: 2025-09-17 11:19:05
title: Chapter_12
category: Causal inference
tags: [DeepSeek-R1-0528-1st,response_md]

---
<think>
Hmm, the user has shared a detailed chapter excerpt on IP weighting and marginal structural models from "Causal Inference: What If". As a Nobel Prize-winning researcher and technical expert, I need to meticulously extract all technical points while preserving the original meaning. The chapter covers several key sections: causal question formulation, IP weight estimation, stabilized weights, marginal structural models for different treatment types, effect modification, and handling censoring.

First, I'll analyze the causal question about smoking cessation's effect on weight gain using NHEFS data. The unadjusted association shows 2.5kg greater weight gain in quitters, but confounding is evident from Table 12.1 - quitters are older and differ in other characteristics. The authors identify 9 confounders requiring adjustment.

For IP weighting implementation, I note the transition from nonparametric methods in Chapter 2 to parametric modeling for high-dimensional data. The logistic model for treatment probability includes linear/quadratic terms for continuous covariates. The technical details about Horvitz-Thompson vs Hajek estimators are particularly important for accurate interpretation.

The stabilized weights section reveals an elegant solution to variance inflation. The comparison of weight ranges (1.05-16.7 for nonstabilized vs 0.33-4.30 for stabilized) visually demonstrates the efficiency gain. The distinction between structural and random positivity violations in Fine Point 12.2 deserves special attention in the summary.

When extending to continuous treatments, the challenges in density estimation become apparent. The parabolic dose-response example with smoking intensity change illustrates how model specification impacts effect estimates (β0=2.005, β1=-0.109, β2=0.003). The effect modification analysis adds nuance - no evidence of sex interaction (95% CI: -2.2,1.9) - while emphasizing that V should be included in L regardless.

Finally, the censoring discussion introduces joint IP weights (WA×WC) to address selection bias. The subtle difference between WC and SWC in pseudo-population construction is crucial: one eliminates censoring, the other makes it random. The near-identical results (3.4kg vs 3.5kg) suggest minimal selection bias here.

Throughout, I maintain strict adherence to the text, ensuring mathematical formulas like E[Y|A]=θ0+θ1A are preserved in LaTeX, and technical terms like "positivity" remain untranslated while explanations stay in Chinese. The conclusion will synthesize how IP weighting methods enable causal estimation under identifiability conditions.
</think>
### 第12章：IP加权与边际结构模型  
**核心目标**：使用IP加权法估计戒烟（处理变量 \(A\)）对体重增加（结果变量 \(Y\)）的平均因果效应 \(E[Y^{a=1}] - E[Y^{a=0}]\)，基于NHEFS观察性研究数据（\(n=1566\)）。

---

#### 12.1 因果问题  
- **研究设计**：  
  - 处理 \(A=1\)（戒烟组）与 \(A=0\)（非戒烟组），结果 \(Y\) 为随访（1982年）与基线（1971-75年）体重差（kg）。  
  - 未调整的关联性差异：\(\hat{E}[Y|A=1] - \hat{E}[Y|A=0] = 4.5 - 2.0 = 2.5 \, \text{kg}\)（95% CI: 1.7, 3.4）。  
- **混杂问题**：  
  - 表12.1显示戒烟组与非戒烟组基线特征不平衡（如年龄、性别、吸烟强度等）。  
  - 年龄等混杂因素（confounders）需调整：假设9个基线协变量 \(L\) 足以调整混杂（性别、年龄、种族、教育、吸烟强度/年限、体力活动、体重）。  

---

#### 12.2 通过建模估计IP权重  
- **IP加权原理**：  
  - 构建伪总体（pseudo-population），消除 \(L \rightarrow A\) 的路径，满足：  
    - \(A \perp\!\!\!\perp L\)  
    - \(E_{\text{ps}}[Y|A=a] = \sum_l E[Y|A=a,L=l] \Pr[L=l]\)  
  - 若实际总体满足条件可交换性 \(Y^a \perp\!\!\!\perp A | L\)，则伪总体中关联即因果。  
- **权重计算**：  
  - 非稳定权重 \(W^A = 1 / f(A|L)\)，其中 \(f(A|L)\) 为给定 \(L\) 时 \(A\) 的条件概率。  
  - 对二值处理 \(A\)，仅需估计倾向评分 \(\Pr[A=1|L]\)（Logistic回归模型）：  
    - 协变量：9个混杂因素，连续变量（年龄、体重等）含线性/二次项，无交互项。  
    - 参数估计：\(\widehat{\Pr}[A=1|L]\)，权重范围 \(W^A \in [1.05, 16.7]\)，均值 2.00\)。  
- **因果效应估计**：  
  - 拟合饱和线性模型 \(E[Y|A] = \theta_0 + \theta_1 A\)，加权最小二乘（权重 \(\widehat{W}^A\))。  
  - 估计值：\(\hat{\theta}_1 = 3.4 \, \text{kg}\)（95% CI: 2.4, 4.5），使用稳健方差估计（保守置信区间）。  

---

#### 12.3 稳定IP权重  
- **稳定权重 \(SW^A = f(A) / f(A|L)\)**：  
  - 分子 \(f(A)\) 为边际处理概率（非条件概率）。  
  - 权重范围 \(SW^A \in [0.33, 4.30]\)，均值 \(1.00\)（伪总体大小不变）。  
- **与 \(W^A\) 比较**：  
  - 因果效应估计相同（\(\hat{\theta}_1 = 3.4 \, \text{kg}\)），但 \(SW^A\) 方差更小，置信区间更窄（尤其非饱和模型时）。  
- **正性（Positivity）问题**：  
  - **结构性违反**：某些 \(L\) 水平下处理概率为0（需限制推断范围）。  
  - **随机违反**：有限样本导致零单元（zero cells），通过参数模型平滑估计（如Logistic回归插值）。  

---

#### 12.4 边际结构模型（MSMs）  
- **模型定义**：直接对反事实均值建模，如 \(E[Y^a] = \beta_0 + \beta_1 a\)（二值处理）。  
- **估计方法**：  
  - IP加权伪总体中拟合关联模型 \(E[Y|A] = \theta_0 + \theta_1 A\)，则 \(\hat{\theta}_1\) 估计 \(\beta_1 = E[Y^{a=1}] - E[Y^{a=0}]\)。  
- **连续处理扩展**（如吸烟强度变化 \(\Delta\) 香烟/天）：  
  - 非饱和MSM：\(E[Y^a] = \beta_0 + \beta_1 a + \beta_2 a^2\)。  
  - 需估计 \(f(A|L)\)（概率密度函数），假设正态分布：  
    - 用线性回归估计 \(E[A|L]\) 和方差 \(\sigma^2\)。  
  - 效应估计（增加20支/天 vs 不变）：  
    - \(\widehat{E}[Y^{a=20}] - \widehat{E}[Y^{a=0}] = 20\hat{\beta}_1 + 400\hat{\beta}_2 = 1.10 \, \text{kg}\)（\(\hat{\beta}_0=2.005, \hat{\beta}_1=-0.109, \hat{\beta}_2=0.003\)）。  
- **二值结果MSM**（如死亡风险）：  
  - Logistic模型：\(\text{logit} \, \Pr[D^a=1] = \alpha_0 + \alpha_1 a\)。  
  - 估计比值比：\(\exp(\hat{\theta}_1) = 1.0\)（95% CI: 0.8, 1.4）。  

---

#### 12.5 效应修饰与MSMs  
- **含协变量的MSM**：如 \(E[Y^a | V] = \beta_0 + \beta_1 a + \beta_2 V a + \beta_3 V\)（\(V\)：性别）。  
  - \(\beta_2 \neq 0\) 表示加法效应修饰。  
- **权重选择**：  
  - 稳定权重 \(SW^A(V) = f(A|V) / f(A|L)\) 提高效率（方差小于 \(SW^A\)）。  
  - 结果：无性别效应修饰证据（\(\hat{\theta}_2\) 95% CI: -2.2, 1.9）。  
- **虚假MSM（faux MSM）**：若 \(L\) 包含所有混杂，则 \(SW^A(L)=1\)，无需加权（等价于回归调整）。  

---

#### 12.6 删失与缺失数据  
- **删失问题**：63例（3.8%）体重数据缺失（删失指示 \(C=1\)）。  
  - 仅分析未删失个体（\(C=0\)）可能引入选择偏倚（如 \(C\) 为碰撞节点）。  
- **因果目标**：估计 \(E[Y^{a,c=0}]\)（无人删失时的反事实均值）。  
- **IP加权调整**：  
  - 联合权重 \(W^{A,C} = W^A \times W^C\)，其中 \(W^C = 1 / \Pr[C=0|L,A]\)（\(C=1\) 时权重为0）。  
  - 稳定权重 \(SW^{A,C} = SW^A \times SW^C\)（\(SW^C = \Pr[C=0|A] / \Pr[C=0|L,A]\)）。  
  - 估计结果：\(\hat{\theta}_1 = 3.5 \, \text{kg}\)（95% CI: 2.5, 4.5），与未调整删失的估计相近。  

---

### 结论  
1. **IP加权**：通过建模 \(f(A|L)\) 处理高维混杂，构建伪总体消除混杂。  
2. **稳定权重**：减少方差，提升效率（尤其非饱和模型）。  
3. **MSMs**：直接建模反事实结局，灵活扩展至连续处理/效应修饰分析。  
4. **删失处理**：联合IP权重 \(W^{A,C}\) 同时调整混杂和选择偏倚。  
5. **假设依赖**：结果有效性需满足可交换性、正性、一致性及模型正确设定。  

> 注：所有数学符号（如 \(E[Y^a]\)）与术语（如 positivity）保留英文以确保精确性；模型参数估计基于NHEFS数据与指定回归方法。