---
date: 2025-09-17 11:19:05
title: Chapter_4
category: Causal inference
tags: [DeepSeek-R1-0528,response_md]

---
<think>
We are summarizing Chapter 4: "Effect Modification" from the provided text.
 The chapter has several sections: 4.1 Heterogeneity of treatment effects, 4.2 Stratification to identify effect modification, 4.3 Why care about effect modification, 4.4 Stratification as a form of adjustment, 4.5 Matching as another form of adjustment, 4.6 Effect modification and adjustment methods.
 We also have Fine Points and Technical Points that provide additional details.

 We will structure the summary by sections and subsections, extracting technical points and fine points as needed.

 Note: The text includes tables and examples. We will summarize the key points from the text, including definitions, formulas, and examples.

 Steps:
 1. Identify the chapter and sections.
 2. For each section, extract:
    - Technical Points: core theories, key formulas, important concepts.
    - Fine Points: details, examples, additional explanations.
 3. Use the required format: Markdown, with LaTeX for formulas, and use the section headings as given.

 Important: We must base everything on the provided text and avoid adding any content.

 Let's break down the chapter:

 Chapter 4: Effect Modification

 4.1 Heterogeneity of treatment effects
   - Introduces the idea that average causal effects can vary across subgroups (defined by variable V).
   - Example: Heart transplant effect on death differs between men and women (from Table 4.1).
   - Definition: V is an effect modifier if the average causal effect of A on Y varies across levels of V.
   - Effect modification depends on the effect measure (e.g., risk difference, risk ratio).
   - Qualitative effect modification: when effects are in opposite directions in different subgroups.

 4.2 Stratification to identify effect modification
   - Stratified analysis: compute effect in each stratum of V.
   - In ideal randomized experiments (marginal or conditional), we can use observed data to compute causal effects in strata.
   - Example: Using Table 4.2 to compute effect of transplant on death in Greeks and Romans (with adjustment for L via standardization or IP weighting).

 4.3 Why care about effect modification
   - Reasons: 
        a) The average causal effect depends on the population's mix of effect modifiers (transportability).
        b) Helps identify subgroups that benefit most (especially on additive scale).
        c) May provide insights into biological or social mechanisms.
   - Distinction between effect modification and interaction (the latter is causal and discussed in next chapter).

 4.4 Stratification as a form of adjustment
   - Stratification can be used for adjustment (for L) and for identifying effect modification (by V).
   - Contrast with standardization and IP weighting: stratification gives conditional effects (in strata of L) while standardization and IP weighting can give marginal effects.
   - When using stratification for adjustment requires considering all variables L for exchangeability.

 4.5 Matching as another form of adjustment
   - Matching: create a subset where L has same distribution in treated and untreated.
   - Example: matched pairs based on L.
   - Matching can be used to estimate effects in specific subgroups (e.g., effect in the untreated).

 4.6 Effect modification and adjustment methods
   - Different methods (standardization, IP weighting, stratification, matching) estimate different types of effects (marginal vs. conditional in subsets).
   - Example with Table 4.3: different effect measures (risk ratios) from different methods due to effect modification.

 We also have Fine Points and Technical Points:

 Fine Point 4.1: Effect in the treated
   - Defines the average causal effect in the treated and in the untreated.

 Fine Point 4.2: Transportability
   - Discusses when causal effects can be transported to other populations.

 Fine Point 4.3: Collapsibility and the odds ratio
   - Explains that the odds ratio is noncollapsible (population odds ratio may not be a weighted average of stratum-specific odds ratios).

 Technical Point 4.1: Computing the effect in the treated
   - Formulas for computing the effect in the treated via standardization and IP weighting.

 Technical Point 4.2: Pooling of stratum-specific effect measures
   - Discusses pooling methods (e.g., Mantel-Haenszel) and when they are appropriate.

 Technical Point 4.3: Relation between marginal and conditional causal risk ratios
   - Mathematical relation for the risk ratio.

 We will now write the summary in the required format.
</think>
### Chapter 4: Effect Modification

