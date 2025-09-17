---
title: Chapter_16
category: Causal inference
tags: [DeepSeek-R1-0528,response_md]

---
<think>
We are summarizing Chapter 16 "Instrumental Variable Estimation" from the provided text. The chapter has several sections and technical points. We'll break it down step by step.

First, note that the chapter introduces instrumental variable (IV) estimation as a method that relies on a different set of assumptions than the previously discussed methods (like IP weighting, standardization, etc.), which require measuring all confounders. IV methods can be used when we have an instrument that meets three conditions.

We'll structure the summary by the sections in the chapter:

1. 16.1 The three instrumental conditions
2. 16.2 The usual IV estimand
3. 16.3 A fourth identifying condition: homogeneity
4. 16.4 An alternative fourth condition: monotonicity
5. 16.5 The three instrumental conditions revisited
6. 16.6 Instrumental variable estimation versus other methods

Additionally, there are Technical Points and Fine Points that we need to incorporate.

We'll follow the required format: for each section, we'll have:
- **技术重点 (Technical Points)**
- **细节要点 (Fine Points)**

We must base everything on the text and not add any external information.

Let's start with the first section.
</think>
### Chapter 16: INSTRUMENTAL VARIABLE ESTIMATION

#### 16.1 The three instrumental conditions  
**技术重点 (Technical Points)**:  
- **核心理论**:  
  - IV estimation addresses unmeasured confounding by leveraging an instrumental variable \(Z\) that meets three conditions:  
    (i) \(Z\) is associated with treatment \(A\) (relevance condition).  
    (ii) \(Z\) affects outcome \(Y\) only through \(A\) (exclusion restriction).  
    (iii) \(Z\) and \(Y\) share no common causes (exchangeability).  
  - In randomized trials, \(Z\) (randomization assignment) is a valid instrument:  
    - Condition (i) holds as assignment influences treatment receipt.  
    - Condition (ii) holds under double-blind design.  
    - Condition (iii) holds due to random assignment.  
- **重要概念**:  
  - **Causal instrument**: Directly affects treatment (e.g., Figure 16.1).  
  - **Surrogate instrument**: Proxy for an unmeasured causal instrument \(U_Z\) (e.g., Figures 16.2–16.3).  
- **应用场景**:  
  - Observational studies (e.g., using cigarette price as \(Z\) for smoking cessation effect on weight).  

**细节要点 (Fine Points)**:  
- **辅助信息**:  
  - Only condition (i) is empirically verifiable (e.g., Pr\([A=1|Z=1] - \text{Pr}[A=1|Z=0] > 0\)).  
  - Conditions (ii) and (iii) are untestable; violations may arise from unblinding (condition ii) or unmeasured confounders (condition iii).  
- **案例分析**:  
  - Cigarette price instrument: Weak association (risk difference = 6%), termed a *weak instrument*.  
- **相关背景**:  
  - Proposed instruments in observational studies include genetic factors (Mendelian randomization), physician preference, and access measures (e.g., distance to facilities).  

---

#### 16.2 The usual IV estimand  
**技术重点 (Technical Points)**:  
- **关键公式**:  
  - For dichotomous \(Z\), the IV estimand for \(E[Y^{a=1}] - E[Y^{a=0}]\) is:  
    $$
    \frac{E[Y|Z=1] - E[Y|Z=0]}{E[A|Z=1] - E[A|Z=0]}
    $$  
  - Continuous \(Z\): Estimand = \(\frac{\text{Cov}(Y,Z)}{\text{Cov}(A,Z)}\).  
- **核心理论**:  
  - Numerator: Intention-to-treat effect of \(Z\) on \(Y\).  
  - Denominator: Measures adherence (strength of \(Z\)-\(A\) association).  
  - Low adherence inflates the estimand.  
- **应用场景**:  
  - Randomized trials with non-adherence; observational studies with surrogate instruments.  

**细节要点 (Fine Points)**:  
- **辅助信息**:  
  - **Standard IV estimator**: Ratio of sample estimates (e.g., 2.4 kg weight gain in smoking cessation example).  
  - **Two-stage-least-squares**:  
    1. Fit \(E[A|Z] = \alpha_0 + \alpha_1 Z\), predict \(\hat{E}[A|Z]\).  
    2. Fit \(E[Y|Z] = \beta_0 + \beta_1 \hat{E}[A|Z]\); \(\hat{\beta}_1\) equals IV estimate.  
- **案例分析**:  
  - Weak instruments yield wide confidence intervals (e.g., 95% CI: -36.5 to 41.3 kg) and amplify bias.  

---

