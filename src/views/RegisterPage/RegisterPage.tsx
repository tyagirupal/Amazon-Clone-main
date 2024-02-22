import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { PublicAxios } from "@src/utils/PublicAxios";
import { useAuthProvider } from "@src/providers/AuthProvider";

import amazonLogoBlack from "@src/assets/amazon-logo-black.png";
import exclamationIcon from "@src/assets/exclamation-point-logo.png";
import exclamationBlue from "@src/assets/exclamation-blue.png";

import "src/views/RegisterPage/RegisterPage.scss";
import { TAuthRequest } from "@src/@types/RequestTypes";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { ACCESS_TOKEN } from "@src/config/LocalStorageKeys";

export interface TRegisterValue {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  password: string;
  "again-password": string;
}

export function RegisterPage() {
  const navigate = useNavigate();

  const { setAuthData } = useAuthProvider();

  const {
    emailInput,
    setEmailInput,
    passwordInput,
    setPasswordInput,
    nameInput,
    setNameInput,
  } = useContext(GlobalContext);

  const [lastNameInput, setLastNameInput] = useState<string>("");
  const [mobileNumberInput, setMobileNumberInput] = useState<string>("");
  const [againPasswordInput, setAgainPasswordInput] = useState<string>("");

  const [nameWarning, setNameWarning] = useState<boolean>(false);
  const [lastNameWarning, setLastNameWarning] = useState<boolean>(false);
  const [emailWarning, setEmailWarning] = useState<boolean>(false);
  const [mobileNumberWarning, setMobileNumberWarning] =
    useState<boolean>(false);
  const [passwordWarning, setPasswordWarning] = useState<boolean>(false);
  const [againPasswordWarning, setAgainPasswordWarning] =
    useState<boolean>(false);

  const continueButton = () => {
    setNameWarning(true);
    setLastNameWarning(true);
    setEmailWarning(true);
    setMobileNumberWarning(true);

    if (
      passwordInput !== againPasswordInput &&
      passwordInput !== "" &&
      againPasswordInput !== ""
    ) {
      setAgainPasswordWarning(true);
      setPasswordWarning(true);
    } else if (passwordInput.length < 6) {
      setPasswordWarning(true);
    } else if (
      passwordInput.length > 6 &&
      passwordInput !== againPasswordInput
    ) {
      setPasswordWarning(true);
      setAgainPasswordWarning(true);
    } else {
      setAgainPasswordWarning(false);
    }
  };

  async function register() {
    try {
      const newUser: TRegisterValue = {
        first_name: nameInput,
        last_name: lastNameInput,
        phone_number: mobileNumberInput,
        email: emailInput,
        password: passwordInput,
        "again-password": againPasswordInput,
      };
      const response = await PublicAxios.post("auth/register", newUser);

      localStorage.setItem("firstName", nameInput);

      setAuthData(response.data as TAuthRequest);
      navigate("/");
    } catch (error) {
      console.log("Registration failed:", error);
    }
  }

  return (
    <div className="register-page">
      <div className="image-spacing">
        <img
          onClick={() => navigate("/")}
          src={amazonLogoBlack}
          alt="Black Amazon Logo"
        />
      </div>
      <div className="register-spacing">
        <div className="register-box">
          <div>
            <h1>Create account</h1>
            <label className="enter-info-text">First name</label>
            <div className="first-name-input-value">
              <input
                onChange={(e) => {
                  setNameWarning(false);
                  setNameInput(e.target.value);
                }}
                className={
                  nameWarning && nameInput === ""
                    ? "first-name-warning-border"
                    : "enter-first-name"
                }
                type="text"
                placeholder="First name"
              />
              {nameWarning && nameInput === "" && (
                <span className="first-name-input-warning">
                  <img src={exclamationIcon} alt="Exclamation Point Icon" />
                  <p>Enter your first name</p>
                </span>
              )}
            </div>
            <label className="enter-info-text">Last name</label>
            <div className="last-name-input-value">
              <input
                onChange={(e) => {
                  setLastNameWarning(false);
                  setLastNameInput(e.target.value);
                }}
                className={
                  lastNameWarning && lastNameInput === ""
                    ? "last-name-warning-border"
                    : "enter-last-name"
                }
                type="text"
                placeholder="Last name"
              />
              {lastNameWarning && lastNameInput === "" && (
                <span className="last-name-input-warning">
                  <img src={exclamationIcon} alt="Exclamation Point Icon" />
                  <p>Enter your last name</p>
                </span>
              )}
            </div>
            <div>
              <label className="enter-info-text">Email</label>
              <div className="register-email">
                <input
                  onChange={(e) => {
                    setEmailWarning(false);
                    setEmailInput(e.target.value);
                  }}
                  className={
                    emailWarning && emailInput === ""
                      ? "email-warning-border"
                      : "email-text"
                  }
                  type="text"
                  placeholder="Email address"
                />
                {emailWarning && emailInput === "" && (
                  <span className="email-input-warning">
                    <img src={exclamationIcon} alt="Exclamation Point Icon" />
                    <p>Enter your email</p>
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="enter-info-text">Phone number</label>
              <div className="register-mobile-number">
                <input
                  onChange={(e) => {
                    setMobileNumberWarning(false);
                    setMobileNumberInput(e.target.value);
                  }}
                  className={
                    mobileNumberWarning && mobileNumberInput.length !== 9
                      ? "mobile-number-warning-border"
                      : "mobile-number-text"
                  }
                  type="number"
                  placeholder="Mobile number"
                />

                {mobileNumberWarning && mobileNumberInput.length !== 9 && (
                  <span className="mobile-number-input-warning">
                    {mobileNumberInput.length !== 9 &&
                      mobileNumberInput !== "" && (
                        <>
                          <img
                            src={exclamationIcon}
                            alt="Exclamation Point Icon"
                          />
                          <p>Mobile number must be equal to 9 characters</p>
                        </>
                      )}
                    {mobileNumberInput === "" && (
                      <>
                        <img
                          src={exclamationIcon}
                          alt="Exclamation Point Icon"
                        />
                        <p>Enter your mobile phone number</p>
                      </>
                    )}
                  </span>
                )}
              </div>
            </div>
            <div>
              <label className="enter-info-text">Password</label>
              <div className="password-input-value">
                <input
                  onChange={(e) => {
                    setPasswordWarning(false);
                    setPasswordInput(e.target.value);
                  }}
                  className={
                    (passwordWarning && passwordInput === "") ||
                    (againPasswordWarning && passwordInput.length < 8)
                      ? "password-warning-border"
                      : "password-text"
                  }
                  type="password"
                  placeholder="At least 8 characters"
                />
                {(passwordWarning && passwordInput === "") ||
                (againPasswordWarning && passwordInput.length < 8) ? (
                  <span className="password-input-warning">
                    <img src={exclamationIcon} alt="Exclamation Point Icon" />
                    <p>Minimum 8 characters required</p>
                  </span>
                ) : (
                  passwordInput.length < 8 && (
                    <span className="password-require">
                      <img
                        src={exclamationBlue}
                        alt="Exclamation Point Blue Icon"
                      />
                      <p>Passwords must be at least 8 characters.</p>
                    </span>
                  )
                )}
              </div>
            </div>
            <div>
              <label className="enter-info-text">Re-enter password</label>
              <div className="password-again-input-value">
                <input
                  onChange={(e) => {
                    setAgainPasswordWarning(false);
                    setAgainPasswordInput(e.target.value);
                  }}
                  className={
                    !againPasswordWarning
                      ? "password-again-text"
                      : "password-again-warning-border"
                  }
                  type="password"
                />
                {againPasswordWarning && (
                  <span className="password-again-warning-text">
                    <img src={exclamationIcon} alt="Exclamation Point Icon" />
                    <p>Passwords must match</p>
                  </span>
                )}
                <button
                  onClick={() => {
                    if (
                      mobileNumberInput.length < 9 &&
                      mobileNumberInput.length > 0
                    ) {
                      setMobileNumberWarning(true);
                    }
                    continueButton();
                    register();
                  }}
                >
                  Continue
                </button>
              </div>
            </div>
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
          <div className="already-account">
            <p>Already have an account?</p>
            <a onClick={() => navigate("/sign-in")}>Sign in ▸</a>
          </div>
        </div>
      </div>
      <div className="register-footer-divider"></div>
      <span className="register-footer-text">
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
