import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://bookstore-5ki7.onrender.com/api/v1/get-book-by-id/${id}`
      );
      
      setData(response.data.data);
    };
    fetch();
  }, []);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    const response = await axios.put(
      "https://bookstore-5ki7.onrender.com/api/v1/add-book-to-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const handleCart = async () => {
    const response = await axios.put(
      "https://bookstore-5ki7.onrender.com/api/v1/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.message);
  }

  const deleteBook = async () => {
    const response = await axios.delete(
      "https://bookstore-5ki7.onrender.com/api/v1/delete-book",
      { headers }
    );
    alert(response.data.message);
    navigate("/all-books")
  }

  return (
    <>
      {Data && (
        <div className="px-4 md:px-12 py-8 bg-zinc-900 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-3/6">
            {" "}
            <div className="flex flex-col lg:flex-row justify-around bg-zinc-800 rounded p-12">
              {" "}
              <img
                src={Data.url}
                alt="/"
                className="h-[50vh] md:h-[60vh] lg:h-[70vh]"
              />
              {isLoggedIn === true && role === "user" && (
                // <div className="flex flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0">
                //   <button className="bg-white rounded lg:rounded-full text-3xl p-3 text-red-500 flex items-center justify-center">
                //     <FaHeart />{" "}
                //     <span className="ms-4 block lg:hidden">Favourites</span>
                //   </button>

                //   <button className="text-white rounded lg:rounded-full text-3xl p-3 mt-0 lg:mt-8 bg-blue-500 flex items-center justify-center">
                //     <FaShoppingCart />{" "} <span className="ms-4 block lg:hidden">Add to cart</span>
                //   </button>
                // </div>
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0 lg:ms-4 lg:gap-1 sm:gap-4">
                  <button
                    className="bg-white rounded-full text-2xl p-3 text-red-500 flex items-center justify-center mt-4 lg:mt-0 w-full"
                    onClick={handleFavourite}
                  >
                    <FaHeart />
                    <span className="ms-4 block lg:hidden">Favourites</span>
                  </button>

                  <button className="text-white rounded-full text-2xl p-3 mt-4 bg-blue-500 flex items-center justify-center w-full"
                   onClick={handleCart}
                  >
                    <FaShoppingCart />
                    <span className="ms-4 block lg:hidden">Add to cart</span>
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex flex-col md:flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0 lg:ms-4 lg:gap-1 sm:gap-4">
                  <Link to={`/updateBook/${id}`} className="bg-white rounded-full text-2xl p-3 flex items-center justify-center mt-4 lg:mt-0 w-full">
                    <FaEdit />
                    <span className="ms-4 block lg:hidden">Edit</span>
                  </Link>

                  <button className="text-red-500 rounded-full text-2xl p-3 mt-4 bg-white flex items-center justify-center w-full"
                   onClick={deleteBook}
                  >
                    <MdOutlineDelete />
                    <span className="ms-4 block lg:hidden">Delete Book</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full lg:w-3/6">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {Data.title}
            </h1>
            <p className="text-zinc-400 mt-1">by {Data.author}</p>
            <p className="text-zinc-500 mt-4">{Data.desc}</p>
            <p className="flex mt-4 items-center justify-start text-zinc-400">
              <GrLanguage className="me-3" /> {Data.language}
            </p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
              Price : ₹ {Data.price}{" "}
            </p>
          </div>
        </div>
      )}
      {!Data && (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
