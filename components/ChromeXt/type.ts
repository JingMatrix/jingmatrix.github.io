export class Metadata {
	private name: string = "";
	private namespace: string = "";
	private preserved: string[] = [];

	author: string = "";
	runAt: string = "";
	description: string = "";
	version: string = "";
	updateURL: string = "";
	downloadURL: string = "";
	supportURL: string = "";
	homepage: string = "";
	icon: string = "";
	isValid: boolean = false;

	match: string[] = [];
	include: string[] = [];
	exclude: string[] = [];
	grant: string[] = [];

	constructor(d: string) {
		d.trim().split("\n").forEach((line: string) => {
			let meta = line.match(/^\/\/\s+@([\w-]+)\s+(.+)\s*$/)
			if (meta != null && (this.hasOwnProperty(meta[1]) || meta[1] == "run-at")) {
				const key = meta[1];
				const value = meta[2];
				if (["match", "include", "exclude", "grant"].includes(key)) {
					this[key].push(value);
				} else if (key == "run-at") {
					this.runAt = value
				} else {
					this[key] = value;
				}
			} else {
				this.preserved.push(line);
			}
		})
		if (this.match.length + this.include.length > 0) {
			this.isValid = true;
		}
	}

	getTitle(): string {
		return this.name;
	}

	getId(): string {
		return this.namespace + ":" + this.name;
	}

	getUrl(): string {
		const url = this.updateURL || this.downloadURL || this.homepage || this.namespace;
		if (url.startsWith("http")) {
			return url;
		} else {
			return "javascript: void 0;"
		}
	}

	getSupport(): string {
		return this.supportURL || "javascript: void 0;"
	}

	toString(): string {
		const backup = this.preserved.join("\n");
		const end = this.preserved.pop();
		for (const [key, value] of Object.entries(this)) {
			if (typeof value == "string" && value != "" && key != "runAt") {
				this.preserved.push(`// @${key}\t${value}`)
			}
		}
		this.preserved.push(`// @run-at\t${this.runAt}`)
		for (const key of ["match", "include", "exclude", "grant"]) {
			for (const value of this[key]) {
				if (value != "") {
					this.preserved.push(`// @${key}\t${value}`)
				}
			}
		}
		this.preserved.push(end);
		const result = this.preserved.join("\n");
		this.preserved = backup.split("\n");
		return result + "\n";
	}


	submit() {
		if (this.isValid) {
			globalThis.ChromeXt(JSON.stringify({
				action: "userscript", payload: {
					id: this.getId(),
					meta: this.toString()
				}
			}));
		}
	}
}


export type DevInfo = {
	description: string,
	devtoolsFrontendUrl: string,
	id: string,
	title: string,
	type: string,
	url: string,
	webSocketDebuggerUrl: string
}

interface ExtensionV2 extends chrome.runtime.ManifestV2 {
	readonly id: string
	readonly port: number
}

interface ExtensionV3 extends chrome.runtime.ManifestV2 {
	readonly id: string
	readonly port: number
}

export type ExtensionInfo = ExtensionV2 | ExtensionV3
