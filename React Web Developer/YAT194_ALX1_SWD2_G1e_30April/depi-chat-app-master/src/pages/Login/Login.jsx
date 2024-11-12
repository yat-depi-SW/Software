import "./Login.css";
import assets from "../../assets/assets";
import { useState } from "react";
import { signup, login, resetPass } from "../../config/fireBase";

const Login = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false); // Checkbox state for agreement

  const submitHandler = (e) => {
    e.preventDefault();

    // Validate checkbox agreement for "Sign Up"
    if (currState === "Sign Up" && !agreed) {
      alert("You must agree to the terms of use & privacy policy");
      return;
    }

    // Call appropriate function based on current state (Sign Up or Login)
    if (currState === "Sign Up") {
      signup(userName, email, password);
    } else {
      login(email, password);
    }
  };

  return (
    <div className="login">
      <img src={assets.logo_big} alt="logo_bi" className="logo" />
      <form onSubmit={submitHandler} className="login-form">
        <h2>{currState}</h2>
        {currState === "Sign Up" ? (
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            placeholder="User Name"
            className="form-input"
            required
          />
        ) : null}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email Address"
          className="form-input"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          className="form-input"
          required
        />
        <button type="submit">
          {currState === "Sign Up" ? "Create a new Account" : "Login"}
        </button>
        {currState === "Sign Up" && (
          <div className="login-term">
            <input
              type="checkbox"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              required
            />
            <p>Agree to the terms of use & privacy policy</p>
          </div>
        )}
        <div className="login-forgot">
          {currState === "Sign Up" ? (
            <p className="login-toggle">
              Already have an account?
              <span onClick={() => setCurrState("Login")}> Login here</span>
            </p>
          ) : (
            <p className="login-toggle">
              {"Don't have an account?"}
              <span onClick={() => setCurrState("Sign Up")}> Sign up here</span>
            </p>
          )}
          {currState === "Login" ? <p className="login-toggle">
              {"Forgot Password"}
              <span onClick={() => resetPass(email)}> reset here</span>
            </p> : null }
        </div>
      </form>
    </div>
  );
};

export default Login;
