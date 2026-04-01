import React, { useContext } from "react";
import "./ProductDisplay.css";
// import star_icon from "../Assets/star_icon.png";
// import star_dull_icon from "../Assets/star_dull_icon.png";
import { AllContext } from "../../Context/AllContext";
import Caligulas1 from "../Assets/caligula's1.jpg"
import Caligulas2 from "../Assets/caligula's2.jpg"
import Caligulas3 from "../Assets/caligula's3.png"
import Caligulas4 from "../Assets/caligula's4.jpg"
import Caligulas5 from "../Assets/caligula's5.jpg"
import Caligulas6 from "../Assets/caligula's6.jpg"
import Caligulas7 from "../Assets/caligula's7.jpeg"
import Tessarakonteres1 from "../Assets/Tessarakonteres1.jpg"
import Tessarakonteres3 from "../Assets/Tessarakonteres3.jpg"
import Tessarakonteres5 from "../Assets/Tessarakonteres5.jpg"
import Tessarakonteres6 from "../Assets/Tessarakonteres6.jpg"
// import Tessarakonteres7 from "../Assets/Tessarakonteres7.jpg"
import Tessarakonteres8 from "../Assets/Tessarakonteres8.jpeg"
import Belyana1 from "../Assets/Belyana1.jpg"
import Belyana2 from "../Assets/Belyana2.jpg"
import Belyana3 from "../Assets/Belyana3.jpg"
import Belyana4 from "../Assets/Belyana4.jpg"
import Belyana5 from "../Assets/Belyana5.jpg"
import CTS2 from "../Assets/Chinese Treasure Ship(Zeng He's Ship)2.jpeg"
import CTS1 from "../Assets/Chinese Treasure Ship(Zeng He's Ship)1.jpg"
import CTS3 from "../Assets/Chinese Treasure Ship(Zeng He's Ship)3.jpg"
import CTS4 from "../Assets/Chinese Treasure Ship(Zeng He's Ship)4.jpg"
import Leon1 from "../Assets/Leontophoros1.jpg"
import Leon2 from "../Assets/Leontophoros2.jpg"
import Leon3 from "../Assets/Leontophoros3.png"
const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(AllContext);
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {/* <img src={product.image} alt="" /> */}
          {/* <img src={product.image} alt="" /> */}
          {/* <img src={product.image} alt="" /> */}
        </div>
        <div className="productdisplay-img">
          {/* <img className="productdisplay-main-img" src={product.image} alt="" /> */}
          {product.name === "Tessarakonteres (Ptolemy's Forty)" && (
            <>
              <img className="productdisplay-main-img" src={Tessarakonteres1} alt="" />
              <img className="productdisplay-main-img" src={Tessarakonteres3} alt="" />
              <img className="productdisplay-main-img" src={Tessarakonteres5} alt="" />
              <img className="productdisplay-main-img" src={Tessarakonteres6} alt="" />
              {/* <img className="productdisplay-main-img" src={Tessarakonteres7} alt="" /> */}
              <img className="productdisplay-main-img" src={Tessarakonteres8} alt="" />
            </>
          )}
          {/* <img className="productdisplay-main-img" src={product.image} alt="" /> */}
          {product.name === "Caligula's Floating Palace(Lake Nemi Ship)" && (
            <>
              <img className="productdisplay-main-img" src={Caligulas1} alt="" />
              <img className="productdisplay-main-img" src={Caligulas2} alt="" />
              <img className="productdisplay-main-img" src={Caligulas3} alt="" />
              <img className="productdisplay-main-img" src={Caligulas4} alt="" />
              <img className="productdisplay-main-img" src={Caligulas5} alt="" />
              <img className="productdisplay-main-img" src={Caligulas6} alt="" />
              <img className="productdisplay-main-img" src={Caligulas7} alt="" />
            </>
          )}
          {product.name === "Russian Belyana" && (
            <>
              <img className="productdisplay-main-img" src={Belyana1} alt="" />
              <img className="productdisplay-main-img" src={Belyana2} alt="" />
              <img className="productdisplay-main-img" src={Belyana3} alt="" />
              <img className="productdisplay-main-img" src={Belyana4} alt="" />
              <img className="productdisplay-main-img" src={Belyana5} alt="" />
            </>
          )}
          {product.name === "Chinese Treasure Ship(Zeng He's Ship)" && (
            <>
              <img className="productdisplay-main-img" src={CTS2} alt="" />
              <img className="productdisplay-main-img" src={CTS1} alt="" />
              <img className="productdisplay-main-img" src={CTS3} alt="" />
              <img className="productdisplay-main-img" src={CTS4} alt="" />
            </>
          )}
          {product.name === "Leontophoros(Lion Bearer)" && (
            <>
              <img className="productdisplay-main-img" src={Leon1} alt="" />
              <img className="productdisplay-main-img" src={Leon2} alt="" />
              <img className="productdisplay-main-img" src={Leon3} alt="" />
            </>
          )}
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        {/* <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div> */}
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            {product.old_price.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
          <div className="productdisplay-right-price-new">
            {product.new_price.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </div>
        {/* <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and with
          a round neckline and short sleeves, worn as an undershirt or outer
          garment.
        </div> */}
        {/* <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div> */}
        <button
          onClick={() => {
            addToCart(product.id);
          }}
        >
          Favorite It!
        </button>
        {/* <p className="productdisplay-right-category">
          <span>Category : </span>
          Women, T-shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags : </span>
          Modern, Latest
        </p> */}
      </div>
    </div>
  );
};

export default ProductDisplay;
