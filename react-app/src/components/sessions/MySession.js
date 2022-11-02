import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import { thunkGetMySessions } from "../../store/workout"
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

    if (!data) return null;
    return (
        <>
            <div>
                <div className='list-container'>
                    {sessions.map((session) => {
                        return (
                            <div>
                                <div className='spotlist-name'>Name: {session.name}</div>
                                <div className='spotlist-description'>Description: {session.description}</div>
                                <div className='spotlist-state'>Image: {session.image}</div>
                                <div className='spotlist-level'>Equipment: {session.equipment}</div>
                                <div className='spotlist-level'>Start Time: {session.startTime}</div>
                                <div className='spotlist-level'>End Time: {session.endTime}</div>
                                <div className='spotlist-img-container'> <img className='spot-img' src={session.image}></img></div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </>
    )
}
