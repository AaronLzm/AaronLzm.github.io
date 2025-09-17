---
title: Chapter_22
category: Causal inference
tags: [gpt-4.1,response_md]

---
# Chapter 22 Summary: Target Trial Emulation

**（中英双语总结及所有重点，涵盖 technical/fine points，全数学公式以标准 LaTeX ($...$) 格式）**

---

## Core Concepts (核心概念)

- **Target Trial Emulation (目标试验的模拟)**：将从观测性数据得出的因果推断视为在尝试模拟一个假设的随机对照试验（target trial）。这一章节对现实中持续性治疗策略(sustained treatment strategies)的目标试验进行了推广，并提出了一个统一的因果推断框架。
- **Causal Effect Types (因果效应类型)**：聚焦于意向性治疗效应（Intention-to-Treat, ITT）和遵循方案效应（Per-Protocol, PP），并介绍了这些效应在观测数据下的模拟方法。

---

## 22.1 Intention-to-Treat Effect and Per-Protocol Effect
### Definitions and Formulae

**(1) Intention-to-Treat (ITT) Effect 意向性治疗效应：**

- 定义：基于最初的分组分配（不管后续是否严格依从）所产生的效应。
- 通常在随机分组 $Z$ 下无混杂（exchangeability: $Y^z \perp\!\!\!\perp Z$）。
- 公式：  
  $$
  \text{ITT风险比} = \frac{\Pr[Y=1|Z=1]}{\Pr[Y=1|Z=0]} = \frac{\Pr[Y^{z=1}=1]}{\Pr[Y^{z=0}=1]}
  $$
  - $Z$：分配的治疗（assigned treatment）。
  - $Y$：结局（outcome）。

**(2) Per-Protocol (PP) Effect 遵循方案效应：**

- 定义：若所有受试者都严格遵照分配的治疗策略，所观察到的效应。  
- 需假设“协议下的完全依从”并可能存在混杂（$A \leftarrow U \rightarrow Y$会引入混杂）。
- 公式：
  $$
  \text{PP风险比} = \frac{\Pr[Y^{a=1}=1]}{\Pr[Y^{a=0}=1]}
  $$
  - 亦可写作比对不同治疗-依从组合的反事实风险 $\Pr[Y^{z=1,a=1}=1]$ vs. $\Pr[Y^{z=0,a=0}=1]$，但在排除限制(exclusion restriction)下可简写为上式。

#### 中英文标准表达
- **ITT** measures the effect of assignment, not receipt of treatment.
  - ITT衡量的是“分配意图”而不是“实际接受治疗”的效应。
- **PP** reflects the effect if everyone strictly followed protocol.
  - PP衡量的是所有人都严格依照协议时的真实效应。

---

### Technical & Fine Points

#### Fine Point 22.1 — Exclusion Restriction (排除限制)
- 如果分组直接影响结局($Z\rightarrow Y$不是通过$A$间接作用)，则“排除限制”不成立。
- 仅在“双盲、安慰剂对照”实验可确保排除限制。
- 没有排除限制时，ITT和PP之间不等价。

#### Fine Point 22.2 — Pseudo/Modified ITT 分析
- 只纳入部分随机分组对象（如剔除失访者，或仅纳入实际启动治疗者）的分析为pseudo-ITT或modified-ITT，可能会产生偏倚。
- 若有失访或删失，估算ITT效应需调整选择偏倚（如g方法，IPW等）。
  
#### Fine Point 22.3 — Naive Per-Protocol/As-treated 分析
- 单纯比较“实际服药”与“实际未服药”者（as-treated）或者仅限协议严格执行者（per-protocol population）将导致混杂。
- 需要对混杂因子进行调整（如调整所有使 $A\rightarrow Y$之间存在后门路径的 $L$）。

#### Fine Point 22.4 — 关于ITT的误解
- ITT效应不总是实际效用/现实效益的代表，也不总是保守/下界，特别是在高度非依从、非单调性效应或对照为主动治疗的设计中。
- 在安全性评估或损害性评估中，ITT效应“接近于零”反而可能误导。

---

## 22.2 Target Trials with Sustained Treatment Strategies
### Sustained Strategies (持续性策略)
- 真正的目标试验应设计为与临床实际一致（非盲法、无安慰剂、非强化监控）。
- PP效应常描述为：
  $$
  \Pr[D^{g_1,\bar{c}_k = \bar{0}}_k = 1] - \Pr[D^{g_0,\bar{c}_k = \bar{0}}_k = 1]
  $$
  - $g_1, g_0$为不同的治疗策略（如“一直治疗”vs.“从不治疗”）。
  - $D_k$表示$k$时刻是否发生死亡，$\bar{c}_k=\bar{0}$表示至$k$时未删失。

### Dynamic Strategies (动态策略)
- 完美协议通常考虑实际医疗情境（如因毒性/禁忌停止治疗，不能视为违背协议，而是协议内合理调整）

