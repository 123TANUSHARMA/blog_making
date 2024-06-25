# Blog Management Website

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contributing](#contributing)


## Introduction
This is a simple blog management website that allows users to create, update, and delete blog posts. The application is built using Node.js, Express.js, and EJS for templating. 

## Features
- **Create Blog**: Users can create new blog posts with a title and content.
- **Update Blog**: Users can update existing blog posts.
- **Delete Blog**: Users can delete blog posts.
- **View Blogs**: Users can view a list of all blog posts and click on them to read the full content.

## Installation
1. **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/blog-management-website.git
    cd blog-management-website
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Start the Server**:3
    ```bash
    nodemon index.js
    ```

4. **Access the Application**:
    Open your web browser and go to `http://localhost:3000`.

## Usage
- **Home Page**: The home page provides options to create, update, or delete a blog.
- **Create Blog**: Click on the "Create blog" button, fill in the title and content, and submit to create a new blog post.
- **Update Blog**: Click on the "Update blog" button, select the blog to update, change the title or content, and submit.
- **Delete Blog**: Click on the "Delete blog" button, select the blog to delete, and confirm the deletion.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Templating**: EJS
- **Styling**: Bootstrap 5

## Project Structure
- blog-management-website/
- ├── creation/ # Directory containing blog HTML files
- ├── public/ # Public assets (CSS, JS, images)
- ├── views/ # EJS templates
- │ ├── partials/ # EJS partial templates (header, footer, etc.)
- │ ├── index.ejs # Home page
- │ ├── create.ejs # Create blog page
- │ ├── update.ejs # Update blog page
- │ ├── delete.ejs # Delete blog page
- │ ├── features.ejs # Features page
- │ ├── faq.ejs # FAQ page
- │ ├── about.ejs # About page
- │ └── createdblog.ejs # Page showing all created blogs
- ├── app.js # Main application file
- ├── package.json # Node.js package configuration
- └── README.md # Project README file

## Contributing
1. **Fork the repository**.
2. **Create a new branch** (`git checkout -b feature-branch`).
3. **Make your changes**.
4. **Commit your changes** (`git commit -m 'Add some feature'`).
5. **Push to the branch** (`git push origin feature-branch`).
6. **Create a new Pull Request**.
