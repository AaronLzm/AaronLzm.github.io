---
title: Chapter_2
category: Causal inference
tags: [DeepSeek-R1-0528,response_md]

---
<think>
We are summarizing Chapter 2 of the provided text on Randomized Experiments. The chapter is divided into sections: 2.1 Randomization, 2.2 Conditional Randomization, 2.3 Standardization, and 2.4 Inverse Probability Weighting.

 We'll structure the summary by sections and subsections, extracting technical points and fine points as required.

 Note: The text includes tables and figures, but we are only provided with the text and image references. We'll describe the content of the text and note when images are referenced.

 Let's begin with the chapter overview and then proceed section by section.
</think>
### Chapter 2: Randomized Experiments  
**Overview**  
This chapter establishes why randomized experiments enable credible causal inferences by ensuring exchangeability. It contrasts marginally randomized experiments (single randomization probability) with conditionally randomized experiments (randomization probabilities dependent on covariates), and introduces standardization and inverse probability weighting as methods to compute causal effects.

---

#### 2.1 Randomization  
**Core Concept**  
Randomized experiments assign treatment via a random mechanism (e.g., coin flip), ensuring the treated and untreated groups are exchangeable. Exchangeability (\(Y^a \perp\!\!\!\perp A\)) implies the counterfactual outcome under treatment \(a\) is independent of the actual treatment received.  

**Technical Points**  
- **Exchangeability**:  
  - Defined as \(Y^a \perp\!\!\!\perp A\) for all \(a\), meaning the risk under potential treatment \(a\) is identical across treatment groups:  
    \[
    \Pr[Y^a = 1 \mid A = 1] = \Pr[Y^a = 1 \mid A = 0] = \Pr[Y^a = 1]
    \]  
  - **Full exchangeability**: Joint independence \((Y^{a=1}, Y^{a=0}) \perp\!\!\!\perp A\) (stronger than exchangeability).  
  - **Mean exchangeability**: \(E[Y^a \mid A = a'] = E[Y^a]\) (sufficient for identifying \(E[Y^a] = E[Y \mid A = a]\)).  
- **Identification in Ideal Experiments**:  
  - Under exchangeability, associational measures equal causal measures:  
    - Causal risk ratio: \(\frac{\Pr[Y^{a=1} = 1]}{\Pr[Y^{a=0} = 1]} = \frac{\Pr[Y = 1 \mid A = 1]}{\Pr[Y = 1 \mid A = 0]}\).  
  - Example: Observed risks \(\Pr[Y=1 \mid A=1] = 0.3\) and \(\Pr[Y=1 \mid A=0] = 0.6\) imply causal risk ratio \(0.5\).  

**Key Distinction**  
- \(Y^a \perp\!\!\!\perp A\) (exchangeability) ≠ \(Y \perp\!\!\!\perp A\). If treatment affects the outcome, \(Y \perp\!\!\!\perp A\) does not hold.  

**Fine Points**  
- **Crossover Experiments**:  
  - Require strong assumptions (no carryover effects, time-invariant effects) to identify individual causal effects.  
  - Inapplicable for irreversible outcomes (e.g., death) or treatments (e.g., heart transplant).  

---

#### 2.2 Conditional Randomization  
**Core Concept**  
When randomization probabilities depend on a covariate \(L\) (e.g., patient severity), exchangeability holds *conditionally* on \(L\) (\(Y^a \perp\!\!\!\perp A \mid L\)) but not marginally.  

**Technical Points**  
- **Designs**:  
  - *Marginally randomized*: Single randomization probability (e.g., \(\Pr[A=1] = 0.65\) for all).  
  - *Conditionally randomized*: Randomization probability varies by \(L\) (e.g., \(\Pr[A=1 \mid L=1] = 0.75\), \(\Pr[A=1 \mid L=0] = 0.50\)).  
- **Exchangeability**:  
  - Conditional randomization ensures \(Y^a \perp\!\!\!\perp A \mid L\) but not unconditional exchangeability.  
- **Missing Data Analogy**:  
  - Data are *missing at random (MAR)* if treatment assignment depends only on observed \(L\).  

**Application**  
Table 2.2 data (with covariate \(L\)) could only arise from conditional randomization due to imbalance in \(L\) (69% treated vs. 43% untreated in critical condition).  

---

#### 2.3 Standardization  
**Core Concept**  
Standardization computes the marginal counterfactual risk \(\Pr[Y^a = 1]\) by averaging stratum-specific risks weighted by the proportion of each stratum \(L = l\).  

**Technical Points**  
- **Formula**:  
  \[
  \Pr[Y^a = 1] = \sum_l \Pr[Y = 1 \mid L = l, A = a] \Pr[L = l]
  \]  
- **Identification**: Requires conditional exchangeability and positivity (\(\Pr[A = a \mid L = l] > 0\) for all \(l\)).  
- **Example**:  
  - For \(L = 0\): \(\Pr[Y = 1 \mid L=0, A=1] = \frac{1}{4}\), \(\Pr[L=0] = 0.4\).  
  - For \(L = 1\): \(\Pr[Y = 1 \mid L=1, A=1] = \frac{2}{3}\), \(\Pr[L=1] = 0.6\).  
  - \(\Pr[Y^{a=1} = 1] = \left(\frac{1}{4} \times 0.4\right) + \left(\frac{2}{3} \times 0.6\right) = 0.5\).  

**Fine Points**  
- **Risk Periods**:  
  - Causal effects depend on the specified risk period (e.g., 5-day vs. 100-day mortality).  

---

#### 2.4 Inverse Probability Weighting (IP Weighting)  
**Core Concept**  
IP weighting creates a pseudo-population where each subject is weighted by the inverse of their treatment probability given \(L\) (\(W^A = 1 / \Pr[A \mid L]\)), enforcing exchangeability.  

**Technical Points**  
- **Weight Definition**:  
  - For treated (\(A=1\)): \(W^A = 1 / \Pr[A=1 \mid L]\).  
  - For untreated (\(A=0\)): \(W^A = 1 / \Pr[A=0 \mid L]\).  
- **Pseudo-Population**:  
  - In the pseudo-population, \(L \perp\!\!\!\perp A\), allowing associational risk ratio to equal causal risk ratio.  
- **Equivalence to Standardization**:  
  - Mathematically equivalent under positivity and conditional exchangeability.  

**Example**  
- Figure 2.1 (tree diagram) illustrates IP weighting:  
  - Untreated with \(L=0\): Weight = \(1 / 0.5 = 2\).  
  - Treated with \(L=1\): Weight = \(1 / 0.75 \approx 1.33\).  
- Causal risk ratio = 1\) (same as standardization).  

---

**Chapter Conclusion**  
Randomized experiments (marginally or conditionally randomized) enable causal inference via exchangeability. Standardization and IP weighting adjust for covariates in conditional randomization, yielding identical results. However, ethical/practical constraints often necessitate observational studies, discussed in subsequent chapters.  

---  
**Figures and Tables**  
- *Table 2.1*: Observed data with missing counterfactuals (\(Y^0, Y^1\)).  
- *Table 2.2*: Heart transplant data including covariate \(L\) (critical condition).  
- *Figures 2.1–2.3*: Tree diagrams illustrating IP weighting and pseudo-population construction (descriptions based on context; images not parsed).