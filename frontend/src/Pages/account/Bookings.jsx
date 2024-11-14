import { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

function Bookings() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get('/api/tour/allBooks');
                setBookings(res.data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 mt-[50px] p-6">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">All Bookings</h1>
            <div className='flex justify-center items-center'>

            <Link to={'/account/profile'} className='flex justify-center items-center bg-blue-600 text-white p-2 rounded w-[200px] mb-[20px]  '>Back to profile</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookings.map((booking) => (
                    <div
                        className="bg-white rounded-lg shadow-lg p-6 flex flex-col space-y-4"
                        key={booking._id}
                    >
                        <h2 className="text-2xl font-semibold text-gray-800">{booking.name}</h2>
                        <p className="text-gray-600">
                            <span className="font-bold">Email:</span> {booking.email}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-bold">Phone:</span>{" "}
                            <a
                                href={`https://wa.me/${booking.phone}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-500 underline"
                            >
                                {booking.phone}
                            </a>
                        </p>
                        <p className="text-gray-600">
                            <span className="font-bold">People:</span> {booking.people}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-bold">Bill:</span> {booking.bill}
                        </p>
                        <p className="text-gray-400 text-sm">
                            <span className="font-bold">Created At:</span>{" "}
                            {new Date(booking.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Bookings;
