const express = require("express");
const router = express.Router();
const Books = require("../models/models-books");

// Getting all books
router.get("/", async (request, response) => {
  try {
    const books = await Books.find();
    response.json(books);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// Getting one book
// adding a ":" in front means its a parameter
router.get("/:id", getBook, (request, response) => {
  // param from above ":id"
  // request.params.id
  response.json(response.book);
});

// Creating a book
router.post("/", async (request, response) => {
  const books = new Books({
    name: request.body.name,
    author: request.body.author,
    genre: request.body.genre,
    available: request.body.available,
  });

  try {
    const newBook = books.save(); // tries to persist to data base
    response.status(201).json(books);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// Updating one - .put would update everything so patch is used
router.patch("/:id", getBook, async (request, response) => {
  if (request.body.name != null) {
    response.book.name = request.body.name;
  }
  if (request.body.author != null) {
    response.book.author = request.body.author;
  }
  if (request.body.genre != null) {
    response.book.genre = request.body.genre;
  }
  if (request.body.available != null) {
    response.book.available = request.body.available;
  }

  try {
    const updatedBook = await response.book.save();
    response.json(updatedBook);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

// Deleting one
router.delete("/:id", getBook, async (request, response) => {
  try {
    await response.book.remove();
    response.json({ message: "Deleted Book" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

async function getBook(request, response, next) {
  // next moves onto next middleware or actual request itself
  let book;
  try {
    book = await Books.findById(request.params.id);
    if (book == null) {
      return response.status(404).json({ message: "Cannot find book" });
    }
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
  response.book = book;
  next();
}

module.exports = router;
