import './comment.css'
import React, {useEffect, useState, useContext} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateComment } from '../../store/comment';

export default function CreateComment() {
    const history = useHistory();
    const dispatch = useDispatch();
    
}
