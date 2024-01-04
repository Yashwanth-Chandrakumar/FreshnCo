import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  imgurl: string;
  seller: string;
  price: number;
  classification: string;
}

const Viewproduct: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    id: 0,
    name: "",
    description: "",
    imgurl: "",
    seller: "",
    price: 0,
    classification: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadProduct();
  }, []);

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
          <h2 className="text-center m-4">Product Details</h2>

          <div className="card">
            <div className="card-header">
              Details of product id: {product.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name:</b> {product.name}
                </li>
                <li className="list-group-item">
                  <b>Description:</b> {product.description}
                </li>
                <li className="list-group-item">
                  <b>Image URL:</b> {product.imgurl}
                </li>
                <li className="list-group-item">
                  <b>Seller:</b> {product.seller}
                </li>
                <li className="list-group-item">
                  <b>Price:</b> {product.price}
                </li>
                <li className="list-group-item">
                  <b>Classification:</b> {product.classification}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/admin"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Viewproduct;
