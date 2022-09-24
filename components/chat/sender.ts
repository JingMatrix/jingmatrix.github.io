function getTime(seconds) {
	const date = new Date(seconds * 1000);
	return date.toLocaleString();
}

export function send_message(socket, msg, replyMsg) {
	const time = new Date().getTime();
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
	const msgItem = {
		msg,
		time,
		namecolor: this.namecolor,
		msgcolor: this.msgcolor,
		uid: this.uid,
		name: this.nickname,
	};
	socket.send(msgItem);
}

