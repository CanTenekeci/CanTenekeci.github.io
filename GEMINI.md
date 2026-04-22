# Project Overview: Can Tenekeci Portfolio

This is a personal portfolio website for **Can Tenekeci**, a Mechatronics Engineer and Network & System Specialist. The website serves as a digital resume and showcase for his engineering background, certifications (CCNA, Fortinet, Linux), and technical projects.

## Tech Stack

- **Frontend:** HTML5, Vanilla CSS3, Vanilla JavaScript (ES6+).
- **Design:** Responsive mobile-first design, CSS Variables for theme management, and Inter font family.
- **Integrations:** GitHub REST API to dynamically fetch and display public repositories.
- **Animations:** Intersection Observer API for scroll-reveal effects.

## Key Features

- **Theme Switcher:** Supports "Light", "Warm", and "Dark" modes using `data-theme` attributes and CSS variables.
- **Responsive Navigation:** A mobile-friendly hamburger menu that adapts to different screen sizes.
- **Dynamic Projects:** Automatically pulls the latest repositories from GitHub (User: `CanTenekeci`), filtering out forks and the portfolio repo itself.
- **Clean Architecture:** Separation of concerns with dedicated files for structure (`index.html`), styling (`style.css`), and logic (`script.js`).

## Building and Running

Since this is a static website, there is no build step required.

- **Development:** Simply open `index.html` in any modern web browser.
- **Local Server (Optional):** You can use a local server like Live Server (VS Code extension) or Python's `http.server` for better handling of assets and API requests.
  ```bash
  # Example using Python
  python -m http.server 8000
  ```
- **Deployment:** The project is ready for deployment on static hosting platforms like GitHub Pages, Vercel, or Netlify.

## Development Conventions

- **CSS:** Uses a custom naming convention (similar to BEM) for classes (e.g., `navbar__inner`, `project-card__title`).
- **JavaScript:** 
  - All logic is wrapped in a `DOMContentLoaded` listener.
  - Asynchronous fetching is used for GitHub API integration.
  - Theme preference is persisted in `localStorage`.
- **Styling:** Avoid global styles where possible; use variables for colors and spacing to maintain consistency across themes.

## Key Files

- `index.html`: The main structural file containing the landing page sections (Hero, About, Projects).
- `style.css`: Contains all layout, theme definitions, and animations.
- `script.js`: Handles theme switching, mobile menu toggle, scroll animations, and GitHub API integration.
- `.gitignore`: Standard web project ignore rules.
