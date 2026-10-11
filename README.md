# Developer Portfolio Website

A responsive, single-page developer portfolio for Rushang Savaliya, a developer learning by building practical projects. It is built with semantic HTML5, modern CSS, and vanilla JavaScript. The site includes a hero banner, polished placeholder project showcase, about section, skills overview, mobile navigation, and validated contact form.

## Tech stack

- **HTML5** — Provides the semantic document structure, accessible navigation, project cards, and contact form.
- **CSS3** — Provides the visual system, responsive Grid and Flexbox layouts, typography, color palette, hover states, focus states, and mobile breakpoints.
- **JavaScript** — Adds smooth in-page scrolling, mobile hamburger-menu behavior, dynamic copyright year, and client-side contact form validation.
- **Google Fonts** — Uses Manrope and DM Mono for the interface typography. Fonts are loaded from Google Fonts in `index.html`.

There are no frameworks, build tools, or runtime dependencies.

## Project structure

```text
portfolio-website/
├── index.html          # Main portfolio page
├── README.md           # Project documentation
├── css/
│   └── styles.css      # Layout, components, theme, and responsive styles
├── images/             # Project and profile images
│   └── .gitkeep
└── js/
    └── script.js       # Navigation, scrolling, menu, and form behavior
```

## Run locally

The site can be opened directly by opening `index.html` in a browser. For a local development server, run:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

## Included features

- Semantic HTML5 page landmarks
- Responsive desktop, tablet, and mobile layouts
- Desktop navigation and mobile hamburger menu
- Smooth scrolling for internal navigation links
- CSS Grid project layout with three project cards
- Accessible focus states and reduced-motion support
- Contact form with name, email, and message validation
- Dynamic copyright year
- Decorative project visuals that can be replaced with real images

## Customization

1. Update the name, biography, project content, email address, and social links in `index.html`.
2. Add project or profile images to the `images/` directory.
3. Update the colors, fonts, spacing, and breakpoints in `css/styles.css`.
4. Connect the contact form to a backend or form service by changing its `action` attribute.
5. Update the JavaScript validation rules in `js/script.js` if additional fields are added.

The form currently validates input in the browser only; it does not send messages to a server. Replace the placeholder form action and contact details before publishing.

## Microsoft Copilot assistance

Microsoft Copilot was used to assist with building and debugging this project. Assistance included generating and refining the initial HTML, CSS, and JavaScript structure; improving responsive layouts and accessibility states; implementing navigation and form interactions; and verifying behavior during browser testing.

All generated code was reviewed and integrated into the project to match the intended design and functionality.

## License

This project is provided as a customizable portfolio starter. Add an appropriate license before distributing it as an open-source project.
