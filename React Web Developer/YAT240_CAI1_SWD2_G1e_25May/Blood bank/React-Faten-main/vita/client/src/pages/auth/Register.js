import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";
import NavBar from "../../components/NavBar";
const Register = () => {
  const { loading, error } = useSelector((state) => state.auth);
  return (
    <>
        <NavBar />
        { error && <span>{ alert( error ) }</span> }
        { loading ? (
          <Spinner />
        ) : (
            
          <div className="container pad-110">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-10 form-container">
              <Form
                formTitle={ "Register" }
                submitBtn={ "Register" }
                formType={ "register" }
              />
            </div>
          </div>
            </div>

        ) }
      </>
  );
};

export default Register;
