---
title: Chapter_2
category: Causal inference
tags: [gpt-4.1,response_md]

---
# Chapter 2: Randomized Experiments — Summary & Key Technical Points

---

## 2.1 Randomization

### Introduction to Causal Effects and Randomization
- **Causal Question Example:** Does you looking up make other people look up?
- **Setup:** Randomly assign action via coin flip, compare outcomes (proportion of "look up" responses).
- **Result:** 55% vs. 1% — strong evidence for a causal effect.

#### Key Concepts
- **Experiment:** Researcher controls the action.
- **Randomization:** Assignment determined by a random mechanism, not a deterministic rule.
- **Why Randomization?**
    - Avoids confounding: ensures groups are comparable.
    - Critics cannot argue that group differences are driving the observed effect (unlike sex-based assignment).

### The Problem of Missing Counterfactuals
- In any real study, for an individual, only one potential outcome is observed:
    - $Y^{a=1}$ (under treatment)
    - $Y^{a=0}$ (under no treatment)
- Only $Y$ under $A$ (the treatment actually received) is observed. The other counterfactual is missing.

### Table 2.1
- Illustrates observed data and missing counterfactuals for each individual.

### **Randomization Generates Exchangeability**
- **Exchangeability:** Treated and untreated groups are comparable because any differences are due to chance.
- Even if the treatment allocation is flipped after randomization, the estimation of effects remains unchanged.
- **Formalization:** The distribution of outcomes under randomization makes:
    - $\Pr[Y^{a=1} = 1 | A=1] = \Pr[Y^{a=1} = 1 | A=0]$
    - $\Pr[Y^{a=1} = 1 | A=1] = \Pr[Y^{a=1} = 1]$ (marginal risk)
    - More generally, for all $a$, $Y^a \perp\!\!\!\perp A$
- **Exogeneity** is another term for exchangeability in this context.

#### Technical Point 2.1: Versions of Exchangeability
- **Full Exchangeability:** Randomization produces joint independence between all potential outcomes and $A$.
    - $Y^A \perp\!\!\!\perp A$ (joint vector of all counterfactuals)
- **Mean Exchangeability:** $E[Y^a|A=1] = E[Y^a|A=0]$ for all $a$.
    - Sufficient for causal identification: $E[Y^a] = E[Y|A=a]$
- For dichotomous outcomes, these are equivalent in practice, so simply called "exchangeability".

#### Important Distinction 
- $Y^a \perp\!\!\!\perp A$ **IS NOT** $Y \perp\!\!\!\perp A$:
    - If treatment has causal effect, then $Y$ and $A$ will be associated, but the assignment of $A$ is unrelated to potential outcomes.

### **Fine Point 2.1: Crossover Experiments**
- When each individual serves as their own control (receives both treatments at different times).
- **Individual causal effects can only be identified if:**
    1. No carryover effects: $Y^{a_0, a_1}_{i1} = Y^{a_1}_{i1}$
    2. Effects don't depend on time.
    3. Counterfactual under no treatment doesn't depend on time.
- Not generally possible for irreversible treatments/outcomes (e.g., heart transplants).

-----

## 2.2 Conditional Randomization

### **Conditional (Stratified) Randomization Designs**
- **Design 1 (Marginal Randomization):**
    - All individuals randomized with the same probability.
    - Ensures **marginal exchangeability**: $Y^a \perp\!\!\!\perp A$ for all $a$.
- **Design 2 (Conditional Randomization):**
    - Probability of treatment assignment differs by a baseline factor $L$ (e.g., critical vs. noncritical condition).
    - Ensures **conditional exchangeability**: $Y^a \perp\!\!\!\perp A \mid L$, but not marginal exchangeability.

#### **Definition**
- **Conditional Exchangeability:** For all $l$,
    $$
    Y^a \perp\!\!\!\perp A \mid L=l
    $$
    Or, in risk terms:
    $$
    \Pr[Y^a=1|A=1,L=l] = \Pr[Y^a=1|A=0,L=l], \forall a, l
    $$

- **Marginal exchangeability:** Holds only if randomization is not conditional on $L$.

#### Data missing patterns:
- **MCAR:** Data are 'Missing Completely At Random', e.g., in marginal randomization.
- **MAR:** Data are 'Missing At Random' conditional on $L$, e.g., in conditional randomization.

### **Effect Estimation in Conditional Randomization**
- Two main options:
    1. **Stratum-specific (stratified) average causal effects (effect modification)**
        - Estimate average causal effect within each strata $L=l$.
    2. **Marginal (overall) average causal effect**
        - Average over the population distribution of $L$.

