import { useState, useEffect } from "react";
import API from "./api";

function BookForm({ reload, editData, clearEdit }) {

  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    stock: ""
  });

  useEffect(() => {
    if (editData) setBook(editData);
  }, [editData]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (book.id) {
      await API.put(`/books/${book.id}`, book);
    } else {
      await API.post("/books", book);
    }

    setBook({ title: "", author: "", category: "", price: "", stock: "" });
    clearEdit();
    reload();
  };

  return (
  <div className="card shadow p-3">
    <h5 className="mb-3 text-primary">
      {book.id ? "Edit Book" : "Add Book"}
    </h5>

    <input className="form-control mb-2" name="title" placeholder="Title" value={book.title} onChange={handleChange}/>
    <input className="form-control mb-2" name="author" placeholder="Author" value={book.author} onChange={handleChange}/>
    <input className="form-control mb-2" name="category" placeholder="Category" value={book.category} onChange={handleChange}/>
    <input className="form-control mb-2" name="price" placeholder="Price" value={book.price} onChange={handleChange}/>
    <input className="form-control mb-3" name="stock" placeholder="Stock" value={book.stock} onChange={handleChange}/>

    <button className="btn btn-success w-100" onClick={submit}>
      {book.id ? "Update Book" : "Add Book"}
    </button>
  </div>
);
}

export default BookForm;