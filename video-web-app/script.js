let mute = false;
let mystream;

// client creation
let client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

// initialized the client
client.init("50dad9b192164f8090d35240a13c3979");

// creating the channel
client.join(
  "006e73cdf8bb13e4a2b87c794c44e339463IADsWjgx5UCldGlLR7l8UEY24amg2fgbx00mvVsghyw/vqDfQtYAAAAAEAC4541ozjDtYAEAAQDMMO1g",
  "demo",
  null,
  (uid) => {
    // Create a local stream
    let localStream = AgoraRTC.createStream({
      audio: true,
      video: true,
    });
    localStream.init(() => {
      mystream = localStream;
      localStream.play("local");
      client.publish(localStream);
    });
  }
);

client.on("stream-added", function (evt) {
  client.subscribe(evt.stream);
});

client.on("stream-subscribed", function (evt) {
  let stream = evt.stream;
  let streamId = String(stream.getId());
  let right = document.getElementById("remote");
  let div = document.createElement("div");
  div.id = streamId;
  right.appendChild(div);
  stream.play(streamId);
});

function muteAudio() {
  mystream.muteAudio();
}

function unmuteAudio() {
  mystream.unmuteAudio();
}