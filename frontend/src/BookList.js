import { useEffect, useState } from "react";
import API from "./api";

function BookList({ refresh, onEdit, setStats }) {

  const [books, setBooks] = useState([]);

  useEffect(() => {

    const load = async () => {
      const res = await API.get("/books");
      setBooks(res.data);

      // 🔥 CALCULATE STATS
      const totalBooks = res.data.length;
      const revenue = res.data.reduce(
        (sum, b) => sum + (Number(b.price) * Number(b.stock)),
        0
      );

      setStats({ totalBooks, revenue });
    };

    load();

  }, [refresh, setStats]); // ✅ NO WARNING

  const deleteBook = async (id) => {
    await API.delete(`/books/${id}`);

    // 🔁 reload after delete
    const res = await API.get("/books");
    setBooks(res.data);

    const totalBooks = res.data.length;
    const revenue = res.data.reduce(
      (sum, b) => sum + (Number(b.price) * Number(b.stock)),
      0
    );

    setStats({ totalBooks, revenue });
  };

  return (
    <div className="card shadow p-3">
      <h5 className="mb-3 text-primary">Book List</h5>

      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {books.map(b => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.category}</td>
              <td>₹{b.price}</td>
              <td>{b.stock}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onEdit(b)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteBook(b.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookList;