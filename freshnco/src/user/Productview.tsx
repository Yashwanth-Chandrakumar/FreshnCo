import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  imgurl: string;
  seller: string;
  price: number;
}

const Productview: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { id } = useParams();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const result = await axios.get<Product[]>("http://localhost:8080/products");
      setProducts(result.data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const deleteProduct = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:8080/product/${productId}`);
      loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Products</h1>
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Image URL</th>
              <th scope="col">Seller</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.imgurl}</td>
                <td>{product.seller}</td>
                <td>{product.price}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewproduct/${product.id}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editproduct/${product.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/addproduct`}
                  >
                    Add product
                  </Link>
          </div>
    </div>
  );
};

export default Productview;
