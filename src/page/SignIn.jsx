import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import bcrypt from "bcryptjs";
function Signin() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [formSignIn, setFormSignIn] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    let apiUrl = "https://68371fab664e72d28e43a55c.mockapi.io/users";
    axios.get(apiUrl).then((res) => setUsers(res.data));
  }, []);

  console.log(users, "users");
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormSignIn({ ...formSignIn, [name]: value });
  };
  const handleSignIn = async () => {
    let user = users.find((user) => user.username == formSignIn.username);
    if (user) {
      let password = await bcrypt.compare(formSignIn.password, user.password);
      if (formSignIn.username == user.username && password) {
        toast.success(
          "Sign In Successfully We Will Redirect You To Hone Page ..."
        );
        localStorage.setItem(
          "UserName-Account",
          JSON.stringify({
            id: user.id,
            username: user.username,
          })
        );

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error("Email Or Password Invalid");
        return;
      }
    } else {
      toast.error("Email Or Password Invalid");
      return;
    }
  };
  return (
    <section className="bg-[#1E1f20] flex  justify-center items-center h-screen w-full">
      <div className="signin-content bg-[#0E0E0E] text-white w-[80%] h-fit p-10 rounded-xl">
        <div className="flex flex-col lg:flex-row gap-5 items-center justify-between">
          <div className="text flex flex-col gap-5">
            <div className="img">
              <svg
                xmlns="https://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 40 48"
                aria-hidden="true"
                jsname="jjf7Ff"
              >
                <path
                  fill="#4285F4"
                  d="M39.2 24.45c0-1.55-.16-3.04-.43-4.45H20v8h10.73c-.45 2.53-1.86 4.68-4 6.11v5.05h6.5c3.78-3.48 5.97-8.62 5.97-14.71z"
                ></path>
                <path
                  fill="#34A853"
                  d="M20 44c5.4 0 9.92-1.79 13.24-4.84l-6.5-5.05C24.95 35.3 22.67 36 20 36c-5.19 0-9.59-3.51-11.15-8.23h-6.7v5.2C5.43 39.51 12.18 44 20 44z"
                ></path>
                <path
                  fill="#FABB05"
                  d="M8.85 27.77c-.4-1.19-.62-2.46-.62-3.77s.22-2.58.62-3.77v-5.2h-6.7C.78 17.73 0 20.77 0 24s.78 6.27 2.14 8.97l6.71-5.2z"
                ></path>
                <path
                  fill="#E94235"
                  d="M20 12c2.93 0 5.55 1.01 7.62 2.98l5.76-5.76C29.92 5.98 25.39 4 20 4 12.18 4 5.43 8.49 2.14 15.03l6.7 5.2C10.41 15.51 14.81 12 20 12z"
                ></path>
              </svg>
            </div>
            <h1 className="text-3xl">Sign in</h1>
            <h1 className="">
              with your Google Account to continue to YouTube. This account will
              be available to other Google apps in the browser.
            </h1>
          </div>
          <div className="form flex flex-col gap-3 lg:w-[50%]">
            <input
              className="p-1 py-2 border rounded-md"
              type="text"
              name="username"
              id=""
              placeholder="Enter Your userName"
              onChange={handleChangeInput}
            />

            <input
              className="p-1 py-2 border rounded-md"
              type="password"
              name="password"
              id=""
              placeholder="Enter Your password"
              onChange={handleChangeInput}
            />
            <div className="flex justify-between">
              <div className="agreement">
                <input type="checkbox" name="agreement" id="agreement" />
                <label htmlFor="agreement">Check me</label>
              </div>
              <h1 className="text-blue-500 underline cursor-pointer">
                Forget Password?
              </h1>
            </div>
            <button
              onClick={handleSignIn}
              className="bg-[#8ab4f8] text-[#062e6f] p-2 rounded-xl uppercase cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>
        <h1 className="flex gap-2">
          Don't have an account?
          <Link className="text-blue-400 underline" to={"/signup"}>
            Sign up
          </Link>
        </h1>
      </div>
    </section>
  );
}

export default Signin;
