---
title: Chapter 15
category: Causal inference
tags: [Chapter 15,What-if book reading notes]

---
### 总结：Chapter 15 - Outcome Regression and Propensity Scores  
**英文总结**  
This chapter discusses outcome regression and propensity score methods, the most commonly used parametric approaches for causal inference. However, they are presented after IP weighting, standardization, and g-estimation (g-methods) because they are not generally applicable to time-varying treatments and have limitations in complex longitudinal settings. The chapter covers their implementation, assumptions, and pitfalls.  

#### Key Points  
1. **Outcome Regression (Section 15.1)**:  
   - Estimates causal effects by modeling the outcome conditional on treatment \(A\) and covariates \(L\). The structural model is:  
     \[
     E[Y^{a,c=0} | L] = \beta_0 + \beta_1 a + \beta_2 a L + \beta_3 L
     \]  
     where:  
     - \(\beta_1\) and \(\beta_2\) are causal parameters (effect of treatment and effect modification by \(L\)).  
     - \(\beta_0\) and \(\beta_3\) are **nuisance parameters** (no causal interpretation; they describe the baseline outcome mean given \(L\)).  
   - Under exchangeability, positivity, and consistency, parameters are estimated by fitting an outcome regression model:  
     \[
     E[Y | A, C=0, L] = \alpha_0 + \alpha_1 A + \alpha_2 A L + \alpha_3 L
     \]  
     - Correct model specification is critical. If the relationship between \(L\) and \(Y\) is misspecified (e.g., omitting quadratic terms), estimates are biased.  
   - Example: For smoking cessation (\(A\)) on weight gain (\(Y\)), with no product terms, the effect estimate was 3.5 kg (95% CI: 2.6, 4.3).  

2. **Propensity Scores (Section 15.2)**:  
   - The propensity score \(\pi(L) = \Pr[A = 1 | L]\) is the probability of treatment given covariates.  
   - Key property: If \(L\) ensures exchangeability (\(Y^a \perp\!\!\!\perp A | L\)) and positivity, then \(\pi(L)\) also ensures exchangeability (\(Y^a \perp\!\!\!\perp A | \pi(L)\)) and positivity.  
   - \(\pi(L)\) **balances covariates**: Within strata of \(\pi(L)\), the distribution of \(L\) is similar between treated (\(A=1\)) and untreated (\(A=0\)) groups.  
   - Estimated from data (e.g., logistic regression). In the example, \(\pi(L)\) ranged from 0.053 to 0.793.  

3. **Propensity Stratification and Standardization (Section 15.3)**:  
   - **Stratification**: Group individuals by strata of \(\pi(L)\) (e.g., deciles) and estimate the effect within each stratum:  
     \[
     E[Y | A=1, C=0, \pi(L) = s] - E[Y | A=0, C=0, \pi(L) = s]
     \]  
     - Challenges: Continuous \(\pi(L)\) requires discretization; imbalance within strata can bias estimates.  
   - **Standardization**: Fit an outcome regression model conditional on \(\pi(L)\) (e.g., linear or spline terms), then standardize over \(\pi(L)\) to estimate marginal effects:  
     \[
     E[Y^{a=1,c=0}] - E[Y^{a=0,c=0}] = \sum_s \left( E[Y | A=1, C=0, \pi(L)=s] - E[Y | A=0, C=0, \pi(L)=s] \right) \Pr[\pi(L)=s]
     \]  
     - Example: Standardized effect was 3.6 kg (95% CI: 2.7, 4.6).  
   - Validity depends on correct specification of the \(\pi(L)\)-outcome relationship.  

4. **Propensity Matching (Section 15.4)**:  
   - Match treated and untreated individuals with similar \(\pi(L)\) values (e.g., within ±0.05).  
   - The matched population should have balanced \(\pi(L)\) distributions, ensuring approximate exchangeability.  
   - **Issues**:  
     - **Positivity**: Excludes individuals without close matches (e.g., treated with high \(\pi(L)\) if no untreated have similar scores).  
     - **Target population**: The effect estimate applies only to the matched subset, which may be poorly characterized (e.g., defined by \(\pi(L)\) values with overlap), reducing transportability.  
     - Trade-off: Tight matching criteria reduce bias but increase variance; loose criteria may retain imbalance.  

