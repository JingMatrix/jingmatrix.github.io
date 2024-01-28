---
title: "Chatroom"
titleTemplate: "Jianyu MA"
lang: "en"
layout: false
welcome: "Welcome to my chatroom!"
join-chat: " joined the chat!"
leave-chat: " left the chat."
change-name: " recently changed the name."
subscribe: " subscribed the notification push."
unsubscribe: " unsubscribed from the notification push."
online: "Online: "
replyTitle: "Reply to: "
push:
  no: "Enable notifications"
  yes: "Disable notifications"
loading: "Fetching your messages history..."
---

<script setup>
import Chat from '../../components/chat/room.vue'
</script>

<Chat />
