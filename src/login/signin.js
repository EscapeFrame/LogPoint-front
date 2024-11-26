import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import googleLogo from '../img/google.png'; // 이미지 import
import "./signin.css";

const Signin = () => {
  const idRef = useRef();
  const pwRef = useRef();
  const navigate = useNavigate();
  const [app, setApp] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가

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

    const firebaseApp = initializeApp(firebaseConfig);
    getAnalytics(firebaseApp);
    setApp(firebaseApp);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userName = idRef.current.value;
    const userPassword = pwRef.current.value;

    if (!app) {
      console.error('Firebase 앱이 초기화되지 않았습니다.');
      return;
    }

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, userName, userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('로그인 성공:', user);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('로그인 실패:', errorCode, errorMessage);
        setErrorMessage(errorMessage); // 에러 메시지 상태 업데이트
      });
  };

  const handleGoogleSignIn = () => {
    if (!app) {
      console.error('Firebase 앱이 초기화되지 않았습니다.');
      return;
    }

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('구글 로그인 성공:', user);
        navigate("/");
      })
      .catch((error) => {
        alert("로그인 실패: " + error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('구글 로그인 실패:', errorCode, errorMessage);
        setErrorMessage(errorMessage); // 에러 메시지 상태 업데이트
      });
  };

  return (
    <div className="login-wrapper">
      <h2>로그인</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* 에러 메시지 표시 */}
      <form onSubmit={handleSubmit} id="login-form" action="10.150.151.143">
        <input
          type="email"
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
        <input type="submit" value="로그인" />
      </form>
      <hr />
      <div className="google-login">
        <p>구글로 로그인하기:</p>
        <img
          src={googleLogo}
          alt="구글"
          onClick={handleGoogleSignIn}
        />
        <label htmlFor="remember-check">
          <input type="checkbox" id="remember-check" /> 아이디 저장하기
        </label>
      </div>
      <hr />
      <div className="signup-link">
        <p>계정이 없으신가요?<a href="/signup"> 회원가입</a></p>
      </div>
    </div>
  );
};

export default Signin;
