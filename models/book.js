const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

class Book {
  constructor(title, price, img, descr) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.descr = descr;
    this.id = uuidv4();
  }

  toJSON() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      descr: this.descr,
      id: this.id,
    };
  }

  static async update(book) {
    const books = await Book.getAll();
    const idx = books.findIndex((n) => n.id === book.id);
    books[idx] = book;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "books.json"),
        JSON.stringify(books),
        (err) => {
          if (err) {
            throw err;
          } else {
            resolve();
          }
        }
      );
    });
  }

  async save() {
    const books = await Book.getAll();
    books.push(this.toJSON());
    // console.log("Notebooks", notebooks);

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "books.json"),
        JSON.stringify(books),
        (err) => {
          if (err) {
            throw err;
          } else {
            resolve();
          }
        }
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "books.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            throw err;
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }

  static async getById(id) {
    const books = await Book.getAll();
    return books.find((n) => n.id === id);
  }
}

module.exports = Book;
