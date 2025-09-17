---
title: Chapter_10
category: Causal inference
tags: [DeepSeek-R1-0528-1st,response_md]

---
<think>
Hmm, the user has shared a lengthy chapter from "Causal Inference: What If" about random variability in causal inference. They want me to extract all technical points and details while preserving the structure. This is a meticulous task requiring careful attention to every concept and formula.

I notice this chapter covers several complex topics: the distinction between identification and estimation, super-population concepts, confidence intervals, conditionality principle, and the curse of dimensionality. The user specifically wants me to:
- Preserve all technical details without subjective interpretation
- Maintain the chapter's logical structure
- Use LaTeX for formulas
- Keep English technical terms alongside Chinese translations

The chapter begins with a vivid example about pedestrians looking up, illustrating how small sample sizes can distort effect estimates. This leads into the core distinction between systematic bias and random variability. I should carefully extract all key definitions: estimand, estimator, point estimate, and the properties of consistent estimators.

For the statistical concepts, I need to precisely capture:
- How confidence intervals are constructed (Wald intervals)
- The meaning of calibrated, conservative and valid intervals
- The frequentist interpretation versus Bayesian credible intervals
- The concept of honest confidence intervals from Fine Point 10.1

The super-population discussion is particularly nuanced. I must clearly present both scenarios where binomial confidence intervals apply, and why Scenario 2 is generally unrealistic. The "myth" aspect is important - how this conceptual tool helps despite being fictional in most studies.

The conditionality principle section contains crucial debates about adjustment. I should highlight:
- The randomized experiment example with smoking covariate
- Why adjusted estimators are preferred when covariates are few
- The formal definition of S-ancillary statistics
- How most researchers implicitly follow this principle

Finally, the curse of dimensionality section presents the critical limitation - when too many covariates make adjustment impractical. This transitions into Part II about model-based solutions, which I'll note but not expand on as it's beyond this chapter.

Throughout, I'll maintain the original section numbering and include all technical points, formulas, and fine points exactly as presented, while adding Chinese translations for technical terms where appropriate. The tables and images will be referenced but not reproduced since the user provided text extracts only.
</think>
### 第10章 随机变异性 (RANDOM VARIABILITY)
#### **核心概念**
1. **系统偏倚 vs. 随机变异性**  
   - 因果推断错误的两大原因：  
     - **系统偏倚**（混杂、选择偏倚、测量偏倚）  
     - **随机变异性**（小样本导致的偶然变异）  
   - 随机变异性在小样本中会稀释效应估计（如盲人行人例子：处理组50%个体对处理无反应）。

2. **识别 (Identification) vs. 估计 (Estimation)**  
   - **识别**：在无限大研究人群中计算因果效应（忽略随机变异），需满足：  
     - 可交换性 (Exchangeability)  
     - 正值性 (Positivity)  
     - 一致性 (Consistency)  
   - **估计**：在有限样本中推断超总体 (super-population) 参数，需处理随机变异。

---

#### **10.1 识别与估计**
##### **技术要点 (Technical Points)**
1. **估计目标与估计量**  
   - **估计目标 (Estimand)**：超总体参数（如 $Pr[Y=1|A=a]$）。  
   - **估计量 (Estimator)**：从样本数据计算估计目标的规则（如样本比例 $\widehat{Pr}[Y=1|A=a]$）。  
   - **估计值 (Estimate)**：特定样本的数值结果（如 $7/13$）。  

2. **一致性 (Consistency)**  
   - 当样本量 $n \to \infty$ 时，估计量收敛于估计目标：  
     $$
     \lim_{n \to \infty} Pr\left( \left| \widehat{Pr}[Y=1|A=a] - Pr[Y=1|A=a] \right| > \epsilon \right) = 0
     $$

3. **置信区间 (Confidence Intervals)**  
   - **Wald 95% 置信区间**：  
     $$
     \hat{\theta} \pm 1.96 \cdot \widehat{se}(\hat{\theta})
     $$
     其中 $\widehat{se}(\hat{\theta})$ 是标准误估计值（如二项分布标准误 = $\sqrt{\frac{\hat{p}(1-\hat{p})}{n}}$）。  
   - **性质**：  
     - **校准 (Calibrated)**：覆盖真实参数的概率为95%。  
     - **保守 (Conservative)**：覆盖概率 >95%。  
     - **有效 (Valid)**：覆盖概率至少95%（校准或保守）。  
   - **频率学派解释**：置信区间不表示参数位于区间内的概率，而是重复抽样中覆盖参数的频率。  

