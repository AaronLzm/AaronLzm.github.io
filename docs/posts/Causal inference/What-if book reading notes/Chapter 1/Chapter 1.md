---
title: Chapter 1
category: Causal inference
tags: [Chapter 1,What-if book reading notes]

---
### 第一章：因果效应的定义  

**核心目标**：形式化因果直觉的数学符号，区分关联（association）与因果（causation）。


---


#### 1.1 个体因果效应（Individual Causal Effects）  

**技术重点**：  

- **处理变量（Treatment Variable）**：二元变量 $A$（$A=1$：干预，$A=0$：未干预）。  

- **结局变量（Outcome Variable）**：二元变量 $Y$（$Y=1$：事件发生，$Y=0$：未发生）。  

- **潜在结果（Potential Outcomes）**：  

  - $Y^{a=1}$：个体接受干预（$a=1$）时的结局。  

  - $Y^{a=0}$：个体未接受干预（$a=0$）时的结局。  

- **个体因果效应定义**：  

  对个体 $i$，若 $Y^{a=1}_i \neq Y^{a=0}_i$，则干预 $A$ 对结局 $Y$ 有因果效应。  

  **公式**：  

  $$

  \text{Causal effect for individual } i: Y^{a=1}_i \neq Y^{a=0}_i

  $$  

- **一致性（Consistency）**：  

  若个体实际接受处理 $A=a$，则观测结局 $Y_i$ 等于其反事实结局 $Y^a_i$。  

  **公式**：  

  $$

  \text{If } A_i = a, \text{ then } Y_i = Y^a_i

  $$  

- **识别问题**：个体因果效应因缺失数据（仅一潜在结果可观测）不可识别。


---


#### 1.2 平均因果效应（Average Causal Effects）  

**技术重点**：  

- **定义**：在群体中比较干预 $a=1$ 与 $a=0$ 的期望结局差异。  

  **公式**：  

  $$

  \text{Average causal effect: } E[Y^{a=1}] \neq E[Y^{a=0}]

  $$  

- **风险（Risk）**：对二元结局，$E[Y^a] = \Pr(Y^a = 1)$。  

- **零假设**：若 $E[Y^{a=1}] = E[Y^{a=0}]$，则无平均因果效应（null hypothesis of no average causal effect）。  

- **个体效应与平均效应关系**：  

  - 平均效应为零 $\not\Rightarrow$ 个体效应为零（可能同时存在正负效应抵消）。  

  - **尖锐因果零假设（Sharp Causal Null）**：$Y^{a=1}_i = Y^{a=0}_i$ 对所有个体成立（蕴含平均效应为零）。  


**精细点（Fine Points）**：  

- **Fine Point 1.1: 干扰（Interference）**  

  - 假设个体 $i$ 的潜在结局 $Y^a_i$ 不受其他个体处理影响（SUTVA 的一部分）。  

  - 若存在干扰（如社交 contagion），需定义特定处理分配下的因果效应。  

- **Fine Point 1.2: 处理的多版本性（Multiple Versions of Treatment）**  

  - 假设处理 $A=a$ 仅单一版本（如心脏移植手术方式统一）。  

  - 若存在多版本（如不同外科医生），需指定版本（或假设“处理变异无关性”）。  

**技术点（Technical Point 1.1）**：  

- 群体因果效应可推广至非线性泛函（如方差、中位数、风险比）：  

  - 例如，方差因果效应：$\text{Var}(Y^{a=1}) - \text{Var}(Y^{a=0})$。  

  - 但 $\text{Var}(Y^{a=1} - Y^{a=0})$ 不可识别（因需协方差）。  


---


#### 1.3 因果效应度量（Measures of Causal Effect）  

**技术重点**：  

- **因果风险差（Causal Risk Difference, RD）**：  

  $$

  \text{RD} = \Pr(Y^{a=1}=1) - \Pr(Y^{a=0}=1)

  $$  

