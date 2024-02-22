import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { useNavigate } from "react-router-dom";
import { LocaleContext } from "@src/providers/LocaleProvider";
import { FormattedMessage } from "react-intl";
import { useAuthProvider } from "@src/providers/AuthProvider";
import { TAuthorizationStatus_Enum } from "@src/providers/AuthProvider/AuthContext";

import navIcon from "@src/assets/nav-icon.png";
import amazonLogo from "@src/assets/amazon-logo.png";
import locationLogo from "@src/assets/location-logo.png";
import searchicon from "@src/assets/search-icon.png";
import usaFlag from "@src/assets/usa-flag.jpg";
import dropDownIcon from "src/assets/dropdown-icon.png";
import cartLogo from "@src/assets/cart-logo.png";
import triangle from "@src/assets/triangle.png";

import "./Header.scss";

interface TCategories {
  id: string;
  created_at?: string;
  updated_at: string;
  name: string;
}

export function Header() {
  const [categories, setCategories] = useState<TCategories[]>([]);

  const navigate = useNavigate();

  async function getCategories() {
    try {
      const response = await axios.get(
        "http://localhost:3000/product-category"
      );
      setCategories(response.data);
    } catch (error) {
      console.log("Error Loading Categories", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  const {
    setSideBar,
    setModal,
    setSignInHover,
    signInHover,
    setLanguageHover,
    languageHover,
    nameInput,
    setCurrentInfo,
  } = useContext(GlobalContext);

  const { toggleLocale } = useContext(LocaleContext);

  const { authStatus } = useAuthProvider();

  const storedFirstName = localStorage.getItem("firstName");

  return (
    <header className="header">
      {signInHover && (
        <img
          className="sign-in-triangle"
          src={triangle}
          alt="Small White Triangle"
        />
      )}
      <div className="header-input">
        <div className="logo-spacing">
          <img
            onClick={() => navigate("/")}
            className="amazon-logo"
            src={amazonLogo}
            alt="Amazon logo"
          />
          <div className="deliver-spacing">
            <img
              className="location-logo"
              src={locationLogo}
              alt="Location logo"
            />
            <button className="deliver">
              <div>
                <span className="deliver-to">Deliver to</span>
                <span className="usa">United States</span>
              </div>
            </button>
          </div>
        </div>
        <div className="search-bar">
          <div className="input-spacing">
            <select name="all" className="select-niche">
              <option value="/">All</option>
              {categories.map((category) => {
                return (
                  <option value="/" key={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              placeholder="Search Amazon"
              className="search-amazon"
            />
          </div>
          <button className="search-button">
            <img src={searchicon} alt="Search Icon" />
          </button>
        </div>
        <nav className="amazon-tools">
          <div
            onMouseOver={() => {
              setLanguageHover(true);
            }}
            onMouseLeave={() => setLanguageHover(false)}
            className="change-language"
          >
            <img src={usaFlag} alt="US Flag" />
            <span>EN</span>
            <img className="dropdown" src={dropDownIcon} alt="Dropdown Icon" />
          </div>
          <a
            onClick={() => {
              if (authStatus === TAuthorizationStatus_Enum.UNAUTHORIZED) {
                navigate("/sign-in");
              }
              setSignInHover(false);
            }}
            onMouseOver={() => setSignInHover(true)}
            onMouseLeave={() => setSignInHover(false)}
            className="sign-in"
          >
            <div className="sign-in-spacing">
              <span className="sign-in-text">
                Hello,
                {authStatus === TAuthorizationStatus_Enum.AUTHORIZED ? (
                  <span>{storedFirstName}</span>
                ) : (
                  <span>Sign in</span>
                )}
              </span>
              <p className="account-list">
                <b>Account & Lists</b>
              </p>
            </div>
            <img
              className="sign-in-dropdown"
              src={dropDownIcon}
              alt="sign in dropdown icon"
            />
          </a>
          <div
            onClick={() => {
              if (authStatus === TAuthorizationStatus_Enum.UNAUTHORIZED) {
                navigate("/sign-in");
              } else {
                navigate("/orders");
                setCurrentInfo("Orders");
              }
            }}
            className="returns-orders"
          >
            <span>Returns</span>
            <p>& Orders</p>
          </div>
          <div className="cart">
            <div className="cart-count">
              <span>0</span>
              <img src={cartLogo} alt="Cart Logo" />
            </div>
            <span className="cart-text">Cart</span>
          </div>
        </nav>
      </div>
      <nav className="nav-bar">
        <button
          className="open-sidebar"
          onClick={() => {
            setSideBar(true);
            setModal(true);
          }}
        >
          <img src={navIcon} alt="nav icon" /> All
        </button>

        <a href="#">Today's Deals</a>
        <a href="#">Customer Service</a>
        <a href="#">Registry</a>
        <a href="#">Gift Cards</a>
        <a href="#">Sell</a>
      </nav>
      {signInHover && <div className="sign-in-modal-mouseover"></div>}
      {!signInHover && <div className="sign-in-modal-mouseout"></div>}
    </header>
  );
}
