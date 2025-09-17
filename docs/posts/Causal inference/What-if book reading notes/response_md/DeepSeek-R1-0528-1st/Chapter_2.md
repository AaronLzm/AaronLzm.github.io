---
title: Chapter_2
category: Causal inference
tags: [DeepSeek-R1-0528-1st,response_md]

---
<think>
Hmm, I need to summarize Chapter 2 of "Causal Inference: What If" on Randomized Experiments. The user has shared extensive text from the chapter, including tables and mentions of images, and wants a thorough technical summary. 

First, I'll structure this by sections: 2.1 Randomization, 2.2 Conditional Randomization, 2.3 Standardization, and 2.4 Inverse Probability Weighting. The key is to extract all technical points without adding interpretation—just as the user emphasized with "严禁主观臆断内容".

For 2.1, the core is how randomization enables exchangeability (Y^a ⊥ A). The pedestrian example illustrates a simple experiment, while Table 2.1 shows missing counterfactuals. I must explain why marginal randomization makes treated/untreated groups comparable and how this allows causal effects to equal associational measures. The Zeus example and Technical Point 2.1 on full vs. mean exchangeability are crucial here. 

Moving to 2.2, conditional randomization introduces the role of covariates like L (critical condition). Table 2.2 shows how treatment assignment depends on L, breaking marginal exchangeability but preserving conditional exchangeability (Y^a ⊥ A | L). The heart transplant example with two designs clarifies this—design 1 (single coin) vs. design 2 (coins per L level). 

For 2.3, standardization computes population effects by stratifying on L and averaging risks. The math is Pr[Y^a=1] = Σ_l Pr[Y=1|L=l,A=a] Pr[L=l]. The example calculates a causal risk ratio of 1. Fine Point 2.2 warns about risk periods, which I'll note but not expand on since it's secondary. 

In 2.4, IP weighting creates a pseudo-population using weights W^A = 1/f[A|L]. Figures 2.1-2.3 visually explain how weighting adjusts for L, making groups exchangeable. Technical Point 2.3 proves equivalence to standardization—important to mention but not derive. 

The conclusion ties together: randomization (marginal or conditional) plus methods like standardization/IP weighting yields causal estimates, but real-world constraints often force observational studies. I'll keep all formulas in LaTeX as requested, like Pr[Y^a=1] and Y^a ⊥ A. 

The user seems highly knowledgeable (Nobel Prize researcher persona!), so I'll avoid oversimplifying. No fluff—just structured technical extraction. Also, since they mentioned "no omissions," I'll ensure even fine points like crossover experiments (Fine Point 2.1) and positivity conditions are included.
</think>
### 第2章：随机化实验（RANDOMIZED EXPERIMENTS）总结

#### **2.1 随机化（Randomization）**
**技术重点**：
1. **随机化实验的定义**：
   - **实验性（Experimental）**：研究者主动实施干预（如抬头动作）。
   - **随机化（Randomized）**：干预分配由随机机制（如抛硬币）决定，而非确定性规则（如按性别分配）。
   - **目的**：解决混杂问题，确保处理组（treated）和未处理组（untreated）的可比性（exchangeability）。

2. **反事实结果与缺失数据问题**：
   - 每个个体仅观测到一个潜在结果（observed outcome \(Y\)），另一个反事实结果（counterfactual outcome \(Y^a\)）缺失（表2.1）。
   - 关联度量（associational measures）如风险比（risk ratio）无法直接等同于因果效应（causal effect）。

3. **可交换性（Exchangeability）**：
   - **定义**：\(Y^a \perp\!\!\!\perp A\)（对所有\(a\)），即处理组和未处理组的反事实风险相同：
     \[
     \Pr[Y^a = 1 \mid A = 1] = \Pr[Y^a = 1 \mid A = 0] = \Pr[Y^a = 1]
     \]
   - **随机化的作用**：通过随机分配处理\(A\)，确保\(Y^a\)与\(A\)独立（类似基因等固定特征）。
   - **可交换性 ≠ 观测结果独立**：即使\(Y^a \perp\!\!\!\perp A\)成立，若处理有因果效应，则观测结果\(Y \not\!\perp\!\!\!\perp A\)（因\(Y = Y^A\)依赖\(A\)）。

4. **理想随机化实验的推论**：
   - 在无混杂、无失访、完全依从的理想条件下：
     - 反事实风险 \(\Pr[Y^a = 1]\) 等于观测风险 \(\Pr[Y = 1 \mid A = a]\)。
     - 因果风险比（causal risk ratio）等于关联风险比（associational risk ratio）：
       \[
       \frac{\Pr[Y^{a=1} = 1]}{\Pr[Y^{a=0} = 1]} = \frac{\Pr[Y = 1 \mid A = 1]}{\Pr[Y = 1 \mid A = 0]}
       \]

