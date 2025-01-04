import { WebSocketConnection } from "../../WebSocketConnection.js";
import { getWidgetDomElement } from "./widgetRenderer.js";

// Initialize WebSocket
const socketManager = new WebSocketConnection("/files");

export function confiugreActionButtons() {
    const commitButton = getWidgetDomElement("btn-commit");
    commitButton.addEventListener("click", async () => {
        console.log("here at least");
        const appState = await window.api.getAppState();
        const commit = await window.api.commitFiles(
            appState.currentProjectId,
            {},
        );
        console.log(commit);
    });
}
