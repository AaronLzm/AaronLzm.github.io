---
date: 2025-09-17 11:19:05
title: Chapter_8
category: Causal inference
tags: [gpt-4.1,response_md]

---
# Chapter 8: Selection Bias — “What If” (Causal Inference Book)

---

## 8.1 Selection Bias的结构  
**英文**  
Selection bias encompasses biases arising from the way individuals are selected into analysis. It can occur even if the treatment has no causal effect on the outcome (selection bias under the null). This bias is fundamentally due to conditioning on a common effect (collider) of treatment and outcome or their causes.  

### **Causal Diagram Example**  
Suppose $A$ is treatment, $Y$ outcome, and $C$ a common effect (e.g. death before birth if $A$ is folic acid during pregnancy, $Y$ is cardiac malformation).  
- Causal paths:  
  - $A \to Y$ (direct effect)
  - $A \to C \leftarrow Y$ (collider path opened when conditioning on $C=0$)
- If we restrict analysis to $C=0$ (e.g., only survivors), the associational risk ratio:
  $$
  \frac{\Pr(Y=1|A=1,C=0)}{\Pr(Y=1|A=0,C=0)} \neq \frac{\Pr(Y^{a=1}=1)}{\Pr(Y^{a=0}=1)}
  $$
  **Association is not causation!**

**中文**  
选择偏倚指对分析对象的选择过程所导致的各种偏倚，即使治疗对结果没有因果效应也可能出现（零假设下的选择偏倚）。它的根源在于对处理和结果（或其原因）的共同结果（遇阻节点）进行条件限制。

### **因果图示例**  
令$A$为处理，$Y$为结果，$C$为共同结果（如怀孕期间的叶酸，$A$；胎儿心脏畸形，$Y$；死产，$C$）。
- 因果路径:
  - $A \to Y$（直接效应）
  - $A \to C \leftarrow Y$（对$C=0$条件化时开放的遇阻路径）
- 若分析仅限于$C=0$（如仅分析幸存者），则相关风险比：
  $$
  \frac{\Pr(Y=1|A=1,C=0)}{\Pr(Y=1|A=0,C=0)} \neq \frac{\Pr(Y^{a=1}=1)}{\Pr(Y^{a=0}=1)}
  $$
  **相关≠因果！**

---

## 8.2 Selection Bias的类型及例子  
**英文**  
- **Differential loss to follow-up (informative censoring):** Bias from subjects being censored non-randomly, depending on both treatment and outcome/cause of outcome.  
- **Missing data bias / Nonresponse bias:** Missing data on outcome not at random; analysis restricted to those with available data can induce bias.
- **Healthy worker bias:** When studying occupational exposures, restricting to those currently working ($C=0$), health status ($U$) affects both ability to work and outcome, creating bias.
- **Self-selection/Volunteer bias:** Those who consent to participate ($C=0$) differ in ways related to both exposure and outcome.
- **Selection affected by pre-study treatment:** When treatment affects probability of study entry.

**中文**  
- **随访丢失偏倚（信息性删失）：** 研究对象因处理或结果/其原因而非随机失访，导致偏倚。
- **缺失数据/无应答偏倚：** 结果数据因非随机原因缺失，仅对有结果者分析易产生偏倚。
- **健康工人偏倚：** 职业暴露研究中，仅研究在岗者（$C=0$），健康状况影响能否工作和结果、制造偏倚。
- **自选/志愿者偏倚：** 选择参加者（$C=0$）在暴露和结果相关特征上不同。
- **由研究前治疗影响的选择偏倚：** 治疗影响入组概率。

**Common structure:**  
Bias arises from conditioning on a collider – a variable that is a **common effect** of two variables, with one linked to treatment (or its cause) and the other linked to outcome (or its cause).

---

### **Fine Point 8.1: Case-Control Study Selection Bias**  
- **Control selection depending on a consequence of exposure can induce bias.**
- **Formal association measured in case-control studies** is conditional on being selected ($C=0$), and if selection depends partly on treatment, the observed odds ratio will be biased.

