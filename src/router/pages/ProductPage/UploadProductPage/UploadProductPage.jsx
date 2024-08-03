import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../../utils/axios";
import { toast } from "react-toastify";
import FileUpload from "../../../../components/FileUpload";

const categorys = [
  { key: 1, value: "자기개발" },
  { key: 2, value: "소설" },
  { key: 3, value: "문학" },
  { key: 4, value: "경제" },
  { key: 5, value: "인문" },
];

const UploadProductPage = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    discount: 0,
    category: 1,
    images: [],
  });

  const userData = useSelector((state) => state.user?.userData);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImages = (newImages) => {
    setProduct((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      writer: userData.id,
      ...product,
    };

    try {
      await axiosInstance.post("/products/upload", body);
      navigate("/");
      toast.success("상품 업로드가 완료됐습니다");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="uploadproductpage">
      <div className="uploadproductpage_title">
        <h1>상품 업로드 하기</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <FileUpload images={product.images} onImageChange={handleImages} />
        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            name="title"
            onChange={handleChange}
            required
            value={product.title}
          />
        </div>

        <div>
          <label htmlFor="description">설명</label>
          <input
            type="text"
            name="description"
            id="description"
            required
            onChange={handleChange}
            value={product.description}
          />
        </div>

        <div>
          <label htmlFor="discount">가격</label>
          <input
            type="number"
            id="discount"
            name="discount"
            required
            onChange={handleChange}
            value={product.discount}
          />
        </div>

        <div>
          <label htmlFor="category">카테고리</label>
          <select
            name="category"
            id="category"
            value={product.category}
            onChange={handleChange}
          >
            {categorys.map((category) => (
              <option key={category.key} value={category.key}>
                {category.value}
              </option>
            ))}
          </select>
        </div>

        <button className="make-btn" type="submit">
          생성하기
        </button>
      </form>
    </section>
  );
};

export default UploadProductPage;
