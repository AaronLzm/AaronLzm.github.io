---
date: 2025-09-17 11:19:05
title: Chapter_18
category: Causal inference
tags: [DeepSeek-R1-0528,response_md]

---
<think>
We are summarizing Chapter 18: "VARIABLE SELECTION AND HIGH-DIMENSIONAL DATA" from the provided text.
 The chapter has several sections and fine points. We'll structure the summary by sections and include the technical points as described.

 Note: The text includes references to figures (e.g., Figure 18.1, 18.2, etc.) but we don't have the images. We'll describe the content based on the text and context.

 We break down the chapter into:
  18.1 The different goals of variable selection
  18.2 Variables that induce or amplify bias
  18.3 Causal inference and machine learning
  18.4 Doubly robust machine learning estimators
  18.5 Variable selection is a difficult problem

 Also, there are Fine Points and Technical Points that we will integrate.

 Let's start with the chapter introduction and then each section.
</think>
### Chapter 18: VARIABLE SELECTION AND HIGH-DIMENSIONAL DATA  
*This chapter addresses variable selection challenges in causal inference, contrasting predictive modeling goals with causal objectives. It identifies bias-inducing variables, introduces machine learning solutions for high-dimensional data, and emphasizes domain knowledge for valid causal estimates.*

#### 18.1 The different goals of variable selection  
**Technical Points**:  
- **Core theory**: Causal inference requires adjustment for confounders \(L\) to achieve conditional exchangeability (\(A \perp\!\!\!\perp Y^a | L\)), unlike predictive modeling which quantifies associations without causal interpretation.  
- **Important concept**: Confounding is irrelevant in predictive models (e.g., smoking cessation \(A\) and weight gain \(Y\) association), as parameters lack causal meaning.  
- **Application scenario**: Clinical prediction models (e.g., heart failure risk) classify patients but cannot guide interventions.  

**Details Points**:  
- **Predictive algorithms**: Use cross-validation to optimize tuning parameters (e.g., lasso/ridge regularization, neural net depth/width).  
- **Black-box limitations**: Lack interpretability for clinical decisions and may fail in new settings due to reliance on noncausal features.  

---

#### 18.2 Variables that induce or amplify bias  
**Technical Points**:  
- **Bias mechanisms**:  
  - **Colliders** (e.g., Figure 18.1): Adjustment induces *selection bias under the null* (bias when true effect is zero).  
  - **Mediators** (e.g., Figure 18.4): Adjustment causes *overadjustment*, blocking causal paths (e.g., direct vs. total effects).  
  - **Instruments** (e.g., Figure 18.7): Adjustment may *amplify bias* from unmeasured confounders \(U\) (*Z-bias*).  
- **Key formula**: G-formula contrast for \(E[Y^a]\) becomes biased if \(L\) is a collider:  
  $$\sum_l E[Y|A=1,L=l] \Pr(L=l) - \sum_l E[Y|A=0,L=l] \Pr(L=l) \neq E[Y|A=1] - E[Y|A=0]$$  

**Details Points**:  
- **Temporal order fallacy**: Post-treatment variables (e.g., Figure 18.5) can be valid adjusters if not affected by treatment.  
- **M-bias** (Figure 18.6): Adjusting for pre-treatment colliders introduces bias; external knowledge is needed to distinguish confounders from colliders.  
- **Bias amplification**: Adjusting for instruments (e.g., \(Z\) in Figure 18.7) can inflate bias from \(U\), but reduction is also possible.  

---

#### 18.3 Causal inference and machine learning  
**Technical Points**:  
- **Estimation challenge**: In high-dimensional \(X\), parametric models (e.g., GLMs) for \(b(X) = E[Y|A=1,X]\) or \(\pi(X) = \Pr(A=1|X)\) are misspecified.  
- **Machine learning solution**: Use flexible models (e.g., splines, lasso, neural nets) to estimate \(b(X)\) and \(\pi(X)\), but require integration with doubly robust estimators.  

**Details Points**:  
- **Model specification**: High-dimensional transformations \(s(X)\) (e.g., cubic splines) improve flexibility but risk non-convergence if \(\dim(s(X)) > n\).  
- **Algorithm selection**: Tree-based methods (random forests) or deep learning outperform parametric models for conditional expectations.  

---

#### 18.4 Doubly robust machine learning estimators  
**Technical Points**:  
- **Doubly robust (DR) bias**: Bias of DR estimator \(\hat{E}[Y^{a=1}]\) depends on product of errors \(\left(\frac{1}{\pi(x)} - \frac{1}{\hat{\pi}(x)}\right) \times (b(x) - \hat{b}(x))\), allowing small bias if errors are \(o(n^{-1/4})\).  
- **Sample splitting**: Randomly split data into training (estimate \(\hat{b}(x)\), \(\hat{\pi}(x)\)) and estimation (compute DR effect) samples to avoid correlation-induced bias.  
- **Cross-fitting**: Swap samples and average estimates to recover efficiency (e.g., for \(\psi = E[Y^{a=1}]\)):  
  $$\hat{\psi}_{\text{cross-fit}} = \frac{1}{M} \sum_{m=1}^M \hat{\psi}^{(m)}$$  

**Details Points**:  
- **Variance reduction**: Cross-fitting achieves semiparametric efficiency with standard error \(\sqrt{\text{Var}\left(b(X) + \frac{A}{\pi(X)}[Y - b(X)]\right)/\sqrt{n}\).  
- **Implementation**: Use bootstrapping for 95% confidence intervals.  

---

#### 18.5 Variable selection is a difficult problem  
**Technical Points**:  
- **Limitations of DR-ML**:  
  1. Requires domain knowledge to exclude bias-inducing variables.  
  2. High computational cost for time-varying treatments.  
  3. Large variance if \(\pi(X) \approx 0/1\) for some \(X\).  
- **Variance-bias tradeoff**: Excluding variables to reduce variance invalidates confidence intervals.  

**Details Points**:  
- **Practical advice**: Conduct sensitivity analyses with multiple methods to assess result robustness.  
- **Philosophical challenge**: Confidence intervals assume all confounders are measured; unmeasured confounders undermine interpretability.  

---  
**Figures Summary** (based on contextual descriptions):  
- **Figures 18.1–18.7**: Illustrate causal diagrams for colliders, mediators, instruments, and backdoor paths. Key takeaway: Adjustment decisions require causal knowledge, not temporal order.  
- **Fine Points 18.1–18.2**: Describe variable selection methods (e.g., lasso, cross-validation) and overfitting solutions.  
- **Technical Points 18.1–18.2**: Detail AIPW estimator algorithms and asymptotic properties of cross-fit estimators.