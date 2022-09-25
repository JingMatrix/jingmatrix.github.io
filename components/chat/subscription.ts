import { Socket } from "socket.io-client";
import { SubscriptionData } from './type'

const applicationServerPublicKey =
	"BG832LshtIE1SHABBXdtdhie4nPgveN_PkQl-y1eQv9y6N5Fp_KsZKrxiGV0oiVUjGAPkYsSIs2vZFDwW31xEiE";

function urlB64ToUint8Array(base64String: string) {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

export function configSubscription(socket: Socket, subscriptionData: SubscriptionData) {
	if ("serviceWorker" in navigator && "PushManager" in window) {
		// console.log('Service Worker and Push is supported')
		navigator.serviceWorker
			.register("/private/notifysw.js")
			.then(function(swReg) {
				// console.log('Service Worker is registered', swReg)
				subscriptionData.swRegistration = swReg;
				swReg.pushManager.getSubscription().then(function(subscription) {
					if (subscription === null) {
						subscriptionData.state = 'no';
						// console.log('User is NOT subscribed.')
					} else {
						subscriptionData.state = 'yes';
						// console.log('User IS subscribed.')
					}
					updateSubscriptionOnServer(subscription, socket);
				});

			})
			.catch(function(error) {
				console.error("Service Worker Error", error);
			});
	} else {
		console.warn("Push messaging is not supported");
		subscriptionData.state = "disabled";
	}
}

function updateSubscriptionOnServer(subscription: string | PushSubscription, socket: Socket) {
	if (subscription == null) {
		return;
	}
	if (subscription === "delete") {
		this.socket.emit("unsubscribe");
		return;
	}
	socket.emit("subscribe", subscription);
}


export function subscribe_usr(subscriptionData: SubscriptionData, socket: Socket) {
	if (subscriptionData.state == "no") {
		const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
		subscriptionData.swRegistration.pushManager
			.subscribe({
				userVisibleOnly: true,
				applicationServerKey,
			})
			.then(function(subscription) {
				// console.log('User is subscribed.')
				updateSubscriptionOnServer(subscription, socket);
				subscriptionData.state = 'yes';
			})
			.catch(function(err) {
				console.log("Failed to subscribe the user: ", err);
			});
	} else {
		subscriptionData.swRegistration.pushManager
			.getSubscription()
			.then(function(subscription) {
				if (subscription) {
					return subscription.unsubscribe();
				}
			})
			.catch(function(error) {
				console.log("Error unsubscribing", error);
			})
			.then(function() {
				updateSubscriptionOnServer("delete", socket);
				// console.log('User is unsubscribed.')
				subscriptionData.state = 'no';
			});
	}
}