----

## 2.3 Standardization

### **Standardization Formula for the Marginal Causal Effect**

- Let $L$ be a pre-treatment variable (e.g., critical status).
- For each level $l$, compute observed risks:
    $$
    \Pr[Y=1|L=l,A=a]
    $$
- Marginal potential outcome risk:
    $$
    \Pr[Y^a=1] = \sum_l \Pr[Y^a=1|L=l] \Pr[L=l]
    $$
- Under conditional exchangeability:
    $$
    \Pr[Y^a=1] = \sum_l \Pr[Y=1|L=l,A=a] \Pr[L=l]
    $$
- **Causal risk ratio by standardization:**
    $$
    \text{Causal RR} = \frac{\sum_l \Pr[Y=1|L=l,A=1] \Pr[L=l]}
    {\sum_l \Pr[Y=1|L=l,A=0] \Pr[L=l]}
    $$

**Standardized mean (in general):**
$$
\text{Standardized mean:} \qquad \sum_l E[Y|L=l, A=a]\Pr[L=l]
$$

### **Fine Point 2.2: Risk Periods**
- Specification of the time-window for risk is critical (e.g. 5-day vs 100-year mortality risk yields different causal effect interpretations).

----

## 2.4 Inverse Probability Weighting (IPW)

### **Idea:**
- Create a pseudo-population where treatment is independent of $L$ by weighting individuals inversely by their probability of receiving the treatment they actually received.

**For each individual:**
$$
W_A = \frac{1}{\Pr(A|L)}
$$

- **For treated with $L=l$:** Weight $1/\Pr(A=1|L=l)$
- **For untreated with $L=l':$** Weight $1/\Pr(A=0|L=l')$

### **Marginal Outcome under Treatment $a$ by IPW:**
$$
E^\ast[Y|A=a] = E\left[\frac{Y \cdot \mathbb{I}(A=a)}{\Pr(A=a|L)}\right]
$$
Where $\mathbb{I}(A=a)$ is indicator function for treatment.

### **Technical Point 2.2: Formal Definition**
- Using density notation, for discrete variables:
    $$
    f[a|l] = \Pr(A=a|L=l)
    $$
    So
    $$
    W_A = \frac{1}{f[A|L]}
    $$

- Expected (weighted) mean equivalence:
    $$
    E^\ast[Y|A=a] = E\left[\frac{Y \cdot \mathbb{I}(A=a)}{f[A|L]}\right]
    $$

### **Equivalence of IP Weighting and Standardization (Technical Point 2.3):**
- **Standardization:**
    $$
    \sum_l E[Y|A=a,L=l]\Pr[L=l]
    $$
- **IPW:**
    $$
    E\left[\frac{Y \cdot \mathbb{I}(A=a)}{f[A|L]}\right]
    $$
- **They are mathematically equivalent under positivity and conditional exchangeability.**
- Proof via properties of the expectation and indicator function.

### **Positivity Requirement**
- For all combinations of $A$ and $L$ with nonzero $\Pr[L=l]$, $\Pr(A=a|L=l)>0$.

## **Summary Table of Core Assumptions and Methods**

| Method             | Exchangeability Needed          | Estimand Identified                         | Required Formula                                                                  |
|--------------------|-------------------------------|---------------------------------------------|-----------------------------------------------------------------------------------|
| Marginal Randomization   | $Y^a \perp\!\!\!\perp A$            | Marginal average causal effect              | $\Pr[Y^a=1] = \Pr[Y=1|A=a]$                                                       |
| Conditional Randomization| $Y^a \perp\!\!\!\perp A|L$           | Conditional stratum-specific causal effect  | $\Pr[Y^a=1|L=l] = \Pr[Y=1|A=a,L=l]$                                               |
| Standardization           | $Y^a \perp\!\!\!\perp A|L$           | Marginal average causal effect              | $\sum_l \Pr[Y=1|A=a,L=l]\Pr[L=l]$                                                 |
| IP Weighting              | $Y^a \perp\!\!\!\perp A|L$           | Marginal average causal effect              | $E\left[\frac{Y\cdot \mathbb{I}(A=a)}{\Pr(A|L)}\right]$                           |

---

## **中文总结**

---

### 2.1 随机化

- **因果问题基础:** 举例实际因果推断问题及如何设计随机化实验。
- **随机化:** 通过随机机制（如抛硬币）分配处理，消除了混杂。
- **交换性（Exchangeability）:** 随机化保证组间（处理/对照）可比性，即群体间唯一差异是随机。
    - 形式化：$Y^a \perp\!\!\!\perp A$ 对所有 $a$ 都成立。
