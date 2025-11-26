---
date: 2025-09-17 11:19:05
title: Chapter_21
category: Causal inference
tags: [DeepSeek-R1-0528-2nd,response_md]

---
<think>
We are summarizing Chapter 21 of the provided PDF, titled "G-METHODS FOR TIME-VARYING TREATMENTS". The chapter introduces g-methods (g-formula, IP weighting, g-estimation, and doubly-robust generalizations) as solutions to the bias of traditional methods in the presence of treatment-confounder feedback. The chapter is structured into several sections, and we will summarize each section as per the given structure.

Note: The provided text includes tables and figures, but we are to summarize based on the text. For tables, we describe the content. For figures, we note that they are referenced but we cannot interpret the images, so we rely on the text descriptions.

We break down the chapter into the following sections (as per the extracted text):

1. Introduction (Page 1, before section 21.1)
2. 21.1 The g-formula for time-varying treatments
3. 21.2 IP weighting for time-varying treatments
4. 21.3 A doubly robust estimator for time-varying treatments
5. 21.4 G-estimation for time-varying treatments
6. 21.5 Censoring is a time-varying treatment
7. 21.6 The big g-formula

Additionally, there are Fine Points and Technical Points that we will include in the relevant sections.

We will follow the required format: for each section, we provide:
- Technical Points (core theories, key formulas, important concepts)
- Details Points (cases, examples, background, etc.)

We use LaTeX for formulas and markdown for structure.

Let's proceed step by step.
</think>
### Chapter 21: G-METHODS FOR TIME-VARYING TREATMENTS  
**Technical Focus**: Solutions to bias in traditional methods for time-varying treatments with treatment-confounder feedback, using g-methods (g-formula, IP weighting, g-estimation, doubly-robust estimators).  

---

#### 21.1 The g-formula for time-varying treatments  
**Context**: Extends the g-formula (Chapter 13) to time-varying treatments under sequential exchangeability, positivity, and consistency.  
**Technical Points**:  
- **Core Theory**: For time-varying treatment $A = (A_0, A_1)$, the g-formula for $E[Y^{a_0,a_1}]$ is:  
  $$\sum_{l_1} E[Y \mid A_0=a_0, A_1=a_1, L_1=l_1] \cdot f(l_1 \mid a_0)$$  
  where $f(l_1 \mid a_0) = \Pr(L_1=l_1 \mid A_0=a_0)$.  
- **Key Formula**: Standardizes mean outcome to confounder distribution ($L_1$). Requires positivity: $f(l_1 \mid a_0) \neq 0$ for observed $(a_0, a_1, l_1)$.  
- **Application**: In Table 21.1 (sequentially randomized experiment), estimates $E[Y^{a_0=1,a_1=1}] - E[Y^{a_0=0,a_1=0}] = 0$ (null effect), correcting traditional methods' bias.  
- **Generalization**: For $K$ time points:  
  $$\sum_{\bar{l}} E[Y \mid \bar{A}=\bar{a}, \bar{L}=\bar{l}] \prod_{k=0}^K f(l_k \mid \bar{a}_{k-1}, \bar{l}_{k-1})$$  

**Details Points**:  
- **Simulation View**: Under sequential exchangeability, g-formula simulates counterfactual outcomes under strategy $\bar{a}$.  
- **Critical Notes**:  
  - Omitting confounders (e.g., $L_1$) invalidates causal interpretation.  
  - Components (e.g., $E[Y \mid \cdot]$) may lack causal meaning individually.  
  - **Fine Point 21.1**: "History" includes confounders needed for exchangeability, not strictly temporal order.  

---

#### 21.2 IP weighting for time-varying treatments  
**Technical Points**:  
- **Weights**:  
  - Nonstabilized: $W^{\bar{A}} = \prod_{k=0}^K \frac{1}{f(A_k \mid \bar{A}_{k-1}, \bar{L}_k)}$  
  - Stabilized: $SW^{\bar{A}} = \prod_{k=0}^K \frac{f(A_k \mid \bar{A}_{k-1})}{f(A_k \mid \bar{A}_{k-1}, \bar{L}_k)}$  
- **Estimation**: $E[Y^{\bar{a}}]$ is $E_{\text{ps}}[Y \mid \bar{A}=\bar{a}]$ in pseudo-population created by weights.  
- **Marginal Structural Models (MSM)**: For high-dimensional strategies, specify $E[Y^{\bar{a}}] = \beta_0 + \beta_1 \text{cum}(\bar{a})$. Fit via weighted least squares.  

