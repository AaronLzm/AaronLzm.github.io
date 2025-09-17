---
title: Chapter_4
category: Causal inference
tags: [gpt-4.1,response_md]

---
# Chapter 4：Effect Modification（效应修饰）

本章核心观点在于：**因果效应通常因亚群体而异，平均因果效应（Average Causal Effect, ACE）不是单一的、普适的数值，其大小和方向取决于具体人群的构成和特性（即效应修饰因子）**。本章还讨论了识别和量化这类异质性所需的方法、技术细节，以及效应修饰对推理和政策应用的意义。

---

## 主要内容梳理

---

### 4.1 Heterogeneity of treatment effects（处理效应的异质性）

- 整体人口中的平均因果效应可能为零，但在特定子集（如分性别人群）中，效应大小和方向可以完全不同。
- 例子：“心脏移植对死亡率”的平均因果效应（全体为零），但女性中有害（危险度差>0）、男性中有益（危险度差<0），仅在整体两性各占一半时"抵消"。
- **结论1**：效应修饰（effect modification）即某变量$V$导致$A$对$Y$的平均因果效应在其水平上变化。

#### 公式：
- **Additive Effect Modification / 加性效应修饰**: 

  $$
  E[Y^{a=1} - Y^{a=0} | V=1] \neq E[Y^{a=1} - Y^{a=0} | V=0]
  $$
- **Multiplicative Effect Modification / 乘性效应修饰**:

  $$
  \frac{E[Y^{a=1} | V=1]}{E[Y^{a=0} | V=1]} \neq \frac{E[Y^{a=1} | V=0]}{E[Y^{a=0} | V=0]}
  $$

- 效应修饰取决于选择的效应度量：有时加性有修饰无（差值），乘性有修饰（比值/比率）。
- **Qualitative effect modification / 定性效应修饰**：亚组效应方向相反（如前例），同/异量性修饰（非定性）下方向一致但幅度不同。

---

### 4.2 Stratification to identify effect modification（分层分析识别效应修饰）

- 分层计算各$V$水平的$A$对$Y$的效果，判断是否有修饰。
- 在理想随机试验下，分层后观测关联即为因果效应：

  $$
  Pr[Y^{a=1} = 1|V=v] - Pr[Y^{a=0} = 1|V=v] = Pr[Y=1|A=1, V=v] - Pr[Y=1|A=0, V=v]
  $$

- 非理想/观测性研究下，需考虑混杂（需对$L$做条件化/调整）。
- **两步法**：先按修饰因子$V$分层，再对混杂因子$L$标准化或IP加权。

#### 细节点：
- 加性和乘性两种效应修饰，需要具体选择度量，不同度量下修饰可能不同。
- 分层可识别修饰，但不能得个体特异效应。

#### 重要公式：
- 对比组（如受试者群/未受试者群）内因果效应计算：

  $$
  Pr[Y^{a=1} = 1|A=1] - Pr[Y^{a=0} = 1|A=1]
  $$
  $$
  SMR = \frac{Pr[Y=1|A=1]}{Pr[Y^{a=0}=1|A=1]}
  $$

---

### 4.3 Why care about effect modification?（为何关注效应修饰）

- 平均效应随修饰因子分布变化而变化（交通性/可外推性问题）。
- 在不同人群，若效应修饰因子比例不同，平均效应会变化。
- 分层报告的条件效应比全人群平均效应更具有可外推性，但仍不能保证。
- 确认修饰因子利于决定“谁会从干预中获益最多”，有助精准医疗/公共卫生政策。
- 指导如何直观报告（如应报告具体人群下的绝对效应$Pr[Y^{a=1} = 1 | V=v]$, $Pr[Y^{a=0} = 1 | V=v]$胜过只报比值/差值）。

---

### 4.4 Stratification as a form of adjustment（分层也是一种调整）

- 调整（adjustment）是对混杂做因果推断的保证。
- 分层通常用于探索修饰，但也常用来调整混杂（与标准化、IP加权等等价）。
- 分层后获得的是条件效应（conditional effect），对全体平均效应需再汇总或标准化。

