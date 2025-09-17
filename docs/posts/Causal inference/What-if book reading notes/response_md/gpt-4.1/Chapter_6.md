---
title: Chapter_6
category: Causal inference
tags: [gpt-4.1,response_md]

---
# Chapter 6: Graphical Representation of Causal Effects  
## 6.1 Causal Diagrams

**ENGLISH**  
- Causal inference often relies on expert knowledge and untestable assumptions about the causal network connecting variables such as treatment (A), outcome (Y), and covariates (L).
- As problems get more complex, it becomes crucial to **explicitly represent** our assumptions about causal relationships among variables.
- **Causal diagrams** (also known as Directed Acyclic Graphs, DAGs) are graphical tools to **represent qualitative knowledge** and **assumptions** about causal structure.
    - **Directed:** edges (arrows) have a specific direction, e.g., \( L \to A \).
    - **Acyclic:** No cycles allowed (i.e., a node cannot be its own ancestor).
- **KEY CONVENTION:**  
    - An arrow from \(V\) to \(W\) indicates a direct causal effect of \(V\) on \(W\).
    - Absence of an arrow means **no direct causal effect** for any individual in the population.
    - The diagram does **not specify** whether effects are harmful or protective, or encode interactions between causes.

**中文**  
- 因果推断通常依赖于专家知识和关于变量（如处理A，结果Y，协变量L）之间因果网络的不可检验假设。
- 随着问题复杂度提升，**明确表达**我们关于变量间因果关系的假设变得非常重要。
- **因果图**（有向无环图，DAG）是一种用于**表达因果结构中的定性知识和假设**的图形工具。
    - **有向：**箭头有方向，例如 \( L \to A \)。
    - **无环：** 不允许有回路（即节点不能成为自身祖先）。
- **核心约定：**  
    - 从 \(V\) 指向 \(W\) 的箭头表示 \(V\) 对 \(W\) 有直接因果作用。
    - 没有箭头表示在整个人群中不存在这种直接因果作用。
    - 图中**不会区分**这种作用是有害还是保护，也**不编码**多因子的交互作用。

---

## Technical Point 6.1: Causal DAGs 数学定义

**ENGLISH**  
- A DAG \( G \) has nodes (random variables) \( V = (V_1,\ldots,V_M) \).
- **Parents:** \( PA_m \) is the set of nodes with arrows into \( V_m \).
- **Markov Factorization:**  
    The joint distribution \( f(v) \) **factors according to the DAG** if:
    $$
    f(v) = \prod_{j=1}^M f(v_j | pa_j)
    $$
- **Causal DAG Requirements:**
    1. Absence of an arrow from \( V_j \) to \( V_m \) implies **no direct causal effect**.
    2. All **common causes** (even unmeasured) of any two variables must be on the graph.
    3. Every variable is a cause of its descendants.
- **Causal Markov Assumption:** Conditional on its **direct causes** (parents), a variable is independent of any variable it does not cause.

**中文**  
- 一个DAG（有向无环图）\( G \) 的节点为随机变量 \( V = (V_1,\ldots,V_M) \)。
- **父节点（Parents）：** \( PA_m \) 表示所有指向 \( V_m \) 的节点集合。
- **马尔可夫分解：**
    $$
    f(v) = \prod_{j=1}^M f(v_j | pa_j)
    $$
- **因果DAG要求：**
    1. 没有箭头 \( V_j \to V_m \) 表示 \( V_j \) 对 \( V_m \) 没有直接因果作用。
    2. 任何两个变量的**共同原因**（即使未被观测）都必须包含在图中。
    3. 任一变量都是其后代的原因。
- **因果马尔可夫假设：** 在已知其直接原因的条件下，一个变量与任何不是其结果的变量独立。

---

## 6.2 Causal Diagrams and Marginal Independence  
**ENGLISH**  
- Causal diagrams also encode expectations about **associations** (correlations) as well as causation.
- **Key Results:**
    1. If \(A\) has a causal effect on \(Y\), they are generally associated:  
        - \( \Pr[Y^{a=1}=1] \neq \Pr[Y^{a=0}=1] \implies \Pr[Y=1|A=1] \neq \Pr[Y=1|A=0] \)
    2. If \(A\) has no direct effect but shares a **common cause** \(L\) with \(Y\), \(A\) and \(Y\) are associated due to \(L\).
    3. If \(A\) and \(Y\) only **share a common effect (collider)** \(L\), they are marginally independent; the collider blocks association.

