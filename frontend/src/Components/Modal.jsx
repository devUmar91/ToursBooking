import axios from 'axios';
import React, { useState } from 'react';

export const BookingModal = ({ isOpen, onClose, tourId, people, seats ,total}) => {
  if (!isOpen) return null;

  // State for each input field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  // Function to handle booking confirmation
  const confirmBooking = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    // Check if requested seats exceed available seats
    if (people > seats) {
      setError("Not enough seats available for your booking.");
      return;
    }

    try {
      await axios.post('/api/tour/bookings', {
        tourId,
        name,
        email,
        phone,
        people,
        total
      });
      alert('Booking confirmed!');
    window.location.reload();
      onClose(); // Close the modal after booking is confirmed
    } catch (error) {
      console.error("Booking failed:", error);
      setError('There was an issue with your booking. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 focus:outline-none">
          ✕
        </button>
        <h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">Book Your Tour</h2>
        
        <form onSubmit={confirmBooking} className="space-y-4">
          {error && <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</div>}
          
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Phone</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};
