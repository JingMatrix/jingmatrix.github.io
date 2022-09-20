---
layout: page
---

<script>
import CardDate from '../../components/card/date.vue'
export default {
  components: {
    CardDate
  },
  created() {
      this.blogfeature = {
        title: '思考者',
        description:
          '倘若我能够放下所有虚荣与自负，该会有一双更加清澈的眼睛来眺望远方吧。',
        content: [
          {
            title: '简论琐碎',
            excerpt:
              '在这篇文章中我想讨论一个有些模糊的概念——“琐碎”。说它模糊是因为这个概念只是在形式上难以准确地（学究地）定义出来，但在我的生活中确有着大量的实际事例可供说明。因而我将仅仅以突出这个概念为目的来解释一些我自己绕进去的“怪圈”，对于其中大部分来说我还是深陷其中。在此围绕“琐碎”这个中心将它们剖析出来，也好自我勉励，努力与之保持距离。',
            date: '2020-08-02',
            author: 'Jianyu MA',
            tag: '生活相关',
            img: '/img/profile/jm_profile_bw.jpg'
          },
          {
            title: '控制欲与改变他人',
            excerpt:
              '如果我们反思自己那些试图改变他人想法的行为，便会频繁地怀疑这是否算是一种控制欲的表现。在本文中这些行为被视作了控制欲的一种表现。尽管我知道这种观点有待商榷，我们还是先顺着这个思路继续思考下去。',
            date: '2020-02-04',
            author: 'Jianyu MA',
            tag: '思考',
            img: '/img/profile/jm_profile_bw.jpg'
          }
        ]
      }
    }
  }
</script>

<CardDate :features="blogfeature" class="border-b-2" />
