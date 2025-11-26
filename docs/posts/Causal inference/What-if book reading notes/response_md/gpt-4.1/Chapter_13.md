---
date: 2025-09-17 11:19:05
title: Chapter_13
category: Causal inference
tags: [gpt-4.1,response_md]

---
# Chapter 13: Standardization and the Parametric G-Formula  
**《因果推断 WHAT IF》第十三章：标准化与参数化g公式**  
---

## 1. 主要内容概述 / Main Content Overview
本章主要介绍如何利用标准化（standardization）方法来估计吸烟戒断对体重增加的平均因果效应，并与上一章的逆概率加权（IP weighting）方法进行比较和联系，重点阐述了参数化g公式的思想和实现方法，同时引入了双重稳健（doubly robust）估计器。

This chapter describes how to use standardization, together with statistical modeling, to estimate average causal effects in observational studies, particularly in the context of smoking cessation and weight gain. It discusses the parametric g-formula and contrasts standardization with IP weighting, highlighting their underlying assumptions and practical implementation, including subtleties related to positivity, model misspecification, and double robustness.

---

## 2. 重点内容、技术要点与细节总结 / Key Points, Technical and Fine Points

### 2.1 标准化方法作为IP加权的替代方案 / Standardization as an Alternative to IP Weighting

- **目标（Target Quantity）**：  
  估计所有人在不同处理（A=1, A=0）情况下未被删失（C=0）时的平均因果效应：
  $$
  \text{Average Causal Effect} = E\left[Y^{a=1,c=0}\right] - E\left[Y^{a=0,c=0}\right]
  $$
  其中$E\left[Y^{a, c=0}\right]$表示假设所有人都采取a处理并且没有删失时的平均结果。

- **条件（Identifiability Conditions）**：  
  需要满足条件交换性（exchangeability）、正则性（positivity）、一致性（consistency）等（具体见第3章/Ch3）。

- **IP加权的思想**：  
  通过IP weighting (Inverse Probability weighting) 创建伪样本，使得协变量L的分布在两组中一致。
  - 当$A$是连续变量时，还需要结构模型。
- **结构正则性（Structural positivity）：**  
  Fine Point 13.1 指出，当$\Pr[A=a|L=l]=0$且$\Pr[L=l]\neq 0$，即有些$L=l$的人永远不会接受某个处理时，$E[Y|A=a, L=l]$不可定义。  
  - 参数模型下，标准化方法可以在理论上"插值"跨越无positivity的区间，但会引入偏差，置信区间覆盖率也会降低。

### 2.2 标准化与参数化g公式 / Standardization & the Parametric G-formula

- **核心公式（Key Formulas）**：

  - 离散型L下，标准化平均数：
    $$
    E[Y^{a, c=0}] = \sum_l E[Y|A=a, C=0, L=l] \times \Pr[L=l]
    $$
  - 当L包含连续变量时则表述为积分：
    $$
    E[Y^{a, c=0}] = \int E[Y|A=a, C=0, L=l] \, dF_L(l)
    $$
  - 对于样本，将上式转化为对每个样本个体的平均：
    $$
    \frac{1}{n} \sum_{i=1}^n \hat{E}[Y|A=a, C=0, L_i]
    $$
- **参数化g公式（Parametric g-formula）**：  
  即用模型（如线性/广义线性回归）求$E[Y|A=a, C=0, L=l]$再做上述加权/积分。

- **建模步骤（Modeling Procedure）**：
  1. 对$E[Y|A=a, C=0, L=l]$建立回归模型（可用线性、加交互、多项式项等）。
  2. 预测每个个体的$\hat{E}[Y|A=a, C=0, L_i]$。
  3. 对全体观测求平均，得到标准化均值。

- **数据扩展法（Data Expansion Trick）**：  
  增加副本，使每个个体在数据集中都出现两次（分别设$A=1$和$A=0$），然后分别平均预测值来得出标准化处理组和未处理组的期望。

### 2.3 与IP加权的关系与比较 / Comparison with IP Weighting

- **两者等价性（Nonparametric Equivalence）**：  
  如果不使用建模手段（完全非参数），IPW和标准化估计会得到完全一样的结果（见Technical Point 2.3）。
- **参数模型下的差异（Differences under Model Misspecification）**：  
  - IPW依赖于处理模型（treatment model, $\Pr[A=a|L]$）
  - 标准化依赖于结果模型（outcome model, $E[Y|A=a, L]$）
  - 实际数据建模不可避免会有模型设定错误（model misspecification），造成两者结果不同。差异较大时提示至少有一个模型存在严重错误。

### 2.4 置信区间与Bootstrap / Confidence Interval using Bootstrapping

- **建议采用bootstrap方法估计标准误与构建置信区间：**
  1. 有放回重复抽样，构建多个bootstrap样本，再分别计算感兴趣的因果量。
  2. Bootstrap样本结果的标准差作为标准误，常用$\pm 1.96$乘以标准误构造95% CI。
  3. 数据大时可采用"bag of little bootstraps"方法简化计算。

### 2.5 双重稳健估计 / Doubly Robust Estimators

#### (A) 基本思想（The Big Idea）

- **只要有一个模型（处理/结果）对，就能保证一致性。**
- **适用场景：** 只要$\Pr[A|L]$或$E[Y|A,L]$任选一者模型正确即可，哪一个正确无须事先知晓。

#### (B) 数学表达（Statistical Formula）
以估计$E[Y^{a=1}]$为例，其双重稳健（augmented IP weighted, AIPW）估计量形式：

- 标准IPW估计：
  $$
  \hat{E}_{IPW}[Y^{a=1}] = \frac{1}{n} \sum_{i=1}^n \frac{A_i Y_i}{\hat{\pi}(L_i)}
  $$
