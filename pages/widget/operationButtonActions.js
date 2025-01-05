import { getWidgetDomElement, minimizeWindow } from "./widgetRenderer.js";

// Does not work :(
const minimizeButton = getWidgetDomElement("minimize-operation-win");
minimizeButton.addEventListener("click", minimizeWindow);
