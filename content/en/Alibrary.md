---
layout: "page"
title: "Alibray"
head_title: "Search for Chinese e-books "
api:
  - "https://jing-backend.deno.dev/Alibrary"
  - "https://alibrary-production.up.railway.app"
  - "https://alibrary-4xpvmmm4za-de.a.run.app"
zero_result: "No results found, you might consider changing keywords."
invalid_search: "Your search contains illegal keywords, please retry!"
failed: "Errors found in the dataset, please provde the following infomation to https://github.com/JingMatrix/Alibrary/issues : "
ready: "Here is your file"
wait: "Please wait, we are preparing for your query"
search: "Enter to search"
link: "View share link: "
---

<script setup>
import Alibray from '../../components/Alibrary/search.vue'
</script>

<Alibray />
