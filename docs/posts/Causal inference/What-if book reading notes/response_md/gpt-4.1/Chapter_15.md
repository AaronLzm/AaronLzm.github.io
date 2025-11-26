---
date: 2025-09-17 11:19:05
title: Chapter_15
category: Causal inference
tags: [gpt-4.1,response_md]

---
Below is a comprehensive, step-by-step summary of **Chapter 15: Outcome Regression and Propensity Scores** from “Causal Inference: What If”, with all major points, technical details, fine points, and **all formulas** included. 

The summary is presented in **both English and Chinese**, with formulas in standard LaTeX markdown ($...$ blocks). Each section is organized for clarity and completeness. 

---

# Chapter 15: Outcome Regression and Propensity Scores  
第十五章：结果回归与倾向性评分

---

## Overview 概述

- **Outcome regression** and **propensity score** analyses are the most commonly used parametric methods in causal inference.
- The chapter discusses applicability, strengths, and limitations, especially compared to more robust g-methods (IP-weighting, standardization, and g-estimation).
- 该章介绍了结果回归与倾向性评分法的适用性、优劣势，尤其与更稳健的g方法（IP加权、标准化、g估计）进行对比。

---

## 15.1 Outcome Regression 结果回归

### 1. Structural Model for Outcome Regression 结构性模型

The average causal effect of treatment $A$ (e.g., smoking cessation) on outcome $Y$ (e.g., weight gain), conditional on covariates $L$:

$$
E[Y^{a,c=0} \mid L] = \beta_0 + \beta_1 a + \beta_2 aL + \beta_3 L
$$

- $\beta_1$, $\beta_2$ capture the causal effects; $\beta_3$ captures the association between $L$ and $Y$.
- 其中$\beta_1$和$\beta_2$是因果参数，$\beta_3$仅描述协变量$L$对$Y$的关联，不一定有因果解释。

### 2. Nuisance Parameters and Model Specification 滞余参数（干扰参数）与模型设定

- If $\beta_0 + \beta_3L$ mis-specifies $E[Y^{a=0, c=0} | L]$, estimates for $\beta_1$, $\beta_2$ may be biased.
- 滞余参数（如$\beta_0$、$\beta_3$）若模型错设，主效应估计会有偏。

**Fine Point 15.1:**
- In outcome regression, nuisance parameters are $\beta_0,\beta_3$.
- In g-estimation (structural nested model), nuisance parameters come from the propensity model $Pr(A=1|L)$ (e.g., parameters $\alpha$ in $\logit Pr(A=1|L) = \alpha_0 + \alpha_1 L$).
- Which method to use depends on which nuisance model you trust more.
- Doubly robust methods can be preferred.
- 结果回归法的滞余参数是$\beta_0,\beta_3$，g估计法的滞余参数在倾向模型中。建议使用更稳健的双稳健法。

### 3. Estimation and Assumptions 估计与假定

- **Key assumptions:** Exchangeability, positivity, consistency, correct model specification of $E[Y | A, C=0, L]$.
- 主要假设：可交换性、阳性、干扰一致性、模型设定正确。

- Estimation is performed by fitting the regression model:

$$
E[Y | A, C = 0, L] = \alpha_0 + \alpha_1 A + \alpha_2 A L + \alpha_3 L
$$

- 可以用普通最小二乘法拟合该模型。
- If all confounders are adjusted and model is correct, $\alpha_j = \beta_j$.

- For binary outcomes, use $\logit Pr(Y=1|A, C=0, L)$.

### 4. Product Terms 交互作用项

- Adding $A \cdot L$ (product/interactions) allows for effect modification.
- 不带交互项时，$\hat\beta_1$可看作条件效应和边际效应的估计。

---

## 15.2 Propensity Scores 倾向性评分

### 1. Definition and Estimation 定义与估计

- The **propensity score** is $\pi(L) = Pr(A=1|L)$.
- 倾向性评分定义为$A=1$的条件概率，给定协变量$L$。
- Estimated via (e.g.) logistic regression.

