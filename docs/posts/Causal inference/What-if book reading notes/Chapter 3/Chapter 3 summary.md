---
date: 2025-09-17 11:19:05
title: Chapter 3 summary
category: Causal inference
tags: [Chapter 3,What-if book reading notes]

---
以下是 Chapter 3 "Observational Studies" 的核心内容总结，包含所有重点、Technical Points 和 Fine Points 的结论，严格使用 Markdown 的 LaTeX 公式格式。中英双语呈现：

---

### **核心概念总结**
#### **1. 观察性研究 vs. 随机实验**
- **关键区别**：观察性研究中治疗分配非随机，需依赖可识别性条件（identifiability conditions）估计因果效应。  
  **数学表达**：  
  $$
  \text{因果风险比} = \frac{\Pr[Y^{a=1}=1]}{\Pr[Y^{a=0}=1]} \quad \text{需满足可识别性条件}
  $$
- **挑战**：混杂（confounding）可能使关联不等于因果效应（例：天空注视研究中雷声混杂）。

#### **2. 可识别性条件 (Identifiability Conditions)**
观察性研究需满足三个条件才能估计因果效应：
1. **一致性 (Consistency)**  
   - 反事实结果 $Y^a$ 需明确定义，且观测结果满足 $Y = Y^a$ 当 $A = a$。  
   - *要求*：干预 $a$ 必须明确定义（如心脏移植手术的详细协议）。  
   - *问题*：模糊干预（如"减肥"）无法明确定义 $Y^a$。

2. **可交换性 (Exchangeability)**  
   - **条件可交换性**：给定协变量 $L$，治疗组与对照组可交换。  
     $$
     Y^a \perp\!\!\!\perp A \mid L \quad \text{(关键条件)}
     $$  
   - *挑战*：未测混杂 $U$ 可能导致 $Y^a \not\perp\!\!\!\perp A \mid L$（如吸烟状态未测量）。  
   - *验证*：不可直接检验，依赖领域知识选择足够 $L$。

3. **正值性 (Positivity)**  
   - 所有 $L$ 层中，各治疗组概率为正：  
     $$
     \Pr[A=a \mid L=l] > 0 \quad \text{对所有} \ l \ \text{满足} \ \Pr[L=l] \neq 0
     $$  
   - *违反后果*：若某 $L$ 层无治疗组，则无法外推反事实结果（如危重患者 $L=1$ 未接受移植）。

---

### **Technical Points 结论**
#### **Technical Point 3.1: 正值性对标准化与 IP 加权的影响**
- **标准化均值**：需 $\Pr[A=a \mid L=l] > 0$ 对所有 $l$ 成立，否则未定义。  
- **IP 加权均值**：  
  $$
  E\left[\frac{I(A=a)Y}{f[A \mid L]}\right] \ \text{恒有定义，但当正值性不成立时，其估计的是} \ E[Y^a \mid L \in Q(a)]\Pr[L \in Q(a)]
  $$  
  其中 $Q(a) = \{l: \Pr(A=a \mid L=l)>0\}$。若 $Q(1) \neq Q(0)$，因果对比无意义。

---

### **Fine Points 结论**
#### **Fine Point 3.1: 因果效应的可识别性**
- **可识别性定义**：若假设能唯一确定因果效应量，则效应可识别。  
- **观察性研究**：需外部假设（如 $Y^a \perp\!\!\!\perp A \mid L$）补充数据，否则效应可能偏离真实值（如未测混杂导致偏倚）。

#### **Fine Point 3.2: 交叉随机实验**
- **假设**：无残留效应、个体效应不随时间变化。  
- **随机分配顺序**：若处理无残留效应，可估计平均因果效应 $E[\alpha_i]$。

#### **Fine Point 3.3: 状态与干预**
- **问题**：状态（如肥胖）作为"处理"时反事实结果 $Y^a$ 定义模糊（因干预方式未指定）。  
- **解决方案**：明确定义干预（如"通过运动减重 5kg"）。

#### **Fine Point 3.4: 协议歧义**
- **影响**：若协议未规定治疗细节（如外科医生经验），则 $\Pr[Y^a=1]$ 因治疗版本差异而变化。  
- **建议**：在务实试验（pragmatic trials）中允许现实世界变异。

#### **Fine Point 3.5: 可能世界理论**
- **Lewis 反事实理论**：$Y^a$ 定义为最接近现实世界中个体接受 $a$ 的结果，故当 $A=a$ 时 $Y^a=Y$ 恒成立。  
- **局限**：依赖"最接近世界"概念仍模糊；**Robin & Greenland** 主张用明确定义的干预替代。

#### **Fine Point 3.6: 归因分数**
- **超额分数 (Excess Fraction)**：  
  $$
  \frac{\Pr[Y=1] - \Pr[Y^{a=0}=1]}{\Pr[Y=1]} \quad \text{(可观察数据计算)}
  $$  
  表示可归因于暴露的病例比例（如食用仙馐致病的比例）。  
- **病因分数 (Etiologic Fraction)**：需强假设估计暴露直接致病的比例。

---

### **关键方法论：目标试验框架 (Target Trial)**
#### **核心思想**
- 观察性分析应**模仿目标随机试验**的协议：  
  1. **合格标准** (Eligibility)  
  2. **干预细节** (Intervention protocols)  
  3. **结局指标** (Outcome)  
  4. **随访时间** (Follow-up)  
  5. **因果对比** (Causal contrast)  

#### **作用**
- **解决一致性问题**：明确反事实 $Y^a$ 的定义（如"心脏移植+术后免疫抑制"）。  
- **提高可交换性**：指导选择协变量 $L$ 以模拟条件随机化。  
- **避免空想因果**：如"减肥效应"需指定具体干预（如"每年减 BMI 5%"）。

#### **数学保障**
若可识别性条件成立，则：  
- **IP 加权** 或 **标准化** 可估计因果效应：  
  $$
  \Pr[Y^a=1] = \sum_l \Pr[Y=1 \mid A=a, L=l] \Pr[L=l]
  $$  
  或  
  $$
  \Pr[Y^a=1] = E\left[\frac{I(A=a)Y}{\Pr[A=a \mid L]}\right]
  $$

---

### **中英术语对照**
| 英文 | 中文 |
|------|------|
| Observational Study | 观察性研究 |
| Identifiability Conditions | 可识别性条件 |
| Consistency | 一致性 |
| Exchangeability | 可交换性 |
| Positivity | 正值性 |
| Counterfactual Outcome ($Y^a$) | 反事实结果 |
| Target Trial | 目标试验 |
| Confounding | 混杂 |

--- 

此总结严格覆盖原文所有核心内容、技术细节及案例，数学公式符合 LaTeX 标准格式，关键术语中英对照。