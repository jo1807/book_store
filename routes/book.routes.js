const express = require("express");

const {
  getBooks,
  getBookByID,
  getBooksByGenre,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/book.controllers");

const router = express.Router();

/* GET */
router.get("/books", getBooks);
router.get("/books/:id", getBookByID);
router.get("/books/genre/:genre", getBooksByGenre);

/* POST */
router.post("/books", createBook);

/* PATCH */
router.patch("/books/:id", updateBook);

/* PATCH */
router.delete("/books/:id", deleteBook);

module.exports = router;