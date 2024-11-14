import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../Components/Extra/Card";

const TourPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    type: 'all',
    days: 'nolimit',
    budget: 'nolimit'
  });

  useEffect(() => {
    const param = new URLSearchParams(window.location.search);
    const typefromURL = param.get("type");
    const budgetUrl = param.get("budget");
    const daysUrl = param.get("days");

    if (typefromURL || budgetUrl || daysUrl) {
      setSidebarData({
        type: typefromURL || 'all',
        budget: budgetUrl || 'nolimit',
        days: daysUrl || 'nolimit',
      });
    }

    const searchQuery = param.toString();
    console.log(searchQuery);

    const fetchListing = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`api/tour/alltours?${searchQuery}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    fetchListing();
  }, [window.location.search]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData({ ...sidebarData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('type', sidebarData.type);
    urlParams.set('days', sidebarData.days);
    urlParams.set('budget', sidebarData.budget);
    const searchQuery = urlParams.toString();
    navigate(`/tours?${searchQuery}`);
  };

  return (
    <div className="mt-11 flex flex-col font-medium bg-gray-900 text-white min-h-screen">
      <div className="p-4 lg:p-8 border-b-2 border-gray-800">
        <form onSubmit={handleSubmit} className='flex flex-wrap gap-4 items-center justify-center'>
          <div className="flex flex-col gap-2">
            <label className="text-gray-400">Type:</label>
            <select id='type' className='border bg-gray-800 text-white p-2 rounded-lg' onChange={handleChange} value={sidebarData.type}>
              <option value='all'>All</option>
              <option value='friends'>Friends</option>
              <option value='family'>Family</option>
              <option value='couple'>Couple</option>
              <option value='culture'>Culture</option>
              <option value='open'>Anyone</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400">Budget:</label>
            <select id='budget' className='border bg-gray-800 text-white p-2 rounded-lg' onChange={handleChange} value={sidebarData.budget}>
              <option value='nolimit'>No Limit</option>
              <option value='50000'>PKR 50,000</option>
              <option value='25000'>PKR 25,000</option>
              <option value='15000'>PKR 15,000</option>
              <option value='10000'>PKR 10,000</option>
              <option value='5000'>PKR 5,000</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400">Days Limit:</label>
            <select id='days' className='border bg-gray-800 text-white p-2 rounded-lg' onChange={handleChange} value={sidebarData.days}>
              <option value='nolimit'>No Limit</option>
              <option value={1}>1 Day Trip</option>
              <option value={3}>3 Days or less</option>
              <option value={7}>7 Days or less</option>
            </select>
          </div>

          <button className='bg-green-500 hover:bg-green-400 text-white p-3 rounded-lg w-full md:w-auto'>
            Filter
          </button>
        </form>
      </div>

      <div className='font-poppins text-xl text-center tracking-[1px] text-red-500 mt-4'>
        {data.length === 1 ? `${data.length} Tour Result` : `${data.length} Tour Results`}
      </div>

      <div className="flex-1 p-4 lg:p-8">
        {loading && (
          <h1 className='font-semibold text-3xl text-center mt-10 font-poppins'>Loading...</h1>
        )}

        {!loading && data.length === 0 && (
          <h1 className='font-semibold text-3xl text-center mt-10 font-poppins'>No Results Found</h1>
        )}

        {!loading && data.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <Card key={item.id} tour={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TourPage;
