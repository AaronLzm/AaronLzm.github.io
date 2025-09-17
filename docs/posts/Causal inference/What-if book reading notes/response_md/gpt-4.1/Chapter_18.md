---
title: Chapter_18
category: Causal inference
tags: [gpt-4.1,response_md]

---
# Chapter 18: Variable Selection and High-Dimensional Data

---

## **主要内容概述 / Summary**

本章聚焦于因果推断的数据分析中，调整变量（adjustment variables）如何选择，尤其是在高维数据和变量众多的情形下。作者区分了**预测建模**和**因果推断**变量选择的目标、问题和方法，提出了因果推断中变量选择的理论难点与实际策略，详细讲解了机器学习的引入及与双重稳健（doubly robust）估计的结合。全章强调：仅凭自动变量选择或统计关联不足以应对因果推断对混杂控制的需求，必须依赖领域知识和结构假设。

---

## 18.1 不同的变量选择目标  
### **18.1 The different goals of variable selection**

- **因果推断（Causal Inference）**  
  - 目标是获得处理 $A$ 对结局 $Y$ 的**因果效应**。
  - 必须调整混杂变量 $L$ 以满足**条件可交换性**（conditional exchangeability），即阻断 $A \to Y$ 之间的所有backdoor路径。
  - 即使完整调整了 $A \to Y$ 的所有混杂器，单独分析 $L \to Y$ 之间的关系也不能有因果解释（因为没有调整 $L$ 的混杂）。
- **预测（Prediction）/ 关联模型**  
  - 仅需提高预测性能，与混杂或因果关系无关。
  - 变量纳入标准为提高预测精度，不考虑变量是否为混杂变量。
  - 不需要调整混杂，参数没有因果解释。

**Conclusion / 重点总结**  
- 因果分析需要精心挑选混杂器，预测分析则聚焦于最优预测集合。  
- 预测分析常用自动变量选择法与正则化方法（如lasso/ridge），但这些不适用于确保因果解释。

---

## 18.2 会引入或放大偏倚的变量 / Variables that Induce or Amplify Bias

1. **无差别全调整不可取**  
   即便数据、运算力无限，也不能盲目调整所有变量。
2. **引入偏倚的变量类型（需要避免纳入调整）**：
   - **Colliders（碰撞器）**  
     - 示意：若 $L$ 为 $A \to L \leftarrow Y$ 路径上的collider，则调整$L$会在 $A$ 和 $Y$ 之间引入关联（selection bias）。
     - 公式：直接g-公式调整$L$会导致
       $$
       \sum_l \left( E[Y | A=1, L=l]\,P(L=l) - E[Y|A=0, L=l]\,P(L=l)\right)
       $$
       该对比偏离 $E[Y|A=1] - E[Y|A=0]$，引入bias。
   - **治疗后变量（Post-treatment variables）、中介变量（Mediators）**  
     - 若 $L$ 为 $A \to L \to Y$ 路径中的节点（即中介变量），对$L$调整会“屏蔽”掉 $A \to L \to Y$ 这一部分的因果路径，得到非总效应（overadjustment）。
   - **Instrumental Variables（工具变量）**  
     - 工具变量 $Z$ 只与 $A$ 有因果关联，并且只通过 $A$ 影响 $Y$。对 $Z$ 调整不仅不能解除混杂，反而有可能**放大未观测混杂（bias amplification）**。
     - "Z-bias" 现象：调整 $Z$ 后，bias 可能被放大（尤其在线性模型下有严格证明）。
   - **碰撞器后代（Descendants of Colliders）**  
     - 调整碰撞器的后代也会引入bias。
   - **M-bias**  
     - 某些前处理变量（pre-treatment variable）若是碰撞器，同样不可调整，否则产生M-bias。
   - **混杂与碰撞器重叠情形**  
     - 若一个变量既是碰撞器又是混杂器，效应无法识别。

**结论：不能仅依赖数据的统计相关性、自动算法，必须依赖外部知识、因果图。**

---

## 18.3 因果推断与机器学习 / Causal Inference and Machine Learning

- **高维（high-dimensional）调整下的问题：**
  - 传统参数模型易错设，预测准确度差。
  - 机器学习模型（如树、深度学习）可灵活估计 $b(x),\ \pi(x)$：
    - $b(x) = E[Y | X=x, A=1]$ （结果回归）
    - $\pi(x) = P(A=1|X=x)$ （倾向得分）
  - 但：机器学习本身优化预测，不保证因果估计的偏倚可控。
- **常用技巧：Lasso/Ridge / 正则化与变量选择、交叉验证调优**

---

### **18.4 双重稳健（Doubly Robust）机器学习估计量**

#### **（a）偏倚控制的数学原理 / Technical Principle: Second-order Bias**

- **一般因果效应为** $\psi = E[Y^{a=1}]$。
- 常规 plug-in/g-formula 和 IPW 估计量 bias 可能仅与估计误差线性相关：
   $$
   \text{Bias}_{g\text{-formula}} \sim b(x) - \hat{b}(x)\\
   \text{Bias}_{IPW} \sim \frac{1}{\pi(x)} - \frac{1}{\hat{\pi}(x)}
   $$
- **双重稳健估计量的偏倚是乘积型（second-order）：**
  $$
  \text{Bias}_{DR} \sim \left(\frac{1}{\pi(x)} - \frac{1}{\hat{\pi}(x)}\right)\left(b(x) - \hat{b}(x)\right)
  $$
  所以只要两者中至少一个误差较小，整体偏倚就能很小，尤其在高维下利于使用机器学习。

