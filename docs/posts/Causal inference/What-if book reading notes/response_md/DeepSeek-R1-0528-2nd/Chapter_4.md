---
title: Chapter_4
category: Causal inference
tags: [DeepSeek-R1-0528-2nd,response_md]

---
<think>
We are summarizing Chapter 4: "Effect Modification" from the provided text.
 The chapter has several sections: 4.1 Heterogeneity of treatment effects, 4.2 Stratification to identify effect modification, 4.3 Why care about effect modification, 4.4 Stratification as a form of adjustment, 4.5 Matching as another form of adjustment, 4.6 Effect modification and adjustment methods.
 We also have Fine Points and Technical Points that are part of the chapter.

 We'll structure the summary by sections and subsections as per the chapter.

 Note: The chapter starts by emphasizing that the causal effect can vary across subsets of the population, and introduces the concept of effect modification.

 Steps:
 1. We'll go through each section and extract the key points.
 2. We'll note the tables and examples used, but since we cannot see the images, we'll rely on the text descriptions.
 3. We'll use the required format: Technical Points and Fine Points.

 Important: We must base everything on the provided text and not add any external knowledge.

 Let's break down the chapter:

 4.1 Heterogeneity of treatment effects:
    - Uses the heart transplant example (Table 4.1) to show that the average causal effect in the entire population was null, but when stratified by sex (V=1 for women, V=0 for men), the effect was harmful in women (causal risk ratio 1.5, risk difference 0.2) and beneficial in men (causal risk ratio 2/3, risk difference -0.2).
    - Defines effect modifier: V is a modifier of the effect of A on Y when the average causal effect of A on Y varies across levels of V.
    - Effect modification depends on the effect measure (e.g., risk difference, risk ratio).
    - Qualitative effect modification: when the effects are in opposite directions in different strata (as in the example).

 4.2 Stratification to identify effect modification:
    - Stratified analysis: compute the effect in each stratum of V.
    - In ideal marginally randomized experiments, the causal effect in a stratum can be estimated by the associational measure in that stratum because of exchangeability within strata.
    - In conditionally randomized experiments (or observational studies with conditional exchangeability), we need to adjust for L (confounders) within each stratum of V. The procedure: stratify by V and then standardize (or use IP weighting) by L in each stratum.
    - Example: Greeks (V=1) and Romans (V=0). After adjustment, found effect modification by nationality (different causal risk differences and ratios).
    - Distinguishes between surrogate effect modifier (e.g., nationality) and causal effect modifier (e.g., quality of care).

 4.3 Why care about effect modification:
    - Reasons: 
        a) The average causal effect depends on the distribution of effect modifiers in the population (transportability issue).
        b) To identify groups that benefit most (especially with qualitative effect modification).
        c) Additive effect modification is more relevant for public health decisions than multiplicative (unless multiplicative implies additive).
        d) May provide insights into biological or social mechanisms.
    - Note: Effect modification is different from interaction (to be discussed in next chapter).

 4.4 Stratification as a form of adjustment:
    - Stratification is often used to adjust for confounders L (by computing effect in each stratum of L) but this yields conditional effects (in subsets defined by L) not the marginal effect in the entire population.
    - To get the marginal effect, we need standardization or IP weighting.
    - Stratification for adjustment forces evaluation of effect modification by L, even if not interested.

 4.5 Matching as another form of adjustment:
    - Matching constructs a subset (matched population) where L has the same distribution in treated and untreated.
    - In the matched population, we can compute the effect (e.g., in the treated or untreated) and it ensures exchangeability and positivity in that subset.
    - The effect is conditional on the matched population (which may have a different distribution of effect modifiers).

 4.6 Effect modification and adjustment methods:
    - Different methods estimate different types of causal effects: 
        - Standardization and IP weighting: can estimate marginal or conditional effects.
        - Stratification/restriction and matching: only conditional effects (in subsets).
    - Example with outcome Z (high blood pressure) shows different effect measures (0.8, 2.0, 0.5, 1.0) because they are defined for different populations (entire population, L=0, L=1, untreated).
    - Emphasizes the importance of specifying the target population.

 Also, we have Fine Points and Technical Points:
   - Fine Point 4.1: Effect in the treated (and untreated). Defines the effect in the treated (using partial exchangeability) and notes it may differ from the population effect.
   - Fine Point 4.2: Transportability. Discusses when effects can be transported to another population (similarity in effect modifiers, versions of treatment, interference).
   - Fine Point 4.3: Collapsibility and the odds ratio. Explains that the odds ratio is noncollapsible (the population odds ratio can be closer to null than stratum-specific ones even under exchangeability).
   - Technical Point 4.1: Computing the effect in the treated. Formulas via standardization and IP weighting.
   - Technical Point 4.2: Pooling of stratum-specific effect measures. Discusses methods (e.g., Mantel-Haenszel) and cautions.
   - Technical Point 4.3: Relation between marginal and conditional causal risk ratios. Formula for when the risk ratio in the population is less than 1.

 We'll structure the chapter summary by sections and include the Fine Points and Technical Points in their respective sections or as separate subsections.

 Since the chapter is long, we'll break the summary by sections and use the required markdown format.

 Note: We are to use LaTeX for formulas.

 Let's start:
