import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { TGetProducts } from "@src/@types/RequestTypes";

import beautyProducts from "@src/assets/beauty-products.jpg";
import essentialsForGamers from "@src/assets/essentials-for-gamers.jpg";
import kitchenFavorites from "@src/assets/kitchen-favorites.jpg";
import newArrivals from "@src/assets/new-arrivals.jpg";
import shopBooks from "@src/assets/shop-books.jpg";
import leftArrow from "@src/assets/left-arrow.png";
import rightArrow from "@src/assets/right-arrow.png";
import computerImage from "@src/assets/computer.jpg";

import axios from "axios";
import "@src/views/Home/Home.scss";

export function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [swipeLeft, setSwipeLeft] = useState<boolean>(false);
  const [stopAutoSwipe, setStopAutoSwipe] = useState<boolean>(false);
  const [swipeRight, setSwipeRight] = useState<boolean>(false);
  const [products, setProducts] = useState<TGetProducts[]>([]);

  const navigate = useNavigate();

  const images = [
    essentialsForGamers,
    newArrivals,
    beautyProducts,
    kitchenFavorites,
    shopBooks,
  ];

  async function getProducts() {
    try {
      const response = await axios.get("http://localhost:3000/product");
      setProducts(response.data.products);
    } catch (error) {
      console.log("Error Loading Products", error);
    }
  }

  function changeBackgroundImage(direction: string) {
    if (direction === "left") {
      setCurrentImageIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }
  }

  function stopAutoSwipeLeft(): void {
    if (!swipeLeft) {
      setSwipeLeft(true);
      setTimeout(() => {
        changeBackgroundImage("left");
        setSwipeLeft(false);
      }, 500);
    }
    setStopAutoSwipe(true);
  }

  function stopAutoSwipeRight(): void {
    if (!swipeRight) {
      setSwipeRight(true);
      setTimeout(() => {
        changeBackgroundImage("right");
        setSwipeRight(false);
      }, 500);
    }
    setStopAutoSwipe(true);
  }

  useEffect(() => {
    let swipeRightInterval: NodeJS.Timeout;

    if (!stopAutoSwipe) {
      swipeRightInterval = setInterval(() => {
        setSwipeRight(true);
        setTimeout(() => {
          setSwipeRight(false);
          changeBackgroundImage("right");
        }, 500);
      }, 5000);

      getProducts();
    }

    return () => clearInterval(swipeRightInterval);
  }, [stopAutoSwipe]);

  return (
    <div className="home">
      <a className="background-spacing">
        <img
          className={
            swipeLeft
              ? "home-background-left"
              : swipeRight
              ? "home-background-right"
              : "home-background"
          }
          src={images[currentImageIndex]}
          alt="Home Background Image"
        />
        {swipeLeft && (
          <img
            className={swipeLeft ? "home-background-left-switch" : ""}
            src={
              currentImageIndex - 1 === -1
                ? images[4]
                : images[currentImageIndex - 1]
            }
            alt="Home Background Image"
          />
        )}
        {swipeRight && (
          <img
            className={swipeRight ? "home-background-right-switch" : ""}
            src={
              currentImageIndex + 1 === 5
                ? images[0]
                : images[currentImageIndex + 1]
            }
            alt="Home Background Image"
          />
        )}
        <button className="left-button" onClick={() => stopAutoSwipeLeft()}>
          <img src={leftArrow} alt="Left Arrow" />
        </button>
        <button
          className="right-button"
          onClick={() => {
            stopAutoSwipeRight();
          }}
        >
          <img src={rightArrow} alt="Right Arrow" />
        </button>
      </a>
      <div className="category-grid">
        <div
          onClick={() => navigate("/products")}
          className="home-page-category"
        >
          <h2>Deals in PCs</h2>
          <img src={computerImage} alt="Computer Image" />
          <a href="#">Shop now</a>
        </div>
        <div className="home-page-category"></div>
        <div className="home-page-category"></div>
        <div className="home-page-category"></div>
        <div className="home-page-category"></div>
        <div className="home-page-category"></div>
        <div className="home-page-category"></div>
        <div className="home-page-category"></div>
      </div>
      {products.map((product) => {
        return (
          <div key={product.id}>
            {product.title}
            <img src={product.image} alt="Products" />
          </div>
        );
      })}
    </div>
  );
}
