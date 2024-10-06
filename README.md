## Event Ticket Booking System

### Overview

This project is a RESTful API built with **Node.js** and **Express** for an event ticket booking system. It allows event organizers to manage tickets and users to book tickets, handles a waiting list when events are sold out, and ensures concurrency safety during ticket booking and cancellation.

### Features

- Initialize an event with a set number of tickets.
- Book tickets for an event.
- Automatically add users to a waiting list when the event is sold out.
- Automatically assign canceled tickets to users on the waiting list.
- View the current status of an event (available tickets and waiting list).
- Ensure concurrency safety when multiple users try to book tickets simultaneously.
- Built with Test-Driven Development (TDD) practices.

### Tech Stack

- **Node.js**
- **Express.js**
- **Sequelize (ORM for PostgreSQL)**
- **PostgreSQL** (Relational Database)
- **Jest** for unit and integration tests
- **Supertest** for API testing

---

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download/) (v12.x or higher)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Sequelize CLI](https://sequelize.org/master/manual/migrations.html)

---

### Getting Started

#### 1. Clone the Repository

```bash
git clone git@github.com:OjerIsaac/node_test.git
cd ticket-booking-system
```

#### 2. Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

#### 3. Setup Environment Variables

Create a `.env` file in the project root and configure the database connection and server port:

```bash
PORT=3000
DB_NAME=ticket_booking_system_dev
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=127.0.0.1
```

#### 4. Setup the Database

Ensure PostgreSQL is running, and then create the database:

```bash
createdb ticket_booking_system_dev
```

Next, run the migrations to set up the schema:

```bash
npx sequelize-cli db:migrate
```

---

### Running the Application

To start the server, use the following command:

```bash
npm start
```

By default, the server will run on `http://localhost:3000/`.

---

### API Endpoints

1. **Initialize an Event**

   - **POST /initialize**
   - Request Body:
     ```json
     {
       "name": "Event Name",
       "totalTickets": 100
     }
     ```

2. **Book a Ticket**

   - **POST /book**
   - Request Body:
     ```json
     {
       "eventId": 1,
       "userId": 123
     }
     ```

   - Response: `201 Created` if ticket is booked, `202 Accepted` if added to the waiting list.

3. **Cancel a Booking**

   - **POST /cancel**
   - Request Body:
     ```json
     {
       "eventId": 1,
       "userId": 123
     }
     ```

   - Response: `200 OK` if booking canceled and waiting list is updated.

4. **Get Event Status**

   - **GET /status/:eventId**

   - Response:
     ```json
     {
       "eventId": 1,
       "name": "Event Name",
       "remainingTickets": 10,
       "waitingListCount": 5
     }
     ```

---

### Running Tests

This project follows a Test-Driven Development (TDD) approach. Tests are written with **Jest** and **Supertest**.

To run tests, use the command:

```bash
npm test
```

The test coverage includes unit tests for individual components and integration tests for API endpoints.

---

### Database Migrations

To create a new migration:

```bash
npx sequelize-cli migration:generate --name <migration_name>
```

To run migrations:

```bash
npx sequelize-cli db:migrate
```

To revert migrations:

```bash
npx sequelize-cli db:migrate:undo
```

---

### Project Structure

```
ticket-booking-system/
├── config/          # Database configurations
├── controllers/     # Controller logic for handling requests
├── migrations/      # Sequelize migration files
├── models/          # Sequelize models
├── routes/          # API route definitions
├── tests/           # Test cases for the application
├── app.js           # Express app configuration
├── server.js        # Server setup and start
├── package.json     # Project dependencies and scripts
└── README.md        # Project documentation
```

---

### Concurrency Handling

The system uses locking mechanisms provided by PostgreSQL and Sequelize's transaction management to handle concurrency issues, especially during booking and cancellation operations, ensuring no race conditions occur.

---

### Error Handling

The API includes comprehensive error handling for all scenarios, such as:

- Event not found.
- No tickets available.
- User not on the waiting list.
- Database errors.

Error responses include meaningful messages and appropriate HTTP status codes.

---

### Author

- **Isaac Ojerumu** - [GitHub](https://github.com/OjerIsaac)