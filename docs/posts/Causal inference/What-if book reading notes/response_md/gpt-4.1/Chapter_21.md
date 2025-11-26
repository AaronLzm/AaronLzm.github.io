---
date: 2025-09-17 11:19:05
title: Chapter_21
category: Causal inference
tags: [gpt-4.1,response_md]

---
# Chapter 21: G-Methods for Time-Varying Treatments（时间变化处理的g方法）

This chapter provides a comprehensive overview of three main g-methods—**the g-formula**, **IP weighting**, and **g-estimation**—and their doubly/multiply robust extensions for estimating causal effects in the presence of time-varying treatments with treatment-confounder feedback. The chapter also addresses the issue of censoring as a time-varying process and generalizes the notion of identification through the "big g-formula". Below, I summarize all technical, fine, and key points, and provide main formulas in both English and Chinese with standard LaTeX math formatting.

---

## 1. The Challenge

- **Time-varying treatments** complicate confounding adjustment due to *treatment-confounder feedback* (i.e., confounders affected by or affecting subsequent treatments).
- **Traditional adjustment methods** (e.g., standard regression) fail under feedback: even with no causal effect, they can produce a spurious effect estimate.

---

## 2. G-Methods Overview

### Main Idea

- **G-methods** are designed to yield **causally correct estimates** under treatment-confounder feedback by satisfying three *identifiability conditions*:
  1. **Sequential exchangeability** (sequential ignorability)
  2. **Positivity**
  3. **Consistency**

---

## 3. The G-Formula for Time-Varying Treatments

### A. For Two Time Points
Suppose we observe baseline and follow-up treatments $(A_0, A_1)$, time-varying confounders $(L_0, L_1)$, and outcome $Y$.

**G-Formula (Static Strategy):**
\[
E[Y_{a_0, a_1}] = \sum_{l_1} E[Y|A_0=a_0, A_1=a_1, L_1=l_1] \; f(l_1|a_0)
\]

- $f(l_1|a_0)$ is the distribution of $L_1$ given $A_0 = a_0$ in the study population.

**中文：**
\[
E[Y_{a_0, a_1}] = \sum_{l_1} E[Y|A_0=a_0, A_1=a_1, L_1=l_1] \cdot P(L_1=l_1|A_0=a_0)
\]

---

### B. For $K$ Time Points and General Settings

\[
E[Y_{\bar{a}}] = \sum_{\bar{l}} E[Y|\bar{A} = \bar{a}, \bar{L} = \bar{l}] \prod_{k=0}^K f(l_k | \bar{a}_{k-1}, \bar{l}_{k-1})
\]
- Here, $\bar{A} = (A_0,...,A_K)$, $\bar{L} = (L_0,...,L_K)$.

**中文：**
\[
E[Y_{\bar{a}}] = \sum_{\bar{l}} E[Y|\bar{A}=\bar{a}, \bar{L}=\bar{l}] \prod_{k=0}^K P(L_k | \bar{A}_{k-1}, \bar{L}_{k-1})
\]

---

#### Key Points about the G-Formula

- The formula *standardizes the outcome* to the confounder distribution under the intervention.
- The set of confounders included ("history") is what is needed to achieve conditional exchangeability for $A_k$ (**Fine Point 21.1**).
- The **positivity condition**: There must be observed data supporting all relevant treatment/covariate histories.
- In high-dimensional data, parameter estimation requires plug-in (possibly parametric) models (**parametric g-formula**).
- The formula generalizes to both deterministic (fixed path of treatment) and random (probabilistic) strategies.

---
#### G-Formula Density (Technical Point 21.1)

For outcome $Y$ and covariates $L$:
\[
f(y|\bar{a}_K, \bar{l}_K) \prod_{k=0}^K f(l_k | \bar{a}_{k-1}, \bar{l}_{k-1})
\]
- Marginalizing over $L$ yields the density for $Y$ under treatment strategy $\bar{a}$.

**中文：**
处理结果$Y$与协变量$L$的g公式密度为：
\[
f(y|\bar{a}_K, \bar{l}_K) \prod_{k=0}^K f(l_k | \bar{a}_{k-1}, \bar{l}_{k-1})
\]

---

#### G-Formula for Random Strategies
\[
E[Y] = \sum_{\bar{a}, \bar{l}} E[Y|\bar{A} = \bar{a}, \bar{L} = \bar{l}] 
\prod_{k=0}^K f(l_k | \bar{a}_{k-1}, \bar{l}_{k-1}) \prod_{k=0}^K f_{\text{int}}(a_k | \bar{a}_{k-1}, \bar{l}_k)
\]

