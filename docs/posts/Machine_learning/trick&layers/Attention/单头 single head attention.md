---
date: 2025-09-10 20:49:27
title: 单头 single head attention
category: Machine Learning
tags: [Machine Learning,Attention]

---
下面我将详细解释**单头注意力（Single-Head Attention）**的数学机制，包含所有关键公式的推导和说明。整个过程分为 5 个步骤：

---

### **1. 输入表示（Input Representation）**
假设输入序列有 $n$ 个 token，每个 token 的嵌入向量维度为 $d_{\text{model}}$。输入矩阵表示为：
$$
X \in \mathbb{R}^{n \times d_{\text{model}}} = \begin{bmatrix} x_1 \\ x_2 \\ \vdots \\ x_n \end{bmatrix}
$$
其中 $(x_i \in \mathbb{R}^{1 \times d_{\text{model}}})$ 是第 $(i)$ 个 token 的嵌入向量。

---

### **2. 线性投影（Linear Projections）**
通过三个权重矩阵 $W^Q, W^K, W^V$，将输入投影到 Query、Key、Value 空间：
$$
\begin{align*}
Q &= X \cdot W^Q, \quad &W^Q \in \mathbb{R}^{d_{\text{model}} \times d_k} \\
K &= X \cdot W^K, \quad &W^K \in \mathbb{R}^{d_{\text{model}} \times d_k} \\
V &= X \cdot W^V, \quad &W^V \in \mathbb{R}^{d_{\text{model}} \times d_v}
\end{align*}
$$
- \(Q\)（Query矩阵）维度： $n \times d_k$
- \(K\)（Key矩阵）维度： $n \times d_k$
- \(V\)（Value矩阵）维度： $n \times d_v$

> **说明**：在标准 Transformer 中，通常设 $d_k = d_v$。例如当 $d_{\text{model}} = 512$ 时，单头可能取 $d_k = d_v = 64$。

---

### **3. 注意力分数计算（Attention Scores）**
计算 Query 和 Key 的点积，得到原始注意力分数矩阵：
$$
S = Q \cdot K^T \in \mathbb{R}^{n \times n}
$$
其中元素 $S_{ij} = q_i \cdot k_j^T$ 表示第 $i$ 个 token 对第 $j$个 token 的相似度。

---

### **4. 缩放与归一化（Scaling & Softmax）**
#### (a) **缩放（防止点积过大）**：
$$
S_{\text{scaled}} = \frac{S}{\sqrt{d_k}}
$$
#### (b) **Softmax 归一化**：
对每一行应用 softmax，得到注意力权重矩阵：
$$
A = \text{softmax}(S_{\text{scaled}}) \in \mathbb{R}^{n \times n}
$$
具体计算为：
$$
A_{ij} = \frac{\exp(S_{\text{scaled}, ij})}{\sum_{k=1}^{n} \exp(S_{\text{scaled}, ik})}
$$
此时 $A$ 满足 $sum_{j=1}^{n} A_{ij} = 1$（每行和为 1）。

---

### **5. 加权求和（Output Calculation）**
用注意力权重 \(A\) 对 Value 矩阵加权求和，得到输出：
$$
\text{Output} = A \cdot V \in \mathbb{R}^{n \times d_v}
$$
第 \(i\) 个 token 的输出向量为：
$$
\text{output}_i = \sum_{j=1}^{n} A_{ij} \cdot v_j
$$

---

### **完整公式汇总**
$$
\boxed{
\begin{align*}
Q &= X \cdot W^Q \\
K &= X \cdot W^K \\
V &= X \cdot W^V \\
S &= Q \cdot K^T \\
S_{\text{scaled}} &= \frac{S}{\sqrt{d_k}} \\
A &= \text{softmax}(S_{\text{scaled}}) \\
\text{Output} &= A \cdot V
\end{align*}
}
$$

---

### **几何解释**
1. **Query-Key 点积**  
   $S_{ij} = q_i \cdot k_j^T = \|q_i\| \|k_j\| \cos \theta_{ij}$
   夹角 $theta_{ij}$ 越小（相似度越高），分数越大。

2. **Softmax 的作用**  
   将分数转化为概率分布，突出重要关系：  
   ![](https://miro.medium.com/v2/resize:fit:1400/1*_92bnsMJy8Bl6I5LayptIg.png)

3. **加权输出**  
   输出是 Value 向量的凸组合：\(\text{output}_i = \sum_j A_{ij} v_j\)，其中 \(\sum_j A_{ij} = 1\)。

---

### **实例演算（简化版）**
假设输入序列：$(X = \begin{bmatrix} x_1 \\ x_2 \end{bmatrix})$（2 个 token），设 $(d_k = d_v = 2)$：
1. **投影**：
   $$
   Q = \begin{bmatrix} 1 & 3 \\ 2 & 0.5 \end{bmatrix}, \ 
   K = \begin{bmatrix} 0.5 & 2 \\ 1 & 3 \end{bmatrix}, \ 
   V = \begin{bmatrix} 0 & 4 \\ 1 & 2 \end{bmatrix}
   $$
2. **注意力分数**：
   $$
   S = QK^T = \begin{bmatrix} 
   (1)(0.5)+(3)(1) & (1)(2)+(3)(3) \\
   (2)(0.5)+(0.5)(1) & (2)(2)+(0.5)(3)
   \end{bmatrix} = \begin{bmatrix} 3.5 & 11 \\ 1.5 & 5.5 \end{bmatrix}
   $$
3. **缩放**（设 \(d_k=2\)）：
   $$
   S_{\text{scaled}} = \frac{S}{\sqrt{2}} = \begin{bmatrix} 2.47 & 7.78 \\ 1.06 & 3.89 \end{bmatrix}
   $$
4. **Softmax 归一化**（按行）：
   $$
   A = \begin{bmatrix} 
   \frac{e^{2.47}}{e^{2.47} + e^{7.78}} & \frac{e^{7.78}}{e^{2.47} + e^{7.78}} \\
   \frac{e^{1.06}}{e^{1.06} + e^{3.89}} & \frac{e^{3.89}}{e^{1.06} + e^{3.89}}
   \end{bmatrix} \approx \begin{bmatrix} 0.006 & 0.994 \\ 0.047 & 0.953 \end{bmatrix}
   $$
5. **输出**：
   $$
   \text{Output} = A \cdot V = \begin{bmatrix} 
   0.006 \cdot 0 + 0.994 \cdot 1 & 0.006 \cdot 4 + 0.994 \cdot 2 \\
   0.047 \cdot 0 + 0.953 \cdot 1 & 0.047 \cdot 4 + 0.953 \cdot 2
   \end{bmatrix} \approx \begin{bmatrix} 0.994 & 2.012 \\ 0.953 & 2.094 \end{bmatrix}
   $$
   - 输出 1 接近 \(v_2\)（因权重 0.994）
   - 输出 2 接近 \(v_2\)（因权重 0.953）

---

### **数学意义总结**
1. **动态权重分配**：\(A_{ij}\) 表示 token \(i\) 对 token \(j\) 的依赖强度。
2. **信息融合**：输出是全局上下文感知的新表示。
3. **可导性**：所有操作可微，支持端到端训练。
4. **计算复杂度**：$(O(n^2 d_k))$，序列较长时需优化（如稀疏注意力）。


> 总而言之的数学公式：
### $Attention(Q,K,V)=softmax(\frac{QK^T}{\sqrt{d_k}})V$tion(Q,K,V)=softmax(\frac{QK^T}{\sqrt{d_k}})V$