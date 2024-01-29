# Overview

This Angular 17.0 application is a self-testing and self-debugging code generator named **Autocode**.

Its primary goal is to streamline the process of code generation by incorporating a ChatGPT API for prompt-based JavaScript code creation. The generated code undergoes an automatic testing and debugging loop within the Angular SSR environment, ensuring that the output is already tested and verified.

**[Autocode Demo Video](#)** <!-- Replace with the link to your demo video when available -->

# Development Environment

This application is developed using the following technologies and tools:

- **Angular 17.0 (SSR):** The front-end of "Autocode" is built using the latest version of Angular, which now includes Angular SSR (Server-Side Rendering) as a fundamental part of the official Angular engine.
- **Express Server:** The back-end REST API is served through an Express server, the same server that serves the Angular app.
- **TypeScript:** The majority of the source code is written in TypeScript, enhancing code maintainability and scalability.
- **Pupeteer:** As a headless browser automation library, Puppeteer is responsible for running the generated code and capturing debug information to send to Autocode's automated testing and debugging system.
- **Visual Studio Code (VS Code):** The development environment is Visual Studio Code, a powerful and extensible code editor.
- **ChatGPT API:** Autocode utilizes the ChatGPT API for prompt-based code generation. An API key is required for accessing ChatGPT services.
- **Node.js:** Both the front-end and back-end leverage Node.js for seamless JavaScript development.

# Useful Websites

- [Angular](https://angular.io/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Visual Studio Code (VS Code)](https://code.visualstudio.com/)

# Future Work

- Enhance user experience by incorporating additional customization options for the generated code.
- Explore and implement advanced features for code functionality testing and verification.
- Continuously improve and expand the functionality of "Autocode" based on user feedback.

