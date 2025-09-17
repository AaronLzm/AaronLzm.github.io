---
title: Chapter_14
category: Causal inference
tags: [gpt-4.1,response_md]

---
# Chapter 14: G-Estimation of Structural Nested Models

本章主要内容为结构嵌套均值模型（SNMM, Structural Nested Mean Models）的g估计（g-estimation），它是三种g方法之一（g-methods，另两种为IP 加权和标准化），用于估计因果效应，特别适合处理时间变化的处理方案，但本章通过固定处理的例子来讲解g-估计的思想和细节。

---

## 1. **因果问题回顾 / Causal Question Revisited**

### 主要内容
- 假设研究戒烟（$A$，1 表示戒烟，0 表示未戒烟）对体重增加（$Y$）的平均因果效应。
- 假设条件交换性在协变量 $L$（性别、年龄、种族、教育、吸烟强度/年限、活动、体重等）成立。
- 有兴趣的量：
  $$
  \text{Average Causal Effect} = E[Y^{a=1, c=0}] - E[Y^{a=0, c=0}]
  $$
  可条件化到子群，比如 $E[Y^{a=1, c=0} \mid \text{age}=45] - E[Y^{a=0, c=0} \mid \text{age}=45]$。

### 结论
- 可用边际结构模型（MSM）、标准化或g估计估算群体或某子集合的平均因果效应。

---

## 2. **条件交换性回顾 / Exchangeability Revisited**

### 主要内容
- 条件交换性（analogous to conditional ignorability）核心表达：
  $$
  Y^a \perp A \mid L, \quad \text{for both } a=0,1
  $$
  也即：
  $$
  Pr[A=1 \mid Y^{a=0}, L] = Pr[A=1 \mid L]
  $$
- 可用如下logistic模型表述（$A$为二元）：
  $$
  \logit Pr[A=1 \mid Y^{a=0}, L] = \alpha_0 + \alpha_1 Y^{a=0} + \alpha_2 L
  $$

### 技术要点
- 在 $Y^{a=0}$ 真正独立于 $A$ 时，$\alpha_1=0$。g估计正是通过寻找$\alpha_1=0$的参数值实现的。

---

## 3. **结构嵌套均值模型 / Structural Nested Mean Models (SNMM)**

### 主要内容
- 兴趣在于各$L$层次下的平均因果效应
  $$
  E[Y^{a=1} - Y^{a=0} \mid L] = E[Y^{a=1} \mid L] - E[Y^{a=0} \mid L]
  $$
- 没有交互作用（effect-modification）时，因果效应在$L$内恒定：
  $$
  E[Y^{a} - Y^{a=0} \mid L] = \beta_1 a
  $$
- 有效应修饰时，加乘项：
  $$
  E[Y^{a} - Y^{a=0} \mid L] = \beta_1 a + \beta_2 aL
  $$

#### 和MSM关系
- 不指定$E[Y^{a=0} \mid V]$（$V$为协变量）参数的半参数MSM和SNMM有等价表达。
- "Fine Point 14.1" 细节：关注$\beta_1 a + \beta_2 aV$的估计时（只关心平均效应，不关心未处理下均值），半参数模型更鲁棒。

---

## 4. **选择偏倚与g估计的配合 / Censoring and G-Estimation**

### 重点
- g估计只校正混杂，不可直接校正选择（删失）偏倚。需对删失用IP加权后，再行g估计。
- 非稳定型IP权重（如$W^C = 1/\Pr[C=0|L,A]$）用于创建“去删失伪总体”。

---

## 5. **SNMM其他类型与技术点 / SNMM Variants and Technical Points**

### Technical Point 14.1
- 乘法结构嵌套均值模型（Multiplicative SNMMs），适用于$Y>0$。
- 形式：
  $$
  \log \left( \frac{E[Y^a|A=a,L]}{E[Y^{a=0}|A=a,L]} \right) = \beta_1 a + \beta_2 aL
  $$

---

## 6. **秩保留 (Rank Preservation) 概念**

### 主要内容
- 若每个$L$分层内干预效应对所有人都相同，则序列/排名不会因$A$而改变——这就是秩保留。
- 更现实的情况：秩保留不成立，$A$效应因人而异（不要求个人因果效应恒定）。

结论：SNMM和g估计**不要求**秩保留成立。

---

## 7. **g-估计核心方法论 / Core Method: G-Estimation**

### 基本步骤
1. 假设结构嵌套模型 $Y^a - Y^{a=0} = \psi_1 a$。
2. 用一致性原则，将未观察到的$Y^a$用观测变量和$A$表达，得到：
   $$
   Y^{a=0} = Y - \psi_1 A
   $$
   构造一系列$H(\psi^\dagger) = Y - \psi^\dagger A$作为候选$Y^{a=0}$。
3. 在每个$\psi^\dagger$下拟合
   $$
   \logit Pr[A=1 \mid H(\psi^\dagger), L] = \alpha_0 + \alpha_1 H(\psi^\dagger) + \alpha_2 L
   $$
   找到$\hat{\psi}_1$使得$\hat{\alpha}_1 = 0$（$H(\psi_1)$与$A$在$L$下独立）。
4. 置信区间：对于$\psi^\dagger$，检验$\hat{\alpha}_1=0$的P值大于0.05所对应区间。

### 技术要点
- 截至点 $\hat{\psi}_1$ 是平均因果效应的g估计。
- 配合删失用IP权重。置信区间可用bootstrap。

#### 灵敏度分析（Fine Point 14.2）
- 若$L$不全，$\alpha_1 \neq 0$。g估计可设$\alpha_1$为已知非零常数，做灵敏度分析（系统研究未观测混杂影响）。
---

## 8. **g-估计多参数与计算 / Multivariate G-Estimation**

