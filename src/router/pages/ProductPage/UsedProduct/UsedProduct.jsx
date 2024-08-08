import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../store/thunkFunctions";

const UsedProduct = () => {
  const { id } = useParams();
  const [book, setBook] = useState();
  const [imagesCount, setImagesCount] = useState(0);
  const [showBtn, setShowBtn] = useState(false);
  const [moveImage, setMoveImage] = useState(0);

  const getBook = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}products/used/detail/:id`,
        { id }
      );
      setBook(response.data.product);
      setImagesCount(response.data.product.images.length);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMoveLeft = () => {
    if (moveImage === 0) {
      return;
    }
    setMoveImage((prev) => prev + 550);
  };

  const handleMoveRight = () => {
    if (moveImage === -550 * (imagesCount - 1)) {
      return;
    }
    setMoveImage((prev) => prev - 550);
  };

  useEffect(() => {
    getBook();
    if (imagesCount > 1) {
      setShowBtn(true);
    }
  }, [imagesCount]);

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(addToCart({ productId: id }));
  };

  return (
    <section className="usedproduct-detail">
      <div className="usedproduct-detail-box">
        <div className="usedproduct-imgbox">
          {book?.images.map((image, index) => (
            <div
              key={index}
              style={{ transform: `translateX(${moveImage}px)` }}
            >
              <img src={`${process.env.REACT_APP_BASE_URL}${image}`} />
            </div>
          ))}
        </div>
        <div className="usedproduct-textbox">
          <h1>{book?.title}</h1>
          <h2>{book?.description}</h2>
        </div>
      </div>
      {showBtn ? (
        <div>
          <button onClick={handleMoveLeft}>←</button>
          <button onClick={handleMoveRight}>→</button>
        </div>
      ) : null}

      <div className="usedproduct-btn">
        <h4>{book?.discount}원</h4>
        <button>수량</button>
        <button onClick={handleClick}>장바구니 담기</button>
        <button>구매하기기</button>
      </div>
    </section>
  );
};

export default UsedProduct;
