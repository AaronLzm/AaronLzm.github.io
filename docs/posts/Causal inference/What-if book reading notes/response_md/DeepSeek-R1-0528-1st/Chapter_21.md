---
title: Chapter_21
category: Causal inference
tags: [DeepSeek-R1-0528-1st,response_md]

---
<think>
We are summarizing Chapter 21: G-METHODS FOR TIME-VARYING TREATMENTS from the provided text. The chapter addresses the problem of bias in traditional methods for time-varying treatments due to treatment-confounder feedback and introduces g-methods (g-formula, IP weighting, g-estimation, and doubly-robust generalizations) as solutions. The chapter uses a sequentially randomized experiment dataset (Table 21.1) to demonstrate that g-methods yield the correct null effect estimate when traditional methods fail.

The chapter is structured into sections:
21.1 The g-formula for time-varying treatments
21.2 IP weighting for time-varying treatments
21.3 A doubly robust estimator for time-varying treatments
21.4 G-estimation for time-varying treatments
21.5 Censoring is a time-varying treatment
21.6 The big g-formula

We will summarize each section, including technical points and fine points, and present mathematical formulas in LaTeX. We must ensure no important details are omitted and that technical terms are kept in English while the summary is in Chinese.

Let's proceed step by step.
</think>
### 第21章总结：时变处理的G-方法  
本章解决传统方法在存在**治疗-混杂因素反馈**（treatment-confounder feedback）的时变处理中的偏倚问题，引入三类**G-方法**（g-formula、IP加权、g-估计及其双重稳健推广）作为解决方案。所有方法均基于可识别性条件（序贯可交换性、正值性、一致性），并在模拟数据集（表21.1）中成功估计零效应（真实效应为0），而传统方法失败。

---

#### **21.1 时变处理的G-公式**  
**核心思想**：通过标准化协变量分布计算反事实均值 \(E[Y^{\bar{a}}]\)。  
**技术要点**：  
1. **公式结构**：  
   - 对于时变处理 \(\bar{A} = (A_0, A_1, \dots, A_K)\) 和时变协变量 \(\bar{L}\)：  
     $$
     E[Y^{\bar{a}}] = \sum_{\bar{l}} E[Y \mid \bar{A} = \bar{a}, \bar{L} = \bar{l}] \prod_{k=0}^K f(l_k \mid \bar{a}_{k-1}, \bar{l}_{k-1})
     $$  
     其中 \(\bar{l}_{k-1}\) 是截至时间 \(k-1\) 的协变量历史，求和遍历所有可能的 \(\bar{l}\) 路径。  
   - **关键区别**：需条件于既往治疗和协变量历史（时固定处理无需此步骤）。  

2. **可计算性条件**：  
   - **正值性**：若 \(f(l_k \mid \bar{a}_{k-1}, \bar{l}_{k-1}) > 0\)，则需存在个体满足 \((\bar{A} = \bar{a}, \bar{L} = \bar{l})\)。  

3. **应用示例**（表21.1数据）：  
   - "从不治疗"策略（\(a_0=0, a_1=0\)）：  
     $$
     \hat{E}[Y^{0,0}] = 84 \times 0.25 + 52 \times 0.75 = 60
     $$  
   - "始终治疗"策略（\(a_0=1, a_1=1\)）：  
     $$
     \hat{E}[Y^{1,1}] = 76 \times 0.5 + 44 \times 0.5 = 60
     $$  
     因果效应估计值：\(60 - 60 = 0\)（正确）。  

4. **注意事项**：  
   - 必须包含所有混杂因子（如忽略 \(L_1\) 会丧失因果解释）。  
   - 即使整体公式有因果解释，其组分（如 \(E[Y \mid A, L]\)）可能无因果意义。  

**结论**：G-公式通过模拟反事实世界（图21.1–21.2）解决传统方法的偏倚。  

---

#### **21.2 时变处理的IP加权**  
**核心思想**：创建伪总体（pseudo-population），其中治疗分配与混杂因素无关。  
**技术要点**：  
1. **权重定义**：  
   - **非稳定权重**：  
     $$
     W^{\bar{A}} = \prod_{k=0}^K \frac{1}{f(A_k \mid \bar{A}_{k-1}, \bar{L}_k)}
     $$  
   - **稳定权重**：  
     $$
     SW^{\bar{A}} = \prod_{k=0}^K \frac{f(A_k \mid \bar{A}_{k-1})}{f(A_k \mid \bar{A}_{k-1}, \bar{L}_k)}
     $$  

2. **估计反事实均值**：  
   - 在伪总体中，\(E[Y^{\bar{a}}] = E_{\text{ps}}[Y \mid \bar{A} = \bar{a}]\)（即按权重加权后 \(\bar{A} = \bar{a}\) 组的 \(Y\) 均值）。  

3. **应用示例**（表21.1）：  
   - 非稳定权重下，\(\hat{E}[Y^{0,0}] = \hat{E}[Y^{1,1}] = 60\)，效应估计为0（图21.3）。  

