import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditPassword = () => {
  const user = useSelector((state) => state.user?.userData);
  console.log(user);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();

  const onSubmit = async ({ email, name }) => {
    const id = user.id;
    const body = {
      id,
      email,
      name,
    };

    try {
      //   await dispatch(editUser(body)).unwrap();
      reset();
      navigate("/");
    } catch (error) {
      console.error(error);
    }

    // navigate("/");
  };

  const userName = {
    // required: "필수 필드입니다.",
  };

  const userEmail = {
    // required: "필수 필드입니다.",
  };

  return (
    <section>
      <div className="join">
        <div className="join-header">
          <h1>비밀 번호 변경</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            id="name"
            placeholder={user.name}
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
            placeholder={user.email}
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

          <button type="submit">회원 정보 수정</button>
        </form>
        <p>
          <a href="/login">비밀번호 변경</a>
        </p>
      </div>
    </section>
  );
};

export default EditPassword;