#### **（b）实现方法 / Implementation: Sample Splitting, Cross-fitting**

- **Sample Splitting（样本分割）**  
  - 将样本随机分为训练集、估计集。训练集拟合 $\hat{b}(x),\ \hat{\pi}(x)$，估计集用双重稳健公式算效应。
  - 保证效应估计和回归模型参数独立，理论上获得渐近正态性，有效方差估计。
- **Cross-fitting（交叉拟合）**  
  - 两次或多次交换训练/估计集，得多个估计值再平均。
  - 提升效率，利用所有数据。
- **技术实现 / Technical Point 18.1 Algorithm**  
  - Step 1: 随机分割 $n$ 个体为 $q$ 个 estimation sample， $n-q$ 个 training sample
  - Step 2: 训练样本用机器学习估计 $\hat{b}(x)$, $\hat{\pi}(x)$
  - Step 3: 估计样本用
    $$
    \hat{\psi} = \frac{1}{q} \sum_{i=1}^q \left(\hat{b}(X_i) + \frac{A_i}{\hat{\pi}(X_i)}(Y_i-\hat{b}(X_i))\right)
    $$
  - Step 4: 交换训练/估计样本，再算一次 $\hat{\psi}$，平均即为 cross-fit 估计量
  - Step 5: 构建95% CI（bootstrap）

- **偏倚与正态性 / Technical Point 18.2**  
  - **条件偏倚为：**
    $$
    E\left[ \hat{\psi} - \psi \mid Tr \right] = E \left[ \pi(X_i)\left( \frac{1}{\hat{\pi}(X_i)} - \frac{1}{\pi(X_i)} \right)(b(X) - \hat{b}(X)) \,\Bigg|\,Tr \right]
    $$
  - 若 $\hat{b}(x), \hat{\pi}(x)$ 渐近一致，或者二者的收敛速率 $\alpha, \epsilon$ 满足 $\alpha+\epsilon>1/2$，则 $\text{Bias}=o(n^{-1/2})$，估计量为渐近正态、无偏。

---

## 18.5 变量选择的难题 / Variable Selection is a Difficult Problem

- 仅用自动化（如机器学习）选择混杂变量并不总会导致错误的置信区间，如果结合双重稳健+cross-fitting，则在一定条件下推断依然有效。
- **三大现实难题**：
  1. 领域知识不充分，重要混杂可能被遗漏，或bias-inducing变量可能被误纳入，偏倚不可控。
  2. 时间变化处理（如生存分析情形）下实际运用双重稳健+ML极其困难/费用高。
  3. 有些协变量导致极端倾向得分（$\pi(X)\approx 0$ 或 $1$），即使偏倚小，方差仍可能极大，95% CI 宽得无法解释。
- 为确保推断稳健，作者倡议**敏感性分析**（multiple sensitivity analyses）：采用多种因果推断方法、多组变量调整，比较结果一致性。

---

## **所有关键技术点与结论总结 / All Technical, Fine Points and Conclusions**

### 1. **Fine Point 18.1: 回归模型变量选择办法**
- 含变量极多时，全组合法（暴力法）、前向选择、后向剔除、逐步选择，以及正则化（lasso：子集选择和收缩兼具；ridge：收缩）。
- Lasso可使部分系数为0，实现变量自动选择。

### 2. **Fine Point 18.2: 过拟合和交叉验证**
- 过拟合模型在训练集中表现优异，但泛化性差。
- 交叉验证（如k-fold）权衡训练/验证样本规避过拟合，评估、选择模型超参数。

### 3. **Technical Point 18.1: Augmented IP Weighted（AIPW）Split-Sample & Cross-fit Estimator**
公式：
$$
\hat{\psi} = \frac{1}{q} \sum_{i=1}^q \left(\hat{b}(X_i) + \frac{A_i}{\hat{\pi}(X_i)}(Y_i-\hat{b}(X_i))\right)
$$
交叉拟合：
$$
\hat{\psi}_{\text{cross-fit}} = \frac{\hat{\psi}_1 + \hat{\psi}_2}{2}
$$
也可均分为 $M$ 份，每次轮换 estimation/training，再平均各子估计。

### 4. **Technical Point 18.2:  Split-sample和Cross-fit估计量的渐近性质**
- 条件正态，标准误随 $n^{-1/2}$ 收敛。
- 条件偏倚为
$$
E\left[ \hat{\psi} - \psi \mid Tr \right] = E \left[ \pi(X_i)\left( \frac{1}{\hat{\pi}(X_i)} - \frac{1}{\pi(X_i)} \right)(b(X) - \hat{b}(X)) \,\Bigg|\,Tr \right]
$$
- 若收敛速率 $\alpha+\epsilon> 1/2$，则针对$\sqrt{n}$的偏倚为小量。
- Cross-fit标准误更优（小$\sqrt 2$倍）。

---

## **Take Home Messages / 核心归纳**

1. **选择什么变量纳入调整，决定因果推断能否成立。统计、自动化无法取代因果图与领域知识判断。**
2. **不能盲目调整所有变量，特别是治疗后变量、中介变量、碰撞器变量、工具变量。**
3. **高维情形下，结合机器学习与双重稳健估计/交叉拟合可以保证推断有效性，但前提是调整集没有引入或放大偏倚的变量。**
4. **变量选择永远是难题，没有银弹，敏感性分析必不可少。**

---

**如需更详细的具体变量类型、算法步骤、公式例子等，可以进一步展开某部分的详细解释！**