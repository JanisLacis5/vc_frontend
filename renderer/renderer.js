import { loadPage } from "./utils/loadPage.js";
import { WebSocketConnection } from "../WebSocketConnection.js";

// Manage navigation and dynamic page loading
export const contentDiv = document.getElementById("content");
const navLinks = document.querySelectorAll(".navbar a");

export const getDomElement = (elementId) => document.getElementById(elementId);

// Handle navigation link clicks
navLinks.forEach((link) => {
    link.addEventListener("click", async (e) => {
        e.preventDefault();
        const page = link.getAttribute("data-page");
        if (page) {
            await loadPage(page);
        }
    });
});

// Load dashboard on startup
(async () => {
    loadPage("dashboard");
})();

// // Create connection to the startup websocket
// const startupWs = new WebSocketConnection("/startup");
// startupWs.connect();

// // Function to get startup websocket from the whole app
// export const getStartupWs = () => startupWs;
