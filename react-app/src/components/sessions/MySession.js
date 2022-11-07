import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import { thunkGetMySessions, thunkDeleteSession } from "../../store/workout"
import './Session.css'

export default function MySessions() {
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state.session.user)
    if (!currentUser) {
        history.push('/')
    }
    const data = useSelector((state) => state.sessions)
    let sessions;
    if (data) {
        sessions = Object.values(data);
    }

    useEffect(() => {
        dispatch(thunkGetMySessions())
    }, [dispatch])

    const handleDelete = async sessionId => {
        const deletedSession = await dispatch(thunkDeleteSession(sessionId));
        history.push(`/my-sessions`)
    }

    if (!data) return null;
    return (
        <div className='spot-page-container'>
        <div className='list-container'>
        <div className='top-container'>
                <NavLink className="top-link " to={`/my-spots`}>My Spots</NavLink>
                <NavLink className='top-link top-link-underlined' to={`/my-sessions`}>My Sessions</NavLink>
            </div>
            {sessions.map((session) => {
                return (
                    <div className='list-one-container'>
                        <div className ='left-container'>
                            <div className='user-info'>
                                <div className ='user-name'>{session.createdBy.firstName} {session.createdBy.lastName}</div>
                                <div className ='user-name'>{session.createAt}</div>
                            </div>
                        </div>
                        <div className='spotlist-name _input'><NavLink className='link' to={`/sessions/${session.id}`}>{session.name}</NavLink> </div>
                        <div className='spot-detail-description'>Description: {session.description}</div>
                        <div className='spotlist-level _input'>Equipment: {session.equipment}</div>
                        <div className='spotlist-level _input'>Start Time: {new Date(session.startTime).toLocaleString()}</div>
                        <div className='spotlist-level _input'>End Time: {new Date(session.endTime).toLocaleString()}</div>
                        <div className = 'spotlist-img-container'><img className = 'spot-img' src ={session.spot.staticUrl}></img></div>
                        <div className='spotlist-img-container'>
                        <img className='session-img' src={session.image}></img>
                        </div>
                        <div className = 'spot-buttons'>
                        <button className = 'spot-log-button' onClick={ () => {history.push(`/sessions/${session.id}`)}}>Session Detail</button>
                        {currentUser.id == session.userId &&
                        <>
                        <button className = 'spot-log-button' onClick={ () => {history.push(`/sessions/${session.id}/edit`)}}>Edit Session</button>
                        <button className = 'spot-log-button' onClick={ () => {handleDelete(session.id)}}>Delete Session</button>
                        </>
                        }
                        </div>
                    </div>
                )
            })}

        </div>
    </div>
    )
}
