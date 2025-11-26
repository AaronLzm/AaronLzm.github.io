---
date: 2025-09-17 11:19:05
title: Chapter_7
category: Causal inference
tags: [gpt-4.1,response_md]

---
# Chapter 7 - CONFOUNDING

## Overview
This chapter provides a foundational and technical exploration of **confounding** in causal inference, focusing on its structure, relationship to exchangeability, graphical and counterfactual characterization, adjustment methods, and its implications for study design and critical evaluation.

---

## 1. The Structure of Confounding | 混杂的结构

**Concept:**  
Confounding arises when the observed association between a treatment ($A$) and an outcome ($Y$) is entangled with the effects of a common cause ($L$ or $U$), generating a non-causal association.

**Causal diagram:**  
- Confounding is visualized in DAGs by an open **backdoor path** between $A$ and $Y$ via $L$ or $U$:
    - $A \leftarrow L \rightarrow Y$
    - If $L$ did not exist, the only path would be $A \rightarrow Y$ (purely causal).

**Key formula:**  
- If no confounding:  
  $$
  \frac{\Pr[Y = 1 \mid A = 1]}{\Pr[Y = 1 \mid A = 0]} = \frac{\Pr[Y_{a=1} = 1]}{\Pr[Y_{a=0} = 1]}
  $$

- With confounding, the left side (associational) does not equal the right side (causal).

**常见举例：**  
- 职业因素（"健康工作者偏差"）
- 临床决策（指征混杂、渠道偏差）
- 生活方式（反向因果等）
- 遗传因素（连锁不平衡、群体结构）
- 社会与环境因素

**中文简述：**  
当处理和结局有共同原因时（如$L$或$U$），会产生非因果关联，这就是混杂。混杂在因果图上体现为有向无环图（DAG）中的后门路径。

---

## 2. Confounding and Exchangeability | 混杂与可交换性

**Key relationships:**  
- 可交换性 ($Y^a \perp\!\!\!\perp A$) 意味着在随机分配实验中无须调整变量，就可识别因果效应。
- 条件可交换性 ($Y^a \perp\!\!\!\perp A \mid L$) 意味着在某些协变量$L$取值下，分配概率相等，需要对$L$做调整。

**Formulas:**
- For binary treatment:
  $$
  \text{ACE} = E[Y_{a=1}] - E[Y_{a=0}] = E[Y \mid A=1] - E[Y \mid A=0] \quad \text{(若$Y^a \perp A$)}
  $$
  $$
  E[Y_{a=1}] - E[Y_{a=0}] = \sum_{l} \left[ E[Y \mid L=l, A=1]\Pr[L=l] - E[Y \mid L=l, A=0]\Pr[L=l] \right]
  $$
- 条件可交换性通常要通过标准化或逆概率加权来获得。

**Backdoor Criterion 后门准则:**  
- 一组协变量$L$满足：
  - 所有$A \to Y$之间的后门路径都被$L$阻断，
  - $L$中不含$A$的后代。
- 在FFRCISTG模型且满足faithfulness时，$Y^a \perp\!\!\!\perp A \mid L \iff L$满足后门准则。

**Technical Point 7.1:**  
- 后门准则 $\Rightarrow$ 条件可交换性始终成立，
- 条件可交换性 $\Rightarrow$ 后门准则只在FFRCISTG模型和faithfulness下成立。

**中文总结：**  
后门准则是判断混杂和识别因果效应的核心条件。只有满足该准则，才能实现条件可交换性，从而可靠地调整混杂。

---

## 3. Application and Examples of the Backdoor Criterion | 后门准则应用举例

- **常见图结构说明混杂识别：**
    - 图7.1、7.2、7.3：$A$和$Y$间有共同原因$L$或$U$，但通过调整$L$可消除未测混杂。
    - 图7.4：无共同原因，无需调整，有效关联即因果关联（也展示了collider bias/selection bias的例子）。
    - 图7.5：调整$L$同时引入selection bias，即无法识别。

- **Fine Point 7.1（混杂方向和强度）：**
    - 使用“signed DAG”可预测偏倚方向。例如，若$L \to A$和$L \to Y$同号，则偏向高估效应；异号则低估。
    - 混杂偏倚强度依赖于混杂因素与处理、结局的关联强度和混杂变量的流行率。

