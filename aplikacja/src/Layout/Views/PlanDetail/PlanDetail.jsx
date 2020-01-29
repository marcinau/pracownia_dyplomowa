import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {TextField} from '@material-ui/core'
import Carousel from 'react-bootstrap/Carousel'

import '../../Style/PlanDetail/PlanDetail.css'

const PlanDetail =   ({match}) => {

    const [plan, setPlan] = useState({})
    const [comments1, setComments] = useState([])
    const [commentText, setCommentText] = useState('')
    const [userEmail, setUserEmail] = useState('')

    const tokenId = localStorage.getItem('token');
    const data = new Date()
    console.log(new Date())
    console.log(data.getFullYear(), data.getMonth()+ 1, data.getDate())

    
    const {
      params: { id }
    } = match;


    const getUserInfo = async () => {
        await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDQUgaxD1xHEsVzqHCYYooNeF1mlniMk8E`, {idToken: tokenId})
        .then(response => {
            setUserEmail(response.data.users[0].email)
        })
    }
    

    const getPlan = async () => {
        await axios.get(`https://rn-complete-guide-34060.firebaseio.com/plans/${id}.json`)
        .then(response => {
        setPlan(response.data)
        console.log(response.data.comments)
        let comment = []
        for(let key in response.data.comments){
                const id =  key
                const comment1 = response.data.comments[key].coment
                const data = response.data.comments[key].data
                const nick = response.data.comments[key].nick
                comment.push({id ,comment: comment1, nick: nick, data: data })
            }
        setComments(comment)
        console.log(comment)
        console.log(comments1)
        })

    }

    const sentComent = async () => {
        await axios.post(`https://rn-complete-guide-34060.firebaseio.com/plans/${id}/comments.json`, {
            nick: userEmail,
            coment: commentText,
            data:  new Date()
        }).then(response => {
            console.log(id)
            console.log(response.data)
            getPlan();
        })
        }

        const keyDownHandler = (event) => {
            if (event.keyCode === 13) {sentComent(); setCommentText('')};
          };

    useEffect(() => {
        getPlan();
        getUserInfo()
    },[])

    const sortComents = [].concat(comments1).sort((a,b) => a.data < b.data).map(item => <div key={item.id} className="PlanDetailComentContent">
        <div className="TopCommentBox"><div className="CommentNick">{item.nick}</div><div>{item.data.slice(8,10)}/{item.data.slice(5,7)}/{item.data.slice(0,4)} {item.data.slice(11,16)}</div></div>
        <div className="CommentContent">{item.comment}</div>
    </div>)

    return (
        <div className="PlanDetailMain">
            <div className="PlanDetailBox">
                <div className="PlanDetailOk">
                    <div className='PlanDetailContent'>
                        <div className="PlanDetailTitle">{plan.title}</div>
                        <div className="PlanDetailAllComp">
                        <div className="PlanDetailType">typ: {plan.type}</div>
                        <div className="PlanDetailImage"><Carousel className="Carousele">{(plan.imageUrl || []).map(item => (
                            <Carousel.Item>
                                <img className="imageincarusel" src={item} alt="image"/>
                        </Carousel.Item>
                        ))}</Carousel></div>
                        
                        <div className="DescPlanTitle">Opis planu: </div>
                        <div className="PlanDetailDesc">{plan.description}</div>
                        </div>
                    </div>
                    <div className='PlanDetailComment'>
                        <p>Komentarze ({comments1.length}) : </p>
                        <div className='SentComment'>
                            <TextField placeholder="Dodaj komentarz..." value={commentText}  onKeyDown={keyDownHandler} onChange={event => setCommentText(event.target.value)}/>
                            <div className="SentCommentButtonContainer"><button disabled={!commentText} onClick={sentComent}>SKOMENTUJ</button></div>
                        </div>
                        {sortComents}
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PlanDetail;