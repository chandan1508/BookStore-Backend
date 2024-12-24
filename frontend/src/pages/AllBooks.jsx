import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/BookCard/BookCard";
import Loader from "../components/Loader/Loader";
const AllBooks = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookstore-5ki7.onrender.com/api/v1/get-all-books"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 h-screen  px-12 py-8">
      {" "}
      <h4 className="text-3xl text-yellow-100">All books</h4>
      {!Data && (
        <div className="flex items-center h-screen justify-center my-8">
          <Loader/>{" "}
        </div>
      )}
      <div className="my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {Data &&
          Data.map((items, i) => (
            <div key={i}>
              <BookCard data={items} />{" "}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBooks;