- 非参数标准化（plug-in g-formula）：
  $$
  \hat{E}_{std}[Y^{a=1}] = \frac{1}{n} \sum_{i=1}^n \hat{E}[Y|A=1, L_i]
  $$
- **AIPW估计量：**
  $$
  \hat{E}_{DR}[Y^{a=1}] = \frac{1}{n} \sum_{i=1}^n \Bigg( \hat{E}[Y|A=1,L_i] + \frac{A_i}{\hat{\pi}(L_i)} \left( Y_i - \hat{E}[Y|A=1,L_i] \right) \Bigg)
  $$
  说明：其中$\hat{\pi}(L_i)=\Pr[A=1|L_i]$的估计。

#### (C) 性质（Properties）

- **一致性（Consistency）**：如结果模型或处理模型有一个设定正确则$\hat{E}_{DR}$是无偏的。
- **偏差性质（Second-order bias）**：偏差是两个模型误差的乘积，因此大数据+机器学习时表现优良。

#### (D) 插件型双重稳健估计与AIPW的关系（见Technical Point 13.3）

- AIPW估计与“插件型双重稳健估计器”之间的联系与TMLE（targeted minimum loss-based estimator）理论相关。
- 引入所谓“clever covariate”，用于实现协变量的间接调整和目标参数的正确定义。

### 2.6 g公式与g-公式参数化形式 / g-formula and Parametric g-formula

- g公式是标准化思想的推广，原理为在(L,A)给定的条件下积分/求和$E[Y|A=a, L=l]$。
- 当使用建模（如广义线性模型）估计$E[Y|A=a, L=l]$时，就是参数化g公式（parametric g-formula）。
- 推广到时间变化处理和混杂见Part III。

### 2.7 对估计的“认真”程度和敏感性分析 / How Seriously Do We Take Our Estimates & Sensitivity Analysis

- 任意一个观测性数据分析，想要得到有因果意义的结果，必须基本满足如下五个条件：
  1. exchangeability（条件交换性/可交性）
  2. positivity（正则性）
  3. consistency（一致性）
  4. no measurement error（无测量误差）
  5. no model misspecification（无模型设定错误）
- 既往知识不足以保证这些条件完全成立，因此应采用敏感性分析（sensitivity analysis），用如负结果对照、g估计、选择偏倚分析、模型偏误分析、定量偏差分析、工具变量（IV）等策略来评估上述假设的稳健性。

---

## 3. 总结公式回顾 / Summary of Key Formulas

### 3.1 标准化均值 (Standardized Mean)
- 离散
  $$
  E[Y^{a, c = 0}] = \sum_{l} E[Y \mid A = a, C=0, L = l] \Pr[L = l]
  $$
- 连续
  $$
  E[Y^{a, c = 0}] = \int E[Y \mid A = a, C=0, L = l] dF_L(l)
  $$

### 3.2 双重稳健估计 (Doubly Robust Estimator)
#### Augmented IP Weighted Estimator (AIPW)
$$
\hat{E}_{DR}[Y^{a=1}] = \frac{1}{n} \sum_{i=1}^n \left( \hat{b}(L_i) + \frac{A_i}{\hat{\pi}(L_i)}(Y_i - \hat{b}(L_i)) \right)
$$
或
$$
\frac{1}{n}\sum_{i=1}^n \left( \frac{A_i Y_i}{\hat{\pi}(L_i)} - \left( \frac{A_i}{\hat{\pi}(L_i)} - 1 \right)\hat{b}(L_i) \right)
$$

其中：
- $\hat{b}(L_i) = \hat{E}[Y|A=1, L_i]$
- $\hat{\pi}(L_i) = \Pr[A=1|L_i]$（估计值）

### 3.3 TMLE相关“clever covariate”/ Plug-in doble robust form
$$
A/\hat{\pi}(L) - (1-A)/(1-\hat{\pi}(L))
$$

---

## 4. 结论 / Takeaways

- **标准化（参数化g公式）和IPW方法在理论上能等价（完全无模型设定时），但实际应用中常因建模导致偏差。**
- **建议实际分析时两者结合、对比，并尽量使用双重稳健方法。**
- **因果推断要认真质疑假设的成立，敏感性分析不可或缺，结果需谨慎解读。**
- **g公式思想可通用于面对更高维、时间变化等复杂情形。**

---

## 5. 中文与英文术语对照

| 中文                                  | 英文                     |
|--------------------------------------|-------------------------|
| 标准化                               | Standardization         |
| 参数化g公式                          | Parametric g-formula    |
| 逆概率加权（IP加权）                 | Inverse Probability Weighting (IPW) |
| 条件交换性，同质性                   | Exchangeability        |
| 正则性                               | Positivity              |
| 一致性、干预一致性                   | Consistency             |
| 双重稳健估计                         | Doubly Robust Estimator |
| 插件型估计                           | Plug-in Estimator       |
| 加权平均                             | Weighted Average        |
| 残差/偏误                            | Residual/Bias           |
| 置信区间                             | Confidence Interval     |
| Bootstrap 方法                       | Bootstrapping           |
| TMLE/目标最小损失估计                | Targeted Minimum Loss-Based Estimation (TMLE) |
| 虚拟实验、理论目标实验               | Target Trial            |

---

## 6. 建议与实操重点 / Practical Recommendations
- 在协变量高维、样本有限或有删失时，推荐采用参数化g公式扩展标准化方法。
- 实际分析应报告模型假设、估计方法（IPW、标准化、双重稳健）、敏感性/稳健性分析结果。
- 建议优先综合使用IPW、标准化、双重稳健等多方法得出一致结论，再报告给决策方。

---

**以上即为第13章全部重点内容与技术要点总结。如有特殊细节（公式、算法）需要进一步探讨可继续细化。**