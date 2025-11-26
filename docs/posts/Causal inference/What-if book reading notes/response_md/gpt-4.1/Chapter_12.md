---
date: 2025-09-17 11:19:05
title: Chapter_12
category: Causal inference
tags: [gpt-4.1,response_md]

---
# Chapter 12: IP Weighting and Marginal Structural Models

## 12.1 The Causal Question

### Main Point 主旨

- **Goal:** Estimate the average causal effect of smoking cessation ($A$) on weight gain ($Y$).
- 目标：估算戒烟（$A$）对体重增加（$Y$）的平均因果效应。

#### Definitions 定义

- **Counterfactual means:**
  - $E[Y^{a=1}]$ — mean weight gain if everyone quit smoking
  - $E[Y^{a=0}]$ — mean weight gain if no one quit
- **Additive average causal effect:**
  -  $E[Y^{a=1}] - E[Y^{a=0}]$
- **Association is not causation:**
  - The observed difference $E[Y|A=1] - E[Y|A=0]$ is generally not equal to $E[Y^{a=1}] - E[Y^{a=0}]$ due to confounding.

#### 重点

- 必须调整混杂变量（如年龄、性别、种族、教育、吸烟强度等）以获得真正的因果效应。
- Observed difference in weight gain between quitters and non-quitters likely underestimates causal effect due to confounding.

---

## 12.2 Estimating IP Weights via Modeling

### Main Technical Points 技术要点

- **IP Weighting** creates a pseudo-population where $A \perp L$ (treatment independent of covariates).
- **Properties:**
  1. $A$ and $L$ independent
  2. $E^\text{ps}[Y|A=a] = \sum_l E[Y|A=a, L=l]P(L=l)$ (standardized mean)
  3. If $Y^a \perp A|L$, then: Association is causation in pseudo-population.

#### **Formula for Individual Weights**
- For each individual: 
  $$
  W^A = \frac{1}{f(A|L)}
  $$  
  where $f(A|L)$ is the probability of receiving their observed treatment given their covariates (i.e., the **propensity score**).

- For a binary treatment:
  $$
  W^A = \begin{cases}
    \frac{1}{P(A=1|L)} & A=1\\[1em]
    \frac{1}{P(A=0|L)} & A=0\\
  \end{cases}
  $$

- Propensity scores $P(A=1|L)$ are modeled, e.g., by logistic regression including all relevant confounders.

#### **Weighted Estimation**
- Fit the model:
  $$
  E[Y|A] = \theta_0 + \theta_1 A
  $$
  Using observed $Y$, $A$, weighted by $W^A$.
- $\theta_1$ estimates the average causal effect: $\theta_1 \approx E[Y^{a=1}] - E[Y^{a=0}]$

#### **Horvitz-Thompson and Hajek estimators**
- Unbiased estimator under positivity and conditional exchangeability.
- Horvitz-Thompson Estimator:
  $$
  \hat{E}\left[\frac{I(A=a)Y}{P(A|L)}\right]
  $$
- Hajek Estimator (generally preferred, especially for bounded outcomes):
  $$
  \frac{\hat{E}\left[\frac{I(A=a)Y}{P(A|L)}\right]}{\hat{E}\left[\frac{I(A=a)}{P(A|L)}\right]}
  $$

---

## 12.3 Stabilized IP Weights

### Main Technical Points 要点

- **Non-stabilized weights**: $W^A = \frac{1}{P(A|L)}$.
- **Stabilized weights**: $SW^A = \frac{P(A)}{P(A|L)}$.
  - $P(A)$ = marginal probability of treatment in the study population.
- Stabilized weights have mean 1, reduce variance of the weights, thus typically give narrower confidence intervals.
- Both types of weights give the same point estimate for saturated models (like binary $A$ with $E[Y|A] = \theta_0+\theta_1A$), but stabilized preferred for efficiency in non-saturated models.

#### **Positivity Violations**
- 结构性违背：某些$L$值下$A$概率为0（如某些人群永远不会被处理），则不能对全体人群推断，需限制于有正概率的亚群体。
- 随机性违背：样本有限，不代表总体真实概率为0，可以通过建模平滑“空格”。

---

## 12.4 Marginal Structural Models (MSMs)

### Definition 定义

- Marginal structural mean model for binary $A$:
  $$
  E[Y^a] = \beta_0 + \beta_1 a
  $$
  - $\beta_1$ = $E[Y^{a=1}] - E[Y^{a=0}]$ is the average causal effect.

#### Non-saturated MSM for continuous/polytomous treatment:
- E.g., for dose-response (continuous $A$):
  $$
  E[Y^a] = \beta_0 + \beta_1 a + \beta_2 a^2
  $$
- Use IP weights ($SW^A = \frac{f(A)}{f(A|L)}$), where $f(A)$ is the marginal density of $A$ and $f(A|L)$ is the conditional density modeled as, e.g., Gaussian for continuous $A$.
- For simulated pseudo-population, fit $E[Y|A]=\theta_0+\theta_1A + \theta_2A^2$ with IP weights.

#### Marginal Structural Logistic Model for Binary $Y$:
- $$
  \text{logit} \, P(D^a=1) = \alpha_0 + \alpha_1 a
  $$
  So $\exp(\alpha_1)$ gives the causal odds ratio.

