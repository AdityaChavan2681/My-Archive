import React, { useContext, useEffect, useState } from "react";
import { AllContext } from "../Context/AllContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrum/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import { RelatedProducts } from "../Components/RelatedProducts/RelatedProducts";
import { frontendApi } from "../api";
const Product = () => {
  const { all_product } = useContext(AllContext);
  const { slugOrId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setProduct(null);

    const cachedProduct = all_product.find(
      (item) => String(item.id) === String(slugOrId) || item.slug === slugOrId
    );

    if (cachedProduct) {
      setProduct(cachedProduct);
      return;
    }

    frontendApi
      .fetchItem(slugOrId)
      .then((response) => setProduct(response.item))
      .catch((requestError) => setError(requestError.message));
  }, [all_product, slugOrId]);

  if (error) {
    return <div style={{ padding: "40px" }}>{error}</div>;
  }

  if (!product) {
    return <div style={{ padding: "40px" }}>Loading archive entry...</div>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <RelatedProducts currentProduct={product} />
    </div>
  );
};

export default Product;
