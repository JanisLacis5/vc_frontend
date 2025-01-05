import {
    manageProject,
    deleteProject,
} from "../../pages/dashboard/buttonEvents.js";

// Define the API URL (replace with your actual API endpoint)
const apiUrl = "BACKEND_URL";

const projects = [
    {
        id: "1",
        name: "Placeholder project nr. 1",
        path: "/path/to/this/project",
    },
    {
        id: "2",
        name: "Placeholder project nr. 2",
        path: "/path/to/another/project",
    },
    {
        id: "3",
        name: "Placeholder project nr. 3",
        path: "/path/to/the/third/project",
    },
];

// Function to fetch projects and display them
export async function fetchAndDisplayProjects() {
    try {
        // // Fetch the projects from the API
        // const response = await fetch(apiUrl, {
        // 	method: "GET",
        // });
        // if (!response.ok) {
        // 	throw new Error("Failed to fetch projects");
        // }
        // const projects = await response.json();

        // Get the projects container
        const projectsContainer = document.getElementById("projects");
        projectsContainer.innerHTML = ""; // Clear previous content

        if (!projects.length) {
            const paragraphItem = document.createElement("p");
            paragraphItem.innerHTML = "No projects";
            projectsContainer.appendChild(paragraphItem);
        }

        // Iterate over the projects and create list items
        projects.forEach((project) => {
            const projectItem = document.createElement("li");
            projectItem.className = "project-item";

            // Add project name and path
            projectItem.innerHTML = `
				<div>
					<h3>${project.name}</h3>
					<p>${project.path}</p>
				</div>
				<div>
					<button class="manage-project-btn">Manage</button>
					<button class="delete-project-btn">Delete</button>
				</div>
			`;

            // Add click listeners for the buttons
            const manageButton = projectItem.querySelector(
                ".manage-project-btn",
            );
            const deleteButton = projectItem.querySelector(
                ".delete-project-btn",
            );

            manageButton.addEventListener("click", () => {
                manageProject(project);
            });

            deleteButton.addEventListener("click", () => {
                deleteProject(project);
            });

            // Append the project item to the container
            projectsContainer.appendChild(projectItem);
        });
    } catch (error) {
        console.error("Error fetching projects:", error.message);
        const projectsContainer = document.getElementById("projects");
        projectsContainer.innerHTML = `<p>Error loading projects: ${error.message}</p>`;
    }
}
