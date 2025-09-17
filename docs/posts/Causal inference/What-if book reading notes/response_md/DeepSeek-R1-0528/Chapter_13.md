---
title: Chapter_13
category: Causal inference
tags: [DeepSeek-R1-0528,response_md]

---
<think>
We are summarizing Chapter 13: "STANDARDIZATION AND THE PARAMETRIC G-FORMULA" from the provided text.
 The chapter has several sections and technical points. We will structure the summary by the sections and include the technical points as part of the relevant sections.

 Steps:
 1. Identify the main sections and subsections.
 2. Extract technical points and fine points as they appear in the text.
 3. Summarize each section by extracting the technical points and fine points as per the format.

 The chapter sections are:
  13.1 Standardization as an alternative to IP weighting
  13.2 Estimating the mean outcome via modeling
  13.3 Standardizing the mean outcome to the confounder distribution
  13.4 IP weighting or standardization?
  13.5 How seriously do we take our estimates?

 Additionally, there are:
  Fine Point 13.1: Structural positivity
  Technical Point 13.1: Bootstrapping
  Fine Point 13.2: A doubly robust plug-in estimator
  Technical Point 13.2: Augmented IP weighted estimator
  Technical Point 13.3: The relationship between the augmented IP weighted estimator and the doubly robust plug-in estimator

 We will follow the structure of the chapter and include the fine points and technical points in the sections where they are mentioned.

 Note: The chapter starts with an introduction and then goes into the sections.

 We break down the text by the page breaks and section headers.

 Important: We must use the exact section titles as in the text.

 We note that the chapter uses the example of estimating the average causal effect of smoking cessation (A) on weight gain (Y) using the NHEFS data.

 We are to extract:
  - Technical Points: core theory, key formulas, important concepts, application scenarios.
  - Fine Points: case studies, auxiliary information, background, etc.

 Format:
  For each section, we will have:
    **Section Title**
    [Brief summary of the section content]

    **Technical Points**:
      - ... (as per the format)

    **Fine Points**:
      - ... (as per the format)

 We must use LaTeX for formulas.

 Let's begin.
</think>
### Chapter 13: STANDARDIZATION AND THE PARAMETRIC G-FORMULA  
**Introduction**  
This chapter describes standardization as an alternative to IP weighting for estimating the average causal effect of smoking cessation (A) on weight gain (Y) using NHEFS observational data (n=1,629 smokers, 1,566 uncensored). Both methods rely on the same identifiability conditions but differ in modeling assumptions.  

#### 13.1 Standardization as an alternative to IP weighting  
**Technical Points**:  
- **Core Theory**: Standardization estimates the average causal effect \(E[Y^{a=1,c=0}] - E[Y^{a=0,c=0}]\) by adjusting for confounders \(L\) (sex, age, race, education, smoking intensity/duration, physical activity, weight).  
- **Key Formula**: The standardized mean is \(\sum_l E[Y|A=a,C=0,L=l] \times \Pr[L=l]\). For continuous \(L\), this becomes \(\int E[Y|A=a,C=0,L=l] \, dF_L(l)\).  
- **Identifiability Conditions**: Requires exchangeability, positivity, and consistency conditional on \(L\).  
- **Application**: Alternative to IP weighting for high-dimensional data with nondichotomous treatments.  

**Fine Points**:  
- **Positivity Impact**: Deviations from positivity affect IP weighting and standardization differently. Standardization allows parametric extrapolation over structural zeroes but may introduce bias (Fine Point 13.1).  
- **Data Context**: Quitters (\(A=1\), n=403) and non-quitters (\(A=0\), n=1,163) differ in covariate distribution; observed associational difference (2.5 kg) ≠ causal effect.  

---

#### 13.2 Estimating the mean outcome via modeling  
**Technical Points**:  
- **Modeling Approach**: For high-dimensional \(L\), parametric models (e.g., linear regression) estimate \(E[Y|A=a,C=0,L=l]\).  
- **Model Specification**: Includes linear/quadratic terms for continuous covariates (age, weight) and product terms (e.g., \(A \times\) smoking intensity).  
- **Key Formula**: Standardized mean is \(E[E[Y|A=a,C=0,L]]\), estimated via \(\frac{1}{n} \sum_{i=1}^n \hat{E}[Y|A=a,C=0,L_i]\).  