**中文**  
- 因果图除了表达因果关系，还隐含了变量间**相关性（关联）**的期望。
- **主要结论：**
    1. 如果 \(A\) 对 \(Y\) 有因果作用，则两者一般相关：  
        $$
        \Pr[Y^{a=1}=1] \neq \Pr[Y^{a=0}=1] \implies \Pr[Y=1|A=1] \neq \Pr[Y=1|A=0]
        $$
    2. 若 \(A\) 与 \(Y\) 没有直接作用，但有共同原因 \(L\)，则 \(A\) 与 \(Y\) 由于 \(L\) 而相关。
    3. 如果 \(A\) 和 \(Y\) 只在一个共同结果（碰撞点，collider）\(L\) 处关联，则它们在边际上独立，碰撞点阻断了相关性。

---

## Technical Point 6.2: DAGs and Counterfactual Models

**ENGLISH**  
- Each causal DAG \( G \) represents an underlying **counterfactual model**.
- **Nonparametric Structural Equation Model (NPSEM):**
    - Each node \( V_m \) is determined by a function \( f_m(pa_m, \epsilon_m) \).
    - NPSEM implies the **existence of counterfactuals** for every variable.
- **Factual and counterfactual values** are constructed recursively.
- **Different Models:**
    - **NPSEM-IE:** Assumes all errors \( \epsilon_m \) are mutually independent.
    - **FFRCISTG:** Fully randomized model with fewer independence assumptions, implies causal Markov under weaker assumptions.

**中文**  
- 每个因果DAG \( G \) 对应一个**反事实模型**。
- **非参数结构方程模型（NPSEM）：**
    - 每个变量 \( V_m \) 由 \( f_m(pa_m, \epsilon_m) \) 决定。
    - 该模型假定每个变量的反事实值都存在。
- **实际值与反事实值**递归构建。
- **不同类型模型：**
    - **NPSEM-IE：** 假设所有误差项 \( \epsilon_m \) 相互独立。
    - **FFRCISTG：** 完全随机化结构图，独立假设更弱，但足以推导因果马尔可夫性。

---

## Technical Point 6.3: Independencies in Counterfactual Models

**ENGLISH**  
- **Key Idea:** NPSEM-IE implies stronger independence than FFRCISTG.
- **Exchangeability:**
    - Under NPSEM-IE: \( (Y^{a=0}, Y^{a=1}) \perp\!\!\!\perp A \) (full exchangeability)
    - Under FFRCISTG: \( Y^a \perp\!\!\!\perp A \) for \( a\in\{0,1\} \) (marginal exchangeability)
- Unless otherwise stated, a DAG represents FFRCISTG "as detailed as the data".

**中文**  
- **核心思想：** NPSEM-IE 推导的独立性比 FFRCISTG 更强。
- **可交换性：**
    - NPSEM-IE下：\( (Y^{a=0}, Y^{a=1}) \perp\!\!\!\perp A \)（完全可交换）
    - FFRCISTG下：\( Y^a \perp\!\!\!\perp A \)（边际可交换性）
- 默认情况下，DAG代表“与数据细节一致”的FFRCISTG。

---

## 6.3 Conditional Independence in Causal Diagrams  

**ENGLISH**  
- Marginal (unconditional) association changes when conditioning on variables.
- **General Heuristic Rules:**
    - Conditioning on a **mediator** blocks the association between treatment and outcome.
        - Eg: If \(A\) causes \(B\), which causes \(Y\), then \(A\) and \(Y\) are independent given \(B\).
    - Conditioning on a **common cause** blocks spurious association:  
        - If \(L\) causes both \(A\) and \(Y\), conditioning on \(L\) makes \(A \perp\!\!\!\perp Y | L \).
    - Conditioning on a **collider** or its descendant **opens** an otherwise blocked path, producing spurious association:
        - If \(A \to L \leftarrow Y\), then \(A \perp\!\!\!\perp Y\); but \( A \not\perp\!\!\!\perp Y|L \).

**中文**  
- 边际（无条件）关联在给定其他变量后可能发生变化（条件独立性）。
- **一般图解规则：**
    - 条件在**中介变量**上，阻断了处理与结果间的关联。
        - 如：若 \(A\to B\to Y\)，则有 \(A \perp\!\!\!\perp Y | B \)。
    - 条件在**共同原因**上，阻断伪相关：
        - 若 \(L\) 同时作用于 \(A, Y\)，则 \(A \perp\!\!\!\perp Y | L \)。
    - 条件在**碰撞点或其后代**上，打开原本被阻断的路径，引入伪相关：
        - 如 \(A \to L \leftarrow Y\)，则 \(A \perp\!\!\!\perp Y\)；但 \(A \not\perp\!\!\!\perp Y|L\)。

