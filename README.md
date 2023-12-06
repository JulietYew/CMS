# A Content Management System(CMS)

This is a RESTful API for a content mangement system providing a reliable and efficient way to manage and deliver data for various functionalities.

# Functionalities
A user can sign up and sign in to view and use the application, list users, get a single user by their ID, edit and delete user profile by Id.
Create posts, Delete posts, Edit posts, List posts.
Create a post category, List all post categories, Edit a post category, Delete a post category
A real-time Admin dashboard endpoint that uses socket.io to get and send real-time data from/to a data source, such as database or external API.  

# Prerequisites

Node.js 18 or higher installed on your machine.
Latest version of the following:

- NodeJS
- ExpressJs
- Mongoose
- bcrypt
- joi
- jsonwebtoken

# Installations

- Open terminal and clone the repository (git clone `name of repo`)
- Download `Postman` or `ThunderClient` to simulate running the code as a user on the client side.
- Install the dependencies by using `npm install`
- Create a `.env` file in the root directory and set the following environment variables: PORT=3000