#### 关键公式：
- 条件效应：
  $$
  Pr[Y^{a} = 1 | L=l] = Pr[Y = 1 | A=a, L=l]
  $$
- 若分层变量$L$很高维，则每层样本变少——> 现实中可能采用回归模型吸收（下一章节）。

---

### 4.5 Matching as another form of adjustment（匹配法）

- 匹配（matching）构造样本，使$L$分布在$A=1$和$A=0$组中一致，从而去除混杂。
- 匹配后的子集里，受试和未受试者之间$L$的分布一样，推断换为"无条件"因果效应。
- 匹配只能获得条件于被选人群（如未受试组）的平均处理效应，而不是全体。
- 频数匹配、个体匹配，多对一等模式。
- 匹配避免了某些层阳性性（positivity）问题（剔除无交集层）。

---

### 4.6 Effect modification and adjustment methods（效应修饰和调整方法）

- **四类调整方法**
  - 标准化（standardization）——可算全体平均或分层条件效应
  - IP加权（Inverse Probability Weighting, IP weighting）——实质和标准化相通
  - 分层/限制（stratification/restriction）——只能得层内条件效应
  - 匹配（matching）——特定子集（如未处理者）的条件效应
- **效应修饰不存在时，所有效应度量对齐；一旦存在修饰，度量值各异，每种方法有其"目标人群"。**
- 明确：不同方法回答的因果问题不同，并不是方法优劣，是科学问题定义不同。

#### 公式和技术细节
- **技术点1**：计算受试者群的反事实均值（标准化/IP加权）

  $$
  E[Y^a | A=a'] = \sum_{l} E[Y|A=a, L=l] Pr[L = l | A = a']
  $$

  或

  $$
  E\left[\frac{\mathbb{I}(A=a)Y}{f(A|L)} Pr[A=a'|L] \right] / E\left[\frac{\mathbb{I}(A=a)}{f(A|L)} Pr[A=a'|L] \right]
  $$

- **技术点2**：如何将各层效应合并（如Mantel-Haenszel、Woolf等加权平均）；若真有修饰，不宜合并。
- **技术点3**：边际和条件风险比关系

  $$
  RR_{marginal} = \sum_{l} RR_{conditional}(l) \cdot w(l)
  $$
  其中 $w(l) = \frac{Pr[Y^{a=0}=1|L=l]\cdot Pr[L=l]}{Pr[Y^{a=0}=1]}$
  - $
  RR_{marginal} < 1
  $
  当且仅当
  $
  \frac{Pr[Y^{a=0}=1|L=1]}{Pr[Y^{a=0}=1|L=0]} > 2 \frac{Pr[L=0]}{Pr[L=1]}
  $

---

### Fine Points & Technical Points（细节/技术要点）

- **Fine Point 4.1**：
  - “受试者群中的效应”定义：$Pr[Y^{a=1}=1|A=1] \neq Pr[Y^{a=0}=1 | A=1]$
  - 计算方式、与总体效应区别，以及SMR（标准化发病率比）等
- **Fine Point 4.2**：
  - 可外推性（transportability）受下列因素影响：
    1. 修饰因子分布；
    2. 处理措施的不同版本分布；
    3. 干预间的相互作用（interference）。
  - 在目标人群“再加权”法（如各亚组效应加权）。
  - 未测修饰因子或干预版本差异会导致外推失败。
- **Fine Point 4.3**：
  - Collapsibility（可折叠性）：风险差/风险比可折叠，odds ratio（OR）不可。不等式成立条件、直观含义、与Jensen不等式关系。
  - OR在总体可小于任意亚组OR（即OR可走出子集边界，风险比则不会）。

---

## 小结总结

- **定义**：
  - 效应修饰是指某变量$V$使得$A$对$Y$的平均因果效应在$V$的不同水平上不同。
  - 分层分析和加权标准化、匹配为识别和量化效应修饰的主要方法。
- **重点**：
  - 必须明确“效应针对谁（哪一人群、何种定义）”，不同方法回答的问题不同，不代表谁对谁错。
  - 报告时关注各亚群体的绝对风险，效应因群体构成不同而变化（交通性问题）。
  - 匹配和分层获得条件效应, 标准化/IP加权可获得目标人群的边际效应。
  - 非可折叠性导致OR并不用作因果推断参数。
  - 差异和异质性信息有助于精准干预与政策制定。

