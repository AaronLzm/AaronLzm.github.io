---
title: G估计步骤
category: Causal inference
tags: [Chapter 14,What-if book reading notes]

---
要正确执行 g-估计（g-estimation）来估计结构嵌套模型（SNM）参数 $\boldsymbol{\beta} = (\beta_1, \boldsymbol{\beta_2}^\top)^\top$，需遵循以下步骤。以下是结合数学原理和 Python 实现的完整指南：

---

### **g-估计的数学原理**
给定模型：
$$E[Y^a - Y^{a=0} \mid A=a, L] = \beta_1 a + \boldsymbol{\beta_2}^\top (a L)$$
定义 **去混杂的潜在结果**：
$$H(\boldsymbol{\beta}) = Y - \beta_1 A - \boldsymbol{\beta_2}^\top (A \odot L)$$
其中 $\odot$ 表示逐元素乘法（若 $L$ 是向量）。

**核心假设**：在真实 $\boldsymbol{\beta}$ 下，$H(\boldsymbol{\beta})$ 与 $A$ 在给定 $L$ 的条件下独立：
$$A \perp H(\boldsymbol{\beta}) \mid L$$

**估计策略**：
1. 拟合倾向得分模型：$P(A=1 \mid L) = \text{expit}(\alpha_0 + \boldsymbol{\alpha_1}^\top L)$
2. 对候选 $\boldsymbol{\beta}$，检验 $H(\boldsymbol{\beta})$ 与 $A$ 的条件独立性（通过倾向得分模型中 $H(\boldsymbol{\beta})$ 的系数是否为 0）

---

### **g-估计的步骤与 Python 实现**

#### **步骤 1：准备数据**
假设数据集包含：
- $Y$: 结局变量 (连续)
- $A$: 处理变量 (二元)
- $L$: 协变量向量 (如 $L_1, L_2$)

```python
import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression

# 生成模拟数据 (n=样本量, p=协变量维数)
np.random.seed(42)
n = 1000
p = 2  # 假设 L = [L1, L2]

# 生成协变量 L
L = np.random.normal(size=(n, p))

# 生成处理 A (依赖 L)
true_alpha = np.array([-0.5, 0.8, 1.2])  # [alpha0, alpha1, alpha2]
propensity_score = 1 / (1 + np.exp(-(true_alpha[0] + L @ true_alpha[1:])))
A = np.random.binomial(1, propensity_score)

# 生成结局 Y (依赖 A 和 L)
true_beta = np.array([1.5, -0.7, 0.3])  # [beta1, beta2_L1, beta2_L2]
Y0 = 3.0 + 0.5 * L[:, 0] - 0.2 * L[:, 1] + np.random.normal(size=n)
Y = Y0 + A * (true_beta[0] + true_beta[1]*L[:, 0] + true_beta[2]*L[:, 1])

# 创建 DataFrame
df = pd.DataFrame(np.column_stack([Y, A, L]), columns=['Y', 'A', 'L1', 'L2'])
```

#### **步骤 2：定义辅助函数**
```python
def calc_H(beta, df):
    """计算去混杂的潜在结果 H(beta)"""
    # H = Y - β1*A - β2*(A⊙L)
    return df['Y'] - beta[0]*df['A'] - beta[1]*(df['A']*df['L1']) - beta[2]*(df['A']*df['L2'])

def g_estimation_objective(beta, df, propensity_model):
    """计算目标函数：H(beta)在倾向得分模型中的系数"""
    # 计算 H(beta)
    H_beta = calc_H(beta, df)
    
    # 在倾向得分模型中添加 H(beta) 作为协变量
    X = df[['L1', 'L2']].copy()
    X['H_beta'] = H_beta
    
    # 拟合扩展的倾向得分模型
    extended_model = LogisticRegression(penalty=None, max_iter=1000)
    extended_model.fit(X, df['A'])
    
    # 返回 H_beta 的系数 (目标：使其接近 0)
    return extended_model.coef_[0][-1]  # 最后一个系数对应 H_beta
```

#### **步骤 3：拟合基础倾向得分模型**
```python
# 拟合基础倾向得分模型 (A ~ L)
base_model = LogisticRegression(penalty=None, max_iter=1000)
base_model.fit(df[['L1', 'L2']], df['A'])
```