**中文：**
对于随机策略，g公式为：
\[
E[Y] = \sum_{\bar{a}, \bar{l}} E[Y|\bar{A}=\bar{a}, \bar{L}=\bar{l}] \prod_{k=0}^K P(L_k|\bar{A}_{k-1}, \bar{L}_{k-1}) \prod_{k=0}^K P_{\text{int}}(A_k|\bar{A}_{k-1},\bar{L}_k)
\]

---

### C. Technical/Fine Points

- **Inclusion of Variables is Crucial**: Omitting relevant confounders breaks the identification (removes causal interpretation).
- **Component-wise Causal Meaning**: The overall g-formula may be causal, but its pieces may lack causal interpretation (unless in sequentially randomized data).
- **"History" Might Not Match Time**: "History" for adjustment is the set of variables required for exchangeability, not necessarily all earlier-in-time variables.

---

## 4. IP Weighting for Time-Varying Treatments

### A. Definition

For treatment history $\bar{A} = (A_0,\ldots,A_K)$ and confounder history $\bar{L} = (L_0,...,L_K)$, the **Inverse Probability (IP) Weight** at time $k$:

**Non-stabilized weight:**
\[
W_{\bar{A}} = \prod_{k=0}^K \frac{1}{f(A_k|\bar{A}_{k-1}, \bar{L}_k)}
\]

**Stabilized weight:**
\[
SW_{\bar{A}} = \prod_{k=0}^K \frac{f(A_k|\bar{A}_{k-1})}{f(A_k|\bar{A}_{k-1}, \bar{L}_k)}
\]

**中文：**

非稳态IP权重：
\[
W_{\bar{A}} = \prod_{k=0}^K \frac{1}{P(A_k|\bar{A}_{k-1}, \bar{L}_k)}
\]

稳态（稳定化）IP权重：
\[
SW_{\bar{A}} = \prod_{k=0}^K \frac{P(A_k|\bar{A}_{k-1})}{P(A_k|\bar{A}_{k-1}, \bar{L}_k)}
\]

---

### B. Implementation

- Fit models for $f(A_k|\bar{A}_{k-1},\bar{L}_k)$ (often logistic regression).
- Calculate weights for each individual and time point.
- **Weighted estimation**: Use these weights to create a pseudo-population in which treatment is randomized.

**Key Outcome: Under correct assumptions, IP weighting "removes" confounding by simulating a situation where treatment/exposure is "randomized" with respect to confounders.**

---

### C. Estimation of Causal Effects

Main approach:
- **Estimate average outcome conditional on being in a treatment strategy** via weighted average:
  \[
  E^{ps}[Y|A=\bar{a}] = \frac{E[SW_{\bar{A}} Y I(A=\bar{a})]}{E[SW_{\bar{A}} I(A=\bar{a})]}
  \]

**中文：**
\[
E^{ps}[Y|A=\bar{a}] = \frac{E[SW_{\bar{A}} Y I(A=\bar{a})]}{E[SW_{\bar{A}} I(A=\bar{a})]}
\]

