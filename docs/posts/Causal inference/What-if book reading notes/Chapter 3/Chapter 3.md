---
title: Chapter 3
category: Causal inference
tags: [Chapter 3,What-if book reading notes]

---
### Chapter 3 Summary: Observational Studies  
This chapter focuses on causal inference from observational studies, contrasting them with randomized experiments. Key challenges include unmeasured confounding and the need for strong assumptions to estimate causal effects. The core framework involves emulating a *target trial* using observational data, relying on three **identifiability conditions**: exchangeability, positivity, and consistency. If these hold, methods like IP weighting or standardization can estimate causal effects. Below, I detail all main points, including conclusions from Technical Points (TP) and Fine Points (FP).

---

#### **1. Observational Studies vs. Randomized Experiments**
- **Observational studies**: Investigators observe and record data without intervening (e.g., studying if looking up causes others to look up). Criticisms include confounding (e.g., both pedestrians look up due to external factors like noise, not causation).
- **Randomized experiments**: Assign treatment randomly, ensuring exchangeability by design. Preferred for causal inference but often impractical (e.g., time-consuming, unethical, or unfeasible).
- **Key limitation of observational studies**: Associations may not imply causation due to unmeasured confounders. However, much scientific knowledge (e.g., evolution, global warming) derives from observational data.

#### **2. Identifiability Conditions**  
For causal effects to be identifiable from observational data, three conditions must hold (analogous to a conditionally randomized experiment):  
1. **Consistency**: The treatment \(a\) must correspond to a **well-defined** intervention, and the observed outcome \(Y\) must equal the counterfactual outcome \(Y^a\) for individuals with \(A = a\):  
   \[
   Y = Y^a \quad \text{if} \quad A = a
   \]
   - Requires precise specification of interventions (e.g., "heart transplant" includes surgical details). Vagueness (e.g., "obesity" without intervention method) undermines counterfactual definition.  
   - **Conclusion from FP 3.3**: States like obesity are ill-defined for causal questions; interventions must specify actionable changes (e.g., diet/exercise protocols).  
   - **Conclusion from FP 3.4**: Protocols with ambiguous components (e.g., surgeon experience) can yield different causal effects across studies due to treatment version variability.  

2. **Exchangeability**: Given covariates \(L\), treatment assignment \(A\) is independent of potential outcomes \(Y^a\):  
   \[
   Y^a \perp\!\!\!\perp A \mid L
   \]
   - Holds by design in randomized experiments. In observational studies, \(L\) must include all confounders (variables affecting both \(A\) and \(Y\)).  
   - **Threat**: Unmeasured confounders \(U\) (e.g., smoking status in heart transplant study) violate exchangeability.  
   - **Conclusion from FP 3.1**: Causal effects are nonidentifiable if data are compatible with multiple effect values; exchangeability assumptions supplement data to identify effects.  
   - **Conclusion from FP 3.5**: Counterfactuals should be defined via interventions ("possible worlds" philosophy is vague; well-defined interventions are preferable).  

3. **Positivity**: For all \(l\) where \(\Pr[L = l] > 0\), every treatment level \(a\) must have a positive probability:  
   \[
   \Pr[A = a \mid L = l] > 0
   \]
   - Ensures data exist to estimate counterfactuals (e.g., no strata where treatment is impossible).  
   - **Conclusion from TP 3.1**:  
     - Standardization and IP weighting require positivity.  
     - If \(\Pr[A = a \mid L = l] = 0\), standardized mean is undefined, and IP-weighted mean \(E\left[\frac{I(A=a)Y}{f[A \mid L]}\right]\) estimates \(E[Y^a \mid L \in Q(a)]\Pr[L \in Q(a)]\) (biased under exchangeability).  

#### **3. Methods for Causal Inference**  
- **IP weighting and standardization**: Estimate causal effects if identifiability conditions hold.  
  - E.g., For data in Table 3.1, causal risk ratio is 1 if conditions are satisfied.  
- **Target trial framework**: Specify a hypothetical randomized experiment (eligibility, interventions, outcomes) and emulate it with observational data.  
  - **Purpose**: Clarifies interventions, enhances transparency, and ensures consistency.  
  - **Challenges**: Mismatched treatment versions (e.g., surgeons with <10 transplants vs. protocol requiring ≥10) threaten consistency; collect detailed data to justify linking \(Y^a\) to \(Y\).  

#### **4. Challenges and Alternatives**  
- **Exchangeability and positivity are untestable**: Rely on domain knowledge to measure sufficient \(L\).  
- **When identifiability conditions fail**:  
  - **Instrumental variables** (Chapter 16): An alternative if exchangeability given \(L\) is implausible.  
  - **Sensitivity analyses**: Assess robustness to unmeasured confounding.  
- **Attributable fraction (FP 3.6)**:  
  - Measures excess cases due to treatment: \(\frac{\Pr[Y = 1] - \Pr[Y^{a=0} = 1]}{\Pr[Y = 1]}\).  
  - Differs from etiologic fraction (mechanically caused cases); computable only under strong assumptions.  
- **Crossover experiments (FP 3.2)**: Estimate causal effects if no carryover effects, but often implausible for long-term outcomes.  

#### **5. Key Conclusions from Technical and Fine Points**  
- **FP 3.1**: Causal effects are identifiable if assumptions restrict observed data to one effect value; otherwise, nonidentifiable.  
- **FP 3.2**: Crossover experiments estimate average causal effects if no carryover effects, but carryover is common.  
- **FP 3.3**: Avoid causal questions about states (e.g., "effect of obesity"); specify interventions (e.g., "effect of weight-loss pill").  
- **FP 3.4**: Unspecified protocol details (e.g., surgeon matching) create treatment version variability, biasing causal estimates.  
- **FP 3.5**: Define counterfactuals via interventions, not "closest possible worlds" (lacks precision).  
- **FP 3.6**: Attributable fraction quantifies excess cases from treatment; etiologic fraction requires untestable assumptions.  
- **TP 3.1**: Positivity is essential for IP weighting/standardization; violations bias estimates.  

#### **6. Practical Implications**  
- **Causal inference is assumption-dependent**: Requires expert knowledge to justify identifiability conditions.  
- **Prioritize well-defined interventions**: Ambiguous questions (e.g., "effect of weight loss") should be refined into target trials (e.g., "effect of 5% BMI reduction via diet").  
- **Observational data for prediction**: If causal questions are ill-defined, use data for association/prediction (e.g., obesity predicts mortality, but causation is uncertain).  

This summary ensures no omission of key concepts, mathematical formalisms, or TP/FP conclusions. For implementation, always emulate a target trial to structure causal analyses.

---

An observational study can be conceptualized as a conditionally randomized experiment under the following three conditions:

- Well-defined treatment.
    
- The conditional prob of recieving a treatment depends only on the measured covariates.
    
- Positivity.
    

Causal inference from observational data requires two elements: **data and identifiability conditions.**