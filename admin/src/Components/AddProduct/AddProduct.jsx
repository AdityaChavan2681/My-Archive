import React, { useEffect, useMemo, useState } from 'react';
import './AddProduct.css';
import upload_icon from '../../assets/upload_area.svg';
import { createArchiveItem, fetchArchiveItemBySlug, updateArchiveItem, uploadArchiveImage } from '../../api';
import { useNavigate, useParams } from 'react-router-dom';

const VALID_CATEGORIES = new Set(["ships", "buildings", "others"]);
const VALID_STATUSES = new Set(["published", "draft"]);
const EMPTY_PRODUCT = {
  title: '',
  slug: '',
  image: '',
  category: 'ships',
  summary: '',
  content: '',
  tags: '',
  status: 'published',
};

const AddProduct = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const isEditMode = Boolean(slug);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [message, setMessage] = useState("");
  const [productDetails, setProductDetails] = useState(EMPTY_PRODUCT);
  const formHeading = useMemo(() => (isEditMode ? "Edit Archive Entry" : "Add Archive Entry"), [isEditMode]);
  const submitLabel = useMemo(() => {
    if (isSubmitting) {
      return isEditMode ? "Saving..." : "Creating...";
    }

    return isEditMode ? "Save Changes" : "Create Entry";
  }, [isEditMode, isSubmitting]);

  useEffect(() => {
    let ignore = false;

    const loadItem = async () => {
      if (!slug) {
        setProductDetails(EMPTY_PRODUCT);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setMessage("");

      try {
        const item = await fetchArchiveItemBySlug(slug);

        if (ignore) {
          return;
        }

        setProductDetails({
          title: item.title || '',
          slug: item.slug || '',
          image: item.images?.[0]?.url || '',
          category: item.category || 'ships',
          summary: item.summary || '',
          content: item.content || '',
          tags: Array.isArray(item.tags) ? item.tags.join(', ') : (item.tags || ''),
          status: item.status || 'published',
        });
      } catch (error) {
        if (!ignore) {
          setMessage(error.message);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    loadItem();

    return () => {
      ignore = true;
    };
  }, [slug]);

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

  const saveProduct = async () => {
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

      const payload = {
        ...productDetails,
        title: productDetails.title.trim(),
        slug: productDetails.slug.trim(),
        summary: productDetails.summary.trim(),
        content: productDetails.content.trim(),
        tags: productDetails.tags.trim(),
        image: imageUrl,
      };

      if (isEditMode) {
        const updatedItem = await updateArchiveItem(slug, payload);
        const nextSlug = updatedItem.slug || payload.slug || slug;

        setProductDetails({
          title: updatedItem.title || payload.title,
          slug: updatedItem.slug || payload.slug,
          image: updatedItem.images?.[0]?.url || imageUrl,
          category: updatedItem.category || payload.category,
          summary: updatedItem.summary || payload.summary,
          content: updatedItem.content || payload.content,
          tags: Array.isArray(updatedItem.tags) ? updatedItem.tags.join(', ') : payload.tags,
          status: updatedItem.status || payload.status,
        });
        setImage(null);
        setMessage("Archive entry updated successfully.");

        if (nextSlug !== slug) {
          navigate(`/editproduct/${encodeURIComponent(nextSlug)}`, { replace: true });
        }
      } else {
        await createArchiveItem(payload);
        setProductDetails(EMPTY_PRODUCT);
        setImage(null);
        setMessage("Archive entry created successfully.");
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='addproduct'>
      <h1>{formHeading}</h1>
      {isLoading ? <p>Loading archive entry...</p> : null}
      <div className="addproduct-itemfield">
        <p>Archive title</p>
        <input value={productDetails.title} onChange={changeHandler} type="text" name='title' placeholder='Type here' disabled={isLoading} />
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
            disabled={isLoading}
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
            disabled={isLoading}
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
          disabled={isLoading}
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Tags</p>
          <input value={productDetails.tags} onChange={changeHandler} type="text" name='tags' placeholder='ships, maritime, trade' disabled={isLoading} />
        </div>
        <div className="addproduct-itemfield">
          <p>Status</p>
          <select value={productDetails.status} onChange={changeHandler} name="status" className="addproduct-selector" disabled={isLoading}>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Archive Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className="addproduct-selector" disabled={isLoading}>
          <option value="ships">Ships</option>
          <option value="buildings">Buildings</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : (productDetails.image || upload_icon)} className="addproduct-thumnail-img" alt="" />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden disabled={isLoading} />
      </div>
      {message ? <p className={message.toLowerCase().includes("successfully") ? "addproduct-message-success" : "addproduct-message-error"}>{message}</p> : null}
      <button onClick={() => {saveProduct()}} className="addproduct-btn" disabled={isSubmitting || isLoading}>
        {submitLabel}
      </button>
    </div>
  )
}

export default AddProduct
