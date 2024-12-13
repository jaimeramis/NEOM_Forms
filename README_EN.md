# NEOM FORMS

Web Development - Front End - NEOM Forms

# Functionality:

Project commissioned by the Saudi Arabian client NEOM. It includes three pages for forms: a thank-you page, an apology page, and the forms. Everything is prepared for backend development to be executed by another team.

# Features:

- Thank-you page.
- Contact page.
- Form pages.

# Requirements:

- Tech Stack: HTML, CSS with SASS, JS, PNPM/NPM, and TypeScript for the deployment process.
- Frameworks: Hugo, which defines the project structure.

# Project Structure:

- **assets**: Folder containing the SASS files.
- **content**: Folder where the developed pages are located.
- **layouts**: Folder provided by Hugo for managing common files like the footer.
- **public**: Folder containing the temporary structure before building the project.
- **resources**: Folder specific to the Hugo framework.
- **static**: Folder for JS files and static images. It may also include videos.

# Installation:

1. Download or clone the repository.
2. Ensure that all necessary tools are installed on your system, such as PNPM (optional). You can use NPM if preferred.
3. To run the project:

```bash
# Command to visualize the content folder. Once executed, go to localhost and enter the name of one of the files.
# Example: http://localhost:1313/en/preferences-contact/

hugo server

# This command cleans the public folder and generates the deploy folder. It includes the compiled HTML with its CSS and JS for each instance.
pnpm run build

# Alternative if you prefer not to use PNPM:
npm run build
```

Thank you for your attention.<br>
JR
