---
title: Chapter_14
category: Causal inference
tags: [DeepSeek-R1-0528-2nd,response_md]

---
<think>
We are summarizing Chapter 14 of the book "Causal Inference: What If" on G-estimation of Structural Nested Models. The chapter introduces g-estimation as a third method (after IP weighting and standardization) to estimate the average causal effect of smoking cessation on weight gain using the NHEFS data.

The chapter is structured as follows:

14.1 The causal question revisited
14.2 Exchangeability revisited
14.3 Structural nested mean models
14.4 Rank preservation
14.5 G-estimation
14.6 Structural nested models with two or more parameters

We will summarize each section in turn, extracting technical points and fine points as required.

Note: The images (Figures 14.1, 14.2, 14.3) are described in the text. We will summarize the descriptions as per the text.

Let's proceed step by step.
</think>
### Chapter 14: G-ESTIMATION OF STRUCTURAL NESTED MODELS  
**Link to Previous Chapters**: This chapter introduces g-estimation as a third method (alongside IP weighting and standardization from Chapters 12–13) to estimate the average causal effect of smoking cessation (\(A\)) on weight gain (\(Y\)) using the NHEFS dataset. G-methods (IP weighting, standardization, g-estimation) are designed for time-varying treatments but are applied here to a time-fixed treatment for pedagogical clarity.  

---

#### 14.1 The Causal Question Revisited  
**Technical Focus**:  
- **Data and Assumptions**: Analysis restricted to 1,566 individuals with complete baseline (1971–75) and follow-up (1982) data on covariates \(L\): sex, age, race, education, smoking intensity/duration, physical activity, exercise, and alcohol use.  
- **Causal Effect Definition**: The average causal effect on the difference scale is \(E[Y^{a=1,c=0}] - E[Y^{a=0,c=0}]\), representing the difference in mean weight if all were treated (quit smoking) versus untreated, with no censoring (\(c=0\)).  
- **Subgroup Effects**: Interest extends to conditional effects within strata of \(L\) (e.g., age 45: \(E[Y^{a=1,c=0}| \text{age}=45] - E[Y^{a=0,c=0}|\text{age}=45]\)). Marginal structural models (Chapter 12) or standardization (Chapter 13) can estimate subgroup effects.  

**Details**:  
- **Stratification Challenge**: With many strata (e.g., {non-quitter, female, white, age 26, college dropout, etc.}), large datasets or model-based approaches (e.g., adding \(L \times A\) product terms to marginal structural models) are needed.  

---

#### 14.2 Exchangeability Revisited  
**Technical Focus**:  
- **Conditional Exchangeability**: \(Y^a \perp\!\!\!\perp A | L\) for \(a = \{0, 1\}\), implying equal outcome distributions under the same treatment within \(L\)-strata.  
- **Equivalent Definition**: \(\text{Pr}[A=1|Y^{a=0}, L] = \text{Pr}[A=1|L]\).  
- **Logistic Model for G-Estimation**:  
  \(\text{logit Pr}[A=1|Y^{a=0}, L] = \alpha_0 + \alpha_1 Y^{a=0} + \alpha_2 L\),  
  where \(\alpha_2 L = \sum_{j=1}^p \alpha_{2j} L_j\). Under exchangeability, \(\alpha_1 = 0\).  

**Details**:  
- **Purpose**: This re-expression facilitates g-estimation by linking counterfactual outcomes to treatment assignment.  

---

#### 14.3 Structural Nested Mean Models  
**Technical Focus**:  
- **Model Definition**:  
  \(E[Y^a - Y^{a=0} | A=a, L] = \beta_1 a + \beta_2 a L\),  
  where \(\beta_1 + \beta_2 L\) quantifies the conditional average causal effect within \((A, L)\) strata.  
- **Semiparametric Nature**: Unlike parametric g-formula models, structural nested models omit intercept (\(\beta_0\)) and main effects of \(L\) (\(\beta_3 L\)), enhancing robustness.  
- **Censoring Adjustment**: For censoring \(C\), nonstabilized IP weights \(W^C = 1 / \text{Pr}[C=0|L, A]\) create a pseudo-population without censoring.  

**Key Formulas**:  
- Additive causal effect: \(E[Y^a - Y^{a=0}|L] = \beta_1 a + \beta_2 a L\).  
- With censoring: Model becomes \(E[Y^{a,c=0} - Y^{a=0,c=0}|A=a, L] = \beta_1 a + \beta_2 a L\).  

**Details**:  
- **Comparison to Other Models**:  
  - Marginal structural models estimate population-average effects; structural nested models estimate within-\(L\) effects.  
  - Semiparametric marginal structural models (leaving \(E[Y^{a=0}|V]\) unspecified) are equivalent to structural nested models when \(V \subset L\) (See **Fine Point 14.1**).  