For the causal effect:
\[
E^{ps}[Y|A=\bar{a}] - E^{ps}[Y|A=\bar{a}']
\]

---

### D. Technical Points

- In **dynamic treatments**, stabilized weights no longer work and nonstabilized weights are required (**Technical Point 21.2**).
- For dynamic strategies: only the denominator of the weight is used; numerator isn’t well-defined.
- Model misspecification in either weights or g-formula can produce bias; comparing both approaches is a robustness check.
- **Marginal structural mean models** (e.g., $E[Y_{\bar{a}}]=\beta_0+\beta_1 \operatorname{cum}(\bar{a})$) are used to reduce model complexity and to estimate overall causal effect.

---

### E. Censoring as a Time-Varying Treatment

When dealing with right-censoring (loss to follow-up), treat censoring as time-varying "treatment" variables $C_1, ..., C_{K+1}$ (0 = not censored, 1 = censored).

Update g-formula and weights:

\[
W_{\bar{C}} = \prod_{k=1}^{K+1} \frac{1}{P(C_k=0|C_{k-1}=0, \bar{A}_{k-1},\bar{L}_{k-1})}
\]

\[
\begin{align*}
\text{G-formula with censoring: } & \\
E[Y_{\bar{a}, \bar{c}=0}] &= \sum_{\bar{l}} E[Y | \bar{C} = 0, \bar{A}=\bar{a}, \bar{L} = \bar{l}] \prod_{k=0}^K f(l_k | c_k = 0, \bar{a}_{k-1}, \bar{l}_{k-1})
\end{align*}
\]

**中文：**

\[
W_{\bar{C}} = \prod_{k=1}^{K+1} \frac{1}{P(C_k = 0 | C_{k-1}=0, \bar{A}_{k-1}, \bar{L}_{k-1})}
\]

带删失的g公式：
\[
E[Y_{\bar{a}, \bar{c}=0}] = \sum_{\bar{l}} E[Y | \bar{C} = 0, \bar{A} = \bar{a}, \bar{L} = \bar{l}] \prod_{k=0}^K P(L_k | c_k=0, \bar{A}_{k-1}, \bar{L}_{k-1})
\]

Censoring IP weights, when used, create a pseudo-population with no censoring.

---

## 5. Doubly Robust and Multiply Robust Estimation

### A. Doubly Robust (DR) Estimator

#### For Time-Fixed Treatment

Given
- Treatment model: $\hat{f}(A|L)$
- Outcome model: $\hat{E}[Y|A, L]$

Estimator for $E[Y^a]$:
\[
\hat{E}[Y^a] = \frac{1}{n} \sum_{i=1}^n \hat{E}[Y|A=a, L_i] + \frac{I(A_i = a)}{\hat{f}(a | L_i)} (Y_i - \hat{E}[Y|A=a, L_i])
\]

**中文：**
\[
\hat{E}[Y^a] = \frac{1}{n} \sum_{i=1}^n \left[ \hat{E}[Y|A=a, L_i] + \frac{I(A_i = a)}{\hat{f}(a | L_i)} (Y_i - \hat{E}[Y|A=a, L_i]) \right]
\]

**Key property:** Consistent if either the treatment model **or** the outcome model is correct.

---

#### For Time-Varying Treatments (Bang & Robins 2005, TMLE):

- Sequentially fit treatment and outcome models at each time.
- Construct weights and sequential outcome fits.
- The estimator is **doubly robust** (consistent if at least one set of models is correct), and, under certain algorithms/combinations, even **multiply robust** (consistent in a broader range of scenarios, e.g., if correct for some subset of times).

See **Technical Point 21.4/21.5/21.6** for the "K+2"-robust and "2K+1"-robust estimators.

---

#### Multiply Robust Estimation (Technical Points 21.4–21.6):

- Estimators exist (e.g., TMLE) that are consistent if at least any one of several model blocks (either for outcome or treatment at any time) are correct.
- In practice, fits involve iterated regression and reweighting.

---

## 6. G-Estimation for Time-Varying Treatments

### A. Structural Nested Mean Models (SNMM)

- For each time $k$, define "blip" functions $\gamma_k(a_{k-1}, l_k, \beta)$ for causal effect of $A_k$ at level $a_k=1$.
- The observed data is related to counterfactual outcomes via:

\[
Y_{a_0,0} = Y_{0,0} + \psi_0 a_0
\]
\[
Y_{a_0,a_1} = Y_{a_0,0} + \psi_{11} a_1 + \psi_{12} a_1 L_{a_0,1} + \psi_{13} a_1 a_0 + \psi_{14} a_1 a_0 L_{a_0,1}
\]

**Estimation Strategy** (G-Estimation):

- Use observed data to construct candidate "blip-adjusted" outcomes $H_k (\psi^\dagger)$.
- Solve estimating equations (via regression): the g-estimate $\hat{\psi}$ is the value for which $H_k(\psi^\dagger)$ yields no dependence of $A_k$ on $H_k(\psi^\dagger)$, conditional on prior history.

**For multiple time points:**
- General form:
  \[
  E[Y_{a_{k-1}, a_k, 0_{k+1}} - Y_{a_{k-1}, 0_k} | L_{a_{k-1},k} = l_k, A_{k-1} = a_{k-1}, A_k = a_k ] = a_k \gamma_k(a_{k-1}, l_k, \beta)
  \]

**Key property:** G-Estimation avoids certain null paradoxes of the g-formula; more efficient than IP weighting when model specified correctly, but more sensitive to model misspecification.

---

#### Relationship to Marginal Structural Models (Technical Point 21.7):

- SNMM becomes a marginal structural mean model (MSM) if effect modification by past covariate history is absent.
- G-estimation and IP weighting are dual under MSM, but g-estimation more efficient if the SNMM is correct.

---

### B. Simulation for Dynamic Regimes (Technical Point 21.9)

- After estimating blips, can simulate outcomes under dynamic strategies by
  1. Simulating histores of confounders under the strategy,
  2. Applying the estimated blip effects.

---

## 7. The G-Null Paradox (Technical Point 21.3)

- **Parametric g-formula** can yield *spurious effects* under the null if models for each component are misspecified, despite no true treatment effect.
- **IPW and g-estimation methods** do not suffer from this paradox under the sharp null (no treatment effect for any subject).

---

## 8. The Big G-Formula

### Key Concept

- If all variables (measured and unmeasured) that are parents of treatment are included, the g-formula based on $(A, L, U)$ will identify the counterfactual mean for any regime.
- In practice, unmeasured confounders ($U$) can't be included, so question reduces to: *can the g-formula be written as a function of observed data only?* (i.e., is the effect **identifiable**).
- The **front-door formula** is an example: under certain DAG conditions, the effect is identifiable even when unmeasured confounding exists, via mediators.

**Formal Expression (see Technical Point 21.11):**
\[
E[Y^a] = \sum_m P(M=m|A=a) \sum_{a'} E[Y|M=m, A=a'] P(A=a')
\]

**中文：**
\[
E[Y^a] = \sum_m P(M=m|A=a) \sum_{a'} E[Y|M=m, A=a'] P(A=a')
\]

- General results by Tian & Pearl, Shpitser & Pearl: If identification is possible, there *exists* such a formula.

---

## 9. Formal Definition of General SNMM (Technical Point 21.13)

- The SNMM can be defined relative to any strategy $g$.
- The blip function:
\[
\gamma_t^g(a_t, l_t) = E[Y_{a_{t-1}, a_t, g_{t+1}} - Y_{a_{t-1}, g_t, g_{t+1}} | A_{t-1} = a_{t-1}, A_t = a_t, L_t = l_t]
\]

- Additive SNMMs allow for optimal regime identification ($g_{\text{opt}} = \arg\max_g E[Y_g]$).

---

# 总结精要（中文）

### 核心内容
- **时间变化处理下传统混杂矫正方法失效，需要g方法（g-formula, IPW, g-estimation）**
- g方法依赖“序列交换性、正则性（positivity）、一致性”三大可识别条件
- 各种方法可通过参数模型、插件法实现，需注意模型不正确时的偏倚
- 可以构造双（多）重鲁棒法（即可兼容模型部分错配）
- 删失（丢失访问）需看作也是时间变化的处理，g方法适用，只需权重或g公式加入删失概率
- "big g-formula"说明理论上只要所有父节点（测量和未测量）都在g公式里，总是可识别，但实际没法访问未测量变量，是否仅用观测变量可识别由d分离判别

### 技术结论
- 只要观测到所有混杂、满足可识别条件，g-formula、IPW和g-estimation结果应等价
- g-estimation在正确模型下效率更高，IP加权较稳健，对模型偏差更不敏感
- g公式组件可无单独因果意义，但整体在随机试验下有；IP权重直接描述逆概率下的伪人群
- 复杂模型（高度维度）可用顺序回归、插件、机器学习等实现多重鲁棒
- censoring（删失）看作是与A一样的处理变量，统一用g方法解决

---

## 参考公式列表

**1. g-公式（静态/动态策略）：**

\[
E[Y_{\bar{a}}] = \sum_{\bar{l}} E[Y|\bar{A} = \bar{a}, \bar{L} = \bar{l}] \prod_{k=0}^K f(l_k | \bar{a}_{k-1}, \bar{l}_{k-1})
\]

**2. IP权重：**

\[
W_{\bar{A}} = \prod_{k=0}^K \frac{1}{f(A_k|\bar{A}_{k-1}, \bar{L}_k)}
\]

\[
SW_{\bar{A}} = \prod_{k=0}^K \frac{f(A_k|\bar{A}_{k-1})}{f(A_k|\bar{A}_{k-1}, \bar{L}_k)}
\]

**3. 双鲁棒估计量示例：**

\[
\hat{E}[Y^a] = \frac{1}{n}\sum_{i=1}^n \hat{E}[Y|A=a, L_i] + \frac{I(A_i = a)}{\hat{f}(a | L_i)} (Y_i - \hat{E}[Y|A=a, L_i])
\]

**4. SNMM & G-Estimation:**

\[
E[Y_{a_{k-1}, a_k, 0_{k+1}} - Y_{a_{k-1}, 0_k} | L_{a_{k-1},k} = l_k, A_{k-1} = a_{k-1}, A_k = a_k ] = a_k \gamma_k(a_{k-1}, l_k, \beta)
\]

---

## 最后建议
- **如估计结果有显著差异，应检查所有模型，防止系统性偏差。**
- **推荐多种方法并行实现，包含多种模型、鲁棒性加强。**
- **遇到删失数据，要系统地将其纳入g方法权重处理。**

---

*This summary preserves all crucial technical points, formulas, and logical structure from the chapter, with bilingual formula expression as requested. For specific implementation or program code (e.g. R or SAS packages), refer to indicated software.*