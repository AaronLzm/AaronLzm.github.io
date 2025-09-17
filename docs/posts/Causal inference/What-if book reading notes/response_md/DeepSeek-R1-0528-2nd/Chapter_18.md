---
title: Chapter_18
category: Causal inference
tags: [DeepSeek-R1-0528-2nd,response_md]

---
<think>
We are summarizing Chapter 18: "VARIABLE SELECTION AND HIGH-DIMENSIONAL DATA" from the provided text.
 The chapter has several sections and fine points. We will structure the summary by the sections and include the fine points as sub-sections.

 Important: We must base the summary solely on the provided text. For images, we note that they are referenced in the text (e.g., Figure 18.1, 18.2, etc.) but we don't have the images. We will describe the information based on the text that refers to them.

 Steps:
 1. Start with the introduction of the chapter (Page 1).
 2. Then section 18.1: The different goals of variable selection.
 3. Section 18.2: Variables that induce or amplify bias (with embedded Fine Points 18.1 and 18.2).
 4. Section 18.3: Causal inference and machine learning.
 5. Section 18.4: Doubly robust machine learning estimators (with Technical Points 18.1 and 18.2).
 6. Section 18.5: Variable selection is a difficult problem.

 We note that the text includes several figures (18.1 to 18.7) and fine points (18.1, 18.2) and technical points (18.1, 18.2). We will summarize the content as described in the text.

 Since the text is long, we break the summary by the major sections and include the fine points and technical points as sub-sections.

 Format: Use the example output format provided.

 Note: The text on Page 13 and 14 is just the start of Part III and is not part of Chapter 18, so we ignore it.

 Let's begin.
</think>
### Chapter 18: VARIABLE SELECTION AND HIGH-DIMENSIONAL DATA  
**Introduction**  
This chapter addresses variable selection for causal inference, contrasting it with predictive modeling. All causal adjustment methods (stratification, outcome regression, standardization, IP weighting, g-estimation) require a set of adjustment variables \(L\) that ensure conditional exchangeability. The chapter outlines guidelines for selecting \(L\) in causal analyses, emphasizing that criteria differ from predictive modeling due to the risk of introducing bias.  

#### 18.1 The different goals of variable selection  
**Technical Points**:  
- **Core Theory**: Causal inference requires adjustment for confounders \(L\) to interpret associations as causal effects. Without adjustment, association measures cannot be causal.  
- **Important Concept**: Confounding is a causal concept; it does not apply when the estimand is purely associational (e.g., predictive models).  
- **Application Scenarios**:  
  - *Causal inference*: Adjust for confounders to estimate treatment effects.  
  - *Predictive modeling*: Include covariates predictive of the outcome, regardless of confounding status.  

**Details Points**:  
- **Case Analysis**: Smoking cessation (\(A\)) and weight gain (\(Y\)) – association estimation requires no confounder adjustment; causal effect estimation does.  
- **Background**: Predictive models (e.g., heart failure risk classification) use covariates without causal interpretation. Hospitalization predicts heart failure but is not a target for intervention.  
- **Key Distinction**: Identifying high-risk patients (prediction) vs. identifying effective treatments (causal inference).  

#### 18.2 Variables that induce or amplify bias  
**Technical Points**:  
- **Core Theory**: Adjusting for certain variables induces bias even with infinite data:  
  - *Colliders* (e.g., Figure 18.1): Adjustment creates spurious associations (selection bias under the null).  
  - *Mediators* (e.g., Figure 18.4): Adjustment blocks causal paths (overadjustment), biasing total effect estimates.  
  - *Instruments* (e.g., Figure 18.7): Adjustment amplifies unmeasured confounding (Z-bias).  
- **Key Formulas**:  
  - G-formula contrast: \(\sum_l E[Y|A=1,L=l] \Pr(L=l) - \sum_l E[Y|A=0,L=l] \Pr(L=l)\) becomes biased if \(L\) is a collider.  
  - Bias amplification: Occurs when adjusting for instruments (e.g., \(Z\) in Figure 18.7).  

**Details Points**:  
- **Case Analysis**:  
  - Figure 18.1: Adjusting for collider \(L\) biases effect estimates even when true effect is null.  
  - Figure 18.3: Selection bias occurs only under the alternative (non-null effect).  
  - Figure 18.5: Post-treatment variables can be adjusted for if they block backdoor paths.  
