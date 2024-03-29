import axios from "axios";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { Button } from "@/components/ui/button";

axios.defaults.withCredentials = true;

const dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState();

  const sendRequest = async () => {
    try {
      const res = await axios
        .get("http://localhost:5000/api/user", {
          withCredentials: true,
        })
        .catch((err) => console.log(err));
      if (res.status == 400) {
        dispatch(logout());
        navigate("/login");
      }
      const data = await res.data;
      return data;
    } catch (error) {
      console.log("error");
    }
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data));
  }, []);
  return (
    <div className="flex flex-col gap-5 mt-10">
      <span className="text-4xl font-bold">
        {user && (
          <span>{user.name[0].toUpperCase() + user.name.slice(1)}'s </span>
        )}
        Dashboard
      </span>
      <div className="flex justify-between border-b-2 border-black pb-2">
        <div className="text-xl">Your Quizes</div>
        <div>
          {user && (
            <Link to={`/create/${user._id}`}>
              <Button>
                Create a Quiz
                <Pencil1Icon className="ml-3" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default dashboard;
