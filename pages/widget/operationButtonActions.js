import { getWidgetDomElement, minimizeWindow } from "./widgetRenderer.js";

const minimizeButton = getWidgetDomElement("minimize-operation-win");
minimizeButton.addEventListener("click", minimizeWindow);
