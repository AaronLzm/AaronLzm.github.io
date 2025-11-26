---
date: 2025-09-17 11:19:05
title: Chapter_13
category: Causal inference
tags: [DeepSeek-R1-0528-2nd,response_md]

---
<think>
We are summarizing Chapter 13: "STANDARDIZATION AND THE PARAMETRIC G-FORMULA" from the provided text.
 The chapter has several sections: 13.1, 13.2, 13.3, 13.4, 13.5, and several Fine Points and Technical Points.

 We'll break down the chapter sections and the key points.

 Note: The text includes tables and images that are described in the text. Since we cannot see the images, we rely on the text descriptions.

 Steps:
 1. Identify the main sections and subsections.
 2. Extract technical points and fine points as per the chapter.
 3. Follow the structure: chapter title, then subchapters, then technical points and fine points.

 The chapter structure as per the text:

 - Chapter 13: STANDARDIZATION AND THE PARAMETRIC G-FORMULA
   - 13.1 Standardization as an alternative to IP weighting
   - Fine Point 13.1: Structural positivity
   - 13.2 Estimating the mean outcome via modeling
   - 13.3 Standardizing the mean outcome to the confounder distribution
   - 13.4 IP weighting or standardization?
   - Technical Point 13.1: Bootstrapping
   - 13.5 How seriously do we take our estimates?
   - Fine Point 13.2: A doubly robust plug-in estimator
   - Technical Point 13.2: Augmented IP weighted estimator
   - Technical Point 13.3: The relationship between the augmented IP weighted estimator and the doubly robust plug-in estimator

 We'll summarize each section in order.

 Important: We must base the summary solely on the provided text and avoid adding any information not present.

 Let's begin.
</think>
### Chapter 13: STANDARDIZATION AND THE PARAMETRIC G-FORMULA  
**Chapter Overview**  
This chapter introduces standardization as an alternative to IP weighting for estimating the average causal effect of smoking cessation on weight gain using observational data. Both methods rely on the same identifiability conditions but differ in modeling assumptions. The parametric g-formula is presented as a method to handle high-dimensional confounders through modeling and standardization.

---

#### 13.1 Standardization as an alternative to IP weighting  
**Technical Points**:  
- **Core Theory**: Standardization estimates the average causal effect \(E[Y^{a=1,c=0}] - E[Y^{a=0,c=0}]\) (mean weight gain if all quit smoking vs. none, with no censoring).  
- **Identifiability Conditions**: Exchangeability, positivity, and consistency conditional on confounders \(L\) (sex, age, race, education, smoking intensity/duration, physical activity, weight).  
- **Key Formula**: Standardized mean for treatment level \(a\):  
  \[
  \sum_{l} E[Y \mid A=a, C=0, L=l] \times \Pr[L=l]
  \]
  For continuous \(L\), replace \(\Pr[L=l]\) with the probability density function \(f_L(l)\).  
- **Contrast with IP Weighting**:  
  - IP weighting models \(\Pr[A=a, C=0 \mid L]\).  
  - Standardization models \(E[Y \mid A=a, C=0, L=l]\).  

**Fine Points**:  
- **Structural Positivity**:  
  - Violations (e.g., \(\Pr[A=a \mid L=l]=0\) where \(\Pr[L=l] \neq 0\)) make \(E[Y \mid A=a, L=l]\) undefined.  
  - Standardization may use parametric extrapolation to "smooth over" strata with structural zeroes, introducing bias but smaller standard errors than IP weighting.  

---

#### 13.2 Estimating the mean outcome via modeling  
**Technical Points**:  
- **Nonparametric Limitation**: Infeasible with high-dimensional \(L\) (e.g., 9 confounders, 403 treated individuals across millions of strata).  
- **Parametric Approach**: Linear regression model for \(E[Y \mid A=a, C=0, L=l]\) with:  
  - Linear/quadratic terms for continuous covariates (age, weight, smoking intensity/duration).  
  - Product term between smoking cessation (\(A\)) and smoking intensity.  
- **Model Specification**: Restricts conditional mean outcomes to parabolic curves and assumes covariate contributions are additive (except \(A \times\) smoking intensity).  

**Fine Points**:  
- **Standardized Mean Integral**:  
  \[
  \int E[Y \mid A=a, C=0, L=l] \, dF_L(l)
  \]
  where \(F_L(\cdot)\) is the joint CDF of \(L\).  

---

