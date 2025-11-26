---
date: 2025-09-17 11:19:05
title: Chapter_15
category: Causal inference
tags: [DeepSeek-R1-0528,response_md]

---
<think>
We are summarizing Chapter 15: "OUTCOME REGRESSION AND PROPENSITY SCORES" from the provided text.
 The chapter has several sections: 15.1 Outcome regression, 15.2 Propensity scores, 15.3 Propensity stratification and standardization, 15.4 Propensity matching, 15.5 Propensity models, structural models, predictive models.
 We will follow the structure and extract technical points and fine points as required.

 Note: The text includes Fine Points and Technical Points which are part of the content.

 Steps:
 1. Break down by sections and subsections.
 2. Extract technical points (core theories, formulas, concepts, applications).
 3. Extract fine points (details, examples, nuances).
 4. Use LaTeX for formulas.
 5. Use markdown formatting.

 Important: We must base everything on the provided text and avoid adding any external knowledge.

 Let's start with the chapter overview and then each section.
</think>
### Chapter 15: OUTCOME REGRESSION AND PROPENSITY SCORES  
**Overview**  
Outcome regression and propensity score methods are widely used parametric approaches for causal inference but have limited applicability for complex longitudinal data. They are introduced after g-methods (IP weighting, standardization, g-estimation) because conventional implementations cannot handle time-varying treatments.  

---

#### 15.1 Outcome Regression  
**Technical Points**:  
- **Core Theory**: Estimates causal effects by modeling the outcome conditional on treatment \(A\) and covariates \(L\). The structural model is:  
  $$E[Y^{a,c=0}|L] = \beta_0 + \beta_1a + \beta_2aL + \beta_3L$$  
  where:  
  - \(\beta_1, \beta_2\): Parameters for causal effects of \(A\) within \(L\)-strata.  
  - \(\beta_0, \beta_3\): Nuisance parameters modeling \(E[Y^{a=0,c=0}|L]\) (non-causal).  
- **Key Formula**: Parameters estimated via ordinary least squares:  
  $$E[Y|A, C=0, L] = \alpha_0 + \alpha_1A + \alpha_2AL + \alpha_3L$$  
- **Important Concepts**:  
  - Correct specification of \(L-Y\) association is critical for unbiased estimates.  
  - Omitting product terms (e.g., assuming no effect modification by \(L\)) simplifies the effect estimate to \(\hat{\beta}_1\) (e.g., 3.5 kg in smoking cessation example).  
- **Application Scenarios**:  
  - Fixed treatments with sufficient covariate adjustment (\(L\)).  
  - Discrete outcomes (e.g., logistic regression for binary \(Y\)).  

**Fine Points**:  
- **Nuisance Parameters**: \(\beta_0, \beta_3\) lack causal interpretation and must be correctly specified to avoid bias (Fine Point 15.1).  
- **Example**: For smoking cessation (\(A\)) and weight gain (\(Y\)), effect estimates varied by smoking intensity:  
  - 2.8 kg (5 cigarettes/day), 4.4 kg (40 cigarettes/day).  
- **Implementation**: Same as parametric g-formula estimation (Chapter 13).  

---

#### 15.2 Propensity Scores  
**Technical Points**:  
- **Core Theory**: Propensity score \(\pi(L) = \Pr[A=1|L]\) balances covariates between treated (\(A=1\)) and untreated (\(A=0\)) groups.  
- **Key Properties**:  
  - \(A \perp\!\!\!\perp L \mid \pi(L)\): Covariates \(L\) are balanced given \(\pi(L)\).  
  - Exchangeability given \(L\) implies exchangeability given \(\pi(L)\).  
- **Important Concepts**:  
  - **Balancing Score**: Any function \(b(L)\) satisfying \(A \perp\!\!\!\perp L \mid b(L)\) (e.g., \(\pi(L)\)) suffices for adjustment (Technical Point 15.1).  
  - **Positivity**: Requires \(0 < \pi(L) < 1\) for all \(L\).  
