import React, {useState,useEffect} from 'react'
import Utils from './Utils'
import "./MainPage.css"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

export default function MainPage(props){
    const [showmeng,setShowmeng] = useState("hide");
    const [showmovies,setShowmovies]=useState("hide");
    const [showSub,setShowsub] = useState("hide") 
    const userperm = useSelector(state=>state.users);
    const dispatch = useDispatch();
    setInterval(()=>{
        let date=new Date();
        if(userperm[2].toString()==date.toString()){
            props.history.push('/')
            dispatch({ type: 'DELETE'})
            alert("your time has ended")
        }
    },1000)
    const logout =() =>{
        props.history.push('/')
        dispatch({ type: 'DELETE'})
    }
    useEffect(()=>{
        // check permissions
        if(userperm[0].permissions.indexOf("Admin")>-1){
            setShowmeng("showadmin")
        }
        if(userperm[0].permissions.indexOf("View Movies")>-1){
            setShowmovies("showmovies")
        }
        if(userperm[0].permissions.indexOf("View Subscriptions")>-1){
            setShowsub("showsub")
        }
    },[props.match.params.id])
    const GoToUsersMan =() =>{
        props.history.push(`/UsersMangement/${props.match.params.id}`)
    }
    const GoToMovies =() =>{
        props.history.push(`/MoviesPage/${props.match.params.id}`)
    }
    const GoToSub =() =>{
        props.history.push(`/SubscriptionsPage/${props.match.params.id}`)
    }
    return(
        <div> 
            <h3>Hey {userperm[1].FirstName} {userperm[1].LastName}</h3>
            <div className="row">
                <div> 
                    <input type="button" value="Movies" onClick={GoToMovies} className={showmovies}/>
                </div>
                <div>
                    <input type="button" value="Subscriptions" onClick={GoToSub} className={showSub}/>
                </div>
                <div>
                    <input type="button" value="UsersMangement" onClick={GoToUsersMan} className={showmeng}/>
                </div>
            {/* everyone can see */}
                <div>
                    <input type="button" value="Logout" onClick={logout} className="logout"/>
                </div>
            </div>
        </div>
    )
}