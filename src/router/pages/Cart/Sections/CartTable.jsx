import React from "react";

const CartTable = ({ products, onRemoveItem }) => {
  const renderCartImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `${process.env.REACT_APP_BASE_URL}${image}`;
    }
  };

  const renderItems =
    products.length > 0 &&
    products.map((product) => (
      <tr key={product._id}>
        <td>
          <img
            style={{ width: 100 }}
            src={renderCartImage(product.images)}
            alt=""
          />
        </td>
        <td>{product.quantity}개</td>
        <td>{product.discount}원</td>
        <td>
          <button onClick={() => onRemoveItem(product._id)}>지우기</button>
        </td>
      </tr>
    ));

  return (
    <table>
      <thead>
        <tr>
          <th>사진</th>
          <th>개수</th>
          <th>가격</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>{renderItems}</tbody>
    </table>
  );
};

export default CartTable;
