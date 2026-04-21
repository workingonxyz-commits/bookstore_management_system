import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement);

export default function Dashboard() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/books")
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  const categoryData = {};

  books.forEach(b => {
    categoryData[b.category] = (categoryData[b.category] || 0) + 1;
  });

 const barData = {
  labels: Object.keys(categoryData),
  datasets: [
    {
      label: "Books per Category",
      data: Object.values(categoryData),
      backgroundColor: [
        "#4e73df",
        "#1cc88a",
        "#36b9cc",
        "#f6c23e",
        "#e74a3b",
        "#858796"
      ]
    }
  ]
};


  const pieData = {
  labels: Object.keys(categoryData),
  datasets: [
    {
      data: Object.values(categoryData),
      backgroundColor: [
        "#4e73df",
        "#1cc88a",
        "#36b9cc",
        "#f6c23e",
        "#e74a3b",
        "#858796"
      ],
      borderColor: "#ffffff",
      borderWidth: 2
    }
  ]
};

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      <div style={{ width: "400px" }}>
        <Bar data={barData} />
      </div>

      <div style={{ width: "300px", marginTop: "20px" }}>
        <Pie data={pieData} />
      </div>
    </div>
  );
}