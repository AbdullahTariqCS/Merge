import '../../assets/theme.css'
import './session_index.css'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'

function SessionIndex() {
  //api/session/index

  const sessions = [
    { id: 0, name: 'Session 1', description: 'hello world' },
    { id: 1, name: 'Session 2', description: 'hello world' },
    { id: 2, name: 'Session 3', description: 'hello world' },
    { id: 3, name: 'Session 4', description: '' },
    { id: 4, name: 'Session 5', description: 'hello world' },
    { id: 4, name: 'Session 5', description: 'hello world' },
    { id: 4, name: 'Session 5', description: 'hello world' },
  ]

  return (
    <div className='session-index m-background'>
      <p className='m-heading pl-4'>Welcome Back!</p>
      {
        Array(Math.ceil(sessions.length/4)).fill((<></>)).map((_, idx) => {

          return (
            <div className='container-fluid row pl-5 pr-5'>
              <Session session={sessions[4*idx]}/>
              {sessions.length > 4*idx + 1? <Session session={sessions[4*idx + 1]}/> : <div className='col-sm-3' ></div>}
              {sessions.length > 4*idx + 2? <Session session={sessions[4*idx + 2]}/> : <div className='col-sm-3' ></div>}
              {sessions.length > 4*idx + 3? <Session session={sessions[4*idx + 3]}/> : <div className='col-sm-3' ></div>}
            </div>
          )
        })
      }

    </div>
  )
}

function Session({ session }) {
  const [sessionSelected, setSessionSelected] = useState(false); 


  if(sessionSelected)
    return <Navigate to= {`/session?sessionId=${session.id}`}/>

  return (
    <div className='session-box col' onClick={() => setSessionSelected(true)}>
      <p className='session-label m-primary'>{session.name}</p>
      <div className='session-description m-primary'>
        <p className='mb-3' style={session.description === '' ? {fontStyle:'italic'} : {}}>
          {session.description != '' ? session.description : 'no description'} 

        </p>
      </div>
    </div>
  )
}

export default SessionIndex; 