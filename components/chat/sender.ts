import type { Socket } from 'socket.io-client'
import type { UserMsg, ChatData } from './type'

export function send_message(socket: Socket, msg: string, chatData: ChatData) {
	if (!msg) return
	const replyMsg: UserMsg = chatData.replyMsg
	chatData.replyMsg = null
	const time = Math.floor(new Date().getTime() / 1000);
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
		name: chatData.name,
		namecolor: chatData.namecolor,
		msgcolor: chatData.msgcolor,
		uid: chatData.uid
	};
	socket.send(msgItem);
	["namecolor", "msgcolor", "uid"].forEach((d) => {
		localStorage.setItem(d, chatData[d])
	})

}

