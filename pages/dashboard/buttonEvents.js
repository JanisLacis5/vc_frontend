import { loadPage } from "../../renderer/utils/loadPage.js";

export async function manageProject(project) {
    await loadPage("manageProject", project.id);
}

export async function deleteProject(project) {
    await window.api.deleteProject(project.id);
}
