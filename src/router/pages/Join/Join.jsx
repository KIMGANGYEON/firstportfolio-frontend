import React from "react";

const Join = () => {
  return (
    <section>
      <div className="join">
        <div className="join-header">
          <h1>회원가입</h1>
        </div>
        <form action="">
          <label htmlFor="name">이름</label>
          <input type="text" id="name" placeholder="이름을 입력하세요" />

          <label htmlFor="email">이메일</label>
          <input type="email" id="email" placeholder="이메일을 입력하세요" />

          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
          />

          <label htmlFor="password2">비밀번호 확인</label>
          <input
            type="password"
            id="password2"
            placeholder="비밀번호를 다시 입력하세요"
          />

          <button>회원가입 하기</button>
        </form>
        <p>
          아이디가 있으신가요? <a href="/login">로그인</a>
        </p>
      </div>
    </section>
  );
};

export default Join;