### 2. Properties 性质

- In RCT, $\pi(L)=0.5$ for everyone.
- In observational studies, $\pi(L)$ must be estimated.
- **Balancing property:** For the same value of $\pi(L)$, the distribution of $L$ is the same for $A=1$ and $A=0$: $A \perp\!\!\!\perp L \mid \pi(L)$.
- 倾向性评分具备"平衡"性质，即给定$\pi(L)$，$L$在处理组与对照组中的分布一致。

### 3. Use and Key Result 关键结论

- Exchangeability given $L$ $\implies$ exchangeability given $\pi(L)$:
  $$
  Y^a \perp\!\!\!\perp A \mid L \implies Y^a \perp\!\!\!\perp A \mid \pi(L)
  $$

- Positivity holds within levels of $\pi(L)$ iff it holds within $L$.

### 4. Balancing Scores & Prognostic Scores 平衡评分 & 预后评分

**Technical Point 15.1:**
- A balancing score $b(L)$ is any function such that $A \perp\!\!\!\perp L | b(L)$.
- Adjustment for $b(L)$ is sufficient if $L$ is sufficient.
- Prognostic score $s(L)$: $Y^{a=0} \perp\!\!\!\perp L | s(L)$; methods using $s(L)$ require stronger assumptions and do not easily generalize to time-varying treatments.

---

## 15.3 Propensity Stratification and Standardization 倾向评分分层与标准化

### 1. Conditional Effect 条件效应

- For a given propensity score $s$:
  $$
  ACE(s) = E[Y^{a=1,c=0} | \pi(L)=s ] - E[Y^{a=0,c=0} | \pi(L)=s ]
  $$
  $$
  = E[Y | A=1, C=0, \pi(L)=s ] - E[Y | A=0, C=0, \pi(L)=s ]
  $$

- Typically, create strata (e.g. deciles) of $\pi(L)$ and estimate effects within each stratum.
- 常见做法：将样本按$\pi(L)$分为若干层，分别估计效应。

### 2. Issues 问题

- Since $\pi(L)$ is continuous, exact matching is rare—approximate via strata.
- Within each stratum, exchangeability may fail if $\pi(L)$ distributions differ between $A=1,0$.
- 使用分层法时，层内$\pi(L)$分布不一致会破坏组间可交换性。
- Regression on $\pi(L)$ as a continuous variable (possibly nonlinear, e.g. splines) is an alternative.

### 3. Standardization 标准化

- To estimate population marginal effects, standardize conditional means $E[Y|A,C=0,\pi(L)]$ by the distribution of $\pi(L)$ in the sample.
- 方法同第13章，只是使用$\pi(L)$代替$L$。

---

## 15.4 Propensity Matching 倾向评分匹配

### 1. Motivation and Process 动机与过程

- Match treated and untreated units with similar values of $\pi(L)$.
- Propensity matched samples estimate the effect in the matched population.
- 倾向评分匹配后，配对样本的效应估计可近似作为匹配样本的因果效应。

- Matching criteria (“closeness”) influence the bias-variance tradeoff:
  - Too loose: loss of exchangeability.
  - Too tight: lose observations, wider confidence intervals.

### 2. Positivity (Overlap) and Target Population 阳性（重叠性）与目标人群

- Matching guarantees “positivity” by restricting to overlapping support, but the resulting population may not be well-characterized in terms of $L$.
- 用倾向分数组检测重叠范围对保证阳性有效，但实际可推广性受限。
- 限制研究对象范围时，更好的办法是使用实际变量（如年龄、吸烟年数），而不是倾向分数。

### 3. Effect of Matching on Interpretation 匹配影响解释

**Fine Point 15.2:**
- Matched estimates may be closer to effects in the treated due to exclusion of unmatched controls.
- If there is effect modification by $\pi(L)$, interpretation of results becomes less policy relevant, since statements are about $\pi(L)$, not about measured attributes.

