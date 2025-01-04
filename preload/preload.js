const { contextBridge, ipcRenderer } = require("electron");

const BASE_BACKEND_URL = "http://127.0.0.1:8000";
const JSON_HEADERS = { "Content-Type": "application/json" };

const apiRequest = async (endpoint, method, bodyContent) => {
    const url = `${BASE_BACKEND_URL}${endpoint}`;
    try {
        const response = await fetch(url, {
            method,
            headers: JSON_HEADERS,
            body: JSON.stringify(bodyContent),
        });
        return response.json();
    } catch (error) {
        return { status: "error", message: error.message };
    }
};

contextBridge.exposeInMainWorld("api", {
    // ipcRenderer functions
    selectFolder: () => ipcRenderer.invoke("selectFolder"),
    openWidget: () => ipcRenderer.invoke("openWidget"),
    closeWidget: () => ipcRenderer.invoke("closeWidget"),

    // Custom backend api calls
    createProject: (name, path) =>
        apiRequest("/projects", "POST", { name, path }),
    getProject: (projectId) => apiRequest(`/projects/${projectId}`, "GET"),
    getProjectFiles: (projectId) =>
        apiRequest(`/projects/${projectId}/files`, "GET"),
    getCommits: (projectId) => apiRequest(`/commits/${projectId}`),
    updateFileTracking: (projectId, files) =>
        apiRequest(`/projects/${projectId}`, "PUT", { files }),
    commitFiles: (projectId, files) =>
        apiRequest(`/commits/${projectId}`, "POST", { files }),
    deleteProject: (projectId) =>
        apiRequest(`/projects/${projectId}`, "DELETE", { projectId }),
    updateAppState: (updates) => apiRequest("/state", "POST", { updates }),
    getAppState: () => apiRequest("/state", "GET"),
});
