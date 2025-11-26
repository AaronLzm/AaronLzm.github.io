---
date: 2025-09-17 11:19:05
title: Chapter_10
category: Causal inference
tags: [gpt-4.1,response_md]

---
# Chapter 10: Random Variability
## Overview
本章讨论了因果推断中系统性偏差与随机变异（抽样误差）的区别、如何量化与处理随机变异，以及当高维协变量存在时（所谓“维度灾难”）的难题，并对“超总体”概念及条件性原则进行了细致分析。同时，指出即使在随机实验中也不可忽略随机误差带来的不确定性，并说明标准置信区间仅反映随机误差，不涵盖系统性偏差。

---

## 10.1 Identification versus Estimation
**英文要点 / Key Points:**

- 前九章关注于在无限大研究人群下的因果效应“识别问题”(identification problem)，即只识别参数，不考虑样本误差。
    - 关键“可识别性条件”包括：交换性（exchangeability）、正性（positivity）、一致性（consistency）。
- 真实研究样本有限，必须考虑随机变异产生的估计误差与置信区间。
- 估计(super-population parameter, estimand)与估算(estimator, estimate)的定义如下：
    - 例如，观察A=a组中$Y=1$的比例 $\Pr[Y=1|A=a]$ 在超总体中的真值称为estimand，用样本比例 $\hat{p}$ 估计之。
- **一致性 estimator**: 样本量 $n \to \infty$ 时估计值会收敛到参数真值：

  $$\Pr\left(|\hat{\theta}_n - \theta(P)| > \epsilon\right) \to 0,\quad \forall \epsilon > 0.$$

- **Wald 95%置信区间**计算步骤：
    1. 估计标准误（如二项分布标准误：$\sqrt{\hat{p}(1-\hat{p})/n}$）。
    2. 区间为：$\hat{\theta} \pm 1.96 \times \text{SE}(\hat{\theta})$。
- 置信区间**频率解释**：重复抽样下约$95\%$包含真参数。一项研究的置信区间$[0.27,0.81]$，不能说真参数以$95\%$概率在此区间（它要么在要么不在）。
- 小样本置信区间（small-sample valid）和大样本置信区间（large-sample/asymptotic valid）区别。
- **Honest (uniform) confidence interval**: 存在某个$n$，使得，对所有真参数值，区间覆盖概率至少$95\%$（见 Fine Point 10.1）。

**中文要点：**

- 以往只讨论了找到因果效应的正确表达式（理论识别），没有估计现实中样本误差。
- 样本有限，估计会有随机波动，必须用置信区间量化不确定性。
- 比例的标准误为 $\sqrt{\hat{p}(1-\hat{p})/n}$，Wald区间为 $\hat{\theta} \pm 1.96 \cdot SE(\hat{\theta})$。
- 理论上的区间盖住真值的概率定义为长时期内的频率，而不是某一次实验的“概率”。
- 小样本区间与大样本区间的适用性。
- “诚实区间”：对任意参数值都保证覆盖概率 $\ge 95\%$，但最小$n$往往难以求出。

---

## 10.2 Estimation of Causal Effects
**英文要点：**

- 在理想条件下（样本于超总体中随机抽取，处理完全随机分派），样本比例无偏地估计超总体的因果效应。
- “因果风险差”可直接由关联风险差估计（$Pr[Y=1|A=1] - Pr[Y=1|A=0]$）推断。
- 若仅在样本内随机化，则样本中未必精确交换，增大样本量可减小分配不均概率。
- 两种推断目标：限于样本的随机化推断（randomization-based），或推广到超总体。
- Wald置信区间仅反映随机误差，不反映系统性偏差（见 Fine Point 10.2）。

**中文要点：**

- 在只有随机误差、没有系统偏差时，样本比例可无偏估计超总体风险，且可用标准方法计算置信区间。
- 真正的随机化实验也存在组间分配的不均等（非理想交换性），样本大时可减小。
- 推断目标可以是样本本身，也可以扩展至理论超总体。

---

## 10.3 The Myth of the Super-Population（超总体的神话）
**英文要点：**

- 超总体只是便于统计推断的假设，大多数研究中的个体并非真的从无限总体随机抽样而来。
- 报告二项分布下的置信区间等于假定样本源自无限超总体（Scenario 1）。
    - 若个体发生结局概率不同（$p_{a=1}^i$非相等），则样本分布不再是单一二项式，区间通常“保守”。
- 研究者报告二项置信区间，实则隐含采用Scenario 1。
    - 这种假设便于方法，也方便推论推广。

**中文要点：**

- 超总体概念只是一种便于统计推断的“假说”，实际很难完全满足。
- 采用“超总体”有方法简便与结论推广的好处，但真正适用性需谨慎评估。

---

## 10.4 The Conditionality Principle（条件性原则）
**英文要点及Technical Points：**

- 即使完全随机化，样本有限时治疗组与协变量（如吸烟）存在分布不均，导致混杂（confounding），需要调整。
- **条件性原则**：推断时应关于样本中实际观测到的辅助统计量（如L-A关联）进行条件化。
    - 具体例：若$A$与$L$在样本中相关，则需分层分析。即使整体无偏，但条件下未调整时是有偏的。
- 调整（stratification）后效应估计具有更小方差（更高效率）且无偏。
- Technical Point 10.2：似然函数可因变量、处理、协变量三部分分解，$A,L$为S-ancillary（辅助）统计量。
- Technical Point 10.3 & 10.4：对比调整后与不调整后风险差估计量的方差和偏倚，调整估计量$MLE$无条件和条件下都更高效。
- Technical Point 10.5：实际研究者绝大多数默认基于观测信息（条件推断），而不是期望信息（无条件推断）。

