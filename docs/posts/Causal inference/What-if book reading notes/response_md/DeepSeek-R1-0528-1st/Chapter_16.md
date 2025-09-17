---
title: Chapter_16
category: Causal inference
tags: [DeepSeek-R1-0528-1st,response_md]

---
<think>
We are summarizing Chapter 16: Instrumental Variable Estimation from the provided text.
 The chapter is divided into sections and subsections. We will extract the technical points, fine points, and conclusions.
 We note that the text includes Technical Points and Fine Points which contain important details and should be included.
 We are to use LaTeX for mathematical expressions and retain English technical terms while summarizing in Chinese.

 The structure of the chapter is as follows:
 16.1 The three instrumental conditions
 16.2 The usual IV estimand
 16.3 A fourth identifying condition: homogeneity
 16.4 An alternative fourth condition: monotonicity
 16.5 The three instrumental conditions revisited
 16.6 Instrumental variable estimation versus other methods

 Additionally, there are Technical Points (16.1 to 16.7) and Fine Points (16.1 to 16.3) that we must incorporate.

 We will go through each section and extract the key points.

 Important: We must not add any subjective interpretation and must include all important details.

 Let's begin.
</think>
### 第16章：工具变量估计（Instrumental Variable Estimation）总结

#### 16.1 工具变量的三个条件
- **技术要点**：
  1. **工具变量（IV）定义**：变量 \(Z\) 需满足三个条件：
     - (i) **相关性**（Relevance）: \(Z\) 与处理变量 \(A\) 相关（即 \(Z \not\!\perp\!\!\!\perp A\)）。
     - (ii) **排他性约束**（Exclusion Restriction）: \(Z\) 仅通过 \(A\) 影响结果 \(Y\)（无直接效应）。个体层面：\(Y^{z,a} = Y^{z',a} = Y^a\)；群体层面：\(E[Y^{z,a}] = E[Y^{z',a}]\)。
     - (iii) **无混杂**（No Confounding）: \(Z\) 与 \(Y\) 无共同原因（即 \(Y^{a,z} \perp\!\!\!\perp Z\)）。
  2. **随机试验中的工具变量**：在双盲随机试验中，随机分配指标 \(Z\) 是工具变量（满足随机分配和双盲设计）。
  3. **代理工具变量**（Surrogate Instrument）: 若因果工具变量 \(U_Z\) 未测量，可用其代理 \(Z\)（需调整条件 (iii) 为“除 \(U_Z\) 外无共同原因”）。
- **细节要点**：
  - 仅条件 (i) 可经验验证（如通过风险差 \(\text{Pr}[A=1|Z=1] - \text{Pr}[A=1|Z=0] > 0\)）。
  - 条件 (ii) 和 (iii) 不可验证，需依赖领域知识假设（如吸烟研究中，香烟价格作为候选工具变量）。
  - **弱工具变量**（Weak Instrument）: 当 \(Z\) 与 \(A\) 关联微弱时（如风险差仅 6%），估计偏差会被放大。

#### 16.2 常用工具变量估计量
- **技术要点**：
  1. **IV 估计量公式**：对二值工具变量 \(Z\)，在附加条件 (iv) 下，平均因果效应为：
     \[
     \frac{E[Y|Z=1] - E[Y|Z=0]}{E[A|Z=1] - E[A|Z=0]}
     \]
     连续工具变量则用协方差形式：\(\frac{\text{Cov}(Y,Z)}{\text{Cov}(A,Z)}\)。
  2. **估计方法**：
     - **标准 IV 估计**：计算样本中 \(E[Y|Z]\) 和 \(E[A|Z]\) 的差异比。
     - **两阶段最小二乘法（2SLS）**：
       - 第一阶段：拟合 \(E[A|Z] = \alpha_0 + \alpha_1 Z\)，预测 \(\hat{A}\)。
       - 第二阶段：拟合 \(E[Y|Z] = \beta_0 + \beta_1 \hat{A}\)，\(\hat{\beta}_1\) 即 IV 估计值。
  3. **随机试验中的解释**：分子为意向治疗效应（ITT），分母为依从性差异；低依从性时 IV 估计量放大 ITT。
- **细节要点**：
  - 弱工具问题：若一阶段 F 统计量 < 10，估计值置信区间宽且偏差放大（如吸烟案例中 95% CI: -36.5 至 41.3 kg）。
  - **结构均值模型**（Structural Mean Models）: 可显式建模处理效应（见技术点 16.3-16.4）。

