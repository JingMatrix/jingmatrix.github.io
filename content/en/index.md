---
title: Homepage
sidebar: false
layout: page
---

<script lang="ts" setup>
import CardImg from "../../components/card/img.vue";
const features = {
  title: "do math",
  description:
    "Mathematics, which most of us see as the most factual of all sciences, constitutes the most colossal metaphor imaginable, and must be judged, aesthetically as well as intellectually, in terms of the success of this metaphor.",
  content: [
    {
      title: "Absolute continuity of Wasserstein barycenters",
      description: "Maiden research result",
      img: "/img/OPT_sphere.png",
      link: "/pdf/GTCalVa.pdf",
      tags: ["Optimal transport", "Riemnnian geometry", "Slide"],
      css: "m-6",
    },
    {
      title: "Souslin space theory",
      description: "PhD student seminar presentation",
      img: "/img/souslin_joke.png",
      link: "https://drive.google.com/file/d/1eTfQvdMlMWBhDNXlBEvxbNkI0Sfa8aUB/view",
      tags: ["Measure theory", "Slide"],
    },
  ],
};
</script>

<CardImg :features="features" />
