# Capstone Project: IntelliFeed - Personalized News with AI Assistant

### Project Idea:

IntelliFeed is a personalized newsfeed application that leverages user preferences and AI capabilities to deliver a tailored news experience.  Users can create accounts, select their preferred topics, and receive a curated feed of news articles. The application offers additional functionalities like:

- Search for specific articles, publishers, or topics.
- Bookmark articles for later reference.
- Interact with an AI assistant powered by Gemini (Optional - Level 2) to:
  - Get article summaries 
  - Engage in "full-fledged conversations" related to the articles and their topics
  - Potentially save user-chosen chat sessions for future reference

### Tech Stack:
- Backend: Node.js with Express.js
- NLP Library: spaCy (Python) (Optional - Level 2)
- News API: Use an API like NewsAPI.org
- Gemini API (Optional) (Optional - Level 2)
- Frontend: Vite-React
- Database: MongoDB

## Day-by-Day Plan (First 5 Days):

### DAY 1:
- Project Setup :
- - Create a project directory and initialize a version control system (Git).
- - Install Node.js, npm (Node Package Manager), and MongoDB.
- - Set up a MongoDB instance locally or on a cloud platform.

### DAY 2:
- Backend Structure :
- - Initialize a Node.js project with Express.js.
- - Design the basic folder structure for backend functionalities.
- - Set up Mongoose ODM (Object Data Modeling) for interacting with MongoDB.

### DAY 3:
- User Management :
- - Design user registration and login functionalities using Express routes.
- - Implement logic for user data storage (username, password) in MongoDB using Mongoose.
- - Consider using hashing and salting for password security.

### DAY 4:
- News API Integration 
- - Sign up for a News API account and obtain an API key.
- - Explore the News API documentation for making API requests and retrieving news data.
- - Implement logic in Express routes to interact with the News API based on user preferences (topics, keywords).

### DAY 5:
- Frontend Setup 
- - Set up a Vite-React project for the application's user interface.
- - Design basic UI components for login, topic selection, and news feed display.
- - Implement logic for making API calls from the frontend to the backend for functionalities like user login and fetching news articles.

