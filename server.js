// Our server Code
// This is hooked up amnd listening
// Its also set up to accetp JSON

require("dotenv").config();

const express = require("express"); // Pulls in express library
const app = express(); // We can use to configure our server
const PORT = 3000;

const mongoose = require("mongoose");
// Fist param is the database connection. We get from .env file so we can swap out the url for dev and prod
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
// Events to run when our database is connected
db.on("error", (error) => console.error(error));

//only runs once
db.once("open", () => console.log("connected to database"));

// This allows us to use any middleware we want. This is code that runs when your server gets arequest but before it gets to your routes
// This middleware allows our server to accept JSON as a request body
app.use(express.json());

// ROUTES:
const booksRoute = require("./routes/books");
app.use("/books", booksRoute);
// http://localhost:3000/books
// first parameter is the server, second is callback that runs when the server is started

app.listen(PORT, () =>
  console.log(`Server Has started on http://localhost:${PORT}/`)
);
