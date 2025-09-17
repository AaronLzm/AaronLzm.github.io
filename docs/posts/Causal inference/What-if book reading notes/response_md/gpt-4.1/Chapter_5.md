---
title: Chapter_5
category: Causal inference
tags: [gpt-4.1,response_md]

---
# Chapter 5: Interaction (from "Causal Inference: What If")

---
## **Main Content Summary / 主要内容总结**

This chapter rigorously discusses **interaction between two (or more) treatments** both within the familiar **counterfactual (potential outcomes)** and the **sufficient-component-cause** frameworks. It defines interaction, distinguishes it from effect modification, gives formal criteria for detecting and identifying interaction under various conditions, and introduces the notion of mechanistic synergy and antagonism (sufficient cause interaction).

---
## 1. **What is Interaction? / 何为交互作用？**

### **Definition**

> There is **interaction** between two treatments $A$ and $E$ if the causal effect of $A$ on $Y$, after setting $E=1$ via intervention, is different from the causal effect of $A$ on $Y$ after setting $E=0$ via intervention.

> **两个处理$A$和$E$间存在交互作用，如果在设定$E=1$时，$A$对$Y$的因果效应与设定$E=0$时$A$的因果效应不同。**

#### **Additive Scale (加法标度):**
- There is **interaction on the additive scale** if the following holds:
  $$
  \Pr(Y^{a=1,e=1}=1) - \Pr(Y^{a=0,e=1}=1) \neq \Pr(Y^{a=1,e=0}=1) - \Pr(Y^{a=0,e=0}=1)
  $$
- **如果以下不等式成立，则在加法标度上存在交互作用：**
  $$
  \Pr(Y^{a=1,e=1}=1) - \Pr(Y^{a=0,e=1}=1) \neq \Pr(Y^{a=1,e=0}=1) - \Pr(Y^{a=0,e=0}=1)
  $$

#### **Equivalent Definition (等价定义):**
- On the additive scale, treatments $A$ and $E$ are symmetric in the definition:
  $$
  \Pr(Y^{a=1,e=1}=1) - \Pr(Y^{a=1,e=0}=1) \neq \Pr(Y^{a=0,e=1}=1) - \Pr(Y^{a=0,e=0}=1)
  $$
- **在加法标度下，对$A$和$E$地位对称：**
  $$
  \Pr(Y^{a=1,e=1}=1) - \Pr(Y^{a=1,e=0}=1) \neq \Pr(Y^{a=0,e=1}=1) - \Pr(Y^{a=0,e=0}=1)
  $$

---
## 2. **Technical Point 5.1: Additive and Multiplicative Interaction / 技术要点 5.1：加法与乘法交互**

### **Additive Interaction (加法交互)**
- *No additive interaction* iff:
  $$
  \Pr(Y^{a=1,e=1}=1) - \Pr(Y^{a=0,e=1}=1) = \Pr(Y^{a=1,e=0}=1) - \Pr(Y^{a=0,e=0}=1)
  $$
- *Or equivalently*:
  $$
  \Pr(Y^{a=1,e=1}=1) = [\Pr(Y^{a=1,e=0}=1) - \Pr(Y^{a=0,e=0}=1)] + \Pr(Y^{a=0,e=1}=1)
  $$
  $$
  \Pr(Y^{a=1,e=1}=1) - \Pr(Y^{a=0,e=0}=1) = [\Pr(Y^{a=1,e=0}=1) - \Pr(Y^{a=0,e=0}=1)] + [\Pr(Y^{a=0,e=1}=1) - \Pr(Y^{a=0,e=0}=1)]
  $$
- **无加法交互当且仅当：**
  $$
  \Pr(Y^{a=1,e=1}=1) - \Pr(Y^{a=0,e=1}=1) = \Pr(Y^{a=1,e=0}=1) - \Pr(Y^{a=0,e=0}=1)
  $$
- **或者：**
  $$
  \Pr(Y^{a=1,e=1}=1) = [\Pr(Y^{a=1,e=0}=1) - \Pr(Y^{a=0,e=0}=1)] + \Pr(Y^{a=0,e=1}=1)
  $$

**Superadditivity**: (交互为超级加性时)
$$
> \ \text{in the above equations},\  \neq \rightarrow >
$$

**Subadditivity**: (交互为亚加性时)
$$
> \ \text{in the above equations},\  \neq \rightarrow <
$$

### **Multiplicative Scale (乘法交互)**
- There is interaction on the multiplicative scale if:
  $$
  \frac{\Pr(Y^{a=1,e=1}=1)}{\Pr(Y^{a=0,e=0}=1)} \neq \frac{\Pr(Y^{a=1,e=0}=1)}{\Pr(Y^{a=0,e=0}=1)} \times \frac{\Pr(Y^{a=0,e=1}=1)}{\Pr(Y^{a=0,e=0}=1)}
  $$
- **乘法标度上的交互定义：**
  $$
  \frac{\Pr(Y^{a=1,e=1}=1)}{\Pr(Y^{a=0,e=0}=1)} \neq \frac{\Pr(Y^{a=1,e=0}=1)}{\Pr(Y^{a=0,e=0}=1)} \times \frac{\Pr(Y^{a=0,e=1}=1)}{\Pr(Y^{a=0,e=0}=1)}
  $$

