---
date: 2025-09-17 11:19:05
title: Chapter_1
category: Causal inference
tags: [gpt-4.1,response_md]

---
# Chapter 1: A Definition of Causal Effect
## 中英文精华总结与公式整理

本章旨在通过数学符号系统化我们对因果推断的直觉，构建全书因果推断的形式基础。以下内容涵盖全部重要结论、技术要点和细节注意点（Fine points）, 并提供中英文双语梳理，数学公式全部使用标准 $\LaTeX$ 格式书写，绝无遗漏。

---

## 1.1 Individual Causal Effects | 个体因果效应

**核心思想**  
- 所谓因果效应（causal effect），指对同一个体比较某行动（干预）$A$被采取与未被采取时结果$Y$的不同。
- “反事实结果” ($Y^{a=1}$, $Y^{a=0}$)：假设分别在$A=1$（接受处理）和$A=0$（不接受处理）时该个体的结果。

**形式定义 | Formal Definition**  
- 个体$i$的因果效应：  
  $$
  Y^{a=1}_i \neq Y^{a=0}_i
  $$  
- 若$Y^{a=1}_i = Y^{a=0}_i$，则对个体$i$无因果效应。

**一致性（Consistency）**  
- 定义：个体实际接受了$a$，则$Y^{a}_i = Y_{A_i} = Y_i$。

  $$
  \text{If } A_i = a, \text{ then } Y^{a}_i = Y_{A_i} = Y_i
  $$

**无法识别性 | Unidentifiability**  
- 单个体的因果效应通常无法凭观测数据推断，因为同一时刻只会观测到$Y^{a=1}$或$Y^{a=0}$中的一个。

---

## 1.2 Average Causal Effects | 平均因果效应

**需求**  
- 个体因果效应难以识别，转而考察整个人群的平均因果效应。

**定义 | Definition**  
- population平均因果效应：  
  $$
  E[Y^{a=1}] \neq E[Y^{a=0}]
  $$
  若两者相等，则称“无平均因果效应”（the causal null hypothesis）。

- 对于二值结果（如生死），$E[Y^{a=1}]$ 就是如果所有人都接受$a=1$时发生结果的概率。

**等价关系 | Equality**  
- 均值之差即个体因果效应的均值：
  $$
  E[Y^{a=1}] - E[Y^{a=0}] = E[Y^{a=1} - Y^{a=0}]
  $$

**结论 | Notes**  
- 个体存在因果效应≠平均效应存在。平均效应不存在时，可能有人被帮，有人被害（抵消）。
- “sharp causal null hypothesis”即全部个体都无因果效应。

---

### Fine Point 1.1: **Interference (干扰/干预互扰)**