**Details Points**:  
- **Application**: In Table 21.1, IP weighting yields correct null effect (60 vs. 60).  
- **Robustness**: MSMs avoid g-null paradox (unlike parametric g-formula).  
- **Software**: `gfoRmula` R package, `GFORMULA` SAS macro.  
- **Technical Point 21.2**: For dynamic strategies, use $E[Y I(\bar{A}_K = A_K^g) W^{\bar{A}}]$.  

---

#### 21.3 Doubly robust estimator for time-varying treatments  
**Technical Points**:  
- **Approach**: Combines g-formula and IP weighting. Consistent if either treatment or outcome model is correct.  
- **Steps for "always treat" ($\bar{a}=1$):  
  1. Fit treatment model $\pi_k(\bar{L}_k; \alpha)$ for $\Pr(A_k=1 \mid \bar{A}_{k-1}=1, \bar{L}_k)$.  
  2. Compute time-varying IP weights $\widehat{W}^{1_m}$.  
  3. Fit sequential outcome models $b_m(\bar{L}_m; \beta_m)$ with $\widehat{W}^{1_m}$ as covariate.  
  4. Estimate $E[Y^{\bar{a}=1}]$ as sample mean of $b_0(\bar{L}_0; \hat{\beta})$.  
- **Robustness**: $K+2$-robust (correct if treatment model for times $0:m$ and outcome model for $m+1:K$ hold).  

**Details Points**:  
- **Extensions**: Targeted Minimum Loss-Based Estimator (TMLE) for static/dynamic strategies (Technical Point 21.6).  
- **Challenges**: Computational complexity; emerging software for machine learning integration.  

---

#### 21.4 G-estimation for time-varying treatments  
**Technical Points**:  
- **Structural Nested Mean Model (SNMM)**: Models blip effect of treatment at $k$:  
  $$E[Y^{a_{k-1},a_k,0_{k+1}} - Y^{a_{k-1},0_k} \mid \cdot] = a_k \gamma_k(a_{k-1}, l_k, \beta)$$  
- **G-estimation**:  
  1. Compute $H_k(\psi^\dagger) = Y - \sum_{j=k}^K A_j \gamma_j(A_{j-1}, L_j, \psi^\dagger)$.  
  2. Solve estimating equation for $\psi^\dagger$ such that $A_k \perp H_k(\psi^\dagger) \mid L_k, A_{k-1}$.  
- **Closed Form**: For linear SNMM, use $\widehat{\beta} = \left( \sum X_{i,k} Q_{i,k} S_{i,k}^T \right)^{-1} \left( \sum Y_i X_{i,k} Q_{i,k} \right)$ (Technical Point 21.8).  

**Details Points**:  
- **Saturated Example**: In Table 21.1, g-estimation yields $\beta = 0$ (null effect).  
- **Optimal Strategies**: SNMMs can estimate $g^{\text{opt}} = \arg\max E[Y^g]$ (Technical Point 21.13).  

---

#### 21.5 Censoring as a time-varying treatment  
**Technical Points**:  
- **Handling Censoring**: Treat censoring indicators $C_k$ as time-varying treatment.  
- **g-formula with Censoring**:  
  $$\sum_{\bar{l}} E[Y \mid \bar{C}=\bar{0}, \bar{A}=\bar{a}, \bar{L}=\bar{l}] \prod_{k=0}^K f(l_k \mid c_k=0, \bar{a}_{k-1}, \bar{l}_{k-1})$$  
- **IP Weighting**: Use weights $W^{\bar{C}} = \prod_{k=1}^{K+1} \frac{1}{\Pr(C_k=0 \mid \bar{C}_{k-1}=0, \bar{A}_{k-1}, \bar{L}_{k-1})}$.  

**Details Points**:  
- **Survival Analysis**: Extend to failure-time outcomes via hazards models (Technical Point 21.10).  
- **Stabilized Weights**: Reduce variance by conditioning on past treatment.  

---

#### 21.6 The big g-formula  
**Technical Points**:  
- **Concept**: g-formula including all variables (measured $L$, unmeasured $U$) under causal DAGs.  
- **Identification**: If DAG is causal, big g-formula identifies $E[Y^g]$.  
- **Front-Door Formula Example**: Reduces to $\sum_m \Pr(M=m \mid A=a) \sum_{a'} E[Y \mid M=m, A=a'] \Pr(A=a')$.  

**Details Points**:  
- **Non-Observational Formulas**: e.g., front-door criterion valid under d-separation (Technical Point 21.11).  
- **Limitation**: Requires correct causal DAG specification (unverifiable in practice).  

---  
**Summary Concluded**