**细节要点**：
- **表2.1**：显示20名心脏移植患者的观测数据（\(A\)：移植，\(Y\)：死亡），反事实结果（\(Y^0, Y^1\)）部分缺失。
- **可交换性类型**（Technical Point 2.1）：
  - **完全可交换性（Full exchangeability）**：\(Y^A \perp\!\!\!\perp A\)（所有反事实结果联合独立于\(A\)）。
  - **均值可交换性（Mean exchangeability）**：\(E[Y^a \mid A = a'] = E[Y^a]\)（对连续结局足够）。

---

#### **2.2 条件随机化（Conditional Randomization）**
**技术重点**：
1. **条件随机化设计**：
   - **边际随机化（Marginal randomization）**：所有个体使用同一随机概率（如单硬币），保证边际可交换性（\(Y^a \perp\!\!\!\perp A\)）。
   - **条件随机化（Conditional randomization）**：随机概率依赖协变量\(L\)（如病情危重程度），仅保证条件可交换性（\(Y^a \perp\!\!\!\perp A \mid L\)）。

2. **条件可交换性（Conditional Exchangeability）**：
   - **定义**：在\(L\)的每一层内，处理组与未处理组可交换：
     \[
     \Pr[Y^a = 1 \mid A = 1, L = l] = \Pr[Y^a = 1 \mid A = 0, L = l] \quad \forall l
     \]
   - **表2.2示例**：按病情（\(L = 0/1\)）分层随机（危重组移植概率75%，非危重50%），但整体存在混杂（69%处理组为危重 vs. 43%未处理组）。

**细节要点**：
- **效应修正（Effect Modification）**：因果效应（如风险比）可能在\(L\)的不同层（如危重/非危重）中不同，需分层分析。
- **缺失数据机制**（Fine Point 2.1）：
  - **完全随机缺失（MCAR）**：适用于边际随机实验（\(\Pr[A=a \mid L, Y^a] = \Pr[A=a]\)）。
  - **随机缺失（MAR）**：适用于条件随机实验（\(\Pr[A=a \mid L, Y^a] = \Pr[A=a \mid L]\)）。

---

#### **2.3 标准化（Standardization）**
**技术重点**：
1. **标准化方法**：
   - **目标**：在条件随机化下估计总体平均因果效应（如\(\Pr[Y^{a=1} = 1]\)）。
   - **步骤**：
     1. 计算层别特定风险：\(\Pr[Y = 1 \mid L = l, A = a]\)。
     2. 按\(L\)的分布加权平均：
        \[
        \Pr[Y^a = 1] = \sum_l \Pr[Y = 1 \mid L = l, A = a] \cdot \Pr[L = l]
        \]
   - **可识别性（Identifiability）**：在条件可交换性和正值性（positivity）下成立。

2. **因果风险比计算**：
   \[
   \text{Causal Risk Ratio} = \frac{\sum_l \Pr[Y = 1 \mid L = l, A = 1] \Pr[L = l]}{\sum_l \Pr[Y = 1 \mid L = l, A = 0] \Pr[L = l]}
   \]
   - **表2.2示例结果**：\(\Pr[Y^{a=1} = 1] = \Pr[Y^{a=0} = 1] = 0.5\)，因果风险比=1。

**细节要点**：
- **风险时期（Risk Period）**（Fine Point 2.2）：因果效应依赖于风险期定义（如5天死亡率 vs. 100年死亡率）。

---

#### **2.4 逆概率加权（Inverse Probability Weighting, IP Weighting）**
**技术重点**：
1. **IP加权原理**：
   - **权重定义**：\(W^A = 1 / f[A \mid L]\)，其中\(f[A \mid L]\)为给定\(L\)时\(A\)的条件概率密度。
   - **伪总体（Pseudo-population）**：通过加权创建新人群，其中\(L \perp\!\!\!\perp A\)，实现边际可交换性（图2.3）。
   - **因果效应估计**：伪总体中的关联度量等于原始总体的因果效应。

2. **计算步骤**（以表2.2为例）：
   - 非危重组（\(L=0\)）未处理者权重：\(1 / \Pr[A=0 \mid L=0] = 1/0.5 = 2\)。
   - 危重组（\(L=1\)）处理者权重：\(1 / \Pr[A=1 \mid L=1] = 1/0.75 \approx 1.33\)。
   - 伪总体中\(\Pr[Y^{a=0} = 1] = \Pr[Y^{a=1} = 1] = 0.5\)，因果风险比=1。

**细节要点**：
- **与标准化的等价性**（Technical Point 2.3）：
  - 在离散处理、正值性下，IP加权均值等于标准化均值：
    \[
    E\left[\frac{I(A=a) Y}{f[A \mid L]}\right] = \sum_l E[Y \mid A=a, L=l] \Pr[L=l]
    \]
  - 连续处理需额外假设（第12章讨论）。

---

### **结论**
1. **随机化实验的核心优势**：通过随机分配（边际或条件）实现可交换性，使关联度量等于因果效应。
2. **分析方法**：
   - **标准化**：按协变量分层后加权平均。
   - **IP加权**：通过逆概率权重构建伪总体。
   - 二者数学等价，均需条件可交换性和正值性。
3. **实际限制**：随机化实验常因伦理、可行性问题（如心脏分配）难以实施，需转向观察性研究（后续章节）。

> **关键公式总结**：
> - 可交换性：\(Y^a \perp\!\!\!\perp A\)
> - 标准化：\(\Pr[Y^a = 1] = \sum_l \Pr[Y=1 \mid L=l, A=a] \Pr[L=l]\)
> - IP权重：\(W^A = 1 / f[A \mid L]\)