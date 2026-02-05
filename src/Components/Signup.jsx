import React, { useState } from "react";
import authservice from "../AppWrite/Auth.js";
import { Link, useNavigate } from "react-router-dom";
import { setAuthenticated as login } from "../Features/authSlice.js";
import { Button, Input, Logo } from "./index.js";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const account = await authservice.createAccount(data);

      if (account) {
        const user = await authservice.getCurrentUser();
        if (user) dispatch(login(user));
        navigate("/");
      }
    } catch (error) {
      setError(error.message || "Signup failed");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="mx-auto w-full max-w-md rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-md p-8 shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"></div>

        <div className="mb-6 flex justify-center relative z-10">
          <span className="inline-block w-full max-w-30">
            <Logo width="100%" />
          </span>
        </div>

        <h2 className="text-center text-2xl font-bold text-white relative z-10">
          Sign up to create account
        </h2>

        <p className="mt-2 text-center text-sm text-slate-400 relative z-10">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-400 hover:text-blue-300 hover:underline transition-colors"
          >
            Sign In
          </Link>
        </p>

        {error && (
          <p className="mt-6 text-center text-sm text-red-400 relative z-10">{error}</p>
        )}

        <form onSubmit={handleSubmit(create)} className="mt-8 relative z-10">
          <div className="space-y-5">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              className="bg-slate-800 border-slate-700 text-slate-200 focus:border-blue-500 rounded-lg"
              labelClassName="text-slate-300 font-medium mb-1"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              className="bg-slate-800 border-slate-700 text-slate-200 focus:border-blue-500 rounded-lg"
              labelClassName="text-slate-300 font-medium mb-1"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              className="bg-slate-800 border-slate-700 text-slate-200 focus:border-blue-500 rounded-lg"
              labelClassName="text-slate-300 font-medium mb-1"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="w-full py-3 text-base font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:-translate-y-0.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 border-none"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