---

## 8.3 Selection Bias vs. Confounding  
**英文**
- Both arise due to lack of exchangeability between treated and untreated.
- **Confounding:** Bias from **common causes** of treatment and outcome.
- **Selection bias:** Bias from **conditioning on** common effects (**colliders**) of treatment and outcome (or their causes).
- *Randomization* eliminates confounding, but **not selection bias** if selection occurs after randomization.

**中文**  
- 两者都是处理组和未处理组不可交换性的表现。
- **混杂(confounding)：**处理和结果的共同原因导致的偏倚。
- **选择偏倚(selection bias)：**在处理和结果的共同结果（遇阻节点）上进行条件限定导致的偏倚。
- *随机化*能消除混杂，但**对于随机化后出现的选择偏倚无能为力**。

### **Technical Point 8.1 (Hazard Ratios and Selection Bias)**
- **Unconditional hazard ratios are non-collapsible** (can be biased) due to conditioning on a common effect of treatment and other factors (frailty).
- Even in randomized experiments, **hazard ratios after time 1 can be biased** due to selection bias (conditioning on survival up to time 1).

---

## 8.4 Selection Bias and Censoring  
**Key Point:**
- When there is censoring (loss-to-follow-up), we usually analyze only uncensored ($C=0$) subjects, inducing potential selection bias.
- To properly estimate causal effect of $A$ on $Y$, we want:
  $$
  \Pr(Y^{a=1, c=0}=1) \quad \text{vs} \quad \Pr(Y^{a=0, c=0}=1)
  $$
- **Censoring can be conceptualized as a treatment:** Need to meet **exchangeability, positivity, and consistency** not only for $A$ but also for $C$.

**中文**  
- 当存在删失（随访丢失）时，仅对未删失者($C=0$)分析会引入选择偏倚。
- 正确估计$A$对$Y$的因果效应，应该关注：
  $$
  \Pr(Y^{a=1, c=0}=1) \quad \text{与} \quad \Pr(Y^{a=0, c=0}=1)
  $$
- **把删失看作“处理”**：需对$A$和$C$都满足**可交换性、正性、一致性**假设。

---

## 8.5 How to Adjust for Selection Bias  
### **IP Weighting (Inverse Probability Weighting)**
- For each individual with $C=0$, assign weight:
  $$
  W_C = \frac{1}{\Pr(C=0|A,L)}
  $$
- **Build a pseudo-population** where the distribution would be as if no one was censored.

#### **Three Key Identifiability Conditions:**
1. **Exchangeability:** After conditioning on $A$ and $L$, average outcome in uncensored equals that in censored.
2. **Positivity:** Probability of being uncensored given $A$ and $L$ must be $>0$.
3. **Consistency:** Well-defined interventions; IP weighting is only meaningful if well-defined populations exist.

- **Note:** IP-weighting adjusts for both selection bias and confounding when both are present:
  $$
  W = W_A W_C = \frac{1}{f(A|L)}\cdot \frac{1}{\Pr(C=0|A,L)}
  $$

- **Stratification vs IP weighting:**  
  - Stratification (conditioning on $L$) *sometimes* works (e.g., Figure 8.3 & 8.5), but **fails when conditioning on $L$ opens a backdoor path (collider bias, e.g., Figure 8.4/8.6).**
  - IP weighting succeeds in all presented structures.

**中文**
- **逆概率加权(IPW)：**对每个未删失者($C=0$)赋权：
  $$
  W_C = \frac{1}{\Pr(C=0|A,L)}
  $$
- **“伪总体”**：重现无删失的分析集分布。

#### **三个识别条件：**
1. **可交换性**：对$A$、$L$条件下未删失与删失者的平均结果相同。
2. **正性**：$\Pr(C=0|A,L) > 0$。
3. **一致性**：干预定义良好，伪总体有意义。

