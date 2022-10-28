import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getKeyThunk } from "../../store/key";
import MapContainer from "./MapContainer";
const Map = () => {
const key = useSelector(state => state.key.key)
const dispatch = useDispatch()
useEffect(() => {
    if (!key){
        dispatch(getKeyThunk())
    }
}, [dispatch, key])
if(!key) return null
return(
    <>
    <MapContainer apiKey={key} />
    </>
)
}

export default Map;
