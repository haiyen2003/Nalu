import {useMemo} from 'react';
import {GoogleMap, useLoadScript, Marker} from '@react-google-maps/api';
import './spot.css'
import React, { useEffect, useState } from 'react';
import Map from '../Map';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {thunkCreateSpot} from '../../store/spot';
import {getKeyThunk} from '../../store/key';

export default function CreateSpot(){
  const history = useHistory()
  const apiKey = useSelector(state => state.key)
  return(
    <Map />
  )
 }
