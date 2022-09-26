---
title: "Salon de discussion"
lang: "fr"
layout: false
welcome: "Bienvenue sur mon salon de discussion!"
join-chat: " a rejoint le chat!"
leave-chat: " a quitté le chat."
change-name: " vient de changer de nom."
subscribe: " s'est abonné au push de notification."
unsubscribe: " s'est désabonné au push de notification."
online: "En ligne: "
replyTitle: "Répondre à: "
push:
  no: "Activer les notifications"
  yes: "Desactiver les notifications"
loading: "Récupérer l'historique de vos messages..."
head:
  -  - "script"
     - src: "/js/simple-signal-client.min.js"
       type: "module"
---


<script setup>
import Chat from '../../components/chat/room.vue'
</script>

<Chat />
