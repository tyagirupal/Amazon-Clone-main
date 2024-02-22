import { useNavigate } from "react-router-dom";
import { useAuthProvider } from "@src/providers/AuthProvider";

import { TAuthorizationStatus_Enum } from "@src/providers/AuthProvider/AuthContext";

import wishListBackground from "@src/assets/wish-list-background.png";
import wishListBook from "@src/assets/wishlist-book-image.png";
import giftImage from "@src/assets/gift-image.png";
import wishListGift from "@src/assets/wish-list-gift.png";
import wishListNote from "@src/assets/wish-list-note.png";
import wishListGraph from "@src/assets/wish-list-graph.png";
import wishListBell from "@src/assets/wish-list-bell.png";

import "@src/views/WishList/WishList.scss";

export function WishList() {
  const navigate = useNavigate();

  const { authStatus } = useAuthProvider();

  return (
    authStatus === TAuthorizationStatus_Enum.UNAUTHORIZED && (
      <div className="wish-list-spacing">
        <div className="wish-list-page">
          <h1 className="your-lists">Your Lists</h1>
          <div className="wish-list">
            <img
              className="wish-list-background"
              src={wishListBackground}
              alt="Wish List Background"
            />
            <span className="lists">Lists</span>
            <span className="shopping-needs">for all your shopping needs</span>
            <button
              onClick={() => navigate("/sign-in")}
              className="wish-list-sign-in"
            >
              Sign In
            </button>
            <div className="wish-list-info">
              <div className="add-items">
                <div className="shopping-list">
                  <div className="shopping-list-spacing">
                    <span>Shoppin List</span>
                    <p>Add items you want to shop for.</p>
                  </div>
                  <img
                    className="book-image"
                    src={wishListBook}
                    alt="Book Page Image"
                  />
                </div>

                <div className="let-people-know">
                  <div className="let-people-know-spacing">
                    <span>Wish List</span>
                    <p>Let people know what gifts you'd like.</p>
                  </div>
                  <img
                    className="gift-image"
                    src={giftImage}
                    alt="Gift Image"
                  />
                </div>
              </div>
            </div>
            <div className="wish-list-benefits">
              <div className="benefit">
                <img src={wishListNote} alt="Checklist Image" />
                <div>
                  <h2>Save time</h2>
                  <p>
                    Add your items and ideas in one convenient
                    <br /> location
                  </p>
                </div>
              </div>
              <div className="benefit">
                <img src={wishListGift} alt="Gift Image" />
                <div>
                  <h2>Give great gifts</h2>
                  <p>Remember your friends' lists and share yours</p>
                </div>
              </div>
              <div className="benefit">
                <img src={wishListGraph} alt="Graph Image" />
                <div>
                  <h2>Check price changes</h2>
                  <p>Check when items from your lists drop in price</p>
                </div>
              </div>
              <div className="benefit">
                <img src={wishListBell} alt="Bell Image" />
                <div>
                  <h2>Get notified about deals</h2>
                  <p>
                    Get push notifications for deals when using the <br />{" "}
                    mobile app
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