4. **边际结构模型（MSM）**：  
   - 处理高维策略：拟合饱和或非饱和模型（如 \(E[Y^{\bar{a}}] = \beta_0 + \beta_1 \text{cum}(\bar{a})\)）。  
   - 使用加权最小二乘法（WLS）估计参数，权重为 \(SW^{\bar{A}}\) 或 \(W^{\bar{A}}\)。  

**结论**：IP加权与G-公式等价，但更易处理高维数据，且不受**g-null悖论**影响（技术点21.3）。  

---

#### **21.3 双重稳健估计器**  
**核心思想**：结合治疗模型和结局模型，任一正确即可获得无偏估计。  
**技术要点**：  
1. **三步法**（以"始终治疗"策略 \(\bar{a}=1\) 为例）：  
   - **步骤1**：估计治疗概率 \(\pi_k = \Pr(A_k=1 \mid \bar{A}_{k-1}=1, \bar{L}_k)\)。  
   - **步骤2**：从时间 \(K\) 到 \(0\) 拟合序列回归模型，加入IP权重作为协变量。  
   - **步骤3**：计算所有个体的 \(B_0\) 样本均值作为 \(\hat{E}[Y^{\bar{a}}]\)。  

2. **多重稳健性**：  
   - **双重稳健**：若所有治疗模型或所有结局模型正确，则估计无偏。  
   - **K+2稳健**：对任意 \(m\)，若时间 \(0\) 至 \(m\) 的治疗模型和时间 \(m+1\) 至 \(K\) 的结局模型正确，则无偏。  

**结论**：双重稳健方法（如TMLE）在高维数据中提供更强的鲁棒性（技术点21.4–21.6）。  

---

#### **21.4 时变处理的G-估计**  
**核心思想**：通过结构嵌套均值模型（SNMM）估计处理效应，消除时变混杂偏倚。  
**技术要点**：  
1. **模型结构**：  
   - 例如两时间点模型：  
     - 时间 \(k=0\)： \(E[Y^{a_0,0} - Y^{0,0} \mid A_0=a_0] = \beta_0 a_0\)  
     - 时间 \(k=1\)： \(E[Y^{a_0,a_1} - Y^{a_0,0} \mid L_1}, A_0=a_0] = a_1(\beta_{11} + \beta_{12} L_1 + \cdots)\)  

2. **G-估计步骤**：  
   - 构造候选反事实 \(H_k(\psi^\dagger)\)（如 \(H_1(\psi) = Y - A_1(\psi_{11} + \psi_{12} L_1 + \cdots)\)）。  
   - 求解 \(\psi\) 使得治疗概率模型中的 \(H_k(\psi)\) 系数为0（技术点21.8）。  

3. **反事实均值估计**：  
   - \(E[Y^0]\) 由 \(H_0(\hat{\beta})\) 的样本均值估计。  
   - 动态策略需蒙特卡洛模拟（技术点21.9）。  

**结论**：G-估计适用于复杂模型，且保留零效应下的无偏性。  

---

#### **21.5 删失作为时变处理**  
**核心思想**：将删失视为额外时变处理，扩展G-方法。  
**技术要点**：  
1. **IP加权调整**：  
   - 非稳定权重：  
     $$
     W^{\bar{C}} = \prod_{k=1}^{K+1} \frac{1}{\Pr(C_k=0 \mid \bar{C}_{k-1}=0, \bar{A}_{k-1}, \bar{L}_{k-1})}
     $$  
   - 联合处理 \((\bar{A}, \bar{C})\) 的权重为 \(W^{\bar{A}} \times W^{\bar{C}}\)。  

2. **G-公式调整**：  
   - 所有项条件于未删失状态（\(\bar{C} = \bar{0}\)）。  

**结论**：调整后可估计 \(E[Y^{\bar{a}, \bar{c}=\bar{0}}]\)（即无删失时的因果效应）。  

---

#### **21.6 广义G-公式**  
**核心思想**：在包含未测变量的因果DAG下，G-公式可推广为**广义G-公式**（big g-formula）。  
**技术要点**：  
- 若所有变量（含未测 \(U\)）已知，则广义G-公式可识别 \(E[Y^g]\)。  
- **前门准则**等非混杂场景是广义G-公式的特例（技术点21.11–21.12）。  

**结论**：不同识别条件（如序贯可交换性、前门准则）数学上统一于广义G-公式框架。  

---  
### **关键图表**  
- **表21.1**：时变处理实验数据（8组，样本量、\(A_0, L_1, A_1, Y\) 均值）。  
- **图21.1**：观测数据的因果树图。  
- **图21.2**："始终治疗"策略的反事实树图。  
- **图21.3**：IP加权伪总体树图（含权重 \(W^{\bar{A}}\) 和伪总体大小）。  
- **图21.4**：生存分析中时变处理的因果图（含删失）。  

> **注**：所有方法均依赖可识别性条件（序贯可交换性、正值性、一致性）。实际应用中需警惕模型误设，建议结合多种方法（如G-公式与IP加权）验证结果。