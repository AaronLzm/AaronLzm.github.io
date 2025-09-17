---
title: Chapter_23
category: Causal inference
tags: [DeepSeek-R1-0528,response_md]

---
<think>
We are summarizing Chapter 23 "Causal Mediation" from the provided text. The chapter is divided into several sections: 23.1, 23.2, 23.3, 23.4, and includes Technical Points and Fine Points.

We'll structure the summary by the sections and subsections as they appear in the text. Since the text includes several pages, we are focusing on the content from page 1 to page 9 (the end of the chapter content, excluding references and index).

The chapter starts with an introduction to causal mediation, then discusses mediation analysis under attack (23.1), a defense of mediation analysis (23.2), empirically verifiable mediation (23.3), and an interventionist theory of mediation (23.4). There are also Technical Points (23.1, 23.2, 23.3) and Fine Points (23.1, 23.2) that provide additional details.

We note that the text mentions figures (e.g., Figure 23.1, 23.2, etc.) but we don't have the actual figures. We'll describe the content based on the context.

We'll break down the chapter into the following sections:

1. Chapter 23 Introduction
2. Section 23.1: Mediation analysis under attack
3. Technical Point 23.1: Proof of the mediation formula
4. Section 23.2: A defense of mediation analysis
5. Technical Point 23.2: When the mediation formula is the g-formula
6. Section 23.3: Empirically verifiable mediation
7. Fine Point 23.1: Empirical falsification of the assumptions for separable effects
8. Section 23.4: An interventionist theory of mediation
9. Technical Point 23.3: Path-specific effects and the front door formula
10. Fine Point 23.2: Separable effects with a surrogate mediator

We'll summarize each section, extracting technical points and fine points as described.

Let's proceed step by step.
</think>
### Chapter 23: Causal Mediation

#### Introduction  
**子章节内容**  
Causal mediation analysis examines pathways through which treatment affects outcomes, extending time-varying treatment frameworks to include mediators. Unlike standard approaches using pure direct/total indirect effects, this chapter's interventionist framework links to empirically verifiable target trials.  

**技术重点（Technical Points）**:  
- **核心理论**: Mediation analysis decomposes treatment effects into direct and indirect pathways using hypothetical interventions.  
- **重要概念**:  
  - *Pure direct effect*: Effect of treatment if mediator is set to its value under no treatment.  
  - *Total indirect effect*: Mediated effect via the mediator.  
- **应用场景**: Evaluating mechanisms (e.g., how smoking cessation reduces heart attack risk via hypertension).  

**细节要点（Fine Points）**:  
- **相关背景**: Builds on Part III’s time-varying treatment methods but focuses on causal pathways.  
- **辅助信息**: Requires no unmeasured common causes of mediator and outcome for identifiability.  

---  
#### 23.1 Mediation Analysis Under Attack  
**子章节内容**  
A smoking cessation trial illustrates challenges: investigators seek to decompose the effect of quitting smoking (A) on heart attacks (Y) into direct effects and indirect effects mediated by hypertension (M). Pure direct/total indirect effects involve cross-world counterfactuals (e.g., \(Y^{a=1,M^{a=0}}\)), which are unverifiable experimentally.  

**技术重点（Technical Points）**:  
- **关键公式**:  
  - Pure direct effect: $$E[Y^{a=1,M^{a=0}}] - E[Y^{a=0,M^{a=0}}]$$  
  - Total indirect effect: $$E[Y^{a=1,M^{a=1}}] - E[Y^{a=1,M^{a=0}}]$$  
  - Mediation formula: $$\sum_m E[Y \mid A=1, M=m] \cdot P(M=m \mid A=0)$$  
- **重要概念**: Cross-world quantities (e.g., \(Y^{a=1,M^{a=0}}\)) require untestable independence assumptions (NPSEM-IE model).  

**细节要点（Fine Points）**:  
- **案例分析**: In the trial, \(E[Y^{a=1,M^{a=0}}]\) is unobservable for continuing smokers.  
- **辅助信息**: FFRCISTG models avoid unverifiable cross-world assumptions but may not identify effects pointwise.  

---  
#### Technical Point 23.1: Proof of the Mediation Formula  
**子章节内容**  
Derives the mediation formula under Figure 23.1’s DAG, assuming cross-world independence \(Y^{a=1,m} \perp\!\!\!\perp M^{a=0}\). The proof uses probability laws, exchangeability, and consistency.  

**技术重点（Technical Points）**:  
- **关键公式**:  
  $$E[Y^{a=1,M^{a=0}}] = \sum_m E[Y \mid A=1, M=m] \cdot P(M=m \mid A=0)$$  
- **核心理论**: Formula validity depends on the NPSEM-IE model, not FFRCISTG.  

