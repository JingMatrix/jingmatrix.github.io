---
layout: "page"
title: "ChromeXt"
titleTemplate: false
installed: "ChromeXt is working"
not_installed: "ChromeXt is not installed"
introduction: "ChromeXt adds support of UserScripts to the latest Android Chrome. See details in the project homepage: "
dev_title: "Chrome DevTools"
dev_intro: "Open pages in new tabs, and then inspect them from here. Tapping on the Developer tools menu will refresh current tab status."
inspect_restriction: "For preformance reason, we only allow one inspecting session each time. You can refresh this page to get another session, though not advisable."
inspect: "Inspect"
confirm: "Confirm"
return: "Return"
invalidMeta: "No valid metablock found in current database. You might need to update ChromeXt and reinstall this script. Please click on me to return back."
---

<script setup>
import ChromeXt from '../../components/ChromeXt/manager.vue'
</script>


<ChromeXt />
