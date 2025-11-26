---
date: 2025-09-17 11:19:05
title: Chapter_2
category: Causal inference
tags: [DeepSeek-R1-0528-2nd,response_md]

---
<think>
We are summarizing Chapter 2 of the provided text. The chapter is titled "RANDOMIZED EXPERIMENTS" and includes several subsections: 2.1 Randomization, 2.2 Conditional randomization, 2.3 Standardization, and 2.4 Inverse probability weighting. We will follow the structure of the chapter and summarize each section accordingly.

Note: The text includes tables and figures, but we are only provided with the text and references to images. We cannot view the images, so we will rely on the textual descriptions and context.

Let's break down the chapter:

1. Introduction to randomized experiments using the example of looking up at the sky.
2. Section 2.1: Randomization and the concept of exchangeability.
3. Section 2.2: Conditional randomization and conditional exchangeability.
4. Section 2.3: Standardization as a method to compute causal effects in conditionally randomized experiments.
5. Section 2.4: Inverse probability weighting as an alternative method.

We will summarize each part, extracting technical points and fine points as required.

Important: We must base the summary solely on the provided text and not add any external knowledge.

Let's proceed step by step.
</think>
### Chapter 2: RANDOMIZED EXPERIMENTS  
**Introduction**  
- Causal questions involve an action (treatment), outcome, and specific population.  
- Example: Investigating whether looking up causes others to look up via a coin-flip experiment (55% looked up when treated vs. 1% untreated).  
- **Randomized experiment**: Investigator assigns treatment via random mechanism (e.g., coin flip).  
- **Nonrandomized experiment**: Treatment assignment follows deterministic rules (e.g., based on gender), which may introduce comparability issues.  

---

#### 2.1 Randomization  
**Subsection Content**  
- In real-world studies, only one potential outcome (\(Y^a\)) is observed per individual, depending on received treatment \(A\).  
- Counterfactual outcomes are missing, creating challenges for effect estimation.  
- Randomization ensures missing counterfactual data occurs by chance, enabling consistent effect estimation.  

**Technical Points**  
- **Exchangeability (\(Y^a \perp\!\!\!\perp A\) for all \(a\))**:  
  - Treated and untreated groups have identical counterfactual risks under the same treatment:  
    \[
    \Pr[Y^a = 1 \mid A = 1] = \Pr[Y^a = 1 \mid A = 0] = \Pr[Y^a = 1]
    \]  
  - Implies treatment \(A\) does not predict counterfactual outcome \(Y^a\).  
  - **Full exchangeability**: Joint independence \(Y^A \perp\!\!\!\perp A\) (stronger than exchangeability).  
  - **Mean exchangeability**: \(E[Y^a \mid A = a'] = E[Y^a]\) (sufficient for identifying \(E[Y^a] = E[Y \mid A = a]\)).  
- **Ideal randomized experiments**:  
  - No loss to follow-up, full adherence, single treatment version, double-blind assignment.  
  - Association equals causation: Causal risk ratio = Associational risk ratio.  

**Fine Points**  
- **Crossover experiments**:  
  - Sequential treatment assignment (e.g., measuring blood pressure under treatment/no treatment).  
  - Requires strong assumptions:  
    1. No carryover effects (\(Y^{a_0,a_1}_{t=1} = Y^{a_1}_{t=1}\)).  
    2. Time-invariant individual causal effects (\(Y^{a=1}_{it} - Y^{a=0}_{it} = \alpha_i\)).  
    3. Time-invariant counterfactual outcomes under no treatment (\(Y^{a=0}_{it} = \beta_i\)).  
  - Inapplicable to irreversible outcomes (e.g., death).  

**Key Example**  
- Heart transplant study (Table 2.1):  
  - Without full counterfactual data, exchangeability cannot be verified.  
  - Small samples or non-exchangeable assignments (e.g., conditional randomization) may still be valid experiments.  

---

#### 2.2 Conditional Randomization  
**Subsection Content**  
- **Marginally randomized experiments**: Single randomization probability for all individuals (e.g., 65% treated).  
- **Conditionally randomized experiments**: Randomization probabilities depend on covariates \(L\) (e.g., 75% treated if \(L=1\), 50% if \(L=0\)).  

**Technical Points**  
- **Conditional exchangeability (\(Y^a \perp\!\!\!\perp A \mid L\) for all \(a\))**:  
  - Holds within strata of \(L\) (e.g., critical/noncritical condition).  
  - Does not imply marginal exchangeability.  
- **Missing data mechanisms**:  
  - **MCAR**: Missingness independent of all variables (holds in marginal randomization).  
  - **MAR**: Missingness depends only on observed data (holds in conditional randomization).  

**Key Example**  
- Heart transplant data (Table 2.2):  
  - Imbalance in \(L\) (69% treated vs. 43% untreated in critical condition) indicates lack of marginal exchangeability.  
  - Valid as conditionally randomized experiment.  

---

#### 2.3 Standardization  
**Subsection Content**  
- Method to compute causal effects in conditionally randomized experiments by standardizing stratum-specific risks.  

**Technical Points**  
- **Standardized risk**:  
  \[
  \Pr[Y^a = 1] = \sum_l \Pr[Y = 1 \mid L = l, A = a] \Pr[L = l]
  \]  
- **Identification**: Counterfactual risk is identified if expressible via observed data probabilities.  
- **Causal risk ratio**:  
  \[
  \frac{\Pr[Y^{a=1} = 1]}{\Pr[Y^{a=0} = 1]} = \frac{\sum_l \Pr[Y=1 \mid L=l, A=1] \Pr[L=l]}{\sum_l \Pr[Y=1 \mid L=l, A=0] \Pr[L=l]}
  \]  

**Fine Points**  
- **Risk periods**:  
  - Risks are period-specific (e.g., 5-day mortality risk).  
  - Causal effects may vary by risk period (e.g., antibiotics delay but do not prevent 100-year mortality).  

**Key Example**  
- Heart transplant study:  
  - Standardized risk under treatment = \(0.5\), under no treatment = \(0.5\) → Causal risk ratio = \(1.0\).  

---

#### 2.4 Inverse Probability Weighting  
**Subsection Content**  
- Alternative to standardization; weights individuals by inverse probability of received treatment.  

**Technical Points**  
- **IP weights**: \(W^A = 1 / f[A \mid L]\)  
  - \(f[A \mid L]\): Conditional probability/density of treatment given covariates.  
- **Pseudo-population**:  
  - Simulated population where treatment is marginally randomized.  
  - Associational risk ratio in pseudo-population equals causal risk ratio.  
- **Equivalence to standardization**: Mathematically identical under positivity.  

**Key Example**  
- Heart transplant study:  
  - IP weights: \(2.0\) for untreated with \(L=0\), \(1.33\) for treated with \(L=1\).  
  - Causal risk ratio = \(1.0\) (matches standardization).  

---

**Chapter Conclusion**  
- Randomized experiments (marginal or conditional) enable causal inference via standardization or IP weighting.  
- Limitations: Often unethical, impractical, or untimely (e.g., heart transplants).  
- Observational studies are frequently necessary alternatives.  

---  
**Note**: All summaries are based solely on the provided text. Figures (2.1–2.3) were referenced but not included; their descriptions were inferred from context.