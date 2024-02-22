import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@src/providers/GlobalProvider";
import { useParams } from "react-router-dom";

import { TGetProducts } from "@src/@types/RequestTypes";

import fourAndHalf from "@src/assets/four-half-stars.png";

import axios from "axios";

import "./OneProductPage.scss";

export function OneProductPage() {
  const { productId, deliverTo } = useContext(GlobalContext);

  const [oneProduct, setOneProduct] = useState<TGetProducts | null>(null);

  const { id } = useParams();

  async function getOneProduct() {
    try {
      const response = await axios.get(
        `http://localhost:3000/product?pageSize=25`
      );
      const product = response.data.products.find(
        (product: TGetProducts) => product.id === id
      );
      setOneProduct(product);
    } catch (error) {
      console.log("Error Loading Product", error);
    }
  }

  useEffect(() => {
    getOneProduct();
  }, []);

  console.log(oneProduct);

  return (
    <div>
      <div key={oneProduct?.id}>
        <span>
          <img src="" alt="Left Arrow" />
          <span>Back to results</span>
        </span>
        <div>
          <img src={oneProduct?.image} alt="Product Image" />
          <div>
            <h1>{oneProduct?.title}</h1>
            <span>
              <span>4.5</span>
              <img src={fourAndHalf} alt="Four And Half Stars" />
              <span>72,274 ratings</span>
            </span>
            <h2>{oneProduct?.salePrice}</h2>
            <span>Typical price {oneProduct?.price}</span>
            <p>
              Use Amazon Currency Converter at checkout to pay for this item in
              your local currency. Terms & Conditions apply. Learn More
              Available at a lower price from other sellers that may not offer
              free Prime shipping.
            </p>
            <h3>About this item</h3>
            <p>{oneProduct?.description}</p>
          </div>
          <p>
            Note: Products with electrical plugs are designed for use in the US.
            Outlets and voltage differ internationally and this product may
            require an adapter or converter for use in your destination. Please
            check compatibility before purchasing.
          </p>
        </div>
        <div className="buy">
          <h2>{oneProduct?.salePrice}</h2>
          <p>Delivery order within 6 hrs 8 min</p>
          <span>
            <img src="" alt="" />
            <a href="#">{deliverTo}</a>
          </span>
          <h2>In Stock</h2>
          <select name="quantity" id="quantity">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button>Add to Cart</button>
          <button>Buy Now</button>
          <span>
            <span>Ships from</span>
            <span>Amazon.com</span>
          </span>
          <span>
            <span>sold by</span>
            <span>Amazon.com</span>
          </span>
          <button>Add to List</button>
        </div>
      </div>
    </div>
  );
}