**Fine Points**:  
- **Nonparametric Limitation**: Impractical for millions of strata; parametric smoothing is necessary.  
- **Example Estimate**: Predicted weight gain for a specific covariate combination (e.g., non-quitter, male, age 26) was 0.34 kg.  

---

#### 13.3 Standardizing the mean outcome to the confounder distribution  
**Technical Points**:  
- **Estimation Method**:  
  1. Expand dataset into three blocks: original data, all untreated (\(A=0\)), all treated (\(A=1\)).  
  2. Fit outcome model \(E[Y|A,L]\) using original data.  
  3. Predict outcomes for \(A=0\) and \(A=1\) blocks.  
  4. Average predictions: \(\text{mean}(Y|A=0)\) and \(\text{mean}(Y|A=1)\).  
- **Result**: Standardized mean difference = 5.18 kg (treated) - 1.66 kg (untreated) = 3.5 kg.  

**Fine Points**:  
- **Bootstrap Confidence Interval**: 95% CI [2.6, 4.5] kg via nonparametric bootstrap (Technical Point 13.1).  
- **Efficiency**: Uses empirical distribution of \(L\), avoiding explicit modeling of \(\Pr[L=l]\).  

---

#### 13.4 IP weighting or standardization?  
**Technical Points**:  
- **Equivalence**: IP weighted and standardized means are equal only under nonparametric estimation.  
- **Model Misspecification**:  
  - IP weighting models \(\Pr[A=a,C=0|L]\) (treatment model).  
  - Standardization models \(E[Y|A=a,C=0,L]\) (outcome model).  
- **Doubly Robust Estimators**: Combine both models (e.g., augmented IP weighting, plug-in estimators) for consistency if either model is correct (Fine Point 13.2, Technical Points 13.2–13.3).  

**Fine Points**:  
- **Practical Advice**: Use both methods; agreement suggests robustness to misspecification.  
- **g-Formula**: Standardization is a plug-in estimator of the parametric g-formula, generalizing to time-varying treatments.  

---

#### 13.5 How seriously do we take our estimates?  
**Technical Points**:  
- **Validity Requirements**:  
  1. Identifiability (exchangeability, positivity, consistency).  
  2. No measurement error.  
  3. Correct model specification.  
- **Sensitivity Analysis**: Essential for unverifiable assumptions (e.g., unmeasured confounding, selection bias).  

**Fine Points**:  
- **Caveats**:  
  - Effect estimate (3.5 kg) assumes no unmeasured confounding, perfect measurement, and correct models.  
  - Real-world deviations (e.g., vague treatment versions, mismeasurement) may bias estimates.  
- **Expert Judgment**: Causal interpretations rely on untestable assumptions; skepticism and sensitivity analyses are critical.  

---

### Technical and Fine Points Summaries  
**Fine Point 13.1 (Structural Positivity)**  
- **Key Insight**: Standardization tolerates structural non-positivity via parametric extrapolation, but biases confidence intervals. Standard errors are smaller than IP weighting under positivity violations.  

**Technical Point 13.1 (Bootstrapping)**  
- **Method**: Resample with replacement (1,000 samples) to estimate standard errors for confidence intervals.  
- **Application**: Used for the standardized mean difference (95% CI: [2.6, 4.5] kg).  

**Fine Point 13.2 (Doubly Robust Plug-in Estimator)**  
- **Method**: Combines IP weights \(W^A = 1/f(A|L)\) and outcome model with covariate \(R = W^A \cdot I(A=1) - W^A \cdot I(A=0)\).  
- **Advantage**: Consistent if either treatment or outcome model is correct.  

**Technical Point 13.2 (Augmented IP Weighted Estimator)**  
- **Formula**:  
  $$\hat{E}[Y^{a=1}]_{DR} = \frac{1}{n} \sum_{i=1}^n \left[ \hat{b}(L_i) + \frac{A_i}{\hat{\pi}(L_i)} (Y_i - \hat{b}(L_i)) \right]$$  
- **Property**: Second-order bias allows machine learning for high-dimensional \(L\).  

**Technical Point 13.3 (AIPW and TMLE)**  
- **Relationship**: Augmented IPW and targeted minimum loss-based estimation (TMLE) are equivalent under specific model constraints. TMLE uses "clever covariates" for doubly robust plug-in estimation.  

---  
**Note**: All conclusions are derived directly from the source text. Assumptions (e.g., exchangeability) are untestable; sensitivity analyses are recommended.