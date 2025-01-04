export function createProjectBtnFunc(projects, projectFolderInput) {
	const folderPath = projectFolderInput.value;
	if (!folderPath) {
		alert("Please select a folder!");
		return;
	}

	// Add project to the list
	projects.push({ name: `Project ${projects.length + 1}`, path: folderPath });
	projectFolderInput.value = "";
	alert("Project created successfully!");
	return projects;
}
