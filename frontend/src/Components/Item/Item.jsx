import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import { frontendApi } from "../../api";
const Item = (props) => {
  const imageUrl = frontendApi.getImageUrl(props.image);

  return (
    <div className="item">
      <Link
        className="item-card"
        to={`/product/${props.slug || props.id}`}
        onClick={() => window.scrollTo(0, 0)}
      >
        <div className="item-media">
          {imageUrl ? (
            <img className="item-background-image" src={imageUrl} alt={props.title} />
          ) : null}
          <div className="item-overlay">
            <p>{props.title}</p>
            {props.summary ? <small>{props.summary}</small> : null}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Item;
