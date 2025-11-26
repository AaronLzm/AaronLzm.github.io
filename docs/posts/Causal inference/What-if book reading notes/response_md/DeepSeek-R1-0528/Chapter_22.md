---
date: 2025-09-17 11:19:05
title: Chapter_22
category: Causal inference
tags: [DeepSeek-R1-0528,response_md]

---
<think>
We are summarizing Chapter 22 "Target Trial Emulation" from the provided PDF content. The chapter has several sections and fine points. We'll break it down step by step.

 Steps:
 1. Identify the main sections and subsections.
 2. Extract technical points and fine points.
 3. Summarize the content in the required format.

 The chapter has:
   - 22.1 Intention-to-treat effect and per-protocol effect
   - Fine Point 22.1: The exclusion restriction (again)
   - Fine Point 22.2: Pseudo-intention-to-treat analysis and modified intention-to-treat analysis
   - Fine Point 22.3: Naïve per-protocol analyses
   - Fine Point 22.4: More misunderstandings about the intention-to-treat effect
   - 22.2 A target trial with sustained treatment strategies
   - Technical Point 22.1: Controlled direct effects
   - Technical Point 22.2: Pure direct effects and principal stratum direct effects
   - 22.3 Emulating a target trial with sustained strategies
   - 22.4 Time zero
   - Fine Point 22.5: Grace periods
   - 22.5 A unified approach to answer What If questions with data
   - Fine Point 22.6: How do the data of randomized experiments and observational studies differ?
   - Fine Point 22.7: A counterintuitive comparison of a randomized trial and an observational study
   - Fine Point 22.8: Generalizing Fine Point 22.7 to realistic settings

 However, note that the provided text ends at page 18 and we have to base our summary on the provided text.

 We'll structure the summary by the main sections and include the fine points and technical points as sub-sections.

 Important: We must use the exact structure and terminology from the text.

 Let's begin.
</think>
### Chapter 22: TARGET TRIAL EMULATION

#### 22.1 Intention-to-treat effect and per-protocol effect
**Technical Points**:
- **核心理论**:
  - 观察性研究中的因果推断可视为对假设性随机试验（目标试验）的模仿。
  - 意向治疗效应（ITT）定义为分配治疗（Z）对结局（Y）的因果效应，通过路径 Z→A→Y（治疗接受）和 Z→Y（行为变化）实现。
  - 方案效应（Per-Protocol Effect）定义为所有个体完全遵守分配策略时的因果效应，需调整时间依赖性混杂。
- **关键公式**:
  - ITT风险比：$$ \frac{\text{Pr}[Y=1|Z=1]}{\text{Pr}[Y=1|Z=0]} = \frac{\text{Pr}[Y^{z=1}=1]}{\text{Pr}[Y^{z=0}=1]} $$
  - 方案效应风险比：$$ \frac{\text{Pr}[Y^{a=1}=1]}{\text{Pr}[Y^{a=0}=1]} $$（在排除限制下）
- **重要概念**:
  - **排除限制**：当不存在直接路径 Z→Y 时成立（图22.2），双盲安慰剂试验可强制实现。
  - **交换性**：随机分配确保 ITT 无混杂（Yᶻ⊥⊥Z），但方案效应需调整混杂（如未测量风险因素U）。
- **应用场景**:
  - ITT 用于随机试验的初级分析，方案效应用于评估实际治疗效果（如药物安全性评估）。

**细节要点**:
- **案例分析**：疫苗试验中，高风险个体（U=1）在对照组可能自行接种（A=1），导致传统"按治疗"分析（A=1 vs A=0）因混杂偏倚无效。
- **辅助信息**:
  - 伪ITT分析（仅纳入未失访者）和改良ITT分析（仅纳入初始治疗者）可能因选择偏倚导致估计偏差。
  - 传统方案分析（仅纳入遵守者）因忽略时间依赖性混杂（图22.4路径 Z→A←L←U→Y）无效。
- **相关背景**：非盲试验中，行为变化（如治疗分配意识）可能使A无效时Z仍有效应，破坏"零保持"特性。

---

#### 22.2 A target trial with sustained treatment strategies
**Technical Points**:
- **核心理论**:
  - 持续治疗策略（如抗病毒治疗）的对比需实用主义试验（pragmatic trial），模拟真实条件（无盲法/安慰剂）。
  - ITT效应：对比静态策略（z=1, c̄=0 vs z=0, c̄=0）的死亡风险差异。
  - 方案效应：对比动态策略（g₁: 持续治疗除非禁忌 vs g₀: 永不治疗）的死亡风险差异。
