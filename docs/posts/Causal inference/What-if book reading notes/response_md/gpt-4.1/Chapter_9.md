---
date: 2025-09-17 11:19:05
title: Chapter_9
category: Causal inference
tags: [gpt-4.1,response_md]

---
# Chapter 9 总结：《测量偏差与“非因果”图（Measurement Bias and "Noncausal" Diagrams）》

---
## 目录
1. [测量偏差定义与基本现象](#measurement-bias)
2. [测量误差的结构与类型](#structures)
3. [混杂因子与合流因子的误测](#confounders)
4. [何时可以忽略测量误差？](#skipping)
5. [包含“非因果”箭头的因果图](#noncausal)
6. [涉及公式与技术要点总结](#technical-points)

---

## 1. 测量偏差定义与基本现象 <a name="measurement-bias"></a>
### 中文
- **测量偏差(Measurement Bias/Information Bias)**: 数据收集过程引入的误差, 导致处理(暴露)与结局之间的关联被弱化或强化。常见于所有设计，包括随机试验和观察性研究。
- **例子**: 在实验中结果由助手记录，但漏记一半抬头者→结果即使有强因果效应，观察到的关系也会被稀释（归零趋向）。
- 以 $A$ 表示实际处理，$A^*$ 表示观测到的处理（存在测量误差），同理 $Y, Y^*$。

### English
- **Measurement bias**: Bias introduced by errors in the measurement process, potentially weakening or strengthening associations between treatment/exposure and outcome. It can occur in both randomized trials and observational studies.
- **Example**: If an observer misses to record half of the people who look up, the observed treatment-outcome association will be diluted.
- Use $A$ for true treatment, $A^*$ for measured treatment (with error), and similarly $Y, Y^*$ for outcome.

---

## 2. 测量误差的结构与类型 <a name="structures"></a>
### 2.1 基本定义
- **测量误差 (Measurement Error)**: $e_A = A^* - A$, $e_Y = Y^* - Y$
- 分为**独立性（independence）** 和 **非差异性（nondifferentiality）**:

#### Technical Point 9.1
- **独立性 (Independence):**
  $$ f(e_Y, e_A) = f(e_Y)\, f(e_A) $$
- **非差异性 (Nondifferentiality):**
  - 对于处理：
    $$ f(e_A | Y) = f(e_A) $$
  - 对于结局：
    $$ f(e_Y | A) = f(e_Y) $$

### 2.2 分类与因果图
#### 四种典型结构
1. **独立非差异性 (Independent & Nondifferential, Fig 9.2)**
   - $U_A \perp U_Y$; $U_A$ 不依赖 $Y$, $U_Y$ 不依赖 $A$。
2. **相关非差异性 (Dependent & Nondifferential, Fig 9.3)**
   - $U_{AY}$ 影响 $A^*, Y^*$。
3. **独立差异性 (Independent & Differential, Fig 9.4, 9.5)**
   - $Y \rightarrow U_A$ 或 $A \rightarrow U_Y$
4. **相关差异性 (Dependent & Differential, Fig 9.6, 9.7)**
   - 组合上述影响。

#### 主要结论
- **误差模式决定修正方法**。独立非差异性误差有较多修正文献。
- **测量误差导致的偏差不一定总是趋向零**，也可能产生“趋势反转”(trend reversal)。

### 2.3 方向与强度
#### Fine Point 9.1
- **如果因果关系不存在且误差独立且非差异性，则观测与真实的关联都为零**。
- **误差越大，偏差通常越大**，但因果图无法捕捉数量级。
- **对于连续/有序变量，即使是独立且非差异性误差，也可能导致 $A^*$ 与 $Y^*$ 的趋势与 $A$ 和 $Y$ 的相反（趋势反转），如果 $E[A^*|A]$ 为非单调函数。

---

## 3. 混杂因子与合流因子的误测 <a name="confounders"></a>
### 3.1 误测染杂因子
- 真正的混杂因子 $L$ 误测为 $L^*$ 时，即使 $A$ 和 $Y$ 是精准测量，也难以阻断 $A \leftarrow L \rightarrow Y$ 的路径。
- **关键公式**: 真正的因果效应为
  $$ RR_{\text{causal}} = \frac{Pr(Y_{a=1}=1)}{Pr(Y_{a=0}=1)} $$
  - 但根据 $L^*$ 调整得到的风险比一般不等于 $RR_{\text{causal}}$。

- $L^*$ 仅是 $L$ 的替代（surrogate），本质上可理解为未测混杂或测量偏差。

### 3.2 表观效应修饰
- 只有部分人群的 $L^*$ 能准确识别 $L$，否则各组调整混杂不足，会错误推断存在效应修饰。

### 3.3 合流因子误测
- 如选择偏差分析中的合流因子（collider）$C$被误测为$C^*$, 条件化$C^*$会引入新的偏差。

### Fine Point 9.2
- 在医生做决策时只凭 $L^*$ （如办公血压），此时 $L^*$ 完全中介 $L$ 对 $A$ 的影响，$L$ 与 $L^*$ 任选其一都能充分调整混杂。

---

## 4. 何时可以忽略测量误差？ <a name="skipping"></a>
- 若测量误差很小，可以不在DAG中特别区分实际值和观测值，简化分析。
- 复杂程序建议“先无误差分析，再必要时加测量误差层”。

---

## 5. 包含“非因果”箭头的因果图 <a name="noncausal"></a>
### 5.1 推广与定义
- 许多健康/社会科学中的DAG包含变量间的箭头，但部分变量无法实施明确干预。这类DAG称为“非因果”DAG。

#### Fine Point 9.3
- $L$ 的两重含义：物理量（如体重）、观测记录（如体重读数）。对$A$来说，调整观测值等价于调整$L$的实验，但对$Y$就未必。
- “对 $L^*$ 干预”，在医生决策但未改变物理$L$时等价于改变$A$。

### 5.2 非因果DAG的意义与局限
#### Fine Point 9.4
- 在有些统计模型（如FFRCISTG）中，DAG箭头只表示条件独立结构，但缺乏因果解释会导致工具性不足。
- 缺少严格因果箭头，可能导致对偏差调整产生误导结论。

### 5.3 隐变量与替代
- 不可干预的 $L$ 是未知高维 $H$ 的代理（如肥胖是多种遗传和环境因素的表现）。
- 真实的因果DAG（如Fig 9.14）外加 $H$ 节点，表明 $L$ 是 $H$ 的代理，这样路径阻断或许完全不同。

#### Fine Point 9.5
- 当 $L$ 是 $H$ 的替代品时，“前门公式”可用于识别某些效应。例如：
  $$
  E[Y_l] = \sum_{a} E[Y|a]\, Pr(a|l)
  $$
  但若存在 $L \rightarrow Y$ 直接路径，则无法识别。

---

## 6. 技术要点与微观总结 <a name="technical-points"></a>

### 6.1 主要公式（Main Formulas）
- 测量误差定义：

  $$
  e_A = A^* - A,\quad e_Y = Y^* - Y
  $$

- 测量误差独立性与非差异性：

  1. $f(e_Y, e_A) = f(e_Y) f(e_A)$
  2. $f(e_A|Y) = f(e_A)$
  3. $f(e_Y|A) = f(e_Y)$

- 因果效应与观测关联比较：

  - 真因果风险比:
    $$
    \text{Causal Risk Ratio} = \frac{Pr(Y_{a=1}=1)}{Pr(Y_{a=0}=1)}
    $$
  - 偏离后的观测风险比：
    $$
    \text{Observed Risk Ratio} = \frac{Pr(Y^*=1|A^*=1)}{Pr(Y^*=1|A^*=0)} \neq \text{Causal Risk Ratio}
    $$

### 6.2 要点总结（Key Points）
- 测量误差常常引入偏差并削弱或掩盖真实因果关系，不可忽略。
- 区分独立/非独立、差异/非差异性误差对于后续偏差修正方法至关重要。
- 某些DAG的调整集在变量作为隐变量代理或无法明确定义干预时会误导实际分析。
- 正确认识代理变量、观察变量与潜在真实变量之间的关系及其对因果推断的影响极其重要。

---

## 结论（Conclusions）
- **DAG应用建议**：务必质疑每个箭头是否有明确、合理的干预及因果语义，否则过度信赖“非因果”DAG可能给偏差“罩上科学伪装”。
- **实际操作**：优先保障变量的高质量测量；如无法避免误差，需评估误差结构并在分析中明示相关假设和局限性。
- **将来方向**：因果图和判别方法依赖于当前知识，科学进步随时可能改变DAG结构和推断结果。

---

> **建议阅读下一章前：确保理解误测变量对偏倚、DAG结构和估计公式的影响，以及何为“可干预变量”、“代理变量”及其对分析的根本意义。**

---

# 附录：术语速查表

| 英文          | 中文            | 公式/示意                                      |
|---------------|----------------|------------------------------------------------|
| Measurement bias | 测量偏差/信息偏差 | 观测关联 ≠ 真实因果效应                        |
| Nondifferential | 非差异性误差     | $f(e|y) = f(e)$                                |
| Independent    | 独立误差        | $f(e_A, e_Y) = f(e_A)f(e_Y)$                   |
| Confounder         | 混杂因子          | $A \leftarrow L \rightarrow Y$                 |
| Surrogate/confounder | 代理/替代变量   | $L^*$ 代表 $L$                                 |
| Collider       | 合流因子        | $A \rightarrow C \leftarrow Y$                 |
| Causal DAG     | 严格因果有向图    | 每个箭头有明确定义的干预含义                    |
| Noncausal DAG  | “非因果”图      | 存在箭头指向无法干预变量，对应代理或未知高维$H$ |

---

*如需更详细举例或FLOW CHART结构图，请告知。*