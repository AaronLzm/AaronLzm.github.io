---
date: 2025-09-17 11:19:05
title: Chapter 1
category: Causal inference
tags: [Chapter 1,What-if book reading notes]

---

### 第一章：因果效应的定义

**核心目标**：形式化因果直觉的数学符号，区分**关联 (Association)** 与 **因果 (Causation)**。

---

#### 1.1 个体因果效应 (Individual Causal Effects)

**技术重点**：

- **处理变量 (Treatment Variable)**：二元变量 $A$（$A=1$：干预，$A=0$：未干预）。
- **结局变量 (Outcome Variable)**：二元变量 $Y$（$Y=1$：事件发生，$Y=0$：未发生）。
- **潜在结果 (Potential Outcomes)**：
  - $Y^{a=1}$：个体接受干预（$a=1$）时的结局。
  - $Y^{a=0}$：个体未接受干预（$a=0$）时的结局。

- **个体因果效应定义**：
  对个体 $i$，若 $Y^{a=1}_i \neq Y^{a=0}_i$，则干预 $A$ 对结局 $Y$ 有因果效应。
  
  **公式**：
  $$
  Y^{a=1}_i \neq Y^{a=0}_i
  $$

- **一致性 (Consistency)**：
  若个体实际接受处理 $A=a$，则观测结局 $Y_i$ 等于其反事实结局 $Y^a_i$。
  
  **公式**：
  $$
  \text{If } A_i = a, \text{ then } Y_i = Y^a_i
  $$

- **识别问题**：由于**因果推断的根本问题 (Fundamental Problem of Causal Inference)**，即任何个体只能观测到一个潜在结果，个体因果效应通常不可识别。

---

#### 1.2 平均因果效应 (Average Causal Effects)

**技术重点**：

- **定义**：在群体中比较干预 $a=1$ 与 $a=0$ 的期望结局差异。
  
  **公式**：
  $$
  E[Y^{a=1}] \neq E[Y^{a=0}]
  $$

- **零假设**：若 $E[Y^{a=1}] = E[Y^{a=0}]$，则无平均因果效应 (Null hypothesis of no average causal effect)。
- **尖锐因果零假设 (Sharp Causal Null)**：$Y^{a=1}_i = Y^{a=0}_i$ 对所有个体成立（蕴含平均效应为零，反之不成立）。

**SUTVA (Stable Unit Treatment Value Assumption)**：
隐含在 Fine Points 中，包含以下两个假设：
1.  **无干扰 (No Interference)**：个体 $i$ 的潜在结局不受其他个体处理分配的影响。
2.  **处理的一致性/无多版本 (Consistency / No Hidden Variations)**：处理 $A=a$ 只有单一版本，或不同版本的处理对结局影响相同。

---

#### 1.3 因果效应度量 (Measures of Causal Effect)

**技术重点**：

- **因果风险差 (Causal Risk Difference, RD)**：
  $$
  \text{RD} = \Pr(Y^{a=1}=1) - \Pr(Y^{a=0}=1)
  $$

- **因果风险比 (Causal Risk Ratio, RR)**：
  $$
  \text{RR} = \frac{\Pr(Y^{a=1}=1)}{\Pr(Y^{a=0}=1)}
  $$

- **因果比值比 (Causal Odds Ratio, OR)**：
  $$
  \text{OR} = \frac{\Pr(Y^{a=1}=1)/\Pr(Y^{a=1}=0)}{\Pr(Y^{a=0}=1)/\Pr(Y^{a=0}=0)}
  $$

**需治数 (Number Needed to Treat, NNT)**：
避免一例不良结局需治疗的平均人数。

$$
\text{NNT} = \frac{-1}{\text{RD}} \quad (\text{for } \text{RD} < 0)
$$

---

#### 1.4 随机变异 (Random Variability)

**技术重点**：

- **误差来源**：
  1.  **抽样变异性**：样本 vs. 超总体。
  2.  **非确定性反事实**：潜在结局本身具有随机性（Stochastic counterfactuals）。

- **注意**：在第 10 章之前，本书主要关注系统性偏差（Systematic Bias），暂时忽略随机误差，假设样本足够大。

---

#### 1.5 因果 vs. 关联 (Causation versus Association)

**核心区别**：

- **关联 (Association)**：观测数据的条件概率比较。
  $$
  E[Y \mid A=1] \neq E[Y \mid A=0]
  $$
  *比较的是不同的人群（实际接受治疗者 vs. 实际未接受者）。*

- **因果 (Causation)**：反事实的边际概率比较。
  $$
  E[Y^{a=1}] \neq E[Y^{a=0}]
  $$
  *比较的是同一人群在不同平行世界下的结局。*

- **结论**：“关联不是因果”。除非在理想的随机实验中（满足可交换性），否则关联指标通常不等于因果指标。

---

### 关键公式总结

| **概念** | **公式** |
| :--- | :--- |
| 个体因果效应 | $Y^{a=1}_i \neq Y^{a=0}_i$ |
| 一致性 | $A_i = a \implies Y_i = Y^a_i$ |
| 平均因果效应 | $E[Y^{a=1}] \neq E[Y^{a=0}]$ |
| 因果风险差 (RD) | $\Pr(Y^{a=1}=1) - \Pr(Y^{a=0}=1)$ |
| 因果风险比 (RR) | $\frac{\Pr(Y^{a=1}=1)}{\Pr(Y^{a=0}=1)}$ |
| 关联存在条件 | $E[Y \mid A=1] \neq E[Y \mid A=0]$ |