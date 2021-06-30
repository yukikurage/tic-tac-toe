import Head from 'next/head';
import styles from '../styles/Home.module.css';

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
  pieceElem: <span>'o'</span>,
};

const cross: Piece = {
  pieceElem: <span>'x'</span>,
};

const initBoard: Board = new Array<CellState[]>(3).fill(
  new Array<CellState>(3).fill({ type: 'NoPiece' }),
);

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tic-Tac-Toe</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
