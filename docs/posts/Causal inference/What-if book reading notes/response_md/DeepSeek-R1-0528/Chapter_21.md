---
date: 2025-09-17 11:19:05
title: Chapter_21
category: Causal inference
tags: [DeepSeek-R1-0528,response_md]

---
<think>
We are summarizing Chapter 21 of the provided text. The chapter is titled "G-METHODS FOR TIME-VARYING TREATMENTS". The chapter has several sections, but the provided text covers sections 21.1 to 21.6. We will summarize each section in turn, following the required format.

Note: The text includes tables and figures, but we are only provided with the text and some image references. We will describe the tables and figures based on the text and note when we are unable to interpret an image.

We break down the chapter into the following sections (as per the text):
- 21.1 The g-formula for time-varying treatments
- 21.2 IP weighting for time-varying treatments
- 21.3 A doubly robust estimator for time-varying treatments
- 21.4 G-estimation for time-varying treatments
- 21.5 Censoring is a time-varying treatment
- 21.6 The big g-formula

We will create a summary for each section, including:
- Technical Points (core theories, formulas, and concepts)
- Fine Points (additional details, nuances, and explanations)

We must use LaTeX for formulas and markdown for formatting.

Let's proceed section by section.
</think>
### Chapter 21: G-METHODS FOR TIME-VARYING TREATMENTS  
**Context**: This chapter addresses limitations of traditional methods for time-varying treatments with treatment-confounder feedback (e.g., bias under null effects). It introduces three g-methods—g-formula, IP weighting, and g-estimation—that correctly estimate causal effects under sequential exchangeability, positivity, and consistency.  

---

#### 21.1 The g-formula for time-varying treatments  
**Technical Points**:  
- **Core Theory**: The g-formula standardizes mean outcomes to the confounder distribution in the study population. For time-varying treatments, it generalizes to:  
  $$ \sum_{\bar{l}} E[Y | \bar{A} = \bar{a}, \bar{L} = \bar{l}] \prod_{k=0}^K f(l_k | \bar{a}_{k-1}, \bar{l}_{k-1}) $$  
  where $\bar{a}$ is the treatment strategy, $\bar{l}$ is confounder history, and $f(l_k | \bar{a}_{k-1}, \bar{l}_{k-1})$ is the confounder density at time $k$ given prior history.  
- **Key Formula**: Under sequential exchangeability, this equals $E[Y^{\bar{a}}]$, the counterfactual mean under strategy $\bar{a}$.  
- **Positivity Requirement**: The g-formula requires $f(l_k | \bar{a}_{k-1}, \bar{l}_{k-1}) > 0$ for all $\bar{a}, \bar{l}$ (Technical Point 19.2).  
- **Application**: In Table 21.1 (sequentially randomized experiment), the g-formula correctly estimates $E[Y^{a_0=1,a_1=1}] - E[Y^{a_0=0,a_1=0}] = 0$ (null effect).  

**Fine Points**:  
- **Confounder Dependency**: Omitting necessary confounders (e.g., $L_1$ in Figure 20.8) invalidates the g-formula’s causal interpretation.  
- **Component Interpretation**: Individual components (e.g., $E[Y|\bar{A},\bar{L}]$) may lack causal meaning, but their combination identifies $E[Y^{\bar{a}}]$ under sequential exchangeability.  
- **Simulation View**: The g-formula simulates counterfactual outcomes by assigning treatment $\bar{a}$ and preserving observed covariate distributions (Figures 21.1–21.2).  

---

#### 21.2 IP weighting for time-varying treatments  
**Technical Points**:  
- **Weights Definition**:  
  - Nonstabilized: $W^{\bar{A}} = \prod_{k=0}^K \frac{1}{f(A_k | \bar{A}_{k-1}, \bar{L}_k)}$  
  - Stabilized: $SW^{\bar{A}} = \prod_{k=0}^K \frac{f(A_k | \bar{A}_{k-1})}{f(A_k | \bar{A}_{k-1}, \bar{L}_k)}$  
- **Estimation**: $E[Y^{\bar{a}}]$ is the mean of $Y$ in the pseudo-population weighted by $W^{\bar{A}}$ or $SW^{\bar{A}}$, among those with $\bar{A} = \bar{a}$.  
- **Marginal Structural Models (MSMs)**: For high-dimensional treatments, specify $E[Y^{\bar{a}}] = \beta_0 + \beta_1 \text{cum}(\bar{a})$. Parameters are estimated via weighted least squares.  

**Fine Points**:  
- **Equivalence to g-formula**: Nonparametric IP weighting and g-formula yield identical results, even without causal validity.  
- **Model Robustness**: MSMs avoid the g-null paradox (Technical Point 21.3) and allow effect modification by baseline variables (e.g., $E[Y^{\bar{a}} | V] = \beta_0 + \beta_1 \text{cum}(\bar{a}) + \beta_2 V + \beta_3 \text{cum}(\bar{a})V$).  
- **Software**: Implemented in R (`gfoRmula`) and SAS (`GFORMULA`).  

