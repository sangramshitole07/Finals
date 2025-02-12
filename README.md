#ART Finder - Automated Research and Trigger Finder
ART Finder is a tool designed to streamline the research phase of ad creation by automating data gathering and analysis from various sources such as Google, YouTube, Reddit, Quora, and app reviews. It helps marketers identify user pain points, analyze competitor ads, and generate actionable insights for crafting effective and user-centric ads.

Table of Contents
Project Overview
Features
Installation Instructions
Usage
Technologies Used
Folder Structure
Contributing
License
Project Overview
ART Finder automates the research process by scraping data from blogs, forums, social media platforms, and app reviews. It also analyzes YouTube videos and competitor ads to uncover high-performing hooks, CTAs, and content formats. The tool then provides marketers with actionable insights and suggestions that help in crafting user-centric ads.

Features
Comprehensive Research Automation
Scrapes data from various platforms like Google, YouTube, Reddit, Quora, and app reviews to analyze trends, user pain points, and solutions.

Actionable Insights Generation
Summarizes key user problems, suggests high-performing hooks, CTAs, and solutions, and tailors recommendations to topics and audience preferences.

Reference Dashboard
Provides links to scraped YouTube videos and competitor ads, facilitating easy validation and inspiration. Insights are visualized through graphs, word clouds, and sentiment analysis.

User-Centric Interface
Simple input fields for topics and brand guidelines, with an intuitive dashboard showcasing actionable insights and suggestions at a glance.

Installation Instructions
To set up and run ART Finder locally, follow these steps:

Clone the repository:

git clone https://github.com/sangramshitole07/ART-Finder.git

Navigate to the project directory:


cd ART-Finder

Install dependencies:

If you don't have npm installed, you can install it from here. Then, run:


npm install

Set up environment variables (if applicable):

Ensure that you create an .env file in the root of the project and add any necessary API keys or configuration variables (such as for scraping or sentiment analysis APIs).

Example:


REACT_APP_API_KEY=your-api-key
Start the development server:


npm run dev
Open the app:

After the server starts, open your browser and visit http://localhost:3000 to view the application.

Usage
Input Fields:
On the homepage, enter your topic or brand guidelines to begin the research.

Dashboard:
Once the research is processed, you will see a dashboard that includes visualizations like word clouds, graphs, and sentiment analysis. You can click on references (e.g., YouTube videos or competitor ads) for more context.

Insights:
Actionable insights and suggestions (e.g., hooks, CTAs, and solutions) will be shown on the dashboard, helping you craft effective ads for your target audience.

Technologies Used
Vite: Fast build tool for React.
React: JavaScript library for building user interfaces.
Axios: For API calls and data fetching.
Node.js: Backend for handling API requests (optional for server-side tasks).
Cheerio: For web scraping (for platforms like Google, Reddit, etc.).
Sentiment Analysis: To analyze the sentiment of user reviews and feedback.
Chart.js: For visualizing data (word clouds, graphs).
CSS / Tailwind CSS: For styling the application.




