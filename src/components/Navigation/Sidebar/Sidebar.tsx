import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { useNavigate } from "react-router-dom";

import personLogo from "@src/assets/person-logo.png";
import closeSidebar from "@src/assets/sidebar-close-button.png";
import sidebarArrow from "@src/assets/sidebar-arrow.png";
import usaFlag from "@src/assets/usa-flag.jpg";
import webLogo from "@src/assets/web-logo.png";

import "./Sidebar.scss";

interface TCategories {
  id: string;
  created_at?: string;
  updated_at: string;
  name: string;
}

export function Sidebar() {
  const { sideBar, setSideBar, modal, setModal } = useContext(GlobalContext);

  const navigate = useNavigate();

  const [categories, setCategories] = useState<TCategories[]>([]);

  async function getCategories() {
    try {
      const response = await axios.get(
        "http://localhost:3000/product-category"
      );
      setCategories(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {sideBar && (
        <div>
          <>
            <aside className={modal ? "sidebar" : "sidebar-close"}>
              <button
                onClick={() => {
                  navigate("/sign-in");
                  setSideBar(false);
                }}
                className="sidebar-sign-in"
              >
                <div className="sign-in-text">
                  <img src={personLogo} alt="Person logo" />
                  <h2>Hello, sign in</h2>
                </div>
              </button>
              <>
                {categories.map((category) => {
                  return (
                    <div
                      key={category.id}
                      onClick={() => {
                        if (category.name === "Computers") {
                          navigate("/products");
                          setSideBar(false);
                        }
                      }}
                      className="sidebar-categories"
                    >
                      <nav>{category.name}</nav>
                      <img src={sidebarArrow} alt="Sidebar Arrow" />
                    </div>
                  );
                })}
                <div className="help-settings">Help & Settings</div>
                <nav className="your-account">Your Account</nav>
                <span className="sidebar-language">
                  <img className="web-logo" src={webLogo} alt="Web Logo" />
                  <span>English</span>
                </span>
                <span className="sidebar-country">
                  <img
                    className="sidebar-usa-flag"
                    src={usaFlag}
                    alt="USA Flag"
                  />
                  <span>United States</span>
                </span>
                <nav
                  onClick={() => {
                    navigate("sign-in");
                    setSideBar(false);
                  }}
                  className="sidebar-second-sign-in"
                >
                  Sign in
                </nav>
              </>
            </aside>

            <div
              className={modal ? "sidebar-modal" : "sidebar-modal-close"}
              onClick={() => {
                setModal(false);

                setTimeout(() => {
                  setSideBar(false);
                }, 400);
              }}
            ></div>
          </>
          <img
            onClick={() => {
              setModal(false);
              setTimeout(() => {
                setSideBar(false);
              }, 400);
            }}
            className="sidebar-close-button"
            src={closeSidebar}
            alt="Sidebar Close Button"
          />
        </div>
      )}
    </>
  );
}
