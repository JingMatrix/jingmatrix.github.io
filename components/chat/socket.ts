import { io, Socket } from "socket.io-client";
import { configSubscription } from "./subscription"
import type { SystemMsg, UserMsg, UserInfo, UserList, ChatData, SubscriptionData } from "./type"
import type { Ref } from 'vue'
import { watch } from 'vue'

type HandShake = {
	uid?: string,
	name: string,
	room: string
}

export function initializeSocket(loading: Ref<boolean>, chat: ChatData, socket: Ref<Socket>, translation: Record<string, any>, subscriptionData: SubscriptionData) {
	let server =
		process.env.NODE_ENV === "production"
			? "https://jing-chat.herokuapp.com"
			: "http://192.168.12.1:4000";

	if (window.location.origin.match(/^http:\/\/localhost:/)) {
		server = "http://localhost:4000";
	}

	let query = <HandShake>chat
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
			socket.emit('change-name', name)
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
	});

	socket.on("msg", (msgItem: UserMsg) => {
		chat.messageList.push(msgItem);
		document.querySelector('#sys').scrollIntoView()
		document.querySelector("textarea").focus();
	});

	socket.on("sys", (data: SystemMsg) => {
		chat.systemMsg = (data.name || data.uid) + translation[data.type];
		document.querySelector('#sys').scrollIntoView()
		document.querySelector("textarea").focus();
	});

	socket.on("rename", (info: UserInfo) => {
		if (info.uid === chat.uid) {
			chat.name = info.name;
		}
	});
}