#### 16.3 第四个识别条件：同质性
- **技术要点**：
  1. **同质性条件 (iv) 的四个版本**：
     - (a) **恒定效应**（Constant Effect）: \(Y^{a=1} - Y^{a=0}\) 对所有个体相同（不现实）。
     - (b) **加性同质性**：\(E[Y^{a=1} - Y^{a=0} | Z, A=a]\) 在 \(Z\) 各层相同（用于技术点 16.3 证明）。
     - (c) **无加性效应修饰**：未测混杂 \(U\) 不修饰效应（即 \(E[Y^{a=1}|U] - E[Y^{a=0}|U] = E[Y^{a=1}] - E[Y^{a=0}]\)）。
     - (d) **工具-处理关联同质**：\(E[A|Z=1,U] - E[A|Z=0,U]\) 在 \(U\) 各层恒定。
  2. **一般同质性条件**：效应修饰 \(e(U) = E[Y^{a=1} - Y^{a=0}|U]\) 与工具-处理关联修饰 \(t(U) = E[A|Z=1,U] - E[A|Z=0,U]\) 的协方差为零（\(\text{Cov}[e(U), t(U)] = 0\)）。
- **细节要点**：
  - 同质性条件均不可验证，且常不现实（如戒烟对体重的影响因吸烟强度而异）。
  - **解决方案**：引入基线协变量（通过结构均值模型控制效应修饰）。

#### 16.4 替代第四个条件：单调性
- **技术要点**：
  1. **依从类型**（Principal Strata）: 基于反事实处理 \((A^{z=1}, A^{z=0})\) 分为：
     - 始终接受者（Always-takers）: \((1,1)\)
     - 从不接受者（Never-takers）: \((0,0)\)
     - 依从者（Compliers）: \((1,0)\)
     - 违抗者（Defiers）: \((0,1)\)
  2. **单调性条件 (iv)**：无违抗者（即 \(A^{z=1} \geq A^{z=0}\) 对所有个体成立）。
  3. **IV 估计量的解释**：在单调性下，IV 估计量等于依从者的平均因果效应（CACE）：
     \[
     E[Y^{a=1} - Y^{a=0} | A^{z=1}=1, A^{z=0}=0]
     \]
- **细节要点**：
  - **依从者效应（CACE）的局限性**：依从者不可识别，且其比例因工具变量而异（如吸烟案例中仅 6%）。
  - **单调性在观察性研究中的问题**：
    - 代理工具变量（如医师偏好）可能因多维决策存在违抗者。
    - 连续因果工具变量下，IV 估计量难解释为依从者效应。
  - **适用场景**：双盲随机试验（尤其对照组完全依从时）。

#### 16.5 工具变量条件的再讨论
- **技术要点**：
  1. **条件 (i) 问题（弱工具变量）**：
     - 估计置信区间宽。
     - 放大条件 (ii)-(iii) 的违反偏差（偏差乘以 \(1/\text{分母}\))。
     - 有限样本下即使有效工具也有偏。
  2. **条件 (ii) 问题（直接效应）**：若 \(Z\) 对 \(Y\) 有直接路径（图 16.8），或处理变量粗化（图 16.9），则违反。
  3. **条件 (iii) 问题（混杂）**：未测混杂（图 16.10）或选择偏倚（如排除某些 \(A\) 水平）导致偏差。
- **细节要点**：
  - **弱工具定义**：(1) 实质弱（\(Z-A\) 关联小）；(2) 统计弱（一阶段 F 统计量 < 10）。
  - **缓解策略**：调整基线协变量 \(V\)（但需同质性假设）。

#### 16.6 工具变量估计 vs. 其他方法
- **技术要点**：
  1. **假设差异**：IV 估计不依赖条件可交换性（需工具变量条件），而 IP 加权、标准化等方法需要。
  2. **敏感性差异**：IV 估计对条件轻微违反更敏感（因分母放大偏差）。
  3. **适用场景限制**：IV 估计适用于：
     - 未测混杂严重。
     - 二值处理 \(A\) 和强因果工具 \(Z\)。
     - 同质性或单调性成立。
     - 点干预场景（不适用于时变处理）。
- **细节要点**：
  - **三角验证**：结合不同假设的方法（如断点设计）提高因果推断稳健性。
  - **报告要求**：需透明报告工具变量假设和弱工具检验。

### 结论
- **核心结论**：
  1. 工具变量方法通过替代假设（工具变量条件）避免测量所有混杂因子，但需额外不可验证条件（同质性或单调性）。
  2. **IV 估计量解释**：
     - 同质性下：估计总体平均因果效应。
     - 单调性下：估计依从者平均因果效应（CACE）。
  3. **局限性**：
     - 弱工具变量导致估计不稳定。
     - 观察性研究中工具变量有效性难保证。
     - CACE 的实际意义和泛化性有限。
  4. **实践建议**：IV 估计应限于强工具变量场景，并辅以敏感性分析和替代方法三角验证。

> **数学公式总结**：
> - 工具变量条件 (ii) 个体层面：\(Y^{z,a}_i = Y^{z',a}_i = Y^a_i\)
> - 工具变量估计量：\(\frac{E[Y|Z=1] - E[Y|Z=0]}{E[A|Z=1] - E[A|Z=0]}\)
> - 一般同质性条件：\(\text{Cov}[e(U), t(U)] = 0\)，其中 \(e(U) = E[Y^{a=1} - Y^{a=0}|U]\)，\(t(U) = E[A|Z=1,U] - E[A|Z=0,U]\)