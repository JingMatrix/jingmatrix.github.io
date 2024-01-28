import { io, Socket } from "socket.io-client";
import { configSubscription } from "./subscription"
import type { SystemMsg, SocketQuery, UserMsg, UserInfo, UserList, ChatData, SubscriptionData } from "./types"
import type { Ref } from 'vue'
import { watch } from 'vue'

const message_scroll_timeout = 100

export function initializeSocket(loading: Ref<boolean>, chat: ChatData, socket: Ref<Socket>, translation: Record<string, any>, subscriptionData: SubscriptionData) {
	let server =
		process.env.NODE_ENV === "production"
			? "https://chatroom-blog.apps.math.cnrs.fr"
			: "http://192.168.12.1:4000";

	if (window.location.origin.match(/^http:\/\/localhost:/)) {
		server = "http://localhost:4000";
	}

	let query: SocketQuery = { uid: chat.uid, name: chat.name, room: chat.room }
	query.uid || delete query.uid
	fetch(`${server}/room/@${chat.room}/record?limit=50`)
		.then((res) => res.json())
		.then((res) => {
			chat.messageList = res.sort((a: UserMsg, b: UserMsg) => a.time - b.time);
			loading.value = false;
			socket.value = io(server, { query });
			configSocket(socket.value, chat, translation);
			configSubscription(socket.value, subscriptionData);
		})
		.catch((err) => console.log(err));

}

function configSocket(socket: Socket, chat: ChatData, translation: Record<string, any>) {

	watch(() => chat.name,
		(name) => {
			socket.emit('rename', name)
			localStorage.setItem('name', name)
		})

	socket.on("connect", () => {
		chat.systemMsg = translation.welcome;
	});

	socket.on("online", function(userList: UserList) {
		chat.userList = userList.map((info: UserInfo) => info.name);
	});

	socket.on("init", (user: UserInfo) => {
		if (chat.uid && chat.name) return;
		if (user.name && !chat.name) {
			chat.name = user.name;
		}
		if (user.uid && !chat.uid) {
			chat.uid = user.uid;
		}
		// console.log(chat)
	});

	socket.on("msg", (msgItem: UserMsg) => {
		chat.messageList.push(msgItem);
		setTimeout(() => {
			document.querySelector('#sys').scrollIntoView()
		}, message_scroll_timeout)
	});

	socket.on("sys", (data: SystemMsg) => {
		chat.systemMsg = (data.name || data.uid) + translation[data.type];
		setTimeout(() => {
			document.querySelector('#sys').scrollIntoView()
		}, message_scroll_timeout)
	});
}