---

## 英文和中文对照本章关键结论

### 定义（Definition）

- **Effect Modification (Effektmodifikation, 效应修饰)**:
  - EN: A covariate $V$ is termed an *effect modifier* if the average causal effect of $A$ on $Y$ varies across the levels of $V$.
  - CN: 若因变量$V$使得$A$对$Y$的平均因果效应在$V$的各水平上不同，则称$V$是效应修饰因子。

### 加性（Additive）与乘性（Multiplicative）修饰

- **EN**:
  - Additive: $E[Y^{a=1} - Y^{a=0} | V=1] \neq E[Y^{a=1} - Y^{a=0} | V=0]$
  - Multiplicative: $\frac{E[Y^{a=1}|V=1]}{E[Y^{a=0}|V=1]} \neq \frac{E[Y^{a=1}|V=0]}{E[Y^{a=0}|V=0]}$
- **CN**:
  - 加性：$E[Y^{a=1} - Y^{a=0} | V=1] \neq E[Y^{a=1} - Y^{a=0} | V=0]$
  - 乘性：$\frac{E[Y^{a=1}|V=1]}{E[Y^{a=0}|V=1]} \neq \frac{E[Y^{a=1}|V=0]}{E[Y^{a=0}|V=0]}$

### 调整（Adjustment）与效应修饰的关系

- **EN**: Stratification, standardization, IP weighting, and matching are analytical tools to deal with confounding and effect modification, and they estimate effects in different target populations or subsets.
- **CN**: 分层、标准化、IP加权、匹配可用于混杂控制与效应修饰分析，但它们针对的目标人群或子集不同。

### Collapsibility & Odds Ratio

- **EN**:
  - The risk ratio and risk difference are collapsible; the odds ratio is not.
  - When there is no effect modification, marginal and conditional risk ratios coincide, but for odds ratios, the marginal can lie outside the range of stratum-specific.
- **CN**:
  - 风险比和风险差可折叠，OR不可；即总体OR可能小于任何分层OR，风险比不会。
  - 若无修饰，风险比无论在哪一群体皆相同，OR则不然。

---

## 一句话总结：

**因果效应不是一个群体特定的常数，而取决于“谁在其中”以及“用哪种度量衡量”，因此效应修饰的识别和解读是所有因果推断的前提和核心。**

---

## 常用公式总览一览表

| 效应类型                | 英文                | 中文                     | 公式                                    |
|---------------------|-------------------|------------------------|-----------------------------------------|
| 平均加性因果效应        | Average Causal Effect | 平均加性因果效应              | $E[Y^{a=1} - Y^{a=0}]$                  |
| 层内加性效应            | Additive Effect Modification   | 加性效应修饰                   | $E[Y^{a=1} - Y^{a=0}|V=v]$              |
| 层内风险比              | Stratum-specific Risk Ratio   | 层内风险比                     | $\frac{E[Y^{a=1}|V=v]}{E[Y^{a=0}|V=v]}$ |
| 受试/未受试群体效应      | Effect in the Treated | 受试群体中的效应                 | $Pr[Y=1|A=1] - Pr[Y^{a=0}=1|A=1]$       |
| SMR                   | Standardized Mortality Ratio | 标准化发病率比                     | $SMR = \frac{Pr[Y=1|A=1]}{Pr[Y^{a=0}=1|A=1]}$ |
| 标准化（合并）/权重      | Standardization/IP weighting | 标准化/IP加权                       | $E[Y^a] = \sum_l E[Y|A=a, L=l] Pr[L=l]$ |
| 合并风险比              | Marginal/Weighted Risk Ratio | 合并风险比                           | $RR_{marginal} = \sum_l RR(l) w(l)$      |
| OR与不可折叠性           | Odds Ratio Non-collapsibility | OR的不可折叠性                        | 详见Fine Point 4.3                     |

---

如有特定小节、例子或公式需更详细释义，请随时告知！