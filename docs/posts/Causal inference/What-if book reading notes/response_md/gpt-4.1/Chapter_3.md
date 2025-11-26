---
date: 2025-09-17 11:19:05
title: Chapter_3
category: Causal inference
tags: [gpt-4.1,response_md]

---
## Chapter 3 Observational Studies — Key Points (中英文对照)

---

### 核心概念概览

This chapter discusses under what circumstances observational studies can deliver valid causal inferences, focusing on **three key identifiability conditions**:
1. **Consistency (一致性)**
2. **Exchangeability (可交换性)**
3. **Positivity (正的概率性/可行性)**

These conditions are collectively required to *identify* causal effects in observational data, allowing us to treat the data as if they arose from a (conditionally) randomized experiment.

本章重点讨论在何种条件下，观察性研究可以得出有效的因果推断，核心在于三个“可识别性假设”，即一致性、可交换性与正则性。

---

## 1. Identifiability Conditions (可识别性条件)

### 英文总结

- **Identifiability**: A causal effect is identifiable if the observed data, together with the assumptions, imply exactly one value for the causal effect. Otherwise, it's not identifiable.
- In **randomized experiments**, identifiability is ensured *by design* (due to randomization).
- In **observational studies**, identifiability requires the investigator to *assume* these conditions, since treatment assignment is not random.

#### The Three Conditions

1. **Consistency**: 
    - The treatment values *must* represent actual, specific, and well-defined interventions, consistent with what's present in the data.
2. **Exchangeability** (Conditional):  
    - The distribution of counterfactual outcomes is the same between treated and untreated, conditional on measured covariates $L$, i.e.,
    $$
    Y^a \perp\!\!\!\perp A \mid L
    $$
3. **Positivity**:  
    - Every subject must have a positive probability of receiving *each* treatment, given their covariates:
    $$
    \Pr[A = a \mid L = l] > 0 \quad \text{for all } a, \text{ and } l \text{ with } \Pr[L = l] \neq 0
    $$

### 中文总结

- **可识别性**：若在一组假设下，观测到的数据分布仅支持某一特定的因果效应数值，则称该因果效应（非参数）可识别；反之则不可识别。
- 在**随机试验**中，可识别性由设计保证（原因是随机分配）。
- 在**观察性研究**中，需依赖研究者的假设前提，因为处理的分配非随机。

#### 三个条件

1. **一致性**：  
   - 比较的处理值必须代表实际、具体和明确定义的干预，与数据中实际的处理版本一致。
2. **（条件）可交换性**：  
   - 条件于观测协变量$L$，处理组与对照组的反事实结果分布相同，即
   $$
   Y^a \perp\!\!\!\perp A \mid L
   $$
3. **正则性（正的概率性）**：  
   - 每个受试者在其协变量$L$下，接受各种处理的概率均大于0：
   $$
   \Pr[A = a \mid L = l] > 0 \quad \text{对于所有满足 } \Pr[L = l] \neq 0 \text{ 的 } l
   $$

---

## 2. Exchangeability (可交换性)

### 英文要点

- **Meaning**: If treated individuals had (counterfactually) not been treated, they would have had the same expected outcome as the untreated (conditional on $L$).
- **Formally**: $Y^a \perp\!\!\!\perp A | L$
- In practice, requires that all confounders (variables affecting both treatment and outcome) are controlled for by $L$. If unmeasured confounders $U$ exist, exchangeability fails.
- Impossible to *empirically test* whether exchangeability holds, because we can't observe counterfactuals ($Y^a$ for those with $A \neq a$).
- **Fine Point 3.1**: Identifiability depends on exchangeability; without it, observed associations do not necessarily reflect causal effects.
- Even *measuring more variables* cannot guarantee exchangeability; it depends on substantive knowledge, hence always involves some unverifiable assumptions.

### 中文要点

- **含义**：若对照组和处理组在给定$L$后反事实预期结果一致，则两组可交换。
- **形式化表达**：$Y^a \perp\!\!\!\perp A | L$
- 需要$L$包含所有影响处理和结局的混杂因素。若存在未测量变量$U$（未收集到的混杂因素），则可交换性不成立。
- 可交换性无法通过观测数据检验，因为不能同时观测到某个个体的$A=a$和$A \neq a$时的$Y^a$。
- **精细点3.1**：因果效应的可识别性依赖于可交换性，否则观测关联无法反映因果效应。
- 即使收集更多变量，也不能绝对保证可交换性，需依赖领域知识和假设。

