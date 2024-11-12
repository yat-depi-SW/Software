import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "./../../components/shared/Spinner";
import NavBar from "../../components/NavBar";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
    <NavBar/>
      {error && <span>{alert(error)}</span>}
      {loading ? (
        <Spinner />
      ) : (
        <div className="container pad-110">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-10 form-container">
            <Form
              formTitle={"Login Page"}
              submitBtn={"Login"}
              formType={"login"}
            />
          </div>
        </div>
        </div>
      )}
    </>
  );
};

export default Login;
