# E-commerce Backend

This is an e-commerce project developed with TypeORM. It provides a robust backend solution for managing products, orders, and users in an online store environment.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Contributing](#contributing)

## Introduction

The e-commerce backend is designed to handle various aspects of an online store, including product management, order processing, and user authentication. It utilizes TypeScript and TypeORM for database operations, providing type safety and efficient ORM functionality.

## Features

- User authentication and authorization
- Product management (creation, retrieval, update, deletion)
- Order processing and management
- Database migrations using Sequelize CLI
- TypeScript support for improved developer experience

## Requirements

To run this project, you'll need to install Node.js and npm (Node Package Manager). Additionally, ensure you have PostgreSQL installed and running on your system.

## Installation

1. Clone the repository:

git clone https://github.com/yourusername/e-commerce-backend.git

2. Navigate to the project directory:

cd e-commerce-backend

3. Install dependencies:

npm install

4. Create a `.env` file in the root directory and add your database configuration:

DB_HOST=localhost DB_USER=your_username DB_PASSWORD=your_password DB_NAME=ecommerce_db

## Usage

To start the development server:

1. Run the following command:

npm run start:dev

This will concurrently compile TypeScript files and run the Node.js server using nodemon.

To build the project for production:

npm run build

### To start the built application:

npm run start

## Scripts

This project uses npm scripts for various development tasks:

- `watch`: Watch for changes in TypeScript files
- `dev`: Start the development server
- `start:dev`: Run both TypeScript compilation and server startup concurrently
- `build`: Compile TypeScript files
- `start`: Run the compiled JavaScript file
- `typeorm`: Run TypeORM CLI commands
- `migrate`: Run Sequelize migrations
- `migration`: Run TypeORM migration
- `seed`: Seed the database with initial data

## Contributing

Contributions to this project are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
