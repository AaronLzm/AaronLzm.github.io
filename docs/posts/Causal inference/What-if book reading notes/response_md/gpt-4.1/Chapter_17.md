---
date: 2025-09-17 11:19:05
title: Chapter_17
category: Causal inference
tags: [gpt-4.1,response_md]

---
# Chapter 17 总结 / Summary: CAUSAL SURVIVAL ANALYSIS（因果生存分析）

## 目录结构
- 17.1 Hazards and risks（风险与风险率）
- Fine Point 17.1 (Competing events, 竞争风险)
- 17.2 From hazards to risks（从风险到风险率、累计发病率）
- Fine Point 17.2 (Hazard ratio 的困境)
- Fine Point 17.3 (生存分析的统计模型)
- 17.3 Why censoring matters（删失的重要性）
- Technical Point 17.1（用logistic模型近似hazard ratio）
- 17.4 IP weighting of marginal structural models（边际结构模型的逆概率加权）
- 17.5 The parametric g-formula（参数g公式）
- 17.6 G-estimation of structural nested models（结构嵌套模型的g估计方法）
- Technical Point 17.2（结构CFT模型与CST模型）
- Technical Point 17.3（人工删失 Artificial censoring）

---

### 17.1 Hazards and Risks / 风险与风险率

- **关注点**：不仅关注某时间点的因果效应，也关注“发生事件所经历的时间”。
- **生存分析**适合调查随访期内随时可能出现的结果（死亡、婚姻等事件），但经常会遇到**删失**（censoring）：即观察期截止时事件还未发生，具体发生时间未知，叫**行政删失（administrative censoring）**。
- 在带有**分批入组/分批随访（staggered entry）**的研究中，每个人的最大可观察时间可能不同。
- 除行政删失，实际还会遇到**非行政删失**：比如随访失访或**竞争事件**（competing events, 竞争风险）影响结果真值的可观察性。

#### 竞争事件（Fine Point 17.1）

1. 将竞争事件当作删失：
   - 模拟所有竞争事件消失的理想化世界，估计难理解、可能有选择性偏倚。
2. 不当作删失：
   - 视为无法再发生感兴趣事件，估计既可能来自处理对事件本身的效应，也可能来自对死亡的直接效应，难以解释。
3. 用**复合事件**（composite event,如死亡+卒中）：
   - 本质改变了因果问题，估计仍难以解释。
4. 局限到**主层**（principal stratum）：只在对所有治疗都不死的人群中推断，本地平均效应，但解释/估计均复杂。
5. 无满意统一方案，“竞争风险”是生存分析领域的基本难题。

---

### 17.2 From hazards to risks / 从风险到风险率、累计发病率

- **生存概率（Survival Probability）**: $P(T > k)$，即到时间$k$尚未发生事件的人比例。
- **风险/累计发病率（Risk, Cumulative Incidence）**: $1 - P(T > k) = P(T \leq k)$。风险曲线随时间递增。
- **风险率（Hazard）**: $P(T = k \mid T > k-1)$，即“上个时间点没事，现在刚好事件发生”的条件概率（离散时间hazard）。
- 曲线可：
  - 比较两个处理组在各时刻的生存率/风险率
  - 生存曲线下方面积可给出**寿命损失年/受限平均生存时间**（Years of Life Lost/Restricted Mean Survival Time）。
- **hazard与risk不同**:
  - hazard分母随时间变小；risk分母为全部基线人群。
- 常用工具：**Kaplan-Meier**生存曲线为非参数估计。
- 可用logistic模型参数化hazard（$Pr[D_{k+1}=1|D_k=0, A]$）。
  - 例：$\logit P[D_{k+1}=1|D_k=0, A] = \theta_{0,k} + \theta_1 A + \theta_2 Ak + \theta_3 Ak^2$
  - 这样可以允许hazard ratio随时间变化。

#### Fine Point 17.2（Hazard ratios 的困境）

- 真实hazard ratio随时间变动，Cox回归等模型给出的常常是加权hazard ratio——解释困难。
- hazard ratio反直觉的例子：若处理杀死所有高风险个体，则幸存组变成低风险，hazard ratio会变小，但处理未必真的有益。
- 这是**因“活着”是后治疗变量（collider），导致选择性偏倚**。

