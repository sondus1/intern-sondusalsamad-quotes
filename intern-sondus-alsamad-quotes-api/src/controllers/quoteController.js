let quotes = [
  { id: 1, text: "If you spend more on coffee than on IT security, you will be hacked. What’s more, you deserve to be hacked.", author: "Richard Clarke" },
  { id: 2, text: "Errors using inadequate data are much less than those using no data at all.", author: "Charles Babbage" },
  { id: 3, text: "The quietest people have the loudest minds.", author: "Stephen Hawking" }
];

let nextId = 4;

export const getAllQuotes = (req, res) => {
  const plainTextQuotes = quotes.map(q => `"${q.text}" — ${q.author}`).join('\n\n');
  res.status(200).header('Content-Type', 'text/plain').send(plainTextQuotes);
};

export const getQuoteById = (req, res) => {
  const id = parseInt(req.params.id);
  const quote = quotes.find(q => q.id === id);

  if (!quote) {
    return res.status(404).json({ error: `Quote with ID ${id} not found.` });
  }

  res.status(200).header('Content-Type', 'text/plain').send(`"${quote.text}" — ${quote.author}`);
};

export const createQuote = (req, res) => {
  const { text, author } = req.body;

  if (!text || !author) {
    return res.status(400).json({ error: "Both 'text' and 'author' fields are required." });
  }

  const newQuote = {
    id: nextId++,
    text,
    author
  };

  quotes.push(newQuote);
  res.status(201).json(newQuote);
};

export const updateQuote = (req, res) => {
  const id = parseInt(req.params.id);
  const { text, author } = req.body;

  if (!text || !author) {
    return res.status(400).json({ error: "Both 'text' and 'author' fields are required for updates." });
  }

  const quoteIndex = quotes.findIndex(q => q.id === id);

  if (quoteIndex === -1) {
    return res.status(404).json({ error: `Quote with ID ${id} not found.` });
  }

  quotes[quoteIndex] = { id, text, author };
  res.status(200).json(quotes[quoteIndex]);
};

export const deleteQuote = (req, res) => {
  const id = parseInt(req.params.id);
  const quoteIndex = quotes.findIndex(q => q.id === id);

  if (quoteIndex === -1) {
    return res.status(404).json({ error: `Quote with ID ${id} not found.` });
  }

  quotes.splice(quoteIndex, 1);
  res.status(200).json({ message: `Quote with ID ${id} successfully deleted.` });
};