- **IPW可同时校正混杂与选择偏倚：**
  $$
  W = W_A W_C = \frac{1}{f(A|L)}\cdot \frac{1}{\Pr(C=0|A,L)}
  $$

- **分层vs加权：**  
  - 分层有时可行（如Figure 8.3和8.5），但若分层变量本身是遇阻点（如Figure 8.4/8.6）会引入偏倚，IPW则始终有效。

---

## 8.6 Selection Without Bias  
### **Collider Stratification May NOT Induce Bias (Under Certain Structure)**
- If two variables ($A$, $E$) cause $Y$ through **completely independent mechanisms**, they become conditionally _independent_ within certain strata (e.g., $Y=0$), even after conditioning on the collider.
- This is the **multiplicative survival model**: if
  $$
  \Pr(Y=0|E=e,A=a) = g(e)h(a)
  $$
  then $A$ and $E$ are independent given $Y=0$.

**Multiplicative Survival Model Proof**
- Example: $Y_A$ = death from $A$'s path, $Y_E$ = death from $E$'s path, $Y_O$ = death from others.
- Then:
  $$
  \Pr(Y=0|E=e,A=a) = \Pr(Y_O=0)\Pr(Y_A=0|A=a)\Pr(Y_E=0|E=e)
  $$

**中文**  
- 两个变量（$A$, $E$）若各自通过独立机制影响$Y$，则在$Y=0$层内即使条件化于遇阻节点，$A$和$E$仍可独立。
- **乘法生存模型：**
  $$
  \Pr(Y=0|E=e,A=a) = g(e)h(a)
  $$
  则$A$和$E$在$Y=0$层独立。

---

### **Fine Point 8.2: Strength and Direction of Selection Bias**
- The **direction of collider-induced association** (bias) between $A$ and $E$ within $Y$-strata depends on their interaction:
  - If either $A=1$ or $E=1$ is sufficient for $Y=1$ (“or” mechanism), conditioning on $Y=1$ makes $A$ and $E$ negatively associated.
  - If both $A=1$ and $E=1$ are required (“and” mechanism), conditioning on $Y=1$ makes $A$ and $E$ positively associated.
- The magnitude matters: **bias is strongest when collider is strongly affected by both exposure and outcome.**

**中文**
- **选择偏倚方向与机制有关**：“或”机制下条件于$Y=1$时$A$与$E$负相关，“与”机制下为正相关。只有强相关时偏倚才显著。

---

## 总结/Summary Table

| 概念/Concept | 英文定义/Key Point | 中文定义/要点 |
|--------------|------------------|--------------|
| Selection bias | Bias due to conditioning on a collider (common effect of treatment/outcome or their causes) | 因对处理和结果（或其原因）共同结果（遇阻节点）条件化所致的偏倚 |
| Collider (遇阻节点) | Variable receiving arrows from both treatment and outcome in DAG | 在因果图中，同时受到处理与结果影响的变量 |
| Selecion bias under the null | Can exist even when treatment has no effect | 即使处理对结果无效，也可能存在选择偏倚 |
| Main adjustment method | **IP weighting:** $W_C = 1/\Pr(C=0|A,L)$ | 逆概率加权(IPW)：每个未删失者权重为$1/\Pr(C=0|A,L)$ |
| Three conditions | Exchangeability, positivity, consistency | 可交换性、正性、一致性 |
| Stratification vs. IPW | Stratification only works under certain DAGs | 分层有时有效，IPW更普适 |
| Effect measure with censoring | Estimate $\Pr(Y^{a,c=0}=1)$ | 要估计“没有删失时”的因果效应 |
| Bias direction/magnitude | Depends on interaction; strong collider-outcome/treatment links cause large bias | 取决于机制与相关强度；双向强时偏倚显著 |

---

以上覆盖了本章全部重点，包括核心结构、主要方法、应用场景、结论与技术细节。若需对具体DAG作图解释、实例展开、或对公式案例进一步剖析，请补充需求。