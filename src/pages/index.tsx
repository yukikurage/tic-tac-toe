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
  readonly piece: Piece;
}

type CellState = NoPiece | SomePiece;

type Board = CellState[][];

const circle: Piece = {
  pieceElem: <img src="/images/circle.png" className={styles.pieceImage} />,
};

const cross: Piece = {
  pieceElem: <img src="/images/cross.png" className={styles.pieceImage} />,
};

const noPieceElem = <></>;

const boardHeight = 3;
const boardWidth = 3;
const initBoard: Board = new Array(boardHeight).fill(null).map(() =>
  new Array(boardWidth).fill(null).map(() => ({
    type: 'NoPiece',
  })),
);

const playerPieces = [cross, circle];
const playerNum = playerPieces.length;

export default function Home() {
  const [board, setBoard] = useState(initBoard);
  const [turn, setTurn] = useState(0);

  const updateTurn = () => {
    if (turn === playerNum - 1) {
      setTurn(0);
    } else {
      setTurn(turn + 1);
    }
  };

  const cellClick = (i: number, j: number) => {
    if (board[i][j].type === 'NoPiece') {
      board[i][j] = { type: 'SomePiece', piece: playerPieces[turn] };
      setBoard(board.concat());
      updateTurn();
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
                      {cell.type === 'SomePiece' ? cell.piece.pieceElem : noPieceElem}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <b>Century Test</b>
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
