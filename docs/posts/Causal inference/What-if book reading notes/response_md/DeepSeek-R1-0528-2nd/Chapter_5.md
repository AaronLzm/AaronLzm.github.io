---
title: Chapter_5
category: Causal inference
tags: [DeepSeek-R1-0528-2nd,response_md]

---
<think>
We are summarizing Chapter 5: INTERACTION from the provided PDF content.
 The chapter is divided into several sections: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, and includes Technical Points and Fine Points.

 We'll structure the summary by:
   - Starting with the chapter title and main introduction.
   - Then each section and subsection.
   - For each, we extract Technical Points and Fine Points as they appear.

 Note: The images (Figures 5.1, 5.2, 5.3) are referenced but we cannot view them. We'll note their presence and describe based on context.

 Steps:
 1. Chapter Introduction (Page 1 start)
 2. Section 5.1: Interaction requires a joint intervention
 3. Section 5.2: Identifying interaction (includes Technical Point 5.1)
 4. Section 5.3: Counterfactual response types and interaction (includes Table 5.1 and 5.2, and Technical Point 5.2)
 5. Section 5.4: Sufficient causes (includes Fine Point 5.1 and Figure 5.1 and 5.2)
 6. Section 5.5: Sufficient cause interaction (includes Fine Point 5.2 and 5.3)
 7. Section 5.6: Counterfactuals or sufficient-component causes? (includes Fine Point 5.4 and Technical Point 5.3 and Figure 5.3)

 We must be careful to base everything on the text and not add any external knowledge.

 Let's begin.
</think>
### Chapter 5: INTERACTION

#### Introduction
- Introduces interaction between two treatments (e.g., "looking up at the sky" and "being dressed/naked") when their joint causal effects differ.  
- Emphasizes that interaction analysis enables optimal intervention strategies.  
- Formal definitions are provided through counterfactual and sufficient-component-cause frameworks.  

#### 5.1 Interaction requires a joint intervention  
- Defines joint interventions: Simultaneous manipulation of two treatments (e.g., heart transplant \(A\) and vitamins \(E\)), yielding four counterfactual outcomes \(Y^{a,e}\) for each \((a,e)\) combination.  
- **Technical Focus**:  
  - Consistency links single and joint interventions: \(Y^a = Y^{a,E}\) when \(E\) is observed.  
- **Interaction Definition**:  
  - Exists if the causal effect of \(A\) differs when \(E=1\) vs. \(E=0\):  
    \[
    \text{Pr}[Y^{a=1,e=1} = 1] - \text{Pr}[Y^{a=0,e=1} = 1] \neq \text{Pr}[Y^{a=1,e=0} = 1] - \text{Pr}[Y^{a=0,e=0} = 1]
    \]  
  - Symmetric definition for \(E\)’s effect under \(A=1\) vs. \(A=0\).  
- **Key Distinction**:  
  - *Effect modification* (e.g., by sex \(V\)) focuses on variation in \(A\)’s effect without considering \(V\)’s causal role.  
  - *Interaction* treats both treatments (\(A\) and \(E\)) as intervenable with equal status.  

#### 5.2 Identifying interaction  
- **Identifying Conditions**: Exchangeability, positivity, and consistency required for both treatments.  
- **Randomized \(E\)**: When \(E\) is randomized, interaction equals effect modification:  
  \[
  \text{Pr}[Y^{a=1} = 1 | E=1] - \text{Pr}[Y^{a=0} = 1 | E=1] \neq \text{Pr}[Y^{a=1} = 1 | E=0] - \text{Pr}[Y^{a=0} = 1 | E=0]
  \]  
- **Non-Randomized \(E\)**: Standardization or IP weighting adjusts for covariates to estimate marginal risks \(\text{Pr}[Y^{a,e} = 1]\).  
- **Alternative Approach**: Treat combined treatment \(AE\) (4 levels) as a single intervention.  
- **Limitation**: Effect modification by \(E\) can exist without interaction if \(E\) is a surrogate (e.g., nationality) for an unmeasured modifier.  

**Technical Point 5.1: Interaction Scales**  
- **Additive Interaction**:  
  - Absence implies:  
    \[
    \text{Pr}[Y^{1,1} = 1] - \text{Pr}[Y^{0,0} = 1] = (\text{Pr}[Y^{1,0} = 1] - \text{Pr}[Y^{0,0} = 1]) + (\text{Pr}[Y^{0,1} = 1] - \text{Pr}[Y^{0,0} = 1])
    \]  
  - Superadditive/subadditive if left side >/< right side.  
