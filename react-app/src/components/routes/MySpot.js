import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useHistory } from "react-router-dom"
import { thunkGetMySpot } from "../../store/spot"
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

    if (!data) return null;
    return (
        <div className='spot-page-container'>
            <div className='list-container'>
                {spots.map((spot) => {
                    return (
                        <div className='list-one-container'>
                            <div className='spotlist-name _input'>{spot.name}</div>
                            <div className='spotlist-description _input'>Description: {spot.description}</div>
                            <div className='spotlist-state _input'>State: {spot.state}</div>
                            <div className='spotlist-level _input'>Level: {spot.difficulty}</div>
                            <div className='spotlist-img-container'> <img className='spot-img' src={spot.staticUrl}></img></div>
                            <div className = 'spot-buttons'>
                            <button className = 'spot-log-button' onClick={ () => {history.push(`/spots/${spot.id}/sessions/new`)}}>Log Session Here</button>
                            <button className = 'spot-log-button' onClick={ () => {history.push(`/spots/${spot.id}`)}}>Spot Detail</button>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}
