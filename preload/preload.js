const { contextBridge, ipcRenderer } = require("electron");

const BASE_BACKEND_URL = "BACKEND_URL";
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
    getProject: () => {
        // apiRequest(`/projects/${projectId}`, "GET")
        return {
            created_on: "2024-12-24T00:55:35.932220",
            id: "3",
            name: "Placeholder project nr. 3",
            path: "/path/to/the/third/project",
            files: [
                {
                    name: "document.docx",
                    path: "/path/to/the/third/project/document.docx",
                    is_tracked: true,
                },
                {
                    name: "utils/spreadsheet.xlcx",
                    path: "/path/to/the/third/project/utils/spreadsheet.xlcx",
                    is_tracked: false,
                },
                {
                    name: "utils/programming.cpp",
                    path: "/path/to/the/third/project/utils/programming.cpp",
                    is_tracked: false,
                },
                {
                    name: "images/image1.png",
                    path: "/path/to/the/third/project/images/image1.png",
                    is_tracked: true,
                },
                {
                    name: "images/image2.jpeg",
                    path: "/path/to/the/third/project/images/image2.jpeg",
                    is_tracked: true,
                },
            ],
        };
    },
    getProjectFiles: (projectId) =>
        apiRequest(`/projects/${projectId}/files`, "GET"),
    getCommits: (projectId) => {
        // apiRequest(`/commits/${projectId}`)
        return [
            {
                date: "2025-01-03T21:15:05Z",
                hash: "c559298e6d0251e348b9bf0e54c25c878f2060e7",
                message: "second commit\n",
            },
            {
                date: "2025-01-03T20:48:24Z",
                hash: "4f94509f6fc4923353bdbebb604751bd7c8487d7",
                message: "initial commit\n",
            },
        ];
    },
    updateFileTracking: (projectId, files) =>
        apiRequest(`/projects/${projectId}`, "PUT", { files }),
    commitFiles: (projectId, files) =>
        apiRequest(`/commits/${projectId}`, "POST", { files }),
    deleteProject: (projectId) =>
        apiRequest(`/projects/${projectId}`, "DELETE", { projectId }),
    updateAppState: (updates) => apiRequest("/state", "POST", { updates }),
    getAppState: () => apiRequest("/state", "GET"),
});