### Technical Point 22.1/22.2 — Controlled/Pure/Principal Stratum Direct Effects

- **Controlled Direct Effect**：设定中介M为特定值，比较 $E[Y^{a=1, m}] - E[Y^{a=0, m}]$ for $m=0,1$。
- **Pure/Natural Direct Effect**：$E[Y^{a=1, M^{a=0}}] - E[Y^{a=0, M^{a=0}}]$，无法通过实际实验或标准FFRCISTG模型识别。
- **Principal Stratum Direct Effect**：针对$M^{a=0} = M^{a=1} = m$分层，考察 $E[Y^{a=1}|M^{a=0}=M^{a=1}=m] - E[Y^{a=0}|M^{a=0}=M^{a=1}=m]$

---

## 22.3 Emulating a Target Trial with Observational Data
- 制定“目标试验”协议明确以下要素：入选标准、随访起止点、治疗策略、结局指标、因果对比、分析计划。
- 观测数据中的ITT模拟通常是“治疗启动者(initiators)”比较，类似modified-ITT。
- PP模拟则需基于观测数据实际反映的策略，且需注意对非完全服从、失访等引入的时间变混杂/选择偏倚调整。

---

## 22.4 Time Zero (起始时点的重要性)
- 随访起点（time zero）：必须和目标试验的一致，否则会引入难以解释的选择偏倚。
- 对于入选标准可多次满足的情况（如电子病历数据），可通过多序列目标试验（sequential emulation）或克隆-删失-加权(cloning-censoring-weighting)方法解决。
- 克隆方案处理“宽限期(grace period)”下同一对象可暂时归属多种策略的局面。

---

## 22.5 Unified Framework (统一框架)

- 目标试验模拟整合了**反事实框架**和**因果图方法**，并要求以清晰、具体的反事实问题为核心。
- 真正的、准确的因果推断应在目标试验的框架下，随机与观测数据分析原则一致。
- 只有三点区分随机实验数据与观测数据：
    1. 是否有基线混杂
    2. 是否知道分组概率
    3. 是否知道各个对象的分配（不影响PP分析）
- PP分析在随机对照试验和观测研究中都需g-methods调整。
- 有些情况下（见Fine Point 22.7/8），受严重混杂影响的观测研究反倒揭示了现实中最佳的决策策略，而RCT未能观测到全部效果修饰因素，也无法实现最优策略。

---

## 关键公式与方法

### ITT与PP标准表述
> - ITT风险比  
$$
\frac{\Pr[Y=1|Z=1]}{\Pr[Y=1|Z=0]} = \frac{\Pr[Y^{z=1}=1]}{\Pr[Y^{z=0}=1]}
$$
> - PP风险比  
$$
\frac{\Pr[Y^{a=1}=1]}{\Pr[Y^{a=0}=1]}
$$
> - 多时点持续策略下  
$$
\text{ITT}_k = \Pr [D_{z=1, \bar{c}_k = \bar{0}} = 1] - \Pr [D_{z=0, \bar{c}_k = \bar{0}} = 1]
$$
$$
\text{PP}_k = \Pr [D_{g_1,\bar{c}_k = \bar{0}} = 1] - \Pr [D_{g_0, \bar{c}_k = \bar{0}} = 1]
$$

---

## 总结
**目标试验模拟法是强有力的桥梁，将随机实验与观测数据的因果推断标准统一。准确设定目标试验协议，并通过g-methods等方法校正时间变混杂或选择偏倚，是获得正确因果结论的核心。ITT/PP效应在实际分析时应明确其含义和适用范围，避免Naive分析误区，警惕选择性偏见及对于效益/安全/实际决策的误读。**

---

## 英文精要观点

- ITT measures the effect of "assignment" regardless of adherence; PP measures the effect if everyone adheres.
- Naive per-protocol or as-treated analyses can be heavily confounded; proper adjustment (e.g., g-methods) is necessary.
- The correct time zero and treatment strategy definitions are crucial; mistakes lead to bias.
- In modern settings, differences between RCTs and observational studies are mostly in baseline confounding; all other issues (protocol adherence, time-varying confounding) require unified analysis.
- Sometimes, even well-conducted RCTs may yield less useful answers than observational studies, especially with crucial unmeasured effect modifiers.

---

## 必须记住的技术点

- **ITT适用性**：不能作为所有实际效益的唯一依据，尤其是高度非依从或评价损害时。
- **PP估算**需要处理混杂、选择偏倚，且须考虑动态数据和失访。
- **Time zero选择**错误会造成严重偏倚。
- **克隆-删失-加权法**是模拟动态策略/宽限期分析有效解决方案。
- 目标试验框架及g-methods可以实现跨领域、跨样本来源的因果推断标准化。

---

**建议：在开展所有因果推断分析前，明确模拟目标试验协议及其所有核心要素，选择正确分析方法（尤其在有时间变混杂/遵从性不足的复杂现实中尤为关键）。**