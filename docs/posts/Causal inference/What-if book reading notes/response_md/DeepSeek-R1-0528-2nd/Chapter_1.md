---
date: 2025-09-17 11:19:05
title: Chapter_1
category: Causal inference
tags: [DeepSeek-R1-0528-2nd,response_md]

---
<think>
We are summarizing Chapter 1 of the book "Causal Inference: What If" by Hernán and Robins.
 The chapter is titled "A DEFINITION OF CAUSAL EFFECT"

 We are going to break down the chapter into its sections and subsections, and extract the technical points and fine points as per the instructions.

 The chapter has the following sections (as per the provided text):
 1.1 Individual causal effects
 1.2 Average causal effects
 1.3 Measures of causal effect
 1.4 Random variability
 1.5 Causation versus association

 Additionally, there are two "Fine Points" (1.1 and 1.2) and one "Technical Point" (1.1) embedded in the text.

 We note that the text also has a table (Table 1.1) and a figure (Figure 1.1) that we will describe based on the context.

 Steps:
 1. We will go through each section and extract the key concepts, definitions, and examples.
 2. We will note the mathematical notation and formulas, using LaTeX when required.
 3. We will summarize the Fine Points and Technical Points as separate subsections under the relevant sections.

 Let's start with the introduction and then each section.
</think>
### Chapter 1: A DEFINITION OF CAUSAL EFFECT

#### Introduction  
The chapter formalizes intuitive causal concepts using mathematical notation. Humans inherently understand causal effects by comparing outcomes under different actions (e.g., "What if I had acted differently?"). The goal is to match this intuition with formal definitions for precise causal inference.  

#### 1.1 Individual Causal Effects  
**Technical Points**:  
- **Core Theory**: An individual causal effect exists if the outcome under treatment (\(A = 1\)) differs from the outcome under no treatment (\(A = 0\)).  
- **Key Notation**:  
  - \(A\): Dichotomous treatment variable (1 = treated, 0 = untreated).  
  - \(Y\): Dichotomous outcome variable (1 = death, 0 = survival).  
  - \(Y^{a=1}\): Counterfactual outcome if treated.  
  - \(Y^{a=0}\): Counterfactual outcome if untreated.  
- **Causal Effect Definition**: For individual \(i\), treatment \(A\) has a causal effect if \(Y^{a=1}_i \neq Y^{a=0}_i\).  
- **Consistency Principle**: If observed treatment \(A_i = a\), then observed outcome \(Y_i = Y^a_i\).  

**Fine Points**:  
- **Counterfactual Terminology**:  
  - *Potential outcomes*: Emphasizes observability under different treatments.  
  - *Counterfactual outcomes*: Emphasizes hypothetical scenarios.  
- **Missing Data Challenge**: Individual causal effects cannot be directly observed because only one counterfactual outcome is factual (consistency), while the other remains unobserved.  

---

#### 1.2 Average Causal Effects  
**Technical Points**:  
- **Core Theory**: When individual effects are unidentifiable, aggregate effects over a population are used. An average causal effect exists if the expected outcomes under different treatments differ.  
- **Key Formula**:  
  - Average causal effect: \(E[Y^{a=1}] \neq E[Y^{a=0}]\).  
  - For binary \(Y\), \(E[Y^a] = \Pr(Y^a = 1)\).  
- **Null Hypothesis**: No average effect if \(\Pr(Y^{a=1} = 1) = \Pr(Y^{a=0} = 1)\).  

**Fine Points**:  
- **Interference (Fine Point 1.1)**:  
  - Assumption: An individual’s outcome depends only on their own treatment (no interference).  
  - Violation Example: Zeus’s survival may depend on Hera’s transplant status.  
  - SUTVA (Stable Unit Treatment Value Assumption) includes no interference.  
- **Multiple Treatment Versions (Fine Point 1.2)**:  
  - Assumption: Only one version of treatment \(A = a\) exists.  
  - Violation Example: Surgical outcomes depend on surgeon skill.  
  - Resolution: "Treatment variation irrelevance" assumes all versions have identical outcomes.  

**Details from Table 1.1**:  
- Population: 20 individuals with counterfactual outcomes under treatment/no treatment.  
- \(\Pr(Y^{a=1} = 1) = 10/20 = 0.5\), \(\Pr(Y^{a=0} = 1) = 10/20 = 0.5\) → No average causal effect.  
- Individual effects: 12/20 individuals had \(Y^{a=1} \neq Y^{a=0}\) (6 harmed, 6 helped).  

---

