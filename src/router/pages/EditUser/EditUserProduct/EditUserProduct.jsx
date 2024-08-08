import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EditUserProduct = () => {
  const user = useSelector((state) => state.user?.userData);
  const { id } = user;
  const [products, setProducts] = useState([]);
  const getProduct = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}users/edit/product`,
        {
          id,
        }
      );
      setProducts(response.data.product);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(products);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <section className="edit_user_product">
      <div className="edit_user_product_box">
        {products.length != 0 ? (
          <div className="item_box">
            {products.map((item) => (
              <Link to={`/users/edit/product/${item._id}`}>
                <div key={item._id}>
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}${item.images[0]}`}
                    alt=""
                  />
                  <h1>{item.title}</h1>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <h1 style={{ fontSize: 50, padding: 20 }}>
            업로드 한 상품이 없습니다
          </h1>
        )}
      </div>
    </section>
  );
};

export default EditUserProduct;