#### 4.1 Heterogeneity of treatment effects  
**技术重点（Technical Points）**:  
- **核心理论**: 因果效应在总体中可能为零，但在子群体中非零（如性别分层）。效应修饰（effect modification）指处理效应随变量 \(V\) 水平变化而变化的现象。  
- **关键公式**:  
  - 因果风险差（Additive scale）:  
    $$E[Y^{a=1} - Y^{a=0} | V = v]$$  
  - 因果风险比（Multiplicative scale）:  
    $$\frac{E[Y^{a=1} | V = v]}{E[Y^{a=0} | V = v]}$$  
- **重要概念**:  
  - 定性效应修饰（Qualitative effect modification）: 子群体效应方向相反（如女性有害，男性有益）。  
  - 效应修饰依赖于效应尺度（如风险差或风险比）。  
- **应用场景**: 评估处理（如心脏移植）在子群体（如性别分组）中的异质性效应。  

**细节要点（Fine Points）**:  
- 表4.1示例: 心脏移植在女性中风险差为0.2（有害），男性中为-0.2（有益），总体效应为零（因效应抵消）。  
- 非定性效应修饰示例: 当风险差相同（0.1）但风险比不同（1.1 vs. 2.0）时，存在乘性而非加性效应修饰。  
- 术语: "效应修饰"强调依赖效应尺度，故建议用"效应测量修饰"（effect-measure modification）)。  

#### 4.2 Stratification to identify effect modification  
**技术重点（Technical Points）**:  
- **核心理论**: 分层分析是识别效应修饰的标准方法，需在 \(V\) 的每一层内计算因果效应。  
- **关键公式**: 分层因果风险差:  
  $$\Pr[Y^{a=1} = 1 | V = v] - \Pr[Y^{a=0} = 1 | V = v]$$  
- **重要概念**:  
  - 理想随机试验中，观测关联等于因果效应（无需反事实数据）。  
  - 条件随机化实验需标准化或IP加权调整混杂 \(L\)。  
- **应用场景**: 国籍（\(V\)）修饰心脏移植（\(A\)）对死亡（\(Y\)）的效应（希腊人风险比=1，罗马人风险比=2）。  

**细节要点（Fine Points）**:  
- 表4.2示例: 罗马人数据中，通过标准化调整 \(L\) 后，国籍修饰移植效应（风险差0.3）。  
- 区分: 国籍可能是"代理效应修饰因子"（如反映手术质量差异），而非"因果效应修饰因子"。  

#### 4.3 Why care about effect modification  
**技术重点（Technical Points）**:  
- **核心理论**: 因果效应依赖群体中效应修饰因子的分布，无普适"平均因果效应"。  
- **重要概念**:  
  - 可移植性（Transportability）: 效应修饰因子分布不同的群体间效应不可直接外推。  
  - 决策应用: 加性尺度效应修饰识别最受益亚组（如仅治疗有益子群体）。  
- **应用场景**: 政策制定（如全国性干预 vs. 目标亚组干预）。  

**细节要点（Fine Points）**:  
- 定性效应修饰示例: 女性比例增加时，总体效应从零变为有害。  
- 报告建议: 优先报告反事实风险（\(\Pr[Y^a | V=v]\)）而非仅效应量（如风险比）。  

#### 4.4 Stratification as a form of adjustment  
**技术重点（Technical Points）**:  
- **核心理论**: 分层可作为调整混杂 \(L\) 的方法，但输出条件效应（各 \(L\) 层内），非边际效应。  
- **重要概念**:  
  - 与标准化/IP加权对比: 后者可计算边际效应，前者强制评估 \(L\) 的效应修饰。  
  - 正性要求（Positivity）: 层内需同时存在处理组和对照组。  
- **应用场景**: 限制分析（Restriction）用于正性违反正的亚组。  

**细节要点（Fine Points）**:  
- 实践误区: 流行病学家常误将"分层"等同于"调整"。  
- 局限性: 分层无法处理时变处理或存在中介时的混杂。  