5. **Propensity Models vs. Structural Models vs. Predictive Models (Section 15.5)**:  
   - **Propensity models**: Model \(\Pr[A | L]\); parameters are **nuisance parameters** (no causal interpretation). Used for IP weighting, g-estimation, matching.  
   - **Structural models**: Model counterfactuals (e.g., \(E[Y^a]\) or \(E[Y^a | L]\)); parameters have **causal interpretation** (e.g., treatment effect). Include:  
     - Marginal structural models (e.g., \(E[Y^a] = \beta_0 + \beta_1 a\)).  
     - Structural nested models (e.g., \(E[Y^a - Y^{a=0} | L] = \beta_1 a + \beta_2 a L\)).  
   - **Predictive models**: Focus on association (e.g., \(E[Y | A, L]\) for forecasting); no causal interpretation.  
   - **Critical warning**: Do not use predictive variable selection (e.g., stepwise regression) for causal models. Including unnecessary covariates (e.g., instruments or colliders) can:  
     - Increase variance (e.g., if a covariate strongly predicts \(A\) but is not needed for exchangeability).  
     - Introduce bias (e.g., if a collider is included).  
   - Prioritize flexible specifications (e.g., splines) over predictive performance.  

#### Technical Points Conclusions  
- **Technical Point 15.1: Balancing scores and prognostic scores**:  
  - A **balancing score** \(b(L)\) satisfies \(A \perp\!\!\!\perp L | b(L)\). The propensity score \(\pi(L)\) is a balancing score, and exchangeability given \(L\) implies exchangeability given \(b(L)\).  
  - A **prognostic score** \(s(L)\) satisfies \(Y^{a=0} \perp\!\!\!\perp L | s(L)\), but methods based on prognostic scores require stronger assumptions and are less generalizable to time-varying treatments.  
  - Conclusion: Adjusting for a balancing score (like \(\pi(L)\)) suffices for exchangeability if \(L\) does.  

#### Fine Points Conclusions  
- **Fine Point 15.1: Nuisance parameters**:  
  - In outcome regression, nuisance parameters (e.g., \(\beta_0, \beta_3\)) must be correctly specified for consistent effect estimates. In g-estimation, nuisance parameters are in the treatment model (e.g., \(\Pr[A=1 | L]\)).  
  - Conclusion: Misspecification of nuisance parameters biases estimates. **Doubly robust methods** (e.g., combining outcome and treatment models) are preferred when possible.  
- **Fine Point 15.2: Effect modification and the propensity score**:  
  - Propensity-matched estimates may differ from unmatched estimates due to effect modification by \(\pi(L)\). For example, if untreated individuals are oversampled in matching, the effect in the matched population resembles the effect in the treated.  
  - Conclusion: Effect modification by \(\pi(L)\) complicates interpretation (policy relevance is low as \(\pi(L)\) is not directly actionable). Differences may also stem from residual confounding or positivity violations.  

---

**中文总结**  
本章讨论了结果回归（Outcome Regression）和倾向得分（Propensity Scores），这是因果推断中最常用的参数方法。但由于它们不适用于时变处理（time-varying treatments）且在复杂纵向数据中有限，因此作者在介绍IP加权、标准化和g-估计（g-methods）后才讨论本章内容。  

#### 重点  
1. **结果回归（第15.1节）**:  
   - 通过建立结果变量给定处理 \(A\) 和协变量 \(L\) 的模型来估计因果效应。结构模型为：  
     \[
     E[Y^{a,c=0} | L] = \beta_0 + \beta_1 a + \beta_2 a L + \beta_3 L
     \]  
    其中：  
     - \(\beta_1\) 和 \(\beta_2\) 是因果参数（处理效应和 \(L\) 的效应修正）。  
     - \(\beta_0\) 和 \(\beta_3\) 是**冗余参数**（无因果解释；描述给定 \(L\) 的基线结果均值）。  
   - 在可交换性、正性和一致性假设下，通过拟合结果回归模型估计参数：  
     \[
     E[Y | A, C=0, L] = \alpha_0 + \alpha_1 A + \alpha_2 A L + \alpha_3 L
     \]  
     - 模型正确设定至关重要。若 \(L\) 与 \(Y\) 的关系误设（如省略二次项），估计将有偏。  
   - 示例：戒烟（\(A\)）对体重增加（\(Y\)）的效应，无乘积项时估计为3.5 kg (95% CI: 2.6, 4.3)。  

2. **倾向得分（第15.2节）**:  
   - 倾向得分 \(\pi(L) = \Pr[A = 1 | L]\) 是给定协变量下的处理概率。  
   - 关键性质：若 \(L\) 保证可交换性（\(Y^a \perp\!\!\!\perp A | L\)）和正性，则 \(\pi(L)\) 也保证可交换性（\(Y^a \perp\!\!\!\perp A | \pi(L)\)）和正性。  
   - \(\pi(L)\) **平衡协变量**：在 \(\pi(L)\) 的层内，处理组（\(A=1\)）和对照组（\(A=0\)）的 \(L\) 分布相似。  
   - 需从数据估计（如Logistic回归）。示例中 \(\pi(L)\) 范围0.053至0.793。  

