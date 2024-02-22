import { useContext } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "@src/providers/AuthProvider";
import { TAuthorizationStatus_Enum } from "@src/providers/AuthProvider/AuthContext";

export function SignInModal() {
  const navigate = useNavigate();

  const { signInHover, setSignInHover } = useContext(GlobalContext);

  const { authStatus, setAuthStatus, signOut } = useAuthProvider();

  return (
    <>
      {signInHover && (
        <div>
          <div
            onMouseOver={() => setSignInHover(true)}
            onMouseOut={() => setSignInHover(false)}
            className="sign-in-bar"
          >
            {authStatus === TAuthorizationStatus_Enum.UNAUTHORIZED && (
              <>
                <span className="button-space">
                  <button
                    onClick={() => {
                      navigate("/sign-in");
                      setSignInHover(false);
                    }}
                    className="sign-in-button"
                  >
                    Sign in
                  </button>
                </span>

                <p className="sign-in-bar-register">
                  New customer?{" "}
                  <a
                    onClick={() => {
                      navigate("/register");
                      setSignInHover(false);
                    }}
                  >
                    {" "}
                    Start here
                  </a>
                </p>
              </>
            )}
            <div className="lists-account">
              <span className="lists">
                <span>Your Lists</span>
                <a onClick={() => navigate("/wishlist")}>Create a List</a>
              </span>
              <span className="account">
                <span>Your Account</span>
                <a href="#">Account</a>
                {authStatus === TAuthorizationStatus_Enum.AUTHORIZED && (
                  <a
                    onClick={() => {
                      navigate("/sign-in");
                      setSignInHover(false);
                      signOut();
                    }}
                    href="#"
                  >
                    Sign out
                  </a>
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
