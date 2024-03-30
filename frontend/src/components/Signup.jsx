import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const sendReq = async () => {
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };
      const res = await axios
        .post("http://localhost:5000/api/signup", userData)
        .catch((e) => console.log(e));
      const result = await res.data;
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await sendReq();
    if (user) {
      dispatch(login());
      navigate("/dashboard");
    }
  };
  return (
    <div className="mt-7 bg-white p-7 rounded">
      <div className="w-1/3 m-auto ">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <label htmlFor="name">
            Name
            <Input
              name="name"
              type="text"
              className="outline mt-3"
              value={data.name}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your name"
            />
          </label>
          <label htmlFor="email">
            Email
            <Input
              name="email"
              type="email"
              className="outline mt-3"
              value={data.email}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your email"
            />
          </label>
          <label htmlFor="password">
            Password
            <Input
              name="password"
              type="password"
              className="outline mt-3"
              value={data.password}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your password"
            />
          </label>
          <Button className="border-2" type="submit">
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
