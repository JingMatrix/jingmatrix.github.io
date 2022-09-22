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
        "I like the idea that mathematics is the art of giving the same name to different things. When exploring new concepts there, I feel that I am finding connections between mysteries.",
      content: [
        {
          title: "M1 Internship Report",
          description: "My M1 & undergraduate design",
          img: "/img/wiener_process.png",
          link: "/pdf/probability M1_stage.pdf",
          tags: ["Quantum mechanics"],
        },
        {
          title: "M1 Topology Homework",
          description: "A homework about algebraic topology",
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