---
## 3. **Distinguishing Interaction from Effect Modification / 区分交互和效应修饰**

- **Interaction**: Both $A$ and $E$ are manipulable and have equal status. The joint intervention is considered.
- **Effect modification**: A variable $V$ modifies the effect of $A$ on $Y$, but $V$ itself is not (necessarily) manipulable or interpreted symmetrically with $A$.

**交互**：$A$和$E$地位对等、均可人为干预，关注联合干预的效应。
**效应修饰**：某变量$V$修饰$A$对$Y$的效应，但$V$本身通常不是干预变量，定义上关注$A$。

---

## 4. **Identifying Interaction / 交互作用的识别**

- All **identification of interaction** requires satisfied *exchangeability*, *positivity*, and *consistency* for both treatments ($A$, $E$).
- If either $A$ or $E$ is randomized, these conditions are met for that variable, enabling estimation of joint and marginal risks via standardization or IP weighting.
- If only $A$ is randomized, one can estimate effect modification by $E$ (i.e. estimate the causal effect of $A$ within strata of $E$), but *not* the joint interaction (unless willing to impose extra untestable assumptions for $E$).

**对交互作用的识别需要“可交换性(Exchangeability)、正性(Positivity)、一致性(Consistency)”对联合处理$(A,E)$均成立。**

> - $A$/$E$中有一项完全随机分配，则对该变量成立。标准化/逆概率加权可用于交互作用估计。
> - 仅$A$随机，则只能做效应修饰而非严格的交互作用识别。

---
## 5. **Response Types and Interaction / 反应类型与交互**

For **two binary treatments ($A$, $E$) and binary outcome ($Y$)**:
- Each subject has **4 counterfactuals**: $Y^{a=1,e=1}, Y^{a=1,e=0}, Y^{a=0,e=1}, Y^{a=0,e=0}$.
- There are **16 possible response types** (all combinations of outcomes to the 4 joint treatments).

These types can be grouped:
- **No additive interaction:** If population only has certain types (see types 1, 4, 6, 11, 13, 16 in the table).
- **Additive interaction present:** If some types are present where the effect of $A$ depends on the value of $E$ and vice versa (specific types, e.g., 7, 8, or 2, 3, 5, 9, 10, 12, 14, 15).

---
## 6. **Technical Point 5.2: Monotonicity / 技术要点 5.2：单调性**

- If for all individuals, increasing $A$ or $E$ cannot *prevent* the outcome (i.e. $Y^{a=1,e=1} \geq Y^{a=0,e=1}$, $Y^{a=1,e=0} \geq Y^{a=0,e=0}$, etc.), the effects are **monotonic**.
- Under monotonicity, certain types of sufficient causes (those with $A=0$ or $E=0$ present) cannot exist.

---

## 7. **Sufficient Component Causes / 充要组分原因**

- **Sufficient cause**: minimal set of factors (“components”) that together inevitably bring about the outcome.
- With two binary treatments, there are **9 possible sufficient causes**:
  1. $A=1$ only (regardless of $E$)
  2. $A=0$ only
  3. $E=1$ only
  4. $E=0$ only
  5. $A=1$ AND $E=1$
  6. $A=1$ AND $E=0$
  7. $A=0$ AND $E=1$
  8. $A=0$ AND $E=0$
  9. Non-treatment related cause (“doomed”)
- 图示为“因果派/因果馅饼”（causal pies）。

---
## 8. **Sufficient Cause Interaction (“Synergism/Antagonism”) / 充要原因交互作用（协同、拮抗）**

- **Sufficient cause interaction**: exists if some sufficient cause contains both $A=1$ and $E=1$ as components.
  - **Synergism**: $A=1$ and $E=1$ together cause the effect (e.g., a gene–gene or gene–environment “compositional epistasis”).
  - **Antagonism**: $A=1$ and $E=0$ (or vice versa) together cause the effect.
- *Empirical tests*: Inequalities involving observed probabilities (Technical Point 5.1 and Fine Point 5.1, see below).

---
## 9. **Fine Point 5.1: Sufficient/Empirical Test for Synergism / 协同的充分经验判据**

A **sufficient (not necessary) condition** that there exist individuals for whom $A=1$, $E=1$ causes the outcome, but neither $A=1$ alone nor $E=1$ alone causes it (i.e., response types 7 and 8):

$$
\Pr(Y^{a=1, e=1}=1) - \left[\Pr(Y^{a=0, e=1}=1) + \Pr(Y^{a=1, e=0}=1)\right] > 0
$$

Or equivalently:

$$
\Pr(Y^{a=1, e=1}=1) - \Pr(Y^{a=0, e=1}=1) > \Pr(Y^{a=1, e=0}=1)
$$

If monotonicity (no prevention possible) holds, weaken to:

$$
\Pr(Y^{a=1, e=1}=1) - \Pr(Y^{a=0, e=1}=1) > \Pr(Y^{a=1, e=0}=1) - \Pr(Y^{a=0,e=0}=1)
$$

