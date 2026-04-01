import React, { useContext } from "react";
import "./CSS/AllCategory.css";
import { AllContext } from "../Context/AllContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
const AllCategory = (props) => {
  const { all_product } = useContext(AllContext);
  return (
    <div className="all-category">
      <img className="allcategory-banner" src={props.banner} alt="" />
      <div className="allcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="allcategory-sort">
          Sort bt <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="allcategory-products">
        {all_product.map((item, idx) => {
          if (props.category === item.category) {
            return (
              <Item
                key={idx}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="allcategory-loadmore">Explore More</div>
    </div>
  );
};

export default AllCategory;
