---
title: Homepage
sidebar: false
layout: page
---

<script>
import CardImg from "../../components/card/img.vue";
export default {
  components: {
    CardImg,
  },
  created() {
    this.mathfeature = {
      title: "do math",
      description:
        "Mathematics, which most of us see as the most factual of all sciences, constitutes the most colossal metaphor imaginable, and must be judged, aesthetically as well as intellectually, in terms of the success of this metaphor.",
      content: [
        {
          title: "Souslin space theory",
          description: "PhD student seminar presentation",
          img: "/img/souslin_joke.png",
          link: "https://drive.google.com/file/d/1eTfQvdMlMWBhDNXlBEvxbNkI0Sfa8aUB/view",
          tags: ["Measure theory"],
        },
        {
          title: "M1 Topology Homework",
          description: "A homework of algebraic topology",
          img: "/img/function_with_hole.png",
          link: "/pdf/DM_topology_Jianyu_MA.pdf",
          tags: ["Latex Draw", "Topology"],
        },
      ],
    };
  },
};
</script>

<CardImg :features="mathfeature" />