---

#### 14.4 Rank Preservation  
**Technical Focus**:  
- **Additive Rank Preservation**: Assumes constant individual causal effect within \(L\)-strata:  
  \(Y_i^a - Y_i^{a=0} = \psi_1 a + \psi_2 a L_i\) for all \(i\).  
- **Implausibility**: Individual treatment effects (e.g., weight gain after smoking cessation) vary biologically, making rank preservation unrealistic.  

**Details**:  
- **Role in G-Estimation**: Rank-preserving models simplify g-estimation intuition but are not required for validity. Structural nested mean models do not assume rank preservation.  
- **Visualization**:  
  - **Figure 14.1/14.2**: Show rank preservation within strata \(L=l\) and \(L=l'\) with constant shifts \(\psi_1 + \psi_2 l\).  
  - **Figure 14.3**: Illustrates non-rank-preserving scenario with variable individual shifts.  

---

#### 14.5 G-Estimation  
**Technical Focus**:  
- **Rank-Preserving Model**: \(Y^{a=0} = Y - \psi_1 A\).  
- **Procedure**:  
  1. Compute candidate counterfactuals \(H(\psi^\dagger) = Y - \psi^\dagger A\).  
  2. Fit logistic model: \(\text{logit Pr}[A=1|H(\psi^\dagger), L] = \alpha_0 + \alpha_1 H(\psi^\dagger) + \alpha_2 L\).  
  3. Find \(\psi^\dagger\) such that \(\alpha_1 = 0\) (indicating \(H(\psi^\dagger) \perp\!\!\!\perp A | L\)).  
- **Estimation**:  
  - Point estimate: \(\hat{\psi}_1 = 3.4\) kg (for smoking cessation effect).  
  - 95% CI: \([2.5, 4.5]\) kg (by test inversion or bootstrapping).  
- **Censoring Adjustment**: Uncensored individuals (\(C=0\)) weighted by \(W^C\).  

**Key Insight**:  
- Validity requires correct specification of the structural mean model, not rank preservation.  
- **Sensitivity Analysis**: For unmeasured confounding, test \(\alpha_1 = \delta\) (expected deviation from 0) instead of \(\alpha_1 = 0\) (See **Fine Point 14.2**).  

---

#### 14.6 Structural Nested Models with Two or More Parameters  
**Technical Focus**:  
- **Model with Effect Modification**:  
  \(E[Y^a - Y^{a=0}|A=a, L] = \beta_1 a + \beta_2 a V\) (e.g., \(V = \text{smoking intensity}\)).  
- **G-Estimation**:  
  - Define \(H(\beta^\dagger) = Y - \beta_1^\dagger A - \beta_2^\dagger A V\).  
  - Fit logistic model: \(\text{logit Pr}[A=1|H(\beta^\dagger), L] = \alpha_0 + \alpha_1 H(\beta^\dagger) + \alpha_2 H(\beta^\dagger)V + \alpha_3 L\).  
  - Solve for \(\beta^\dagger\) where \(\alpha_1 = \alpha_2 = 0\).  
- **Closed-Form Solution**: For linear models, estimators exist without parameter search.  

**Results**:  
- Estimates: \(\hat{\beta}_1 = 2.86\), \(\hat{\beta}_2 = 0.03\).  
- Population effect: \(\beta_1 + \frac{1}{n} \sum_i \sum_j \beta_{2j} L_{ij}\).  

**Details**:  
- **Misspecification Risk**: Omitting product terms (e.g., \(\beta_2 a V\)) biases estimates if effect modification exists.  
- **Null Preservation**: Structural nested models preserve the null hypothesis (no effect) correctly.  

---

### Technical Points Summary  
- **14.1 Multiplicative Models**: For non-negative/binary outcomes, multiplicative structural nested models (e.g., \(\log \frac{E[Y^a|A=a,L]}{E[Y^{a=0}|A=a,L]} = \beta_1 a + \beta_2 a L\)) avoid rare-outcome restrictions.  
- **14.2 G-Estimation Equations**: Closed-form solutions exist for linear models. Doubly robust estimators combine models for \(E[A|L]\) and \(E[Y^{a=0}|L]\).  

### Figures  
- **Figures 14.1–14.3**: Illustrate rank preservation (constant shift within \(L\)-strata) vs. non-preservation (variable shifts). Descriptions align with bell-shaped distributions of \(Y^{a=0}\) and \(Y^{a=1}\).  

---  
**Conclusion**: G-estimation provides a flexible, semiparametric approach to estimate conditional causal effects, robust to model misspecification when combined with IP weighting for censoring. Its extension to sensitivity analyses enhances applicability in observational studies.