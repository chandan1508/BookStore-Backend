import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { FaUserLarge } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState();
  const [options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "Order placed" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://bookstore-5ki7.onrender.com/api/v1/get-all-orders`,
        { headers }
      );
      setAllOrders(response.data.data);
     
    };
    fetch();
  }, [options, Values]);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = allOrders[i]._id;
    const response = await axios.put(
      `https://bookstore-5ki7.onrender.com/api/v1/update-status/${id}`,
      Values,
      { headers }
    );
    
    alert(response.data.message);
  };
  
  // allOrders && allOrders.splice(allOrders.length - 1, 1);

  return (
    <>
      {!allOrders && (
        <div className="h-[100%] flex items-center justify-center">
          {" "}
          <Loader />{" "}
        </div>
      )}

      {allOrders && allOrders.length === 0 && (
        <div className="text-5xl h-screen font-semibold text-zinc-500 flex items-center justify-center w-full">
          No Orders
        </div>
      )}

      {allOrders && allOrders.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1 className="">Books</h1>
            </div>
            <div className="w-[45%]">
              <h1 className="">Description</h1>
            </div>
            <div className="w-[9%]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[16%]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-[10%] md:w-[5%] ">
              <h1 className="">
                <FaUserLarge />
              </h1>
            </div>
          </div>
          {allOrders.map((items, i) => (
            <div
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900"
              key={i}
            >
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[40%] md:w-[22%]">
                {items.book ? (
                  <Link
                    to={`/view-book-details/${items.book._id}`}
                    className="hover:text-blue-300"
                  >
                    {items.book.title}
                  </Link>
                ) : (
                  <span className="text-red-500">No Book Details</span>
                )}
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                <h1 className="">{items.book?.desc?.slice(0, 50)} ...</h1>
              </div>
              <div className="w-[17%] md:w-[9%]">
                <h1 className="">{items.book?.price || "N/A"}</h1>
              </div>
              <div className="w-[30%] md:w-[16%]">
                <h1 className="font-semibold">
                  <button
                    className="hover:scale-105 transition-all duration-300"
                    onClick={() => setOptions(i)}
                  >
                    {items.status === "Order placed" ? (
                      <div className="text-yellow-500">{items.status}</div>
                    ) : items.status === "Canceled" ? (
                      <div className="text-red-500">{items.status}</div>
                    ) : (
                      <div className="text-green-500">{items.status}</div>
                    )}
                  </button>

                  <div
                    className={`${
                      options === i ? "block" : "hidden"
                    } flex mt-4`}
                  >
                    <select
                      name="status"
                      className="bg-gray-800"
                      id=""
                      onChange={change}
                      value={Values.status}
                    >
                      {[
                        "Order placed",
                        "Out for delivery",
                        "Delivered",
                        "Canceled",
                      ].map((items, i) => (
                        <option value={items} key={i}>
                          {items}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => {
                        setOptions(-1);
                        submitChanges(i);
                      }}
                    >
                      <FaCheck />
                    </button>
                  </div>
                </h1>
              </div>
              <div className="w-[10%] md:w-[5%]">
                <button className="text-xl hover:text-orange-500"
                onClick={() => {
                  setUserDiv("fixed");
                  setUserDivData(items.user);
                }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {userDivData && (
        <SeeUserData 
         userDivData={userDivData}
         userDiv={userDiv}
         setUserDiv={setUserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
