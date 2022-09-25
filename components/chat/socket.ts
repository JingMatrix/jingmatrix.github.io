import io from "socket.io-client";
import { configSubscription } from "./subscription"

function exit() {
	document.location.href = "./contact";
}


export default function(loading, chat, socket, frontmatter, subscriptionData) {
	let server =
		process.env.NODE_ENV === "production"
			? "https://jing-chat.herokuapp.com"
			: "http://192.168.12.1:4000";

	if (window.location.origin.match(/^http:\/\/localhost:/)) {
		server = "http://localhost:4000";
	}

	const roomInfo = {
		roomId: localStorage.getItem("roomId"),
	};
	roomInfo.roomId || exit();


	const handshake = roomInfo;
	["name", "uid"].forEach((info) => {
		if (localStorage.getItem(info)) {
			handshake[info] = localStorage.getItem(info);
		}
	})

	handshake.hasOwnProperty('name') || exit;

	fetch(`${server}/room/@${roomInfo.roomId}/record?limit=50`)
		.then((res) => res.json())
		.then((res) => {
			chat.messageList = res.sort((a, b) => a.time - b.time);
			loading.value = false;
			socket.value = io(server, { query: roomInfo, });
			configSocket(socket.value, chat, frontmatter.value);
			configSubscription(socket.value, subscriptionData);
		})
		.catch((err) => console.log(err));

}

function configSocket(socket, chat, translation) {
	socket.on("connect", () => {
		chat.systemMsg = translation.welcome;
	});

	socket.on("online", function(userList) {
		chat.userList = userList.map((info) => info.name);
	});

	socket.on("init", (user) => {
		if (chat.uid && chat.name) return;
		if (user.name) {
			localStorage.setItem("name", user.name);
			chat.name = user.name;
		}
		if (user.uid) {
			localStorage.setItem("uid", user.uid);
			chat.uid = user.uid;
		}
	});

	socket.on("msg", (msgItem) => {
		chat.messageList.push(msgItem);
		setTimeout(() => {
			document.querySelector('#sys').scrollIntoView()
			document.querySelector("textarea").focus();
		});
	});

	socket.on("sys", (data) => {
		chat.systemMsg = (data.name || data.uid) + translation[data.type];
		document.querySelector('#sys').scrollIntoView()
		setTimeout(() => {
			document.querySelector("textarea").focus();
		});
	});

	socket.on("rename", (info) => {
		if (info.uid === chat.uid) {
			chat.name = info.name;
		}
	});
}
