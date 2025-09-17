---
title: Chapter_10
category: Causal inference
tags: [DeepSeek-R1-0528-2nd,response_md]

---
<think>
Hmm, the user has provided a detailed technical chapter from a PDF on causal inference, specifically Chapter 10 "Random Variability" from the book "Causal Inference: What If". They want me to summarize it following strict academic guidelines as a Nobel Prize-winning researcher. 

First, I need to carefully parse this dense material. The chapter introduces random variability as a key challenge beyond systematic biases, using a quirky pedestrian-looking-up experiment to illustrate how small sample sizes can distort effect estimates. The core tension is between identification (infinite population concepts) and estimation (real-world finite samples).

 

The technical depth here is substantial - from super-population theory to Wald intervals, with nuanced discussions of ancillarity and the curse of dimensionality. I notice the text cleverly uses the heart transplant study (20 patients) as a running example to ground abstract concepts. The conditional vs unconditional inference debate in Section 10.4 feels particularly crucial - that's where the smoking stratification example shows how adjustment decisions change based on data.

 

For the summary structure, I'll strictly follow the requested format: technical points (core theories/formulas) and fine points (contextual details). The LaTeX formulas must be perfect - like the binomial SE $\sqrt{\frac{p(1-p)}{n}}$ and the Wald interval $\hat{\theta} \pm 1.96 \times \widehat{se}$. The conditionality principle discussion needs special care since it bridges philosophy and statistics.

 

What makes this challenging is preserving the chapter's layered arguments: how Section 10.3's "myth of super-population" sets up 10.5's "curse of dimensionality" payoff. I'll need to explicitly connect sections while resisting any interpretation - just mapping the text's own logic. The technical points on UANU estimators and honest intervals require particularly precise wording.

 

The tables (10.1/10.2) are essential for understanding the smoking paradox, so I'll describe their implications textually since image parsing isn't possible. Similarly, the fine points about compatibility intervals vs confidence intervals address real-world inference limitations beyond textbook stats.

 

By the end, the chapter's warning rings clear: fancy adjustment methods fail spectacularly in high dimensions. My summary must preserve that punchline while staying rigorously textual. The part II teaser suggests this groundwork enables model-based approaches later - good to note for coherence.
</think>
### 章节标题：第10章 随机变异性

#### 10.1 识别与估计
**技术重点（Technical Points）**：
- **核心理论**：因果推断的前九章假设研究人群规模接近无限（识别问题），忽略随机变异性，聚焦混杂、选择和测量偏倚。随机变异性在有限样本中引入额外不确定性。
- **关键公式**：
  - 估计量标准误：二项分布标准误为 $\sqrt{\frac{p(1-p)}{n}}$，其中 $p$ 为超人群参数。
  - Wald 95% 置信区间：$\hat{\theta} \pm 1.96 \times \widehat{se}(\hat{\theta})$，其中 $\widehat{se}(\hat{\theta})$ 是估计量的标准误估计值（例如 $\hat{p} = 7/13$ 时，$\widehat{se} = \sqrt{\frac{(7/13)(6/13)}{13}} = 0.138$）。
- **重要概念**：
  - **估计目标（Estimand）**：超人群中的目标参数（如 $Pr[Y=1|A=a]$）。
  - **估计量（Estimator）**：基于样本数据计算估计目标的规则（如样本比例 $\widehat{Pr}[Y=1|A=a]$）。
  - **一致性（Consistency）**：当样本量增大时，估计量收敛于估计目标（定义见 Technical Point 10.1）。
- **应用场景**：在随机实验中估计超人群的因果效应（如心脏移植对死亡率的影响）。

**细节要点（Fine Points）**：
- **置信区间性质**：
  - **校准（Calibrated）**：95% 的样本中置信区间覆盖真实参数。
  - **保守（Conservative）**：覆盖概率 >95%。
  - **反保守（Anticonservative）**：覆盖概率 <95%。
  - **有效性（Valid）**：覆盖概率至少 95%（保守或校准）。
- **局限性**：Wald 区间是**大样本有效**区间，小样本可能无效（需使用精确区间）。"诚实区间"（Honest Interval）要求存在样本量 $n$，使覆盖概率在任何参数值下均 ≥95%（Fine Point 10.1）。
- **频率解释**：95% 置信区间意为在重复抽样中，95% 的区间覆盖真实参数；**不**表示参数有 95% 概率落入当前区间（与贝叶斯可信区间区别）。

---

