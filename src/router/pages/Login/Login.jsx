import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../store/thunkFunctions";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();

  const onSubmit = async ({ email, password }) => {
    const body = {
      email,
      password,
    };

    dispatch(loginUser(body));
    reset();
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

  return (
    <section>
      <div className="join">
        <div className="join-header">
          <h1>로그인</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
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

          <button type="submit">로그인 하기</button>
        </form>
        <p>
          아이디가 없으신가요? <a href="/join"> 회원가입</a>
        </p>
      </div>
    </section>
  );
};

export default Login;
