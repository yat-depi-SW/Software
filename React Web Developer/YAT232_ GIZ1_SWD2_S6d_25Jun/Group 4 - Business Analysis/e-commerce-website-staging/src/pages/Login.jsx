import { useEffect, useState } from "react";
import { Typography, Input, Button, useSelect } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../redux/reducers/usersSlice";
import RegistrationErrorMsg from "../components/RegistrationErrorMsg";

export function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allUsers = useSelector((state) => state.users.users);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      navigate("/");
    }
  }, []);

  const validation = () => {
    setErrorMsg({ password: "", email: "" });

    const userTryToLogin = allUsers.find(
      (user) => user.email === inputData.email
    );
    if (!userTryToLogin) {
      setErrorMsg((prevError) => {
        return {
          ...prevError,
          email: "this account is not exist. try to Sign Up.",
        };
      });
    }

    if (userTryToLogin && userTryToLogin.password !== inputData.password) {
      setErrorMsg((prevError) => {
        return {
          ...prevError,
          password: "This wrong password",
        };
      });
    }
  };

  //for history
  const handleLogin = (user) => {
    const newEntry = {
      action: "Logged In",
      userEmail: user.email,
      date: new Date().toLocaleString(),
    };

    const userHistory = JSON.parse(localStorage.getItem("userHistory")) || [];
    userHistory.push(newEntry);
    localStorage.setItem("userHistory", JSON.stringify(userHistory));
  };

  useEffect(() => {
    validation();
  }, [inputData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userTryToLogin = allUsers.find(
      (user) => user.email === inputData.email
    );

    if (userTryToLogin) {
      const { id } = userTryToLogin;

      dispatch(fetchUser(id));
      localStorage.setItem("id", id);

      // Store login history in local storage
      handleLogin(userTryToLogin);

      navigate("/");
    }
  };

  const disableBtn = () => {
    if (!inputData.email || !inputData.password) return true;

    if (errorMsg.email || errorMsg.password) return true;

    return false;
  };
  return (
    <section className="grid text-center items-center dark:text-gray-100 py-32">
      <div>
        <Typography
          variant="h3"
          color="blue-gray"
          className="mb-2 dark:text-gray-100"
        >
          Log In
        </Typography>

        <Typography className="mb-16 text-gray-600 font-normal text-[18px] dark:text-gray-300">
          Enter your email and password to sign in
        </Typography>

        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900 dark:text-gray-200"
              >
                Your Email
              </Typography>
            </label>
            <Input
              error={Boolean(inputData.email && errorMsg.email)}
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 dark:bg-gray-700 dark:text-gray-100"
              labelProps={{
                className: "hidden",
              }}
              onChange={(e) =>
                setInputData({ ...inputData, email: e.target.value })
              }
            />
            {inputData.email && errorMsg.email && (
              <RegistrationErrorMsg msg={errorMsg.email} />
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900 dark:text-gray-200"
              >
                Password
              </Typography>
            </label>
            <Input
              error={Boolean(inputData.password && errorMsg.password)}
              size="lg"
              placeholder="********"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200 dark:bg-gray-700 dark:text-gray-100"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5 dark:text-gray-100" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 dark:text-gray-100" />
                  )}
                </i>
              }
              onChange={(e) =>
                setInputData({ ...inputData, password: e.target.value })
              }
            />
            {inputData.password && errorMsg.password && (
              <RegistrationErrorMsg msg={errorMsg.password} />
            )}
          </div>

          <div className="flex justify-end">
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              variant="small"
              className="font-medium dark:text-gray-300"
            >
              Forgot password
            </Typography>
          </div>

          <Button
            disabled={disableBtn()}
            type="submit"
            color="gray"
            size="lg"
            className="mt-6 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
            fullWidth
          >
            Log In
          </Button>

          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal dark:text-gray-300"
          >
            Not registered?{" "}
            <Link
              to="../signup"
              className="font-medium text-gray-900 dark:text-gray-100"
            >
              Create account
            </Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default Login;