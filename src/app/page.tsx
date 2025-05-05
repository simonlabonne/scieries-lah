'use client';

import { useEffect, useState } from 'react';

interface PlayerData {
  id: number;
  player: string;
  pos: number;
  points: number;
  name: string;
}

export default function Page() {
  const [bons, bonsData] = useState<PlayerData[] | null>(null);
  const [poches, pochesData] = useState<PlayerData[] | null>(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/simonlabonne/scieries-lah/refs/heads/main/scieries-bons.json')
      .then((res) => res.json())
      .then((json) => {
        const sorted = json.sort((a: { points: number }, b: { points: number }) => b.points - a.points);
        bonsData(sorted);
      })
      .catch((err) => console.error(err));

    fetch('https://raw.githubusercontent.com/simonlabonne/scieries-lah/refs/heads/main/scieries-poches.json')
      .then((res) => res.json())
      .then((json) => {
        const sorted = json.sort((a: { points: number }, b: { points: number }) => b.points - a.points);
        pochesData(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!bons || !poches) return <div>Loading...</div>;

  function TeamPlayers({ id, data }: { id: number, data: PlayerData[] }) {
    const teamPlayers = data.filter((player) => player.id === id);
    const teamName = data.find((team) => team.id === id)?.name;
    const totalPoints = teamPlayers.reduce((total, p) => total + p.points, 0);

    return (
      <div className="mb-4 lg:mb-16">
        <h2 className="text-2xl mb-2">{id} - {teamName}</h2>
        <table className="table-auto">
          <tbody>
            {teamPlayers.map((player) => (
              <tr className="border-b" key={player.player}>
                <td className="p-2">{player.player}</td>
                <td className="p-2 text-center">{player.points}</td>
              </tr>
            ))}
            <tr>
              <td className='p-2 text-right'>Total</td>
              <td className='p-2 text-center'>{totalPoints}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 px-2 lg:px-0">
      <img src="pub-1.jpg" alt="Advertisement" className="mx-auto mb-8" />
      <h1 className="text-4xl mb-4">Scieries LAH</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <div><TeamPlayers id={1} data={bons} /></div>
        <div><TeamPlayers id={7} data={bons} /></div>
      </div>
      <hr className="mb-16" />
      <div className="grid lg:grid-cols-2 gap-4">
        <div><TeamPlayers id={6} data={bons} /></div>
        <div><TeamPlayers id={5} data={bons} /></div>
      </div>
      <h2 className="text-4xl mb-4">Pool des poches</h2>
      <div className="grid lg:grid-cols-3 gap-4">
        <div><TeamPlayers id={9} data={poches} /></div>
        <div><TeamPlayers id={10} data={poches} /></div>
        <div><TeamPlayers id={11} data={poches} /></div>
      </div>
    </div>
  );
}
