---
title: Chapter_7
category: Causal inference
tags: [DeepSeek-R1-0528-1st,response_md]

---
<think>
我们正在处理《因果推断：What If》第7章“混杂”的内容。本章主要讨论混杂（confounding）的概念、结构、与可交换性的关系、后门准则、混杂调整方法等。由于用户要求提炼所有技术重点和细节要点，并得出清晰结论，同时保留技术术语的英文表述，我们将按章节结构进行总结。

 注意：由于文本中提到的图表（如Figure 7.1, 7.2等）无法直接查看，我们将根据文本描述来理解图表内容。文本中包含了多个技术点（Technical Point）和精细点（Fine Point），这些都需要包含在总结中。

 本章结构：
 7.1 混杂的结构（The structure of confounding）
 7.2 混杂与可交换性（Confounding and exchangeability）
 7.3 混杂与后门准则（Confounding and the backdoor criterion）
 7.4 混杂与混杂因子（Confounding and confounders）
 7.5 单世界干预图（Single-world intervention graphs, SWIGs）
 7.6 混杂调整（Confounding adjustment）

 此外，还有多个技术点（Technical Point）和精细点（Fine Point）散布在各节中。

 我们将逐一总结每个部分，包括所有技术重点和细节要点，并注意数学公式用LaTeX格式。

 开始总结：
</think>
### 第7章：混杂（CONFOUNDING）总结

#### **7.1 混杂的结构**
- **技术重点**：
  - 混杂（confounding）是由于治疗（treatment）\(A\)和结局（outcome）\(Y\)存在共同原因（common cause）导致的偏倚，表现为非因果路径（backdoor path）开放。
  - **后门路径（backdoor path）**：指从\(A\)到\(Y\)的非因果路径，其箭头指向\(A\)（例如\(A \leftarrow L \rightarrow Y\)）。
  - 因果图（causal DAG）表示：  
    - 路径1：\(A \rightarrow Y\)（因果效应）。  
    - 路径2：\(A \leftarrow L \rightarrow Y\)（混杂路径）。  
  - 若无共同原因\(L\)，关联即因果：关联风险比（associational risk ratio）等于因果风险比（causal risk ratio）：
    \[
    \frac{\Pr[Y=1|A=1]}{\Pr[Y=1|A=0]} = \frac{\Pr[Y^{a=1}=1]}{\Pr[Y^{a=0}=1]}
    \]
  - 存在混杂时，关联风险比 ≠ 因果风险比（association ≠ causation）。

- **细节要点**：
  - **混杂示例**：
    - **职业因素**：消防员工作\(A\)与死亡风险\(Y\)的关联被"身体健康"\(L\)混杂（健康工人偏倚，healthy worker bias）。
    - **临床决策**：阿司匹林\(A\)与中风\(Y\)的关联被心脏病\(L\)混杂（适应症混杂，confounding by indication）。
    - **生活方式**：运动\(A\)与死亡\(Y\)的关联被吸烟\(L\)混杂（反向因果，reverse causation）。
    - **遗传因素**：DNA序列\(A\)与性状\(Y\)的关联被连锁不平衡（linkage disequilibrium）混杂。
  - 混杂的核心结构：共同原因（如\(L\)或未测变量\(U\)）导致后门路径开放。

---

#### **7.2 混杂与可交换性（exchangeability）**
- **技术重点**：
  - **可交换性定义**：
    - 边际可交换性（marginal exchangeability）：\(Y^a \perp\!\!\!\perp A\)（如随机试验）。
    - 条件可交换性（conditional exchangeability）：\(Y^a \perp\!\!\!\perp A | L\)（需调整\(L\)）。
  - **识别因果效应**：
    - 若\(Y^a \perp\!\!\!\perp A\)，则平均因果效应为：
      \[
      E[Y^{a=1}] - E[Y^{a=0}] = E[Y|A=1] - E[Y|A=0]
      \]
    - 若\(Y^a \perp\!\!\!\perp A | L\)，则需标准化（standardization）或逆概率加权（IP weighting）：
      \[
      E[Y^{a}] = \sum_l E[Y|A=a, L=l] \Pr[L=l]
      \]
  - **后门准则（backdoor criterion）**：
    - 若变量集\(L\)满足：
      1. 阻断所有\(A\)与\(Y\)间的后门路径。
      2. \(L\)不含\(A\)的后代（descendants）。
    - 则条件可交换性成立：\(Y^a \perp\!\!\!\perp A | L\)（假设FFRCISTG模型和faithfulness）。

- **细节要点**：
  - **无混杂场景**：无共同原因（如边际随机试验），后门路径不存在。
  - **有混杂但可调整**：存在共同原因，但测量\(L\)可阻断后门路径（无未测混杂，no unmeasured confounding）。
  - 后门准则不量化偏倚大小/方向（需敏感性分析）。

---

