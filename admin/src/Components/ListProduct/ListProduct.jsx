import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import { fetchArchiveItems } from '../../api';


const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [error, setError] = useState("");

  const fetchInfo = async () => {
    const data = await fetchArchiveItems();
    setAllProducts(data.items || []);
  };

  useEffect(() => {
    fetchInfo().catch((requestError) => setError(requestError.message));
  }, []);

  return (
    <div className='list-product'>
      <h1>Archive Entry List</h1>
      <div className="listproduct-format-main">
        <p>Preview</p>
        <p>Title</p>
        <p>Summary</p>
        <p>Status</p>
        <p>Category</p>
        <p>Slug</p>
      </div>
      <div className="listproduct-allproducts">
        {error ? <p>{error}</p> : null}
        <hr />
        {allproducts.map((product, index) => {
          const imageUrl = product.images?.[0]?.url || '';

          return <> <div key={index} className="listproduct-format-main listproduct-format">
            <img src={imageUrl} alt="" className="listproduct-product-icon" />
            <p>{product.title}</p>
            <p>{product.summary || '-'}</p>
            <p>{product.status}</p>
            <p>{product.category}</p>
            <p>{product.slug}</p>
          </div>
            <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default ListProduct
