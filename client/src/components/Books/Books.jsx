import React, { useState, useEffect } from 'react';
import './Books.css';

const Books = () => {
    const [books, setBooks] = useState([]);
    
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch("/api/getBooks");
                const data = await response.json();
                const filteredBooks = data.filter(book => book.count > 0);
                setBooks(filteredBooks);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div id='books'>
            <span id="heading">AVAILABLE BOOKS TO BORROW</span>
            <table id="results" className="table text-center table-hover">
                <thead id="header">
                    <tr>
                        <th scope="col">Book Name</th>
                        <th scope="col">Author</th>
                        <th scope="col">Title</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book.id}>
                            <td>{book.name.toUpperCase()}</td>
                            <td>{book.author}</td>
                            <td>{book.title}</td>
                          
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Books;
