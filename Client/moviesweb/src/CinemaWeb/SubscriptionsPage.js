import React, {useState,useEffect} from 'react'
import Utils from './Utils'
import { useSelector } from 'react-redux'
import SubscriptionPage from './SubscriptionPage'
import './SubscriptionsPage.css'
export default function SubscriptionsPage(props){
    const [members,setMembers] = useState([{name:""}])
    const [showmembers,setShowmember] =useState("show")
    const [showadd,setShowadd]=useState("hide")
    const userperm = useSelector(state=>state.users);
    useEffect(()=>{
        const getdata=async ()=>{
            let membersdata=await Utils.GetAllMembers();
            setMembers(membersdata)
        }
        getdata()
    },[props.match.params.id])
    useEffect(()=>{
        if(userperm[0].permissions.indexOf("Create Subscriptions")>-1){
            setShowadd("showaddmember")
        }
    },[props.match.params.id])
    const Goback =() =>{
        props.history.push(`/MainPage/${props.match.params.id}`)
    }
    const AddMember=()=>{
        props.history.push(`/AddMember/${props.match.params.id}`)
    }
    const deletemember = (id) =>{
        let arr=members;
        let newarr=arr.filter(x=> x._id != id);
        arr=newarr;
        setMembers(arr)
    }
    const obj=members.map((member,index)=>{
        return <SubscriptionPage key={index} member={member} index={index+"i"} id={props.match.params.id} callback={id=>deletemember(id)}/>
    })
    const showorhide= () =>{
        if(showmembers=="hide"){
            setShowmember("show")
        }
        else{
            setShowmember("hide")
        }
    }
    return(
        <div>
            <h3>Subscriptions Page  - {userperm[1].FirstName} {userperm[1].LastName}</h3>
            <div className="row">
            <input type="button" value="All members" onClick={showorhide} className="showmembers"/>
            <div>
                <input type="button" value="Add members" onClick={AddMember} className={showadd}/>
            </div>
            <input type="button" value="Back To Menu" onClick={Goback} className="menu"/>
            </div>
            <div className={showmembers}>
                {obj}
            </div>
        </div>
    )
}