---

## Fine Point 6.1: **d-Separation**  
A **systematic summary of graphical rules** that determine conditional independence:

**ENGLISH**  
A path between two nodes is **blocked** if and only if:
1. It contains a **collider** that is **not conditioned on** (nor any of its descendants).
2. It contains a **non-collider** node that **has been conditioned on**.

**d-separation Definition:**
- Two sets of variables \(A\) and \(B\) are d-separated by \(C\) if **all paths** between a variable in \(A\) and a variable in \(B\) are blocked by \(C\).
- **Pearl's theorem:** The causal Markov assumption implies:  
    If \(A\) is d-separated from \(B\) given \(C\), then \(A\) is statistically independent of \(B\) given \(C\).

**中文**  
**d-分离法则：**  
对于路径，只如果以下成立，则路径“被阻断”：
1. 路径上存在**碰撞点**，且未对其（或其后代）进行条件限制。
2. 路径上存在**非碰撞点**，且**对其进行了条件限制**。

**d-分离定义：**
- 如果变量集A与B之间所有路径都被C阻断，则称A与B在C条件下d-分离。
- **Pearl定理：** 如果A与B在C下d-分离，则A与B在C条件下统计独立。

---

## Fine Point 6.2: **Faithfulness**

**ENGLISH**  
- **Faithfulness assumption:** If \(A \perp B \mid C\) holds statistically, then \(A\) is d-separated from \(B\) by \(C\) in the DAG.
- Unfaithful distributions can arise e.g. from effect modification with **perfect cancellation** (so average effect is zero but individuals have effects).
- Violated by design in certain matched studies (associational paths cancel).
- **In practice, faithfulness is generally assumed** unless deterministic relationships or design cause violations.

**中文**  
- **忠实性假设：** 若\(A\)在\(C\)下与\(B\)统计独立，则在DAG中A与B在C下d-分离。
- 不忠实常因交互作用恰好抵消或设计（如匹配研究）产生。
- 实务中一般假定忠实性，除非存在确定性关系或实验设计导致违背。

---

## 6.4 Positivity and Consistency in Causal Diagrams

**ENGLISH**  
- **Positivity:**  
    - For every possible set of covariates, there is a positive probability of receiving every treatment.  
    - DAGs **cannot encode most violations of positivity** (except in deterministic cases, depicted by bold arrows).
- **Consistency:**  
    - Arrows from treatment to outcome must represent well-defined, unambiguous interventions.
    - Interventions must be meaningfully defined; otherwise, "the effect of \(A\) on \(Y\)" becomes ambiguous (e.g., 'weight loss' by different methods leads to different implications).

**中文**  
- **可积极性(positivity)：**  
    - 对于每组协变量，接受所有处理选项的概率都必须大于零。
    - DAG通常**无法表达**可积极性被破坏的情形（除非因果关系是确定性的，可以用粗体箭头表示）。
- **一致性(consistency)：**  
    - 处理到结果的箭头必须代表清晰、明确的干预。
    - 如果干预不明确，“A对Y的作用”就变得模糊（如：不同方式减重影响不同）。

---

## Fine Point 6.3: **Discovery of Causal Structure**

**ENGLISH**  
- Possible to infer causal structure from data **under faithfulness** and with knowledge of time ordering, but often impossible in practice due to equivalence classes of DAGs.
- In some scenarios, conditional independencies and association patterns can allow unique identification (e.g., in chains \(Z\to A\to Y\) with certain associations).

**中文**  
- 如满足忠实性假设且有时序信息，在某些情形下（如三节点链）可通过数据唯一确定部分因果结构。
- 但通常，由于等价类DAG的存在，仅凭相关/独立结构难以唯一确定因果结构。

---

## 6.5 Structural Classification of Bias

**ENGLISH**  
- **Systematic bias**: Data do not permit identification of the causal effect even with infinite data.
- **Types of bias** (source by DAG structure):
    1. **Confounding** (common causes):  
        - Treatment and outcome share a common cause, association ≠ effect.
    2. **Selection bias** (conditioning on common effects):  
        - Conditioning on a collider or its descendant generates spurious association.

