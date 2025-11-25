---
title: KL Divergence in Variational Inference.
category: Machine Learning
tags: [Machine Learning,mathematics]

---
非常好且深刻的问题！你触及了变分推断（Variational Inference, VI）的核心。

是的，**KL散度非常适合用来做变分推断，而这正是因为它天然地、数学必然地成为了证据下界（ELBO）的一部分**。这两者不是简单的“适合”关系，而是**从解决VI核心问题的数学推导中，KL散度自然而然地“浮现”了出来**。

下面我们来一步步拆解这其中的逻辑和原因。

### 1. 变分推断（VI）的核心问题是什么？

变分推断要解决的是一个贝叶斯推理中的核心计算难题：**计算后验分布 (Posterior Distribution)** $p(z | x)$。

其中：
- $z$：模型中的隐变量（我们想推断的）。
- $x$：我们观测到的数据。

根据贝叶斯定理：
$$ p(z | x) = \frac{p(x | z) \, p(z)}{p(x)} $$
分母 $p(x)$ 称为**证据（Evidence）** 或**边缘似然（Marginal Likelihood）**。计算它需要对所有可能的 $z$ 进行积分（或求和）：
$$ p(x) = \int p(x | z) \, p(z) \, dz $$
这个积分在高维空间 often 是**难以计算（intractable）** 的。这就是VI要解决的问题。

**VI的思路是**：既然无法直接计算真正的后验 $p(z | x)$，我们就从一个简单的分布族 $Q$（例如高斯分布族）中，找到一个与 $p(z | x)$ **最接近**的分布 $q^*(z)$ 来近似它。

这就引出了两个问题：
1.  如何衡量“接近”？
2.  如何找到这个 $q^*(z)$？

### 2. KL散度如何自然地出现？

我们需要一个衡量分布 $q(z)$ 和 $p(z|x)$ 之间差异的度量。最直接的选择之一就是KL散度 $D_{KL}$。

我们的目标是最小化这个差异：
$$ q^*(z) = \arg\min_{q \in Q} D_{KL}\big( q(z) \parallel p(z | x) \big) $$

现在，我们展开这个KL散度：
$$
\begin{aligned}
D_{KL}\big( q(z) \parallel p(z | x) \big) &= \mathbb{E}_{z \sim q} \left[ \log \frac{q(z)}{p(z | x)} \right] \\
&= \mathbb{E}_{z \sim q} [ \log q(z) ] - \mathbb{E}_{z \sim q} [ \log p(z | x) ] \\
&= \mathbb{E}_{z \sim q} [ \log q(z) ] - \mathbb{E}_{z \sim q} [ \log p(x, z) ] + \mathbb{E}_{z \sim q} [ \log p(x) ] \quad \text{(因为 } p(z|x) = p(x,z)/p(x) \text{)} \\
&= \mathbb{E}_{z \sim q} [ \log q(z) ] - \mathbb{E}_{z \sim q} [ \log p(x, z) ] + \log p(x)
\end{aligned}
$$

我们注意到最后一项 $\log p(x)$ 是一个与 $q$ 无关的常数。我们将前两项重新排列，并取负号：

$$
D_{KL}\big( q(z) \parallel p(z | x) \big) = -\left( \mathbb{E}_{z \sim q} [ \log p(x, z) ] - \mathbb{E}_{z \sim q} [ \log q(z) ] \right) + \log p(x)
$$

令：
$$ \text{ELBO}(q) = \mathbb{E}_{z \sim q} [ \log p(x, z) ] - \mathbb{E}_{z \sim q} [ \log q(z) ] $$

上面的等式就变成了：
$$ D_{KL}\big( q(z) \parallel p(z | x) \big) = -\text{ELBO}(q) + \log p(x) $$

移项后得到：
$$ \log p(x) = \text{ELBO}(q) + D_{KL}\big( q(z) \parallel p(z | x) \big) $$

**这个等式是理解VI的关键！**
- $\log p(x)$ 是固定的常数（证据）。
- $D_{KL} \big( q(z) \parallel p(z | x) \big)$ 衡量了我们近似分布与真实后验的差距，总是 $\ge 0$。

