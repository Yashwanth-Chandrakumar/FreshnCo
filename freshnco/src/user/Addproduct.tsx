import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Product {
  name: string;
  description: string;
  imgurl: string;
  seller: string;
  price: number;
}

const AddProduct: React.FC = () => {
  let navigate = useNavigate();

  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    imgurl: "",
    seller: "",
    price: 0,
  });

  const { name, description, imgurl, seller, price } = product;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/product", product);
    navigate("/admin");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Product</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Product Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter product name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Description" className="form-label">
                Product Description
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter product description"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ImageURL" className="form-label">
                Image URL
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter image URL"
                name="imgurl"
                value={imgurl}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Seller" className="form-label">
                Seller
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter seller name"
                name="seller"
                value={seller}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Price" className="form-label">
                Price
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter product price"
                name="price"
                value={price}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/admin">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
