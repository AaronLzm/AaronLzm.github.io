---
title: Chapter_16
category: Causal inference
tags: [DeepSeek-R1-0528-2nd,response_md]

---
<think>
We are summarizing Chapter 16 "Instrumental Variable Estimation" from the provided PDF content. The chapter has several sections and technical points. We'll break it down step by step.

 Steps:
 1. Identify the main sections and subsections.
 2. Extract technical points and fine points.
 3. Summarize the content by section, focusing on:
    - Technical Points: core theories, key formulas, important concepts, application scenarios.
    - Fine Points: specific examples, auxiliary information, background, and details.

 Note: We cannot interpret images, so we rely on the text descriptions and context.

 Chapter Structure:
   - 16.1 The three instrumental conditions
   - Technical Point 16.1: The instrumental conditions, formally.
   - Fine Point 16.1: Candidate instruments in observational studies.
   - 16.2 The usual IV estimand
   - Technical Point 16.2: Bounds: Partial identification of causal effects.
   - Technical Point 16.3: Additive structural mean models and IV estimation.
   - Technical Point 16.4: Multiplicative structural mean models and IV estimation.
   - 16.3 A fourth identifying condition: homogeneity
   - Technical Point 16.5: Proof of the general homogeneity condition.
   - 16.4 An alternative fourth condition: monotonicity
   - Technical Point 16.6: More general structural mean models.
   - Technical Point 16.7: Monotonicity and the effect in the compliers.
   - 16.5 The three instrumental conditions revisited
   - Fine Point 16.2: Defining weak instruments.
   - 16.6 Instrumental variable estimation versus other methods
   - Fine Point 16.3: Regression discontinuity design.

 We'll proceed section by section, including the technical and fine points in their respective sections.

 Important: We must use LaTeX for formulas and markdown formatting.
</think>
### Chapter 16: INSTRUMENTAL VARIABLE ESTIMATION  
**Introduction**  
- Causal inference methods previously discussed require measuring all confounders, but residual bias persists if unmeasured confounders exist.  
- Instrumental variable (IV) estimation offers an alternative approach under different assumptions, avoiding the need to measure all confounders.  

---

#### 16.1 The three instrumental conditions  
**Subchapter Content**  
- **Causal diagram (Figure 16.1)**: Depicts a double-blind randomized trial where:  
  - \(Z\): Randomization assignment (1: treatment, 0: placebo).  
  - \(A\): Actual treatment received (non-adherence possible).  
  - \(Y\): Outcome.  
  - \(U\): Unmeasured factors affecting both \(A\) and \(Y\).  
- **Problem**: Standard methods (IP weighting, standardization, etc.) require adjusting for \(U\) to block backdoor path \(A \leftarrow U \rightarrow Y\).  
- **IV solution**: Uses an instrumental variable \(Z\) meeting three conditions:  
  (i) \(Z\) is associated with \(A\) (relevance).  
  (ii) \(Z\) affects \(Y\) only through \(A\) (exclusion restriction).  
  (iii) \(Z\) and \(Y\) share no common causes (exchangeability).  
- **Observational example**: Cigarette price as a candidate instrument for smoking cessation (\(A\)) and weight change (\(Y\)). Only condition (i) is empirically verifiable.  

**Technical Points (Technical Point 16.1)**  
- **Formal definitions**:  
  - (i) Relevance: \(Z \not\!\perp\!\!\!\perp A\) (non-null association).  
  - (ii) Exclusion restriction: \(Y^{z,a} = Y^{a}\) (no direct effect of \(Z\) on \(Y\)).  
  - (iii) Exchangeability: \(Y^{a,z} \perp\!\!\!\perp Z\) (marginal or joint).  
- **Instrument types**:  
  - *Causal instrument*: \(Z\) directly affects \(A\) (Figure 16.1).  
  - *Surrogate instrument*: Proxy for unmeasured causal instrument \(U_Z\) (Figures 16.2, 16.3).  

**Fine Points (Fine Point 16.1)**  
- **Candidate instruments in observational studies**:  
  - *Genetic factors*: e.g., ALDH2 polymorphism for alcohol effects (Mendelian randomization).  
  - *Preference*: Physician’s prescribing preference (e.g., last prescription issued).  
  - *Access*: Physical distance to facility or calendar period.  
- **Weak instrument**: Defined by small \(Z\)-\(A\) association (e.g., risk difference = 6%).  

---

#### 16.2 The usual IV estimand  
**Subchapter Content**  
- **IV estimand for dichotomous \(Z\)**:  
  \[
  \frac{E[Y|Z=1] - E[Y|Z=0]}{E[A|Z=1] - E[A|Z=0]}
  \]  
