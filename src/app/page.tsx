'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState<any[] | null>(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/simonlabonne/scieries-lah/refs/heads/main/scieries.json')
      .then((res) => res.json())
      .then((json) => {
        const sorted = json.sort((a: { points: number }, b: { points: number }) => b.points - a.points);
        setData(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div>Loading...</div>;

  function TeamPlayers({ id }: { id: number }) {
    const teamPlayers = (data!).filter((player) => player.id === id);
    const teamName = (data!).find((team) => team.id === id)?.name;
    const totalPoints = teamPlayers.reduce((total, p) => total + p.points, 0);

    return (
      <div className="mb-4 lg:mb-16">
        <h2 className="text-2xl mb-2">{id} - {teamName}</h2>
        <table className="table-auto">
          <tbody>
            {teamPlayers.map((player) => (
              <tr className="border-b" key={player.player}>
                {/* <td className="p-2">{player.pos}</td> */}
                <td className="p-2">{player.player}</td>
                <td className="p-2">{player.points}</td>
              </tr>
            ))}
            <tr>
              <td className='p-2 text-right'>Total</td>
              <td className='p-2'>{totalPoints}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl mb-4">Scieries LAH</h1>
      <div className="grid lg:grid-cols-2 gap-4">
        <div><TeamPlayers id={1} /></div>
        <div><TeamPlayers id={8} /></div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div><TeamPlayers id={2} /></div>
        <div><TeamPlayers id={7} /></div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div><TeamPlayers id={3} /></div>
        <div><TeamPlayers id={6} /></div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div><TeamPlayers id={4} /></div>
        <div><TeamPlayers id={5} /></div>
      </div>
      <h2 className="text-4xl mb-4">Pool des poches</h2>
      <div className="grid lg:grid-cols-3 gap-4">
        <div><TeamPlayers id={9} /></div>
        <div><TeamPlayers id={10} /></div>
        <div><TeamPlayers id={11} /></div>
      </div>
    </div>
  );
}