#### 4.5 Matching as another form of adjustment  
**技术重点（Technical Points）**:  
- **核心理论**: 匹配通过构建处理组/对照组 \(L\) 分布相似的子集实现交换性。  
- **重要概念**:  
  - 匹配类型: 个体匹配（individual matching）或频率匹配（frequency matching）。  
  - 效应估计: 通常计算"未治疗者效应"或"治疗者效应"。  
- **应用场景**: 队列研究中平衡混杂因子（如心脏移植示例按病情 \(L\) 匹配）。  

**细节要点（Fine Points）**:  
- 匹配后群体: 效应修饰因子分布可能不同于原始群体。  
- 病例对照设计: 需额外调整匹配因子以实现条件交换性。  

#### 4.6 Effect modification and adjustment methods  
**技术重点（Technical Points）**:  
- **核心理论**: 不同方法估计不同效应：  
  - 标准化/IP加权 → 边际效应。  
  - 分层/匹配 → 条件效应（特定亚组）。  
- **关键公式**: 表4.3示例中不同方法的风险比:  
  - 标准化: 0.8（总体）  
  - 分层: \(L=0\) 层2.0, \(L=1\) 层0.5  
  - 匹配: 未治疗者1.0  
- **重要概念**: 非塌陷性（Noncollapsibility）: 比值比（odds ratio）在层内可能大于总体（见Fine Point 4.3）。  

**细节要点（Fine Points）**:  
- 表4.4示例: 高海拔（\(A\)）对抑郁（\(Y\)）的因果比值比总体为5.4，但男女层内均为6（非塌陷性）。  
- 实践意义: 明确目标群体（如总体或亚组）可避免方法间结果差异的误解。  

---

### Fine Points & Technical Points  
#### Fine Point 4.1: Effect in the treated  
- **技术重点**:  
  - 定义: 治疗者效应为 \(\Pr[Y=1|A=1] \neq \Pr[Y^{a=0}=1|A=1]\)。  
  - 标准化公式:  
    $$E[Y^a | A=a'] = \sum_l E[Y|A=a,L=l] \Pr[L=l|A=a']$$  

#### Fine Point 4.2: Transportability  
- **技术重点**:  
  - 可移植性依赖: 效应修饰因子分布、治疗版本、干扰模式的一致性。  
  - 改进方法: 用研究群体层效应重构目标群体效应（权重为层比例）。  

#### Fine Point 4.3: Collapsibility and the odds ratio  
- **技术重点**:  
  - 非塌陷性: 比值比在层内可大于总体（如层内6.0 vs. 总体5.4）。  
  - 例外: 稀有结局（<10%）时比值比近似风险比且可塌陷。  

#### Technical Point 4.1: Computing the effect in the treated  
- **公式**:  
  - IP加权:  
    $$E[Y^a | A=a'] = \frac{E\left[ \frac{I(A=a)Y}{f(A|L)} \Pr[A=a'|L] \right]}{E\left[ \frac{I(A=a)}{f(A|L)} \Pr[A=a'|L] \right]}$$  

#### Technical Point 4.2: Pooling of stratum-specific effect measures  
- **核心理论**: 若无效应修饰，合并层效应（如Mantel-Haenszel）可提高估计精度。  

#### Technical Point 4.3: Relation between marginal and conditional risk ratios  
- **公式**:  
  - 边际风险比与条件风险比关系:  
    $$\frac{\Pr[Y^{a=1}=1]}{\Pr[Y^{a=0}=1]} = \sum_l \left( \frac{\Pr[Y^{a=1}=1|L=l]}{\Pr[Y^{a=0}=1|L=l]} \right) w(l)$$  
    $$w(l) = \frac{\Pr[Y^{a=0}=1|L=l] \Pr[L=l]}{\Pr[Y^{a=0}=1]}$$  

---  
**逻辑连贯性**: 本章扩展前三章单群体因果效应至子群体分析，强调效应修饰概念，为第五章"交互作用"铺垫。所有方法（标准化、IP加权、分层、匹配）均需交换性和正性，但目标效应（边际/条件）决定方法选择。