- **完全交换性/均值交换性:** 随机化使所有潜在结局与处理独立，均值交换性即可用于均值效应识别。
- **注意:** $Y^a \perp\!\!\!\perp A$ 不等价于 $Y \perp\!\!\!\perp A$。如果确有因果效应，对 $Y$ 与 $A$ 必然有关联。

#### 精要点
- **交叉实验不能通用:** 只有在无携带效应、效应无时间依赖、对照结果稳定等极强条件下，个体因果效应才能被识别。

---

### 2.2 条件随机化

- **边际随机化:** 每人接受处理概率相同，保证整体交换性。
- **条件随机化:** 分层分配概率（如按疾病严重程度），仅保证层内交换性。
    - **条件交换性:** $Y^a \perp\!\!\!\perp A|L$
- **效应估计:**
    - 层内（分层）平均因果效应
    - 总体（边际）平均因果效应（通过标准化或加权获得）

---

### 2.3 标准化

- **总体潜在结局风险:** 混合各层次风险的加权平均
    $$
    \Pr[Y^a=1] = \sum_l \Pr[Y=1|L=l,A=a] \Pr[L=l]
    $$
- **因果风险比:**
    $$
    \frac{\sum_l \Pr[Y=1|L=l,A=1]\Pr[L=l]}
    {\sum_l \Pr[Y=1|L=l,A=0]\Pr[L=l]}
    $$
- **标准化本质：** 按总体 $L$ 分布标准化不同处理组的结局风险。

---

### 2.4 逆概率加权（IPW）

- **方法:** 给个体赋予 $1/\Pr(A|L)$ 的权重来创造一个“处理与 $L$ 独立”的伪总体。
    - 加权均值公式：
    $$
    E\left[\frac{Y \cdot \mathbb{I}(A=a)}{\Pr(A=a|L)}\right]
    $$
- **权重定义:** $W_A = \frac{1}{\Pr(A|L)}$，依个体实际处理组和层次确定。
- **与标准化等价:** 数学上完全等价（需满足正则性，即各分组概率 $>0$）。
- **与分层标准化理解:** 两种方式本质等价，都是在消除（或校正）分层变量 $L$ 影响之后求处理效果。

---

## **章节要点总结**

- 随机化消除混杂，赋予结果因果意义。
- 交换性是识别平均因果效应的关键（均值交换性即可）。
- 条件随机化下只保证分层内交换性，需用标准化或IP加权获得总体效应。
- 标准化与逆概率加权本质等价，是现代因果推断分析核心。
- 做因果推断时，明确处理、结局、分层变量及其分布关系至关重要。
- 理想随机化实验很稀少，许多实际研究（如器官移植）因伦理、可行性等限制无法实施。

---

## **核心公式概览（中英文对照）**

**1. 平均处理效应/边际潜在结局：**
$$
\Pr[Y^a=1] = \sum_l \Pr[Y=1|L=l,A=a] \Pr[L=l]
$$
- (The marginal potential outcome risk is the weighted sum of stratum-specific observed risks.)

**2. 标准化风险比：**
$$
\text{Causal Risk Ratio} = \frac{\sum_l \Pr[Y=1|L=l,A=1]\Pr[L=l]}
{\sum_l \Pr[Y=1|L=l,A=0]\Pr[L=l]}
$$

**3. 逆概率加权均值（IPW）：**
$$
E\left[\frac{Y \cdot \mathbb{I}(A=a)}{\Pr(A=a|L)}\right]
$$
- (The IP-weighted estimator of the mean outcome under treatment $a$.)

**4. 交换性定义：**
$$
Y^a \perp\!\!\!\perp A \quad \text{(marginal)}
$$
$$
Y^a \perp\!\!\!\perp A \mid L \quad \text{(conditional)}
$$
- (Exchangeability: potential outcomes are independent of treatment (possibly conditioning on strata).)

**5. 权重定义：**
$$
W_A = \frac{1}{\Pr(A|L)}
$$
- (IP weights: inverse of the conditional probability of receiving the observed treatment given $L$.)

**6. Equivalence of Standardization and IPW:**
$$
\sum_l E[Y|A=a,L=l] Pr[L=l] = E\left[\frac{Y \cdot \mathbb{I}(A=a)}{\Pr(A=a|L)}\right]
$$
- (Under positivity and conditional exchangeability.)

-----

以上总结囊括了本章全部核心技术要点、重点，含所有重要公式，已尽可能完整准确。