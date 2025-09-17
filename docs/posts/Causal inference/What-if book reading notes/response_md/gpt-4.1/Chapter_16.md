---
title: Chapter_16
category: Causal inference
tags: [gpt-4.1,response_md]

---
# Chapter 16: Instrumental Variable Estimation  
## Summary, Technical Points, and Fine Points—中英文对照总结

---

## 1. 核心内容简述 / Core Content Summary

- 本章介绍了工具变量 (Instrumental Variables, IV) 估计法，这是一种可以在存在未观测混杂时识别因果效应的方法，不同于之前章节依赖于“条件可交换性”假设的因果推断方法。
- IV 方法依赖一组特定假设（称为“工具变量条件”），并对其进行了详细的理论说明、实际应用要点及局限性讨论。
- 介绍了IV常用的点估计、结构均值模型、对同质性和单调性假设的不同解释，以及弱工具变量的严重后果。

---

## 2. 工具变量估计的三大条件 / The Three Instrumental Conditions

### 2.1 条件定义 / Formal Definitions

**(i) 相关性 (Relevance)**
- 工具变量 $Z$ 与处理 $A$ 存在非零相关性。
- $Z \not\!\perp\!\!\!\perp A$
- 这意味着 $Z$ 必须对 $A$ 有影响。

**(ii) 排除限制 (Exclusion Restriction)**
- $Z$ 对结果 $Y$ 没有直接影响，只能通过 $A$ 影响 $Y$。
- 个体级：$Y_{z, a, i} = Y_{z', a, i} = Y_{a, i} \quad \forall z, z', a, i$
- 人群级：$\mathbb{E}[Y_{z,a}] = \mathbb{E}[Y_{z',a}]$

**(iii) 无共同原因 (Independence / Exchangeability)**
- $Z$ 与 $Y$ 没有共同原因。
- 边际可交换性：$Y_{a, z} \perp\!\!\!\perp Z \quad \forall a, z$
- 更强者：联合可交换性 (joint exchangeability)。
- 通常在随机试验中满足。

### 2.2 形式证明见 Technical Point 16.1。

---

## 3. 工具变量的类型 / Types of IVs

- **因果型工具变量 (Causal Instrument)：** $Z$ 本身影响 $A$。
- **代理工具变量 (Surrogate Instrument)：** $Z$ 自身不直接作用于 $A$，但与未观测到的因果工具 $U_Z$ 相关，并通过 $U_Z$ 间接影响 $A$。

---

## 4. 观测性研究中 IV 的常见类型 / Fine Point 16.1

- **遗传工具变量 (Genetic IV)：** 用于孟德尔随机化，如某基因型影响治疗暴露。
- **偏好 (Preference)：** 比如医生的用药偏好。
- **可及性 (Access)：** 比如治疗距离或价格。

---

## 5. 工具变量下的因果效应辨识 / Identification of Causal Effects with IVs

### 5.1 部分识别 / Partial Identification

- 仅用IV，效果不能点识别，只能给出**界限**，界限常常很宽（Technical Point 16.2）。
- 对二元结果 $Y$，平均因果效应的界限收窄为：$(-1, 1)$，若结合 $Z$ 可进一步收窄至 $Pr[A=1|Z=0] + Pr[A=0|Z=1]$。
- 特殊假设下（联合可交换性等）可得更“尖锐界限（sharp bounds）”。

---

## 6. 标准IV估计量 / The Usual IV Estimator

### 6.1 公式 / Formula

对于二元 $Z$ 或 $A$，即著名的 Wald 估计器，
\[
\text{IV Estimand} = \frac{\mathbb{E}[Y|Z=1] - \mathbb{E}[Y|Z=0]}{\mathbb{E}[A|Z=1] - \mathbb{E}[A|Z=0]}
\]

- **分子**：分配对结局的平均因果效应（意向治疗效应，ITT）。
- **分母**：分配对处理的平均因果效应（顺应性/依从性）。

对于连续 $Z$ 用协方差：
\[
\frac{\operatorname{Cov}(Y, Z)}{\operatorname{Cov}(A, Z)}
\]

### 6.2 计算方法

- 直接计算上述比值，或使用“两阶段最小二乘法（2SLS）：
  - 第一阶段: $E[A|Z] = \alpha_0 + \alpha_1 Z$
  - 第二阶段: $E[Y|\hat{A}] = \beta_0 + \beta_1 \hat{A}$
  - $\hat{\beta}_1$ 就是IV估计量。

---

## 7. 识别平均因果效应还需第四条件 / Need of a Fourth Identifying Condition

### 7.1 同质性 (Homogeneity)

#### 四种表述方式
1. **完全同质性/效应恒定**：对所有个体，$A$ 对 $Y$ 的效应都完全一样（常不成立）。
2. **组内效应同质性**：对所有 $Z,a$，$E[Y_{a=1} - Y_{a=0}|Z=z,A=a]$ 与 $z$ 无关。
3. **未观测混杂变量不是效应修饰因子**：即$U$不修饰$A$对$Y$的效应。
4. **Z-A关联同质性**：$E[A|Z=1,U] - E[A|Z=0,U]$ 与 $U$ 无关。

#### 更一般条件：
\[
\operatorname{Cov}(e(U), t(U)) = 0
\]
其中$e(U) \equiv E[Y_{a=1} - Y_{a=0}|U]$，$t(U) \equiv E[A|Z=1,U] - E[A|Z=0,U]$

#### 技术点
- 满足无效应修饰时，$IV$ 估计量才能无偏识别平均因果效应。

### 7.2 结构均值模型 / Structural Mean Models

#### 加法模型:
\[
E[Y_{a=1} - Y_{a=0}|A=1, Z] = \beta_0 + \beta_1 Z
\]

若无$Z$的效应修饰 ($\beta_1=0$) 则
\[
\beta_0 = \frac{E[Y|Z=1] - E[Y|Z=0]}{E[A|Z=1] - E[A|Z=0]}
\]

#### 乘法模型（Technical Point 16.4）
\[
\frac{E[Y_{a=1}|A=1,Z]}{E[Y_{a=0}|A=1,Z]} = \exp(\beta_0 + \beta_1 Z)
\]

---

## 8. 单调性条件下的解释 / Monotonicity Condition

- 替代同质性条件：要求不存在“逆向行为者”(defiers)，即对所有个体均有$A_{z=1} \geq A_{z=0}$。
- 将人群划分为四类：始终接受者(always-taker)，始终拒绝者(never-taker)，顺应者(complier)，逆行者(defier)。
- 在无defier前提下，
  \[
  \text{IV估计量} = E[Y_{a=1} - Y_{a=0} | A_{z=1}=1, A_{z=0}=0]
  \]
- 这被称为**顺应者平均因果效应 / Complier Average Causal Effect (CACE)**，或“局部平均处理效应 Local Average Treatment Effect (LATE)”。
- 详见 Technical Point 16.7 的严格证明。

---

## 9. IV方法的适用性与局限 / Applicability and Limitations

- 只在有大量**未测混杂**、处理与结果均为二元且处理为点暴露、强且“真正”的工具变量，且同质性或单调性合理时，IV法才有优势。
- 对$IV$识别条件的微小偏差，IV估计量可能出现极大偏倚（因分母放大分子）。
- 弱工具变量(weak IV)：$Z$对$A$的相关作用极弱，导致偏差巨大且CI宽（Fine Point 16.2）。
- 当多个工具合用以增强工具强度时，某个工具违反任何一个条件都高度危险。
- 在观测性研究中，IV的识别条件不可证伪，常需扎实的领域知识佐证。
- $IV$估计的结果大多CI极宽，难以带来“更好决策”。

---

## 10. 工具变量法和其他方法的比较 / Comparison to Other Methods

- IV 估计放宽了“条件交换性”假设，能在有未观测混杂时识别因果效应。
- 但对于假设轻微的违背极其敏感，风险比倾向分数/IPW等更高。
- IV法只适用于点暴露问题，罕见用于需要时间序列处理/复杂策略比较的场合。

---

## 11. 其他相关设计 / Fine/Technical Points

### 回归断点设计 (Regression Discontinuity Design, RDD) / Fine Point 16.3
- 当治疗分配有“门槛”变量（如年龄）时，观测到门槛附近的$Y$均值跳变即为效应。
- 需假设阈值两侧人群可交换、$Y$在$L$附近连续。

---

# 公式总结 / Salient Mathematical Formulas

1. **标准IV估计量/Usual IV Estimator**:
   \[
   \frac{\mathbb{E}[Y|Z=1] - \mathbb{E}[Y|Z=0]}{\mathbb{E}[A|Z=1] - \mathbb{E}[A|Z=0]}
   \]

2. **结构均值模型/Structural Mean Model (加法型)**:
   \[
   E[Y_{a=1} - Y_{a=0}|A=1, Z] = \beta_0 + \beta_1 Z
   \]

   若$\beta_1 = 0$,
   \[
   \beta_0 = \text{IV估计量}
   \]

3. **结构均值模型/Structural Mean Model (乘法型)**:
   \[
   \frac{E[Y_{a=1}|A=1,Z]}{E[Y_{a=0}|A=1,Z]} = \exp(\beta_0 + \beta_1 Z)
   \]
   
   若$\beta_1 = 0$, $\beta_0 = \log(\text{风险比})$

4. **LATE/CACE表达式**:
   \[
   \text{IV估计量} = E[Y_{a=1} - Y_{a=0} | A_{z=1}=1, A_{z=0}=0]
   \]

---

## 12. 结论 / Conclusion

- IV估计依赖四个条件：相关性、排除限制、无共同原因与同质性/单调性。
- 标准IV估计只能在极强且不可证伪的假设下识别总体平均因果效应（或顺应者/LATE）。
- IV的最大优势是可“绕开”未观测混杂，但其适用范围有限且极易出现巨大偏差。
- 实证研究中，对所有假设的透明报告、敏感性分析、三角验证(triangulation)至关重要。

---

**（如需每个小节详细公式/推导，可再分别展开）**