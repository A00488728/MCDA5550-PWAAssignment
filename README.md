# To-Do App

This is a simple To-Do List web application that allows users to add, delete, and prioritize tasks. The app stores tasks locally using the browser's `localStorage` and supports Progressive Web App (PWA) features through a service worker for offline capabilities.

## Features

- Add tasks to the list
- Assign priorities to tasks (Urgent, Normal, Low) from drop down menu after adding the tasks
- Delete tasks from the list
- Tasks are saved persistently in `localStorage`
- The app supports offline usage via Service Workers

## Assumptions

- The app assumes that the user has a modern browser that supports `localStorage` and service workers.
- The task list is stored locally in the browser, meaning tasks are persistent across sessions but will be lost if the user clears their browser's local storage or caches.
- The app uses `localStorage` to store the tasks in a simple JSON format.

## External Resources Used

- **Service Worker**: Used to cache the app's resources for offline functionality.
- **Manifest File**: Defines metadata for the app to support Progressive Web App features, such as adding the app to the home screen on mobile devices.
- **CSS**: The app uses an external `style.css` file for basic styling. You can modify or extend this file to customize the appearance.

## Setup Instructions

### Prerequisites

To run this app, you need:

- A modern web browser that supports `localStorage` and Service Workers.
- A local development environment or a server to run the app.

### Running the App Locally

1. Clone this repository or download the files to your local machine.

   ```bash
   git clone https://github.com/A00488728/MCDA5550-PWAAssignment.git
   npm init -y
   npm install
   npm start
   browse localhost:8080
