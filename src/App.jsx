import { useState } from 'react'
import Envelope from './components/Envelope.jsx'
import Doors from './components/Doors.jsx'
import Invitation from './components/Invitation.jsx'
import Petals from './components/Petals.jsx'
import Music from './components/Music.jsx'

export default function App() {
  const [stage, setStage] = useState('envelope') // envelope -> doors -> invite
  return (
    <>
      <Petals />
      {stage === 'envelope' && <Envelope onOpen={() => setStage('doors')} />}
      {stage === 'doors' && <Doors onOpen={() => setStage('invite')} />}
      {stage === 'invite' && <Invitation />}
      <Music />
    </>
  )
}