- **Intuition**: Numerator = intent-to-treat effect of \(Z\) on \(Y\); denominator = effect of \(Z\) on \(A\) (adherence).  
- **Estimation**:  
  - Standard IV estimator: Ratio of sample averages.  
  - Two-stage least squares:  
    1. Fit \(E[A|Z] = \alpha_0 + \alpha_1 Z\), predict \(\hat{A}\).  
    2. Fit \(E[Y|Z] = \beta_0 + \beta_1 \hat{A}\); \(\hat{\beta}_1\) = IV estimate.  
- **Example**: Smoking cessation (\(A\)) and weight gain (\(Y\)) with price instrument (\(Z\)):  
  - Estimate = 2.4 kg (95% CI: -36.5 to 41.3), indicating weak instrument issues.  

**Technical Points (Technical Point 16.2, 16.3, 16.4)**  
- **Partial identification**: Bounds for causal effects can be narrowed using IVs but often remain wide/uninformative.  
- **Structural mean models**:  
  - *Additive*: \(E[Y - Y^{a=0}|A,Z] = A(\beta_0 + \beta_1 Z)\).  
    - Usual IV estimand = \(\beta_0\) under no effect modification by \(Z\) (\(\beta_1=0\)).  
  - *Multiplicative*: Identifies causal risk ratios under multiplicative homogeneity.  

---

#### 16.3 A fourth identifying condition: homogeneity  
**Subchapter Content**  
- **Homogeneity conditions (iv)**:  
  1. Constant treatment effect across individuals (implausible).  
  2. Equal average effect across \(Z\) in treated/untreated.  
  3. No additive effect modification by unmeasured \(U\).  
  4. Constant \(Z\)-\(A\) association across \(U\).  
- **General condition**:  
  \[
  \text{Cov}\left[E[Y^{a=1} - Y^{a=0}|U], E[A|Z=1,U] - E[A|Z=0,U]\right] = 0.
  \]  
- **Challenges**: Homogeneity is often implausible (e.g., smoking cessation effect varies with unmeasured smoking intensity).  

**Technical Point (Technical Point 16.5)**  
- **Proof**: IV estimand equals \(E[Y^{a=1} - Y^{a=0}]\) under general homogeneity.  

---

#### 16.4 An alternative fourth condition: monotonicity  
**Subchapter Content**  
- **Compliance types**: Always-takers, never-takers, compliers, defiers.  
- **Monotonicity (iv)**: No defiers (\(A^{z=1} \geq A^{z=0}\)).  
- **IV estimand under monotonicity**:  
  \[
  E[Y^{a=1} - Y^{a=0} | \text{compliers}].
  \]  
- **Criticisms**:  
  - Compliers are unobservable and instrument-dependent.  
  - Monotonicity may not hold in observational studies (e.g., physician preference instruments).  
  - Interpretation unclear for surrogate instruments.  

**Technical Points (Technical Point 16.6, 16.7)**  
- **Structural mean models with covariates**: Adjust for pre-instrument covariates \(V\).  
- **Proof**: IV estimand = complier average causal effect (CACE) under monotonicity.  

---

#### 16.5 The three instrumental conditions revisited  
**Subchapter Content**  
- **Weak instruments (Fine Point 16.2)**:  
  - *Substantive*: Small \(Z\)-\(A\) association.  
  - *Statistical*: First-stage F-statistic < 10.  
  - **Problems**:  
    1. Wide confidence intervals.  
    2. Amplifies bias from violations of (ii)/(iii).  
    3. Finite-sample bias even with valid instruments.  
- **Violations of conditions**:  
  - (ii) Direct effect of \(Z\) on \(Y\) (e.g., from coarsening treatment).  
  - (iii) Confounding for \(Z\)-\(Y\) effect (Figure 16.10).  
- **Mitigation**: Adjust for measured covariates \(V\), but balance checks may be misleading.  

---

#### 16.6 Instrumental variable estimation versus other methods  
**Subchapter Content**  
- **Key differences from IP weighting/standardization**:  
  1. Replaces conditional exchangeability with IV assumptions.  
  2. Minor violations can cause large biases.  
  3. Best suited for point interventions with strong instruments.  
- **Regression discontinuity (Fine Point 16.3)**: Estimates causal effects near a cutoff (e.g., age 65 for treatment eligibility) under continuity assumptions.  
- **Triangulation**: Combine IV with other methods for robustness.  

---

**Figures Summary**  
- **Figure 16.1**: Causal instrument in a randomized trial.  
- **Figures 16.2–16.3**: Surrogate instruments.  
- **Figures 16.4–16.7**: Compliance types (always-takers, compliers, etc.).  
- **Figures 16.8–16.10**: Violations of IV conditions (direct effects, confounding).  

**Key Limitations**  
- Conditions (ii)/(iii) untestable; homogeneity/monotonicity often implausible.  
- Weak instruments amplify bias.  
- CACE may lack practical relevance.