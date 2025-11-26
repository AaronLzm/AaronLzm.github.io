---
date: 2025-09-17 11:19:05
title: Chapter_11
category: Causal inference
tags: [DeepSeek-R1-0528-2nd,response_md]

---
<think>
We are summarizing Chapter 11 "WHY MODEL?" from the provided text. The chapter has several sections: 11.1, 11.2, 11.3, 11.4, 11.5, and includes Fine Points and Technical Points.

We'll structure the summary by sections and subsections as per the provided text. Since we cannot see the images, we will describe the information based on the text and captions.

Note: The chapter is about the need for models in data analysis, contrasting nonparametric and parametric estimators, and discussing smoothing and the bias-variance trade-off.

Let's break it down:

1. Chapter Introduction (Page 1, before 11.1)
2. Section 11.1: Data cannot speak for themselves
3. Section 11.2: Parametric estimators of the conditional mean
4. Section 11.3: Nonparametric estimators of the conditional mean
5. Section 11.4: Smoothing
6. Section 11.5: The bias-variance trade-off
7. Fine Point 11.1 and 11.2, and Technical Point 11.1 (we'll include them in their respective sections or as separate subheadings if they are standalone)

We'll follow the example output format.

Important: We must use LaTeX for formulas and markdown formatting.

Let's begin.
</think>
### Chapter 11: WHY MODEL?

#### Chapter Introduction  
**子章节内容**  
本章介绍第II部分（涉及真实数据分析）与第I部分（概念性分析）的核心差异，强调回归模型（如线性和逻辑模型）在因果推断和预测中的必要性。提供书籍网站链接（含R/SAS/Stata/Python代码），并说明模型的核心作用：弥补数据不足，通过参数化估计补充信息。明确本章目标为对比非参数与参数估计方法，并讨论平滑性（smoothing）和偏差-方差权衡（bias-variance trade-off）。

**技术重点（Technical Points）**  
- **核心理论**：参数化模型通过先验数学限制（如函数形式）补充数据信息，非参数估计则无此限制。  
- **重要概念**：  
  - *参数条件均值模型*：用有限参数描述条件期望函数（如 $E[Y|A] = \theta_0 + \theta_1 A$）。  
  - *一致性估计量*：样本量增大时，估计值收敛于总体参数（如样本均值是 $E[Y|A=a]$ 的一致性估计）。  
- **应用场景**：处理连续/多分类处理变量时，当数据稀疏（如无人接受剂量 $A=90$），需用模型外推估计。

**细节要点（Fine Points）**  
- **辅助信息**：第II部分需计算机实现回归模型，第I部分手工计算即可。  
- **相关背景**：统计建模文献庞大，本章仅概述关键问题；因果推断暂不讨论至下一章。  

---

#### 11.1 Data cannot speak for themselves  
**子章节内容**  
以16名HIV患者研究为例：处理变量 $A$（抗病毒治疗剂量），结局 $Y$（CD4细胞计数）。目标为估计总体条件期望 $E[Y|A=a]$。  
- 当 $A$ 为二分类（$A=0/1$）或四分类时，样本均值可直接估计（图11.1-11.2）。  
- 当 $A$ 连续（0–100 mg）且某些剂量无数据（如 $A=90$），样本均值未定义（图11.3），需模型辅助。  

**技术重点（Technical Points）**  
- **核心理论**：数据无法"自我表达"时（如连续处理剂量下数据稀疏），需模型补充信息。  
- **关键公式**：估计量 $\hat{E}[Y|A=a]$ 需满足一致性（如样本均值 $\hat{E}[Y|A=a] = \frac{1}{n_a} \sum_{i:A_i=a} Y_i$）。  
- **重要概念**：  
  - *估计量*（estimator）: 数据的函数（如样本均值）。  
  - *估计值*（estimate）: 估计量在具体数据集的输出结果。  

**细节要点（Fine Points）**  
- **案例分析**：  
  - $A$ 二分类：$\hat{E}[Y|A=1]=146.25$, $\hat{E}[Y|A=0]=67.50$（图11.1）。  
  - $A$ 四分类：$\hat{E}[Y|A=1]=70.0$, $A=2:80.0$, $A=3:117.5$, $A=4:195.0$（图11.2）。  
- **辅助信息**：置信区间宽度随类别数增加而增大（如四分类比二分类更宽）。  

---

#### 11.2 Parametric estimators of the conditional mean  
**子章节内容**  
针对 $A=90$ 无数据问题，引入线性均值模型 $E[Y|A] = \theta_0 + \theta_1 A$。通过最小二乘法拟合参数（$\hat{\theta}_0=24.55$, $\hat{\theta}_1=2.14$），外推估计 $\hat{E}[Y|A=90] = 24.55 + 90 \times 2.14 = 216.9$（图11.4）。  

**技术重点（Technical Points）**  
- **核心理论**：参数化模型通过先验限制（如线性函数形式）借用其他 $A$ 值信息。  
- **关键公式**：  
  - 线性模型：$E[Y|A] = \theta_0 + \theta_1 A$。  
  - 最小二乘估计：最小化残差平方和 $\sum_{i=1}^n (Y_i - \theta_0 - \theta_1 A_i)^2$。  
- **重要概念**：  
  - *同方差性*（homoscedasticity）: 残差方差独立于 $A$（置信区间计算前提）。  
  - *模型误设*（model misspecification）: 若真实关系非线性，估计有偏。  
- **应用场景**：外推无观测的处理水平（如 $A=90$）。  

**细节要点（Fine Points）**  
- **案例分析**：$\hat{E}[Y|A=90]=216.9$，95% CI: (172.1, 261.6)（程序11.2）。  
- **辅助信息**：  
  - 避免术语"剂量-反应曲线"（dose-response curve），因其隐含因果性（可能被混杂扭曲）。  
  - 参数估计 $\hat{\theta}_0$, $\hat{\theta}_1$ 通过线性代数计算。  

---

#### 11.3 Nonparametric estimators of the conditional mean  
**子章节内容**  
定义非参数估计：无先验限制的条件期望估计（如二分类 $A$ 的样本均值）。饱和模型（如 $E[Y|A] = \theta_0 + \theta_1 A$ 当 $A$ 二分类）实为非参数估计，因参数数等于未知条件均值数（无额外限制）。  

**技术重点（Technical Points）**  
- **核心理论**：非参数估计需Fisher一致性（Fisher consistency）：总体数据下估计量等于目标参数。  
- **重要概念**：  
  - *饱和模型*（saturated model）: 参数数等于待估条件均值数（如二分类 $A$ 有2参数）。  
  - *简约模型*（parsimonious model）: 用少量参数估计多目标量（如线性模型估101个 $E[Y|A=a]$）。  
- **应用场景**：第I部分方法（标准化、IP加权等）均基于饱和模型的非参数估计。  

**细节要点（Fine Points）**  
- **辅助信息**：  
  - 当 $A$ 有100水平且 $A=90$ 无数据时，无非参数估计。  
  - 可识别性假设（identifiability assumptions）与建模假设（modeling assumptions）的区别（前者需无限数据，后者因样本有限）。  
- **相关背景**：统计文献中"非参数估计"有时指弱限制模型（如核回归），见技术点11.1。  

---

#### 11.4 Smoothing  
**子章节内容**  
通过增加参数（如二次项 $A^2$）使模型更灵活（图11.5）。平滑度与参数数负相关：  
- 2参数（线性）最平滑，$n$ 参数（$n$=样本量）最不平滑（插值数据）。  
- 平滑通过借用其他 $A$ 值信息实现（如估计 $E[Y|A=90]$ 时用 $A \in [80,100]$ 数据）。  

**技术重点（Technical Points）**  
- **核心理论**：平滑是噪声数据到光滑曲线的转换，信息借用程度取决于模型参数数或窗口宽度。  
- **关键公式**：  
  - 二次模型：$E[Y|A] = \theta_0 + \theta_1 A + \theta_2 A^2$（$\hat{\theta}_0=-7.41$, $\hat{\theta}_1=4.11$, $\hat{\theta}_2=-0.02$）。  
  - $\hat{E}[Y|A=90] = -7.41 + 90 \times 4.11 + 90^2 \times (-0.02) = 197.1$。  
- **重要概念**：  
  - *线性组合*：模型线性指参数线性（如 $A^2$ 项仍属线性模型）。  
  - *插值*（interpolation）: $n$ 参数模型使数据点位于估计曲线上。  

**细节要点（Fine Points）**  
- **案例分析**：$\hat{E}[Y|A=90]=197.1$，95% CI: (142.8, 251.5)（程序11.3）。  
- **辅助信息**：高维模型中平滑概念不变（参数越少，预测曲面越光滑）。  

---

#### 11.5 The bias-variance trade-off  
**子章节内容**  
对比线性（2参数）和二次（3参数）模型对 $E[Y|A=90]$ 的估计：  
- 线性：$\hat{E}=216.9$（CI: 172.1–261.6）；二次：$\hat{E}=197.1$（CI: 142.8–251.5）。  
- 偏差-方差权衡：  
  - 更多参数 → 更少限制 → 偏差↓但方差↑（CI更宽）。  
  - 更少参数 → 更平滑 → 偏差↑（若模型错误）但方差↓。  

**技术重点（Technical Points）**  
- **核心理论**：模型选择需权衡偏差与方差；误设模型导致置信区间未校准。  
- **重要概念**：  
  - *模型误设*：推断正确需模型指定正确（实际中难满足）。  
  - *敏感性分析*：通过不同模型检验估计稳健性。  
- **应用场景**：因果推断依赖近似无模型误设条件。  

**细节要点（Fine Points）**  
- **案例分析**：3参数模型在真实关系为直线或曲线时均正确（$\theta_2=0$ 或 $\theta_2 \neq 0$），比2参数更稳健。  
- **相关背景**：  
  - 频率学派置信区间（confidence interval）与贝叶斯可信区间（credible interval）的区别（见精要点11.2）。  
  - 高维模型中贝叶斯推断对先验分布敏感。  

---

#### Technical Point 11.1: A taxonomy of commonly used models  
**子章节内容**  
分类条件均值模型：  
- **线性模型**：$E[Y|X] = \sum_{i=0}^p \theta_i X_i$（恒等连接）。  
- **广义模型**：$g\{E[Y|X]\} = \sum_{i=0}^p \theta_i X_i$（如对数连接 $g=\log$，logit连接 $g=\text{logit}$）。  
- **半参数模型**：仅指定 $E[Y|X]$ 形式，不限制 $Y|X$ 或 $X$ 分布。  
- **非参数回归**：核回归 $E[Y|X=x] = \frac{\sum_i w_h(x-X_i)Y_i}{\sum_i w_h(x-X_i)}$（带宽 $h$ 控制平滑）。  

**技术重点（Technical Points）**  
- **核心理论**：参数模型可借用远端 $X$ 信息，核回归仅借用邻近 $X$ 信息。  
- **重要概念**：  
  - *核函数* $w_h(z)$：在 $z=0$ 处最大，随 $|z|$ 增大递减。  
  - *广义加性模型*（GAM）：$E[Y|X] = \sum_{i=0}^p f_i(X_i)$（$f_i$ 为平滑函数）。  

**细节要点（Fine Points）**  
- **辅助信息**：  
  - 逻辑回归（logit连接）确保 $E[Y|X] \in (0,1)$。  
  - GEE模型处理重复测量数据。  

---  
**总结完整性声明**  
以上内容严格基于PDF原文，未添加主观推测。未明确处（如图片细节）已标注，数学公式按LaTeX格式呈现，技术术语保留英文以确保准确性。