因此，**ELBO是证据 $\log p(x)$ 的一个下界（Lower Bound）**。当我们的近似分布 $q(z)$ 越接近真实后验 $p(z|x)$，KL散度就越小，ELBO就越大，从而更紧地逼近真实的 $\log p(x)$。

**所以，我们的最小化KL散度的原始目标：**
$$ \min_q D_{KL}\big( q(z) \parallel p(z | x) \big) $$
**数学上完全等价于最大化ELBO：**
$$ \max_q \text{ELBO}(q) $$

因为 $\log p(x)$ 是常数，最小化KL散度就是最大化ELBO。

---

### 3. 为什么是 $D_{KL}(q \parallel p)$，而不是 $D_{KL}(p \parallel q)$？

这是另一个关键点，也是KL散度**非对称性**在VI中体现出的巨大优势。VI选择 $D_{KL}(q \parallel p)$（称为**反向KL**）是经过深思熟虑的：

| 特性 | $D_{KL}(q \parallel p)$ (Reverse KL, VI所用) | $D_{KL}(p \parallel q)$ (Forward KL) |
| :--- | :--- | :--- |
| **行为模式** | ****模式寻求（Mode-Seeking）**** | ****均值寻求（Mean-Seeking）**** |
| **效果** | 会让 $q(z)$ 抓住 $p(z\|x)$ 中的一个主要模式（峰值），而忽略其他模式。 | 会让 $q(z)$ 覆盖 $p(z\|x)$ 的所有模式，但可能导致在任何一个模式上都拟合不佳。 |
| **对 $q$ 的要求** | **避免在 $p$ 概率低的地方放置 $q$ 的概率质量**。即，$q(z)$ 只有在 $p(z\|x)$ 也有概率时才有概率。这通常会产生一个**更紧的、更安全的近似**。 | **避免在 $p$ 概率高的地方 $q$ 没有概率质量**。即，要求 $q(z)$ 必须覆盖所有 $p(z\|x)$ 有概率的区域。 |
| **计算可行性** | **在优化ELBO时，只需要对 $q$ 求期望** ($\mathbb{E}_{z \sim q}[\cdot]$)，这可以通过**重参数化技巧（Reparameterization Trick）** 和蒙特卡洛采样进行高效、可微的估计。这是VI和VAE能够成功的关键。 | 需要对真实后验 $p$ 求期望 ($\mathbb{E}_{z \sim p}[\cdot]$)，而这正是我们无法计算的！ |

**直观图示：**
想象真实后验 $p$ 是一个双峰分布（有两个波峰）。
- 使用 $D_{KL}(q \parallel p)$ 会让近似分布 $q$（如一个高斯分布）去拟合其中一个主要的波峰，得到一个虽然不完整但很精确的局部近似。
- 使用 $D_{KL}(p \parallel q)$ 会迫使单个高斯分布 $q$ 去覆盖两个波峰，结果可能是在两个峰之间形成一个宽而不准的“驼峰”，拟合效果反而更差。

VI通常选择更精确的**模式寻求**行为，并且其数学形式（对 $q$ 求期望）在计算上是可行的。

### 总结

1.  **根本原因**：KL散度并非“被选为”VI的度量，而是在**数学推导最小化后验近似误差的过程中，自然而然地成为了ELBO的一部分**。最大化ELBO等价于最小化 $D_{KL}(q \parallel p)$。
2.  **非对称性的优势**：VI特意选择了 **$D_{KL}(q \parallel p)$**（反向KL），因为它的**模式寻求（Mode-Seeking）** 特性往往能产生更实际、更精确的近似，并且其数学形式（对近似分布 $q$ 求期望）使得基于梯度的优化成为可能，这是VAE等工作的重要基础。
3.  **ELBO的核心地位**：ELBO不仅仅是包含KL散度，它本身就是一个可优化的目标函数。通过最大化ELBO，我们同时实现了两个目标：一是在逼近真实的证据 $\log p(x)$，二是在最小化近似分布与真实后验之间的KL散度。

所以，你的直觉是正确的：**KL散度适合做变分推断，正是因为它与ELBO有着不可分割的、数学上的本质联系，并且其非对称性在计算和实践中提供了关键优势。**�对称性在计算和实践中提供了关键优势。**