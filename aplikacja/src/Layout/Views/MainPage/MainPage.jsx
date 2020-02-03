import React, {useState, useEffect, useCallback} from 'react';
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';

import * as plancActions from '../../../store/action/plans' 

import '../../Style/MainPage/MainPage.css'
import NewButton from '../../../Components/Button'
 

const MainPage = () => {


    return (
        <div className="MainPageContent">
            <div className="MainPageCardContainer">
                <Link to="/allplans"><div className="MainPageCards"><FileCopyRoundedIcon/><p>Plany</p></div></Link>
                <Link to="/userplans"><div className="MainPageCards"><DescriptionRoundedIcon/><p>Twoje Plany</p></div></Link>
            </div>
            <div className="MainPageCardContainer">
                <Link to="/add_plan" ><div className="MainPageCards"><PostAddRoundedIcon/><p>Dodaj Plan</p></div></Link>
                <Link to="/messages"><div className="MainPageCards"><EmailRoundedIcon/><p>Wiadomosci</p></div></Link>
            </div>
        </div>
    )
}



export default MainPage;