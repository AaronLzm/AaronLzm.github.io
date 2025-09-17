---
title: Chapter_13
category: Causal inference
tags: [DeepSeek-R1-0528-1st,response_md]

---
<think>
Hmm, the user has provided a detailed chapter from "Causal Inference: What If" on standardization and the parametric g-formula, requesting a comprehensive technical summary. As a Nobel-winning researcher and technical expert, I need to meticulously extract all key points while maintaining absolute fidelity to the source material.

First, I note the chapter's core objective: demonstrating standardization as an alternative to IP weighting for estimating smoking cessation's effect on weight gain using NHEFS data. The dataset involves 1629 smokers with 1566 uncensored (C=0). The target parameter is E[Y^{a,c=0}] - the mean outcome under treatment a without censoring.

Key technical distinctions emerge:
- Standardization requires modeling the outcome E[Y|A,C=0,L] rather than treatment probabilities like IP weighting
- Both methods rely on exchangeability, positivity, and consistency, but differ in modeling assumptions
- Fine Point 13.1 highlights crucial differences in handling positivity violations: standardization allows parametric extrapolation but introduces bias

The computational approach is particularly nuanced:
1. For high-dimensional L, they use parametric linear regression with quadratic terms for continuous covariates and treatment-covariate interactions
2. Standardization via the g-formula involves averaging predicted outcomes over L's empirical distribution
3. The clever "dataset expansion" method creates three blocks (observed, all-treated, all-untreated) to compute standardized means

Notable findings:
- Estimated causal effect is 3.5kg (95%CI: 2.6-4.5) via standardization, matching IP weighting results
- Technical Point 13.2 introduces doubly robust estimators combining treatment and outcome models
- The parametric g-formula framework (Robins 1986) is formally defined

The conclusion emphasizes sober interpretation:
- All estimates require exchangeability, positivity, consistency, no measurement error, and correct model specification
- Sensitivity analyses are essential given these untestable assumptions
- Table 2.2's three-block structure visually demonstrates the standardization process

Mathematical formulations must be precisely rendered in LaTeX per request, especially the standardized mean ∑_l E[Y|A=a,C=0,L=l]Pr[L=l] and its continuous counterpart ∫ E[Y|A=a,C=0,L=l] dF_L(l)

I'll ensure every technical nuance - from bootstrap confidence intervals to the distinction between g-formula and g-computation - is preserved without subjective interpretation. The response will maintain academic rigor while adhering to the structured output format.
</think>
### **Chapter 13: Standardization and the Parametric G-Formula**  
**Objective**: Estimate the average causal effect of smoking cessation (\(A\)) on weight gain (\(Y\)) using standardization, contrasting with IP weighting from Chapter 12.  

---

#### **13.1 Standardization as an Alternative to IP Weighting**  
- **Data**: NHEFS study of 1,629 smokers (aged 25–74), with 1,566 uncensored (\(C = 0\)).  
- **Target Parameter**:  
  - \(E[Y^{a,c=0}]\): Mean weight gain if all received treatment \(a\) and remained uncensored.  
  - **Causal Effect**: \(E[Y^{a=1,c=0}] - E[Y^{a=0,c=0}]\).  
- **Confounding Adjustment**:  
  - Covariates \(L\): Sex, age, race, education, smoking intensity/duration, physical activity, weight.  
  - **Assumptions**: Exchangeability, positivity, consistency conditional on \(L\).  
- **Nonparametric Limitation**: Infeasible with high-dimensional \(L\) (9 variables, millions of strata).  

**Fine Point 13.1: Structural Positivity**  
- Positivity violations (i.e., \(\Pr[A=a|L=l]=0\) where \(\Pr[L=l] \neq 0\)) affect both IP weighting and standardization.  
- **Key Difference**:  
  - Standardization with parametric models allows *extrapolation* over positivity violations (introducing bias).  
  - Standard errors for treatment effects\) are typically smaller for standardization than IP weighting under near-violations.  

---

#### **13.2 Estimating the Mean Outcome via Modeling**  
- **Parametric Approach**:  
  - Fit linear regression for \(E[Y|A,C=0]\) with covariates \(L\).  
  - Model includes:  
    - Linear/quadratic terms for continuous variables (age, weight, smoking intensity/duration).  
    - Product term \(A \times \text{smoking intensity}\).  
