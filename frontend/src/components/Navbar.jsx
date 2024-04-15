import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { Button } from "@/components/ui/button";
import axios from "axios";

axios.defaults.withCredentials = true;

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const sendReq = async () => {
    const res = await axios.post("https://quizapp-1e1n.onrender.com/api/logout", null, {
      withCredentials: true,
    });
    if (res.status == 200) {
      return res;
    }
    throw new Error("Unable to Logout");
  };
  const handleLogout = () => {
    sendReq().then(() => dispatch(logout()));
  };

  return (
    <div>
      <nav className="flex justify-between border-2 p-2 border-gray-100 rounded-lg mt-2  bg-white ">
        <div className="flex ">
          <Link to="/" className="flex">
            <button
              variant="ghost"
              className="text-2xl text-purple-900 font-bold"
            >
              Nexon Quizs
            </button>
          </Link>
        </div>
        <div className="flex gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Link to="/" onClick={handleLogout}>
                <Button className="bg-[#1d1d1d]">Logout</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline">Signup</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
