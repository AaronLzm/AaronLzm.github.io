---
title: Chapter_10
category: Causal inference
tags: [DeepSeek-R1-0528,response_md]

---
<think>
We are summarizing Chapter 10: RANDOM VARIABILITY from the provided text.
 The chapter has several sections: 10.1 Identification versus estimation, 10.2 Estimation of causal effects, 10.3 The myth of the super-population, 10.4 The conditionality "principle", 10.5 The curse of dimensionality, and several Technical Points and Fine Points.

 We'll break down the chapter by sections and subsections, and for each, we'll extract:
   - Technical Points: core theories, key formulas, important concepts, and application scenarios.
   - Fine Points: specific cases, auxiliary information, background, or supplementary details.

 We note that the chapter starts with an example and then moves into the concepts.

 Since the text is long, we'll proceed step by step, starting with the introduction and then each numbered section.

 Important: We must use LaTeX for formulas and be precise.

 Let's start.
</think>
### Chapter 10: RANDOM VARIABILITY  
**Introduction**  
The chapter begins with a randomized experiment example investigating whether looking up causes others to look up. Despite no systematic biases (confounding, selection, or measurement bias), the small sample size (4 pedestrians) led to chance imbalances (e.g., blindness in the treatment group), diluting the estimated effect. This illustrates that causal inferences can be flawed due to **random variability**, distinct from systematic biases covered in prior chapters.  

**10.1 Identification versus estimation**  
**Technical Points**:  
- **Core Theory**: Causal inference in prior chapters assumed infinite study populations, reducing the problem to *identification* (computing causal effects under exchangeability, positivity, and consistency).  
- **Key Concepts**:  
  - *Estimand*: Super-population parameter of interest (e.g., Pr[Y=1|A=a]).  
  - *Estimator*: Rule producing a numerical estimate from sample data (e.g., sample proportion $\widehat{\Pr}[Y=1|A=a]$).  
  - *Consistency*: Estimator converges to the estimand as sample size $n$ increases.  
- **Confidence Intervals**:  
  - Wald 95% CI: $\hat{\theta} \pm 1.96 \times \widehat{\text{se}}(\hat{\theta})$, where $\widehat{\text{se}}$ is the estimated standard error.  
  - Validity: A CI is *valid* if it covers the true estimand in ≥95% of hypothetical studies.  
  - Interpretation: Frequentist (frequency-based), not probabilistic for a single interval.  
- **Bias Definition**: An estimator is *unbiased* if it can center a valid Wald CI (formally, Uniformly Asymptotically Normal and Unbiased, UANU).  

**Fine Points**:  
- **Honest CIs**: Large-sample valid CIs must be *uniform* (guaranteed coverage for all estimand values at some $n$), but the minimal $n$ is typically unknown.  
- **Systematic vs. Random Uncertainty**: CIs quantify only random error; systematic biases (confounding, etc.) require separate consideration (e.g., quantitative bias analysis).  

**10.2 Estimation of causal effects**  
**Technical Points**:  
- **Randomized Experiments**: In super-populations, exchangeability implies $\Pr[Y^a=1] = \Pr[Y=1|A=a]$. The sample proportion $\widehat{\Pr}[Y=1|A=a]$ is unbiased for both associational and causal risks.  
- **Inference Targets**:  
  - *Randomization-based*: Restricted to the study sample.  
  - *Super-population-based*: Assumes the sample is a random draw from an infinite population.  
- **Bias and Consistency**: Formalized in Technical Point 10.1:  
  - Consistent estimator: $\widehat{\theta}_n \overset{p}{\to} \theta(P)$ for all $P \in \mathcal{M}$.  
  - UANU: Required for valid Wald CIs.  

**Fine Points**:  
- **Uncertainty from Systematic Biases**: As $n$ increases, random error decreases, but systematic bias remains, making traditional CIs overconfident ("compatibility intervals" suggested instead).  

**10.3 The myth of the super-population**  
**Technical Points**:  
- **Sampling Variability**: Binomial CIs (e.g., for $\widehat{p}$) assume either:  
  1. *Scenario 1*: Random sampling from an infinite super-population.  
  2. *Scenario 2*: Non-varying counterfactual probabilities $p_i^{a=1} = p$ for all individuals).  
- **Critique**: Scenario 2 is unrealistic (individual risks vary), so binomial CIs implicitly rely on the fictional super-population.  

**Fine Points**:  
- **Generalization**: Super-populations facilitate extrapolation to target populations but are a "what-if" construct. Validity depends on the target population size and similarity to the study sample.  

**10.4 The conditionality principle**  
**Technical Points**:  
- **Ancillary Statistics**: In randomized trials, observed covariate-treatment associations (e.g., $L$-$A$ imbalance) are ancillary.  
- **Conditionality Principle**: Inference should condition on ancillary statistics.  
  - *Adjusted estimators* (e.g., stratified MLE) are conditionally unbiased and unconditionally efficient.  
  - *Unadjusted estimators* (e.g., marginal risk difference) are conditionally biased if $L$ affects $Y$.  
- **Efficiency**: Adjusted estimators have smaller variance when $L$ is predictive of $Y$ (Technical Point 10.4).  

**Fine Points**:  
- **Extended Principle**: Most researchers implicitly condition on approximate ancillaries (e.g., preferring observed-information variance estimators).  

**10.5 The curse of dimensionality**  
**Technical Points**:  
- **High-Dimensional Data**: With many covariates $L$ (e.g., 100 binary variables → $2^{100}$ strata), stratification fails:  
  - Sparse strata: Most strata lack treated/untreated pairs, widening CIs for adjusted estimators.  
  - Unadjusted estimators remain efficient (narrow CIs) but biased.  
- **Solution Challenge**: Strict conditionality is infeasible; model-based methods (Chapters 11–17) are needed.  

**Fine Points**:  
- **Causal Discovery Implications**: Finite samples hinder causal structure learning even under faithfulness (Technical Point 10.7).  

**Part II: Causal inference with models**  
*Transition to modeling approaches for causal inference, covered in subsequent chapters.*  

---  
**Key Formulas**:  
- Wald CI: $\hat{\theta} \pm 1.96 \times \widehat{\text{se}}(\hat{\theta})$  
- Binomial standard error: $\widehat{\text{se}}(\hat{p}) = \sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$  
- Standardized risk difference: $\text{RD}_{\text{std}} = \sum_l \left[ \Pr(Y=1|L=l,A=1) - \Pr(Y=1|L=l,A=0) \right] f(l)$  

**Notable Tables**:  
- Table 10.1: Marginal data for treatment $A$ vs. outcome $Y$.  
- Table 10.2: Data stratified by smoking status $L$, showing null stratum-specific effects but marginal effect.  

**Figures**:  
- *Not explicitly summarized; descriptions inferred from context (e.g., Wald CI visualization).*