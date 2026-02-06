import { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setAuthenticated } from "../Features/authSlice";
import authservice from "../AppWrite/Auth";
import Login2Card from "./AuthCard";

export default function Login() {
  const location = useLocation();
  const [error, setError] = useState("")
  const [authError, setAuthError] = useState("")
  const [view, setView] = useState(location.pathname === "/signup" ? "signup" : "signin");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/signup") {
      setView("signup");
    } else {
      setView("signin");
    }
  }, [location.pathname]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 🔑 LOGIN HANDLER
  const onLogin = async (data) => {
    setError("");

    try {
      await authservice.login({
        email: data.email.trim(),
        password: data.loginpassword,
      });

      const user = await authservice.getCurrentUser();

      dispatch(setAuthenticated(user));
      navigate("/all-posts");

    } catch (err) {
      setAuthError("Invalid email or password");
      console.error(err);
      setError("Invalid email or password");
    }
  };

  // 🔑 SIGNUP HANDLER
  const onSignup = async (data) => {
    setError("");

    try {
      await authservice.createAccount({
        email: data.signupEmail.trim(),
        password: data.password,
        name: data.name,
      });

       await authservice.login({
      email: data.signupEmail.trim(),
      password: data.password,
    });

      const user = await authservice.getCurrentUser();
      dispatch(setAuthenticated(user));
      navigate("/all-posts");

    } catch (err) {
      console.error(err);
      setAuthError(
    err?.message || "An account with this email already exists"
  );
    }
  };



  return (
    <Login2Card
      view={view}
      setView={setView}
      register={register}
      handleSubmit={handleSubmit}
      errors={errors}
      authError={authError}
      onLogin={onLogin}
      onSignup={onSignup}
    />
  );
}
