---
title: Page d'Acceuil
sidebar: false
layout: page
---

<script lang="ts" setup>
import CardDate from '../../components/card/date.vue';
const blogfeature = {
title: 'Apprenti de Français',
description:
  "J'aimerais pouvoir écrire de beaux poèmes un jour.",
content: [
  {
	title: 'Pourquoi tu es triste ?',
	excerpt:'Ceux qui me comprennent,\ndisent que je suis triste.\n\nCeux qui ne me comprennent pas,\ndemandent ce que je veux.',
	date: '2022-02-09',
	tag: 'Poème',
link:'/fr/essai/2022-01-26-pourquoi-triste',
	author: 'Jianyu MA',
  },
  {
	title: 'À ma grand-mère',
	link: '/fr/essai/2022-01-10-grand-m%C3%A8re',
	excerpt:
	  `Tu es mon cœur le plus doux,
je n’ai rien appris de la mort et de la solitude.\n
Tu as collecté tous mes pleurs,
j’ai tout oublié de toi sauf mes larmes.`,
	date: '2022-01-10',
	tag: 'Poème',
	author: 'Jianyu MA',
	img: '/img/profile/jm_profile_bw.jpg'
  }
]
}
</script>

<CardDate :features="blogfeature" class="border-b-2" />