</think>
### Chapter 4: EFFECT MODIFICATION

#### 4.1 Heterogeneity of treatment effects
**子章节内容**  
本章通过心脏移植案例（表4.1）说明总体平均因果效应为零（风险比=1，风险差=0），但在性别分层分析中，治疗对女性有害（风险比=1.5，风险差=0.2），对男性有益（风险比=2/3，风险差=-0.2）。这证明因果效应存在异质性：总体零效应可能掩盖子群体中的非零效应。定性效应修正（qualitative effect modification）指效应方向在不同子群体中相反（如本例）。

**技术重点（Technical Points）**  
- **核心理论**：效应修正（effect modification）指变量 \(V\) 使处理 \(A\) 对结局 \(Y\) 的平均因果效应随 \(V\) 的水平变化。定义要求 \(V\) 不受 \(A\) 影响。  
- **关键公式**：  
  - 加性尺度效应修正：\(E[Y^{a=1} - Y^{a=0} | V=1] \neq E[Y^{a=1} - Y^{a=0} | V=0]\)  
  - 乘性尺度效应修正：\(\frac{E[Y^{a=1}|V=1]}{E[Y^{a=0}|V=1]} \neq \frac{E[Y^{a=1}|V=0]}{E[Y^{a=0}|V=0]}\)  
- **重要概念**：  
  - 效应修正的存在依赖于效应测量尺度（如风险差 vs. 风险比）。  
  - 定性效应修正（方向相反）隐含加性和乘性修正；非定性修正可能仅存在于单一尺度。  
- **应用场景**：评估处理效应在子群体（如性别、种族）中的异质性。

**细节要点（Fine Points）**  
- **案例分析**：心脏移植总体效应为零，但女性风险增加20%，男性风险降低20%，源于效应方向相反且性别比例均衡（50%）。  
- **辅助信息**：当"无因果效应"的尖锐零假设成立时，效应异质性不存在。  
- **相关背景**：术语"效应测量修正"（effect-measure modification）强调对尺度选择的依赖性。

---

#### 4.2 Stratification to identify effect modification
**子章节内容**  
分层分析是识别效应修正的核心方法：在 \(V\) 的每一层内计算 \(A\) 对 \(Y\) 的效应。在边际随机化实验中，层内关联性度量等于因果效应；在条件随机化或观察性研究中，需额外调整混杂因子 \(L\)（通过标准化或IP加权）。国籍 \(V\) 的案例显示其为效应修正的代理（非因果），实际修正因子可能是医疗质量。

**技术重点（Technical Points）**  
- **核心理论**：分层分析通过计算 \(V\) 各层内的因果效应识别效应修正。  
- **关键公式**：条件随机化下，层 \(v\) 的因果风险需两阶段计算：  
  1. 按 \(V\) 分层  
  2. 在层内标准化或IP加权调整 \(L\)  
- **重要概念**：  
  - 代理效应修正因子（如国籍）与因果效应修正因子（如医疗质量）的区分。  
  - 当 \(V = L\)（混杂因子）时，调整可省略。  
- **应用场景**：随机化实验或观察性研究中效应修正的检测。

**细节要点（Fine Points）**  
- **案例分析**：希腊人（\(V=1\)）的因果风险差为0，罗马人（\(V=0\)）为0.3，存在非定性效应修正。  
- **辅助信息**：国籍是医疗质量的代理修正因子，干预医疗质量可消除修正效应。  
- **相关背景**：部分文献用"效应异质性"替代"效应修正"以避免因果暗示。

---

#### 4.3 Why care about effect modification
**子章节内容**  
关注效应修正的原因：  
1. **可移植性（Transportability）**：效应依赖于群体中修正因子的分布（如女性比例更高时，心脏移植总体效应变为有害）。  
2. **目标干预**：识别最受益群体（如定性修正时仅治疗男性）。  
3. **机制理解**：提供生物学/社会机制线索（如包皮环切对HIV感染的影响）。  
4. **尺度选择**：加性修正（非乘性）对公共卫生决策更相关。

**技术重点（Technical Points）**  
- **核心理论**：群体平均因果效应取决于个体因果效应的分布，无普适"唯一效应"。  
- **重要概念**：  
  - 可移植性要求群体间修正因子分布、治疗版本和干扰模式相似。  
  - 报告反事实风险（\(Pr[Y^a=1|V=v]\)）比风险比/差更信息丰富。  