#### **步骤 4：优化目标函数**
```python
from scipy.optimize import minimize

# 定义优化目标 (最小化 |H_beta 的系数|)
def objective(beta):
    coef_H = g_estimation_objective(beta, df, base_model)
    return coef_H**2  # 最小化平方

# 初始参数猜测
beta_init = np.array([0.0, 0.0, 0.0])

# 执行优化
result = minimize(
    fun=objective,
    x0=beta_init,
    method='BFGS',  # 拟牛顿法
    options={'maxiter': 1000}
)

# 提取估计值
beta_hat = result.x
print(f"Estimated parameters: β1={beta_hat[0]:.3f}, β2_L1={beta_hat[1]:.3f}, β2_L2={beta_hat[2]:.3f}")
```

#### **步骤 5：诊断与验证**
```python
# 计算最终 H(β_hat)
H_final = calc_H(beta_hat, df)

# 检查条件独立性：拟合 A ~ L + H(β_hat)
final_model = LogisticRegression(penalty=None, max_iter=1000)
X_final = df[['L1', 'L2']].copy()
X_final['H_final'] = H_final
final_model.fit(X_final, df['A'])

# 输出 H(β_hat) 的系数和 p 值（近似）
coef_H_final = final_model.coef_[0][-1]
print(f"Coefficient of H(β_hat) in propensity model: {coef_H_final:.4f}")
if np.abs(coef_H_final) < 0.1:  # 实际中需计算标准误
    print("✓ 条件独立假设可能成立 (系数接近 0)")
else:
    print("⚠️ 可能违反条件独立假设 (遗漏混杂因子)")
```

---

### **关键数学解释**
1. **目标函数选择**：
   - 最小化倾向得分模型中 $H(\boldsymbol{\beta})$ 的系数 $\gamma$：
   $$\min_{\boldsymbol{\beta}} \left[ \gamma(\boldsymbol{\beta}) \right]^2 \quad \text{其中} \quad \gamma(\boldsymbol{\beta}) = \text{Coeff}_{H} \text{ in } \text{logit}(A=1|L, H(\boldsymbol{\beta}))$$

2. **识别条件**：
   - 当 $\gamma(\boldsymbol{\beta}) = 0$ 时，$H(\boldsymbol{\beta}) \perp A \mid L$，此时 $\boldsymbol{\beta}$ 是真实参数的无偏估计。

3. **置信区间**（补充）：
   - 用 Bootstrap 估计标准误：
   ```python
   from sklearn.utils import resample
   beta_boots = []
   for _ in range(500):
       df_boot = resample(df)
       # 重复步骤 2-4 计算 beta_hat_boot
       beta_boots.append(beta_hat_boot)
   se = np.std(beta_boots, axis=0)
   ci = np.column_stack([beta_hat - 1.96*se, beta_hat + 1.96*se])
   ```

---

### **确认 $L$ 充分性的诊断**
1. **倾向得分模型诊断**：
   ```python
   from sklearn.metrics import roc_auc_score
   pred_probs = base_model.predict_proba(df[['L1', 'L2']])[:, 1]
   print(f"Propensity score AUC: {roc_auc_score(df['A'], pred_probs):.3f}")
   # AUC > 0.7 表明 L 对 A 有预测力
   ```

2. **敏感性分析**（未测量混杂）：
   - 假设存在未观测混杂 $U$，计算 E-value：
   $$ \text{E-value} = \frac{1}{1 - \delta} \quad \text{其中} \quad \delta = \frac{ \hat{\beta} }{ \hat{\beta}_{\text{adjusted}} }$$
   - $\delta < 1$ 表示估计对混杂敏感

---

### **输出解释**
- 若 `H(β_hat)` 的系数接近 0（如 $| \gamma | < 0.1$），则 $L$ 可能充分
- 若系数显著不为 0，则需：
  1. 检查倾向得分模型拟合（如 AUC 低则遗漏预测因子）
  2. 添加候选混杂因子到 $L$ 并重新估计
  3. 进行敏感性分析量化潜在偏倚

此流程严格遵循 g-估计的理论框架，并通过数值优化实现参数估计。代码可直接用于实际数据（需调整数据加载部分）。