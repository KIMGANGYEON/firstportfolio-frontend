import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editUserPassword } from "../../../../store/thunkFunctions";

const EditPassword = () => {
  const user = useSelector((state) => state.user?.userData);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();

  const onSubmit = async ({ oldpassword, newpassword, newpassword2 }) => {
    const id = user.id;
    const body = {
      id,
      oldpassword,
      newpassword,
      newpassword2,
    };

    try {
      await dispatch(editUserPassword(body)).unwrap();
      reset();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const oldPassword = {
    required: "필수 필드입니다.",
    minLength: {
      value: 6,
      message: "최소 6자 입니다",
    },
  };

  const newPassword = {
    required: "필수 필드입니다.",
    minLength: {
      value: 6,
      message: "최소 6자 입니다",
    },
  };

  const newPassword2 = {
    required: "필수 필드입니다.",
    minLength: {
      value: 6,
      message: "최소 6자 입니다",
    },
  };

  return (
    <section>
      <div className="join">
        <div className="join-header">
          <h1>비밀번호 변경</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="oldpassword">기존 비밀번호</label>
          <input
            type="password"
            id="oldpassword"
            {...register("oldpassword", oldPassword)}
          />
          {errors?.oldpassword && (
            <div>
              <span
                style={{
                  color: "red",
                  fontSize: 18,
                  marginTop: 4,
                  display: "inline-block",
                }}
              >
                {errors.oldpassword.message}
              </span>
            </div>
          )}

          <label htmlFor="newpassword">새로운 비밀번호</label>
          <input
            type="password"
            id="newpassword"
            {...register("newpassword", newPassword)}
          />
          {errors?.newpassword && (
            <div>
              <span
                style={{
                  color: "red",
                  fontSize: 18,
                  marginTop: 4,
                  display: "inline-block",
                }}
              >
                {errors.newpassword.message}
              </span>
            </div>
          )}

          <label htmlFor="newpassword2">새로운 비밀번호 확인</label>
          <input
            type="password"
            id="newpassword2"
            {...register("newpassword2", newPassword2)}
          />
          {errors?.newpassword2 && (
            <div>
              <span
                style={{
                  color: "red",
                  fontSize: 18,
                  marginTop: 4,
                  display: "inline-block",
                }}
              >
                {errors.newpassword2.message}
              </span>
            </div>
          )}

          <button type="submit">비밀번호 변경</button>
        </form>
      </div>
    </section>
  );
};

export default EditPassword;
