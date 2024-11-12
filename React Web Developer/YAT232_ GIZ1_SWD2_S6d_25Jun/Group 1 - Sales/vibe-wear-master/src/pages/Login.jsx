import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login({ users, setLogged }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const navigate = useNavigate();

  const validateForm = () => {
    const validationErrors = {};
    const { email, password } = user;

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Email address is invalid";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required";
    } else if (password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    return validationErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const checkUser = users.find(
        ({ email, password }) => user.email === email && user.password === password,
      );

      if (checkUser) {
        localStorage.setItem("ck", checkUser.id);
        setLogged(true);
        navigate("/");
      } else {
        setErrors({ general: "Invalid email or password" });
      }
    }
  };

  return (
    <div className="items-center justify-center rounded-3xl border-2 border-gray-200 px-10 py-20">
      <form onSubmit={handleSubmit}>
        <h1 className="text-5xl font-semibold">WELCOME BACK</h1>
        <p className="mt-4 text-lg font-medium text-gray-500">
          Please enter your details
        </p>
        <div className="mt-8">
          <div>
            <label className="text-lg font-medium">Email</label>
            <input
              type="text"
              name="email"
              className="mt-1 w-full rounded-xl border-2 border-gray-100 bg-transparent p-2.5"
              placeholder="Enter your email"
              value={user.email}
              onChange={handleChange}
            />
            {errors.email && <span className="text-red-500">{errors.email}</span>}
          </div>
          <div>
            <label className="text-lg font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="mt-1 w-full rounded-xl border-2 border-gray-100 bg-transparent p-2.5"
              placeholder="Enter your password"
              value={user.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password}</span>
            )}
          </div>

          {errors.general && (
            <div className="text-red-500 mt-2">{errors.general}</div>
          )}

          <div className="mt-8 flex items-center justify-between">
            <div>
              <input type="checkbox" id="remember" />
              <label className="ml-2 text-base font-medium" htmlFor="remember">
                Remember for 30 days
              </label>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-y-4">
            <Button
              type="submit"
              className="rounded-xl bg-blue-800 py-3 text-lg font-bold text-white transition-all ease-in-out hover:scale-[1.01] active:scale-[.98] active:duration-75"
            >
              Sign In
              <ArrowRight className="ml-2" />
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <p className="text-base font-medium">Don't have an account?</p>
            <Link
              to="/signup"
              className="ml-2 text-base font-medium text-blue-800"
            >
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}