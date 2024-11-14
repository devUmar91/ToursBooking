import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { useContext, useState } from "react";
import { MdClose } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { UserContext } from "../../Context/UserContext";
import { navbarOptions, UserDropDownOptions } from "../../Data/NavbarData";
import axios from "axios";

const Navbar = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const { user } = useContext(UserContext);

  const toggleMenu = () => setMenuOpened(!menuOpened);

  const handleLogout = async () => {
    await axios.get("/api/auth/logout");
    window.location.replace('/');
  };

  return (
    <nav className="flex justify-between items-center bg-gray-900 text-white shadow-md fixed w-full top-0 py-3 px-6 z-30">
      <Link to="/" className="text-2xl font-bold">
        RoyalTours
      </Link>

      <ul className="hidden lg:flex space-x-6">
        {navbarOptions?.map((item) => (
          <Link key={item.link} to={item.link} className="relative group">
            <span className="flex items-center space-x-2">
              {item.img}
              <span>{item.label}</span>
            </span>
            <span className="block w-0 h-1 bg-white group-hover:w-full transition-all duration-300 absolute bottom-0 left-0"></span>
          </Link>
        ))}
      </ul>

      {!user ? (
        <Link to="/sign-in" className="hidden lg:flex items-center space-x-2 bg-gray-800 py-2 px-4 rounded-full hover:bg-gray-700">
          <FaUser />
          <span>Sign In</span>
        </Link>
      ) : (
        <div className="hidden lg:flex items-center space-x-4">
          <Link to="/account/profile" className="flex items-center space-x-2">
            <img src={user.profile} alt="Profile" className="w-8 h-8 rounded-full" />
            <span>{user.username}</span>
          </Link>
          <button onClick={handleLogout} className="bg-gray-800 py-2 px-4 rounded-full hover:bg-gray-700">
            Logout
          </button>
        </div>
      )}

      {!menuOpened ? (
        <RxHamburgerMenu onClick={toggleMenu} className="lg:hidden cursor-pointer" />
      ) : (
        <MdClose onClick={toggleMenu} className="lg:hidden cursor-pointer" />
      )}

      <ul
        className={`${
          menuOpened ? "flex" : "hidden"
        } lg:hidden flex-col items-center space-y-4 bg-gray-800 text-white fixed top-14 right-0 w-full p-6 shadow-lg`}
      >
        {user ? (
          UserDropDownOptions?.map((item) => (
            <Link key={item.link} to={item.link} className="flex items-center space-x-2">
              {item.img}
              <span>{item.label}</span>
            </Link>
          ))
        ) : (
          navbarOptions?.map((item) => (
            <Link key={item.link} to={item.link} className="flex items-center space-x-2">
              {item.img}
              <span>{item.label}</span>
            </Link>
          ))
        )}
        <button
          onClick={user ? handleLogout : () => window.location.href = "/sign-in"}
          className="flex items-center space-x-2 bg-gray-900 py-2 px-4 rounded-full hover:bg-gray-700"
        >
          <FaUser />
          <span>{user ? "Logout" : "Sign In"}</span>
        </button>
      </ul>
    </nav>
  );
};

export default Navbar;
