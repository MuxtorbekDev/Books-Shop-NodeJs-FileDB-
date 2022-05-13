const { Router } = require("express");
const Card = require("../models/card");
const Book = require("../models/Book");
const router = Router();

router.get("/", async (req, res) => {
  const books = await Book.getAll();

  // Basket count
  const card = await Card.fetch();
  let fullItemCount = 0;
  card.books.forEach((item) => {
    const bookCount = item.count;
    fullItemCount += +bookCount;
  });

  res.render("books", {
    title: "Book Page",
    isBooks: true,
    books,
    fullItemCount,
  });
});

router.get("/:id/edit", async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  const { id } = req.params;
  const book = await Book.getById(id);
  res.render("book-edit", { title: `Edit ${book.title}`, book });
});

router.post("/edit", async (req, res) => {
  await Book.update(req.body);
  res.redirect("/books");
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const book = await Book.getById(id);

  res.render("book", {
    layout: "detail",
    title: `${book.title} Book`,
    book,
  });
});

module.exports = router;