#### 16.3 A fourth identifying condition: homogeneity  
**技术重点 (Technical Points)**:  
- **核心理论**:  
  - Three homogeneity conditions for IV estimand to equal \(E[Y^{a=1}] - E[Y^{a=0}]\):  
    1. Constant treatment effect (implausible; implies rank preservation).  
    2. Equal average effect across \(Z\) in treated/untreated:  
       \(E[Y^{a=1} - Y^{a=0}|Z=1, A=a] = E[Y^{a=1} - Y^{a=0}|Z=0, A=a]\).  
    3. No additive effect modification by unmeasured \(U\):  
       \(E[Y^{a=1}|U] - E[Y^{a=0}|U] = E[Y^{a=1}] - E[Y^{a=0}]\).  
  - General condition: \(\text{Cov}[e(U), t(U)] = 0\), where:  
    - \(e(U) = E[Y^{a=1} - Y^{a=0}|U]\) (effect modification by \(U\)).  
    - \(t(U) = E[A|Z=1,U] - E[A|Z=0,U]\) (modification of \(Z\)-\(A\) association).  
- **重要概念**:  
  - **Additive structural mean model**:  
    \(E[Y - Y^{a=0}|A,Z] = A(\beta_0 + \beta_1 Z)\); \(\beta_0\) is IV estimand if \(\beta_1=0\).  

**细节要点 (Fine Points)**:  
- **辅助信息**:  
  - Homogeneity conditions are untestable and often implausible (e.g., smoking cessation effect varies with prior smoking intensity).  
- **相关背景**:  
  - Covariates can be incorporated via structural mean models to allow effect variation.  

---

#### 16.4 An alternative fourth condition: monotonicity  
**技术重点 (Technical Points)**:  
- **核心理论**:  
  - **Monotonicity**: No defiers (i.e., \(A^{z=1} \geq A^{z=0}\) for all individuals).  
  - Under monotonicity, IV estimand equals the complier average causal effect (CACE):  
    \(E[Y^{a=1} - Y^{a=0} | A^{z=1}=1, A^{z=0}=0]\).  
  - Proof relies on:  
    - Zero effect of \(Z\) on \(Y\) in always-takers/never-takers.  
    - No defiers.  
- **重要概念**:  
  - **Compliance types**: Always-takers, never-takers, compliers, defiers (principal strata).  

**细节要点 (Fine Points)**:  
- **案例分析**:  
  - Smoking cessation: Compliers quit under high cigarette price (\(Z=1\)) but not under low (\(Z=0\)).  
- **辅助信息**:  
  - CACE is a local average treatment effect (LATE), not the population effect.  
  - Monotonicity is plausible in trials but questionable in observational studies (e.g., physician preference instruments).  
- **相关背景**:  
  - Surrogate instruments (e.g., Figures 16.2–16.3) complicate CACE interpretation if \(U_Z\) is continuous.  

---

#### 16.5 The three instrumental conditions revisited  
**技术重点 (Technical Points)**:  
- **核心理论**:  
  - **Weak instruments** (small \(Z\)-\(A\) association):  
    - Amplify bias from violations of (ii)/(iii).  
    - Introduce finite-sample bias.  
  - **Condition (ii) violations**: Direct \(Z \rightarrow Y\) effect (e.g., from dichotomizing continuous treatments).  
  - **Condition (iii) violations**: Unmeasured confounding (e.g., Figure 16.10).  
- **应用场景**:  
  - Adjusting for covariates \(V\) may improve plausibility of exchangeability.  

**细节要点 (Fine Points)**:  
- **辅助信息**:  
  - **Weak instrument definitions**:  
    1. Substantive: Small true \(Z\)-\(A\) association.  
    2. Statistical: First-stage F-statistic < 10.  
  - **Selection bias**: Excluding treatment levels (e.g., \(A=0\)) invalidates IV estimates.  

---

#### 16.6 Instrumental variable estimation versus other methods  
**技术重点 (Technical Points)**:  
- **核心理论**:  
  - IV vs. IP weighting/standardization:  
    - Replaces conditional exchangeability with IV conditions.  
    - More sensitive to minor assumption violations.  
  - **Ideal use cases**:  
    - Strong causal instrument.  
    - Dichotomous, time-fixed treatment.  
    - Homogeneity or monotonicity holds.  
- **重要概念**:  
  - **Regression discontinuity design**: Estimates effect near a threshold (e.g., age 65 for treatment eligibility).  

**细节要点 (Fine Points)**:  
- **辅助信息**:  
  - IV estimates often have wide confidence intervals, limiting practical utility.  
  - Transparency in reporting assumptions (e.g., via sensitivity analyses) is critical.  
- **相关背景**:  
  - Triangulation with other methods (e.g., difference-in-differences) recommended.  

---  
**Figures and Images**:  
- Figures 16.1–16.10 illustrate causal diagrams (e.g., randomized trials, surrogate instruments, violations). Descriptions are contextually summarized above; specific content requires original diagrams.