#### Fine Point 17.3（生存模型归类）

- **非参数方法**：如Kaplan-Meier，不需对失访时间分布做假设。
- **参数方法**：如指数、Weibull分布。logistic模型也属于此类。
- **半参数方法**：如Cox比例风险模型与AFT（Accelerated Failure Time）模型，不对基线风险做分布假设，但限定变量与风险的关系。
---

### 17.3 Why Censoring Matters / 为何删失需特殊处理

- 在不同删失时间情况下，简单算“活着且未删失的人比例”会**低估生存率**。
- 正确的生存率应为“如果没有删失大家活到k+1的人概率”，即
  $$
  \prod_{m=1}^k P(D_m = 0 | D_{m-1} = 0, C_m = 0, A = a) \quad \text{for } k < k_{end}
  $$
- 若删失与处理完全无关（例如全靠入组时间差异且时间变量与结果无关），无需复杂方法，否则需要加权或调整基线变量。

#### Technical Point 17.1 (logistic模型与hazard近似)

- 若hazard很小时，$\logit P[D_{k+1}=1 | D_k=0, A] \approx \log\left(\frac{P[D_{k+1}=1 | D_k=0, A]}{1-P[D_{k+1}=1 | D_k=0, A]}\right) \approx \alpha_{0,k} + \alpha_1 A$。
- rule of thumb: 只要$P[D_{k+1}=1 | D_k=0, A] < 0.1$，logistic近似hazard良好。

---

### 17.4 IP Weighting of Marginal Structural Models / 边际结构模型的IP加权

#### **动因**
- 若处理组与对照组间存在混杂，直接比较生存曲线不具因果解释性。

#### **Counterfactual notation**
- $D_{a, c=0}^{k}$: “若所有人都接受$a$状态且无删失时，第$k$时刻死亡”指示变量。

#### **具体估计步骤**
1. **建立IP加权**
    - 稳定权(SW)：用logistic模型估计治疗概率$P(A = 1\mid L)$，构建加权后伪人群使得$L \perp A$。
      - 权值:
        - 治疗组: $SW = \frac{\hat{P}(A=1)}{\hat{P}(A=1 \mid L)}$
        - 对照组: $SW = \frac{1-\hat{P}(A=1)}{1-\hat{P}(A=1 \mid L)}$
2. **用加权后数据拟合生存hazard模型**:
    - 拟合加权logistic hazards模型，得到在$a=1$和$a=0$下的风险率。
    - 递乘迭代得生存率:
      $$
      \text{Estimate } Pr[D_{k+1}^a=0] = \prod_{m=0}^{k} Pr[D_{m+1}^a = 0|D_m^a=0]
      $$
- 有效性假设：**无混杂（可解释性）、阳性/支持性、一致性，且处理模型与hazard模型都无错设。**

---

### 17.5 The Parametric g-formula / 参数化g公式

- g公式是另一种调整混杂的估计生存率方法。
- 核心思想：**标准化**到协变量分布。
- 生存概率为：
  $$
  Pr[D_{k+1}^{a} = 0] = \sum_l Pr[D_{k+1} = 0 | L = l, A = a] Pr[L = l]
  $$
  或连续变量时为积分。
- 先拟合协变量L和治疗相关的hazard模型，算出各L层的条件生存率，再加权平均。
- g公式不要求SB权加权，但对条件hazard模型无错设有要求。
- IPW和g公式属于因果推断的“g方法家族”，在假设成立时结果应类似。

---

### 17.6 G-estimation of Structural Nested Models / 结构嵌套模型的g估计

- 结构嵌套模型是对**协变量特定的生存期因果效应**建模（如比率或差值），而不是估计每一个具体的“存活概率/风险率”。
- 例如，可以用**结构嵌套加速失效时间（AFT）模型**来建模处理对生存时间的比值效应：
  $$
  \frac{T_i^{a=1}}{T_i^{a=0}} = \exp(-\psi_1 a)
  $$
  - $\psi_1 < 0$ 代表延长存活时间，$\psi_1 > 0$ 代表缩短。
