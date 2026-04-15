import React, { useEffect, useState } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import { frontendApi } from '../../api'

export const RelatedProducts = ({ currentProduct }) => {
  const [relatedItems, setRelatedItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadRelatedItems = async () => {
      setError("");

      try {
        const response = await frontendApi.fetchItems(
          `?category=${currentProduct.category}&limit=6&sort=-createdAt`
        );
        const filteredItems = response.data
          .filter((item) => item.slug !== currentProduct.slug && item.id !== currentProduct.id)
          .slice(0, 4);

        if (isMounted) {
          setRelatedItems(filteredItems);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message);
        }
      }
    };

    loadRelatedItems();

    return () => {
      isMounted = false;
    };
  }, [currentProduct.category, currentProduct.id, currentProduct.slug]);

  return (
    <div className='relatedproducts'>
      <h1>Related Archive Entries</h1>
      <hr />
      {error ? <p>{error}</p> : null}
      <div className="relatedproducts-item">
        {relatedItems.map((item,i)=>{
          return <Item key={i} id={item.id} slug={item.slug} title={item.title} image={item.image} summary={item.summary} />
        })}
      </div>
    </div>
  )
}