#### 13.3 Standardizing the mean outcome to the confounder distribution  
**Technical Points**:  
- **Computational Method**:  
  1. **Expand dataset**: Create three blocks (original data, all untreated \(A=0\), all treated \(A=1\)).  
  2. **Outcome modeling**: Fit regression to \(E[Y \mid A, L]\) using only the original data block.  
  3. **Prediction**: Impute missing \(Y\) in the \(A=0\) and \(A=1\) blocks using model estimates.  
  4. **Standardization**: Average predicted outcomes in the \(A=0\) and \(A=1\) blocks.  
- **Result**: Standardized mean for untreated = 1.66 kg; treated = 5.18 kg; causal effect = 3.52 kg (95% CI: 2.6, 4.5).  

**Fine Points**:  
- **Empirical Distribution**: Uses observed \(L\) for weighting, avoiding explicit estimation of \(\Pr[L=l]\).  

---

#### 13.4 IP weighting or standardization?  
**Technical Points**:  
- **Equivalence**: IP weighted and standardized means are identical only under nonparametric estimation.  
- **Model Misspecification Impact**:  
  - Bias differs between methods due to different modeled quantities (treatment model vs. outcome model).  
  - Similar estimates (e.g., 3.5 kg weight gain) suggest robustness against misspecification.  
- **G-Formula**: Standardization is a plug-in estimator of the g-formula, replacing conditional means with parametric estimates.  

**Fine Points**:  
- **Doubly Robust Estimators**:  
  - Combine treatment and outcome models (e.g., augmented IP weighting, plug-in estimators).  
  - Consistent if either model is correct (see Fine Point 13.2 and Technical Points 13.2–13.3).  

---

#### 13.5 How seriously do we take our estimates?  
**Technical Points**:  
- **Validity Requirements**:  
  1. **Identifiability**: Exchangeability, positivity, consistency.  
  2. **Measurement**: No error in \(A\), \(Y\), or \(L\).  
  3. **Model Specification**: Correct functional forms.  
- **Sensitivity Analysis**: Essential for unverifiable assumptions (e.g., unmeasured confounding, model misspecification).  

**Fine Points**:  
- **Challenges**:  
  - Unmeasured confounders, non-overlapping covariate distributions, ill-defined interventions.  
  - Expert judgment and sensitivity analyses (e.g., quantitative bias analysis, g-estimation) mitigate limitations.  
- **Causal Interpretation**: Estimates are valid only if all conditions hold approximately.  

---

### Fine Points and Technical Points  
#### Fine Point 13.1: Structural Positivity  
- **Key Insight**: Standardization tolerates structural non-positivity via parametric extrapolation, but bias reduces confidence interval coverage.  

#### Fine Point 13.2: Doubly Robust Plug-in Estimator  
- **Method**:  
  1. Estimate IP weights \(W^A = 1/f(A \mid L)\).  
  2. Fit outcome model \(E[Y \mid A, L, R]\) with covariate \(R = W^A\) (if \(A=1\)) or \(R = -W^A\) (if \(A=0\)).  
  3. Predict standardized means under \(A=1\) and \(A=0\); difference is the causal effect.  

#### Technical Point 13.1: Bootstrapping  
- **Application**: Computed 95% CI for standardized mean difference (3.5 kg) by resampling 1629 individuals 1000 times.  

#### Technical Point 13.2: Augmented IP Weighted Estimator  
- **Formula**:  
  \[
  \hat{E}[Y^{a=1}]_{DR} = \frac{1}{n} \sum_{i=1}^n \left[ \hat{b}(L_i) + \frac{A_i}{\hat{\pi}(L_i)} (Y_i - \hat{b}(L_i)) \right]
  \]
  where \(\hat{b}(L)\) and \(\hat{\pi}(L)\) are outcome and treatment model estimates. Asymptotically unbiased if either model is correct.  

#### Technical Point 13.3: Relationship Between Estimators  
- **Link**: Augmented IP weighted and doubly robust plug-in estimators are equivalent when using iteratively reweighted least squares with a "clever covariate."  

---

### Chapter Summary  
**Logical Flow**:  
- Introduces standardization as a solution to high-dimensional confounding.  
- Compares it with IP weighting, highlighting modeling trade-offs.  
- Demonstrates practical implementation via dataset expansion and prediction.  
- Emphasizes causal estimate validity through sensitivity analysis and robustness checks.  

**Key Takeaway**: Both standardization and IP weighting are valid under identifiability conditions, but model misspecification necessitates robustness validation via doubly robust methods or sensitivity analyses.