---

## 3. Positivity (正则性/可行性)

### 英文要点

- **Definition**: For every subgroup defined by $L=l$, there must be at least some individuals who received *every* treatment ($A$) of interest, i.e.
    $$
    \Pr[A = a \mid L = l] > 0
    $$
    for all $a$ and for all $l$ such that $\Pr[L = l] \neq 0$.
- Positivity can sometimes be checked in data (for measured variables $L$).
- If positivity fails, neither standardization nor IP weighting can validly estimate average causal effects.
- **Technical Point 3.1**: When positivity fails, the IP-weighted mean and standardized mean are undefined or lack causal interpretation because the groups being contrasted are different (don't overlap in $L$).

### 中文要点

- **定义**：对于协变量$L=l$定义的每个亚组，必须至少有一部分个体接受所有关心的处理（$A$），即
    $$
    \Pr[A = a \mid L = l] > 0
    $$
    对于所有$a$以及所有$\Pr[L = l] \neq 0$的$l$。
- 正则性在观测数据（对于已测量的$L$）时有时可以检查。
- 若正则性不成立，标准化和IP加权都无法得出有效的因果估计。
- **技术要点3.1**：正则性不满足时，IP加权和标准化均不具备原本的因果效应含义，因为参与比较的组发生了变化（不同组的$L$值没有交集）。

---

## 4. Consistency (一致性)

### 英文要点

- **Consistency**: For people with $A = a$, the observed outcome $Y$ equals the counterfactual outcome under $a$, i.e., $Y^a = Y$ for those with $A = a$.
- **Two aspects**:
    1. Well-defined counterfactuals: The intervention $a$ must be precise, with all relevant details specified.
    2. Linkage: The versions of treatment in the data must match those for which the causal effect is defined.
- Consistency can fail:
    - If the *definition* of treatment is too vague (e.g., "weight gain" without specifying how).
    - If the *treatment of interest* isn't even present in observed data (no one received $a$).
- **Treatment Variation Irrelevance**: Sometimes it may be justified to group near-identical versions of $a$ into one treatment, but this is an assumption.

### 中文要点

- **一致性**：对于$A=a$的个体，观测到的$Y$等于在$a$下的反事实结果$Y^a$，即$Y^a = Y$对于$A = a$成立。
- **两大方面**：
    1. 反事实$Y^a$的定义必须明确，干预$a$需具体描述所有重要细节。
    2. 需确保数据中的处理与定义的干预吻合，二者可链接。
- 一致性可能失效的两种情形：
    - 干预定义不明确，如只说“体重增加”而未说明具体方式。
    - 数据中未包含所关心的干预版本（如所有人接收到的$a$都不是我们想研究的$a$）。
- **治疗版本无关性假设**：有时可合理地将几种近似处理合并，但这是一种额外假设。

---

## 5. The Target Trial (目标试验)

### 英文要点

- When using observational data to answer causal questions, we should explicitly specify the **target trial**—a hypothetical randomized experiment we wish we could conduct.
- Emulating a target trial makes:
    - The causal question precise and interventions well-defined.
    - It easier to check whether necessary conditions (exchangeability, etc.) can plausibly hold.
    - The analysis more transparent and interpretable for decisions.
- Not all causal questions can be turned into target trials; if you can't clearly define the intervention, stick to prediction rather than causal inference.

### 中文要点

- 在用观察性数据推断因果时，应该明确指定“目标试验”——你希望可以做的假想随机试验。
- 目标试验的拟合（emulation）可以：
    - 明确干预和因果问题；
    - 更容易检查是否满足可交换性等必要条件；
    - 提升分析的透明度和可解释性，便于决策。
- 并非所有因果问题能转化为目标试验。如果无法清晰、具体地定义干预，则更适合做预测而非因果推断。

---

## 6. Technical Point & Fine Points 总结

### Technical Point 3.1 (标准化/加权的正则性)

- The standardized mean:
    $$
    \sum_l E[Y|A = a, L = l] \Pr[L = l]
    $$
  is only defined when $\Pr[A = a | L = l] > 0$ for all observed $l$.
- If positivity fails, IP weights and standardization lose their causal meaning.
- Under positivity, with exchangeability, the difference in IP weighted means is the causal effect.

### 技术要点3.1（标准化/加权的正则性）

- 标准化均值：
    $$
    \sum_l E[Y|A = a, L = l] \Pr[L = l]
    $$
  仅当所有观测到的$l$有$\Pr[A = a | L = l] > 0$时才可计算。
- 若正则性不成立，IP加权和标准化无法给出因果效应。
- 满足正则性和可交换性时，IP加权均值的差异等于平均因果效应。

---

### Fine Point 3.2 (Crossover designs)

**Key point**: For crossover experiments estimating individual causal effects, "no carryover effect" and other stringent conditions are required; in practice, these often don't hold.

**要点**：交叉实验要识别个体因果效应需极强假设（比如没有残留效应），实际中往往无法满足。

---

### Fine Point 3.3 (States vs. interventions)

- Variables like "obesity" or "socioeconomic status" can be ill-defined as interventions.
- Must specify *how* the change occurs to render $Y^a$ well-defined.
- Otherwise, the "causal effect of being obese" is vague; only the effect of a specific, well-specified intervention is meaningful.

- “肥胖”等状态变量通常缺乏良好定义的干预，需要具体说明变化方式，否则反事实$Y^a$本身不明确。

---

### Fine Point 3.4 (Protocol interpretation)

- Even *randomized* experiments may yield different results, if the protocol omits important elements (e.g., surgeon experience).
- Thus, the same "treatment" label $a$ can have different meanings and effects across studies, threatening transportability.

- 即便随机试验，如果方案未细化（比如手术医生经验），不同实验得到的“因果效应”会不同。同一$a$标签在不同研究中含义可能不同，影响结果的可移植性。

---

### Fine Point 3.5 (Possible worlds)

- Philosophers' "closest possible world" view always gives consistency ($Y^a = Y$ for $A=a$), but counterfactuals are ill-defined when $A\neq a$.
- Modern causal inference insists counterfactuals must be constructed via specific, well-defined interventions.

- 哲学上的“最近可能世界”总让$Y^a = Y$（对$A=a$），但$A\neq a$时，反事实总是含糊的。现代因果推断强调反事实需由具体、明确定义的干预来决定。

---

## 7. Attributable Fraction (可归因分数)

- Measures the proportion of *cases* in the observed data that "would not have occurred" had everyone received a reference treatment $a=0$:
  $$
  \text{Attributable Fraction} = \frac{\Pr[Y = 1] - \Pr[Y^{a=0} = 1]}{\Pr[Y = 1]}
  $$
- This is different from the "etiologic fraction" (proportion of cases mechanically *caused* by the exposure).

- 描述在观测数据中，若每个人都接受参考处理($a=0$)，可避免的发病比例：
  $$
  \text{可归因分数} = \frac{\Pr[Y = 1] - \Pr[Y^{a=0} = 1]}{\Pr[Y = 1]}
  $$

---

## 8. When Target Trial Cannot Be Emulated (目标试验无法实现时)

- When interventions can't be well-defined, and target trial can't be emulated, even approximate inference is impossible; only predictive (associational) statements remain.

- 若干预无法明确定义或目标试验无法拟合，只能做预测（相关），而非因果推断（反事实预测）。

---

## 结论

- **Randomized experiments** provide causal effect estimates by design.
- **Observational studies** require that the three identifiability conditions (consistency, exchangeability, positivity) *hold as assumptions* to draw causal conclusions.
- Explicitly specifying a **target trial** clarifies causal questions and the plausibility of identifiability assumptions.
- If interventions cannot be well defined, restrict to prediction rather than causal inference.

---

# 全章公式小结 （Summary of Key Formulas）

### 1. Conditional Exchangeability (条件可交换性):
$$
Y^a \perp\!\!\!\perp A \mid L
$$

### 2. Positivity (正则性):
$$
\Pr[A = a \mid L = l] > 0 \quad \forall \ a, \ l : \Pr[L = l] \neq 0
$$

### 3. Standardized Mean (标准化均值，可用于估计反事实均值):
$$
\sum_l E[Y | A = a, L = l] \Pr[L = l]
$$

### 4. Attributable Fraction (可归因分数):
$$
\text{Attributable Fraction} = \frac{\Pr[Y = 1] - \Pr[Y^{a=0} = 1]}{\Pr[Y = 1]}
$$

---

[For further technical details, see the respective Fine and Technical Points as outlined above.]