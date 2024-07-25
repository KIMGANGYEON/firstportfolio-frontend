import React, { useRef, useState } from "react";

const Navbar = () => {
  const moreItem = useRef(null);
  const [show, setShow] = useState(true);

  const showMoreItem = () => {
    moreItem.current.classList.toggle("showMoreItem");
    setShow((prev) => !prev);
  };

  return (
    <section className="navbar">
      <div className="navbar-more" ref={moreItem}>
        <div className="navbar-more-header" onClick={showMoreItem}>
          {show ? <h1>더보기 ←</h1> : <h1>더보기 →</h1>}
        </div>
        <div className="navbar-more-item">
          <h2>내 정보 수정</h2>
          <h2>상품 업로드</h2>
          <h2>장바구니</h2>
          <h2>주문내역</h2>
        </div>
      </div>
      <div className="navbar-box">
        <div className="navbar-header">
          <h1>
            <a href="/">Book</a>
          </h1>
        </div>
        <div className="navbar-item">
          <h2>
            <a href="/login">로그인</a>
          </h2>
          <h2>
            <a href="/join">회원가입</a>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
