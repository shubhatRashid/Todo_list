
# ToDo List App 
 with HTML, CSS, JavaScript, Node.js, Express, EJS, and MongoDB
 ![image](https://github.com/shubhatRashid/Todo_list/assets/106548827/13a0a871-f93f-46fc-825e-2a95d585780b)
 ![image](https://github.com/shubhatRashid/Todo_list/assets/106548827/2a076b2e-a87f-45f5-aba8-856880abf758)


* This is a simple ToDo List web application built using HTML, CSS, JavaScript, Node.js, Express, EJS templating, and MongoDB.
* The app allows users to create, read, update, and delete tasks on their ToDo list.
* live @ https://todolist-shubhat.cyclic.app/

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js: Make sure you have Node.js installed on your machine. You can download it from [https://nodejs.org/](https://nodejs.org/).

- MongoDB: Install MongoDB and ensure it's running. You can download MongoDB from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community).

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/todo-list-app.git
```

2. Navigate to the project directory:

```bash
cd todo-list-app
```

3. Install the project dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root and add your MongoDB connection string:

```
MONGODB_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with your actual MongoDB connection string.

## Usage

1. Start the application:

```bash
npm start
```

2. Open your web browser and go to `http://localhost:3000` to access the ToDo List app.

3. You can add tasks by typing a task in the input field and clicking the "Add" button.

4. To mark a task as complete, click the checkbox next to the task.

5. To edit a task, click the "Edit" button and make the desired changes.

6. To delete a task, click the "Delete" button next to the task.

## Technologies Used

- HTML: Structure of the web page.
- CSS: Styling and layout of the web page.
- JavaScript: Interactive functionality and dynamic content.
- Node.js: JavaScript runtime for server-side scripting.
- Express: Web application framework for Node.js.
- EJS: Templating engine for rendering dynamic content.
- MongoDB: NoSQL database for storing tasks.

## Project Structure

The project directory is organized as follows:

```
todo-list-app/
├── node_modules/
├── public/
│   └── styles.css
├── views/
│   ├── SignUp.ejs
│   └── login.ejs
│   └── lists.ejs
│   └── header.ejs
│   └── footer.ejs
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```

- `node_modules/`: Contains project dependencies.
- `public/`: Holds static files such as CSS styles.
- `views/`: Contains EJS templates for rendering pages.
- `.env`: Configuration file for environment variables.
- `app.js`: Main application file where routes and server configuration are defined.
- `package.json`: Project metadata and list of dependencies.

## Acknowledgements

This project was created as an educational exercise and is not intended for production use.

Feel free to customize, enhance, and deploy this ToDo List app according to your needs. If you have any questions or need further assistance, don't hesitate to contact me. Happy coding!
