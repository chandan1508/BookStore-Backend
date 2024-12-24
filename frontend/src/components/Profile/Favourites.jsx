import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "https://bookstore-5ki7.onrender.com/api/v1/get-favourite-books",
        { headers }
      );
      setFavouriteBooks(response.data.data);
    };
    fetch();
  }, [favouriteBooks]);

  return (
    <>
      {favouriteBooks && favouriteBooks.length === 0 && (
        <div className="text-5xl h-[100%] font-semibold text-zinc-500 flex items-center justify-center w-full">
          No Favourite Books
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {favouriteBooks &&
          favouriteBooks.map((items, i) => (
            <div key={i}>
              <BookCard data={items} favourite={true} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favourites;
