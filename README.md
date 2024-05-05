# University Management Core Service
This guide will walk you through the process of setting up the University Management Core Service Starter project. By following these steps, you will clone the project, install dependencies, and configure Prisma for database management. Let's get started!


## Installation Steps
### Follow these steps to clone and set up starter project:

1. `Clone the project:` Open your terminal or command prompt and run the following command to clone the project repository:

```bash
git clone https://github.com/Programming-Hero-Next-Level-Development/university-management-core-service-starter.git university-management-core-service
```

2. `Navigate into the project directory:` Use the cd command to navigate into the project directory:

```bash
cd university-management-core-service
```

3. `Install project dependencies:` Next, install the project dependencies by running the following command:

```bash
yarn install
```

4. Configure Prisma and the database connection:

- Add Prisma as a development dependency by running the following command:
```bash
yarn add prisma --save-dev
```

- Set up your Prisma project by creating the Prisma schema file using the following command:
```bash
npx prisma init
```

- Open the prisma/schema.prisma file and configure your database connection details.

```bash
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

- Create a .env file in the project root directory and set the DATABASE_URL environment variable. Replace the placeholders with your database connection details:
```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
```

5. Creating the database schema
6. Migrate the database schema: Use the following command to create and apply the initial database schema:

```bash
npx prisma migrate dev --name init
```
This command creates a new migration file based on your schema changes and applies it to your database.

6. `Install Prisma Client:` Install the Prisma Client library by running the following command:
```bash
yarn add @prisma/client
```

This command installs the Prisma Client, which provides an interface to interact with your database.

That's it! You have successfully set up the University Management Core Service Starter project. You can now start exploring and working with the codebase. Refer to the project documentation or README for further instructions on how to run and use the core service.

Happy coding!