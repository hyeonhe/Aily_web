import { FormEvent } from "react";
import useInput from "@/hooks/use-input";
import SubmitButton from "../UI/SubmitButton";
import useFormValidation from "@/hooks/use-formValidation";
import {
  FormData,
  Errors,
  ChangeHandler,
  UpdateFormData,
} from "@/hooks/use-formValidation";
import ErrorText from "@/components/UI/ErrorText";
import axios from "axios";
import { validationRules } from "@/app/join/validation_rules";
import Title from "@/components/MyPage/Title";

const li = "flex flex-col mb-3";
const input =
  "border-[1px] border-solid border-[#a0a0a0] rounded-lg px-3 w-full h-10";
const label = "text-[20px]";

export default function ChangePassword() {
  const password = useInput("");
  const checkNewPassword = useInput("");

  const [formData, errors, onChangeHandler]: [
    FormData,
    Errors,
    ChangeHandler,
    UpdateFormData
  ] = useFormValidation(validationRules);

  const changePasswordHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 서버에서 가져온 비밀번호와 같으면 비밀번호 바꿈
    if (errors.password) {
      alert("비밀번호 형식이 맞지 않습니다.");
    } else if (formData.password !== checkNewPassword.value) {
      alert("바꾸려는 비밀번호가 일치하지 않습니다.");
    } else {
      axios
        .post(`/member/ChPwd/ch`, {
          email:
            sessionStorage.getItem("user_email") ||
            localStorage.getItem("user_email"),
          password: formData.password,
        })
        .then((response) => {
          if (response.data === "Clear") {
            console.log(response.data);
            alert("비밀번호가 변경되었습니다.");
            document.location.href = "/my-page/dashboard";
          } else {
            alert("비밀번호 변경에 실패하였습니다.");
          }
        });
    }
  };

  return (
    <>
      <div className="web:my-10 web:p-10 sm:px-10 mobile:pb-10 web:w-[1074px] h-full bg-white rounded-3xl">
        <Title text="비밀번호 변경" />
        <form onSubmit={changePasswordHandler}>
          <ul>
            <li className={li}>
              <label htmlFor="password" className={label}>
                현재 비밀번호
              </label>
              <input
                type="password"
                name="password"
                placeholder="비밀번호를 변경하려면 현재 비밀번호를 입력해주세요."
                value={password.value}
                onChange={password.onChange}
                autoFocus
                className={input}
              />
            </li>
            <li className={li}>
              <label htmlFor="check_password" className={label}>
                새 비밀번호
              </label>
              <input
                type="password"
                placeholder=" 새 비밀번호"
                name="password"
                value={formData.password}
                onChange={onChangeHandler}
                className={input}
              />
            </li>
            <li className={li}>
              <label htmlFor="check_password" className={label}>
                새 비밀번호 확인
              </label>
              <input
                type="password"
                placeholder=" 새 비밀번호 확인"
                name="check_password"
                value={checkNewPassword.value}
                onChange={checkNewPassword.onChange}
                className={input}
              />
            </li>
          </ul>
          <div className="h-[100px]">
            {errors.password && (
              <ErrorText text="8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요." />
            )}
            {formData.password.trim() &&
              formData.password !== checkNewPassword.value && (
                <ErrorText text="비밀번호가 일치하지 않습니다." />
              )}
          </div>
          <SubmitButton value="변경" />
        </form>
      </div>
    </>
  );
}
