// pages/index.js
import dynamic from 'next/dynamic';

const Game = dynamic(() => import('../components/Game'), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1>Vehicle Survival Game</h1>
      <Game />
    </div>
  );
}