#### **7.3 混杂与后门准则的应用**
- **技术重点**：
  - **后门准则示例**：
    - **图7.1**：调整\(L\)可阻断\(A \leftarrow L \rightarrow Y\)，无未测混杂。
    - **图7.2-7.3**：未测\(U\)导致混杂，但调整\(L\)可阻断路径（\(L\)为混杂因子）。
    - **图7.4**：无混杂（后门路径被碰撞点（collider）\(L\)阻塞），无需调整（调整引入选择偏倚）。
    - **图7.5**：混杂与选择偏倚并存（调整\(L\)同时阻断混杂路径但打开新路径）。
  - **混杂因子（confounder）定义**：
    - 若数据\((A,Y)\)不足以识别因果效应（需调整\(L\)），则\(L\)是混杂因子。
    - 若\((A,Y)\)可识别效应，则\(L\)是非混杂因子。

- **细节要点**：
  - **M-偏倚（M-bias）**：图7.4中调整非混杂因子\(L\)（碰撞点）会打开路径\(A \leftarrow U_2 \rightarrow L \leftarrow U_1 \rightarrow Y\)，引入选择偏倚（selection bias）。
  - **混杂与选择偏倚区别**：
    - 混杂：共同原因导致后门路径开放。
    - 选择偏倚：调整共同结果（common effect）打开路径。

---

#### **7.4 混杂与混杂因子**
- **技术重点**：
  - **传统定义缺陷**：基于关联准则（如\(L\)与\(A\)关联、\(L\)与\(Y\)关联、\(L\)不在因果路径）可能导致错误调整（如图7.4调整\(L\)引入偏倚）。
  - **结构定义优势**：基于因果图确定混杂因子（需先验知识），避免不一致性。
    - 混杂因子是相对的：取决于已测变量（如未测\(U\)时\(L\)是混杂因子；若测\(U\)则否）。

- **细节要点**：
  - **代理混杂因子（surrogate confounder）**：图7.8中\(L\)代理未测\(U\)，调整可部分减少偏倚。
  - 结构方法要求明确因果图，使假设可被验证/批评。

---

#### **7.5 单世界干预图（SWIGs）**
- **技术重点**：
  - **SWIG原理**：将因果图转换为干预世界（treatment set to \(a\)）的图，包含反事实变量（如\(Y^a\)）。
  - **验证可交换性**：
    - 图7.2的SWIG中，\(Y^a \perp\!\!\!\perp A | L\)（给定\(L\)后路径阻塞）。
    - 图7.4的SWIG中，\(Y^a \perp\!\!\!\perp A\)成立，但\(Y^a \perp\!\!\!\perp A | L\)不成立（调整\(L\)打开路径）。
  - **等价性**：后门准则与SWIG的d-分离（d-separation）等价。

- **细节要点**：
  - 自然治疗值（natural value of treatment）：干预世界中未观察的治疗值\(A\)。
  - SWIG统一反事实与图形方法，直接显示独立性。

---

#### **7.6 混杂调整方法**
- **技术重点**：
  - **G-方法（G-methods）**：利用条件可交换性。
    - 标准化（standardization）与IP加权：模拟无混杂路径的关联（"删除" \(L \rightarrow A\)）。
    - G-估计（g-estimation）：处理时变混杂。
  - **传统方法**：分层（stratification）、匹配（matching）、倾向评分（propensity score）。
    - 仅估计子群效应，可能引入选择偏倚（时变混杂时无效）。
  - **替代方法**（无需条件可交换性）：
    - 双重差分（difference-in-differences）。
    - 工具变量（instrumental variables）。
    - 前门准则（front door criterion）：
      \[
      \Pr[Y^a=1] = \sum_m \Pr[M=m|A=a] \sum_{a'} \Pr[Y=1|M=m,A=a'] \Pr[A=a']
      \]

- **细节要点**：
  - **阴性对照（negative controls）**：利用预处理结局\(C\)（图7.13）量化混杂（Technical Point 7.3）。
  - **实践建议**：
    - 测量非后代变量\(L\)以逼近条件可交换性。
    - 避免调整治疗/结局的后代变量。
    - 敏感性分析评估未测混杂。

---

### **结论**
1. **混杂本质**：由治疗与结局的共同原因导致，表现为开放的后门路径，使关联≠因果。
2. **可交换性核心**：后门准则（阻断所有后门路径且\(L\)非后代）等价于条件可交换性。
3. **混杂因子定义**：需结构视角（非传统关联定义），避免错误调整。
4. **调整方法**：
   - 首选G-方法（标准化/IP加权）处理时变混杂。
   - 替代方法（如工具变量）需额外假设。
5. **实践挑战**：未测混杂始终存在，需结合因果知识、敏感性分析和阴性对照。

> **关键警示**：观察性研究中，批评"可能存在混杂"无信息量；需具体指出未测混杂源（如吸烟）并提供解决方案（调整或敏感性分析）。