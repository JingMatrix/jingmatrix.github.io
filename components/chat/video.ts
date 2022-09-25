import { Socket } from "socket.io-client";

let currentRoom = null; // keeps track of current room

const peerOption = {
	config: {
		iceServers: [
			{
				urls: "turn:35.208.108.117?transport=udp",
				username: "jing",
				credential: "matrix123456",
			},
		],
	},
};

// creates a DOM element to allow the user to see/join rooms

// creates a video element, sets a mediastream as it's source, and appends it to the DOM
function createVideoElement(container: HTMLElement, mediaStream: MediaStream, signalClient: any, muted = false) {
	const videoElement = document.createElement("video");
	videoElement.autoplay = true;
	videoElement.srcObject = mediaStream;
	videoElement.muted = muted;
	videoElement.addEventListener("dblclick", () => {
		stopStreamedVideo(videoElement);
		videoElement.remove();
		/* abuse of discover to remove myself */
		signalClient.discover(null);
	});
	container.appendChild(videoElement);
	return videoElement;
}

function stopStreamedVideo(videoElem: HTMLMediaElement) {
	const stream = <MediaStream>videoElem.srcObject;
	const tracks = stream.getTracks();

	tracks.forEach(function(track) {
		track.stop();
	});

	videoElem.srcObject = null;
}

function onPeer(peer: any, localStream: MediaStream, signalClient: any) {
	peer.addStream(localStream);
	peer.on("stream", (remoteStream: MediaStream) => {
		createVideoElement(
			document.querySelector("#remoteVideos"),
			remoteStream, signalClient
		);
	});
}

// connects to a peer and handles media streams
async function connectToPeer(peerID: string, localStream: MediaStream, signalClient: any) {
	console.log("connecting to peer", peerID);
	const { peer } = await signalClient
		.connect(peerID, currentRoom, peerOption)
		.catch((e: any) => {
			console.log("Fail for ID: ", peerID, "due to ", e.metadata.code);
		}); // connect to the peer
	console.log("connected to peer", peerID);
	onPeer(peer, localStream, signalClient);
}

function joinRoom(roomId: string, localStream: MediaStream, signalClient: any) {
	console.log("join", roomId);
	/* disconnect from all peers in old room */
	if (currentRoom) {
		if (currentRoom !== roomId) {
			console.log("Enter wrong room");
			signalClient.peers().forEach((peer: any) => {
				console.log("destroy", peer);
				peer.destroy();
			});
		} else {
			return;
		}
	}
	currentRoom = roomId; // update current room
	console.log("requesting to join", roomId);
	signalClient.discover(roomId);

	// get the peers in this room
	function onRoomPeers(discoveryData: any) {
		if (discoveryData.roomResponse === roomId) {
			console.log(discoveryData);
			signalClient.removeListener("discover", onRoomPeers);
			discoveryData.peers.forEach((peerID: string) => {
				connectToPeer(peerID, localStream, signalClient);
			}); // connect to all peers in new room
		}
	}
	signalClient.addListener("discover", onRoomPeers);
}

export default function(socket: Socket) {
	// @ts-ignore
	const signalClient = new SimpleSignalClient(socket);
	// request local webcam
	navigator.mediaDevices
		.getUserMedia({
			audio: true,
			video: true,
		})
		.then((localStream) => {
			createVideoElement(
				document.querySelector("#localVideo"),
				localStream,
				true
			); // display local video
			const roomId = localStorage.getItem("roomId");
			signalClient.on("request", async (request: any) => {
				const { peer } = await request.accept(roomId, peerOption);
				onPeer(peer, localStream, signalClient);
			});

			joinRoom(roomId, localStream, signalClient);
		})
		.catch((err) => console.error(err));
}
