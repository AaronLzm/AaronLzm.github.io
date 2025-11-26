---
date: 2025-09-17 11:19:05
title: Chapter_6
category: Causal inference
tags: [DeepSeek-R1-0528-2nd,response_md]

---
<think>
We are summarizing Chapter 6 of the provided PDF. The chapter is titled "GRAPHICAL REPRESENTATION OF CAUSAL EFFECTS". We will follow the structure of the chapter, which includes several sections and technical points. Since the chapter is long, we break it down by the sections as they appear in the text.

The chapter starts with an introduction to causal diagrams and then moves to specific topics: 
6.1 Causal diagrams
6.2 Causal diagrams and marginal independence
6.3 Causal diagrams and conditional independence
6.4 Positivity and consistency in causal diagrams
6.5 A structural classification of bias
6.6 The structure of effect modification

Additionally, there are Technical Points (6.1, 6.2, 6.3) and Fine Points (6.1, 6.2, 6.3) that we need to incorporate.

We note that the chapter includes several figures. Since we cannot see the images, we will rely on the text descriptions and context to summarize the information about the figures.

We will structure the summary by the sections and subsections, and for each, we will extract:
- Technical Points: core theories, definitions, and formulas
- Details: explanations, examples, and key insights

We must use Markdown, include LaTeX for formulas, and note when images are referenced but not described in detail.

Let's begin.
</think>
### Chapter 6: Graphical Representation of Causal Effects

#### 6.1 Causal Diagrams  
Causal diagrams (directed acyclic graphs, DAGs) visually encode qualitative knowledge about causal structures. Key properties:  
- **Nodes**: Represent variables (e.g., \(L\): disease severity, \(A\): treatment, \(Y\): outcome).  
- **Edges (arrows)**: Indicate direct causal effects (e.g., \(L \rightarrow A\) implies \(L\) affects \(A\)).  
- **Acyclicity**: No feedback loops (variables cannot cause themselves).  
- **Temporal order**: Conventionally flows left to right (e.g., \(L\) precedes \(A\), which precedes \(Y\)).  
- **Assumptions**:  
  - Absence of an arrow \(V_j \rightarrow V_m\) implies no direct causal effect of \(V_j\) on \(V_m\).  
  - All common causes of any variables on the graph are included (even if unmeasured).  

**Technical Point 6.1: Causal DAGs**  
- A causal DAG \(G\) has vertices \(V = (V_1, \dots, V_M)\) with directed edges and no cycles.  
- **Markov factorization**: Density \(f(v)\) satisfies:  
  \[
  f(v) = \prod_{j=1}^{M} f(v_j | \text{pa}_j)
  \]  
  where \(\text{pa}_j\) are parents of \(V_j\).  
- **Causal Markov assumption**: Conditional on its parents, \(V_j\) is independent of non-descendants.  

---

#### 6.2 Causal Diagrams and Marginal Independence  
Association between variables arises from:  
1. **Causal paths** (e.g., \(A \rightarrow Y\) in Figure 6.2).  
2. **Common causes** (e.g., \(L\) in \(A \leftarrow L \rightarrow Y\), Figure 6.3).  
3. **Colliders** (common effects) block association unless conditioned on (e.g., \(A \rightarrow L \leftarrow Y\) in Figure 6.4 implies \(A \perp\!\!\!\perp Y\) marginally).  

**Key Insight**:  
- Association flows through open paths. Colliders (e.g., \(L\) in \(A \rightarrow L \leftarrow Y\)) block association when not conditioned on.  

**Technical Point 6.2: Counterfactual Models**  
- Nonparametric structural equation models (NPSEMs) define counterfactuals (e.g., \(V_m^{r}\) when \(R\) is set to \(r\)).  
- Models (e.g., FCISTG, FFRCISTG) link DAGs to counterfactual independencies.  

**Technical Point 6.3: Faithfulness and Independencies**  
- **Faithfulness**: Statistical independence implies d-separation (rare violations occur, e.g., perfect effect cancellation).  
- **NPSEM-IE vs. FFRCISTG**: Differ in independence assumptions (e.g., NPSEM-IE requires independent errors).  

