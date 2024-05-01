const express = require('express');
const axios = require('axios');
const app = express();
const port = 3004;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const db = require('./DB/db-connection.js'); 


// Configuring cors middleware
//app.use(cors());
// Configuring cors middleware to allow requests only from 'http://localhost:3000'
app.use(cors({
    origin: 'http://localhost:3004'
  }));
  


  

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());






//this stays here or will get error
app.get('/', (req, res) => {
    res.send('Welcome to the Library Management System!');
});


// OPEN API GET  request
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

// WORKING WITH TABLES

// GET all users  real connection with DB users
app.get('/api/users', async (req, res) => {
    try {
      const {rows : users} = await db.query('SELECT * FROM users');
      console.log("In the server", users)
      res.send(users);

    } catch (error) {
      console.log(error);
    return res.status(400).json({error});
    }
  });



  
  // POST a new user
  app.post('/api/users', async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const newUser = await db.query(
        'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
        [username, password, email]
      );
      res.status(201).json(newUser.rows[0]);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  });
  
  // PUT (Update) an existing user
  app.put('/api/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { username, password, email } = req.body;
      const updatedUser = await db.query(
        'UPDATE users SET username = $1, password = $2, email = $3 WHERE user_id = $4 RETURNING *',
        [username, password, email, id]
      );
      if (updatedUser.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(updatedUser.rows[0]);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  });
  
  // DELETE a user
  app.delete('/api/users/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await db.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [id]);
      if (deletedUser.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  });
  


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

