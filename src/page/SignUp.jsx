import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import bcrypt from "bcryptjs";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormDate] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreement: "",
  });

  const handleSignUp = async () => {
    if (formData.username.trim() == "") {
      toast.error("Please Filed Full Name!");
      return;
    }
    if (formData.email.trim() == "") {
      toast.error("Please Filed Email!");

      return;
    }
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Email Invalid!");

      return;
    }

    if (formData.password.trim() == "") {
      toast.error("Please Filed Password!");
      return;
    }
    if (formData.confirmPassword.trim() == "") {
      toast.error("Please Filed Confirm Password!");

      return;
    }
    if (!formData.agreement) {
      toast.error("Please Check Agreement!");
      return;
    }
    console.log(formData.username.length);
    if (formData.username.length < 4) {
      toast.error("Full Name Must be more than 3 letters");
      return;
    }
    if (formData.username.length > 51) {
      toast.error("Full Name Must be less than 50 letters");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password Must be more 6 letters");
      return;
    }

    if (formData.confirmPassword != formData.password) {
      toast.error("Password Doesn't Match!");
      return;
    }

    let hashPassword = await bcrypt.hash(formData.password, 10);
    console.log(hashPassword);

    let newUser = {
      username: formData.username,
      email: formData.email.toLowerCase(),
      password: hashPassword,
    };

    axios
      .post("https://68371fab664e72d28e43a55c.mockapi.io/users", newUser)
      .then(() =>
        toast.success(
          "Sign Up SuccessFully We Will Redirect You To Login Form..."
        )
      );

    setTimeout(() => {
      navigate("/signin");
    }, 2000);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormDate({ ...formData, [name]: value });
  };
  return (
    <section className="bg-[#1E1f20] flex justify-center items-center h-screen w-full">
      <div className="signup-content bg-[#0E0E0E] text-white w-[80%] h-fit p-10 rounded-xl">
        <div className="flex justify-between">
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
            <h1 className="text-3xl">Create a Google Account</h1>
            <h1 className="">Enter Your Information</h1>
          </div>
          <div className="form flex flex-col gap-3 w-[50%]">
            <input
              className="p-1 py-2 border rounded-md"
              type="text"
              name="username"
              id=""
              placeholder="Enter Your Name"
              onChange={handleChangeInput}
            />
            <input
              className="p-1 py-2 border rounded-md"
              type="text"
              name="email"
              id=""
              placeholder="Enter Your Email"
              onChange={handleChangeInput}
            />
            <input
              className="p-1 py-2 border rounded-md"
              type="text"
              name="password"
              id=""
              placeholder="Enter Your password"
              onChange={handleChangeInput}
            />
            <input
              className="p-1 py-2 border rounded-md"
              type="text"
              name="confirmPassword"
              id=""
              placeholder="Enter Your Confirm Password"
              onChange={handleChangeInput}
            />
            <div className="agreement">
              <input
                onChange={(e) => {
                  setFormDate({ ...formData, agreement: e.target.checked });
                }}
                type="checkbox"
                name="agreement"
                id=""
              />
              <label htmlFor="agreement">i Agree</label>
            </div>
            <button
              onClick={handleSignUp}
              className="bg-[#8ab4f8] text-[#062e6f] p-2 rounded-xl uppercase cursor-pointer"
            >
              Sign up
            </button>
          </div>
        </div>
        <h1 className="flex gap-2">
          Already have an account?{" "}
          <Link className="text-blue-400 underline" to={"/signin"}>
            Sign in
          </Link>
        </h1>
      </div>
    </section>
  );
}

export default SignUp;
