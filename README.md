# SkatePark Manager

This project is a Node.js application that simulates a skate park management system

## Prerequisites

- Node.js installed

## Installation

1. Clone the repository to your local machine
   
2. Install the required dependencies:

    ```bash
    npm install
    ```
3. Create a `.env` file in the root directory and add your env variables:

    ```bash
    SECRET_KEY=
    USER_DB=
    PASSWORD_DB=
    HOST_DB=
    DB_NAME=
    DB_PORT=
    ```
4. Create a postgreSQL database named skatepark and create the following table:
    ```sql
    CREATE TABLE skaters (id SERIAL, email VARCHAR(50) NOT NULL, nombre
    VARCHAR(25) NOT NULL, password VARCHAR(255) NOT NULL, anos_experiencia
    INT NOT NULL, especialidad VARCHAR(50) NOT NULL, foto VARCHAR(255) NOT
    NULL, estado BOOLEAN NOT NULL);
    ```

## Usage

1. Start the application:

    ```bash
    node server.js
    ```

2. Open your browser and navigate to `http://localhost:3000` to interact with the web interface.
