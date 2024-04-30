
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3004;

//this stays here or will get error
app.get('/', (req, res) => {
    res.send('Welcome to the Library Management System!');
});



app.get('/api/openlibrary', async (req, res) => {
    try {
        // Call the Open Library API endpoint
        const response = await axios.get('https://openlibrary.org/search.json?q=harry+potter');

        // Extract relevant data from the response and format it
        const books = response.data.docs.map(book => ({
            title: book.title,
            author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
            isbn: book.isbn ? book.isbn[0] : 'ISBN Not Available',
            publication_year: book.publish_year ? parseInt(book.publish_year[0]) : null,
            description: book.description ? book.description.value : 'Description Not Available'
        }));

        // Send the extracted book data as response
        res.json(books);
    } catch (error) {
        console.error('Error fetching book data from Open Library API:', error);
        res.status(500).json({ error: 'Failed to fetch book data from Open Library API' });
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

