---
date: 2025-09-17 11:19:05
title: Chapter_17
category: Causal inference
tags: [DeepSeek-R1-0528-2nd,response_md]

---
<think>
We are summarizing Chapter 17: Causal Survival Analysis from the provided text. The chapter introduces survival analysis in the context of causal inference, focusing on time-to-event outcomes with administrative censoring. The chapter is structured into several subsections: 17.1 Hazards and risks, 17.2 From hazards to risks, 17.3 Why censoring matters, 17.4 IP weighting of marginal structural models, 17.5 The parametric g-formula, and 17.6 G-estimation of structural nested models.

We will summarize each section by extracting the technical points and fine points as per the instructions. Since we cannot view the images, we will rely on the text and context to describe the key concepts.

Note: The text includes several "Fine Points" and "Technical Points" which are important for details. We will include these as part of the summary.

Let's break down the chapter section by section.
</think>
### Chapter 17: Causal Survival Analysis

#### **Introduction**  
- **Context**: Extends causal inference to time-to-event outcomes (e.g., time until death) where events may occur after study end, necessitating specialized methods for administrative censoring.  
- **Key shift**: Previous chapters focused on outcomes at fixed time points; survival analysis handles events occurring at any time during follow-up.  
- **Administrative censoring**: Intrinsic to survival studies (e.g., study end precludes observing all events). Other censoring types (e.g., loss to follow-up, competing events) require adjustment but are deferred to Part III.  

---

#### **17.1 Hazards and Risks**  
**Technical Points**:  
- **Survival probability**: $Pr[T > k]$ = Proportion surviving beyond time $k$.  
- **Risk (cumulative incidence)**: $Pr[T \leq k] = 1 - Pr[T > k]$.  
- **Hazard**: Discrete-time hazard defined as $Pr[T = k \mid T > k-1]$ (probability of event in interval $k$ given survival until $k-1$).  
- **Key difference**:  
  - Risk uses fixed baseline denominator (cumulative events).  
  - Hazard uses time-varying denominator (at-risk individuals at $k$).  

**Fine Points**:  
- **Hazard ratio limitations**:  
  1. Varies over time; single summary (e.g., Cox model) is a weighted average, obscuring interpretation.  
  2. Subject to selection bias (conditioning on survival introduces collider bias).  
- **Preferred contrasts**: Survival/risk differences/ratios at specific times (e.g., 5-year survival difference).  

---

#### **17.2 From Hazards to Risks**  
**Technical Points**:  
- **Data structures**:  
  - **Wide format**: One row per individual.  
  - **Person-time format**: One row per person-time interval (enables hazard estimation).  
- **Time-varying indicator**: $D_k = 1$ if $T \leq k$ (event by $k$), else $0$.  
- **Survival from hazards**:  
  $Pr[D_k = 0] = \prod_{m=1}^k Pr[D_m = 0 \mid D_{m-1} = 0] = \prod_{m=1}^k (1 - \text{hazard at } m)$.  
- **Estimation**:  
  - Nonparametric: Kaplan-Meier estimator (product-limit).  
  - Parametric: Logistic model for hazards (e.g., $\text{logit } Pr[D_{k+1}=1 \mid D_k=0, A] = \theta_{0,k} + \theta_1 A + \theta_2 A \times k$).  

**Fine Points**:  
- **Model choices**:  
  - Parametric models (e.g., logistic) smooth unstable nonparametric hazards.  
  - Semiparametric models (e.g., Cox, AFT) avoid distributional assumptions but impose proportional hazards or other constraints.  

---

#### **17.3 Why Censoring Matters**  
**Technical Points**:  
- **Goal**: Estimate $Pr[D_k = 0 \mid A=a]$ (survival if no censoring).  
- **Challenge**: Naive estimation using uncensored individuals introduces selection bias.  
- **Solution under random censoring**:  
  $Pr[D_k = 0 \mid A=a] = \prod_{m=1}^k Pr[D_m = 0 \mid D_{m-1}=0, C_m=0, A=a]$.  
- **Staggered entry**: Adjust for baseline calendar time and confounders.  

**Fine Points**:  
- **Artificial censoring**: Exclude individuals whose event time would be unobserved under alternative treatments to preserve exchangeability.  

---

#### **17.4 IP Weighting of Marginal Structural Models**  
**Technical Points**:  
- **Assumptions**: Exchangeability, positivity, consistency.  
- **Weights**: Stabilized IP weights $SW^A = \frac{Pr[A=1]}{Pr[A=1 \mid L]}$ for treated, $\frac{1 - Pr[A=1]}{1 - Pr[A=1 \mid L]}$ for untreated.  
- **MSM for hazards**:  
  $\text{logit } Pr[D^{a}_{k+1} = 0 \mid D^{a}_k = 0] = \beta_{0,k} + \beta_1 a + \beta_2 a \times k$.  
- **Survival estimation**: Multiply estimated conditional survivals over time.  

**Results (example)**:  
- 120 months: 80.7% survival under smoking cessation vs. 80.5% under no cessation (difference 0.2%; 95% CI: -4.1%, 3.7%).  

---

#### **17.5 The Parametric g-Formula**  
**Technical Points**:  
- **Standardized survival**:  
  $Pr[D^{a}_{k+1} = 0] = \sum_l Pr[D_{k+1} = 0 \mid L=l, A=a] Pr[L=l]$.  
- **Steps**:  
  1. Fit parametric hazards model conditional on $L$ and $A$.  
  2. Standardize by averaging predictions over covariate distribution $L$.  
- **G-computation**: Predict survival under treatment scenarios using outcome model.  

**Results (example)**:  
- 120-month survival: 80.4% (cessation) vs. 80.6% (no cessation); difference -0.2% (95% CI: -4.6%, 4.1%).  

---

#### **17.6 G-Estimation of Structural Nested Models**  
**Technical Points**:  
- **Structural AFT model**:  
  $T^{a=0}_i = T_i \exp(\psi A_i)$ (rank-preserving).  
- **G-estimation with censoring**:  
  - Define artificial censoring indicator $\Delta(\psi)$ to handle administrative censoring.  
  - Find $\psi$ such that $\Delta(\psi) \perp\!\!\!\perp A \mid L$ (using logistic model).  
- **Interpretation**: $\exp(-\psi)$ = Ratio of median survival times under treatment vs. control.  

**Results (example)**:  
- $\hat{\psi} = -0.047$ (95% CI: -0.223, 0.333); survival time ratio = 1.05.  

**Fine Points**:  
- **Limitations**:  
  - Rank preservation unrealistic.  
  - Computationally intensive; few software implementations.  
- **Alternatives**: Structural cumulative failure/time models for rare events.  

---

### Key Themes  
- **Censoring**: Central challenge; addressed via hazard/product-limit estimators, IP weighting, g-methods.  
- **Contrasts**: Prefer survival/risk differences over hazard ratios due to interpretability and bias risks.  
- **Model trade-offs**:  
  - IP weighting: Robust to outcome model misspecification if treatment model correct.  
  - g-formula: Robust to treatment model misspecification if outcome model correct.  
  - G-estimation: Theoretically appealing but rarely used due to complexity.  

> **Note**: Figures/tables referenced (e.g., 17.1–17.7) illustrate survival curves and causal diagrams but could not be summarized due to lack of visual data.