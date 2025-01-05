import { WebSocketConnection } from "../../WebSocketConnection.js";
import { getWidgetDomElement } from "./widgetRenderer.js";

// // Initialize WebSocket
// const socketManager = new WebSocketConnection("/files");

export function confiugreActionButtons() {
    const commitAllButton = getWidgetDomElement("btn-commit-all");
    const commitCurrentButton = getWidgetDomElement("btn-commit-current");
    const stageAllButton = getWidgetDomElement("btn-stage-all");
    commitAllButton.addEventListener("click", () =>
        alert("all files commited"),
    );
    commitCurrentButton.addEventListener("click", () =>
        alert("current file commited"),
    );
    stageAllButton.addEventListener("click", () => alert("all files staged"));
}
