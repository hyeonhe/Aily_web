"use client";
import axios from "axios";
import useInput from "@/hooks/use-input";
import { useState } from "react";
import Title from "@/components/MyPage/Title";

const li = "flex flex-col mb-4";
const label = "text-[20px] mb-1";
const input =
  "border border-solid border-[#a0a0a0] rounded-lg px-3 w-full h-10";

export default function Leave() {
  const password = useInput("");
  const checkPassword = useInput("");
  const [agree, setAgree] = useState(false);

  const handleWithdrawal = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const pw = password.value.trim();
    const cpw = checkPassword.value.trim();

    if (pw === "" || cpw === "") {
      alert("비밀번호를 입력해주세요.");
    } else if (!agree) {
      alert("회원탈퇴 동의에 체크해주세요.");
    } else if (pw !== cpw) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      axios
        .post("/member/leavuser", {
          phonenumber: sessionStorage.getItem("phone_number"),
          nickname: sessionStorage.getItem("name"),
          password: password.value,
        })
        .then((res) => {
          const result = res.data.result;
          if (result === "deleteuserok") {
            alert("회원 탈퇴가 되었습니다. 감사합니다.");
            sessionStorage.clear();
            document.location.href = "/";
          } else if (result === "file error.vo1") {
            alert("Error Code : F101 | 관리자에게 문의 주세요");
          } else if (result === "file error.vo2") {
            alert("Error Code : F102 | 관리자에게 문의 주세요");
          } else if (result === "usererror") {
            alert("Error Code : U101 | 비밀번호가 틀렸습니다.");
          } else {
            alert("오류가 발생했습니다. 다시 시도해 주세요. ev1");
          }
        })
        .catch((error) => {
          console.error("Withdrawal failed:", error);
          alert("오류가 발생했습니다. 다시 시도해 주세요. ev2");
        });
    }
  };

  return (
    <>
      <div className="justify-between h-full bg-white web:w-[1074px] web:my-10 mobile:pb-10 web:p-10 sm:px-10 rounded-3xl">
        <Title text="회원 탈퇴" />
        <form onSubmit={handleWithdrawal}>
          <ul>
            <li className={li}>
              <label htmlFor="password" className={label}>
                현재 비밀번호
              </label>
              <input
                type="password"
                name="password"
                placeholder="계정을 삭제하려면 현재 비밀번호를 입력해주세요."
                value={password.value}
                onChange={password.onChange}
                className={input}
                autoFocus={true}
              />
            </li>
            <li className={li}>
              <label htmlFor="check_password" className={label}>
                비밀번호 확인
              </label>
              <input
                type="password"
                placeholder="비밀번호 확인"
                name="check_password"
                value={checkPassword.value}
                onChange={checkPassword.onChange}
                className={input}
              />
            </li>
          </ul>
          <p className="text-[#ee5446] mb-5">
            계정 삭제시 모든 포인트가 소멸되며 복구가 불가능합니다.
          </p>
          <div className="mb-[100px] flex items-center">
            <input
              type="checkbox"
              name="agree"
              checked={agree}
              onClick={() => {
                setAgree(!agree);
              }}
            />
            <label htmlFor="agree" className="ml-1">
              동의합니다.
            </label>
          </div>
          <button
            type="submit"
            className="w-full h-[54px] bg-[#F6F8FA] rounded-[10px] border border-solid border-[#D6D8DB] text-[#D1222E] font-semibold text-xl hover:bg-[#E2E8F0] hover:border-[#BAC0C8] hover:text-[#BD1E2D]"
          >
            회원 탈퇴
          </button>
        </form>
      </div>
    </>
  );
}