- **Formal definitions:**
    - **Unconditional bias:**  
        $$
        \Pr[Y^{a=1}=1] - \Pr[Y^{a=0}=1] \neq \Pr[Y=1|A=1] - \Pr[Y=1|A=0]
        $$
        Occurs when \( Y^{a} \not\perp\!\!\!\perp A \).
    - **Conditional bias:**  
        $$
        \Pr[Y^{a=1}=1|L=l] - \Pr[Y^{a=0}=1|L=l] \neq \Pr[Y=1|A=1,L=l] - \Pr[Y=1|A=0,L=l]
        $$
        Occurs if \( Y^{a} \not\perp\!\!\!\perp A|L=l \).

**中文**  
- **系统性偏倚（bias）：** 即使拥有无限大样本，数据依然无法识别因果效应。
- **偏倚分类（按因果结构）：**
    1. **混杂（共同原因）：**
        - 处理与结果有共同原因，导致观测关联≠实际因果效应。
    2. **选择偏倚（共同结果/碰撞点）：**
        - 条件在碰撞点或其后代上，引入伪相关。

- **形式化定义：**
    - **无条件偏倚：**
        $$
        \Pr[Y^{a=1}=1] - \Pr[Y^{a=0}=1] \neq \Pr[Y=1|A=1] - \Pr[Y=1|A=0]
        $$
        若\( Y^{a} \not\perp\!\!\!\perp A \)。
    - **有条件偏倚：**
        $$
        \Pr[Y^{a=1}=1 | L=l] - \Pr[Y^{a=0}=1 | L=l] \neq \Pr[Y=1 | A=1, L=l] - \Pr[Y=1 | A=0, L=l]
        $$
        若\( Y^{a} \not\perp\!\!\!\perp A|L=l \)。

---

## 6.6 Structure of Effect Modification  

**ENGLISH**  
- **Effect modification**: The magnitude or direction of treatment effect varies by levels of a third variable (effect modifier).
- **Causal diagrams are less helpful for illustrating modification**, since arrows simply indicate presence of direct effects, not their magnitude or sign.
- **Two types of effect modifiers:**
    - **Causal effect modifier:** Has a direct effect on the outcome.
    - **Surrogate effect modifier:** Associated with the causal effect modifier (by cause, shared causes, or conditioning).
- Causal DAGs distinguish **associations**, but not the type of interaction or the direction of effect modification.

**中文**  
- **效应修饰(effect modification)：** 处理效应的大小或方向随第三变量（效应修饰因子）变化。
- **因果图对效应修饰的表达有限**，只表示直接作用的存在，无法表达其方向或大小。
- **效应修饰因子的分类：**
    - **因果修饰因子（causal effect modifier）：** 对结果有直接作用。
    - **代理修饰因子（surrogate effect modifier）：** 与因果修饰因子有关，可以因果、共同原因或条件化产生关联。
- 因果DAG可以区分相关，不区分效应修饰的类型或方向。

---

## ***Summary Table***

| Key Concept (English)                   | 中文对应术语           | Key Equation / Principle                                |
|-----------------------------------------|-----------------------|---------------------------------------------------------|
| Direct Causal Effect in DAG             | 直接因果作用          | Arrow from \( V \to W \) shows direct effect            |
| Markov Factorization                    | 马尔可夫分解          | \( f(v) = \prod_{j=1}^M f(v_j | pa_j) \)                 |
| Causal Markov Assumption                | 因果马尔可夫假设      | Conditional independence on direct causes               |
| d-separation                            | d-分离                | Path blocked: collider not conditioned, or non-collider conditioned|
| Faithfulness                            | 忠实性                | \( A\perp B|C \implies A \) d-separated from \( B|C \)  |
| Systematic bias                         | 系统性偏倚            | \( \Pr[Y^{a=1}=1] - \Pr[Y^{a=0}=1] \ne \Pr[Y=1|A=1] - \Pr[Y=1|A=0] \) |
| Effect Modification                     | 效应修饰              | Size/direction of effect varies by modifier variable     |


---

## ***Key Takeaways***

- Causal DAGs are essential for representing and reasoning about complex causal assumptions.
- The **causal Markov assumption** and **faithfulness** link graphical structure and statistical independence.
- **d-separation** provides systematic rules for reading conditional independence from a DAG.
- Systematic bias arises mainly from **confounding** (common causes) and **selection bias** (conditioning on common effects).
- **Effect modification** is not encoded in the structure of a DAG, only the existence of direct effects, not their form or variation.

---

*(If you want specific illustrations for key DAGs or more practical examples in each category, please specify!)*