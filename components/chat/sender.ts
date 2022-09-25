import type { Socket } from 'socket.io-client'
import type { UserMsg, ChatData } from './type'

export function send_message(socket: Socket, msg: string, chatData: ChatData) {
	const replyMsg: UserMsg = chatData.replyMsg
	chatData.replyMsg = null
	const time = Math.floor(new Date().getTime() / 1000);
	if (msg === "") {
		document.querySelector('#sys').scrollIntoView()
		setTimeout(() => {
			document.querySelector("textarea").focus();
		});
		return;
	}
	if (replyMsg && replyMsg.hasOwnProperty('name')) {
		const prefix = replyMsg.name;
		replyMsg.msg = replyMsg.msg.replace(/^\[[\d\D]*\n \n/g, "");
		// console.log(this.replyMsg);
		msg =
			`[${prefix}](#${replyMsg.time})\n> ${replyMsg.msg.replace(
				/\n{2,}/g,
				"\n> "
			)} \n \n` + msg;
	}
	const msgItem: UserMsg = {
		msg,
		time,
		...chatData
	};
	socket.send(msgItem);
	["namecolor", "msgcolor", "uid"].forEach((d) => {
		localStorage.setItem(d, chatData[d])
	})

}

