---
title: Chapter_19
category: Causal inference
tags: [gpt-4.1,response_md]

---
# Chapter 19: Time-Varying Treatments (《因果推断：What If》第19章 时间变化处理)

This is the summary with all key points, technical details, fine points, and all formulas in Math + bilingual format.

---

## 19.1 The Causal Effect of Time-Varying Treatments  
### Key Ideas  
- Most of the book so far has considered **static (time-fixed) treatments**: $A$ set at $t=0$ and outcome $Y$ measured at a later time.
- **Time-varying treatments** ($A_k$) can change at each time $k$ ($k=0,1,...,K$).  
    - E.g., monthly ART (抗逆转录病毒治疗) therapy in HIV.
- The **treatment history** is denoted $\overline{A}_k = (A_0, A_1, ..., A_k)$.
- For fixed treatments, **average causal effect (ACE)** is:  
  $$
  E[Y^{a=1}] - E[Y^{a=0}]
  $$
- For time-varying treatments, the ACE is no longer uniquely defined as interventions are a vector/sequence.

### 中文
- 之前讨论的均为**时间固定处理**（$A$在$t=0$设定，$Y$在未来测量）。
- **时间变化处理**（$A_k$）可以在每个时间点$k$发生变化（$k=0,1,...,K$）。
    - 例如，HIV患者的每月抗病毒治疗。
- **处理历史**记为 $\overline{A}_k = (A_0, A_1, ..., A_k)$。
- 固定处理的平均因果效应（ACE）：$E[Y^{a=1}] - E[Y^{a=0}]$。
- 时间变化处理的ACE不再唯一定义，因为干预是一个序列。

---

## 19.2 Treatment Strategies 策略

### Definitions & Main Points
- **Treatment strategy** (also: plan, policy, protocol, regime): rule assigning treatment at each time $k$.
- **Examples:**
    - "Always treat" ⇒ $\overline{a} = (1, 1, ..., 1) = \overline{1}$
    - "Never treat" ⇒ $\overline{a} = (0, 0, ..., 0) = \overline{0}$
- **ACE for strategies:** contrast mean outcomes under two strategies:  
  $$
  E[Y^{\overline{a} = \overline{1}}] - E[Y^{\overline{a} = \overline{0}}]
  $$
- **Static strategy**: treatment does not depend on time-varying covariates.
- **Dynamic strategy**: treatment at time $k$ depends on the evolving covariate history (e.g. "Treat if CD4 drops below threshold").

#### Fine Point 19.1: Deterministic & Random Strategies
- **Deterministic dynamic strategy:**
  $$
  g = \left( g_0(\overline{a}_{-1}, l_0), ..., g_K(\overline{a}_{K-1}, \overline{l}_K) \right)
  $$
- **Static deterministic strategy**: $g_k$ depends only on past treatments.
- **Random strategy:** assigns a *probability* of treatment at each time (static or dynamic).
- **Optimal strategy:** maximizes $E[Y^g]$; usually dynamic for drug interventions.

### 中文
- **处理策略**：给每个时间点$k$分配处理的规则。
- **举例：**
    - 始终治疗：$\overline{a} = (1, 1, ..., 1)$
    - 从不治疗：$\overline{a} = (0, 0, ..., 0)$
- 策略的平均因果效应：
  $E[Y^{\overline{a} = \overline{1}}] - E[Y^{\overline{a} = \overline{0}}]$
- **静态策略**：处理与协变量无关。
- **动态策略**：处理取决于随时间变化的协变量，如CD4计数。

---

## 19.3 Sequentially Randomized Experiments (SRE) 顺序随机实验

### Main Points
- **SRE:** At each time $k$, treatment $A_k$ is randomly assigned, possibly depending on observed history only ($\overline{A}_{k-1}, \overline{L}_k$).
- **Causal diagrams:**
    1. No arrows from $\overline{L}_k$ or $\overline{U}_k$ to $A_k$—ideal randomization.
    2. Only from measured covariates—randomization conditional on observed history.
    3. Arrows from both measured and unmeasured—unmeasured confounding (typical in observational studies).
- **Sequential randomization** eliminates time-varying confounding by unmeasured variables.