- **Multiplicative Interaction**:  
  - Defined via risk ratios; supermultiplicative/submultiplicative if:  
    \[
    \frac{\text{Pr}[Y^{1,1} = 1]}{\text{Pr}[Y^{0,0} = 1]} \neq \frac{\text{Pr}[Y^{1,0} = 1]}{\text{Pr}[Y^{0,0} = 1]} \times \frac{\text{Pr}[Y^{0,1} = 1]}{\text{Pr}[Y^{0,0} = 1]}
    \]  

#### 5.3 Counterfactual response types and interaction  
- **Response Types**: 16 deterministic patterns for two binary treatments (Table 5.2).  
- **No Interaction (Additive Scale)**: Present if all individuals belong to types {1, 4, 6, 11, 13, 16}, where \(A\) and \(E\) have constant effects.  
- **Interaction Implies**: Individuals in three classes:  
  1. Outcome under only one treatment combination (types 8, 12, 14, 15).  
  2. Outcome under two combinations with opposing effects (types 7, 10).  
  3. Outcome under three combinations (types 2, 3, 5, 9).  
- **Cancellation**: Additivity can hold despite interaction types (e.g., equal proportions of types 7 and 10).  

**Technical Point 5.2: Monotonicity**  
- Effects are monotonic if \(Y^{a,e}\) is non-decreasing in \(a\) and \(e\) (no "preventive" responses).  

#### 5.4 Sufficient causes  
- **Framework**: Outcome occurs if any sufficient cause is completed.  
- **Single Treatment \(A\)**: Three sufficient causes:  
  - \(U_0\) (always fatal), \(A=1 \land U_1\), \(A=0 \land U_2\).  
- **Two Treatments \(A\) and \(E\)**: Nine sufficient causes (Figure 5.2), e.g., \(A=1 \land E=1\), \(A=0 \land E=0\), etc.  
- **Effect Modification**: Magnitude of \(A\)’s effect depends on prevalence of background factors (e.g., \(U_1 = 1\)).  

**Fine Point 5.1: Synergism Identification**  
- Sufficient condition for synergism (individuals with \(Y^{1,1}=1\) and \(Y^{1,0}=Y^{0,1}=0\)):  
  \[
  \text{Pr}[Y^{1,1} = 1] - (\text{Pr}[Y^{0,1} = 1] + \text{Pr}[Y^{1,0} = 1]) > 0
  \]  
- Weaker condition under monotonicity:  
  \[
  \text{Pr}[Y^{1,1} = 1] - \text{Pr}[Y^{0,1} = 1] > \text{Pr}[Y^{1,0} = 1] - \text{Pr}[Y^{0,0} = 1]
  \]  

#### 5.5 Sufficient cause interaction  
- **Definition**: Exists if \(A\) and \(E\) co-occur in a sufficient cause (e.g., \(A=1 \land E=1 \land U_5\)).  
- **Synergism/Antagonism**: Synergism when \(A=1 \land E=1\) in a sufficient cause; antagonism when \(A=1 \land E=0\) or \(A versa.  
- **Identification**: Empirical conditions (Fine Point 5.1) can detect synergism without mechanistic knowledge.  

**Fine Point 5.3: Biologic Interaction**  
- "Biologic interaction" (sufficient-cause interaction) may not imply physical interaction (e.g., gene alleles jointly causing protein deficiency).  

#### 5.6 Counterfactuals or sufficient-component causes?  
- **Counterfactual Framework**: Focuses on effects of interventions ("what happens?").  
- **Sufficient-Cause Framework**: Focuses on causal mechanisms ("how does it happen?").  
- **Utility**:  
  - Counterfactuals are generalizable to continuous treatments/stochastic settings.  
  - Sufficient causes clarify effect modification and synergism but are limited to dichotomous settings.  
- **Attributable Fractions**: Overlap in sufficient causes explains why sum of single-treatment excess fractions can exceed 100% (Fine Point 5.4).  

**Technical Point 5.3: Monotonicity and Sufficient Causes**  
- Monotonic effects eliminate sufficient causes with "absence of treatment" components (e.g., \(A=0\) or \(E=0\)).  

**Figures**:  
- **Figure 5.1/5.2/5.3**: Graphical "causal pies" representing sufficient-component causes (images not parsed; described in text).  

---

**技术重点 (Technical Points)**  
- 加性和乘性交互作用的数学定义及超/亚型变体。  
- 单调性简化交互作用分析（消除特定响应类型）。  
- 可交换性在充分原因框架中的机制解释。  

**细节要点 (Fine Points)**  
- 协同作用的可识别条件（即使无机制知识）。  
- 充分原因与反事实响应类型的对应关系。  
- 归因分数在联合干预中的解释挑战（重叠机制）。