---
date: 2025-09-17 11:19:05
title: Chapter_15
category: Causal inference
tags: [DeepSeek-R1-0528-2nd,response_md]

---
<think>
We are summarizing Chapter 15: "OUTCOME REGRESSION AND PROPENSITY SCORES" from the provided text.
 The chapter has several sections: 15.1 Outcome regression, 15.2 Propensity scores, 15.3 Propensity stratification and standardization, 15.4 Propensity matching, 15.5 Propensity models, structural models, predictive models.
 We will follow the structure and extract the technical points and fine points as per the instructions.

 Note: The text includes Fine Points and Technical Points which are important for understanding.

 Steps:
 1. Break down the chapter by sections and subsections.
 2. For each section, extract:
    - Technical Points: core theories, key formulas, important concepts, application scenarios.
    - Fine Points: specific cases, auxiliary information, background, nuances.

 3. Use Markdown and LaTeX for formulas.

 Let's start with the chapter introduction and then each section.
</think>
### Chapter 15: OUTCOME REGRESSION AND PROPENSITY SCORES  

**Introduction**  
Outcome regression and propensity score methods are widely used parametric approaches for causal inference but are limited to simpler settings. They are unsuitable for time-varying treatments, which require g-methods (IP weighting, standardization, g-estimation). This chapter focuses on conventional methods applicable only to non-longitudinal data.  

---

### 15.1 Outcome Regression  
**Technical Points**:  
- **Core Theory**: Estimates causal effects by modeling the outcome conditional on treatment \(A\) and covariates \(L\). The structural model is:  
  \(E[Y^{a,c=0}|L] = \beta_0 + \beta_1a + \beta_2aL + \beta_3L\), where:  
  - \(\beta_1, \beta_2\): Parameters for causal effects of \(A\) on \(Y\) within strata of \(L\).  
  - \(\beta_0, \beta_3\): Nuisance parameters quantifying the baseline mean \(E[Y^{a=0,c=0}|L]\).  
- **Key Formula**: Under exchangeability, positivity, and no censoring, parameters are estimable via OLS regression:  
  \(E[Y|A, C=0, L] = \alpha_0 + \alpha_1A + \alpha_2AL + \alpha_3L\).  
- **Important Concepts**:  
  - **Nuisance Parameters**: \(\beta_0, \beta_3\) lack causal interpretation and must be correctly specified to avoid bias.  
  - **Effect Modification**: Product terms (\(aL\)) capture effect heterogeneity by \(L\).  
- **Application Scenarios**:  
  - Estimating conditional causal effects within covariate strata.  
  - Suitable for continuous or discrete outcomes (e.g., logistic regression for binary \(Y\)).  

**Fine Points**:  
- **Misspecification Bias**: Incorrect modeling of \(L-Y\) relationship (e.g., omitting quadratic terms) biases estimates.  
- **G-Estimation Comparison**: Unlike structural nested models, outcome regression requires correct specification of the \(L-Y\) association but not the treatment model.  
- **Example**: For smoking cessation (\(A\)) and weight gain (\(Y\)), effect estimates varied by smoking intensity (2.8 kg for 5 cigarettes/day vs. 4.4 kg for 40 cigarettes/day).  

---

### 15.2 Propensity Scores  
**Technical Points**:  
- **Core Theory**: Propensity score \(\pi(L) = \Pr[A=1|L]\) balances covariates \(L\) between treated (\(A=1\)) and untreated (\(A=0\)) groups.  
- **Key Properties**:  
  - **Balancing Score**: \(A \perp\!\!\!\perp L \mid \pi(L)\) (covariate distributions equalize within \(\pi(L)\) strata).  
  - **Sufficiency**: Adjusting for \(\pi(L)\) suffices if \(L\) ensures exchangeability.  
- **Important Concepts**:  
  - **Estimation**: \(\pi(L)\) is estimated via logistic regression of \(A\) on \(L\).  
  - **Positivity**: Requires \(0 < \pi(L) < 1\) for all \(L\).  
