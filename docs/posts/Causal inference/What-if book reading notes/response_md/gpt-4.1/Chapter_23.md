---
date: 2025-09-17 11:19:05
title: Chapter_23
category: Causal inference
tags: [gpt-4.1,response_md]

---
# Chapter 23: Causal Mediation — Structured Summary (中英文对照总结)

---

## Overview 总览

**Causal mediation** focuses on understanding *how* a treatment exerts its effect on an outcome, by decomposing the total effect into direct and indirect (mediated) pathways. This chapter introduces foundational concepts, technical points, and recent advances (notably the "interventionist"/separable effects framework), and provides a careful treatment of both identification and empirical testability.

---

## 1. Standard Mediation Analysis 标准中介分析

### 1.1 Problem Setup 问题设定

- **Setting:** Randomized trial: $A$ is treatment (e.g., smoking cessation), $M$ is mediator (e.g., hypertension at 6 months), $Y$ is outcome (e.g., heart attack at 1 year).
- **Goal:** Decompose the **total effect** of $A$ on $Y$ into
    - **Direct effect** (not through $M$)
    - **Indirect effect** (through $M$)

- **图结构**：$A\to M\to Y$，也可能有 $A\to Y$ (直接路径)。

---

### 1.2 Definitions: Pure/Natural Direct and Indirect Effects 定义：纯/自然直接与间接效应

#### Pure (Natural) Direct Effect 纯/自然直接效应

- **Definition**: The average causal effect of $A$ on $Y$, holding $M$ fixed to the value it would have taken if $A$ were set to 0.

- **Formula 公式**:
  $$
  PDE = E\left[ Y_{a=1, M_{a=0}} \right] - E\left[ Y_{a=0, M_{a=0}} \right]
  $$
  - $Y_{a=1, M_{a=0}}$ = outcome if $A=1$ but $M$ set to the value it would have had if $A=0$.

#### Total (Natural) Indirect Effect 总/自然间接效应

- **Definition**: The change due to mediating through $M$, under fixed $A$.

- **Formula 公式**:
  $$
  TIE = E\left[ Y_{a=1, M_{a=1}} \right] - E\left[ Y_{a=1, M_{a=0}} \right]
  $$

#### Total Effect 总效应

- **Formula 公式**:
  $$
  TE = E\left[ Y_{a=1} \right] - E\left[ Y_{a=0} \right] = PDE + TIE
  $$

- 其中 $E\left[ Y_{a=1} \right]$ 是 treatment $A$ 设为1 时的潜在结局的均值。

---

### 1.3 Identification: The Mediation Formula 鉴别：中介公式

#### The Cross-World Problem 跨世界问题

- $Y_{a=1, M_{a=0}}$ 涉及 **跨世界反事实**——不能通过任何现实实验直接观测。
- Identification usually relies on *cross-world independence assumptions*. NPSEM-IE (Nonparametric Structural Equation Model with Independent Errors) assumes necessary independence; FFRCISTG (Finest Fully Randomized Causally Interpretable Structured Tree Graph) does **not** by default.

#### Mediation Formula 中介公式

- **Key technical result 关键技术结果:**
  $$
  E\left[Y_{a=1, M_{a=0}}\right] = \sum_{m} E \left[ Y | A=1, M=m \right] \Pr\left( M = m | A=0 \right)
  $$
- The **pure direct effect** is thus:
  $$
  PDE = \sum_{m} E \left[ Y | A=1, M=m \right] \Pr\left( M = m | A=0 \right)
       - \sum_{m} E \left[ Y | A=0, M=m \right] \Pr\left( M = m | A=0 \right)
  $$
- **Interpretation:** Average the post-treatment potential outcomes under $A=1$, weighted by the mediator distribution under $A=0$.

- **注意**：上述公式的成立依赖于**交换性 (exchangeability)、一致性 (consistency)** 和 **跨世界独立假设**。

---

## 2. Critiques and Limitations of Standard Approach 标准方法的批评与局限

- **Cross-world counterfactuals cannot be empirically verified.** 无法通过任何实际实验直接验证跨世界反事实独立性（比如同一个人在$A=1$和$A=0$世界中$M$的取值）。
- **Policy relevance questioned**: Pure direct effect does **not** always correspond to an actual intervention of practical interest.

---

## 3. The Interventionist (Separable Effects) Framework 干预主义（可分离效应）框架

### 3.1 Key Ideas 关键思想

- **Decompose Treatment $A$** into **empirically intervenable components**: $N$ (e.g., nicotine), $O$ (non-nicotine).
  - $N$ 直接影响 $M$，不直接影响 $Y$。
  - $O$ 直接影响 $Y$，不影响 $M$。

- **Interventions** can, in principle, be done separately on $N$ and $O$.

#### Separable Effect 可分离效应

- **Separable direct effect of $N$ on $Y$**:
  $$
  SDE_N = E\left[ Y_{n=1, o=1} \right] - E\left[ Y_{n=0, o=1} \right]
  $$
- **Separable direct effect of $O$ on $Y$**:
  $$
  SDE_O = E\left[ Y_{n=1, o=1} \right] - E\left[ Y_{n=1, o=0} \right]
  $$

### 3.2 Identification in the Interventionist Framework 干预主义框架下的鉴别