3. **倾向分层与标准化（第15.3节）**:  
   - **分层**：将个体按 \(\pi(L)\) 分层（如十分位数），估计每层效应：  
     \[
     E[Y | A=1, C=0, \pi(L) = s] - E[Y | A=0, C=0, \pi(L) = s]
     \]  
     - 挑战：连续 \(\pi(L)\) 需离散化；层内不平衡可致偏倚。  
   - **标准化**：拟合给定 \(\pi(L)\) 的结果回归模型（如线性或样条项），后标准化以估计边际效应：  
     \[
     E[Y^{a=1,c=0}] - E[Y^{a=0,c=0}] = \sum_s \left( E[Y | A=1, C=0, \pi(L)=s] - E[Y | A=0, C=0, \pi(L)=s] \right) \Pr[\pi(L)=s]
     \]  
     - 示例：标准化效应为3.6 kg (95% CI: 2.7, 4.6)。  
   - 有效性依赖于 \(\pi(L)\)-结果关系的正确设定。  

4. **倾向匹配（第15.4节）**:  
   - 匹配处理组和对照组中 \(\pi(L)\) 相似的个体（如±0.05内）。  
   - 匹配后人群的 \(\pi(L)\) 分布应平衡，确保近似可交换性。  
   - **问题**：  
     - **正性**：排除无相近匹配的个体（如高 \(\pi(L)\) 处理组若无相似对照组）。  
     - **目标人群**：效应估计仅适用于匹配子集（由 \(\pi(L)\) 重叠区定义），可解释性差，降低可移植性。  
     - 权衡：严格匹配标准减少偏倚但增加方差；宽松标准可能保留不平衡。  

5. **倾向模型 vs. 结构模型 vs. 预测模型（第15.5节）**:  
   - **倾向模型**：建模 \(\Pr[A | L]\)；参数为**冗余参数**（无因果解释）。用于IP加权、g-估计、匹配。  
   - **结构模型**：建模反事实量（如 \(E[Y^a]\) 或 \(E[Y^a | L]\)）；参数有**因果解释**（如处理效应）。包括：  
     - 边际结构模型（如 \(E[Y^a] = \beta_0 + \beta_1 a\)）。  
     - 结构嵌套模型（如 \(E[Y^a - Y^{a=0} | L] = \beta_1 a + \beta_2 a L\)）。  
   - **预测模型**：关注关联（如 \(E[Y | A, L]\) 用于预测）；无因果解释。  
   - **关键警告**：勿将预测变量选择（如逐步回归）用于因果模型。包含不必要协变量（如工具变量或碰撞变量）可：  
     - 增加方差（如协变量强预测 \(A\) 但无需保证可交换性）。  
     - 引入偏倚（如包含碰撞变量）。  
   - 优先使用灵活设定（如样条）而非预测性能。  

#### 技术要点结论  
- **技术要点 15.1: 平衡得分与预后得分**:  
  - **平衡得分** \(b(L)\) 满足 \(A \perp\!\!\!\perp L | b(L)\)。倾向得分 \(\pi(L)\) 是平衡得分，且给定 \(L\) 的可交换性蕴含给定 \(b(L)\) 的可交换性。  
  - **预后得分** \(s(L)\) 满足 \(Y^{a=0} \perp\!\!\!\perp L | s(L)\)，但基于预后得分的方法需更强假设且难推广至时变处理。  
  - 结论：若 \(L\) 足够，调整平衡得分（如 \(\pi(L)\)）即可保证可交换性。  

#### 精细要点结论  
- **精细要点 15.1: 冗余参数**:  
  - 在结果回归中，冗余参数（如 \(\beta_0, \beta_3\)) 必须正确设定以保证效应估计一致性。在g-估计中，冗余参数在处理模型中（如 \(\Pr[A=1 | L]\)）。  
  - 结论：冗余参数误设导致估计偏倚。**双重稳健方法**（如结合结果和处理模型）更优。  
- **精细要点 15.2: 效应修正与倾向得分**:  
  - 倾向匹配估计可能因 \(\pi(L)\) 的效应修正而异于未匹配估计。例如，若匹配中对照组样本过多，匹配人群的效应更接近处理组的效应。  
  - 结论：\(\pi(L)\) 的效应修正使解释复杂化（政策相关性低，因 \(\pi(L)\) 不可直接操作）。差异也可能源于残余混杂或正性违反。  

此总结严格基于章节内容，确保无遗漏，并遵循Markdown和LaTeX格式要求。公式使用标准LaTeX语法，如 \(E[Y^a]\) 表示反事实期望。