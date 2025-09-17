---
title: Chapter_22
category: Causal inference
tags: [DeepSeek-R1-0528-2nd,response_md]

---
<think>
We are summarizing Chapter 22 "Target Trial Emulation" from the provided PDF content.
 The chapter has several sections and fine points. We'll structure the summary by the sections and subsections as they appear in the text.

 Steps:
 1. Identify the main sections and subsections.
 2. For each section, extract the technical points and fine points (details).
 3. Use the required format: Markdown, with LaTeX for formulas, and include both "Technical Points" and "Fine Points".

 Note: We cannot interpret images, so we note their presence and refer to the context.

 Chapter Structure:
   - Chapter 22: Target Trial Emulation
   - 22.1 Intention-to-treat effect and per-protocol effect
   - Fine Point 22.1: The exclusion restriction (again)
   - Fine Point 22.2: Pseudo-intention-to-treat analysis and modified intention-to-treat analysis
   - Fine Point 22.3: Naïve per-protocol analyses
   - Fine Point 22.4: More misunderstandings about the intention-to-treat effect
   - 22.2 A target trial with sustained treatment strategies
   - Technical Point 22.1: Controlled direct effects
   - Technical Point 22.2: Pure direct effects and principal stratum direct effects
   - 22.3 Emulating a target trial with sustained strategies
   - 22.4 Time zero
   - Fine Point 22.5: Grace periods
   - 22.5 A unified approach to answer What If questions with data
   - Fine Point 22.6: How do the data of randomized experiments and observational studies differ?
   - Fine Point 22.7: A counterintuitive comparison of a randomized trial and an observational study
   - Fine Point 22.8: Generalizing Fine Point 22.7 to realistic settings

 We'll go section by section, summarizing the content.

 Important: We must base the summary solely on the provided text. We cannot add external knowledge.

 Let's begin.
</think>
### Chapter 22: TARGET TRIAL EMULATION

**Chapter Overview**  
This chapter extends the target trial framework to sustained treatment strategies, providing a unified causal inference approach for both randomized experiments and observational studies. It introduces key causal effects (intention-to-treat and per-protocol effects) and emphasizes the necessity of g-methods for valid estimation when time-varying confounders exist. The chapter also addresses practical challenges in emulating target trials using observational data.

---

#### 22.1 Intention-to-treat effect and per-protocol effect
**Subsection Content**  
- Compares two causal effects in randomized trials:  
  - **Intention-to-treat (ITT) effect**: Effect of *assignment* to treatment ($Z$), agnostic to adherence.  
  - **Per-protocol effect**: Effect of *receiving treatment* ($A$) as specified in the protocol, requiring full adherence.  
- Figure 22.1 illustrates pathways: $Z \rightarrow A \rightarrow Y$ (treatment effect) and $Z \rightarrow Y$ (direct effect, e.g., behavioral changes).  
- When the exclusion restriction holds (no $Z \rightarrow Y$), ITT effect simplifies; otherwise, direct effects complicate interpretation.  
- Per-protocol effect estimation requires adjustment for confounding (e.g., via g-methods), as non-adherence breaks exchangeability.  

**Technical Points**:  
- **Core Theory**:  
  - ITT effect: $Pr[Y^{z=1} = 1]/Pr[Y^{z=0} = 1]$ (unadjusted association valid due to randomization).  
  - Per-protocol effect: $Pr[Y^{a=1} = 1]/Pr[Y^{a=0} = 1]$ (requires adjustment for confounders).  
- **Key Formulas**:  
  - ITT risk ratio: $\frac{Pr[Y=1|Z=1]}{Pr[Y=1|Z=0]}$  
  - Per-protocol risk ratio: $\frac{Pr[Y^{a=1}=1]}{Pr[Y^{a=0}=1]}$ (estimable only with confounder adjustment).  
- **Application Scenarios**:  
  - ITT: Pragmatic for null preservation in blinded trials.  
  - Per-protocol: Essential for real-world decision-making when adherence is feasible.  

**Fine Points**:  
- **Exclusion Restriction**: Violated if $Z$ directly affects $Y$ (e.g., unblinded trials), invalidating null preservation.  
- **Biased Analyses**:  
  - *Pseudo-ITT*: Restricts to uncensored individuals, risking selection bias.  
  - *Modified ITT*: Includes only initiators, biased without adjustment.  
  - *Naïve per-protocol*: Compares adherent subgroups without confounder adjustment, inducing selection bias.  
- **Misconceptions**:  
  - ITT is not always conservative (e.g., head-to-head trials with differential adherence).  
  - Efficacy/effectiveness labels are ambiguous; explicit strategy definitions are preferable.  

---

