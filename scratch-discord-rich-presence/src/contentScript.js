const RPC = require("discord-rpc");
const client = new RPC.Client(
    {
        transport: "ipc"
    }
);

require('dotenv').config();

const activity = {
    details: "Working on a Scratch project!",
    assets: {
        large_image: "/Images/icon_48.png",
        large_text: "Scratch",
        small_image: "/Images/icon_48.png"
    },
    timestamps: {start: Date.now()},
    instance: true
};

client.on("ready", () => {
    client.request("SET_ACTIVITY", {
        pid: process.pid, 
        activity: activity
    });

    console.log("Scratch Discord RPC connected");
});

client.login({
    clientId: process.env.CLIENT_ID
});
