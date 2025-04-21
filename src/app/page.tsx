import { promises as fs } from 'fs';

export default async function Page() {
  const file = await fs.readFile('scieries.json', 'utf8');
  const data = JSON.parse(file);

  data.sort((a: { points: number }, b: { points: number }) => b.points - a.points);

  function TeamPlayers({ id }: { id: number }) {
    return (
      <div className="mb-4 lg:mb-16">
        <h2 className="text-2xl mb-2">{id} - {data.find((team: { id: number, name: string }) => team.id === id)?.name}</h2>
        <table className="table-auto">
          <tbody>

            {data.filter((player: { id: number, pos: number, player: string, points: number }) => player.id === id).map((player: { id: number, pos: number, player: string, points: number }) => (
              <tr className="border-b" key={player.player}>
                {/* <td className="p-2">{player.pos}</td> */}
                <td className="p-2">{player.player}</td>
                <td className="p-2">{player.points}</td>
              </tr>
            ))}
            <tr>
              <td className='p-2 text-right'>Total</td>
              <td className='p-2'>{data.filter((player: { id: number, pos: number, player: string, points: number }) => player.id === id).reduce((total: number, player: { points: number }) => total + player.points, 0)}</td>
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
        <div>
          <TeamPlayers id={1} />
        </div>
        <div>
          <TeamPlayers id={8} />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <TeamPlayers id={2} />
        </div>
        <div>
          <TeamPlayers id={7} />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <TeamPlayers id={3} />
        </div>
        <div>
          <TeamPlayers id={6} />
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <TeamPlayers id={4} />
        </div>
        <div>
          <TeamPlayers id={5} />
        </div>
      </div>
      <h2 className="text-4xl mb-4">Pool des poches</h2>
      <div className="grid lg:grid-cols-3 gap-4">
        <div>
          <TeamPlayers id={9} />
        </div>
        <div>
          <TeamPlayers id={10} />
        </div>
        <div>
          <TeamPlayers id={11} />
        </div>
      </div>
    </div >
  )
}