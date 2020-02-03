import React, {useEffect, useState} from 'react';
import {TextField} from '@material-ui/core'
import axios from 'axios'
import firebase from 'firebase'
import * as firebaseConfig from '../../../config'

import '../../Style/NewPlan/NewPlan.css'


const NewPlan = props => {

    const fileRef1 = React.createRef()
    const fileRef2 = React.createRef()
    const fileRef3 = React.createRef()

    const [desc, setDesc] = useState('')
    const [title, setTitle] = useState('')
    const [planType, setPlanType] = useState('Trening')
    const [userEmail, setUserEmail] = useState('')
    const [uploadImage, setUploadImage] = useState([])

    const tokenId = localStorage.getItem('token');
    
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig.firebaseConfig)
    }


    const getUserInfo = async () => {
        await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBJlos2uT5xr25sp6nO23lmMqomy5D_wUI`, {idToken: tokenId})
        .then(response => {
            setUserEmail(response.data.users[0].email)
        })
    }

    const sentPlan = async () => {
        await axios.post(`https://pracainz-473cb.firebaseio.com/plans.json`, {
            description: desc,
            title: title,
            type: planType,
            userId : tokenId,
            email: userEmail,
            imageUrl: uploadImage
        }).then(res=> {
            console.log(res)
            console.log(res.data)
        }).catch(err=> {
            console.log(err)
        })
        
    }


	const addImageHandler = () => {
		const ref = firebase.storage().ref()
		const file = fileRef1.current.files[0]
		const name = (+new Date()) + '-' + file.name;
		const metadata = {
			contentType: file.type
		};

		const task = ref.child(name).put(file, metadata);
		task.then(snapshot => snapshot.ref.getDownloadURL())
			.then((response) => {
                console.log(response)
                setUploadImage([...uploadImage, response]) 
                console.log(uploadImage)
            }).catch(console.error);

    }

       
    const addImageHandler2 = () => {
		const ref = firebase.storage().ref()
		const file = fileRef2.current.files[0]
		const name = (+new Date()) + '-' + file.name;
		const metadata = {
			contentType: file.type
		};

		const task = ref.child(name).put(file, metadata);
		task.then(snapshot => snapshot.ref.getDownloadURL())
			.then((response) => {
                console.log(response)
                setUploadImage([...uploadImage, response]) 
                console.log(uploadImage)
            }).catch(console.error);

    }
    const addImageHandler3 = () => {
		const ref = firebase.storage().ref()
		const file = fileRef3.current.files[0]
		const name = (+new Date()) + '-' + file.name;
		const metadata = {
			contentType: file.type
		};

		const task = ref.child(name).put(file, metadata);
		task.then(snapshot => snapshot.ref.getDownloadURL())
			.then((response) => {
                console.log(response)
                setUploadImage([...uploadImage, response]) 
                console.log(uploadImage)
            }).catch(console.error);

	}

    


    useEffect(() => {
        getUserInfo();

    }, [])

    return (
        <div className="Addnewplan">
            <div className="AddnewplanTitle">dodaj plan</div>
            <div className="AddPlanForm">
            <div className="InputBox"><TextField label='Tytuł' className="TitleInput" value={title} onChange={event => setTitle(event.target.value)}/></div>
            <div className="InputBox"> 
                <select  value={planType} onChange={event => setPlanType(event.target.value)}>
                    <option value='Trening'>Trening</option>
                    <option value='Dieta'>Dieta</option>
                </select>
            </div>
        <div className="InputBox"><TextField multiline label="Treść planu"  rows='10' className="DescriptionInput" value={desc} onChange={event => setDesc(event.target.value)}/></div>
        <div className="InputBox InputImageBox">
            <label>+<input type="file" ref={fileRef1}  onChange={addImageHandler}/></label>
            <label >+<input type="file" ref={fileRef2} onChange={addImageHandler2}/></label>
            <label>+<input type="file" ref={fileRef3} onChange={addImageHandler3}/></label></div>
        <div className="InputBox"><button onClick={() => {sentPlan();props.history.push('/userplans')}}>Dodaj plan</button></div>
      </div>
    </div>
    )
}

export default NewPlan;