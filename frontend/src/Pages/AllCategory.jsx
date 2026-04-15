import React, { useEffect, useState } from "react";
import "./CSS/AllCategory.css";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
import { frontendApi } from "../api";
const AllCategory = (props) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadCategoryItems = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await frontendApi.fetchItems(
          `?category=${props.category}&limit=20&sort=-createdAt`
        );

        if (isMounted) {
          setItems(response.data);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadCategoryItems();

    return () => {
      isMounted = false;
    };
  }, [props.category]);

  return (
    <div className="all-category">
      <img className="allcategory-banner" src={props.banner} alt="" />
      <div className="allcategory-indexSort">
        <p>
          <span>Showing {items.length}</span> archive entries
        </p>
        <div className="allcategory-sort">
          Browse by category <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="allcategory-products">
        {isLoading ? <p>Loading archive entries...</p> : null}
        {error ? <p>{error}</p> : null}
        {!isLoading && !error && items.length === 0 ? <p>No archive entries found yet.</p> : null}
        {items.map((item, idx) => (
          <Item
            key={idx}
            id={item.id}
            slug={item.slug}
            title={item.title}
            image={item.image}
            summary={item.summary}
          />
        ))}
      </div>
      <div className="allcategory-loadmore">Explore More</div>
    </div>
  );
};

export default AllCategory;
