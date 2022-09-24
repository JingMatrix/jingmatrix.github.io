---
title: "Chatroom"
welcome: "Welcome to my chatroom!"
online: "Online"
layout: false
nickname: "Jing"
reply: "Rely to: "
push: "Notification"
loading: "Fetching your messages history..."
head:
  - - "script"
    - src: "/js/simple-signal-client.min.js"
---


<script setup>
import Chat from '../../components/chat/room.vue'
</script>

<Chat />
