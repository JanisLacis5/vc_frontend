import {renderProjects} from "../utils/renderProjects.js";

export async function selectFolderBtnFunc(projects, projectList) {
	// wait for user to select the folder
	const selectedFolder = await window.api.selectFolder();

	// update the sentence that shows what folder is selected
	if (selectedFolder) {
		document.getElementById(
			"selected-folder"
		).textContent = `Selected Folder: ${selectedFolder}`;
	} else {
		document.getElementById("selected-folder").textContent =
			"No valid folder selected.";
	}
	// renderProjects(projects, projectList);

	// create new project
}