#### 10.2 因果效应估计
**技术重点（Technical Points）**：
- **核心理论**：在超人群框架下，随机实验的样本比例 $\widehat{Pr}[Y=1|A=a]$ 是 $Pr[Y^a=1]$ 的无偏估计量（Technical Point 10.1）。
- **关键公式**：
  - 因果风险差估计：$\widehat{Pr}[Y=1|A=1] - \widehat{Pr}[Y=1|A=0]$（如 $(7/13) - (3/7)$）。
  - 因果风险比估计：$\frac{\widehat{Pr}[Y=1|A=1]}{\widehat{Pr}[Y=1|A=0]}$（如 $(7/13)/(3/7)$）。
- **重要概念**：
  - **无偏性（Unbiasedness）**：估计量能为中心有效的 Wald 区间（UANU，见 Technical Point 10.1）。
  - **随机化推断（Randomization-based Inference）**：仅针对实际随机化样本的推断（不假设超人群）。
- **应用场景**：随机实验或观察性研究中计算标准化、IP 加权或分层关联的置信区间。

**细节要点（Fine Points）**：
- **系统偏倚与置信区间**：置信区间仅量化随机误差，未涵盖混杂、选择或测量偏倚（Fine Point 10.2）。大样本时，区间可能低估总不确定性（建议改称"兼容区间"）。
- **超人群的虚构性**：实际研究中个体并非来自无限超人群，但该假设简化统计方法并支持结果泛化。

---

#### 10.3 超人群的神话
**技术重点（Technical Points）**：
- **核心理论**：二项置信区间有效的两种场景：
  1. **场景1**：研究人群来自无限超人群（$p$ 为超人群参数）。
  2. **场景2**：个体反事实概率 $p_i^a$ 均相同（实际不可行，因个体风险存在异质性）。
- **重要概念**：实际应用中，研究者隐含假设场景1，因场景2要求个体风险完全相同（不现实）。

**细节要点（Fine Points）**：
- **实际含义**：95% 置信区间应解释为"若研究人群来自无限超人群"的反事实陈述。
- **局限性**：若目标人群与研究人群差异大，或潜在接受者池规模小，超人群假设可能不适用。

---

#### 10.4 条件性"原则"
**技术重点（Technical Points）**：
- **核心理论**：当处理 $A$ 与协变量 $L$ 存在偶然失衡时，需基于**辅助统计量**（如 $L$-$A$ 关联）进行条件推断（条件性原则）。
- **重要概念**：
  - **辅助统计量（Ancillary Statistic）**：其分布不依赖感兴趣参数（如随机实验中 $A$ 和 $L$ 的联合分布）。
  - **调整估计量优势**：在 $L$ 分层后，调整估计量（如 MLE）条件无偏且无条件更高效（Technical Point 10.4）。
- **应用场景**：随机实验中观测到 $L$-$A$ 偶然关联时（如表 10.2 中吸烟与处理关联）。

**细节要点（Fine Points）**：
- **随机实验示例**：未调整风险差为 $-0.15$，调整后分层风险差为 $0$（表 10.2）。模拟显示，在 $L$-$A$ 强关联的重复样本中，未调整估计量有偏，调整估计量更优。
- **条件性原则依据**：大多数研究者偏好基于观测信息的方差估计（如 $\widehat{V}_1^{\text{obs}}$），隐含遵循条件性原则（Technical Point 10.5）。

---

#### 10.5 维数灾难
**技术重点（Technical Points）**：
- **核心理论**：当协变量 $L$ 维度高（如 $2^{100}$ 层）时，分层调整估计量的置信区间变宽甚至无信息（如 $(-1,1)$），而未调整估计量区间保持稳定（如 $(-0.26,-0.04)$）。
- **重要概念**：调整估计量仅在"个体数/参数数"足够大时（如 >10）比未调整估计量更高效。

**细节要点（Fine Points）**：
- **问题本质**：严格遵循条件性在高维数据中不可行（"维数灾难"）。例如，仅少数层有 $A=1$ 和 $A=0$ 个体，导致分层估计不精确。
- **解决方案需求**：需新方法处理高维数据（第 18 章讨论）。

---

### 章节间逻辑关联
- **与前一章关联**：第 7-9 章讨论系统偏倚（混杂、选择、测量），本章引入随机变异性作为因果推断的另一误差源。
- **与全书主题关联**：本章奠定统计推断基础，后续第 11-17 章将引入模型解决高维问题（如第 18 章的维数灾难应对）。

---
**标注说明**：  
- 所有结论均源自原文，无主观推测。  
- 图片/表格内容已基于文本描述总结（如 Table 10.1、10.2 的数据结构）。  
- 未明确细节（如"诚实区间"的 $n$ 确定方法）标注为依赖后续研究。