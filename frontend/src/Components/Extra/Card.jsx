import React from 'react';
import { Link } from "react-router-dom";

const Card = ({ tour }) => {
  return (
    <div className="block relative mt-10 w-[90%] h-[480px] pb-1 shadow-lg hover:cursor-pointer overflow-hidden rounded-lg bg-gray-800 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.7),0_10px_20px_-2px_rgba(0,0,0,0.6)] hover:scale-105 transition transform ease-in">
      <div key={tour.id}>
        <div className='bg-gray-900'>
          <img
            className="rounded-t-lg w-full h-72 object-cover"
            src={tour?.gallery[0] || "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"}
            alt=""
          />
        </div>
        <div className="content p-4">
          <div className="pt-2 h-16">
            <h5 className="mb-2 text-xl font-bold font-poppins line-clamp-2 text-white">
              {tour.tourname}
            </h5>
          </div>
          <p className="text-base font-light text-gray-400 font-poppins text-sm">
            Location: <span className="text-lg"> {tour.location} </span>
          </p>
          <hr className="border-gray-600" />
          <div className="pt-2 flex justify-between items-center font-poppins">
            <p className="text-sm text-gray-400">
              <span className="font-semibold text-[16px] text-green-400">PKR {tour.fee} / person</span>
            </p>
            <p className="text-sm gap-2 font-thin text-gray-400 flex items-center font-poppins">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Days: {tour.duration.days}, {tour.duration.nights ? 'Nights: ' + tour.duration.nights : ''}
            </p>
          </div>
        </div>
        <Link to={`/tour/${encodeURIComponent(tour._id)}`}>
          <button className='text-sm  shadow-lg hover:opacity-90 bg-gray-700 rounded-full font-normal text-white p-2 ml-2 font-poppins'>
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