- 假定$Y^{a}_i$仅和自己的处理有关，其他个体的干预不影响当前个体（即无干扰，SUTVA）。
- 若别人处理会影响$Y_i$，$Y^{a}_i$定义就要带上其他人的处理信息，如$Y^{a, a'}_i$。

---

### Fine Point 1.2: **Multiple Versions of Treatment (处理多版本)**

- 假定$a$只有一个“版本”。如“心脏移植”其实可能手术医生、工具、方法不同。
  - 若不同版本$a$导致不同结果，$Y^{a}_i$无明确定义。
- 假设“treatment variation irrelevance”，即不同版本效果一样时，$Y^a_i$才可定义。

---

## 1.3 Measures of Causal Effect | 因果效应的度量

**常见度量 | Common Measures**  

- 因果风险差（Causal Risk Difference）：
  $$
  \Delta_{\text{risk}} = P(Y^{a=1} = 1) - P(Y^{a=0} = 1)
  $$
- 因果风险比（Causal Risk Ratio）：
  $$
  RR = \frac{P(Y^{a=1} = 1)}{P(Y^{a=0} = 1)}
  $$
- 因果优势比（Causal Odds Ratio）：
  $$
  OR = \frac{P(Y^{a=1} = 1) / P(Y^{a=1} = 0)}{P(Y^{a=0} = 1) / P(Y^{a=0} = 0)}
  $$

- 若上述度量值等于$0$、$1$、$1$，则为因果零假设。

**Technical Point 1.1**  
- $E[Y^a]$为所有人在$a$下的平均结果。
- 离散型：
  $$
  E[Y^a] = \sum_y y p_{Y^a}(y);\quad \text{对称二值时} ~ E[Y^a] = P(Y^a=1)
  $$
- 连续型：
  $$
  E[Y^a] = \int y f_{Y^a}(y) dy = \int y dF_{Y^a}(y)
  $$

- 同样可定义作用于方差、分位数、风险等的“功能型因果效应”。
  例如方差效果：
  $$
  Var(Y^{a=1}) - Var(Y^{a=0})
  $$

- 但注意：
  $$
  Var(Y^{a=1}) - Var(Y^{a=0}) \neq Var(Y^{a=1} - Y^{a=0})
  $$

### Fine Point 1.3: Number Needed to Treat (NNT, 必须治疗的人次数以减少一例事件)

- 定义公式：
  $$
  NNT = -\frac{1}{P(Y^{a=1}=1) - P(Y^{a=0}=1)}
  $$
  - 若处理能减少风险，则NNT为正；反之定义number needed to harm。
---

## 1.4 Random Variability | 随机变异（随机误差）

**两个来源 | Two Sources**
1. **抽样变异 (Sampling variability)**  
   - 仅观察总体的一个子样本，样本内比例与母体有差异。
   - 用样本估计量$\hat{P}(Y^a=1)$近似总体$P(Y^a=1)$，随样本量$n\to\infty$是“一致的”。

2. **反事实结果本身具有随机性 (Nondeterministic counterfactuals)**
   - 个体$Y^a_i$并非固定值，而是概率分布。如“Zeus接受治疗有$90\%$概率死亡”。
   - 整体均值的定义推广为：
     $$
     E[Y^{a}] = E\left\{E[Y^a | \Theta_{Y^a}(\cdot)]\right\}
     $$
     $$
     = \int y dF_{Y^a}(y), \quad F_{Y^a}(\cdot) = E\left\{\Theta_{Y^a}(\cdot)\right\}
     $$
   - 风险比的个体效应加权汇总形式：
     $$
     \text{Causal Risk Ratio} = \frac{E[Q_{Y^{a=1}}(1)]}{E[Q_{Y^{a=0}}(1)]}
     $$
     也即：对个体比值做带权平均，权重$W = \frac{Q_{Y^{a=0}}(1)}{E[Q_{Y^{a=0}}(1)]}$。
---

## 1.5 Causation versus Association | 因果与关联之别

**现实数据与反事实数据**
- 实际中只观测到$Y$（在观测的$A$下的结果），即$Y=Y^A$。
- 结果分布通常仅能计算观测者群体中的风险：
  $$
  P(Y = 1|A = a)
  $$
- **关联/相关 (Association)**:  
  - 若$P(Y=1|A=1) \neq P(Y=1|A=0)$，即为有关联，记为$Y \not\!\perp\!\!\!\perp A$。
- **独立条件 | Independence:**
  $$
  \begin{align*}
  & (i)~ P(Y=1|A=1) - P(Y=1|A=0) = 0 \\
  & (ii)~ \frac{P(Y=1|A=1)}{P(Y=1|A=0)} = 1 \\
  & (iii)~ \frac{\frac{P(Y=1|A=1)}{P(Y=0|A=1)}}{\frac{P(Y=1|A=0)}{P(Y=0|A=0)}} = 1
  \end{align*}
  $$
- 对于二元结果：$P(Y=1|A=a)$也是期望$E[Y|A=a]$。

**本质差异 | Essential Distinction**  
- 因果效应比较的是**全体个体分别在$a=1$和$a=0$两种世界下的整体分布**；
- 关联只比较**实际接受$a=1$的人群与$a=0$的人群的分布**。

**图解**  
- 图1.1强调：  
  - 因果比较是“假设整个群体都接受$a=1$”、“都接受$a=0$”各自假想世界的比较，
  - 关联比较是观察真实世界中已经接受与未接受处理两个分组。

**混淆 | Confounding**  
- 如果高风险者更易接受处理，则实际观测关联可能与真实因果效应方向相反。
---

## 全章技术要点与细节回顾

### Technical Points
- $E[Y^a]$的求法在离散型和连续型变量中定义。
- 反事实分布下能定义多种效应（均值，方差，分位数，hazard等），但只有均值的“差的均值=均值的差”。
- 无法同时观测到任何个体的$Y^{a=1}$和$Y^{a=0}$。

### Fine Points  
1. **Interference**: $Y^a_i$无干扰、SUTVA。
2. **Multiple versions**: $a$的版本唯一性，否则需明确哪种。
3. **NNT**: 治疗多少人可减少1例不良事件。
---

## 章节核心框架尝试总结

| 概念      | 数学表达                                                         | 备注                   |
|-----------|------------------------------------------------------------------|------------------------|
| 个体因果效应  | $Y^{a=1}_i \neq Y^{a=0}_i$                                       | 只理论上可定义，无法识别        |
| 平均因果效应  | $E[Y^{a=1}]-E[Y^{a=0}]$                                          | 统称“因果效应”，可从数据估计   |
| 风险差      | $P(Y^{a=1}=1) - P(Y^{a=0}=1)$                                    | population level       |
| 风险比      | $\frac{P(Y^{a=1}=1)}{P(Y^{a=0}=1)}$                               | population level       |
| 优势比      | $\frac{P(Y^{a=1}=1)/P(Y^{a=1}=0)}{P(Y^{a=0}=1)/P(Y^{a=0}=0)}$      | population level       |
| NNT       | $-\frac{1}{P(Y^{a=1}=1)-P(Y^{a=0}=1)}$                             | 治疗所需样本人次        |
| 关联风险差  | $P(Y=1\mid A=1) - P(Y=1\mid A=0)$                                | observational measure  |
| 关联风险比  | $\frac{P(Y=1|A=1)}{P(Y=1|A=0)}$                                  | observational measure  |
| 关联独立    | $Y \perp\!\!\!\perp A$                                           | $P(Y|A)=P(Y)$          |

---

## 中文精髓速查

- **个体效应**：是“如果A，但如果不A”的结果差异。只对抽象有意义，现实无法获知。
- **平均效应**：全体人“假如都A”和“都不A”下结果均值的差。
- **因果与相关**：前者是$E[Y^{a=1}]$与$E[Y^{a=0}]$比较，后者是$E[Y|A=1]$与$E[Y|A=0]$比较。
- **风险差/比、优势比和NNT**：提供不同尺度的群体因果效应表现。
- **反事实与干预互扰、处理多版本问题**都影响反事实定义的合法性，在定义前需确认SUTVA和处理版本同质性。
- **风险估计的不确定性**来自采样误差和反事实的不确定性。
- **混淆**：现实中由于高风险人更可能接受处理，观测相关性不等于真实因果。

---

# 章节精要总结

> 本章以“反事实结果”系统定义个体与群体的因果效应，澄清了因果推断和相关分析的根本差异，明确了统计上各种因果度量的数学表达方式，同时指明了干扰、处理多版本等复杂实际情形对定义因果效应的影响，为全书后续方法论和实证分析打下了坚实的理论之基。