- **Application Scenarios**:  
  - Replace high-dimensional \(L\) with scalar \(\pi(L)\) for stratification, standardization, or matching.  

**Fine Points**:  
- **Randomized Trials**: \(\pi(L) = 0.5\) for all subjects, ensuring perfect balance.  
- **Overlap**: Distributions of \(\pi(L)\) must overlap between treated/untreated (Figure 15.1 shows overlap in smoking cessation study).  
- **Limitation**: Only balances *measured* covariates; residual confounding possible.  

---

### 15.3 Propensity Stratification and Standardization  
**Technical Points**:  
- **Stratification**:  
  - Divide subjects into strata (e.g., deciles) of estimated \(\pi(L)\).  
  - Estimate causal effect within each stratum: \(E[Y|A=1, C=0, \pi(L)=s] - E[Y|A=0, C=0, \pi(L)=s]\).  
- **Standardization**:  
  - Fit outcome model \(E[Y|A, C=0, \pi(L)]\), then standardize over \(\pi(L)\) distribution.  
  - Formula: \(\sum_s \left( E[Y|A=1, C=0, \pi(L)=s] - E[Y|A=0, C=0, \pi(L)=s] \right) \Pr[\pi(L)=s]\).  
- **Key Requirement**: Correct specification of outcome model (e.g., linearity or splines for \(\pi(L)\)).  

**Fine Points**:  
- **Effect Modification**: Including \(A \times \pi(L)\) interaction terms captures effect heterogeneity.  
- **Bias-Variance Trade-off**:  
  - Decile-based stratification may violate exchangeability if \(\pi(L)\) distributions differ within strata.  
  - Continuous \(\pi(L)\) modeling reduces bias but requires functional form correctness.  
- **Example**: Standardized effect of smoking cessation was 3.6 kg (95% CI: 2.7, 4.6).  

---

### 15.4 Propensity Matching  
**Technical Points**:  
- **Method**: Match treated subjects with untreated subjects having similar \(\pi(L)\) values (e.g., \(\pm 0.05\)).  
- **Target Population**: The matched population (e.g., effect in the treated if untreated are matched to treated).  
- **Consistency**: Under exchangeability and positivity, associational measures in the matched population estimate causal effects.  

**Fine Points**:  
- **Closeness Criteria**:  
  - Too loose → Poor balance → Bias.  
  - Too tight → High exclusion → Wide confidence intervals.  
- **Positivity Handling**: Excludes subjects without matches (e.g., 2 treated with high \(\pi(L)\) in smoking study).  
- **Transportability Issue**: Matched populations are ill-characterized (e.g., defined by \(\pi(L)\) values, not real-world variables).  

---

### 15.5 Propensity Models, Structural Models, Predictive Models  
**Technical Points**:  
- **Propensity Models**:  
  - Model \(\Pr[A=1|L]\); parameters are nuisances (non-causal).  
  - Goal: Ensure exchangeability, not prediction accuracy.  
- **Structural Models**:  
  - Describe causal links (e.g., marginal structural models, structural nested models).  
  - Parameters have causal interpretation (e.g., treatment effects).  
- **Predictive Models**:  
  - Forecast outcomes using associations (no causal interpretation).  

**Fine Points**:  
- **Variable Selection Pitfalls**:  
  - Including instruments or colliders in propensity models amplifies bias.  
  - Predictive algorithms (e.g., stepwise selection) harm causal inference.  
- **Example**: Adding "hospital" (unnecessary covariate) to propensity models inflates variance without reducing bias.  
- **Key Insight**: Causal methods require correct functional form (e.g., splines) and exchangeability/positivity.  

---  
**Logical Flow**:  
- Sections 15.1–15.4 detail methods leveraging covariates (\(L\)) or propensity scores (\(\pi(L)\)) for conditional exchangeability.  
- Section 15.5 contrasts these with predictive modeling, emphasizing causal inference prerequisites.  
- The chapter underscores limitations of conventional methods for complex (e.g., time-varying) treatments, setting up Part III's focus on g-methods.