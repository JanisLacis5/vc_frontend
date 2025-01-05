import { loadPage } from "../../renderer/utils/loadPage.js";

export async function manageProject() {
    await loadPage("manageProject");
}

export async function deleteProject(project) {
    // await window.api.deleteProject(project.id);
    alert("project deleted");
}
