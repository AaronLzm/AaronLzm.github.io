---
title: Chapter_23
category: Causal inference
tags: [DeepSeek-R1-0528-2nd,response_md]

---
<think>
We are summarizing Chapter 23: Causal Mediation from the provided text.
 The chapter is divided into sections: 23.1, 23.2, 23.3, 23.4, and includes Technical Points and Fine Points.

 We note that the chapter starts by introducing causal mediation as the study of causal pathways through which a treatment affects an outcome. It contrasts with Part III which focused on estimating the effect of time-varying treatments without considering the pathways.

 The chapter then proceeds to:
 23.1: Mediation analysis under attack - introduces the concepts of pure direct effect and total indirect effect, and the mediation formula. It highlights the issue of cross-world counterfactuals and the unverifiable assumptions required for the mediation formula under the NPSEM-IE model.
 23.2: A defense of mediation analysis - provides a rationale for the practical utility of the pure direct effect by considering an intervention on separable components of treatment (nicotine and non-nicotine components in cigarettes).
 23.3: Empirically verifiable mediation - describes how the assumptions for separable effects can be tested in a future randomized trial with three arms (smoking cessation, continuation with standard cigarettes, continuation with nicotine-free cigarettes).
 23.4: An interventionist theory of mediation - presents an alternative framework for mediation analysis that avoids cross-world counterfactuals by focusing on interventions on separable components of treatment.

 We also have to consider the Technical Points and Fine Points embedded in the text.

 However, note that the provided text includes references and an index at the end, which we are not summarizing.

 Steps:
 1. We break down the chapter by the sections and subsections as provided.
 2. For each section, we extract the technical points and fine points (if any) and include them in the appropriate section.
 3. We follow the required format: 
    - Chapter title
    - Subsection titles (if any) and their content
    - Technical Points and Fine Points as separate subsections or integrated as per the context.

 Important: We must base the summary solely on the provided text and not add any external knowledge.

 Let's proceed.
</think>
### Chapter 23: Causal Mediation

**23.1 Mediation Analysis Under Attack**  
Introduces causal mediation as a framework to decompose treatment effects into direct and indirect pathways. Uses a smoking cessation trial example where treatment \(A\) (smoking cessation), mediator \(M\) (hypertension), and outcome \(Y\) (myocardial infarction) are analyzed. Defines:  
- **Pure direct effect**: \(E[Y^{a=1, M^{a=0}}] - E[Y^{a=0, M^{a=0}}]\), representing the effect of \(A\) on \(Y\) if \(M\) is set to its value under no treatment.  
- **Total indirect effect**: \(E[Y^{a=1, M^{a=1}}] - E[Y^{a=1, M^{a=0}}]\), representing the effect mediated through \(M\).  
Both effects are cross-world counterfactuals (involve interventions incompatible in a single world). The **mediation formula** identifies \(E[Y^{a=1, M^{a=0}}]\) under Figure 23.1:  
\[
\sum_m E[Y \mid A=1, M=m] \Pr(M=m \mid A=0)
\]  
This requires unverifiable cross-world independence assumptions under the NPSEM-IE model, which are not needed in the FFRCISTG model used elsewhere in the book.  

**Technical Point 23.1: Proof of the Mediation Formula**  
Derives the mediation formula under the NPSEM-IE model, assuming cross-world independence \(Y^{a=1,m} \perp\!\!\!\perp M^{a=0}\). The proof uses:  
1. Laws of probability  
2. Cross-world independence  
3. Exchangeability and consistency  
The formula is invalid under FFRCISTG, where sharp bounds replace point identification.  

**23.2 A Defense of Mediation Analysis**  
Advocates for the policy relevance of pure direct effects by reinterpreting them through **separable components** of treatment. In the smoking example:  
- \(N\): Nicotine exposure (affects \(M\) but not \(Y\))  
- \(O\): Non-nicotine components (affects \(Y\) but not \(M\))  
The pure direct effect \(E[Y^{a=1, M^{a=0}}]\) equals \(E[Y^{n=0, o=1}]\) (effect of nicotine-free cigarettes), identifiable via the same mediation formula under deterministic relationships \(A = N = O\) (Figure 23.2).  

**Technical Point 23.2: When the Mediation Formula is the g-Formula**  
Shows that under Figure 23.3 (expanded DAG with separable components), the g-formula for \(E[Y^{n=0, o=1}]\) simplifies to the mediation formula despite positivity violations, due to deterministic links between \(A\), \(N\), and \(O\).  

**23.3 Empirically Verifiable Mediation**  
Proposes a three-arm randomized trial to test assumptions of separable effects:  
1. Smoking cessation (\(A=0\))  
2. Continued smoking (\(A=1\))  
3. Nicotine-free cigarettes (\(N=0, O=1\))  
Discrepancies between observed \(E[Y \mid N=0, O=1]\) and the mediation formula refute:  
- No direct effect of nicotine on \(Y\) (assumption i)  
- No direct effect of non-nicotine components on \(M\) (assumption ii)  
- No unmeasured \(M\)-\(Y\) confounders (assumption iii)  

**Fine Point 23.1: Empirical Falsification of Separable Effects Assumptions**  
Details falsification strategies, e.g., if \(N\) and \(Y\) are associated given \(M\) and \(O\), either assumption (i) or (iii) is violated. An 8-arm trial intervening on \(M\) can distinguish these.  

**23.4 An Interventionist Theory of Mediation**  
Presents a framework avoiding cross-world counterfactuals by focusing on **separable effects**:  
1. **Core idea**: Decompose treatment into intervenable components (e.g., \(N\) and \(O\)).  
2. **Verifiability**: Assumptions testable via future trials (e.g., 6-arm trial in Section 23.4).  
3. **Mediator interventions**: Unnecessary; effects exist if separable components are well-defined.  
4. **Equivalence**: Under valid assumptions, separable effects equal mediation-based effects.  

**Technical Point 23.3: Path-Specific Effects and the Front Door Formula**  
Extends the front door formula to settings with direct effects (Figure 23.6) by introducing separable components (\(N\), \(O\)) for path-specific effects. The g-formula under this expansion matches the front door formula.  

---

**Technical Points Summary**  
- **Pure/Total Effects**: Require cross-world counterfactuals; identifiable only under strong assumptions.  
- **Separable Effects**: Policy-relevant, empirically verifiable, and avoid cross-world quantities.  
- **g-Formula Equivalence**: Mediation and front door formulas emerge as special cases of the g-formula under specific causal stories.  

**Fine Points Summary**  
- **Falsification**: Three-arm trials test separable effect assumptions; discrepancies indicate violated assumptions.  
- **Surrogate Mediators**: When interventions on \(M\) are ill-posed, separable components provide an alternative.  

**Key Formulas**  
- Mediation formula: \(\sum_m E[Y \mid A=1, M=m] \Pr(M=m \mid A=0)\)  
- Pure direct effect: \(E[Y^{a=1, M^{a=0}}] - E[Y^{a=0, M^{a=0}}]\)  
- Total indirect effect: \(E[Y^{a=1, M^{a=1}}] - E[Y^{a=1, M^{a=0}}]\)  

**Figures**  
- Figure 23.1: Basic mediation DAG (\(A \rightarrow M \rightarrow Y\), no confounders).  
- Figure 23.2: Expanded DAG with separable components \(N\) and \(O\) (deterministic links to \(A\)).  
- Figure 23.3: SWIG for intervention on \(N\) and \(O\).  
- Figures 23.4–23.8: Extensions for surrogate mediators and path-specific effects (descriptions only; images not analyzed).