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
        <div>
            <div className='list-container'>
                {spots.map((spot) => {
                    return (
                        <div>
                            <div className='spotlist-name'>Name: {spot.name}</div>
                            <div className='spotlist-description'>Description: {spot.description}</div>
                            <div className='spotlist-state'>State: {spot.state}</div>
                            <div className='spotlist-level'>Level: {spot.difficulty}</div>
                            <div className='spotlist-img-container'> <img className='spot-img' src={spot.staticUrl}></img></div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}
