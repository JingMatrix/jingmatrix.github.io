---
layout: "page"
title: "Alibray"
head_title: "Accurate search engine for Aliyundrive"
api: "https://jing-backend.deno.dev/Alibrary"
categories:
  - name: "book"
    text: "Chinese publications"
    description: "552544 records"
  - name: "collection"
    text: "General resources"
    description: "378907 records"
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
