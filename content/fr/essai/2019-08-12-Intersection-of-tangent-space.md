---
title: Intersection de l'espace tangent
math: true
tags:
  - Geometry
---

Ceci est la Proposition 2.1.15 dans le [polycopier de Valérie LASMOLLES](https://drive.google.com/file/d/142qXT0_MKOB_RkM5AHHhNpjKQM3nNg4p/view?usp=sharing)
<div class="proposition">

Soient $S_{1}, S_{2}$ deux surfaces régulières de $\mathbb{R}^{3}$ qui s'intersectent en un point $p$.
On suppose que les plans tangents $T_{p} S_{1}$ et $T_{p} S_{2}$ sont distincts.
Alors, au voisinage de $p$, l'intersection $S_{1} \cap S_{2}$ est
une courbe dont la tangente en p est l'intersection $T_{p} S_{1} \cap T_{p} S_{2}$ des deux plans tangents.

</div>

<div class="preuve">

Choisissons un repère centré en $p$,
dont le troisième vecteur n'appartient ni à $T_{p} S_{1}$ , ni à $T_{p} S_{2}$.
On peut alors exprimer localement $S_{1}$ et $S_{2}$ comme des graphes de fonctions
lisses au dessus du plan $x O y$,
$$ z=f_{i}(x, y) \text { avec } f_{i}(0,0)=0.$$
L'intersection $S_{1} \cap S_{2}$ est ainsi définie comme l'image, par l'une des paramétrisations, de la
courbe définie de façon implicite par l'équation
$$ f(x, y)=f_{1}(x, y)-f_{2}(x, y)=0.$$

Il suffit donc de vérifier que la différentielle de $f$ en $(0,0)$ n'est pas nulle: l'ensemble $\{(x, y) / f(x, y)=$
$0\}$ définira ainsi une courbe plane régulière et son image par la paramétrisation sera une courbe
gauche régulière tracée sur $S_{1}$ et $S_{2}$. Or l'annulation de $D f_{(0,0)}$ se traduit par

$$ \frac{\partial f_{1}}{\partial x}(0,0)=\frac{\partial f_{2}}{\partial x}(0,0)
\text { et } \frac{\partial f_{1}}{\partial y}(0,0)=\frac{\partial f_{2}}{\partial y}(0,0),$$
ce qui signifie que les plans tangents $T_{p} S_{1}$ et $T_{p} S_{2}$ sont les mêmes.
Notons $\mathcal{C}$ la courbe régulière qui est l'intersection de $S_{1}$ et $S_{2}$ au voisinage de $p.$
Notons que la tangente $D$ à $\mathcal{C}$ en $p$ est contenue dans $T_{p}\left(S_{1}\right)$
puisque $\mathcal{C}$ est tracée sur $S_{1}$. La droite $D$ est de
même contenue dans $T_{p} S_{2},$ c'est donc en fait $T_{p} S_{1} \cap T_{p} S_{2}$ puisque ces deux plans se coupent le
long d'une droite.

</div>

