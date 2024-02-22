import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";

import searchIcon from "@src/assets/search-icon.png";

import "@src/views/OrderPage/OrderPage.scss";

interface TOrderInfo {
  id: string;
  name: string;
}

export function OrderPage() {
  const { currentInfo, setCurrentInfo } = useContext(GlobalContext);

  const [select, setSelect] = useState<string>("");

  const orderInfos: TOrderInfo[] = [
    { id: "orders-id", name: "Orders" },
    { id: "buy-again-id", name: "Buy Again" },
    { id: "not-yet-shipped-id", name: "Not Yet Shipped" },
    { id: "digital-orders-id", name: "Digital Orders" },
    { id: "local-store-orders-id", name: "Local Store Orders" },
    { id: "cancelled-orders-id", name: "Cancelled Orders" },
  ];

  useEffect(() => {
    setCurrentInfo("Orders");
    setSelect("last 30 days");
  }, []);

  return (
    <div className="orders">
      <nav className="orders-nav">
        <a href="#" className="your-account">
          Your Account
        </a>
        <span>›</span>
        <a href="#" className="your-orders">
          Your Orders
        </a>
      </nav>
      <div className="search-orders">
        <h1>Your Orders</h1>
        <div>
          <span className="order-search-spacing">
            <img src={searchIcon} alt="Search Icon" />
            <input
              className="order-search-bar"
              type="text"
              placeholder="Search all orders"
            />
          </span>
          <button className="order-search-button">Search Orders</button>
        </div>
      </div>
      <ul className="order-infos">
        {orderInfos.map((orderInfo) => {
          return (
            <li
              onClick={() => setCurrentInfo(orderInfo.name)}
              key={orderInfo.id}
              className={
                currentInfo === orderInfo.name
                  ? `order-infos-list ${orderInfo.id}`
                  : "order-infos-list"
              }
            >
              {orderInfo.name}
            </li>
          );
        })}
      </ul>
      <div className="divider"></div>
      {currentInfo === "Orders" && (
        <>
          <div className="order-history">
            <label>
              <span>0 Orders</span> placed in
            </label>
            <select
              onChange={(e) => setSelect(e.target.value)}
              name="orders-date"
              id="orders-select"
            >
              <option value="last 30 days">last 30 days</option>
              <option value="past 3 months">past 3 months</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
          <p className="past-orders">
            {select !== "2021" ? (
              <>You have not placed any orders in {`${select}.`}</>
            ) : (
              <p className="past-orders">
                You have not placed any orders in 2021.
              </p>
            )}
          </p>
        </>
      )}
      {currentInfo === "Buy Again" && (
        <p className="buy-again">
          There are no recommended items for you to buy again at this time.
          Check Your Orders for items you previously purchased.
        </p>
      )}
      {currentInfo === "Not Yet Shipped" && (
        <p className="not-yet-shipped">
          Looking for an order? All of your orders have shipped.{" "}
          <a onClick={() => setCurrentInfo("Orders")} href="#">
            View all orders
          </a>
        </p>
      )}
      {currentInfo === "Digital Orders" && (
        <>
          <div className="order-history">
            <label>
              <span>0 Orders</span> placed in
            </label>
            <select
              onChange={(e) => setSelect(e.target.value)}
              name="orders-date"
              id="orders-select"
            >
              <option value="last 30 days">last 30 days</option>
              <option value="past 3 months">past 3 months</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
          <p className="past-orders">
            {select !== "2021" ? (
              <>You have not placed any orders in {`${select}.`}</>
            ) : (
              <p className="past-orders">
                You have not placed any orders in 2021.
              </p>
            )}
          </p>
        </>
      )}
      {currentInfo === "Local Store Orders" && (
        <>
          <div className="order-history">
            <label>
              <span>0 Orders</span> placed in
            </label>
            <select
              onChange={(e) => setSelect(e.target.value)}
              name="orders-date"
              id="orders-select"
            >
              <option value="last 30 days">last 30 days</option>
              <option value="past 3 months">past 3 months</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
          <p className="past-orders">
            {select !== "2021" ? (
              <>You have not placed any orders in {`${select}.`}</>
            ) : (
              <p className="past-orders">
                You have not placed any orders in 2021.
              </p>
            )}
          </p>
        </>
      )}
      {currentInfo === "Cancelled Orders" && (
        <p className="cancelled-orders">
          We aren't finding any cancelled orders (for orders placed in the last
          6 months).
          <a onClick={() => setCurrentInfo("Orders")} href="#">
            View all orders
          </a>
        </p>
      )}
    </div>
  );
}
