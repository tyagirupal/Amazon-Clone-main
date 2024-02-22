import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { useAuthProvider } from "@src/providers/AuthProvider";
import { PublicAxios } from "@src/utils/PublicAxios";
import { TAuthRequest } from "@src/@types/RequestTypes";
import { TAuthorizationStatus_Enum } from "@src/providers/AuthProvider/AuthContext";

import amazonLogoBlack from "@src/assets/amazon-logo-black.png";
import exclamationIcon from "@src/assets/exclamation-point-logo.png";

import "@src/views/SignInPage/SignInPage.scss";

export interface TSignInFormValue {
  email: string;
  password: string;
}

export function SignInPage() {
  const navigate = useNavigate();

  const { setAuthData, authStatus, setAuthStatus } = useAuthProvider();
  const { emailInput, passwordInput, setEmailInput, setPasswordInput } =
    useContext(GlobalContext);

  const [warning, setWarning] = useState<boolean>(false);
  const [signInInput, setSignInInput] = useState<string>("");
  const [enterPassword, setEnterPassword] = useState<boolean>(false);

  async function signIn() {
    try {
      const user: TSignInFormValue = {
        email: emailInput,
        password: passwordInput,
      };
      const response = await PublicAxios.post("auth/login", user);
      setAuthData(response.data as TAuthRequest);
      navigate("/");
      console.log(user);
    } catch (error) {
      console.log("Registration failed:", error);
    }
  }

  return (
    <div className="sign-in-page">
      <div className="image-spacing">
        <img
          onClick={() => navigate("/")}
          src={amazonLogoBlack}
          alt="Black Amazon Logo"
        />
      </div>

      <div className="sign-in-spacing">
        <div className="sign-in-box">
          <h1>Sign in</h1>
          {!enterPassword ? (
            <>
              <label className="enter-info-text">Email address</label>
              <div className="enter-email">
                <input
                  onChange={(e) => {
                    setWarning(false);
                    setEmailInput(e.target.value);
                  }}
                  className={
                    warning && emailInput === ""
                      ? "input-warning-border"
                      : "enter-text"
                  }
                  type="email"
                />

                {warning && emailInput === "" && (
                  <span className="sign-in-input-warning">
                    <img src={exclamationIcon} alt="Exclafmation Point Icon" />
                    <p>Enter your email or mobile phone number</p>
                  </span>
                )}
                <button
                  onClick={() => {
                    setWarning(true);
                    if (emailInput !== "") {
                      setEnterPassword(true);
                    }
                    if (enterPassword) {
                      signIn();
                    }
                  }}
                >
                  Continue
                </button>
              </div>
              <p className="conditions-of-use">
                By continuing, you agree to Amazon's{" "}
                <a href="#">Conditions of Use </a>
                and <a href="#">Privacy Notice.</a>
              </p>
              <div className="help">
                <a className="forgot-password" href="#">
                  Forgot your password?
                </a>
                <span className="buying-for-work">Buying for work?</span>
                <a className="amazon-business" href="#">
                  Shop on Amazon Business
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="email-or-number">
                {emailInput}
                <a
                  onClick={() => {
                    setEnterPassword(false);
                    setSignInInput("");
                  }}
                  className="change-account"
                >
                  Change
                </a>
              </div>

              <label className="password-text">Password</label>
              <div>
                <input
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="password-input"
                  type="password"
                />
              </div>
              <button className="sign-in-button" onClick={() => signIn()}>
                Sign in
              </button>
              <div className="keep-signed-in">
                <input type="checkbox" />
                <p>Keep me signed in.</p>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="divider-spacing">
        <div className="new-to-amazon">New to Amazon?</div>
        <div className="divider"></div>
      </div>
      <button
        onClick={() => {
          navigate("/register");
        }}
        className="create-account"
      >
        Create your Amazon account
      </button>
      <div className="sign-in-footer-divider"></div>
      <span className="sign-in-footer-text">
        <a href="#">Conditions of Use</a>
        <a href="#">Privacy Notice</a>
        <a href="#">Help</a>
      </span>
      <span className="copyright-notice">
        © 1996-2024, Amazon.com, Inc. or its affiliates
      </span>
    </div>
  );
}
