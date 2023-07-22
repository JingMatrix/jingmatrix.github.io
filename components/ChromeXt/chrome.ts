import type { ExtensionInfo } from "./type";

export function initFrame(e: Event, extension: ExtensionInfo) {
	const frame = e.target as HTMLIFrameElement;
	if (frame.src != getBackgroundPage(extension)) {
		initChrome(frame, extension);
	}
}

function initChrome(frame: HTMLIFrameElement, extension: ExtensionInfo) {
	frame.src = getBackgroundPage(extension);
}

function getBackgroundPage(e: ExtensionInfo): string {
	const src = "http://localhost:" + e.port + "/" + e.background.page;
	return src;
}
