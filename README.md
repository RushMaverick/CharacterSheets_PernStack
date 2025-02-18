# Tabletop RPG Character Sheet Creator

This is a demo of a Character Sheet Creator made using the PERN stack.

In this demo, users can create sheets for their characters by inputting text into the fields and then saving them. Their created sheet will appear in the list view.

By clicking the existing sheets, the user can edit the sheet and modify their information.

Very simple and clean.

## Deployment

To deploy this project you need Postgresql, Node.js and npm installed.

Once that is done, navigate to the project folder and run

```bash
  npm run install:all
```

to install any and all required dependencies.

After this you will need to run

```bash
  npm run build:all
```

This will compile the client and serverside so they are ready for action!

#### IMPORTANT SERVER INFORMATION

The server will require you to create a database and connecting to said database.
Provided with the project is a database.sql (root/server/database.sql) file with commands that you can run in the Postgresql environment to initiate the database. A great tutorial on how to go about [is found here](https://neon.tech/postgresql/postgresql-getting-started/install-postgresql).

#### END OF IMPORTANT SERVER INFORMATION

Once you have done that, proceed by creating an .env file in (root/server)

```bash
    # Database Configuration
    PG_USER=[Your Postgres Superuser username] <-- input your own.
    PG_PASSWORD=[Your Postgres Superuser password] <-- input your own.
    PG_HOST=localhost
    PG_DATABASE=pernsheets
```

All good? Great! I hope you have your database set up and you are feeling comfortable.

Now proceed by running the following command in root

```bash
  npm run dev
```

This will start both the server- and clientside. Happy character creation!

## Tools Used

Disclaimer: I looked into libraries like Zustand, but ran into quite a debacle refactoring the code. Will take another look!

- PostgreSQL
- Express
- React
- Node.js (npm)

One branch, one dream.
Push straight to main.
