import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import { deleteArchiveItem, fetchArchiveItems } from '../../api';


const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [deletingSlug, setDeletingSlug] = useState("");

  const fetchInfo = async () => {
    const data = await fetchArchiveItems();
    setAllProducts(data.items || []);
  };

  useEffect(() => {
    fetchInfo().catch((requestError) => setError(requestError.message));
  }, []);

  const handleDelete = async (slug) => {
    const confirmed = window.confirm(`Delete archive entry "${slug}"?`);

    if (!confirmed) {
      return;
    }

    setError("");
    setStatusMessage("");
    setDeletingSlug(slug);

    try {
      await deleteArchiveItem(slug);
      setStatusMessage("Archive entry deleted successfully.");
      setAllProducts((current) => current.filter((product) => product.slug !== slug));
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setDeletingSlug("");
    }
  };

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
        <p>Actions</p>
      </div>
      <div className="listproduct-allproducts">
        {error ? <p>{error}</p> : null}
        {statusMessage ? <p className="listproduct-status-message">{statusMessage}</p> : null}
        <hr />
        {allproducts.map((product, index) => {
          const imageUrl = product.images?.[0]?.url || '';

          return (
            <React.Fragment key={product._id || product.slug || index}>
              <div className="listproduct-format-main listproduct-format">
                <img src={imageUrl} alt="" className="listproduct-product-icon" />
                <p>{product.title}</p>
                <p>{product.summary || '-'}</p>
                <p>{product.status}</p>
                <p>{product.category}</p>
                <p>{product.slug}</p>
                <div className="listproduct-actions">
                  <button
                    type="button"
                    className="listproduct-delete-button"
                    onClick={() => handleDelete(product.slug)}
                    disabled={deletingSlug === product.slug}
                  >
                    {deletingSlug === product.slug ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
              <hr />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  )
}

export default ListProduct
