export default async function Page() {
  const res = await fetch('http://localhost:3000/scieries-lah/scieries.json')
  const data = await res.json()

  data.sort((a: { points: number }, b: { points: number }) => b.points - a.points);

  function TeamPlayers({ id }: { id: number }) {
    return (
      <div className="mb-4 lg:mb-16">
        <h2 className="text-2xl mb-2">{id} - {data.find(team => team.id === id)?.name}</h2>
        <table className="table-auto">
          {data.filter(player => player.id === id).map(player => (
            <tr className="border-b" key={player.player}>
              <td className="p-2">{player.pos}</td>
              <td className="p-2">{player.player}</td>
              <td className="p-2">{player.points}</td>
            </tr>
          ))}
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