---

#### 21.3 A doubly robust estimator for time-varying treatments  
**Technical Points**:  
- **Doubly Robust Estimator**: Combines treatment and outcome models. Consistent if either model is correct.  
- **Steps for "Always Treat" ($\bar{a} = 1$)**:
  1. Fit treatment model $\pi_k(\bar{L}_k; \alpha)$ for $\Pr(A_k = 1 | \bar{A}_{k-1} = 1, \bar{L}_k)$.  
  2. Compute time-varying IP weights $\widehat{W}^{1_m}$.  
  3. Fit sequential outcome models $b_m(\bar{L}_m; \beta_m)$ with $\widehat{W}^{1_m}$ as covariate, starting from $t = K$ to $t = 0$.  
  4. Estimate $E[Y^{\bar{a}=1}]$ as the sample mean of $b_0(\bar{L}_0; \hat{\beta})$.  
- **Robustness**: $K+2$-robust—unbiased if treatment models for times $0$ to $m$ and outcome models for $m+1$ to $K$ are correct for any $m$.  

**Fine Points**:  
- **Extensions**: Targeted Minimum Loss-Based Estimators (TMLE) handle dynamic strategies (Technical Point 21.6).  
- **Practical Use**: Requires correct specification of either treatment or outcome models, reducing bias in observational studies.  

---

#### 21.4 G-estimation for time-varying treatments  
**Technical Points**:  
- **Structural Nested Mean Model (SNMM)**: Models the effect of a "blip" of treatment at time $k$:  
  $$ E[Y^{a_{k-1}, a_k, 0_{k+1}} - Y^{a_{k-1}, 0_k} | \bar{a}_{k-1}, \bar{l}_k] = a_k \gamma_k(\bar{a}_{k-1}, \bar{l}_k; \beta) $$  
- **G-estimation**:  
  1. Compute $H_k(\psi^\dagger) = Y - \sum_{j=k}^K A_j \gamma_j(\bar{A}_{j-1}, L_j; \psi^\dagger)$.  
  2. Solve estimating equations for $\psi^\dagger$ such that $H_k(\psi^\dagger)$ is independent of $A_k$ given past history.  
- **Closed-Form Solution**: For linear SNMMs, $\hat{\beta}$ has an analytic expression (Technical Point 21.8).  

**Fine Points**:  
- **Rank Preservation**: Optional assumption; g-estimation remains valid for SNMMs without it.  
- **Efficiency vs. Robustness**: SNMMs increase efficiency if no effect modification by past covariates, but may introduce bias if misspecified (vs. MSMs).  

---

#### 21.5 Censoring is a time-varying treatment  
**Technical Points**:  
- **Censoring Weights**: Extend IP weighting to handle censoring $C_k$:  
  $$ W^{\bar{C}} = \prod_{k=1}^{K+1} \frac{1}{\Pr(C_k = 0 | \bar{C}_{k-1} = 0, \bar{A}_{k-1}, \bar{L}_{k-1})} $$  
- **G-formula Adjustment**: For censored data, condition on $\bar{C} = 0$:  
  $$ \sum_{\bar{l}} E[Y | \bar{C} = 0, \bar{A} = \bar{a}, \bar{L} = \bar{l}] \prod_{k=0}^K f(l_k | c_k = 0, \bar{a}_{k-1}, \bar{l}_{k-1}) $$  

**Fine Points**:  
- **Survival Analysis**: For failure-time outcomes, use pooled logistic models with IP weights or g-formula (Technical Point 21.10).  
- **Selection Bias**: Censoring can induce bias if not adjusted (e.g., when $C$ is a collider).  

---

#### 21.6 The big g-formula  
**Technical Points**:  
- **Definition**: The big g-formula includes all variables (observed $L$ and unobserved $U$) and identifies $E[Y^g]$ under any causal DAG.  
- **Reduction to Observed Data**: If d-separation holds, it simplifies to formulas using only observed data (e.g., front-door criterion).  

**Fine Points**:  
- **Front-Door Formula Proof**: Under Figure 7.14, $E[Y^a] = \sum_m \Pr(m | a) \sum_{a'} E[Y | m, a'] \Pr(a')$ (Technical Point 21.11).  
- **SWIG Property**: Single-world counterfactual graphs (SWIGs) enable d-separation proofs without cross-world assumptions (Technical Point 21.12).  

---  
**Key Takeaways**:  
- **g-methods** (g-formula, IP weighting, g-estimation) resolve bias from treatment-confounder feedback.  
- **Doubly/Multiply Robust Estimators** enhance reliability in high-dimensional settings.  
- **Censoring** requires explicit adjustment as a time-varying treatment.  
- **Software** (e.g., `gfoRmula`, `GFORMULA`) implements these methods for applied research.