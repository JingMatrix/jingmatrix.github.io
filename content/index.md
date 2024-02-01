---
layout: false
title: Jianyu MA's website
description: "Hope you can find something interesting here about me"
titleTemplate: English, Français, 中文
---

<script lang="ts" setup>
import { onMounted } from "vue";
onMounted(() => {
    let userLang = navigator.language || 'en';
    if (!['en', 'fr', 'zh'].includes(userLang)) userLang = 'en';
    let path = window.location.pathname;
    if (!path.endsWith('/')) path = path + '/';
    if (!window.location.href.endsWith(userLang + '/'))
        window.location.href = path + userLang + '/';
});
</script>
