---
title: Chapter_17
category: Causal inference
tags: [DeepSeek-R1-0528,response_md]

---
<think>
We are summarizing Chapter 17: "Causal Survival Analysis" from the provided text.
 The chapter introduces survival analysis in the context of causal inference, focusing on time-to-event outcomes with administrative censoring.
 We'll break down the chapter into sections and subsections, extracting technical points and fine points as required.

 Structure of the chapter:
 17.1 Hazards and risks
 17.2 From hazards to risks
 17.3 Why censoring matters
 17.4 IP weighting of marginal structural models
 17.5 The parametric g-formula
 17.6 G-estimation of structural nested models

 We also note the presence of Fine Points and Technical Points.

 Since we are to base the summary strictly on the provided text, we'll proceed step by step.

 Important: We are to use Markdown, with LaTeX for formulas, and Chinese for the summary, but retain English terms for technical vocabulary.

 However, note: the user requested Chinese for the summary. But the original text is in English, and the examples and terms are technical. We'll write the summary in Chinese, but keep technical terms in English.

 Let's begin.
</think>
### Chapter 17: Causal Survival Analysis  
**逻辑关联**：本章扩展了前几章关于固定时间点因果效应的分析，聚焦于事件发生时间（如死亡时间）的因果推断，引入了生存分析特有的概念（如删失、风险函数）和调整方法。

---

#### 17.1 Hazards and risks  
**技术重点（Technical Points）**：  
- **核心理论**：生存分析研究治疗（如戒烟）对事件发生时间（如死亡时间）的因果效应，需处理因研究截止导致的**行政删失（administrative censoring）**。  
- **关键概念**：  
  - **生存概率（Survival Probability）**：\( \text{Pr}[T > k] \) 表示个体在时间 \( k \) 前存活的概率。  
  - **风险（Risk/Cumulative Incidence）**：\( \text{Pr}[T \leq k] = 1 - \text{Pr}[T > k] \) 表示在时间 \( k \) 前发生事件的累积概率。  
  - **风险函数（Hazard）**：离散时间风险定义为 \( \text{Pr}[T = k \mid T > k-1] \)，即在前 \( k-1 \) 期未发生事件的条件下，第 \( k \) 期发生事件的概率。  
- **应用场景**：对比不同治疗组（如戒烟 vs. 非戒烟）的生存曲线或风险曲线时，需考虑混杂（如年龄）导致的非可交换性。  

**细节要点（Fine Points）**：  
- **删失类型**：行政删失是生存分析固有的问题（研究无法追踪至所有个体发生事件），但还存在**竞争事件（competing events）**（如其他死因）和**失访（loss to follow-up）**等非行政删失。  
- **竞争事件处理困境**：  
  - 若将竞争事件视为删失，需模拟无竞争事件的情景，估计可能产生偏差。  
  - 若不视为删失，则需假设死亡个体后续事件概率为零，但治疗可能通过影响竞争事件间接影响目标事件。  
- **数据示例**：NHEFS 研究中，1629 名吸烟者从 1983 年1月开始随访，1992 年12月结束（\( k_{\text{end}} = 120 \) 个月），仅 318 人死亡，其余 1311 人行政删失。  

---

#### 17.2 From hazards to risks  
**技术重点（Technical Points）**：  
- **核心理论**：生存概率可通过风险函数计算：  
  $$
  \text{Pr}[D_k = 0] = \prod_{m=1}^{k} \text{Pr}[D_m = 0 \mid D_{m-1} = 0]
  $$  
  其中 \( D_k \) 是时间 \( k \) 的事件指示变量（\( D_k = 1 \) 表示事件在 \( k \) 前发生）。  
- **数据格式**：  
  - **宽格式（Wide）**：每人一行（基线数据）。  
  - **人时格式（Person-time）**：每人每月一行，便于建模时变风险。  
- **估计方法**：  
  - **非参数**：Kaplan-Meier 估计量直接计算生存曲线。  
  - **参数模型**：用逻辑回归拟合风险函数，例如：  
    $$
    \text{logit } \text{Pr}[D_{k+1} = 1 \mid D_k = 0, A] = \theta_{0,k} + \theta_1 A + \theta_2 A \times k + \theta_3 A \times k^2
    $$  
    其中 \( \theta_{0,k} \) 是时间交互项，允许风险比时变。  

**细节要点（Fine Points）**：  
- **风险比（Hazard Ratio）的局限性**：  
  - 风险比通常随时间变化，但常用 Cox 模型假设其为常数（加权平均结果难解释）。  
  - 因果解释复杂：治疗可能通过影响选择偏差（如剔除高风险个体）导致虚假关联（见图 17.3）。  
