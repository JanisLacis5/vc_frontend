#### First of all, code in this repo is extremely messy and it does not really matter. This is meant to be a repo where you can look into how my app looks right now, try to understand the functionality etc.

#### Second of all, the main thing I would love from our colaboration is app's redesign. It would also be cool to transform this app to React, but it is not that important. I will deal with functionality but I am open to suggestions & critique

#### I have no preferences for design, animations etc., so feel free to do whatever you like

App can be run using:
`npm install && npm start`

## There are 2 windows:

- Main App window - this is the window that contains the overview of the projects, where user can manage projects and create new projects
  and change app's settings
- Widget - this is a small window that user will use when editting their files.

### Main App Window:

- Dashboard
    - Each project is listed, project's display contains name, path and 2 buttons.
- Create project:
    - Page contains a basic form where user can name their project, choose folder for their project and
      create it. Currently, when `Create  Project` button is clicked, user is not directed to the dashboard,
      I would like for that to happen.
- Settings:
    - I did not finish this page myself, so I would like for you to add some placeholder settings, design
      them and I will add the real ones later
- Manage Project:
    - Main thing in this page that must be redesigned is the part where name, path and creation date is shown
    - I tried to implement VSCode-like file tree, feel free to redesign it, but I would like for it to
      be something simmilar to this. Main features is that it is collapsable and user can choose which files are tracked
      by using checkboxes
    - For commit history, I have not implemented `View changes` page, but I want it to be something like GitHub page where
      user can see what was added and what was removed I the commit. I am ready to implement this page myself as well.
      Each commit contains commit hash, name and date.

## Widget Window:

- Currently there are only files displayed, but I would like to have some sort of file tree as well. Ideally, more compact
  version of file tree from `Manage Project` page
- Implement function for minimize window button

## Final requests:

- Every page should be redesigned - as I mentioned, that is the main goal
- This README file contains info to understand the app's functionality
- I have no suggestions and preferences for design as I do not understand anything about this
  and I really do not like to design things so I will appreciate your creativeness and help :)
