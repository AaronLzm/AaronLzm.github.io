---
date: 2025-09-17 11:19:05
title: Chapter 14 结构嵌套模型(structural nested models)
category: Causal inference
tags: [Chapter 14,What-if book reading notes]

---
以下是《因果推断》第14章的核心内容总结，包含关键概念、公式、结论及思维导图框架：

---

### **核心内容总结**

ACE of smoking cessation A on weight gain Y in each strata defined by the covariates L
#### **1. G估计目的**
- 估计**条件平均因果效应**：$E[Y^{a=1,c=0} | L] - E[Y^{a=0,c=0} | L]$
- 解决时不变处理的混杂偏倚，需配合IP加权调整删失（$W^C = 1 / \Pr[C=0|L,A]$）

#### **2. 结构嵌套模型 (SNM)**
- **模型形式**：
  $$
  E[Y^a - Y^{a=0} | A=a, L] = \beta_1 a + \boldsymbol{\beta_2} a L
  $$
  - $\beta_1$：基准效应，$\boldsymbol{\beta_2}$：效应修饰（如$L$为吸烟强度）
- **特点**：
  - 半参数模型：不指定截距项和$L$的主效应（更稳健）
  - 估计**分层效应**（非总体效应），需包含所有效应修饰项

#### **3. G估计步骤**
1. **构造反事实**：  
   $H(\psi^\dagger) = Y - \psi^\dagger A$  
   （$\psi^\dagger$为候选参数）
2. **拟合处理模型**：  
   $\text{logit} \Pr[A=1 | H(\psi^\dagger), L] = \alpha_0 + \alpha_1 H(\psi^\dagger) + \boldsymbol{\alpha_2} L$
3. **搜索$\psi$**：找到使$\alpha_1=0$的$\psi^\dagger$（即$H(\psi^\dagger) \perp A \mid L$)
4. **置信区间**：逆检验所有$P>0.05$的$\psi^\dagger$值域

#### **4. 关键结论**
- **秩保持 (Rank Preservation)**：
  - 假设个体因果效应恒定：$Y_i^a - Y_i^{a=0} = \psi_1 a + \psi_2 a L_i$
  - 实际中**不成立**（个体效应异质性），但G估计仍收敛到$\beta$
- **与MSM的关系**：
  - SNM估计条件效应，MSM估计边际效应
  - 饱和MSM：$E[Y^a | V] = \beta_0 + \beta_1 a + \beta_2 a V + \beta_3 V$  
    可退化为SNM：$E[Y^a - Y^{a=0} | V] = \beta_1 a + \beta_2 a V$
- **双稳健估计** (Technical Point 14.2)：  
  若模型$E[H(\beta^\dagger)|L]$正确，即使处理/删失模型错误，估计仍一致

#### **5. 精细点结论 (Fine Points)**
- **未测量混杂的敏感性分析**：  
  若交换性不成立（$\alpha_1 \neq 0$），可假设$\alpha_1$取值并重复G估计，绘制效应敏感性曲线。
- **多参数扩展**：  
  若$L$含效应修饰变量$V$，模型扩展为$E[Y^a - Y^{a=0}|A,L] = \beta_1 a + \beta_2 a V$，需多维搜索$(\beta_1, \beta_2)$使$\alpha_1=\alpha_2=0$。
- **模型选择**：  
  - 连续处理：需指定剂量-响应函数（如样条）  
  - 二值结局：避免Logistic SNM（非可压缩性），改用乘性SNM（Technical Point 14.1）

---

### **思维导图**
```mermaid
mindmap
  root((G估计与SNM))
    基础概念
      "目标： 条件平均因果效应"
      "假设： 条件可交换性(Y⁽ᵃ⁾⊥A|L)"
      "数据： NHEFS（戒烟与体重数据）"
    模型设定
      "结构嵌套均值模型"
        "E[Y⁽ᵃ⁾ - Y⁽⁰⁾ | A,L] = β₁a + β₂aL"
        "半参数特性（无截距/L主效应）"
      "秩保持"
        "定义： Y⁽ᵃ⁾ - Y⁽⁰⁾ = ψa (常数效应)"
        "实际中不成立但估计仍有效"
    估计方法
      "步骤"
        "1. 构造 H(ψ) = Y - ψA"
        "2. 拟合加权逻辑回归"
        "3. 搜索 ψ 使 α₁=0"
        "4. 置信区间（逆检验/自助法）"
      "扩展"
        "多参数： 多维搜索"
        "双稳健： 结合条件期望模型"
    比较与关联
      "vs 边际结构模型(MSM)"
        "MSM估计边际效应"
        "SNM估计条件效应"
      "vs 标准化"
        "SNM更少参数假设"
    优势与局限
      "优点"
        "处理连续处理"
        "半参数稳健性"
        "敏感性分析支持"
      "局限"
        "需正确指定结构模型"
        "删失需IP加权预处理"
```

---

### **关键公式汇总**
| **公式**                                                                                            | **含义**  |
| ------------------------------------------------------------------------------------------------- | ------- |
| $H(\psi^\dagger) = Y - \psi^\dagger A$                                                            | 反事实构造   |
| $\text{logit} \Pr[A=1 \mid H(\psi^\dagger), L] = \alpha_0 + \alpha_1 H + \boldsymbol{\alpha_2} L$ | 处理模型    |
| $E[Y^a - Y^{a=0} \mid A=a, L] = \beta_1 a + \boldsymbol{\beta_2} a L$                             | SNM核心方程 |
| $W^C = 1 / \Pr[C=0 \mid L, A]$                                                                    | 删失的IP权重 |

此总结覆盖第14章所有核心方法、假设及技术细节，突出G估计在因果推断中的独特价值：通过反事实独立条件解决混杂，兼具灵活性与半参数稳健性。