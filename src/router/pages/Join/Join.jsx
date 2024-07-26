import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { joinUser } from "../../../store/thunkFunctions";

const Join = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();

  const onSubmit = ({ email, name, password, password2 }) => {
    const body = {
      email,
      name,
      password,
      password2,
    };
    dispatch(joinUser(body));
    reset();
  };

  const userName = {
    required: "필수 필드입니다.",
  };

  const userEmail = {
    required: "필수 필드입니다.",
  };

  const userPassword = {
    required: "필수 필드입니다.",
    minLength: {
      value: 6,
      message: "최소 6자입니다.",
    },
  };

  const userPassword2 = {
    required: "필수 필드입니다.",
    minLength: {
      value: 6,
      message: "최소 6자입니다.",
    },
  };
  return (
    <section>
      <div className="join">
        <div className="join-header">
          <h1>회원가입</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            placeholder="이름을 입력하세요"
            {...register("name", userName)}
          />
          {errors?.name && (
            <div>
              <span
                style={{
                  color: "red",
                  fontSize: 18,
                  marginTop: 4,
                  display: "inline-block",
                }}
              >
                {errors.name.message}
              </span>
            </div>
          )}

          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력하세요"
            {...register("email", userEmail)}
          />
          {errors?.email && (
            <div>
              <span
                style={{
                  color: "red",
                  fontSize: 18,
                  marginTop: 4,
                  display: "inline-block",
                }}
              >
                {errors.email.message}
              </span>
            </div>
          )}

          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요"
            {...register("password", userPassword)}
          />
          {errors?.password && (
            <div>
              <span
                style={{
                  color: "red",
                  fontSize: 18,
                  marginTop: 4,
                  display: "inline-block",
                }}
              >
                {errors.password.message}
              </span>
            </div>
          )}

          <label htmlFor="password2">비밀번호 확인</label>
          <input
            type="password"
            id="password2"
            placeholder="비밀번호를 다시 입력하세요"
            {...register("password2", userPassword2)}
          />
          {errors?.password2 && (
            <div>
              <span
                style={{
                  color: "red",
                  fontSize: 18,
                  marginTop: 4,
                  display: "inline-block",
                }}
              >
                {errors.password2.message}
              </span>
            </div>
          )}

          <button type="submit">회원가입 하기</button>
        </form>
        <p>
          아이디가 있으신가요? <a href="/login">로그인</a>
        </p>
      </div>
    </section>
  );
};

export default Join;
