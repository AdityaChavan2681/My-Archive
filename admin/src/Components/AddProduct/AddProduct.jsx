import React, { useState } from 'react';
import './AddProduct.css';
import upload_icon from '../../assets/upload_area.svg';
import { createArchiveItem, uploadArchiveImage } from '../../api';

const VALID_CATEGORIES = new Set(["ships", "buildings", "others"]);
const VALID_STATUSES = new Set(["published", "draft"]);

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

  const validateForm = () => {
    const title = productDetails.title.trim();
    const slug = productDetails.slug.trim();
    const summary = productDetails.summary.trim();

    if (!title) {
      return "title is required";
    }

    if (title.length < 3) {
      return "title must be at least 3 characters long";
    }

    if (slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return "slug may only contain lowercase letters, numbers, and hyphens";
    }

    if (!VALID_CATEGORIES.has(productDetails.category)) {
      return "select a valid archive category";
    }

    if (!VALID_STATUSES.has(productDetails.status)) {
      return "select a valid status";
    }

    if (summary.length > 300) {
      return "summary must be 300 characters or fewer";
    }

    return "";
  };

  const Add_Product = async () => {
    setMessage("");
    const validationError = validateForm();

    if (validationError) {
      setMessage(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = productDetails.image;

      if (image) {
        const responseData = await uploadArchiveImage(image);
        imageUrl = responseData.image_url;
      }

      await createArchiveItem({
        ...productDetails,
        title: productDetails.title.trim(),
        slug: productDetails.slug.trim(),
        summary: productDetails.summary.trim(),
        content: productDetails.content.trim(),
        tags: productDetails.tags.trim(),
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