### 中文
- **顺序随机实验（SRE）**：每个时间点$k$，$A_k$在观测历史下随机分配。
- **三种因果图**：
    1. 没有从$\overline{L}_k$或$\overline{U}_k$到$A_k$的箭头——理想随机化。
    2. 只有测量协变量——观测历史条件下的随机化。
    3. 有未测量协变量——有未测量混杂的观察性研究。
- 顺序随机分配消除了未测变量带来的时间变化混杂。

---

## 19.4 Sequential Exchangeability 顺序可交换性

### Main Points
- **Exchangeability (time-fixed):** $Y^a \perp\!\!\!\perp A \mid L$
- **Sequential conditional exchangeability (SCE):** At each time, treatment is as if randomized given past ($\overline{L}_k$, $\overline{A}_{k-1}$).
    - Two time points:  
        $$
        \begin{align*}
        Y^g &\perp\!\!\!\perp A_0 \mid L_0 \\
        Y^g &\perp\!\!\!\perp A_1 \mid A_0 = g(L_0), L_0, L_1
        \end{align*}
        $$
    - **General (for all $k$ and strategies $g$):**
        $$
        Y^g \perp\!\!\!\perp A_k \mid \overline{A}_{k-1} = g(\overline{A}_{k-2}, \overline{L}_{k-1}), \overline{L}_k
        $$
- **Holds** in SRE and some observational studies **if** treatment depends only on measured history.

#### Identification:
- If SCE holds, means $E[Y^g]$ is identified (using g-formula) for all (static/dynamic) $g$.
- Sequential **positivity** and **consistency** are also required (see below).

### 中文
- **可交换性（固定处理）**：$Y^a \perp\!\!\!\perp A | L$
- **顺序条件可交换性**：每个时间点，处理在既往历史下如同随机。
    - 两时间点举例：
        $Y^g \perp\!\!\!\perp A_0 | L_0$  
        $Y^g \perp\!\!\!\perp A_1 | A_0 = g(L_0), L_0, L_1$
    - 一般化：
        $Y^g \perp\!\!\!\perp A_k | \overline{A}_{k-1} = g(\overline{A}_{k-2}, \overline{L}_{k-1}), \overline{L}_k$
- SRE和某些观察数据在满足条件下成立。
- 只要顺序可交换性成立，就能识别所有（静态和动态）策略的$E[Y^g]$。

---

## 19.5 Positivity and Consistency for Time-varying Treatments  
### Technical Point 19.2:  
#### **Positivity**
- Fixed: $f_L(l) \neq 0 \implies f_{A|L}(a|l) > 0$  
- Sequential: If $f_{\overline{A}_{k-1}, \overline{L}_k}(\overline{a}_{k-1}, \overline{l}_k) \neq 0$, then  
  $f_{A_k|\overline{A}_{k-1}, \overline{L}_k}(a_k|\overline{a}_{k-1}, l_k) > 0$ for all $(\overline{a}_k, l_k)$

#### **Consistency**  
- Fixed: If $A=a$ for an individual, $Y^a = Y$ for that person.
- Sequential:  
  $$
  Y^{\overline{a}} = Y^{\overline{a}^*} \text{ if } \overline{a}^* = \overline{a} \\
  Y^{\overline{a}} = Y \text{ if } A = \overline{a}
  $$
- For dynamic strategies, if at each $k$, $A_k=g_k(A_{k-1}, L_k)$ for an individual, then $Y^g = Y$.

### 中文
- **可积极性（positivity）**：保证每个处理历史下各处理分配概率均大于零。
- **一致性（consistency）**：个体遵循所关注策略时，其反事实结果与观测结果一致。

---

## 19.6 Identifiability under Some but Not All Treatment Strategies  
### **Key Technical Detail: SWIGs and Sequential Exchangeability**

- **SWIG (Single World Intervention Graph):** Used to directly check for sequential exchangeability and identification by d-separation.
- **Static Sequential Exchangeability:**
    $$
    Y^{\overline{a}} \perp\!\!\!\perp A_k \mid \overline{A}_{k-1} = \overline{a}_{k-1}, \overline{L}_k
    $$
    Sufficient for static strategies.