---

## 12.5 Effect Modification and MSMs

### Main Concepts 主要概念

- MSMs usually *do not* include covariates unless to model effect modification.
- To assess effect modification (e.g., by sex $V$):
  $$
  E[Y^a|V] = \beta_0 + \beta_1 a + \beta_2 V a + \beta_3 V
  $$
  If $\beta_2 \neq 0$, effect modification exists.
- Fitting via weighted least squares: $E[Y|A,V]=\theta_0+\theta_1 A+\theta_2 VA+\theta_3 V$ with IP weights.
- Stabilized weights for subgroups: $SW^A(V)=\frac{P(A|V)}{P(A|L)}$.
- 若模型中条件于全部混杂变量$L$，权重$SW^A(L) = 1$，此时IP weighting等价于对$L$直接回归调整。

---

## 12.6 Censoring and Missing Data 缺失与删失

### Main Points 要点

- Only analyzing individuals with observed outcomes can introduce selection bias if censoring ($C$) depends on $A$ or $L$.
- Define $C=0$ if observed, $C=1$ if censored.
- Interest: $E[Y^{a=1, c=0}] - E[Y^{a=0, c=0}]$ (if no one censored in either treatment).

#### **Joint IP Weighting for Censoring and Treatment**
- Total weight: $W^{A,C} = W^A \times W^C$, with
  $$
  W^C = \frac{1}{P(C=0|L,A)}
  $$
- Or, stabilized:
  $$
  SW^{A,C} = SW^A \times SW^C, \quad SW^C = \frac{P(C=0|A)}{P(C=0|L,A)}
  $$
- Weights correct for both confounding and selection bias (provided $Y^{a,c=0} \perp (A,C)|L$ holds).

---

## Fine Points & Technical Insights 细节和技术要点

### **Horvitz-Thompson & Hajek Estimators**

- Horvitz-Thompson:
  $$
  \hat{E}\left[\frac{I(A=a)Y}{f(A|L)}\right]
  $$
- Hajek Estimator:
  $$
  \frac{\hat{E}\left[\frac{I(A=a)Y}{f(A|L)}\right]}{\hat{E}\left[\frac{I(A=a)}{f(A|L)}\right]}
  $$
  - Hajek estimator is preferred for bounded outcomes and is less sensitive to model misspecification.

### **Stabilized Weights — Generalization**
- General form: $g(A)/f(A|L)$, $g(A)$ unrelated to $L$.
- In practice, often $g(A)=f(A)$.

### **Positivity Check**
- Always check mean of stabilized weights is ~1.
- Deviations indicate possible model misspecification or positivity violations.
- Strict positivity violations preclude valid causal inference in certain strata.

### **Continuous Treatments**
- Estimation of conditional densities $f(A|L)$ much harder.
- Assumed normality for $f(A|L)$; results can be very sensitive.
- 需警惕模型假设的影响，特别是在连续处理上。

---

## 总结 Summary Table (中英双语)

| Concept                               | Formula/Definition                                                | 中英文解释                      |
|----------------------------------------|------------------------------------------------------------------|--------------------------|
| IP Weight (binary)                     | $W^A = 1/P(A|L)$                                                 | 逆概率权重（IPW）             |
| Stabilized IP Weight                   | $SW^A = P(A)/P(A|L)$                                             | 稳定化逆概率权重                |
| MSM (binary)                           | $E[Y^a] = \beta_0 + \beta_1 a$                                   | 边际结构模型                   |
| MSM (continuous)                       | $E[Y^a] = \beta_0 + \beta_1 a + \beta_2 a^2$                     | 连续处理的边际结构模型               |
| Marginal Structural Logistic Model     | $\logit P(D^a=1)=\alpha_0 + \alpha_1 a$                          | 边际结构logistic模型             |
| Hajek estimator                        | $\dfrac{\hat{E}\left[\frac{I(A=a)Y}{f(A|L)}\right]}{\hat{E}\left[\frac{I(A=a)}{f(A|L)}\right]}$  | Hajek估计量                    |
| Joint Weight (Treatment $\&$ Censoring)| $W^{A,C} = W^A \times W^C$， $W^C = 1/P(C=0|L,A)$                | 同时矫正处理与删失的权重         |
| Stabilized Censoring Weight            | $SW^C = P(C=0|A)/P(C=0|L,A)$                                     | 稳定化删失权重                   |
| Positivity condition                   | $P(A=a|L=l)>0 \ \forall a,l$                                     | 正概率性 条件                    |
| Effect modification in MSM             | $E[Y^a|V] = \beta_0 + \beta_1 a + \beta_2 V a + \beta_3 V$       | 效应修饰的边际结构模型            |

---

## 结论 Key Takeaways

- IP weighting (including stabilized weights) allows estimation of causal effects from observational data under specific assumptions (exchangeability, positivity, consistency).
- Marginal structural models provide a framework for causal inference, especially when traditional regression would be biased by time-varying confounding or missing data.
- Choice of model (and assumptions, especially normality for continuous $A$) critically affects estimates.
- Always check positivity, stabilizing, and model specification sensitivity.
- Selection bias (including from censoring/missing outcome) can be corrected using joint IP weighting.

---

如需某一小节或公式细化推导，请指定！