- **Fine Point 7.2（识别什么效应取决于哪些变量被观测到）：**
    - 若仅观测到$L_2$，则不可识别因果效应；
    - 若观测$L$和$L_2$，需联合分层调整；
    - 若观测$L_1$，则可用$L_1$分层调整等。

**中文总结：**  
通过调整满足后门准则的变量，可消除混杂，但有些情况下调整反而引入偏倚（如collider bias），需用因果图精确分析。

---

## 4. Confounding and Confounders | 混杂与混杂因子

**传统定义的局限性：**
- 传统定义（与处理有关，与结局有条件关联，不在因果路径上）在某些情况下会建议“调整”非真正混杂因子，反而引入偏倚（如selection bias）。
- 纯粹统计判据无法区分混杂与选择偏倚。

**结构性定义优点：**
- 基于因果图，先识别所有可能的混杂源（共同原因），再判定需要调整的变量集。
- “混杂”是绝对性的（与因果结构有关），而“混杂因子”是相对给定已调整变量集的。

**Fine Point 7.3（代理混杂因子 Surrogate confounders）：**
- 即使$L$不在后门路径上，但作为未测混杂$U$的proxy，也可部分缓解偏倚——“宜多测proxy变量而广泛调整”。

**Technical Point 7.2（修正confounder定义）：**
- 修正方法1：确保$L$和$U$联合分层下有条件可交换性；
- 修正方法2：$U$可分为$U_1$和$U_2$，在$L$分层下$U_1$与$A$不相关，在$A,L,U_1$分层下$U_2$与$Y$不相关。

**中文总结：**  
推荐使用基于因果结构的混杂判定和变量选择方法，避免误调和引入选择偏倚。混杂因子的身份依赖于分析变量集的选择。

---

## 5. Single-World Intervention Graphs (SWIGs)

**概念 Summary:**
- SWIGs将因果图与counterfactuals（如$Y^a$）结合，使交换性与d-separation等图方法对接。
- SWIG变换下，干预变量$a$右侧代表人为设定值，左侧仍代表实际观测到的$A$。

**SWIG判断规则：**
- 在SWIG中，若$Y^a$与$A$（或$L$）d-分离，则$Y^a \perp\!\!\!\perp A$（或$Y^a \perp\!\!\!\perp A \mid L$）。

**中文总结：**  
SWIG是理解因果可识别性、检验条件交换性的强大工具。

---

## 6. Confounding Adjustment Methods | 混杂调整方法

**两大类方法：**
- **G-methods:** 标准化（standardization）、逆概率加权（IPW）、g-estimation。
    - 适用于处理时变混杂或复杂情景。
    - 能有效“删除”$L \to A$箭头，重建处理分配的“伪随机”环境。
- **传统分层方法:** 分层（stratification）、匹配（matching）。
    - 依据条件可交换性，在不同$L$层内估算关联。
    - Propensity score本质是对$L$的score分层。

**重要技术点：**
- 只有条件可交换性成立，这些方法才能准确估算因果效应。
- 混杂调整的其他工具包括：
    - 差分中的差分（difference-in-differences, DIFF-in-DIFF, Technical Point 7.3）
    - 仪器变量法（IV, 见第16章）
    - Proximal inference（需负控制变量，Technical Point 7.3）
    - 前门准则（Front door criterion, Technical Point 7.4）

### Fine Point 7.4
- 后门路径阻断用的变量不能是$A$的后代，但可以在时间上晚于$A$，本质看结构而非时间顺序。

**Difference-in-differences (DIFF-in-DIFF):**
- 若有一个负控制结局$C$（只受混杂$U$影响），
  $$
  E[Y^1 - Y^0 | A=1] = (E[Y|A=1] - E[Y|A=0]) - (E[C|A=1] - E[C|A=0])
  $$
- 前提是加性equiconfounding。