**细节要点（Fine Points）**:  
- **辅助信息**: Cross-world independence is empirically unverifiable.  

---  
#### 23.2 A Defense of Mediation Analysis  
**子章节内容**  
To justify pure direct effects, investigators reframe \(E[Y^{a=1,M^{a=0}}]\) as the effect of nicotine-free cigarettes (O=1, N=0) in a future trial, assuming:  
(i) Nicotine (N) affects Y only via M,  
(ii) Non-nicotine components (O) do not affect M.  

**技术重点（Technical Points）**:  
- **核心理论**: Under Figure 23.2’s FFRCISTG, \(E[Y^{n=0,o=1}]\) equals the mediation formula.  
- **重要概念**: *Separable effects*: Effects of treatment components (N and O).  

**细节要点（Fine Points）**:  
- **案例分析**: Nicotine-free cigarettes’ effect is \(E[Y^{n=0,o=1}]\) if assumptions hold.  
- **相关背景**: Assumptions link cross-world quantities to real-world interventions.  

---  
#### Technical Point 23.2: When the Mediation Formula is the g-Formula  
**子章节内容**  
Shows that under Figure 23.3’s deterministic relationships (A→N, A→O), the g-formula for \(E[Y^{n=0,o=1}]\) simplifies to the mediation formula despite positivity violations.  

**技术重点（Technical Points）**:  
- **关键公式**:  
  $$E[Y^{n=0,o=1}] = \sum_m E[Y \mid A=1, M=m] \cdot P(M=m \mid A=0)$$  
- **核心理论**: Deterministic links enable identification without positivity.  

**细节要点（Fine Points）**:  
- **辅助信息**: Proof uses SWIGs and g-formula properties.  

---  
#### 23.3 Empirically Verifiable Mediation  
**子章节内容**  
A three-arm trial (standard cigarettes, cessation, nicotine-free cigarettes) tests assumptions (i)–(iii). If \(E[Y \mid N=0,O=1]\) differs from the mediation formula, assumptions are refuted.  

**技术重点（Technical Points）**:  
- **应用场景**: Validating separable effects via future randomized trials.  
- **重要概念**: Assumptions (i) no direct N→Y, (ii) no direct O→M, (iii) no unmeasured M-Y confounders.  

**细节要点（Fine Points）**:  
- **案例分析**: Associations (e.g., O–M in N=0) refute assumptions.  
- **辅助信息**: Fine Point 23.1 details falsification methods.  

---  
#### Fine Point 23.1: Empirical Falsification of Separable Effects Assumptions  
**子章节内容**  
If N and Y are associated given M and O, either (i) or (iii) is false. An 8-arm trial (intervening on M, N, O) can distinguish these.  

**细节要点（Fine Points）**:  
- **辅助信息**: Unmeasured confounders may activate only under component interventions.  

---  
#### 23.4 An Interventionist Theory of Mediation  
**子章节内容**  
Proposes focusing on separable components (e.g., nicotine, non-nicotine) instead of mediators. Requires:  
- Decomposing treatment into intervenable components.  
- Verifiable assumptions via randomized trials.  

**技术重点（Technical Points）**:  
- **核心理论**: Separable effects exist even if mediator interventions are undefined.  
- **应用场景**: Effects of nicotine-free cigarettes without specifying mediator interventions.  

**细节要点（Fine Points）**:  
- **相关背景**: Extends to survival analysis, competing risks, and interference.  

---  
#### Technical Point 23.3: Path-Specific Effects and the Front Door Formula  
**子章节内容**  
Under Figure 23.6, the front door formula identifies path-specific effects (e.g., L→A→Y) using separable components (N, O).  

**技术重点（Technical Points）**:  
- **关键公式**:  
  $$E[Y^n] = \sum_{l,a} E[Y \mid A=a, L=l] \cdot P(L=l) \cdot P(A=a \mid N=n)$$  
- **核心理论**: Deterministic relationships enable identification.  

---  
#### Fine Point 23.2: Separable Effects with a Surrogate Mediator  
**子章节内容**  
If M is a surrogate for an unmeasured mediator (H), causal diagrams (Figures 23.4–23.5) help interpret dependencies (e.g., N–Y given M, O).  

**细节要点（Fine Points）**:  
- **辅助信息**: Independence violations suggest misspecification or faithfulness violations.  

---  
### 总结  
本章从批判传统中介分析（依赖不可验证的跨世界反事实）出发，提出了基于可分离效应的干预主义框架。核心创新是将处理分解为可干预的组分（如尼古丁与非尼古丁成分），通过未来随机试验验证假设，并建立中介公式与g公式的等价性。技术要点包括纯直接效应、总间接效应的数学定义及可识别条件，细节要点涵盖吸烟 cessation 试验的案例分析和假设可证伪性设计。