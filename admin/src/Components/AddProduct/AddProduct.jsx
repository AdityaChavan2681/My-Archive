import React, { useState } from 'react';
import './AddProduct.css';
import upload_icon from '../../assets/upload_area.svg';
import { createArchiveItem, uploadArchiveImage } from '../../api';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [productDetails, setProductDetails] = useState({
    title: '',
    slug: '',
    image: '',
    category: 'ships',
    summary: '',
    content: '',
    tags: '',
    status: 'published',
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({...productDetails, [e.target.name]:e.target.value});
  };

  const Add_Product = async () => {
    setMessage("");
    setIsSubmitting(true);

    try {
      let imageUrl = productDetails.image;

      if (image) {
        const responseData = await uploadArchiveImage(image);
        imageUrl = responseData.image_url;
      }

      await createArchiveItem({
        ...productDetails,
        image: imageUrl,
      });

      setProductDetails({
        title: '',
        slug: '',
        image: '',
        category: 'ships',
        summary: '',
        content: '',
        tags: '',
        status: 'published',
      });
      setImage(null);
      setMessage("Archive entry created successfully.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='addproduct'>
      <div className="addproduct-itemfield">
        <p>Archive title</p>
        <input value={productDetails.title} onChange={changeHandler} type="text" name='title' placeholder='Type here' />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Slug</p>
          <input
            value={productDetails.slug}
            onChange={changeHandler}
            type="text"
            name='slug'
            placeholder='optional-clean-url'
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Summary</p>
          <textarea
            value={productDetails.summary}
            onChange={changeHandler}
            name="summary"
            placeholder="Type here"
            rows={4}
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Content</p>
        <textarea
          value={productDetails.content}
          onChange={changeHandler}
          name="content"
          placeholder="Type here"
          rows={6}
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Tags</p>
          <input value={productDetails.tags} onChange={changeHandler} type="text" name='tags' placeholder='ships, maritime, trade' />
        </div>
        <div className="addproduct-itemfield">
          <p>Status</p>
          <select value={productDetails.status} onChange={changeHandler} name="status" className="addproduct-selector">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Archive Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className="addproduct-selector">
          <option value="ships">Ships</option>
          <option value="buildings">Buildings</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image):upload_icon} className="addproduct-thumnail-img" alt="" />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      </div>
      {message ? <p>{message}</p> : null}
      <button onClick={() => {Add_Product()}} className="addproduct-btn" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Create Entry"}
      </button>
    </div>
  )
}

export default AddProduct
