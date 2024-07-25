import React from "react";

const NotFound = () => {
  return (
    <section className="notfound">
      <div className="notfound-box">
        <h1>죄송합니다 해당 페이지를 찾을 수 없습니다</h1>
        <div className="notfound-button">
          <button>
            <a href="/">홈으로 돌아가기</a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
