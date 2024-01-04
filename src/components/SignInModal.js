import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default function SignIpModal() {
  const { modalState, toggleModals, signIn } = useContext(UserContext);
  const navigate = useNavigate();

  const [validation, setValidation] = useState("");

  const inputs = useRef([]);
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };
  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const cred = await signIn(
        inputs.current[0].value, // email
        inputs.current[1].value  // password
      );
      setValidation("");
      toggleModals("close");
      navigate("/private/private-home");
    } catch (err) {
      console.error("SignIn Error: ", err);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        setValidation("Incorrect email and/or password.");
      } else {
        setValidation("An error occurred during sign in.");
      }
    }
  };
  

  const handleForgotPassword = async () => {
    const auth = getAuth();
    const email = inputs.current[0].value; // Assuming the first input is the email field
    try {
      await sendPasswordResetEmail(auth, email);
      alert("An email has been sent to you to reset your password.");
    } catch (error) {
      console.error("Error sending password reset email: ", error);
      setValidation("Error sending password reset email.");
    }
  };

  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  };

  return (
    <>
      {modalState.signInModal && (
        <div className="position">
          <div onClick={closeModal} className="cache"></div>
          <div className="container">
            <div className="">
              <div className="content">
                <div className="title">
                  <h5 className="modal-title">Sign In</h5>
                  <button onClick={closeModal} className="btn-close">X</button>
                </div>

                <div className="modal-body">
                  <form ref={formRef} onSubmit={handleForm} className="sign-up-form">
                    <div className="mb-3">
                      <label htmlFor="signInEmail" className="form-label">
                        Email address
                      </label>
                      <input
                        ref={addInputs}
                        name="email"
                        required
                        type="email"
                        className="form-control"
                        id="signInEmail"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="signInPwd" className="form-label">
                        Password
                      </label>
                      <input
                        ref={addInputs}
                        name="pwd"
                        required
                        type="password"
                        className="form-control"
                        id="signInPwd"
                      />
                      <p className="text-danger mt-1">{validation}</p>
                    </div>

                    <button className="btn btn-primary">Submit</button>
                    <button 
                      onClick={handleForgotPassword} 
                      className="btn btn-link">
                      Forgot Password?
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