- **Predicted Outcomes**:  
  - Generate \(\hat{E}[Y|A=a,C=0,L=l]\) for all combinations of \(A\) and \(L\).  
  - Example: Predicted weight gain for a 26-year-old male non-quitter: 0.34 kg.  

---

#### **13.3 Standardizing to the Confounder Distribution**  
- **Standardized Mean**:  
  - Discrete \(L\): \(\sum_l E[Y|A=a,C=0,L=l] \times \Pr[L=l]\).  
  - Continuous \(L\): \(\int E[Y|A=a,C=0,L=l]  dF_L(l)\) (integral over distribution of \(L\)).  
- **Computational Method (4 Steps)**:  
  1. **Expand dataset**: Create three blocks:  
     - Block 1: Observed data.  
     - Block 2: All set to untreated (\(A=0\), \(Y\) missing).  
     - Block 3: All set to treated (\(A=1\), \(Y\) missing).  
  2. **Outcome Model**: Fit regression on Block 1 (e.g., saturated model \(Y \sim A + L + A \times L\)).  
  3. **Prediction**: Impute \(Y\) for Blocks 2 and 3 using model estimates.  
  4. **Standardization**:  
     - Standardized mean under \(A=0\): Mean of predictions in Block 2.  
     - Standardized mean under \(A=1\): Mean of predictions in Block 3.  
- **Result**:  
  - \(E[Y^{a=0,c=0}] = 1.66  \text{kg}\), \(E[Y^{a=1,c=0}] = 5.18  \text{kg}\).  
  - **Causal Effect**: \(5.18 - 1.66 = 3.5  \text{kg}\) (95% CI: 2.6, 4.5 via bootstrap).  

---

#### **13.4 IP Weighting vs. Standardization**  
- **Equivalence**: Nonparametric IP weighted and standardized estimates are identical (Technical Point 2.3).  
- **Modeling Differences**:  
  - IP weighting models \(\Pr[A=a,C=0|L]\).  
  - Standardization models \(E[Y|A=a,C=0,L=l]\).  
- **Practical Advice**:  
  - Use both methods: Large discrepancies indicate model misspecification.  
  - **Doubly Robust Estimators** (Fine Point 13.2, Technical Points 13.2–13.3):  
    - Combine treatment and outcome models (consistent if either model is correct).  
    - Examples: Augmented IPW estimator, TMLE.  
- **G-Formula**:  
  - Standardization is a *plug-in g-formula estimator*.  
  - Parametric g-formula estimates \(E[Y^a\) without modeling distribution of \(L\) if baseline covariates are unaffected by treatment.  

---

#### **13.5 Validity of Estimates**  
- **Critical Assumptions**:  
  1. **Identifiability**: Exchangeability, positivity, consistency.  
  2. **No Measurement Error**: In \(A\), \(Y\), or \(L\).  
  3. **Correct Model Specification**.  
- **Threats**:  
  - Unmeasured confounding, selection bias, positivity violations, vague interventions (e.g., "quitting smoking" has multiple versions).  
- **Sensitivity Analysis Essential**:  
  - Use quantitative bias analysis, negative controls, g-estimation, or instrumental variables (Chapters 7, 14, 16).  
- **Conclusion**:  
  > "We only take our effect estimates as seriously as we take the conditions that are needed to endow them with a causal interpretation."  

---

### **Key Formulas**  
- Standardized Mean:  
  \[
  \sum_l E[Y|A=a,C=0,L=l] \Pr[L=l] \quad \text{(discrete)} 
  \]  
  \[
  \int E[Y|A=a,C=0,L=l]  f_L(l)  dl \quad \text{(continuous)}
  \]  
- Doubly Robust Estimator (Augmented IPW):  
  \[
  \hat{E}[Y^{a}]_{\text{DR}} = \frac{1}{n} \sum_{i=1}^n \left[ \hat{b}(L_i) + \frac{A_i}{\hat{\pi}(L_i)} (Y_i - \hat{b}(L_i)) \right]
  \]  
  where \(\hat{b}(L) = \hat{E}[Y|A=a,L]\), \(\hat{\pi}(L) = \Pr[A=a|L]\).  

### **Conclusion**  
Standardization (parametric g-formula) and IP weighting are complementary methods for causal estimation. Both yielded a 3.5 kg increase in weight due to smoking cessation in the NHEFS study, with robustness checks via bootstrapping. Doubly robust methods and sensitivity analyses are crucial for addressing model uncertainty and unverifiable assumptions.