- **应用场景**：政策制定（如靶向干预）、跨群体研究结果推广。

**细节要点（Fine Points）**  
- **案例分析**：石棉暴露效应在吸烟/非吸烟者中不同，全民医保效应在收入群体中不同。  
- **辅助信息**：伞兵试验（Smith and Pell 2003）未发现重大效应修正因子，结果可跨群体推广。  
- **相关背景**：可移植性依赖领域知识（如尼日尔与荷兰的收入效应不可比）。

---

#### 4.4 Stratification as a form of adjustment
**子章节内容**  
分层可作为调整混杂因子 \(L\) 的方法，但仅生成条件效应（如 \(L=0\) 或 \(L=1\) 子群体的效应），而非总体效应。标准化或IP加权可计算边际效应。分层强制评估 \(L\) 的效应修正，可能导致非折叠性问题（如比值比）。

**技术重点（Technical Points）**  
- **核心理论**：分层调整通过计算 \(L\) 各层内的关联度量实现，要求层内可交换性和正值性。  
- **重要概念**：  
  - 条件效应度量（层内） vs. 边际效应度量（总体）。  
  - 无效应修正时，各方法效应度量相等；存在时则不同。  
- **应用场景**：观察性研究中混杂调整。

**细节要点（Fine Points）**  
- **案例分析**：表2.2中，\(L\) 分层风险比均为1，与边际风险比一致（无 \(L\) 的效应修正）。  
- **辅助信息**：限制（restriction）是分层的特例（仅分析部分层）。  
- **相关背景**：时间依存处理中，分层可能因调整时间依存混杂因子引入偏倚。

---

#### 4.5 Matching as another form of adjustment
**子章节内容**  
匹配通过构建处理组/对照组中 \(L\) 分布相似的子群体（如个体匹配或频率匹配）估计条件效应（如"在未治疗者中的效应"）。匹配确保子群体内可交换性和正值性，但效应仅适用于匹配群体（分布可能与原群体不同）。

**技术重点（Technical Points）**  
- **核心理论**：匹配构造子群体，使 \(L\) 在处理/对照组分布相同。  
- **重要概念**：  
  - 效应估计目标：未治疗者（若未治疗者少）或治疗者（若治疗者少）。  
  - 匹配群体中效应修正因子分布可能偏移。  
- **应用场景**：队列研究中减少混杂偏倚。

**细节要点（Fine Points）**  
- **案例分析**：心脏移植数据中，匹配对（如Rheia-Hestia）的死亡风险在处理/未处理组均为3/7，风险比=1。  
- **辅助信息**：病例对照设计中需额外调整匹配因子。  
- **相关背景**：多变量匹配时，近似匹配算法（如倾向评分）解决无精确匹配问题。

---

#### 4.6 Effect modification and adjustment methods
**子章节内容**  
不同方法估计不同类型效应：  
- **标准化/IP加权**：可估计边际或条件效应。  
- **分层/匹配**：仅估计子群体条件效应。  
高血圧结局 \(Z\) 的案例显示不同方法结果不同（风险比：0.8总体, 2.0非危重, 0.5危重, 1.0未治疗者），源于目标群体差异。强调明确定义因果问题（目标群体）的重要性。

**技术重点（Technical Points）**  
- **核心理论**：效应度量差异源于目标群体定义（非方法优劣）。  
- **关键公式**：边际风险比与条件风险比的关系：  
  \[
  \frac{Pr[Y^{a=1}=1]}{Pr[Y^{a=0}=1]} = \sum_l \left( \frac{Pr[Y^{a=1}=1|L=l]}{Pr[Y^{a=0}=1|L=l]} \right) w(l)
  \]  
  其中 \(w(l) = \frac{Pr[Y^{a=0}=1|L=l] Pr[L=l]}{Pr[Y^{a=0}=1]}\)。  
- **重要概念**：非折叠性（noncollapsibility）：比值比在群体度量可能比层间度量更接近无效值（即使可交换性成立）。  
- **应用场景**：方法选择应匹配科学问题（如目标群体效应 vs. 子群体效应）。

**细节要点（Fine Points）**  
- **案例分析**：表4.4中，搬家对抑郁的因果比值比总体为5.4，但男性/女性层均为6（非折叠性示例）。  
- **辅助信息**：比值比在罕见结局或尖锐零假设下近似可折叠。  
- **相关背景**：Meta分析需处理效应异质性问题（Dahabreh et al. 2020a）。

---

### 逻辑关联性  
本章延续前几章因果效应识别框架，引入效应修正概念，强调因果效应的群体依赖性。与第3章可交换性/正值性结合，为第5章"交互作用"奠定基础。分层分析技术（第2章标准化/IP加权）在本章扩展至效应修正检测，衔接后续观察性研究方法（第II部分）。