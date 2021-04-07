import React, {useState,useEffect} from 'react'
import Utils from './Utils'
import { Link } from 'react-router-dom'
import './SubscriptionsPage.css'
import Subs from'./SubscriptionShowMoviesAndAdd'
import { useSelector } from 'react-redux'
export default function SubscriptionPage(props){
    const [showedit,setShowedit]=useState("hide")
    const [showdelete,setShowdelete]=useState("hide")
    const [showmovies,setShowmovies]=useState("hide")
    const [add,setAdd]=useState(true);
    const userperm = useSelector(state=>state.users);
    useEffect(()=>{
        if(userperm[0].permissions.indexOf("Update Subscriptions")>-1){
            setShowedit("showeditmember")
        }
        if(userperm[0].permissions.indexOf("Delete Subscriptions")>-1){
            setShowdelete("showdeletemember")
        }
        if(userperm[0].permissions.indexOf("View Movies")>-1){
            setShowmovies("show")
        }
    },[props.id])
    const deletemember =async() =>{
        let deletem=await Utils.DeleteMember(props.member._id);
        //need to add delete sub 
        let sub=await Utils.GetSubById(props.member._id);
        console.log(sub);
        if(sub!=""){
            console.log("hey");
            let deletes=await Utils.DeleteSub(sub[0]._id);
            console.log("deleted");
            console.log(deletes);
            console.log("done");
        }
        props.callback(props.member._id);
    }
    const render =()=>{
        setAdd(!add)
        console.log(add);
    }
    return(
        <div >
            <br />
            <h4>{props.member.name}</h4>
            email: {props.member.email} <br/>
            city: {props.member.city} <br/>
            {/* for edit and delete */}
            <div className="row">
                <div>
                    <Link  to={`/EditMember/${props.id}/${props.member._id}`}><input type="button" value="Edit member" className={showedit}/></Link>
                </div>
                <div>
                    <input className={showdelete} type="button" value="Delete member" onClick={deletemember}/>
                </div>
                {/* movies watched */}
            </div>
            <div className={showmovies}>
                <Subs callback={render} key={props.index} idmember={props.member._id} id={props.id} />
            </div>
        </div>
    )
}