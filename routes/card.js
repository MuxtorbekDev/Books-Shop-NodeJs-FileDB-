const { Router } = require("express");
const Card = require("../models/card");
const Book = require("../models/book");
const router = Router();

router.post("/add", async (req, res) => {
  const book = await Book.getById(req.body.id);
  await Card.add(book);
  res.redirect("/card");
});

router.delete("/remove/:id", async (req, res) => {
  const card = await Card.remove(req.params.id);
  res.status(200).send(card);
});

router.get("/", async (req, res) => {
  const card = await Card.fetch();

  // Basket count
  let fullItemCount = 0;
  card.books.forEach((item) => {
    const bookCount = item.count;
    fullItemCount += +bookCount;
  });

  res.render("card", {
    title: `Basket`,
    isCard: true,
    books: card.books,
    price: card.price,
    fullItemCount,
  });
});

module.exports = router;