- **Dynamic strategies identification** requires stronger exchangeability. Not always possible if unmeasured common causes (e.g., "W") exist between $A_0$ and $L_1$ (see diagrams).
- **Fine Point:** Even if $L_1$ is not a cause of $Y$, adjusting for $L_1$ may still be needed to block backdoor paths.

### 中文
- **SWIG图**：可视化确认交换性与可识别性的重要工具。
- **静态顺序可交换性**：只对静态策略成立。
- **动态策略** 需更强的可交换性条件，若有未测共同原因则不能识别。

---

## 19.7 Time-varying Confounding and Time-varying Confounders  
### Definitions & Main Points

- **Time-varying confounders** ($\overline{L}_k$): variables that:
    - Affect subsequent treatment and outcome (possibly via unmeasured $U_k$).
    - Change over time.
- **Need to adjust** for $\overline{L}_k$ at each $k$ to block backdoor path $A_k \leftarrow L_k \leftarrow U_k \rightarrow Y$.
- **Definition (Fine Point 19.3):**  
    - There is confounding for $E[Y^{\overline{a}}]$ if  
      $$
      E[Y^{\overline{a}}] \neq E[Y|A=\overline{a}]
      $$
    - If  
      $E[Y^{\overline{a}}|L_0] = E[Y|A = \overline{a}, L_0]$  
      then confounding is time-fixed; otherwise mixing (time-varying) confounding is present.

- **Unmeasured confounding:** Any violation of identifiability conditions or unmeasured common causes (e.g. $U_k$).
- **Time-varying confounders** (also called **time-dependent confounders**): must be measured and adjusted via appropriate methods (see g-methods in next chapters).

### 中文
- **时间变化混杂变量**（$\overline{L}_k$）：影响未来处理及结局，并且随时间变化。
- 每个时间点需调整$\overline{L}_k$以阻断反门路径。
- **定义（细节19.3）**：
    - 若 $E[Y^{\overline{a}}] \neq E[Y|A = \overline{a}]$，则存在混杂。
    - 若 $E[Y^{\overline{a}}|L_0] = E[Y|A = \overline{a}, L_0]$，则只有时间固定混杂。
- **未测混杂**：可识别性条件被破坏或存在未测共同原因。

---

## Summary Table of Technical/Fine Points and Core Formulas

| Concept                  | Formula (English)                                                  | 公式 (中文)               |
|--------------------------|---------------------------------------------------------------------|---------------------------|
| ACE (fixed treatment)    | $E[Y^{a=1}] - E[Y^{a=0}]$                                           | $E[Y^{a=1}] - E[Y^{a=0}]$ |
| ACE (time-varying)       | $E[Y^{\overline{a}_1}] - E[Y^{\overline{a}_0}]$                     | 时间序列两组策略的均值差     |
| Sequential Exchangeability | $Y^g \perp\!\!\!\perp A_k \mid \overline{A}_{k-1}=g(\overline{A}_{k-2},\overline{L}_{k-1}),\overline{L}_k $ | 顺序条件可交换性             |
| Positivity (seq.)        | $f_{\overline{A}_{k-1},\overline{L}_k}(\overline{a}_{k-1},\overline{l}_k)\neq 0 \implies f_{A_k|\overline{A}_{k-1},\overline{L}_k}(a_k|\overline{a}_{k-1},l_k)>0$ | 可积极性                    |
| Consistency (seq.)       | $Y^{\overline{a}} = Y$ if $A=\overline{a}$                          | 一致性                     |
| Time-varying confounding | $E[Y^{\overline{a}}] \neq E[Y | A = \overline{a}]$                  | 时间变化混杂性定义           |
| Static Seq. Exchangeability | $Y^{\overline{a}} \perp\!\!\!\perp A_k |\overline{A}_{k-1}=\overline{a}_{k-1},\overline{L}_k $ | 静态顺序可交换性            |

---

## **In summary...**（总结）
- **核心思想**：时间变化处理和动态策略背景下的因果推断需明确定义策略，关注顺序可交换性、可积极性和一致性。
- **模型识别**：是否能用观测数据识别因果效应，取决于所考虑策略、变量测量完整性与混杂结构。
- **时间变化混杂变量的调整**必须使用g-methods（第21章详述）而非普通回归调整。

**The next chapter explains how to actually estimate these causal effects (g-methods).**