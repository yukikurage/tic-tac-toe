import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { useState } from 'react';

interface Piece {
  readonly pieceElem: JSX.Element;
}

interface NoPiece {
  readonly type: 'NoPiece';
}

interface SomePiece {
  readonly type: 'SomePiece';
  readonly pieceNum: number;
}

type CellState = NoPiece | SomePiece;

type Board = CellState[][];

type GameState = 'Game Running' | 'Game Stopped';

const circle: Piece = {
  pieceElem: <img src="/images/circle.png" />,
};

const cross: Piece = {
  pieceElem: <img src="/images/cross.png" />,
};

const noPieceElem = <></>;

const boardSize = 3;

const initBoard: () => Board = () =>
  new Array(boardSize).fill(null).map(() =>
    new Array(boardSize).fill(null).map(() => ({
      type: 'NoPiece',
    })),
  );

const playerPieces = [cross, circle];
const playerNum = playerPieces.length;

const judge = (board: Board, player: number) => {
  //縦方向の判定
  for (let i = 0; i < boardSize; i++) {
    if (
      board.every((hori) => {
        let cell = hori[i];
        return cell.type === 'SomePiece' && cell.pieceNum === player;
      })
    ) {
      return true;
    }
  }
  //横方向の判定
  for (let i = 0; i < boardSize; i++) {
    if (board[i].every((cell) => cell.type === 'SomePiece' && cell.pieceNum === player)) {
      return true;
    }
  }
  //斜め方向の判定
  if (
    board.every((hori, i) => {
      let cell = hori[i];
      console.log(cell);
      return cell.type === 'SomePiece' && cell.pieceNum === player;
    })
  ) {
    return true;
  }
  if (
    board.every((hori, i) => {
      let cell = hori[boardSize - 1 - i];
      return cell.type === 'SomePiece' && cell.pieceNum === player;
    })
  ) {
    return true;
  }
};

const judgeEveryone = (board: Board) => {
  for (let i = 0; i < playerNum; i++) {
    if (judge(board, i)) return i;
  }
  return -1;
};

const judgeNoContest = (board: Board) => {
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      if (board[i][j].type === 'NoPiece') return false;
    }
  }
  return true;
};

export default function Home() {
  const [board, setBoard] = useState(initBoard());
  const [turn, setTurn] = useState(0);
  const [gameState, setGameState] = useState<GameState>('Game Running');
  const [winner, setWinner] = useState(-1);

  const restartButtonClick = () => {
    setBoard(initBoard());
    setTurn(0);
    setWinner(-1);
    setGameState('Game Running');
  };

  const gameRunningMassage = () => {
    return (
      <div>
        <label className={styles.turnImage}>Current Player... {playerPieces[turn].pieceElem}</label>
      </div>
    );
  };

  const gameStopedMassage = () => {
    if (winner === -1) {
      return (
        <div>
          <div>
            <b> No contest </b>
          </div>
          <button onClick={() => restartButtonClick()}>Restart</button>
        </div>
      );
    }
    return (
      <div>
        <div>
          <label className={styles.turnImage}>Player {playerPieces[winner].pieceElem} Win!</label>
        </div>
        <button onClick={() => restartButtonClick()}>Restart</button>
      </div>
    );
  };

  const updateTurn = () => {
    if (turn === playerNum - 1) {
      setTurn(0);
    } else {
      setTurn(turn + 1);
    }
  };

  const cellClick = (i: number, j: number) => {
    if (board[i][j].type === 'NoPiece' && gameState === 'Game Running') {
      board[i][j] = { type: 'SomePiece', pieceNum: turn };
      setBoard(board.concat());
      updateTurn();
    }
    let temp_winner = judgeEveryone(board.concat());
    if (temp_winner !== -1) {
      setWinner(temp_winner);
      setGameState('Game Stopped');
    }
    if (judgeNoContest(board)) {
      setGameState('Game Stopped');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Tic-Tac-Toe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <table className={styles.board}>
            <tbody>
              {board.map((horizon, i) => (
                <tr key={i}>
                  {horizon.map((cell, j) => (
                    <td onClick={() => cellClick(i, j)} key={j}>
                      {cell.type === 'SomePiece' ? (
                        <div className={styles.pieceImage}>
                          {playerPieces[cell.pieceNum].pieceElem}
                        </div>
                      ) : (
                        noPieceElem
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={styles.gameMessage}>
          {gameState === 'Game Stopped' ? gameStopedMassage() : gameRunningMassage()}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
