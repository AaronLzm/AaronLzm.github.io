---
title: Chapter_14
category: Causal inference
tags: [DeepSeek-R1-0528,response_md]

---
<think>
We are summarizing Chapter 14: "G-ESTIMATION OF STRUCTURAL NESTED MODELS" from the provided text.
 The chapter introduces g-estimation as a third method (after IP weighting and standardization) to estimate the average causal effect of smoking cessation on weight gain using the NHEFS data.
 The chapter is structured into several sections: 14.1 The causal question revisited, 14.2 Exchangeability revisited, 14.3 Structural nested mean models, 14.4 Rank preservation, 14.5 G-estimation, and 14.6 Structural nested models with two or more parameters.

 We will follow the required format: for each section, we will extract Technical Points and Fine Points, then summarize the Technical Points and Fine Points.

 Note: The text includes three images (Figures 14.1, 14.2, 14.3) which are described in the text but we cannot view. We will note their descriptions from the text.

 Let's break down the chapter section by section.

 14.1 The causal question revisited
   - Reiterates the causal question: average causal effect of smoking cessation (A) on weight gain (Y) in the entire population and in subsets (strata of L).
   - The effect is defined as E[Y^{a=1,c=0] - E[Y^{a=0,c=0] for the entire population, and similarly for subsets (e.g., by age, sex, etc.).
   - Methods to estimate in subsets: marginal structural models with product terms or standardization to the subset.

 14.2 Exchangeability revisited
   - Conditional exchangeability: Y^a ⊥ A | L for a=0,1.
   - Expressed as: Pr[A=1 | Y^{a=0}, L] = Pr[A=1 | L] for a dichotomous treatment.
   - Proposes a logistic model: logit Pr[A=1 | Y^{a=0}, L] = α0 + α1 Y^{a=0} + α2 L.
   - Under exchangeability, α1=0.

 14.3 Structural nested mean models
   - Defines the structural nested mean model: E[Y^a - Y^{a=0} | A=a, L] = β1 a + β2 a L (for a model with effect modification).
   - The model is semiparametric because it does not include an intercept or main effect of L.
   - In the presence of censoring, we adjust by IP weighting (using weights for censoring) to account for selection bias.

   Fine Point 14.1: Relation between marginal structural models and structural nested models.
     - Compares marginal structural models (MSMs) and structural nested models (SNMs).
     - Introduces semiparametric marginal structural mean models: E[Y^a - Y^{a=0} | V] = β1 a + β2 a V, which leaves E[Y^{a=0}|V] unspecified.
     - When V is a subset of L, we use IP weights SW^A(V) to create a pseudo-population and then use g-estimation.
     - When V is all of L, then the semiparametric MSM is the same as the structural nested model.

   Technical Point 14.1: Multiplicative structural nested mean models.
     - For positive outcomes, a multiplicative model: log( E[Y^a | A=a, L] / E[Y^{a=0} | A=a, L] ) = β1 a + β2 a L.
     - For binary outcomes (non-rare), structural nested logistic models have drawbacks (non-collapsibility, hard to generalize to time-varying treatments).

 14.4 Rank preservation
   - Rank preservation: the effect of A on Y is exactly the same (additively) for all individuals with the same L. Then, Y_i^a - Y_i^{a=0} = ψ1 a + ψ2 a L_i for all i.
   - Figures 14.1, 14.2, 14.3: 
        Fig 14.1: Rank preservation in one stratum (constant shift for all individuals in the stratum).
        Fig 14.2: Rank preservation in another stratum (different shift).
        Fig 14.3: Non-rank-preserving scenario (shifts vary by individual).
   - Rank preservation is implausible for most settings, but the structural nested mean model does not require it.

 14.5 G-estimation
   - Describes g-estimation for a rank-preserving model (for simplicity) but notes it works for non-rank-preserving too.
   - Model: Y^{a=0} = Y - ψ1 A (for a model without effect modification).
   - Create H(ψ†) = Y - ψ† A. Then, under exchangeability, the true ψ1 makes H(ψ1) independent of A given L.
   - Fit logistic model: logit Pr[A=1 | H(ψ†), L] = α0 + α1 H(ψ†) + α2 L. The ψ† that gives α1=0 is the estimate.
   - In practice, search over ψ† to find the one that makes the estimate of α1 zero (or the p-value for α1=0 is high).
   - Example: for smoking cessation, found ψ1=3.4 kg (95% CI: 2.5, 4.5).
   - Confidence interval by inverting the test: values of ψ† for which the test of α1=0 is not rejected at 5%.
   - Adjust for censoring by using IP weights for censoring in the logistic model.

   Fine Point 14.2: Sensitivity analysis for unmeasured confounding.
     - If exchangeability does not hold (unmeasured confounding), then α1 ≠ 0.
     - We can conduct sensitivity analysis by assuming a value for α1 and then testing for that value in the model.

 14.6 Structural nested models with two or more parameters
   - For models with effect modification, e.g., E[Y^a - Y^{a=0} | A=a, L] = β1 a + β2 a V, we have two parameters.
   - Then H(β†) = Y - β1† A - β2† A V.
   - Fit logistic model: logit Pr[A=1 | H(β†), L] = α0 + α1 H(β†) + α2 H(β†) V + α3 L, and find β† that make α1=0 and α2=0.
   - For linear models, closed-form estimators exist (see Technical Point 14.2).
   - Example: β1=2.86, β2=0.03.

   Technical Point 14.2: G-estimation of structural nested mean models.
     - General estimating equation for the model: E[Y - Y^{a=0} | A, L] = A γ(L; β)
     - H(β†) = Y - A γ(L; β†)
     - Solve: Σ I[C_i=0] W_i^C H_i(β†) (A_i - E[A|L_i]) q(L_i) = 0, where q(L) is a user-specified function.
     - When γ is linear in β, closed form exists.
     - Doubly robust version: replace H(β†) by H(β†) - E[H(β†)|L] and estimate E[H(β†)|L] by a linear model.

 Now, we will write the summary in the required format.
</think>
### Chapter 14: G-Estimation of Structural Nested Models  

#### **14.1 The Causal Question Revisited**  
- **Technical Points**:  
  - Reiterates the causal effect of smoking cessation (\(A\)) on weight gain (\(Y\)) as \(E[Y^{a=1,c=0}] - E[Y^{a=0,c=0}]\), with censoring indicator \(C\).  
  - Conditional exchangeability assumed given covariates \(L\): sex, age, race, education, smoking intensity/duration, physical activity, weight.  
- **Fine Points**:  
  - Subgroup analysis (e.g., age, sex) can use marginal structural models with product terms or standardization restricted to subsets.  
  - With large datasets, strata can be defined by unique combinations of \(L\) to estimate conditional effects \(E[Y^{a=1,c=0}|L] - E[Y^{a=0,c=0}|L]\).  

#### **14.2 Exchangeability Revisited**  
- **Technical Points**:  
  - Conditional exchangeability formalized as \(Y^a \perp\!\!\!\perp A \mid L\) for \(a = 0, 1\).  
  - Equivalent definition: \(\text{Pr}[A=1 \mid Y^{a=0}, L] = \text{Pr}[A=1 \mid L]\).  
  - Logistic model proposed:  
    $$
    \text{logit } \text{Pr}[A=1 \mid Y^{a=0}, L] = \alpha_0 + \alpha_1 Y^{a=0} + \alpha_2 L
    $$  
    where \(\alpha_1 = 0\) under exchangeability.  
- **Fine Points**:  
  - Inclusion of counterfactual \(Y^{a=0}\) as a covariate distinguishes this model from IP weighting denominator models.  

#### **14.3 Structural Nested Mean Models**  
- **Technical Points**:  
  - **Structural nested mean model (SNMM)**:  
    $$
    E[Y^a - Y^{a=0} \mid A=a, L] = \beta_1 a + \beta_2 a L
    $$  
    where \(\beta_1, \beta_2\) quantify the conditional average causal effect.  
  - Semiparametric: No intercept \(\beta_0\) or main effect \(\beta_3 L\), enhancing robustness.  
  - Censoring adjustment: Use IP weights \(W^C = 1 / \text{Pr}[C=0 \mid L, A]\) to handle selection bias.  
- **Fine Points** (Fine Point 14.1):  
  - **Semiparametric marginal structural models** (e.g., \(E[Y^a - Y^{a=0} \mid V] = \beta_1 a + \beta_2 a V\)) avoid bias from misspecifying \(E[Y^{a=0} \mid V]\).  
  - When \(V \subset L\), use IP weights \(SW^A(V) = f(A \mid V) / f(A \mid L)\) for g-estimation.  
- **Technical Points** (Technical Point 14.1):  
  - **Multiplicative SNMM** for positive outcomes:  
    $$
    \log \left( \frac{E[Y^a \mid A=a, L]}{E[Y^{a=0} \mid A=a, L]} \right) = \beta_1 a + \beta_2 a L
    $$  
  - Avoid structural nested logistic models for non-rare binary outcomes due to non-collapsibility.  

#### **14.4 Rank Preservation**  
- **Technical Points**:  
  - **Additive rank preservation**: Assumes constant individual causal effect within \(L\)-strata:  
    $$
    Y_i^a - Y_i^{a=0} = \psi_1 a + \psi_2 a L_i \quad \forall i
    $$  
  - Implausible in practice (e.g., individual susceptibility to treatment varies).  
- **Fine Points**:  
  - Figures 14.1–14.3 illustrate rank preservation (constant shift within strata) vs. realistic effect heterogeneity.  
  - Marginal structural models and SNMMs do not require rank preservation.  

#### **14.5 G-Estimation**  
- **Technical Points**:  
  - **G-estimation procedure**:  
    1. Define \(H(\psi^\dagger) = Y - \psi^\dagger A\).  
    2. Solve for \(\psi^\dagger\) such that \(\alpha_1 = 0\) in logistic model:  
       $$
       \text{logit Pr}[A=1 \mid H(\psi^\dagger), L] = \alpha_0 + \alpha_1 H(\psi^\dagger) + \alpha_2 L
       $$  
    3. For censoring, restrict to uncensored (\(C=0\)) and weight by \(W^C\).  
  - **Estimate**: \(\hat{\psi}_1 = 3.4\) kg (95% CI: 2.5, 4.5) for smoking cessation.  
  - Confidence intervals via test inversion or bootstrapping.  
- **Fine Points** (Fine Point 14.2):  
  - **Sensitivity analysis for unmeasured confounding**: Assume known \(\alpha_1 \neq 0\) (e.g., \(\alpha_1 = 0.1\)) and re-estimate.  

#### **14.6 Structural Nested Models with Two or More Parameters**  
- **Technical Points**:  
  - **Model with effect modification**:  
    $$
    E[Y^a - Y^{a=0} \mid A=a, L] = \beta_1 a + \beta_2 a V
    $$  
    where \(V \subseteq L\) (e.g., smoking intensity).  
  - **G-estimation**: Fit logistic model with \(H(\beta^\dagger) = Y - \beta_1^\dagger A - \beta_2^\dagger A V\) and solve \(\alpha_1 = \alpha_2 = 0\).  
  - Closed-form estimators exist for linear SNMMs (Technical Point 14.2).  
- **Technical Points** (Technical Point 14.2):  
  - **Doubly robust g-estimation**: Replace \(H(\beta^\dagger)\) with \(H(\beta^\dagger) - E[H(\beta^\dagger) \mid L]\) to gain robustness against misspecification of \(E[A \mid L]\) or \(\text{Pr}[C=1 \mid A, L]\).  
  - Estimating equation:  
    $$
    \sum_{i=1}^n I[C_i=0] W_i^C H_i(\beta^\dagger) (A_i - E[A \mid L_i]) q(L_i) = 0
    $$  

---

### Key Formulas and Concepts  
| **Concept** | **Formula/Definition** |  
|-------------|------------------------|  
| **Causal Effect** | \(E[Y^{a=1,c=0} \mid L] - E[Y^{a=0,c=0} \mid L]\) |  
| **Exchangeability** | \(Y^a \perp\!\!\!\perp A \mid L\) |  
| **SNMM** | \(E[Y^a - Y^{a=0} \mid A=a, L] = \beta_1 a + \beta_2 a L\) |  
| **G-Estimation** | Solve \(\alpha_1=0\) in \(\text{logit Pr}[A=1 \mid H(\psi^\dagger), L] = \alpha_0 + \alpha_1 H(\psi^\dagger) + \alpha_2 L\) |  
| **Doubly Robust G-Estimation** | Use \(H(\beta^\dagger) - E[H(\beta^\dagger) \mid L]\) in estimating equation |  

### Summary of Visual Aids  
- **Figures 14.1–14.3**: Illustrate rank preservation (constant treatment effect within strata) vs. heterogeneous effects. Descriptions indicate:  
  - Fig 14.1: Constant shift \(\psi_1 + \psi_2 l\) in stratum \(L=l\).  
  - Fig 14.2: Different shift \(\psi_1 + \psi_2 l'\) in stratum \(L=l'\).  
  - Fig 14.3: Non-rank-preserving scenario (variable shifts within stratum).  

---  
**Note**: All conclusions strictly derived from the provided text. No subjective interpretations added.