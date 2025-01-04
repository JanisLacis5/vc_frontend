// import { createWidgetWindow } from "./main.js";

export class WebSocketConnection {
    socketUrl;
    constructor(socketUrl) {
        this.socketUrl = `ws://localhost:8000/ws${socketUrl}`;
        this.socket = null;
    }

    connect() {
        this.socket = new WebSocket(this.socketUrl);

        this.socket.onopen = (event) => {
            this.sendMessage("init");
            console.log("Connected to WebSocket server!");
        };

        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            this.#handleMessage(message);
        };

        this.socket.onerror = (error) => {
            console.log("WebSocket error:", error);
        };

        this.socket.onclose = (event) => {
            console.log("WebSocket connection closed.");
        };
    }

    sendMessage(action, data = null) {
        this.#waitForSocketConnection(this.socket, () => {
            const message = JSON.stringify({ action, data });
            this.socket.send(message);
        });
    }

    async #handleMessage(message) {
        // Unpack `message` object
        const action = message["action"];
        const data = message["data"];

        // Execute function based on action
        if (action === "project_open") {
            await window.api.openWidget();
            console.log(`Opened project '${data}'`);
        }
        if (action === "project_close") {
            console.log(`Closed project '${data}'`);
        }
        if (action === "file_created") {
            this.#onFileCreated(data);
            console.log(`File created: ${data}`);
        }
        if (action === "file_modified") {
            console.log(`File modified: ${data}`);
            this.#onFileModified(data);
        }
        if (action === "file_deleted") {
            console.log(`File deleted: ${data}`);
            this.#onFileDeleted(data);
        }
    }

    #onFileCreated(data) {
        console.log("Custom logic for file created:", data);
    }

    #onFileModified(data) {
        console.log("Custom logic for file modified:", data);
    }

    #onFileDeleted(data) {
        console.log("Custom logic for file deleted:", data);
    }

    #waitForSocketConnection(socket, callback) {
        setTimeout(() => {
            if (socket.readyState === 1) {
                callback();
            } else {
                this.#waitForSocketConnection(socket, callback);
            }
        }, 5);
    }
}
