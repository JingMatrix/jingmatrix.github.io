---
layout: "page"
title: "Alibray"
head_title: "Search for Chinese e-books "
fast_api:
  entry_point: "https://jing-backend.deno.dev/Alibrary"
  name: "Fast, with 150,644 books"
  info: "Books in this library are collected from two shut-down websites: ePubee and 我的小书屋. The searching is fast, we recommand it as default."
large_api:
  entry_point: "https://alibrary-4xpvmmm4za-de.a.run.app"
  name: "Large, with 1,337,741 books"
  info: "If the server is overloaded, then an initial search in the library will take around 80 seconds. But later searches enjoy high speed since the standby server is warmed up. Frequent usage of this library might cause the author, Jianyu MA, to pay a lot for the running server. For sustainable development of this service, please use it with caution."
api_choice: "You might want to change the searching mode: " 
zero_result: "No results found, you might consider changing keywords."
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
