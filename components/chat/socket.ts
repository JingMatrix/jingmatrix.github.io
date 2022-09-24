import io from "socket.io-client";
import { configSubscription } from "./subscription"

// const herokuapi =
// 	process.env.NODE_ENV === "production"
// 		? "https://jing-chat.herokuapp.com"
// 		: "http://localhost:4000";

const herokuapi = "http://localhost:4000";

function exit() {
	document.location.href = "./contact";
}


export default function(loading, chat, socket, frontmatter, subscriptionData) {
	const roomInfo = {
		roomId: localStorage.getItem("roomId"),
	};
	roomInfo.roomId || exit();

	const uid = localStorage.getItem("uid")

	const handshake = roomInfo;
	["name", "uid"].forEach((info) => {
		if (localStorage.getItem(info)) {
			handshake[info] = localStorage.getItem(info);
		}
	})

	handshake.hasOwnProperty('name') || exit;

	function translation(text) {
		text = text.toString();
		if (text.match(/^chat\./)) {
			text = frontmatter[text.slice(5)] || text;
		}
		chat.systemMsg = text;
	}

	fetch(`${herokuapi}/room/@${roomInfo.roomId}/record?limit=50`)
		.then((res) => res.json())
		.then((res) => {
			chat.messageList = res.sort((a, b) => a.time - b.time);
			loading.value = false;
			socket.value = io(herokuapi, { query: roomInfo, });
			configSocket(socket.value, chat, translation);
			configSubscription(socket.value, subscriptionData);
		})
		.catch((err) => console.log(err));

}

function configSocket(socket, chat, sysMsg) {
	socket.on("connect", () => {
		sysMsg("chat.welcome");
	});

	socket.on("online", function(userList) {
		// const users = userList.map((info) => info.name);
		chat.userList = userList;
		// self.online = users.join(" & ")
	});

	socket.on("init", (user) => {
		if (chat.uid && chat.nickname) return;
		if (user.name) {
			localStorage.setItem("name", user.name);
			chat.nickname = user.name;
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

	socket.on("sys", (text) => {
		sysMsg(text);
		document.querySelector('#sys').scrollIntoView()
		setTimeout(() => {
			document.querySelector("textarea").focus();
		});
	});

	socket.on("rename", (info) => {
		if (info.uid === chat.uid) {
			chat.nickname = info.name;
		}
	});
}