- 更一般的可以让协变量影响效应，如：
  $$
  \frac{T_i^a}{T_i^{a=0}} = \exp(-\psi_1 a - \psi_2 a L_i)
  $$
  即
  $$
  T_i^{a=0} = T_i^{a} \exp(\psi_1 a + \psi_2 aL_i)
  $$
- **g-估计的要点与困难**
  - 在无删失下估计容易（对$H_i(\psi^\dagger)=T_i \exp(\psi^\dagger A_i)$计入入$A=1$的logistic模型，找使$H$与$A$独立的$\psi$）。
  - 有删失时，若只用“未删失”个体会产生**选择偏倚**，需要**人工删失**(artificial censoring)。
      - 只纳入“无论何治疗均能观察到结果”的个体（Technical Point 17.3）。
      - 多参数模型可能无唯一解，实际很难应用。
- 尽管直觉上AFT模型更贴近生物学机制，因缺乏易用软件、算法难收敛，实际应用罕见。

---

## 主要公式与重点（含中英文）
#### 生存概率/Survival probability
- $Pr[T > k]$ ： 到$k$时存活概率
#### 风险/Risk (累计发病率)
- $Pr[T \leq k] = 1 - Pr[T > k]$ ：到$k$时累积发生比例
#### 风险率/Hazard
- $Pr[T = k | T > k-1]$ ：刚到$k$时的条件事件发生概率
#### 生存概率为递积形式
- $$
Pr[D_k = 0] = \prod_{m=1}^{k} Pr[D_m = 0 | D_{m-1} = 0]
$$
#### IPW条件下的hazard模型
- $$
\logit Pr[D_{k+1}^a = 0 | D_k^a = 0] = \beta_{0, k} + \beta_1 a + \beta_2 a k + \beta_3 a k^2
$$
#### 参数g公式（标准化估计）
- $$
Pr[D_{k+1}^a = 0] = \sum_{l} Pr[D_{k+1} = 0 | L = l, A = a] Pr[L = l]
$$
#### 结构嵌套AFT模型
- $$
\frac{T_i^{a=1}}{T_i^{a=0}} = \exp(-\psi_1 a), \quad \text{or} \quad
T_i^{a=0} = T_i^{a} \exp(\psi_1 a + \psi_2 aL_i)
$$
#### 结构嵌套风险/生存比模型（Technical Point 17.2）
- CFT model:
  $$
  \frac{Pr[D_k^a = 1 | L, A]}{Pr[D_k^{a=0} = 1 | L, A]} = \exp[\gamma_k(L, A; \psi)]
  $$
- CST model:
  $$
  \frac{Pr[D_k^a = 0 | L, A]}{Pr[D_k^{a=0} = 0 | L, A]} = \exp[\gamma_k(L, A; \psi)]
  $$

#### Logistic与hazard ratio的近似
- 若事件稀有，
  $$
  \logit Pr[D_{k+1} = 1 | D_k = 0, A] \approx \alpha_{0, k} + \alpha_1 A
  $$

---

## 中文精要/Chinese Key Points
1. 生存分析研究如何处理删失与风险/风险率，强调必须正确应对删失带来的偏倚（删失不是简单的“数据缺失”）。
2. 竞争风险不能依赖单一方法处理，常见分析都引入难以解释的新假设或问题。
3. 推荐用生存率、风险等易理解的效应量，而不直接解释hazard ratio。
4. 生存期因果推断可用三大g方法族（IPW, g-formula, g估计），各有参数模型设定的稳健性/易用性权衡。
5. 结构嵌套AFT模型理论合理但实际操作复杂。

---

## 技术难点/Fine and Technical Points

1. **如何处理竞争事件**
2. **hazard ratio的偏倚与诠释陷阱**
3. **正确估计生存率必须考虑删失机制与其与处理/协变量间的独立关系**
4. **IP加权和g公式均属于可辨识边际生存曲线的有效方法**
5. **结构嵌套模型遇到的难点：人工删失、解的唯一性、实际应用难**
6. **各种方法对模型设定的依赖程度不同，需根据应用场景选择**

---

> 以上整理涵盖了该章节全部大要、技术点、易错点与实用建议，包含了全部核心公式，适合Causal Inference和生存分析初学者及进阶者系统掌握。