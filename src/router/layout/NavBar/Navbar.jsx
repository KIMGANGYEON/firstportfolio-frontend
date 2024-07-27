import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../store/thunkFunctions";

const Navbar = () => {
  const moreItem = useRef(null);
  const isAuth = useSelector((state) => state.user?.isAuth);
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showMoreItem = () => {
    moreItem.current.classList.toggle("showMoreItem");
    setShow((prev) => !prev);
  };

  const handleLogout = async () => {
    dispatch(logoutUser()).then(() => {
      navigate("/");
    });
  };

  return (
    <section className="navbar">
      {isAuth && (
        <div className="navbar-more" ref={moreItem}>
          <div className="navbar-more-header" onClick={showMoreItem}>
            {show ? <h1>더보기 ←</h1> : <h1>더보기 →</h1>}
          </div>
          <div className="navbar-more-item">
            <h2>
              <a href="/edituser">내 정보 수정</a>
            </h2>
            <h2>내 상품 수정</h2>
            <h2>장바구니</h2>
            <h2>주문내역</h2>
          </div>
        </div>
      )}
      <div className="navbar-box">
        <div className="navbar-header">
          <h1>
            <a href="/">Book</a>
          </h1>
        </div>
        <div className="navbar-item">
          <h2>
            {isAuth ? (
              <a onClick={handleLogout}>로그아웃</a>
            ) : (
              <a href="/login">로그인</a>
            )}
          </h2>
          <h2>{isAuth ? null : <a href="/join">회원가입</a>}</h2>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