4. **诚实区间 (Honest Intervals)**  
   - 要求存在样本量 $n$，使得无论参数真实值如何，覆盖概率至少95%（Robins & Ritov, 1997）。  

---

#### **10.2 因果效应估计**
##### **技术要点**
1. **随机试验中的估计**  
   - 超总体中满足可交换性时：  
     - 因果风险差 $Pr[Y^{a=1}=1] - Pr[Y^{a=0}=1] = Pr[Y=1|A=1] - Pr[Y=1|A=0]$。  
     - 样本风险差 $\widehat{Pr}[Y=1|A=1] - \widehat{Pr}[Y=1|A=0]$ 是无偏估计量。  

2. **置信区间计算**  
   - 风险差：$(7/13) - (3/7)$  
   - 风险比：$(7/13)/(3/7)$  
   - 标准化、IP加权等方法适用于观察性研究。  

3. **随机化推断 (Randomization-Based Inference)**  
   - 若仅研究样本随机化（无超总体），需考虑样本内偶然混杂。  

---

#### **10.3 超总体迷思 (The Myth of the Super-Population)**
##### **细节要点 (Fine Points)**
1. **二项置信区间的两种场景**  
   - **场景1**：研究样本来自无限超总体（隐含假设）。  
   - **场景2**：个体有相同反事实概率 $p_i^{a=1} = p$（现实中不成立，因个体风险异质性）。  
   - **结论**：报告二项置信区间者默认场景1。  

2. **超总体的作用**  
   - **优点**：简化统计方法，便于推广 (generalization)。  
   - **局限**：超总体是虚构概念；置信区间解释为反事实陈述 ("what-if")。  

---

#### **10.4 条件性原则 (The Conditionality Principle)**
##### **技术要点**
1. **协变量调整的必要性**  
   - **例子**：随机试验中偶然出现吸烟 ($L$) 与处理 ($A$) 相关（表10.2）。  
     - 未调整风险差：$-0.15$  
     - 分层调整后风险差：$0$（各层无效应）。  
   - **条件性原则**：应以辅助统计量（如 $L-A$ 关联）为条件进行推断。  

2. **辅助统计量 (Ancillary Statistic)**  
   - **精确辅助统计量**：分布已知且不影响目标参数（如随机试验中 $A$ 和 $L$ 的联合分布）。  
   - **调整估计量优势**：  
     - 条件无偏 (Conditionally unbiased)。  
     - 无条件更高效 (Unconditionally efficient)。  

##### **技术点 10.4 (Technical Point 10.4)**  
- 当 $L$ 是 $Y$ 的风险因子时，调整估计量 (如 MLE) 优于未调整估计量：  
  $$
  \text{aVar}(\widehat{RD}_{MLE}) = \text{aVar}(\widehat{RD}_{UN}) - \left[ \text{aCov}(S, \widehat{RD}_{UN}) \right]^2
  $$  
  其中 $S$ 量化 $A-L$ 关联。  

---

#### **10.5 维数灾难 (The Curse of Dimensionality)**
##### **技术要点**
1. **高维数据问题**  
   - 当协变量 $L$ 的层数（如 $2^{100}$）远大于样本量（$n=240$）：  
     - 调整后置信区间过宽（如 $[-1, 1]$），失去信息性。  
     - 未调整估计量仍保持较窄区间（如 $[-0.26, -0.04]$）。  

2. **条件性原则的局限**  
   - 协变量较少时：调整估计量更优。  
   - 高维时：严格遵循条件性导致估计不精确。  

##### **技术点 10.6 (Technical Point 10.6)**  
- 解决方案：利用先验信息构建高效无偏估计量（见第18章）。  

---

### **结论 (Conclusions)**
1. **随机变异性**是因果推断的核心挑战，需通过置信区间量化不确定性。  
2. **超总体概念**是简化统计推断的实用工具，但本质是虚构。  
3. **条件性原则**在低维数据中优先选择调整估计量；高维数据需权衡偏差与精度。  
4. **维数灾难**要求发展新方法（如正则化、机器学习），在后续章节讨论。  

> **注**：所有数学公式严格按原义以 $\LaTeX$ 格式呈现，技术术语保留英文并附中文释义（如 **估计目标 (Estimand)**）。