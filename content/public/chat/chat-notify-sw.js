const workerDir = location.origin + "/" + location.pathname.split("/").at(-3);

function matchUrl(client) {
  const lang = client.url.slice(-2);
  const locales = ["zh", "en", "fr"];
  let match = false;
  if (client.url.slice(0, -3) == workerDir + "/chat") {
    locales.forEach((l) => {
      if (l === lang) match = true;
    });
  }
  return match;
}

self.addEventListener("activate", (event) =>
  event.waitUntil(self.clients.claim())
);

self.addEventListener("push", function (event) {
  console.log("[Service Worker for chat] Push Received.");
  // console.log(`[Service Worker for chat] Push had this data: "${event.data.text()}"`);
  const msgItem = JSON.parse(event.data.text());
  let title = msgItem.msg;
  const options = {
    body: `${msgItem.name} @ ${msgItem.room}`,
    icon: `${workerDir}/favicon.png`,
    badge: `${workerDir}/favicon.png`,
  };
  clients
    .matchAll({
      includeUncontrolled: true,
      type: "window",
    })
    .then(function (clientList) {
      console.log("Clients number: ", clientList.length);
      if (clientList.length === 0) {
        title = "Got a new message, please open Chat Room for this time";
        options.body = "I will work normally next time";
        event.waitUntil(self.registration.showNotification(title, options));
      }
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        console.log("Handling push event for ", client);
        if (client.focused) {
          // console.log("User is chatting, no need for notification")
          break;
        }
        if (matchUrl(client)) {
          // console.log("It has matched url: ", client.url)
          self.registration.showNotification(title, options);
          return;
        } else {
          // console.log(`It has no matching url with ${workerDir}: `, client.url)
        }
      }
    });
});

self.addEventListener("notificationclick", function (event) {
  console.log("On notification click: ", event.notification.tag);
  event.notification.close();

  event.waitUntil(
    clients
      .matchAll({
        includeUncontrolled: true,
        type: "window",
      })
      .then(function (clientList) {
        for (let i = 0; i < clientList.length; i++) {
          let client = clientList[i];
          // console.log("Handling notificationclick event for ", client)
          if (matchUrl(client)) {
            return client.focus();
          }
        }
      })
  );
});