- **因果风险比（Causal Risk Ratio, RR）**：  

  $$

  \text{RR} = \frac{\Pr(Y^{a=1}=1)}{\Pr(Y^{a=0}=1)}

  $$  

- **因果比值比（Causal Odds Ratio, OR）**：  

  $$

  \text{OR} = \frac{\Pr(Y^{a=1}=1)/\Pr(Y^{a=1}=0)}{\Pr(Y^{a=0}=1)/\Pr(Y^{a=0}=0)}

  $$  

- **尺度选择**：  

  - 乘法尺度（RR）用于相对风险，加法尺度（RD）用于绝对病例数。  


**精细点（Fine Point 1.3）**：  

- **需治数（Number Needed to Treat, NNT）**：  

  - 定义：避免一例不良结局需治疗的平均人数。  

  **公式**：  

  $$

  \text{NNT} = \frac{-1}{\Pr(Y^{a=1}=1) - \Pr(Y^{a=0}=1)} \quad (\text{当 RD < 0})

  $$  


---


#### 1.4 随机变异（Random Variability）  

**技术重点**：  

- **随机误差来源**：  

  1. **抽样变异性（Sampling Variability）**：样本估计与超总体参数的差异。  

  2. **非确定性反事实（Nondeterministic Counterfactuals）**：潜在结局具随机性（如量子不确定性）。  

- **一致性估计**：样本比例 $\widehat{\Pr}(Y^a=1)$ 是 $\Pr(Y^a=1)$ 的一致估计量。  

- **简化假设**：第 10 章前假设反事实确定且样本覆盖整个超总体。  


**技术点（Technical Point 1.2）**：  

- 非确定性反事实下，$E[Y^a] = \int y  dF_{Y^a}(y)$，其中 $F_{Y^a}$ 是 $Y^a$ 的累积分布函数。  


---


#### 1.5 因果 vs. 关联（Causation versus Association）  

**技术重点**：  

- **关联（Association）**：基于实际观测数据的比较（条件概率）。  

  - 定义：$A$ 与 $Y$ 关联若 $E[Y \mid A=1] \neq E[Y \mid A=0]$。  

  - 度量：关联风险差 $\Pr(Y=1 \mid A=1) - \Pr(Y=1 \mid A=0)$ 等。  

- **因果（Causation）**：基于反事实的比较（边际概率）。  

  - 定义：$A$ 对 $Y$ 有因果效应若 $E[Y^{a=1}] \neq E[Y^{a=0}]$。  

- **关键区别**：  

  - 关联：比较实际处理组（$A=1$） vs. 未处理组（$A=0$）的子群体。  

  - 因果：比较同一群体在反事实处理（$a=1$） vs. 未处理（$a=0$）下的结局。  

- **混杂（Confounding）**：关联 $\neq$ 因果的常见原因（如 Zeus 案例中，移植组基线风险更高）。  

**核心结论**：  

- “关联不是因果”：实际数据（表 1.2）可计算关联，但因果推断需反事实数据（表 1.1）。  

- 随机实验是连接关联与因果的桥梁（第 2 章主题）。  


---


### 关键公式总结  

| **概念**               | **公式**                                  |

|------------------------|------------------------------------------|

| 个体因果效应           | $Y^{a=1}_i \neq Y^{a=0}_i$              |

| 一致性                 | $A_i = a \implies Y_i = Y^a_i$          |

| 平均因果效应           | $E[Y^{a=1}] \neq E[Y^{a=0}]$            |

| 因果风险差 (RD)        | $\Pr(Y^{a=1}=1) - \Pr(Y^{a=0}=1)$       |

| 因果风险比 (RR)        | $\frac{\Pr(Y^{a=1}=1)}{\Pr(Y^{a=0}=1)}$ |

| 需治数 (NNT)           | $\text{NNT} = \frac{-1}{\text{RD}}$     |

| 关联存在条件           | $E[Y \mid A=1] \neq E[Y \mid A=0]$      |