- **模型选择**：  
  - **参数模型**（如指数分布）假设风险分布。  
  - **半参数模型**（如 Cox 模型）不假设基线风险形式，但限制风险比结构。  

---

#### 17.3 Why censoring matters  
**技术重点（Technical Points）**：  
- **删失调整**：当行政删失时间因人而异（如研究入组时间不同），需定义删失指示变量 \( C_k \)。  
- **正确估计生存概率**：  
  $$
  \text{Pr}[D_k = 0 \mid A = a] = \prod_{m=1}^{k} \text{Pr}[D_m = 0 \mid D_{m-1} = 0, C_m = 0, A = a]
  $$  
  需基于未删失个体或逻辑模型估计条件风险。  

**细节要点（Fine Points）**：  
- **简单案例误区**：若仅用未删失个体计算生存概率（如忽略删失机制），会引入选择偏差（例：删失后生存概率 0.405 vs. 无删失真实值 0.81）。  
- **协变量调整**：若删失时间与预后因素（如入组时间）相关，需在模型中调整基线变量。  

---

#### 17.4 IP weighting of marginal structural models  
**技术重点（Technical Points）**：  
- **核心理论**：通过 IP 加权创建伪总体，消除混杂（如年龄）。  
- **步骤**：  
  1. 估计稳定权重 \( SW^A = \frac{\text{Pr}[A=1]}{\text{Pr}[A=1 \mid L]} \)（处理组）或 \( \frac{1 - \text{Pr}[A=1]}{1 - \text{Pr}[A=1 \mid L]} \)（对照组）。  
  2. 用人时数据拟合加权逻辑模型：  
     $$
     \text{logit } \text{Pr}[D_{k+1}^a = 0 \mid D_k^a = 0] = \beta_{0,k} + \beta_1 a + \beta_2 a \times k + \beta_3 a \times k^2
     $$  
  3. 通过乘积计算反事实生存曲线 \( \text{Pr}[D_k^a = 0] \)。  

**细节要点（Fine Points）**：  
- **应用示例**：NHEFS 数据中，调整后戒烟组 120 个月生存率 80.7% vs. 非戒烟组 80.5%（差异 0.2%；95% CI: -4.1% 至 3.7%），无显著效应。  
- **假设**：要求治疗模型和边际风险模型均正确设定。  

---

#### 17.5 The parametric g-formula  
**技术重点（Technical Points）**：  
- **核心理论**：通过标准化估计反事实生存概率：  
  $$
  \text{Pr}[D_{k+1}^a = 0] = \sum_l \text{Pr}[D_{k+1} = 0 \mid L=l, A=a] \text{Pr}[L=l]
  $$  
- **步骤**：  
  1. 拟合含协变量 \( L \) 的风险模型（如逻辑回归）。  
  2. 预测所有个体的条件生存概率，按 \( L \) 分布加权平均。  

**细节要点（Fine Points）**：  
- **结果对比**：与 IP 加权结果相似（戒烟组生存率 80.4% vs. 非戒烟组 80.6%），但依赖不同参数假设（条件风险模型 vs. 治疗模型）。  
- **优势**：直接建模协变量效应，适用于连续型 \( L \)。  

---

#### 17.6 G-estimation of structural nested models  
**技术重点（Technical Points）**：  
- **模型类型**：  
  - **加速失效时间模型（AFT）**：  
    $$
    T_i^{a=0} = T_i^a \exp(\psi_1 a + \psi_2 a L_i)
    $$  
    估计生存时间比（如中位生存时间比）。  
  - **结构嵌套累积生存模型（CST）**：针对罕见生存事件建模生存概率比。  
- **估计挑战**：需人工删失（artificial censoring）避免选择偏差，使用 \( \Delta(\psi) \) 指示变量进行 G 估计。  

**细节要点（Fine Points）**：  
- **局限性**：  
  - 秩保护假设不现实，且参数估计依赖搜索算法（可能无唯一解）。  
  - 应用较少（软件支持不足，多简化模型忽略效应异质性）。  
- **示例结果**：AFT 模型估计 \( \exp(-\hat{\psi}) = 1.05 \)（中位生存时间比），提示戒烟效应不显著。  

---  
**章节总结**：本章系统介绍了生存分析的因果推断框架，强调行政删失的处理、风险与生存概率的估计方法（IP 加权、G 公式、G 估计），并指出风险比的解释困境。后续部分 III 将扩展至时变处理。