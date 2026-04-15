import React from "react";
import "./ProductDisplay.css";
import { frontendApi } from "../../api";

const ProductDisplay = (props) => {
  const { product } = props;

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={frontendApi.getImageUrl(product.image)}
            alt={product.title}
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.title}</h1>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            {(product.summary || "").split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
          <div className="productdisplay-right-price-new">
            {(product.content || "").split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
        <p className="productdisplay-right-category">
          <span>Category:</span> {product.category}
        </p>
        <p className="productdisplay-right-category">
          <span>Status:</span> {product.status}
        </p>
        <p className="productdisplay-right-category">
          <span>Tags:</span> {product.tags?.join(", ") || "None"}
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