---

#### 6.3 Causal Diagrams and Conditional Independence  
Conditioning affects association:  
- **Blocking non-colliders**: Conditioning on mediators (e.g., \(B\) in \(A \rightarrow B \rightarrow Y\), Figure 6.5) or common causes (e.g., \(L\) in \(A \leftarrow L \rightarrow Y\), Figure 6.6) removes association:  
  \[
  A \perp\!\!\!\perp Y | B, \quad A \perp\!\!\!\perp Y | L.
  \]  
- **Opening colliders**: Conditioning on colliders (e.g., \(L\) in \(A \rightarrow L \leftarrow Y\), Figure 6.7) or their descendants (e.g., \(C\) in Figure 6.8) induces association.  

**Fine Point 6.1: d-Separation Rules**  
A path is blocked if:  
1. It contains a non-collider conditioned on.  
2. It contains an unconditioned collider with no conditioned descendants.  
*(Example: In Figure 6.1, \(L \rightarrow A \rightarrow Y\) is open; \(A \rightarrow Y \leftarrow L\) is blocked by collider \(Y\).)*  

---

#### 6.4 Positivity and Consistency in Causal Diagrams  
- **Positivity**: Implicit in DAGs unless treatment is deterministic (e.g., bold \(L \rightarrow A\) arrow).  
- **Consistency**: Arrows from treatment nodes (\(A\)) must correspond to well-defined interventions.  
- **Limitation**: DAGs cannot fully encode violations of positivity or ill-defined treatments (e.g., "weight loss" in Figure 6.10 has ambiguous interventions).  

---

#### 6.5 A Structural Classification of Bias  
**Systematic bias** arises when association ≠ causation due to:  
1. **Confounding**: Common causes of treatment and outcome (e.g., \(L\) in Figure 6.1).  
2. **Selection bias**: Conditioning on common effects (e.g., \(L\) in Figure 6.7).  
3. **Measurement bias**: Addressed in Chapter 9.  
- **Bias under the null**: Occurs when treatment has no effect but association exists (e.g., Table 3.1).  

**Fine Point 6.3: Causal Discovery**  
- Learning DAG structure from data requires faithfulness and is often indeterminate (e.g., association between \(B\) and \(C\) could reflect \(B \rightarrow C\), \(C \rightarrow B\), or unmeasured common causes).  

---

#### 6.6 The Structure of Effect Modification  
- **Causal effect modifiers**: Directly affect outcome (e.g., quality of care \(V\) in Figure 6.12).  
- **Surrogate effect modifiers**: Associated with causal modifiers but not causal (e.g., cost \(S\) in Figure 6.14).  
- **DAG limitations**: Cannot distinguish effect modification types (e.g., qualitative vs. quantitative).  

**Key Insight**:  
- Surrogate modifiers arise from associations via common causes (e.g., \(U\) in Figure 6.15), conditioning (e.g., \(S=0\) in Figure 6.16), or mediation.  

---

### Summary of Key Concepts  
| **Concept**               | **Definition**                                                                 | **Example**                     |  
|---------------------------|-------------------------------------------------------------------------------|---------------------------------|  
| **Causal DAG**            | Graph encoding causal assumptions; no cycles, all common causes included.      | Figure 6.1                      |  
| **d-Separation**          | Rules to determine conditional independence from DAG structure.               | Fine Point 6.1                  |  
| **Collider**              | Common effect blocking association unless conditioned on.                     | \(A \rightarrow L \leftarrow Y\) |  
| **Confounding Bias**      | Due to common causes of treatment and outcome.                                | \(L\) in Figure 6.3             |  
| **Selection Bias**        | Induced by conditioning on common effects.                                    | Conditioning on \(L\) in Figure 6.7 |  
| **Effect Modification**   | Heterogeneity in causal effects across subgroups.                             | \(V\) (quality of care in Figure 6.12) |  

*Note: Figures referenced (e.g., 6.1–6.16) are integral to examples but not fully describable from text alone.*