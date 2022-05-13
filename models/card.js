const path = require("path");
const fs = require("fs");

const pathToDb = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "card.json"
);

class Card {
  static async add(book) {
    const card = await Card.fetch();
    const idx = card.books.findIndex((n) => n.id === book.id);
    const candidate = card.books[idx];

    if (candidate) {
      // book karopkada bor
      candidate.count++;
      card.books[idx] = candidate;
    } else {
      // book karopkaga qo'shish
      book.count = 1;
      card.books.push(book);
    }

    card.price += +book.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(pathToDb, JSON.stringify(card), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  static async remove(id) {
    const card = await Card.fetch();
    const idx = card.books.findIndex((c) => c.id === id);
    const book = card.books[idx];

    if (book.count === 1) {
      // delete
      card.books = card.books.filter((c) => c.id !== id);
    } else {
      // edit quantity
      card.books[idx].count--;
    }

    card.price -= book.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(pathToDb, JSON.stringify(card), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(card);
        }
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(pathToDb, "utf-8", (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      });
    });
  }
}
module.exports = Card;