- **Application Scenarios**:  
  - Dichotomous treatments only.  
  - Estimated via logistic regression (e.g., for smoking cessation: \(\hat{\pi}(L)\) ranged 0.053–0.793).  

**Fine Points**:  
- **Estimation**: \(\pi(L)\) is unknown in observational studies and must be estimated.  
- **Visualization**: Figure 15.1 shows \(\hat{\pi}(L)\) distributions for quitters/non-quitters (mean: 0.312 vs. 0.245).  
- **Limitation**: Only balances *measured* covariates; residual confounding possible.  

---

#### 15.3 Propensity Stratification and Standardization  
**Technical Points**:  
- **Core Theory**: Stratifies on \(\pi(L)\) to estimate conditional effects:  
  $$E[Y|A=1, C=0, \pi(L)=s] - E[Y|A=0, C=0, \pi(L)=s].$$  
- **Methods**:  
  - **Decile Stratification**: Groups into 10 strata; estimates effects per stratum (e.g., 0.0–6.6 kg in smoking example).  
  - **Outcome Regression**: Models \(E[Y|A, C=0, \pi(L)]\) with \(\pi(L)\) as continuous covariate (e.g., linear term or splines).  
- **Standardization**: Marginal effect via standardization over \(\pi(L)\) distribution.  

**Fine Points**:  
- **Effect Modification**: Including \(A \times \pi(L)\) product terms captures heterogeneity (e.g., 3.5 kg without modification).  
- **Bias-Variance Trade-off**:  
  - Decile stratification may violate exchangeability within strata if \(\pi(L)\) distributions differ between treated/untreated.  
  - Continuous \(\pi(L)\) regression reduces this risk (e.g., estimate 3.6 kg).  
- **Example**: Standardized effect: 3.6 kg (95% CI: 2.7, 4.6).  

---

#### 15.4 Propensity Matching  
**Technical Points**:  
- **Core Theory**: Matches treated/untreated individuals with similar \(\pi(L)\) to create exchangeable groups.  
- **Matching Methods**:  
  - **Closeness Criteria**: e.g., \(\hat{\pi}(L) \pm 0.05\).  
  - **Target Population**: Effect applies to the matched subset (e.g., effect in the treated if matching untreated to treated).  
- **Key Challenge**: Defining "closeness" to balance bias (loose criteria) vs. variance (tight criteria).  

**Fine Points**:  
- **Positivity Handling**: Excludes individuals without close matches (e.g., 2 treated with \(\hat{\pi}(L) > 0.67\) excluded).  
- **Limitations**:  
  - Matched population may be ill-defined (e.g., "individuals with \(\hat{\pi}(L) < 0.67\)").  
  - Prefer restriction based on real-world variables (e.g., age, smoking duration) for transportability.  

---

#### 15.5 Propensity Models, Structural Models, Predictive Models  
**Technical Points**:  
- **Model Types**:  
  - **Propensity Models**: \(\Pr[A=1|L]\) (nuisance parameters; no causal interpretation).  
  - **Structural Models**: Directly model counterfactuals (e.g., marginal structural models, structural nested models).  
- **Key Insight**:  
  - Predictive algorithms (e.g., machine learning) optimize prediction but *harm* causal inference if misapplied.  
- **Important Concepts**:  
  - **Colliders/Instruments**: Inclusion amplifies bias (e.g., hospital variable in \(\pi(L)\) causing near-infinite variance).  

**Fine Points**:  
- **Variable Selection**:  
  - **Causal Inference**: Prioritize confounders over strong predictors.  
  - **Prediction**: Use any variable improving accuracy (e.g., Facebook Likes predicting traits).  
- **Misapplication**: Using predictive metrics (e.g., Mallows’s \(C_p\)) for propensity models inflates variance/bias.  

---  
**Logical Flow**:  
This chapter contrasts conventional methods (outcome regression, propensity scores) with earlier g-methods, emphasizing limitations for complex data. It systematically explores propensity score applications (stratification, matching) and cautions against conflating predictive modeling with causal inference. The discussion sets the stage for alternative methods (e.g., instrumental variables in Chapter 16).