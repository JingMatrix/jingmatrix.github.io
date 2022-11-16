---
layout: "page"
title: "Alibray"
head_title: "精确的阿里云盘搜索引擎"
fast_api:
  entry_point: "https://jing-backend.deno.dev/Alibrary"
  name: "高速，约十五万本图书"
  info: "该库存内的书籍主要来自于已经关停的 ePubee 和 我的小书屋 两个网站。搜索迅捷，推荐使用。"
large_api:
  entry_point: "https://alibrary-4xpvmmm4za-de.a.run.app"
  name: "海量，约一百三十三万本图书"
  info: "如果服务器过载首次搜索将耗时较长，大约为 80 s；但后续搜索速度会回归正常，因为备用服务器已经热身完毕。屡次使用将会增加网站作者（马健宇）的服务器费用开支。为了本服务的可持续化发展，请慎重使用。"
api_choice: "您可以在这里选择搜索模式：" 
zero_result: "没有检索到有效信息，您可以尝试更改关键词。"
failed: "数据有误，请提交以下信息到 https://github.com/JingMatrix/Alibrary/issues : "
ready: "您查询的文件已经准备好了"
wait: "请稍侯，正在处理您查询的文件"
search: "输入以开始搜索"
link: "查看分享链接: "
---

<script setup>
import Alibray from '../../components/Alibrary/search.vue'
</script>

<Alibray />
