import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartItems,
  payProducts,
  removeCartItem,
} from "../../../store/thunkFunctions";
import CartTable from "./Sections/CartTable";

const CartPage = () => {
  const userData = useSelector((state) => state.user?.userData);
  const cartDetail = useSelector((state) => state.user?.cartDetail);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let cartItemIds = [];

    if (userData?.cart && userData.cart.length > 0) {
      userData.cart.forEach((item) => {
        cartItemIds.push(item.id);
      });

      const body = {
        cartItemIds,
        userCart: userData.cart,
      };
      dispatch(getCartItems(body));
    }
  }, [dispatch]);

  useEffect(() => {
    calculateTotal(cartDetail);
  }, [cartDetail]);

  const calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.map((item) => (total += item.discount * item.quantity));
    setTotal(total);
  };

  const handleRemoveCartItem = (productId) => {
    dispatch(removeCartItem(productId));
  };

  const handlePaymentClick = () => {
    dispatch(payProducts({ cartDetail }));
  };

  return (
    <section>
      <div>
        <h2>장바구니</h2>
      </div>
      {cartDetail?.length > 0 ? (
        <>
          <CartTable
            products={cartDetail}
            onRemoveItem={handleRemoveCartItem}
          />
          <div>
            <p>
              <span>합계</span>
              {total}원
            </p>
            <button onClick={handlePaymentClick}>결제하기</button>
          </div>
        </>
      ) : (
        <p>장바구니 비었음</p>
      )}
    </section>
  );
};

export default CartPage;
