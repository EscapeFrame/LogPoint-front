import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios"; // Axios import 추가
import "../function/function.css";
import { useNavigate } from "react-router-dom"; // useNavigate import 추가

const Function = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [sizeClass, setSizeClass] = useState("Function-small");
  const [squarePosition, setSquarePosition] = useState({ top: 0, left: 0 });
  const [mousePosition, setMousePosition] = useState({ top: 0, left: 0 });
  const [buttonVisible, setButtonVisible] = useState(true);
  const [cursorHidden, setCursorHidden] = useState(false); // 기본적으로 커서를 보이게 설정
  const [squareVisible, setSquareVisible] = useState(false);
  const [clickCount, setClickCount] = useState(0); // 클릭 횟수 추적
  const [madeCircle, setMadeCircle] = useState([]); // 생성된 원의 위치 리스트
  const [madeClick, setMadeClick] = useState([]); // 클릭한 위치 리스트
  const containerRef = useRef(null);

  const changeFunction = useCallback(() => {
    let parts = sizeClass.split("-");
    let size = parts[1];
    size = size === "small" ? "big" : "small";
    parts[1] = size;
    setSizeClass(parts.join("-"));
    setSquareVisible(size === "big");
  }, [sizeClass]);

  const getRandomPosition = () => {
    const container = containerRef.current;
    if (!container) return { top: 0, left: 0 };

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const squareSize = 50;

    const randomOffsetX = Math.random() * (containerWidth - squareSize);
    const randomOffsetY = Math.random() * (containerHeight - squareSize);

    return { left: randomOffsetX, top: randomOffsetY };
  };

  const setInitialPosition = () => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;
    const squareSize = 50;

    const left = (containerWidth - squareSize) / 2;
    const top = (containerHeight - squareSize) / 2;

    setSquarePosition({ left, top });
  };

  const handleFullscreen = () => {
    if (document.fullscreenElement) return;

    document.documentElement.requestFullscreen().catch((err) => {
      console.error("Failed to enter fullscreen mode:", err);
    });
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setInitialPosition();
      if (!document.fullscreenElement) {
        changeFunction();
        setButtonVisible(true);
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [changeFunction]);

  useEffect(() => {
    setInitialPosition();
  }, []);

  const handleStartClick = () => {
    handleFullscreen();
    setButtonVisible(false);
    changeFunction();
    setCursorHidden(true); // 시작 후 커서 숨김
  };

  const handleSquareClick = async () => {
    if (clickCount >= 6) {
      // 클릭 횟수가 6회에 도달하면 리스트를 백엔드에 전송
      try {
        const response = await axios.post('http://10.150.151.143:8080/your-endpoint', {
          madeClick,
          madeCircle
        });
        console.log('서버 응답:', response.data);
        
        // 클릭이 6회에 도달했을 때 리스트의 값을 콘솔에 출력
        console.log('클릭한 위치 리스트:', madeClick);
        console.log('생성된 원의 위치 리스트:', madeCircle);
  
        // 리스트 초기화
        setMadeClick([]);
        setMadeCircle([]);
  
        // result.js로 이동
        navigate("/result"); // useNavigate를 사용하여 페이지 이동
      } catch (error) {
        console.error('데이터 전송 오류:', error);
      }
      return; // 더 이상 클릭을 처리하지 않음
    }
  
    const newPosition = getRandomPosition();
    setSquarePosition(newPosition);
    setSquareVisible(true);
  
    // 첫 번째 클릭이 아닐 때만 리스트에 추가
    if (clickCount > 0) {
      setMadeClick((prev) => [...prev, mousePosition]);
      setMadeCircle((prev) => [...prev, newPosition]);
      console.log('클릭한 위치:', mousePosition); // 클릭한 위치 콘솔 출력
      console.log('생성된 원의 위치:', newPosition); // 생성된 원의 위치 콘솔 출력
    }
  
    setClickCount((prev) => prev + 1); // 클릭 횟수 증가
  
    // 커서를 잠시 보이게 함
    setCursorHidden(false);
    setTimeout(() => {
      setCursorHidden(true); // 100ms 후에 커서를 다시 숨김
    }, 100);
  };

  const handleMouseMove = (event) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    setMousePosition({ left: mouseX, top: mouseY });
  };

  return (
    <div className="Function-body">
      <div
        className={sizeClass}
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onClick={handleSquareClick}
        style={{ cursor: cursorHidden ? "none" : "default" }} // 커서 숨기기
      >
        {buttonVisible && (
          <button onClick={handleStartClick} className="Function-start">
            시작
          </button>
        )}
        {squareVisible && (
          <div
            className="Function-square"
            style={{
              display: "block",
              cursor: "none",
              position: "absolute",
              borderRadius: "80px",
              width: "50px",
              height: "50px",
              backgroundColor: "red",
              top: `${squarePosition.top}px`,
              left: `${squarePosition.left}px`,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Function;