**判别类型7、8存在（协同）充要条件（但非必要）如下：**

$$
\Pr(Y^{a=1, e=1}=1) - \left[\Pr(Y^{a=0, e=1}=1) + \Pr(Y^{a=1, e=0}=1)\right] > 0
$$

若假定单调性，则弱化为：

$$
\Pr(Y^{a=1, e=1}=1) - \Pr(Y^{a=0, e=1}=1) > \Pr(Y^{a=1, e=0}=1) - \Pr(Y^{a=0,e=0}=1)
$$

---

## 10. **Fine Point 5.4: Attributable Fraction for Multiple Causes / 多原因责任归属问题**

- The excess fractions for single treatments **do not simply add for joint effects** (may be >100%) since people may be "double-counted" if they are cases preventable by both $A$ and $E$—only the joint intervention fraction is bounded by 100%.
- **一个个体可能被$A$和$E$都归因，故两者责任归属和可超100%，但联合干预可归因不会超过100%。**

---

## 11. **Counterfactual vs. Sufficient-Component Frameworks / 反事实与充要组分因果框架**

- **Counterfactual (Potential Outcomes) Framework**: Focuses on the *effects of a particular cause*; answers "what would have happened if..."
- **Sufficient-Component-Cause Framework**: Focuses on *the causes of a particular effect*; effective for thinking about mechanisms, interaction, synergism but is less generalizable (typically requires binary variables).
- In practice, most statistical analysis uses the counterfactual framework due to generalizability and less data requirement.

---

## **Reference to Monotonicity and Sufficient Causes / 关于单调性与充要原因**

- If treatment effects are monotonic (no prevention possible), then certain sufficient causes (those involving $A=0$ or $E=0$) cannot exist.
- **若效应单调，则涉及$A=0$或$E=0$的某些充要原因不成立。**

---

# **(C) Technical and Fine Points / 技术与细致要点总结**

### **(1) Additive/Multiplicative Definitions 切换 & 同等地位**
- Additive and multiplicative definitions are precisely delineated with explicit equations.
- Treatments $A$ and $E$ are symmetrical.

### **(2) Monotonicity 单调性**
- $Y^{a=1} \geq Y^{a=0}$ is monotonic increasing for $A$, generalized to joint monotonicity for $A, E$.

### **(3) Empirical sufficiency for synergism 协同判据**
- Inequalities for response types (Fine Point 5.1) allow *empirical* check for synergism.

### **(4) Sufficient causes mapping**
- One-to-one mapping between counterfactual types and combinations of sufficient causes.

### **(5) Non-additivity/Non-multiplicativity implies (or is implied by) interaction**
- Additivity implies no interaction; non-additivity (super-/sub-) implies interaction.

### **(6) Effect modification ≠ Interaction**
- Unless both variables subject to intervention & data support exchangeability/positivity/consistency for both.

### **(7) Excess fractions and “double counting”**
- Attributable fractions for $A$, $E$ may sum over 100% due to overlap, only joint is meaningful.

---

# **公式列表/Formula Recap**

### **Additive Interaction:**
$$
\Pr(Y^{a=1,e=1}=1) - \Pr(Y^{a=0,e=1}=1) \neq \Pr(Y^{a=1,e=0}=1) - \Pr(Y^{a=0,e=0}=1)
$$
or
$$
\Pr(Y^{a=1,e=1}=1) - \Pr(Y^{a=1,e=0}=1) \neq \Pr(Y^{a=0,e=1}=1) - \Pr(Y^{a=0,e=0}=1)
$$

### **Multiplicative Interaction:**
$$
\frac{\Pr(Y^{a=1,e=1}=1)}{\Pr(Y^{a=0,e=0}=1)} \neq \frac{\Pr(Y^{a=1,e=0}=1)}{\Pr(Y^{a=0,e=0}=1)} \times \frac{\Pr(Y^{a=0,e=1}=1)}{\Pr(Y^{a=0,e=0}=1)}
$$

### **Synergism Sufficient Condition:**
$$
\Pr(Y^{a=1, e=1}=1) - \left[\Pr(Y^{a=0, e=1}=1) + \Pr(Y^{a=1, e=0}=1)\right] > 0
$$
or if monotonic:
$$
\Pr(Y^{a=1, e=1}=1) - \Pr(Y^{a=0, e=1}=1) > \Pr(Y^{a=1, e=0}=1) - \Pr(Y^{a=0, e=0}=1)
$$

---

# **结论/Takeaway**

- **Interaction** is about how the effect of one treatment changes depending on the level of another—in principle, evaluated via joint interventions and counterfactual contrasts.
- The **counterfactual framework** is statistically and empirically dominant, whereas the **sufficient-component-cause framework** aids in mechanistic understanding and philosophical clarity.
- Proper identification of interaction requires strong assumptions for all involved treatments; effect modification is weaker and asymmetrical.
- Carefully distinguish empirical definitions (risk difference/ratio) from mechanistic ones (sufficient causes); use the correct formula for your question.

---

**Note:**  
If you need tables (response types etc.), or more formulaic worked examples, let me know!
如需反应类型表、公式实例或进一步深入，请告知。