#### 1.3 Measures of Causal Effect  
**Technical Points**:  
- **Effect Measures**:  
  - Causal Risk Difference (RD): \(\Pr(Y^{a=1} = 1) - \Pr(Y^{a=0} = 1)\).  
  - Causal Risk Ratio (RR): \(\Pr(Y^{a=1} = 1) / \Pr(Y^{a=0} = 1)\).  
  - Causal Odds Ratio (OR): \(\frac{\Pr(Y^{a=1} = 1)/\Pr(Y^{a=1} = 0)}{\Pr(Y^{a=0} = 1)/\Pr(Y^{a=0} = 0)}\).  
- **Null Representation**: All measures equal 0 (RD), 1 (RR, OR) under no effect.  

**Fine Points**:  
- **Number Needed to Treat (NNT) (Fine Point 1.3)**:  
  - Definition: Average individuals needed to treat to prevent one adverse outcome.  
  - Formula: \(\text{NNT} = -1 / \text{RD}\) (if RD < 0).  
  - Example: RD = -0.1 → NNT = 10.  
- **Scale Dependence**:  
  - RR (multiplicative) quantifies relative risk change.  
  - RD (additive) quantifies absolute case reduction.  

**Technical Point 1.1**:  
- Population causal effects can extend beyond means (e.g., variance, median), but nonlinear measures (e.g., \(\text{Var}(Y^{a=1}) - \text{Var}(Y^{a=0})\)) are not equal to the variance of individual effects.  

---

#### 1.4 Random Variability  
**Technical Points**:  
- **Sources of Random Error**:  
  1. **Sampling Variability**: Sample proportions (e.g., \(\widehat{\Pr}(Y^a = 1)\)) estimate super-population probabilities.  
  2. **Nondeterministic Counterfactuals**: Outcomes may be stochastic (e.g., Zeus has 90% chance of death if treated).  
- **Consistency of Estimators**: \(\widehat{\Pr}(Y^a = 1)\) is consistent for \(\Pr(Y^a = 1)\) as sample size → ∞.  

**Fine Points**:  
- **Nondeterministic Counterfactuals (Technical Point 1.2)**:  
  - \(Y^a\) follows an individual-specific distribution \(\Theta_{Y^a}(\cdot)\).  
  - Mean outcome: \(E[Y^a] = \int y  dF_{Y^a}(y)\).  
  - Binary case: Causal RR equals weighted average of individual RRs.  
- **Assumption for Simplicity**: Until Chapter 10, counterfactuals are treated as deterministic.  

---

#### 1.5 Causation versus Association  
**Technical Points**:  
- **Association**: Defined by conditional probabilities in the observed world.  
  - Independence: \(Y \perp\!\!\!\perp A\) if \(\Pr(Y = 1 | A = 1) = \Pr(Y = 1 | A = 0)\).  
  - Measures: Associational RD, RR, OR (parallel to causal measures).  
- **Key Distinction**:  
  - Causation: Contrasts marginal risks in the same population under different treatments (e.g., \(\Pr(Y^{a=1} = 1)\) vs. \(\Pr(Y^{a=0} = 1)\)).  
  - Association: Contrasts conditional risks in disjoint subgroups (e.g., \(\Pr(Y = 1 | A = 1)\) vs. \(\Pr(Y = 1 | A = 0)\)).  

**Fine Points**:  
- **Example from Table 1.2**:  
  - Association: \(\Pr(Y = 1 | A = 1) = 7/13\), \(\Pr(Y = 1 | A = 0) = 3/7\) → Association exists.  
  - Causation: \(\Pr(Y^{a=1} = 1) = \Pr(Y^{a=0} = 1) = 0.5\) → No causal effect.  
- **Confounding**: Discrepancy arises due to imbalanced baseline risk (e.g., sicker patients receive treatment).  

**Figure 1.1 Summary**:  
- Visualizes causation (whole population under two treatments) vs. association (treated vs. untreated subgroups).  

---

### Chapter Logic and Coherence  
This chapter establishes foundational concepts:  
1. **Individual counterfactuals** define causality but are unobservable.  
2. **Average causal effects** resolve unidentifiability by aggregating over populations.  
3. **Measures** (RD, RR, OR, NNT) quantify effect size on different scales.  
4. **Random variability** (sampling, nondeterminism) complicates estimation.  
5. **Association ≠ Causation** due to confounding, motivating causal inference methods (e.g., randomization, discussed in Chapter 2).  

All conclusions are derived from the provided text, with mathematical extensions (e.g., expectations for continuous outcomes) explicitly grounded in Technical Points.