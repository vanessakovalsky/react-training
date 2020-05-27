import React from 'react'

import '../css/HallOfFame.css'
import AddPlayer from './AddPlayer'

const HallOfFame = ({ entries }) => (
  <div>
  <AddPlayer />
  <table className="hallOfFame">
    <tbody>
      {entries.map(({  id, name }) => (
        <tr key={id}>
          <td className="id">{id}</td>
          <td className="player">{name}</td>
        </tr>
      ))}
    </tbody>
  </table>
  </div>
)

export default HallOfFame