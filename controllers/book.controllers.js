const Book = require("../models/book.model");

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBookByID = async (req, res) => {
  try {
    const product = await Book.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBooksByGenre = async (req, res) => {
    try {
      const books = await Book.find({ "genre": req.params.genre });
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json(error);
    }
  };

const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getBooks,
  getBookByID,
  getBooksByGenre,
  createBook,
  updateBook,
  deleteBook,
};