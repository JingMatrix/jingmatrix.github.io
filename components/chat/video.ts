
let currentRoom = null; // keeps track of current room
// this.video = !this.video;
// v-if video to display
// this.video = true;
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
function createVideoElement(container, mediaStream, signalClient, muted = false) {
	const videoElement = document.createElement("video");
	videoElement.autoplay = true;
	videoElement.srcObject = mediaStream;
	videoElement.muted = muted;
	videoElement.addEventListener("dblclick", (event) => {
		const videoElement = event.target;
		stopStreamedVideo(videoElement);
		videoElement.remove();
		/* abuse of discover to remove myself */
		signalClient.discover(null);
	});
	container.appendChild(videoElement);
	return videoElement;
}

function stopStreamedVideo(videoElem) {
	const stream = videoElem.srcObject;
	const tracks = stream.getTracks();

	tracks.forEach(function(track) {
		track.stop();
	});

	videoElem.srcObject = null;
}

function onPeer(peer, localStream, signalClient) {
	peer.addStream(localStream);
	peer.on("stream", (remoteStream) => {
		const videoElement = createVideoElement(
			document.querySelector("#remoteVideos"),
			remoteStream, signalClient
		);
	});
}

// connects to a peer and handles media streams
async function connectToPeer(peerID, localStream, signalClient) {
	console.log("connecting to peer", peerID);
	const { peer } = await signalClient
		.connect(peerID, currentRoom, peerOption)
		.catch((e) => {
			console.log("Fail for ID: ", peerID, "due to ", e.metadata.code);
		}); // connect to the peer
	console.log("connected to peer", peerID);
	onPeer(peer, localStream, signalClient);
}

function joinRoom(roomId, localStream, signalClient) {
	console.log("join", roomId);
	/* disconnect from all peers in old room */
	if (currentRoom) {
		if (currentRoom !== roomId) {
			console.log("Enter wrong room");
			signalClient.peers().forEach((peer) => {
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
	function onRoomPeers(discoveryData) {
		if (discoveryData.roomResponse === roomId) {
			console.log(discoveryData);
			signalClient.removeListener("discover", onRoomPeers);
			discoveryData.peers.forEach((peerID) => {
				connectToPeer(peerID, localStream, signalClient);
			}); // connect to all peers in new room
		}
	}
	signalClient.addListener("discover", onRoomPeers);
}

export default function(socket) {
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
			signalClient.on("request", async (request) => {
				const { peer } = await request.accept(roomId, peerOption);
				onPeer(peer, localStream, signalClient);
			});

			joinRoom(roomId, localStream, signalClient);
		})
		.catch((err) => console.error(err));
}
