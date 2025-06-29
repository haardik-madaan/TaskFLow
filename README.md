# TaskFlow – Smart To-Do App with Authentication

TaskFlow is a modern to-do list web application built using HTML, CSS, and JavaScript. It features a clean interface, user authentication with age verification, and persistent data storage via localStorage.


## Live Demo

[View the app on Vercel](https://task-f-low-ten.vercel.app/login.html) <!-- Replace with your deployed link -->


## Features

- Login/Register with Age Verification  
  Users must be at least 10 years old to access the app. The system stores their session in localStorage.

- Personalized User Greeting  
  Displays the user's name along with a motivational message on the dashboard.

- Add, Edit, Delete Tasks  
  Tasks can be dynamically created, edited in place, and removed with interactive feedback.

- Mark Tasks as Completed  
  Completed tasks are visually distinguished with animations and styling.

- Progress Tracking  
  A visual progress bar shows the number of tasks completed out of the total.

- Celebration Animation  
  When all tasks are completed, a confetti animation and completion sound are triggered.

- Data Persistence  
  All user and task data are stored locally using localStorage, so data is preserved on page reload.

- Logout Functionality  
  Users can log out, which clears the stored user data and redirects to the login page.

## User Flow

1. User opens the login page and enters name and date of birth.
2. If age is valid, the system stores the data and redirects to the main app.
3. User can manage tasks and track progress.
4. If all tasks are completed, celebration effects are triggered.
5. User can log out, which clears their data.


