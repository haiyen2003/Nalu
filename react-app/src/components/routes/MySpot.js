import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import { thunkGetMySpot, thunkDeleteSpot } from "../../store/spot"
import './spot.css'

export default function MySpots() {
    const dispatch = useDispatch()
    const history = useHistory()
    const currentUser = useSelector(state => state.session.user)
    const data = useSelector((state) => state.spot)
    let spots;
    if (!currentUser) {
        history.push('/')
    }
    if (data) {
        spots = Object.values(data);
    }

    useEffect(() => {
        dispatch(thunkGetMySpot())
    }, [dispatch])

    const handleDelete = async spotId => {
        const deletedSession = await dispatch(thunkDeleteSpot(spotId));
        history.push(`/my-spots`)
    }

    if (!data) return null;
    return (
        <div className='spot-page-container'>
        <div className='list-container'>
            <div className='top-container'>
                <NavLink className="top-link top-link-underlined" to={`/my-spots`}>My Spots</NavLink>
                <NavLink className='top-link' to={`/my-sessions`}>My Sessions</NavLink>
            </div>
            {spots.map((spot) => {
                return (
                    <div className='list-one-container'>
                        <div className='user-name'>Created by: {spot.createdBy.firstName} {spot.createdBy.lastName}</div>
                        <div className='user-name'>{spot.createAt}</div>
                        <div className='spotlist-name _input'><NavLink className='link' to={`/spots/${spot.id}`}>{spot.name}</NavLink> </div>
                        <div className='spotlist-description _input'>Description: {spot.description}</div>
                        <div className='spot-state-level'>
                            <div className='spot-detail-state'>
                                <div>State</div>
                                <div>{spot.state}</div>
                            </div>
                            <div className='spot-detail-state'>
                                <div>Level</div>
                                <div>{spot.difficulty}</div>
                            </div>
                            <div className='spot-detail-state'>
                                <div>Total Sessions</div>
                                <div>{spot.sessions.length}</div>
                            </div>
                        </div>
                            <div className='spotlist-img-container'> <img className='spot-img' src={spot.staticUrl}></img></div>
                            <div className = 'spot-buttons'>
                            <button className = 'spot-log-button' onClick={ () => {history.push(`/spots/${spot.id}/sessions/new`)}}>Log Session Here</button>
                            <button className = 'spot-log-button' onClick={ () => {history.push(`/spots/${spot.id}/edit`)}}>Edit Spot</button>
                            <button className = 'spot-log-button' onClick={ () => {handleDelete(spot.id)}}>Delete Session</button>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}