#### 22.2 A target trial with sustained treatment strategies
**Subsection Content**  
- Defines a pragmatic randomized trial comparing sustained treatment strategies (e.g., continuous antiretroviral therapy vs. no therapy for HIV patients).  
- Follow-up starts at assignment ($k=0$), ends at death, censoring, or 60 months.  
- **ITT effect**: Contrasts static strategies ($Z=1$ vs. $Z=0$) with no censoring.  
- **Per-protocol effect**: Contrasts dynamic strategies (e.g., "treat unless toxicity occurs") under full adherence.  
- Dynamic strategies require explicit protocol specifications to avoid misclassifying discontinuations as non-adherence.  

**Technical Points**:  
- **Core Theory**:  
  - ITT: $Pr[D^{z=1,\bar{c}_k=0}_k = 1] - Pr[D^{z=0,\bar{c}_k=0}_k = 1]$  
  - Per-protocol: $Pr[D^{g_1,\bar{c}_k=0}_k = 1] - Pr[D^{g_0,\bar{c}_k=0}_k = 1]$  
- **Controlled Direct Effects**:  
  - Defined as $E[Y^{a=1,m}] - E[Y^{a=0,m}]$ (setting mediator $M$ to $m$).  
  - Identifiable via sequential randomization or g-methods in observational studies.  

**Fine Points**:  
- **Protocol Clarity**: Ambiguous strategies (e.g., omitting toxicity discontinuation rules) misclassify adherence.  
- **Alternative Effects**: Data from non-adherent participants enable emulation of *different* target trials (e.g., comparing modified strategies).  

---

#### 22.3 Emulating a target trial with sustained strategies
**Subsection Content**  
- Observational analogs:  
  - **ITT analog**: Contrasts initiators ($A_0=1$ vs. $A_0=0$), resembling modified ITT.  
  - **Per-protocol analog**: Identical to the target trial definition.  
- Explicit strategy definitions prevent non-actionable comparisons (e.g., non-translatable to interventions).  
- Efficacy/effectiveness dichotomies are less useful than precise strategy specifications.  

**Technical Points**:  
- **Estimation Requirements**:  
  - Per-protocol effects require g-methods for time-varying confounding.  
  - Extrapolation beyond observed strategies (e.g., dose-response models) may be needed.  

**Fine Points**:  
- **Grace Periods**: Allow delayed treatment initiation (e.g., 3 months), handled via cloning/censoring/IP weighting.  

---

#### 22.4 Time zero
**Subsection Content**  
- Start of follow-up must align with the target trial to avoid selection bias.  
- **Solutions for non-unique time zero$:  
  1. Single eligibility time: Start when criteria first met.  
  2. Multiple eligibility times: Emulate sequential trials (e.g., at each time unit).  
- **Non-unique strategy assignment**: Use cloning (create copies for compatible strategies) with IP weighting for censoring bias.  

**Technical Points**:  
- **Cloning Procedure**:  
  - Assign clones to feasible strategies.  
  - Censor when data deviate from assigned strategy.  
  - Adjust variances via bootstrapping.  

**Fine Points**:  
- **Time-Unit Choice**: Coarse units (e.g., months) introduce bias if confounders vary within intervals.  

---

#### 22.5 A unified approach to answer What If questions with data
**Subsection Content**  
- Unifies counterfactual and causal diagram frameworks via target trial emulation.  
- Randomized and observational studies differ only in:  
  1. Baseline confounding (absent in randomized trials).  
  2. Known randomization probabilities.  
  3. Recorded treatment assignments.  
- **Per-protocol analyses in both settings**: Require g-methods for time-varying confounding/selection bias.  
- Conventional unadjusted "per-protocol analyses" in trials are often biased.  

**Technical Points**:  
- **G-Methods**: Necessary for per-protocol effects with sustained strategies (e.g., IP weighting, g-formula).  
- **Variance Adjustment**: Bootstrapping for cloned/sequential trial data.  

**Fine Points**:  
- **Data Integration**: Combined randomized/observational data may outperform randomized trials alone when unmeasured effect modifiers exist.  
- **Optimal Strategies**: Observational data can reveal personalized strategies (e.g., treat only high-benefit subgroups).  

---

### Key Takeaways
1. **Target Trial Framework**: Forces explicit definition of interventions, enhancing causal question clarity.  
2. **G-Methods**: Essential for valid per-protocol effect estimation with time-varying confounders in both trials and observational studies.  
3. **Time Zero Handling**: Critical to avoid selection bias; cloning/IP weighting resolves non-unique strategy assignments.  
4. **Unified Analysis**: Randomized and observational studies require similar adjustment for post-baseline biases when estimating per-protocol effects.  

*Note: Image content (Figures 22.1–22.4) is referenced but not summarized due to lack of interpretable data.*