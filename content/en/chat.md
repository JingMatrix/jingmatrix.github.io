---
title: "Chatroom"
layout: false
welcome: "Welcome to my chatroom!"
join-chat: " joined the chat!"
leave-chat: " left the chat!"
change-name: " recently changed the name."
subscribe: " subscribed the notification push."
unsubscribe: " unsubscribed from the notification push."
online: "Online: "
replyTitle: "Rely to: "
push: "Enable Notification"
loading: "Fetching your messages history..."
head:
  -  - "script"
     - src: "/js/simple-signal-client.min.js"
       type: "module"
---


<script setup>
import Chat from '../../components/chat/room.vue'
</script>

<Chat />