- **If** the decomposability and no direct effect assumptions are plausible,
    - The **g-formula** for $E\left[ Y_{n=0, o=1} \right]$ coincides with the **mediation formula**:
      $$
      E\left[ Y_{n=0, o=1} \right] = \sum_{m} E[Y | A=1, M=m] \Pr(M=m | A=0)
      $$
- **Empirical testability:** Under this framework, key assumptions (like no direct effect of $N$ on $Y$ not through $M$) *can be empirically tested* by new trial arms (e.g., nicotine-free cigarettes).

---

## 4. Empirical Testing and Falsifiability 经验验证与可证伪性

- **Empirical falsification strategy**:
    - Design a **three-arm trial**:
        1. $A = N = O = 0$ (quit smoking)
        2. $A = N = O = 1$ (keep smoking)
        3. $N = 0, O = 1$ (smoke nicotine-free cigarettes)
    - If $E[Y|N=0, O=1] \ne \sum_{m} E[Y|A=1, M=m] \Pr(M=m|A=0)$, some structural assumptions are violated.
    - Further trials (e.g., with 8 arms) can pinpoint which assumption fails.

---

## 5. Technical/Fine Points 技术与细节要点

### 5.1 Identification and Positivity Requirement 鉴别与正则性要求

- Even when **positivity fails** (some treatment-mediator combinations are unobserved), identification may still succeed if the g-formula is a function of observed data.

### 5.2 Surrogate Mediator 替代中介

- If $M$ is just a *surrogate* (not amenable to well-defined interventions), traditional mediation formulas may not be meaningful, but *separable effect* analysis may proceed if interventions exist on meaningful components.

### 5.3 Path-specific Effects 路径特异效应与前门公式

- Under expanded DAG with deterministic relations, path-specific effects (e.g., $L \to A \to Y$) can sometimes be identified by the **front door formula**:
  $$
  E[Y_n] = \sum_{l, a} E[Y | A=a, L=l] \Pr(L = l) \Pr(A = a | N = n)
  $$
  Which, under certain deterministic structures, boils down to the standard front door g-formula.

---

## 6. Summary and Guidance 小结与实际建议

- **Interventionist mediation** emphasizes (a) decomposition into meaningful/intervenable components, (b) empirical testability of assumptions, (c) flexibility when interventions on $M$ are not well-defined.
- **Standard mediation** relies on strong, untestable cross-world assumptions for identification.
- **All mediation analysis (in the absence of randomized component trials)** requires careful adjustment (for confounders of both treatment and mediator).

---

## 7. Key Causal Formulas 核心因果公式

### Pure Direct Effect 纯直接效应

$$
PDE = E\left[ Y_{a=1, M_{a=0}} \right] - E\left[ Y_{a=0, M_{a=0}} \right]
$$

### Total Indirect Effect 总间接效应

$$
TIE = E\left[ Y_{a=1, M_{a=1}} \right] - E\left[ Y_{a=1, M_{a=0}} \right]
$$

### Mediation Formula 中介公式

$$
E\left[Y_{a=1, M_{a=0}}\right] = \sum_{m} E \left[ Y | A=1, M=m \right] \Pr\left( M = m | A=0 \right)
$$

### Separable Effect (Interventionist Approach) 可分离效应

$$
E\left[ Y_{n=0, o=1} \right] = \sum_{m} E[Y | A=1, M=m] \Pr(M=m | A=0)
$$

(This equals the mediation formula when assumptions hold.)

---

## 8. Assumptions Assessed 前提假定

- **No unmeasured common cause** of $M$ and $Y$
- **No direct effect** of $N$ on $Y$, of $O$ on $M$
- **Exchangeability**, **Consistency**, **(Sometimes) Positivity**
- **(For identification of natural effects) Cross-world Independence** — not empirically testable under standard approach

---

## 9. Chapter Takeaways 章节要点总结

- **标准中介分析**以自然/纯直接和间接效应为核心，但赖于不可证实的反事实独立性假定。
- **干预主义/可分离效应路径**以实际可干预的成份拆解处理变量，能实现假设的经验可证伪性，并用g公式表述，理论与政策意义更强。
- **识别公式**（mediation formula / g-formula）实际上一致，只是解释和验证的基础不同。
- **调解分析关键在于**可否实现理论假设和调整混杂，同时对因果路径具有明确实用意义。

---

## 关键术语表（EN/CH）

| Term | English | 中文 |
|---|---|---|
| Treatment | $A$ | 处理/干预 |
| Mediator | $M$ | 中介变量 |
| Outcome | $Y$ | 结局 |
| Pure/Natural Direct Effect | $PDE$ | 纯/自然直接效应 |
| Total Indirect Effect | $TIE$ | 总/自然间接效应 |
| Mediation Formula | | 中介公式 |
| Separable Effect | | 可分离效应 |
| Cross-world Counterfactual | | 跨世界反事实 |
| Exchangeability | | 交换性假定 |
| Consistency | | 一致性假定 |
| Positivity | | 正则性/阳性假定 |
| FFRCISTG | | 因果结构树图 |
| NPSEM-IE | | 非参数结构方程模型 |

---

**Reference for practice:**  
For actual mediation analyses, theory and identification are only the beginning—applying these methods requires rigorous adjustment for confounders and critical evaluation of all identification assumptions for both direct and mediator relationships.

---

**如果需要某部分进一步深入（如公式推导、图示解释等），请告知！**