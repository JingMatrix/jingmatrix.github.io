---
layout: "page"
title: "ChromeXt"
titleTemplate: false
installed: "ChromeXt is working"
not_installed: "ChromeXt is not installed"
extension: "Support for WebExtension is still working in progress. No installed extensions found."
introduction: "ChromeXt adds UserScript and DevTools supports to Chromium based and WebView based browsers. See details in the project homepage: "
dev_title: "Chrome DevTools"
dev_intro: "Open pages in new tabs, and then inspect them from here. For inactive tabs, you may need to activate them before inspecting."
inspect: "Inspect"
confirm: "Confirm"
return: "Return"
invalidMeta: "No valid metablock found in current database. You might need to update ChromeXt and reinstall this script. Please click on me to return back."
---

<script setup>
import ChromeXt from '../../components/ChromeXt/manager.vue'
</script>


<ChromeXt />
