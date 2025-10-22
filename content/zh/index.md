---
title: 主页
sidebar: false
layout: page
---

<script lang="ts" setup>
import CardDate from "../../components/card/date.vue";
const features = {
  title: "思考者",
  description:
    "热爱生命，丰盈存在；手托日月，直面命运。",
  content: [
    {
      title: "苦涩的歌",
      excerpt:
        "生命何为呀？但见痴妄否定短暂，欲望亲吻着颓堕。是纷繁为消亡而存在，绽放的意志才成就了绚烂。",
      date: "2025-04-10",
      link: "/zh/blog/2025-04-10-song-of-life",
      author: "Jianyu MA",
      tag: "情感创作",
      img: "/img/profile/jm_profile_bw.jpg",
    },
    {
      title: "论顾影自怜",
      excerpt:
        "我一直都清楚，顾影自怜就是我最大的敌人，一个必须要打败的心魔。每一次当我反省自己自暴自弃式的沮丧时，我都能够发现它的身影。 ",
      date: "2022-02-09",
      link: "/zh/blog/2022-02-09-feel-sorry-of-oneself",
      author: "Jianyu MA",
      tag: "生活相关",
      img: "/img/profile/jm_profile_bw.jpg",
    },
    {
      title: "控制欲与改变他人",
      link: "/zh/blog/2020-02-04-changing-others-or-control",
      excerpt:
        "如果我们反思自己那些试图改变他人想法的行为，便会频繁地怀疑这是否算是一种控制欲的表现。在本文中这些行为被视作了控制欲的一种表现。尽管我知道这种观点有待商榷，我们还是先顺着这个思路继续思考下去。",
      date: "2020-02-04",
      author: "Jianyu MA",
      tag: "思考",
      img: "/img/profile/jm_profile_bw.jpg",
    },
  ],
};
</script>

<CardDate :features="features" class="border-b-2" />
