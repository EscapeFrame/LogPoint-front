import React, { useRef, useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js"; // Firebase Auth 추가
import "./signup.css"; // CSS 파일이 존재하는지 확인
import { formToJSON } from "axios";

const Signup = () => {
  const idRef = useRef();
  const pwRef = useRef();
  const navigate = useNavigate();
  const [app, setApp] = useState(null); // Firebase app 상태 추가

  // Firebase 초기화
  useEffect(() => {
      const firebaseConfig = {
      apiKey: "AIzaSyDg58p-hKEQgL72KABXj13iRGmFkg1uJME",
      authDomain: "log-point.firebaseapp.com",
      projectId: "log-point",
      storageBucket: "log-point.appspot.com",
      messagingSenderId: "602257199185",
      appId: "1:602257199185:web:30f531cff5024b33b46870",
      measurementId: "G-PB8E0T54M3"
    };
    

    // Firebase 초기화
    const firebaseApp = initializeApp(firebaseConfig);
    setApp(firebaseApp); // app 상태 업데이트
  }, []);
  // 이건 잘 모르겠음 백에 요청 보내는거 더 찾아보기!
  // fetch('10.150.151.143', {method : "GET"})
  // .then(res=>res.json())
  // .them(res=>{
  //   console.log(1, res);
  //   setValue(res);
  // });

  const handleSubmit = (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    const userName = idRef.current.value;
    const userPassword = pwRef.current.value;

    // 이메일 형식 검증
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userName)) {
      alert("유효한 이메일을 입력하세요.");
      return;
    }

    // 비밀번호 길이 검증
    if (userPassword.length < 6) {
      alert("비밀번호는 최소 6자리 이상이어야 합니다.");
      return;
    }

    // 이메일과 비밀번호 콘솔에 출력
    console.log("이메일:", userName);
    console.log("비밀번호:", userPassword);

    const auth = getAuth(app); // app을 사용하여 auth 객체 생성

    // Firebase 회원가입 로직
    createUserWithEmailAndPassword(auth, userName, userPassword)
      .then((userCredential) => {
        // 회원가입 성공
        const user = userCredential.user;
        console.log('회원가입 성공:', user);
        navigate("/"); // 회원가입 후 이동
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('회원가입 실패:', errorCode, errorMessage);
        alert(`회원가입 실패: ${errorMessage}`); // 사용자에게 오류 메시지 알림
      });
  };

  return (
    <div className="signup-wrapper">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit} id="signup-form">
        <input
          type="text"
          name="userName"
          placeholder="이메일"
          ref={idRef}
        />
        <input
          type="password"
          name="userPassword"
          placeholder="비밀번호"
          ref={pwRef}
        />
        <input type="submit" value="회원가입" />
      </form>
      <hr />
    </div>
  );
};

export default Signup; // 내보내는 이름을 Signup으로 변경
