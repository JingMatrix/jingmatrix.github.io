const CHROMEXT_SPLIT = "ChromeXt_Split_For_Metadata_Update"

export class Metadata {
	private name: string;
	private namespace: string;
	private preserved: string[] = [];

	author: string;
	runAt: string;
	description: string;
	version: string;
	updateURL: string;
	downloadURL: string;
	homepage: string;
	isValid: boolean = false;

	match: string[] = [];
	exclude: string[] = [];
	grant: string[] = [];

	constructor(d: string) {
		if (d.startsWith("// ==UserScript==")) {
			this.isValid = true;
			d.split("\n").forEach((line: string) => {
				let meta = line.match(/^\/\/\s+@([\w-]+)\s+(.+)\s*$/)
				if (meta != null && (this.hasOwnProperty(meta[1]) || meta[1] == "run-at")) {
					const key = meta[1];
					const value = meta[2];
					console.debug(key, value)
					if (["match", "exclude", "grant"].includes(key)) {
						this[key].push(value);
					} else if (key == "include") {
						this.match.push(value);
					} else if (key == "run-at") {
						this.runAt = value
					} else {
						this[key] = value;
					}
				} else {
					this.preserved.push(line);
				}
			})
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

	toString(): string {
		const backup = this.preserved.join("\n");
		const end = this.preserved.pop();
		for (const [key, value] of Object.entries(this)) {
			if (typeof value == "string" && key != "" && key != "runAt") {
				this.preserved.push(`// @${key}\t${value}`)
			}
		}
		this.preserved.push(`// @run-at\t${this.runAt}`)
		for (const key of ["match", "grant", "exclude"]) {
			for (const value of this[key]) {
				if (value != "") {
					this.preserved.push(`// @${key}\t${value}`)
				}
			}
		}
		this.preserved.push(end);
		const result = this.preserved.join("\n");
		this.preserved = backup.split("\n");
		return result;
	}


	submit() {
		if (this.isValid) {
			globalThis.ChromeXt(JSON.stringify({
				action: "updateMetaForId", payload: this.getId() +
					CHROMEXT_SPLIT + this.toString()
			}));
		}
	}
}