- **关键公式**:
  - ITT风险差：$$ \text{Pr}[D_k^{z=1,\bar{c}_k=\bar{0}}=1] - \text{Pr}[D_k^{z=0,\bar{c}_k=\bar{0}}=1] $$
  - 方案效应风险差：$$ \text{Pr}[D_k^{g_1,\bar{c}_k=\bar{0}}=1] - \text{Pr}[D_k^{g_0,\bar{c}_k=\bar{0}}=1] $$
- **重要概念**:
  - **动态策略**：方案效应需包含临床决策逻辑（如毒性停药），非简单静态规则。
  - **直接效应**：控制中介变量时的效应（Technical Point 22.1）。
- **应用场景**：HIV患者抗病毒治疗试验（5年死亡风险），时间k=0至59个月。

**细节要点**:
- **案例分析**：当实际策略偏离协议（如g₀组在CD4<200时治疗），可概念化为新目标试验的方案效应。
- **辅助信息**：完全遵守的试验数据无法模拟新策略效应，非依从性反利于多目标试验模仿。
- **相关背景**：纯直接效应（pure direct effect）因跨世界反事实不可识别；主层效应（principal stratum effect）政策相关性低（Technical Point 22.2）。

---

#### 22.3 Emulating a target trial with sustained strategies
**Technical Points**:
- **核心理论**:
  - 观察性分析模仿目标试验需明确：合格标准、随访时间、治疗策略、结局、因果对比。
  - ITT的观察性类比：对比治疗初始（A₀=1 vs A₀=0），近似分配效应。
  - 方案效应定义与目标试验相同，需策略被实际遵循。
- **重要概念**:
  - **时间零点**：随访起始需与目标试验一致（如CD4首次<500cells/μL）。
  - **克隆-删失-加权**：当个体符合多策略时，克隆副本并IP加权处理删失偏倚。
- **应用场景**：电子病历数据中模拟多时点合格个体的序列目标试验。

**细节要点**:
- **辅助信息**:
  - 宽限期（grace period）：允许治疗延迟启动（如3个月内），需克隆处理事件分配。
  - "效力-效果"二分法不适用，应明确定义策略而非依赖模糊术语。
- **相关背景**：观察性分析中，需避免无法转化为干预对比的分析（如第3.5-3.6节）。

---

#### 22.4 Time zero
**Technical Points**:
- **核心理论**:
  - 时间零点定义：合格标准满足且策略分配时点（如随机化时刻）。
  - 多合格时点场景：可选用首次/随机时点，或序列试验模拟所有时点（更高效）。
- **重要概念**:
  - **序列试验模拟**：固定时间单位（如月）启动新试验，需bootstrap调整方差。
  - **策略分配模糊**：克隆个体至兼容策略，事件发生时所有副本死亡。
- **应用场景**：更年期激素治疗研究（年龄51-65岁多合格时点）。

**细节要点**:
- **案例分析**：CD4<500患者中，未治疗者可能符合延迟策略（CD4<350/CD4<200），需克隆处理。
- **相关背景**：时间零点错误导致偏倚（如绝经激素研究）。

---

#### 22.5 A unified approach to answer What If questions with data
**Technical Points**:
- **核心理论**:
  - 随机试验与观察性研究差异仅三点：基线混杂、分配概率已知、策略分配已知（Fine Point 22.6）。
  - g-方法可统一处理两类研究的方案效应估计（需调整混杂/选择偏倚）。
- **重要概念**:
  - **ITT分析局限**：需g-方法调整失访导致的选择偏倚（如症状影响脱落）。
  - **方案分析问题**：传统方法忽略动态策略本质、时间混杂、选择偏倚。
- **应用场景**：长期抗病毒治疗试验中，方案效应估计需时间依赖性协变量调整。

**细节要点**:
- **案例分析**：极端案例中（Fine Point 22.7），存在混杂的观察性研究可能优于随机试验（当存在未测量效应修饰）。
- **辅助信息**：结合随机试验和观察数据可优化策略（如基于倾向评分设计动态规则）。
- **相关背景**：历史将随机试验置于证据金字塔顶端，但长期策略评估中二者方法论应统一。

---

### 关键图表说明
- **图22.1**：未排除限制的路径图（Z→A→Y 和 Z→Y）。
- **图22.2**：排除限制下的路径图（无 Z→Y）。
- **图22.3**：可测量混杂（L）阻断后门路径。
- **图22.4**：方案人群选择（S=1）打开非因果路径。

> 注：所有总结严格遵循原文，未添加主观推测。数学公式使用LaTeX格式，技术术语保留英文以确保准确性。