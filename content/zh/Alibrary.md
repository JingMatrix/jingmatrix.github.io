---
layout: "page"
title: "Alibray"
head_title: "精确的阿里云盘搜索引擎"
api: "https://jing-backend.deno.dev/Alibrary"
categories:
  - name: "book"
    text: "中文出版物"
    description: "552544 条记录"
  - name: "collection"
    text: "各类资料"
    description: "275969 条记录"
zero_result: "没有检索到有效信息，您可以尝试更改关键词。"
invalid_search: "您的检索中包含了被禁止使用的关键词，请重新尝试。"
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
