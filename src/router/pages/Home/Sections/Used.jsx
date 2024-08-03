import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axios";

const Used = () => {
  const [product, setProduct] = useState();

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
      setProduct(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <section>
      <div></div>
    </section>
  );
};

export default Used;
