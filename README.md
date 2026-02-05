# SupportSphere ![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![Version](https://img.shields.io/badge/version-1.0.0-blue)

## Project Description
SupportSphere is a web application designed to enhance customer support operations by leveraging AI to analyze customer queries and prioritize support tickets in real-time. It integrates seamlessly with a knowledge base to provide agents with contextual suggestions, improving response times and customer satisfaction.

## Features
- 🤖 AI-driven customer query analysis
- ⏱️ Real-time support ticket prioritization
- 📚 Integrated knowledge base suggestions

## Tech Stack
### Frontend
- **Next.js** 🌐

### Backend
- **Node.js** 🚀
- **OpenAI Agent SDK** 🧠

### Database
- **PostgreSQL** 🗄️
- **Prisma** 🔗

### Caching
- **Redis** 🧊

## Installation
To set up the project locally, follow these steps:

- Clone the repository
bash
git clone https://github.com/Rahul-Khera-Codes/supportsphere.git
- Navigate to the project directory
bash
cd supportsphere
- Install the dependencies
bash
npm install
- Set up the environment variables (create a `.env` file based on `.env.example`)
bash
cp .env.example .env
- Run database migrations
bash
npx prisma migrate dev
- Start the development server
bash
npm run dev
## Usage
Once the application is running, navigate to `http://localhost:3000` in your web browser to access SupportSphere. You can start analyzing customer queries and managing support tickets through the intuitive interface.

## API Documentation
For detailed API documentation, please refer to the [API Documentation](https://github.com/Rahul-Khera-Codes/supportsphere/wiki/API-Documentation).

## Testing
To run the tests for this project, use the following command:
bash
npm test
## Deployment
For deploying SupportSphere, follow these steps:

- Build the application
bash
npm run build
- Start the production server
bash
npm start
- Ensure your environment variables are correctly set for production.

## Contributing
We welcome contributions! Please follow these guidelines:

- Fork the repository
- Create a new branch for your feature or bug fix
- Make your changes and commit them
- Push your branch and create a pull request

For more details, please refer to the [CONTRIBUTING.md](https://github.com/Rahul-Khera-Codes/supportsphere/blob/main/CONTRIBUTING.md). 

Thank you for your interest in SupportSphere! 🚀