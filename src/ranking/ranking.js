import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ranking.css";

const Ranking = () => {
  const [rankings, setRankings] = useState([
    { rank: 1, dpi: 800 },
    { rank: 2, dpi: 1600 },
    { rank: 3, dpi: 3200 }
  ]);

  const [newRank, setNewRank] = useState(""); // 새로운 랭크 입력 상태
  const [newDpi, setNewDpi] = useState(""); // 새로운 DPI 입력 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const handleViewRanking = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const addRanking = () => {
    if (newRank && newDpi) {
      const newRanking = {
        rank: parseInt(newRank),
        dpi: parseInt(newDpi)
      };
      setRankings((prevRankings) => [...prevRankings, newRanking]);
      setNewRank(""); // 입력 필드 초기화
      setNewDpi(""); // 입력 필드 초기화
    } else {
      alert("모든 필드를 입력하세요."); // 입력이 없을 경우 경고
    }
  };

  return (
    <div className="ranking-wrapper">
      <h1 className="ranking-title">랭킹</h1>
      <p className="ranking-recommend">사람들이 많이 쓰는 감도를 추천해 드릴게요.</p>
      <div className="ranking-box">
        <div className="ranking-dpi">
          {rankings.map((rank) => (
            <div key={rank.rank} className="dpi">
              {rank.rank}. {rank.dpi} dpi
            </div>
          ))}
        </div>
      </div>

      <span className="ranking-view" onClick={handleViewRanking}>
        내가 쓰는 코드 랭킹 보기
      </span>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>내가 쓰는 코드 랭킹</h2>
            <div className="ranking-list">
              <ul>
                {rankings.map((rank) => (
                  <li key={rank.rank}>
                    <strong>랭크 {rank.rank}:</strong> {rank.dpi} dpi
                  </li>
                ))}
              </ul>
            </div>
            <input
              type="number"
              placeholder="랭크"
              value={newRank}
              onChange={(e) => setNewRank(e.target.value)}
            />
            <input
              type="number"
              placeholder="DPI"
              value={newDpi}
              onChange={(e) => setNewDpi(e.target.value)}
            />
            <button onClick={addRanking}>
              랭킹 추가하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ranking;