- 对模型 $E[Y^a - Y^{a=0} |A=a, L] = \beta_1 a + \beta_2 aV$，$H(\beta^\dagger) = Y - \beta^\dagger_1 A - \beta^\dagger_2 AV$。
- Logistic 模型
  $$
  \logit Pr[A=1 \mid H(\beta^\dagger), L] = \alpha_0 + \alpha_1 H(\beta^\dagger) + \alpha_2 H(\beta^\dagger) V + \alpha_3 L
  $$
  寻找使$\alpha_1 = \alpha_2 = 0$的参数（多维搜索）。

- 对线性模型，$\beta$ 可用封闭解直接算出，无需遍历（见Technical Point 14.2）。

---

## 9. **Technical Point 14.2: 估计算法与可封闭式**

对于 $E[Y - Y^{a=0} |A,L] = A\gamma(L; \beta)$ 结构嵌套均值模型，g估计即找到$\beta$使得
  $$
  \sum_{i=1}^n I[C_i=0] W^C_i H_i(\beta^\dagger)(A_i - E[A|L_i]) q(L_i) = 0
  $$
其中 $H_i(\beta^\dagger) = Y_i - A_i \gamma(L_i; \beta^\dagger)$，$q(L_i)$是与$\beta$同维的函数。

- 若$\gamma$关于$\beta$为线性，且$q(L) = d(L)$，直接解封闭式
  $$
  \hat{\beta} = \left[ \sum_{i=1}^n I[C_i = 0] W^C_i A_i (A_i - E[A \mid L_i]) d(L_i) d(L_i)^T \right]^{-1}
               \sum_{i=1}^n I[C_i = 0] W^C_i Y_i (A_i - E[A \mid L_i]) d(L_i)
  $$
- 增加统计效率需合理选择$q(L)$（效率极大化）。
- 双重鲁棒性（doubly robust）：用 $H(\beta^\dagger) - E[H(\beta^\dagger) | L]$ 替换$H(\beta^\dagger)$，如果 $E[H(\beta^\dagger) | L]$或用于$E[A|L]$、删失概率的模型正确，则估计量依然一致。

---

## 10. **更高维度建模与Bias问题**

- SNMM 主动建模的是$L$层次下的因果效应，少加产品项会bias（MSM不会）。
- SNMM 可以灵活设定各交互（如 $aL_j$），但必须包含所有效应修改项，否则有模型偏倚。
- 平均因果效应可由所有层次加权平均得出。

---

# **全章总结 / Summary Table**

| 主题                       | 公式/操作                                                         | 要点中文版                                      | Key Points (English) |
|--------------------------|-------------------------------------------------------------|---------------------------------------------|----------------------|
| 因果效应定义                 | $E[Y^{a=1, c=0}] - E[Y^{a=0, c=0}]$                          | 体重因果效应定义，条件于协变量L                        | Causal effect estimation, marginal or conditional |
| 条件交换性/等价表述            | $Y^a \perp A | L$ <br> $Pr[A=1|Y^{a=0},L] = Pr[A=1|L]$      | 条件交换性是g估计理论基础，$\alpha_1=0$            | Exchangeability condition underpins g-estimation, $\alpha_1=0$ |
| SNMM基本模型                  | $E[Y^a - Y^{a=0}|L]=\beta_1 a + \beta_2 aL$                 | SNMM半参数，主估计目标                             | SNMM is semiparametric; focuses on causal effect |
| g-估计核心                  | 构造 $H(\psi^\dagger) = Y - \psi^\dagger A$，在logit回归中找$\alpha_1=0$ | 逐一检验$\psi^\dagger$，$\alpha_1=0$对应g估计     | Estimate parameter where confounder-adjusted association is zero |
| SNMM高阶参数                  | 多参数$\beta$，更复杂$H(\beta^\dagger)= Y -\beta_1^\dagger A - \beta_2^\dagger AV$ | 多参数g估计，需多维搜索/优化                      | G-estimation for multiple parameters via optimization |
| g-估计等式（封闭解）            | 见Technical Point 14.2                                      | 线性情形下“封闭式(g-formula)”                     | Closed-form solution for linear SNMM |
| 置信区间方法                  | 反复检验使$\alpha_1=0$，P值>0.05区间就是CI                    | inversion or bootstrap法                    | Wald test or bootstrap for CI |
| 敏感度分析                   | 测不同$\alpha_1$下g估计robustness                                 | 可定量评估未观测混杂下g估计的敏感度                    | Sensitivity analysis for unmeasured confounding |
| 选择偏倚与删失调整             | 先IP加权删失，再g估计                                         | g估计本身不校正选择偏倚                             | G-estimation must adjust for censoring first |
| SNMM与MSM对比                | 参见Fine Point 14.1                                          | MSM更弹性，不容易模型错指定，SNMM必需所有交互                 | MSM robust for effect modification, SNMM requires correct interactions |

---

## **结论与实践指引 / Conclusions and Practical Guidance**

- g估计提供了一种利用假想“无处理”下的 counterfactual 的方法，核心是找参数使在L下新构造变量与A独立。
- SNMM兼容异质效应，但多参数时要全面建模；
- g估计具有灵敏性分析能力，对未观测混杂可做系统性偏差评估；
- 具体实现时可用反复拟合logistic模型（或评分方程闭式解）得到g估计点与置信区间；
- 需在正确处理选择偏倚（删失）的情况下使用g估计，否则结果无法解释为因果效应。

---

## 推荐阅读
- Robins(1994, 2000) 结构嵌套模型理论基础；
- 《因果推断：What If?》本章及相关章节，掌握g方法、MSM、IP权重法等完整工具箱。

---

**如有特定内容或代码实现需要细化，欢迎随时补充！**