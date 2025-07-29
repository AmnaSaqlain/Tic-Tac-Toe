import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Square from "./Square";

function Board() {
 
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [playerX, setPlayerX] = useState("");
  const [playerO, setPlayerO] = useState("");
  const [gameStart, setGameStart] = useState(false);

 
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [confettiActive, setConfettiActive] = useState(false);

 
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [draws, setdraws] = useState(0);
  
  const [showScoreModal, setShowScoreModal] = useState(false);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

  
  useEffect(() => {
    if (winner) {
      setModalMessage(`${winner === "X" ? playerX : playerO} Wins!`);
      setShowModal(true);
     

      if (winner === "X") setScoreX((prev) => prev + 1);
      else setScoreO((prev) => prev + 1);

      
      setConfettiActive(true);
      const timer = setTimeout(() => setConfettiActive(false), 3000);
      return () => clearTimeout(timer);

    } else if (isDraw) {
      setModalMessage("It's a Draw!");
      setShowModal(true);
      setdraws((prev) => prev + 1);
      
    }
  }, [winner, isDraw]);

  
  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  
  const restartGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setPlayerX("");
    setPlayerO("");
    setGameStart(false);
    setShowModal(false);
    setModalMessage("");
    setScoreX(0);
    setScoreO(0);
   
  };

  
  const playAgain = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setShowModal(false);
    setModalMessage("");
  };

  const totalGames = scoreX + scoreO + draws;
  return (
    <div
      style={{
        backgroundImage: "url('/images/bg-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {confettiActive && <Confetti />}

      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          background: "linear-gradient(135deg, #270b44ff, #214178ff)",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          textAlign: "center",
          color: "#fff",
        }}
      >
        {!gameStart ? (
          <>
            <h2>Enter Player Names</h2>
            <input
              type="text"
              placeholder="Player X Name"
              value={playerX}
              onChange={(e) => setPlayerX(e.target.value)}
              style={{ margin: "10px", padding: "8px", width: "80%" }}
            />
            <input
              type="text"
              placeholder="Player O Name"
              value={playerO}
              onChange={(e) => setPlayerO(e.target.value)}
              style={{ margin: "10px", padding: "8px", width: "80%" }}
            />
            <button
              onClick={() => {
                if (playerX && playerO) {
                  setGameStart(true);
                } else {
                  alert("Please enter names for both players.");
                }
              }}
              style={{
                padding: "10px 20px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              Start Game
            </button>
          </>
        ) : (
          <>
            <h2>
              {winner
                ? `${winner === "X" ? playerX : playerO} Wins!`
                : `${isXNext ? playerX : playerO}'s Turn!`}
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 60px)",
                gap: "10px",
                justifyContent: "center",
                margin: "20px auto",
              }}
            >
              {squares.map((value, index) => (
                <Square key={index} value={value} onClick={() => handleClick(index)} />
              ))}
            </div>

           
          </>
        )}

        
        {showModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "white",
                color: "black",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                width: "250px",
              }}
            >
              <h2>{modalMessage}</h2>
              
              {/* Play Again button */}

              <button
                onClick={playAgain}
                style={{
                  padding: "8px 15px",
                  margin: "10px",
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Play Again
              </button>

                {/* Restart Game button */}
              <button
                onClick={restartGame}
                style={{
                  padding: "8px 15px",
                  margin: "10px",
                  background: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Restart Game
              </button>

              {/* View Score Button */}
            <button
              onClick={() => setShowScoreModal(true)}
              style={{
                padding: "8px 15px",
                background: "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              View Score
            </button>


            </div>
          </div>
        )}

        
        {showScoreModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "white",
                color: "black",
                padding: "20px",
                borderRadius: "10px",
                textAlign: "center",
                width: "250px",
              }}
            >
              <h2>Scoreboard</h2>
              <p>{playerX || "Player X"}: {scoreX} wins</p>
              <p>{playerO || "Player O"}: {scoreO} wins</p>
              <p> Draw : {draws}</p>
              <p>Total Games Played: {totalGames}</p>
              
              <button
                onClick={() => setShowScoreModal(false)}
                style={{
                  padding: "8px 15px",
                  marginTop: "10px",
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Board;