**中文要点：**

- 样本有限时，随机分组可能导致某些协变量在组间分布不均，产生混杂效应，需分层调整。
- 条件性原则（conditionality）主张应对观测到的辅助统计量做条件推断，能使调整后的估计量既无条件又条件上更高效。
- 绝大多数研究者实际采用了条件性原则（采用观测信息估计方差）。

---

## 10.5 The Curse of Dimensionality（维度灾难）
**英文要点：**

- 当有大量协变量（如100个二元协变量，$2^{100}$个层），分层调整后条件效应的置信区间会极其宽泛甚至无信息量（如$[-1,1]$），因为大样本理论假设已失效。
- 与之对比，不调整的边际估计器的置信区间倒未见加宽，但在存在混杂条件下是有偏的。
- 这说明在高维情景下条件性原则不再可行——实践上又有偏、又无信息。
- Technical Point 10.6：高维下条件推断无信息，但无条件推断（如边际估计器）只要$A \perp\!\!\!\perp L$，仍保持无偏/有效。
    - 但如何在保持无偏同时提高效率，需要更复杂方法（第18章介绍）。

**中文要点：**

- 高维（大量协变量）下，分层调整会导致数据稀疏，区间极宽，失去实际意义，边际方法虽有偏但区间不受影响。
- 维数灾难说明不能在所有情况下机械坚持条件性原则。

---

## 10.6 随机变异对因果发现（causal discovery）的影响
**英文要点：**

- 现实中，总是有限样本量，使得即使条件独立在样本中成立，也不能唯一识别因果结构。
- Robins等证明：即使经验上$Z \perp\!\!\!\perp Y|A$，有限样本下也可能是近乎而非严格独立，从而对应的平均因果效应其实为$0$，即识别为“假”因果。
- 因此：仅凭数据的“条件独立”并不能识别因果结构，必须依赖于外部领域知识（subject-matter knowledge）。

**中文要点：**

- 有限样本下经验条件独立不能可靠区分因果结构。
- 可靠的因果发现离不开领域知识的先验支持。

---

## 本章关键公式及术语 Key Formulas and Terms (LaTeX Format)

### 估计/估算（Estimation）:

#### 样本比例的标准误
$$
\text{SE}(\hat{p}) = \sqrt{\frac{\hat{p} (1-\hat{p})}{n}}
$$

#### Wald 95%置信区间
$$
\hat{\theta} \pm 1.96\ \times\ \text{SE}(\hat{\theta})
$$

#### 一致性（Consistency）
$$
\Pr\left(|\hat{\theta}_n - \theta(P)| > \epsilon\right) \to 0,\quad \forall \epsilon > 0
$$

#### 条件性原则下的似然分解
$$
\prod_{i=1}^n f(Y_i|L_i,A_i; sRD, p_0) \times f(A_i|L_i; \alpha) \times f(L_i; \rho)
$$

#### 标准化风险差
$$
\text{RD}_{std} = \sum_{l} \left[ \Pr(Y=1|L=l,A=1;\upsilon) - \Pr(Y=1|L=l, A=0;\upsilon) \right] f(l;\rho)
$$

#### 替换后无偏估计的方差比较
$$
\text{aVar}(\hat{\text{RD}}_{MLE}) = \text{aVar}(\hat{\text{RD}}_{UN}) - [\text{aCov}(bS, \hat{\text{RD}}_{UN})]^2
$$

---

## 结论与实践建议

### 英文总结
- **Systematic bias vs Random variability:** Causal inference is threatened both by systematic biases (confounding, selection, measurement bias) and by random variability (sampling error).
- **Confidence intervals** reflect only random error, not systematic error; their interpretation differs between frequentist and Bayesian perspectives.
- **Conditionality principle**: Adjustment should be made for covariate imbalance observed in the data, but in high dimensions, this may lead to uninformative results. Thus, it's not a universal principle.
- **Super-population** is a useful but often fictional construct—its assumptions should be explicit in reporting.
- **Causal discovery**: In finite samples, statistical independencies (or lack thereof) cannot unambiguously identify causal structure; strong subject-matter knowledge remains critical.

### 中文总结
- **因果推断受到系统性偏差和随机变异的双重挑战**。
- **置信区间仅描述抽样误差，不能替代对系统性偏差的不确定性的讨论**。
- **条件性原则有力但高维下或失效**，不应当成绝对原则机械执行。
- **超总体是方便统计推断的假设，实际推论需谨慎说明其适用性**。
- **因果发现依赖领域知识，单靠数据排序的条件独立不能唯一识别因果图结构**。

---

### 技术术语中英对译

- Estimand: 被估参数
- Estimator: 估计量
- Estimate: 估计值
- Consistency: 一致性
- Confidence interval: 置信区间
- Ancillary statistic: 辅助统计量
- Conditionality principle: 条件性原则
- Curse of dimensionality: 维度灾难
- Super-population: 超总体
- Systematic bias: 系统性偏差
- Random variability: 随机变异
- Stratification: 分层
- Compatibility interval: 兼容性区间
- Randomization-based inference: 基于随机化的推断

---

**References** (for original book readers): See Wasserman (2004), Casella and Berger (2002), Robins and Ritov (1997), Amrhein et al. (2019), Greenland (2019), Lash, Fox & Fink (2009), Robins et al. (2003).

---

**Note**: 上述内容兼顾了原文所有重点、技术点、细节说明和LaTeX标准公式表述。