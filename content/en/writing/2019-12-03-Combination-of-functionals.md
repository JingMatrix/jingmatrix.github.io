---
math: true
tags:
  - Lemma
  - Analyse
---

#### Lemma [^1]

Suppose $\Lambda_{1}, \ldots, \Lambda_{n}$ and $\Lambda$ are linear functionals on a vector
space $X .$ Let

$$
N= \{ x: \Lambda_{1} x=\cdots=\Lambda_{n} x=0 \}
$$

The following three properties are then equivalent:

1. There are scalars $\alpha_{1}, \ldots, a_{n}$ such that
   $$
   \Lambda = \alpha_1  \Lambda_1 + \cdots + \alpha_n  \Lambda_{n}
   $$
2. There exists $\gamma < \infty$ such that

$$
\Lambda x \leq \gamma \max _{1 \leq i \leq n} \left| \Lambda_{i} x\right| \quad(x \in X)
$$

3. $\Lambda x=0$ for every $x \in N$

#### Proof

It is clear that (1) implies (2) and that (2) implies (3). Assume (3)
holds. Let $\Phi$ be the scalar field. Define $\pi: X \rightarrow \Phi^{n}$ by

$$
\pi(x)=\left(\Lambda_{1} x, \ldots, \Lambda_{n} x\right)
$$

If $\pi(x)=\pi\left(x^{\prime}\right),$ then (3) implies $\Lambda x=\Lambda x^{\prime} .$ Hence $f(\pi(x))=\Lambda x$ defines a
linear functional $f$ on $\pi(X) .$ Extend $f$ to a linear $f(\pi(x)) =\Lambda x$ defines a
linear functional $f$ on $\pi(X) .$ Extend $f$ to a linear $f(\pi(x)) =\Lambda x$ defines a

$$
F\left(u_{1}, \ldots, u_{n}\right)=\alpha_{1} u_{1}+\cdots+\alpha_{n} u_{n}
$$

$$
\Lambda x=F(\pi(x))=F\left(\Lambda_{1} x, \ldots, \Lambda_{n} x\right)=\sum_{i=1}^{n} \alpha_{i} \Lambda_{i} x
$$

which is (1).

#### Remark

This lemma applies Hahn-Banach theorem in a tricky way.

[^1]: Walter Rudin. Analyse fonctionnelle. French. Trans. English by Adbdellatif Abouhazim.1995. Chap. 3, p. 62.
