DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_books;

-- AUTHORS ----------------------------------------

CREATE TABLE authors (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    biography TEXT
);  

INSERT INTO authors (name, biography)
VALUES ('John Smith', 'John Smith is a renowned author with several best-selling novels.'),
       ('Jane Doe', 'Jane Doe is a prolific writer known for her captivating storytelling.'),
       ('Robert Johnson', 'Robert Johnson is an award-winning author with a passion for fantasy fiction.');

-- BOOKS ----------------------------------------

CREATE TABLE books (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author_id INT REFERENCES authors(author_id),
    isbn VARCHAR(20),
    publication_year INT,
    genre VARCHAR(100),
    description TEXT
);

INSERT INTO books (title, author_id, isbn, publication_year, genre, description)
VALUES ('The Secret Garden', 1, '9780142437304', 1911, 'Children''s Literature', 'Classic children''s novel about a young girl who discovers a hidden garden.'),
       ('To Kill a Mockingbird', 2, '9780061120084', 1960, 'Fiction', 'Seminal novel that addresses themes of racism and social injustice in the American South.'),
       ('The Hobbit', 3, '9780547928227', 1937, 'Fantasy', 'A timeless tale of adventure, featuring Bilbo Baggins and his journey to reclaim treasure guarded by a dragon.');

-- USERS ----------------------------------------

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO users (username, password, email)
VALUES ('john_doe', 'password123', 'john@example.com'),
       ('jane_smith', 'securepassword', 'jane@example.com'),
       ('bob_jones', 'qwerty', 'bob@example.com');

-- USER_BOOKS ----------------------------------------

CREATE TABLE user_books (
    user_id INT REFERENCES users(user_id),
    book_id INT REFERENCES books(book_id),
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO user_books (user_id, book_id)
VALUES (1, 1),
       (2, 2),
       (3, 3);

SELECT * FROM authors;
SELECT * FROM books;
SELECT * FROM users;
SELECT * FROM user_books;
