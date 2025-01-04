import { confiugreActionButtons } from "./actionButtonActions.js";
import { setFileList } from "./setFileList.js";

export const getWidgetDomElement = (elementId) =>
    document.getElementById(elementId);

// Execute necessary functions
confiugreActionButtons();
setFileList();
