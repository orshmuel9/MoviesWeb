import React, {useState,useEffect} from 'react'
import Utils from './Utils'
import {Link} from 'react-router-dom';
import "./MoviesPage.css"
export default function MoviesShowSubscriptions(props){
    const [members,setMembers]=useState([])
    const [sub,setSub]=useState([]);
    const [date,setDate]=useState([]);
    useEffect(()=>{
        const getdata =async()=>{
            let subscriptions =await Utils.GetAllSubs();
            // get all subs
            if(subscriptions != ""){
                let arrsub=[];
                let arrdate=[];
                for(let i=0;i<subscriptions.length;i++){
                    for(let j=0;j<subscriptions[i].movies.length;j++){
                        if(subscriptions[i].movies[j].movieId==props.idmovie){
                            arrsub.push(subscriptions[i].memberId);
                            arrdate.push(subscriptions[i].movies[j].date);
                        }
                    }
                }
                setSub(arrsub)
                setDate(arrdate)
            }
        }
        getdata();
    },[props.idmovie])
    // get all the members that watch that movie
    useEffect(()=>{
        const getdata=async()=>{
            let arr=[];
            if(sub != undefined){
                for(let i=0;i<sub.length;i++){
                    let member = await Utils.GetMemberById(sub[i]);
                    arr.push(member)
                }
            setMembers(arr);
            }
        }
        getdata()
    },[sub])
    let obj=members.map((member,index)=>{
        return <li key={index}><Link to={`/SubPage/${props.id}/${member._id}`}>{member.name}</Link> , {date[index]}</li>
    })
    return(
        <div>
            <h3>Subscription watched</h3>
            <ul>
                {obj}
            </ul>
        </div>
    )
}