import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import { frontendApi } from "../../api";
const Item = (props) => {
  return (
    <div className="item">
      <Link to={`/product/${props.slug || props.id}`}>
        <img onClick={() => window.scrollTo(0, 0)} src={frontendApi.getImageUrl(props.image)} alt={props.title} />
      </Link>
      <p>{props.title}</p>
      {props.summary ? <small>{props.summary}</small> : null}
      <div className="item-prices">
      </div>
    </div>
  );
};

export default Item;
