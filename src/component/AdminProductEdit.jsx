import React from "react";
import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails as productDetails,
  getProductAdmin,
} from "../redux/action/productAction";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MetaData from "./MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./SideBar";
import { PRODUCT_UPDATE_RESET } from "../redux/constant/product";
import { useNavigate, useParams } from "react-router-dom";
const AdminProductEdit = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [oldImages, setOldImages] = useState([]);
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const categories = [
    { value: "Laptop", label: "Laptop", checked: false },
    { value: "SmartPhones", label: "SmartPhones", checked: false },
    { value: "Appliance", label: "Appliance", checked: true },
    { value: "Grocery", label: "Grocery", checked: false },
    { value: "Electronics", label: "Electronics", checked: false },
  ];

  const { id } = useParams();

  const {
    loading,
    error: updateError,
    success,
    isUpdated,
  } = useSelector((state) => state.product);

  const { product, error } = useSelector((state) => state.productDetails);

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(productDetails(id));
    } else {
      product && product.name && setName(product.name);
      product && product.description && setDescription(product.description);
      product && product.price && setPrice(product.price);
      product && product.category && setCategory(product.category);
      product && product.Stock && setStock(product.Stock);
      product && product.images && setOldImages(product.images);
    }

    if (isUpdated) {
      toast.success("product updated successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch({ type: PRODUCT_UPDATE_RESET });
      setTimeout(()=>{
       navigate("/admin/products")
      }, 1500)
    }
  
    if (updateError) {
      toast.error("🦄 Wow so easy!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("product updated successfully ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      dispatch({ type: PRODUCT_UPDATE_RESET });
    }
  }, [dispatch, updateError, isUpdated, product, navigate]);

  const updateProductSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", stock);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(id, myForm));
  };

  const updateChanges = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagePreview([]);
    setOldImages([]);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
          setImagePreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <Fragment>
      <MetaData title="CREATE PRODUCT" />
      <ToastContainer />

      <div className="grid grid-cols-1 lg:grid-cols-5">
        <SideBar />
        <div className="col-span-4 border bg-gray-200 flex justify-center items-center">
          <form
            action=""
            encType="multipart/form-data"
            onSubmit={updateProductSubmit}
            className="flex flex-col gap-3 bg-white w-full lg:w-auto  p-12"
          >
            <h1 className="text-2xl font-bold">Create Product</h1>
            <div className="relative">
              <SpellcheckIcon className="absolute top-2 left-1 opacity-40" />
              <input
                type="text"
                placeholder="Product Name"
                className="w-full pl-8"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="relative">
              <AttachMoneyIcon className="absolute top-2 left-1 opacity-40" />
              <input
                type="number"
                placeholder="Price"
                required
                className="w-full pl-8"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="relative">
              <DescriptionIcon className="absolute left-1 top-2 opacity-40" />
              <textarea
                type="number"
                placeholder="Product Description"
                className="w-full pl-8"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="relative">
              <AccountTreeIcon className="absolute top-2 left-1 opacity-40" />
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="w-full pl-8"
              >
                <option value="">Choose Category</option>
                {categories.map((item) => {
                  return (
                    <option key={item} value={item.value}>
                      {item.value}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="relative">
              <StorageIcon className="absolute top-2 left-1 opacity-40" />
              <input
                className="w-full pl-8"
                type="number"
                placeholder="Stock"
                value={stock}
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div>
              <input
                className="fileUpload cursor-pointer hover:bg-gray-400 bg-[tomato] text-white w-full"
                name="product"
                type="file"
                accept="image/*"
                onChange={updateChanges}
                multiple
              />
            </div>

            <div className="flex gap-1 overflow-x-scroll hideOverflow w-72">
              {oldImages &&
                oldImages.map((image, index) => {
                  return (
                    <img
                      src={image.url}
                      alt="Product Images Preview"
                      key={index}
                      className="w-12 h-12 rounded-full"
                    />
                  );
                })}
            </div>
            <div className="flex gap-1 overflow-x-scroll hideOverflow w-72">
              {imagePreview.map((image, index) => {
                return (
                  <img
                    src={image}
                    alt="Product Preview"
                    key={index}
                    className="w-12 h-12 rounded-full"
                  />
                );
              })}
            </div>
            <Button
              type="submit"
              disabled={loading ? true : false}
              id="create-admin-btn"
            >
              UPDATE
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminProductEdit;