---

## 15.5 Propensity Models, Structural Models, and Predictive Models  
倾向模型、结构模型与预测模型

### 1. Distinction 区别

- **Propensity model:** $Pr(A=1|L)$  
  - Used to achieve exchangeability (adjust for confounding).
  - Parameters are nuisance; no direct causal interpretation.
  - Example: logistic regression of treatment on $L$.

- **Structural model:** Relationship between $A$ and potential outcomes (e.g., $E[Y^{a,c=0}|L]$ or marginally $E[Y^{a}]$).
  - Parameters directly encode causal effects.

- **Outcome regression:** Can be used for both causal inference (with correct conditions and proper selection of $L$) and **prediction** (where causality isn’t the focus).
  - Predictive use does not require or impart causal interpretation.

### 2. Variable Selection for Causal vs Predictive Modelling  
因果建模与预测建模的变量选择

#### Common Misunderstandings 常见误区

- Including variables that strongly predict $A$ but aren’t needed for exchangeability increases variance or can introduce bias.
- E.g., including a “Hospital” variable that nearly perfectly predicts $A$ but isn’t related to outcome increases variance, possibly with no gain in bias reduction.
- 在倾向评分建模中，只需纳入保证可交换性所需的*协变量*，而非所有可预测$A$的变量。

- Including colliders or instruments can induce bias.

#### Best Practice 最佳实践

- For causal inference:  
  - Focus only on covariates that ensure exchangeability.
  - Model misspecification can be reduced by using flexible approaches (e.g., splines).
  - 必须满足：可交换性、阳性、干预一致性、模型正确设定。

---

## Summary Table (Key Formulas and Principles) 章节总结

| Concept              | English Formula & Meaning                                                                      | 中文公式与含义                                                 |
|----------------------|-----------------------------------------------------------------------------------------------|---------------------------------------------------------------|
| Outcome regression   | $E[Y^{a, c=0} | L] = \beta_0 + \beta_1 a + \beta_2 aL + \beta_3 L$                             | 结构模型，估计$A$对$Y$的因果效应，控制协变量$L$                |
| Propensity score     | $\pi(L) = Pr(A=1|L)$                                                                          | 倾向性评分为在$L$下接受处理的概率                              |
| Balancing property   | $A \perp\!\!\!\perp L | \pi(L)$                                                               | 倾向分数平衡处理组与对照组的$L$分布                            |
| Exchangeability      | $Y^a \perp\!\!\!\perp A  | L \implies Y^a \perp\!\!\!\perp A | \pi(L)$                  | 给定$L$或$\pi(L)$有可交换性                                   |
| Matching population  | Effect applies to matched set, overlapping $\pi(L)$ support                                   | 匹配后效应只针对有重叠的样本人群                               |
| Causal v. predictive | Causal models focus on exchangeability, prediction models focus on predictive accuracy         | 因果建模重协变量控制，预测建模重预测准确性，不等价             |
| Positivity           | $0 < Pr(A=a|\pi(L)=s) < 1$ (for all $s$ with $Pr[\pi(L)=s]>0$)                                | 阳性指对所有可能的$\pi(L)$值都有处理/对照组                   |


---

# Practical Recommendations 实务建议

- Use outcome regression with caution: model must be correctly specified, and products/interactions included only as required.
- 倾向分数法适合用于简化多维协变量控制，并可通过分层、标准化、匹配等方法估计因果效应。
- Variable selection for causal inference should not be based on predictive model procedures.
- 采用双稳健方法（既建模结果，又建模处理）更为安全可靠。

---

**References:**
- Rosenbaum PR, Rubin DB. The central role of the propensity score in observational studies for causal effects. _Biometrika._ 1983.
- Abadie A, Imbens GW. Large sample properties of matching estimators for average treatment effects. _Econometrica._ 2006.

---

如需更详细分步说明或代码实例，请回复！