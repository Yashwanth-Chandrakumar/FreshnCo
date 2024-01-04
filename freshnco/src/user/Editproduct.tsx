import axios from "axios";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  imgurl: string;
  seller: string;
  price: number;
  classification: string;
}

const Editproduct: React.FC = () => {
  let navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    imgurl: "",
    seller: "",
    price: 0,
    classification: "",
  });

  const { name, description, imgurl, seller, price, classification } = product;

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadProduct();
  }, []);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await axios.put(`https://freshnco.onrender.com/product/${id}`, product);
    navigate("/admin");
  };

  const loadProduct = async () => {
    try {
      const result = await axios.get<Product>(
        `https://freshnco.onrender.com/product/${id}`
      );
      setProduct(result.data);
    } catch (error) {
      console.error("Error loading product:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Product</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <input
                type="text"
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
                type="text"
                className="form-control"
                placeholder="Enter product image URL"
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
                type="text"
                className="form-control"
                placeholder="Enter product seller"
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
                type="number"
                className="form-control"
                placeholder="Enter product price"
                name="price"
                value={price}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Classification" className="form-label">
                Classification
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product classification"
                name="classification"
                value={classification}
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

export default Editproduct;
