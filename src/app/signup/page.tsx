"use client";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { auth } from "@/lib/firebase";
// import { toast } from "react-toastify";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setCookie } from "@/lib/cookies";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      username: "",
    },
    onSubmit: (value) => {
      console.log("value", value);
      try {
        createUserWithEmailAndPassword(auth, value.email, value.password)
          .then(() => {
            if (auth.currentUser) {
              toast.promise(sendEmailVerification(auth.currentUser), {
                loading: "Sending verification email...",
                success: <b>Email verification sent</b>,
                error: <b>Email verification failed.</b>,
              });
              sendEmailVerification(auth.currentUser).then(() => {
                // toast.success("Email verification sent")
                router.push("/login");
              });
              updateProfile(auth.currentUser, {
                displayName: value.name + " " + value.username,
              }).catch((error) => {
                console.error(error.message);
              });
            }
            // eslint-disable-next-line
          })
          .catch((error) => {
            toast.error(error.message);
          });
        // eslint-disable-next-line
      } catch (error) {
        // toast.error(error);
      }
    },
  });

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
        .then((result) => {
          const user = result.user;
          // localStorage.setItem("userToken", user.uid)
          setCookie("token", user.uid);
          router.push("/home");
          toast.success("Login Successful");
        })
        .catch((error) => {
          console.error(error.message);
        });
      // eslint-disable-next-line
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  };

  /* eslint-disable */
  return (
    <div>
      <div className="h-screen md:flex">
        <div className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i justify-around items-center hidden">
          <div>
            <h1 className="text-white font-bold text-4xl font-sans">
              Mr Electronic
            </h1>
            <p className="text-white mt-1">
              Your Trusted Partner in Electronics – Expert Solutions for Modern
              Needs.
            </p>
            <button
              type="submit"
              className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2"
            >
              Read More
            </button>
          </div>
          <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
          <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
        </div>
        <div className="flex md:w-1/2 justify-center py-10 items-center bg-white">
          <form onSubmit={handleSubmit} className="bg-white">
            <h1 className="text-gray-800 font-bold text-2xl mb-1">
              Hello There!
            </h1>
            <p className="text-sm font-normal text-gray-600 mb-7">Welcome</p>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none text-black"
                type="text"
                name="name"
                id=""
                onChange={handleChange}
                value={values.name}
                placeholder="Full name"
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none text-black"
                type="text"
                name="username"
                onChange={handleChange}
                value={values.username}
                id=""
                placeholder="Username"
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none text-black"
                type="email"
                name="email"
                onChange={handleChange}
                value={values.email}
                placeholder="Email Address"
              />
            </div>
            <div className="flex items-center border-2 py-2 px-3 rounded-2xl">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                className="pl-2 outline-none border-none text-black"
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={handleChange}
                value={values.password}
                placeholder="Password"
              />
              <div onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <button
              type="submit"
              className="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl  font-semibold mb-2"
            >
              Sign up
            </button>
            <p className="flex pl-2 text-sm leading-4 text-gray-400 my-2">
              Do you already have an account?
              {/* <NavLink to="/login" className="text-black  pl-1 text-sm -my-[2px] hover:underline hover:text-indigo-400">
                            Login
                        </NavLink> */}
              <Link
                href={"/login"}
                className="text-black  pl-1 text-sm -my-[2px] hover:underline hover:text-indigo-400"
              >
                Login
              </Link>
            </p>
            <p className="flex pl-2 text-sm leading-4 text-gray-400 ">
              Sign-in With
            </p>
            <section className="flex p-2 gap-4">
              <section className="flex p-2 gap-4 items-center">
                <FaGoogle
                  color="#4285F4"
                  onClick={googleLogin}
                  className="cursor-pointer   rounded-full"
                />
                <FaFacebookF color="#4285F4" className="cursor-pointer" />
                <FaGithub color="#4285F4" className="cursor-pointer" />
                <FaTwitter color="#4285F4" className="cursor-pointer" />
              </section>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
};
/* eslint-enable */

export default Signup;
