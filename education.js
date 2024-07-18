const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let bookList = [];
let nextBookId = 1;

app.get('/books', (req, res) => {
  res.json(bookList);
});

app.get('/books/:id', (req, res) => {
  const book = bookList.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
});

app.post('/books', (req, res) => {
  const { title, author, year } = req.body;
  if (!title || !author || !year) return res.status(400).send('Missing title, author or year');

  const newBook = { id: nextBookId++, title, author, year };
  bookList.push(newBook);
  res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
  const book = bookList.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send('Book not found');

  const { title, author, year } = req.body;
  if (!title || !author || !year) return res.status(400).send('Missing title, author or year');

  book.title = title;
  book.author = author;
  book.year = year;
  res.json(book);
});

app.delete('/books/:id', (req, res) => {
  const bookIndex = bookList.findIndex(b => b.id === parseInt(req.params.id));
  if (bookIndex === -1) return res.status(404).send('Book not found');

  bookList.splice(bookIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