- **Background**: Temporal order alone cannot determine if \(A\) affects \(L\); causal structure requires subject-matter knowledge.  
- **Fine Point 18.1 (Variable selection for regression models)**:  
  - *Subset selection*: Computationally intensive; includes forward/backward/stepwise methods.  
  - *Shrinkage methods*: Ridge regression and lasso reduce variance by shrinking coefficients.  
- **Fine Point 18.2 (Overfitting and cross-validation)**:  
  - Overfitting: Models fit noise in training data, harming generalizability.  
  - Cross-validation: Splits data into training/validation sets; variants include \(k\)-fold CV. Deep learning resists overfitting with massive data.  

#### 18.3 Causal inference and machine learning  
**Technical Points**:  
- **Core Theory**: Assuming \(X\) contains all confounders and no bias-inducing variables, the goal is to estimate \(E[Y^{a=1}] - E[Y^{a=0}]\) in high-dimensional settings.  
- **Key Concepts**:  
  - \(b(X) = E[Y|A=1, X]\) (for g-formula).  
  - \(\pi(X) = \Pr[A=1|X]\) (for IP weighting).  
- **Challenge**: Traditional parametric models misspecify \(b(X)\) and \(\pi(X)\) when \(X\) is high-dimensional.  

**Details Points**:  
- **Background**: Machine learning (e.g., lasso, random forests, neural nets) improves prediction of \(b(X)\) and \(\pi(X)\) but requires integration with doubly robust estimators.  

#### 18.4 Doubly robust machine learning estimators  
**Technical Points**:  
- **Core Theory**: Doubly robust estimators (e.g., AIPW) have bias proportional to the product of errors in \(\hat{\pi}(x)\) and \(\hat{b}(x)\), enabling valid inference if errors are \(o(n^{-1/4})\).  
- **Key Methods**:  
  - *Sample splitting*: Randomly divide data into training (estimates \(\hat{b}, \hat{\pi}\)) and estimation (computes effect) samples.  
  - *Cross-fitting*: Swaps samples and averages estimates to recover efficiency.  
- **Key Formula**:  
  - AIPW estimator: \(\hat{\psi} = \frac{1}{q} \sum_{i=1}^q \left[ \hat{b}(X_i) + \frac{A_i}{\hat{\pi}(X_i)} (Y_i - \hat{b}(X_i)) \right]\).  

**Details Points**:  
- **Case Analysis**: Full-sample AIPW estimators correlate \(\hat{b}, \hat{\pi}\) with the outcome, invalidating inference; split-sample avoids this.  
- **Technical Point 18.1 (AIPW estimator)**: Steps for split-sample and cross-fit estimation.  
- **Technical Point 18.2 (Statistical properties)**: Asymptotic normality requires \(\hat{b}(x)\) and \(\hat{\pi}(x)\) consistent, with bias \(o(n^{-1/2})\).  

#### 18.5 Variable selection is a difficult problem  
**Technical Points**:  
- **Core Theory**: Doubly robust ML provides valid inference but has limitations:  
  - Subject-matter knowledge gaps may leave residual bias.  
  - High variance arises if \(\pi(X)\) is near 0/1 for some \(X\).  
- **Key Concept**: Variance-bias trade-off: Including all confounders reduces bias but may inflate variance.  

**Details Points**:  
- **Background**:  
  - Discarding variables to reduce variance invalidates confidence intervals.  
  - Sensitivity analyses (e.g., multiple methods) are recommended when estimates conflict.  
- **Philosophical Note**: Observational datasets inherently omit some confounders, complicating interval interpretation.  

### Chapter Summary  
- **Logical Flow**: Contrasts causal vs. predictive goals → details bias from colliders/mediators/instruments → integrates ML with doubly robust estimation → highlights unresolved challenges.  
- **Key Theme**: Variable selection for causal inference requires subject-matter knowledge; automated procedures risk bias. Machine learning must be paired with sample splitting/cross-fitting for valid inference.  
- **Link to Broader Context**: Sets stage for Part III (time-varying treatments) by emphasizing unresolved complexities in confounder selection.  

---  
**Figures**: Described in text but not displayed (e.g., Figure 18.1: collider; Figure 18.4: mediator; Figure 18.7: instrument).  
**Caveats**:  
- Image content inferred from textual descriptions only.  
- No subjective extrapolation; all conclusions based on provided text.