const express = require('express');
const axios = require('axios');
const app = express();
const port = 3004;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const db = require('./db/db-connection.js'); 


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
// Route for searching the entire Open Library database
app.get('/api/openlibrary/search', async (req, res) => {
  try {
      const { query } = req.query;
      if (!query) {
          return res.status(400).json({ error: 'Query parameter is required' });
      }

      // Call the Open Library API search endpoint
      const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
      
      // Extract relevant data from the response
      const searchResults = response.data.docs.map(book => ({
          title: book.title,
          author: book.author_name ? book.author_name.join(', ') : 'Unknown Author',
          isbn: book.isbn ? book.isbn[0] : 'ISBN Not Available',
          publication_year: book.publish_year ? parseInt(book.publish_year[0]) : null,
          description: book.description ? book.description.value : 'Description Not Available'
      }));

      res.json(searchResults);
  } catch (error) {
      console.error('Error searching Open Library:', error);
      res.status(500).json({ error: 'Failed to search Open Library' });
  }
});


// WORKING WITH CRUD FOR [BOOKS] -

// GET /books
app.get('/api/books', async (req, res) => {
  try {
    const {rows : books} = await db.query('SELECT * FROM books');
    console.log("In the server", books)
    res.send(books);

  } catch (error) {
    console.log(error);
  return res.status(400).json({error});
  }
});

// Route for checking out a book
app.post('/api/circulation/check-out', async (req, res) => {
  try {
      const { userId, bookId } = req.body;
      
      // Check if the book is available for checkout
      const checkAvailabilityQuery = `
          SELECT * FROM books 
          WHERE book_id = ${bookId} AND checked_out_by IS NULL`;
      const availabilityResult = await db.query(checkAvailabilityQuery);
      
      if (availabilityResult.rows.length === 0) {
          return res.status(400).json({ error: 'Book is not available for checkout' });
      }
      
      // Update the book status to checked out
      const updateQuery = `
          UPDATE books
          SET checked_out_by = ${userId}, checkout_date = CURRENT_DATE
          WHERE book_id = ${bookId}`;
      await db.query(updateQuery);
      
      res.json({ message: 'Book checked out successfully' });
  } catch (error) {
      console.error('Error checking out book:', error);
      res.status(500).json({ error: 'Failed to check out book' });
  }
});

// Route for returning a book
app.post('/api/circulation/return', async (req, res) => {
  try {
      const { userId, bookId } = req.body;
      
      // Check if the book is checked out by the user
      const checkOwnershipQuery = `
          SELECT * FROM books 
          WHERE book_id = ${bookId} AND checked_out_by = ${userId}`;
      const ownershipResult = await db.query(checkOwnershipQuery);
      
      if (ownershipResult.rows.length === 0) {
          return res.status(400).json({ error: 'Book is not checked out by the user' });
      }
      
      // Update the book status to checked in
      const updateQuery = `
          UPDATE books
          SET checked_out_by = NULL, return_date = CURRENT_DATE
          WHERE book_id = ${bookId}`;
      await db.query(updateQuery);
      
      res.json({ message: 'Book returned successfully' });
  } catch (error) {
      console.error('Error returning book:', error);
      res.status(500).json({ error: 'Failed to return book' });
  }
});

// Route for reserving a book
app.post('/api/circulation/reserve', async (req, res) => {
  try {
      const { userId, bookId } = req.body;
      
      // Check if the book is available for reservation
      const checkAvailabilityQuery = `
          SELECT * FROM books 
          WHERE book_id = ${bookId} AND reserved_by IS NULL`;
      const availabilityResult = await db.query(checkAvailabilityQuery);
      
      if (availabilityResult.rows.length === 0) {
          return res.status(400).json({ error: 'Book is not available for reservation' });
      }
      
      // Update the book status to reserved
      const updateQuery = `
          UPDATE books
          SET reserved_by = ${userId}, reservation_date = CURRENT_DATE
          WHERE book_id = ${bookId}`;
      await db.query(updateQuery);// Route for checking out a book
      app.post('/api/circulation/check-out', async (req, res) => {
          try {
              const { userId, bookId } = req.body;
              
              // Check if the book is available for checkout
              const checkAvailabilityQuery = `
                  SELECT * FROM books 
                  WHERE book_id = ${bookId} AND checked_out_by IS NULL`;
              const availabilityResult = await db.query(checkAvailabilityQuery);
              
              if (availabilityResult.rows.length === 0) {
                  return res.status(400).json({ error: 'Book is not available for checkout' });
              }
              
              // Update the book status to checked out
              const updateQuery = `
                  UPDATE books
                  SET checked_out_by = ${userId}, checkout_date = CURRENT_DATE
                  WHERE book_id = ${bookId}`;
              await db.query(updateQuery);
              
              res.json({ message: 'Book checked out successfully' });
          } catch (error) {
              console.error('Error checking out book:', error);
              res.status(500).json({ error: 'Failed to check out book' });
          }
      });
      
      // Route for checking in a book
      app.post('/api/circulation/check-in', async (req, res) => {
          try {
              const { userId, bookId } = req.body;
              
              // Check if the book is checked out by the user
              const checkOwnershipQuery = `
                  SELECT * FROM books 
                  WHERE book_id = ${bookId} AND checked_out_by = ${userId}`;
              const ownershipResult = await db.query(checkOwnershipQuery);
              
              if (ownershipResult.rows.length === 0) {
                  return res.status(400).json({ error: 'Book is not checked out by the user' });
              }
              
              // Update the book status to checked in
              const updateQuery = `
                  UPDATE books
                  SET checked_out_by = NULL, return_date = CURRENT_DATE
                  WHERE book_id = ${bookId}`;
              await db.query(updateQuery);
              
              res.json({ message: 'Book checked in successfully' });
          } catch (error) {
              console.error('Error checking in book:', error);
              res.status(500).json({ error: 'Failed to check in book' });
          }
      });
      
      // Route for reserving a book
      app.post('/api/circulation/reserve', async (req, res) => {
          try {
              const { userId, bookId } = req.body;
              
              // Check if the book is available for reservation
              const checkAvailabilityQuery = `
                  SELECT * FROM books 
                  WHERE book_id = ${bookId} AND reserved_by IS NULL`;
              const availabilityResult = await db.query(checkAvailabilityQuery);
              
              if (availabilityResult.rows.length === 0) {
                  return res.status(400).json({ error: 'Book is not available for reservation' });
              }
              
              // Update the book status to reserved
              const updateQuery = `
                  UPDATE books
                  SET reserved_by = ${userId}, reservation_date = CURRENT_DATE
                  WHERE book_id = ${bookId}`;
              await db.query(updateQuery);
              
              res.json({ message: 'Book reserved successfully' });
          } catch (error) {
              console.error('Error reserving book:', error);
              res.status(500).json({ error: 'Failed to reserve book' });
          }
      });
      
      
      res.json({ message: 'Book reserved successfully' });
  } catch (error) {
      console.error('Error reserving book:', error);
      res.status(500).json({ error: 'Failed to reserve book' });
  }
});


// WORKING WITH CRUD FOR [USERS] -

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

  // POST a new user (create a user)
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