**Front-Door Formula:**
- 在未测混杂$U$存在，且$A \to M \to Y$完全中介、无额外后门路径时（见图7.14），
  $$
  \Pr(Y_{a}=1) = \sum_m \Pr(M=m \mid A = a) \sum_{a'} \Pr(Y=1 \mid M=m, A=a') \Pr(A=a')
  $$
- 详见章节Technical Point 7.4。

**中文总结：**  
调整混杂的方法多样，常规方法需可交换性、满足后门准则，工具变量、前门规则乃至差分法则需其他难以检验但可创新利用的假设。

---

## 7. Practical & Epistemic Considerations | 实践与认知问题

- 观测研究中，混杂始终是个实际威胁——提出“你可能有混杂”本身不是建设性批评。
- 实质性挑战需依据具体潜在混杂的变量和路径。
- 选择是否调整变量和分析方法应依赖因果结构知识，且必须在分析报告中明确假设和可能的缺陷。

---

# **Summary Table of Major Points**

| 核心点 | 英文 | 中文 |
| ------ | ---- | ---- |
| 混杂本质 | Association between $A$ and $Y$ due to a shared cause, not causation. | $A$与$Y$的关联源自共同原因，而非因果。 |
| 后门准则 | Backdoor criterion: adjust for $L$ if it blocks all backdoor paths from $A$ to $Y$ and is not a descendant of $A$. | 后门准则：若$L$阻断所有$A$到$Y$的后门路径且不是$A$后代，则需调整。|
| 识别公式 | $E[Y_{a}] = \sum_{l} E[Y|A=a,L=l]\Pr(L=l)$ | 见左侧公式 |
| G方法 | Standardization, IP weighting, g-estimation—remove confounding given $L$, require conditional exchangeability. | 标准化、IPW、g-估计---依赖条件可交换性 |
| 传统方法 | Stratification, matching, propensity score | 分层、匹配、倾向得分 |
| DIFF-in-DIFF | $E[Y^1 - Y^0 | A=1] = (E[Y|A=1] - E[Y|A=0]) - (E[C|A=1] - E[C|A=0])$ | 差分中的差分方法 |
| 前门公式 | $\Pr(Y_{a}) = \sum_{m} \Pr(M=m|A=a)\sum_{a'}\Pr(Y=1|M=m, A=a')\Pr(A=a')$ | 前门准则 |
| SWIG | Single-world intervention graph—counterfactual variables as nodes, graphical d-separation = conditional independence | SWIG用于连接图模型与反事实独立性。 |
| 选择偏倚 | Collider开路造成选择偏倚，调整可反而引入新偏倚 | 调整collider会造成新的混杂 |
| 代理混杂因子 | "Surrogate confounders" reduce but not eliminate bias | 代理混杂变量可部分调整未测混杂的偏倚 |
| 混杂因子是相对的 | "Confounder" identity depends on what is already adjusted for | 是否是混杂因子取决于分析中已包括哪些变量 |
| 必须依赖因果知识 | Structural approach is essential; statistical definitions can mislead | 结构化判断、因果图分析是关键 |

---

# **关键公式与中英文对照**

- 标准化公式（Standardization formula）:
  $$
  E[Y_a] = \sum_{l} E[Y | A=a, L=l] \Pr(L=l)
  $$
  $$
  E[Y_a] = \sum_{l} E[Y|A=a,L=l] \Pr(L=l)
  $$

- 差分中的差分（Difference-in-differences）:
  $$
  E[Y^1 - Y^0 | A=1] = (E[Y|A=1] - E[Y|A=0]) - (E[C|A=1] - E[C|A=0])
  $$

- 前门准则（Front door criterion）:
  $$
  \Pr(Y_{a}) = \sum_{m} \Pr(M=m|A=a)\sum_{a'}\Pr(Y=1|M=m, A=a')\Pr(A=a')
  $$

---

# **结论总结**

- 混杂的实质是处理和结局拥有共同原因后门路径；
- 判断和调整混杂需依赖因果图分析，正确识别后门路径并只调整非后代且需调整的变量；
- 传统的仅用统计标准的“混杂因子”定义会引起问题，必须根据因果结构判定；
- SWIGs是结合图模型和反事实工具的方法；
- 混杂调整有多种方法，常规需可交换性，特殊情境可用前门、工具变量等；
- 观测研究混杂始终是风险，敏感性分析和充分交流假设很重要。

---

请根据以上精炼要点及公式，提高因果推断分析能力及批判性阅读技术。