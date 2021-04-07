import React, {useState,useEffect} from 'react';
import Utils from './Utils'
export default function SubPageFromMovie(props){
    const [member,setMember] = useState({name:""});
    const [name,setName] = useState(member.name);
    const [email,setEmail]=useState(member.email);
    const [city,setCity]=useState(member.city);
    useEffect(()=>{
        const getdata =async ()=>{
            let data=await Utils.GetMemberById(props.match.params.subid);
            setMember(data)
            setName(data.name);
            setEmail(data.email);
            setCity(data.city);
        }
        getdata()
    },[props.match.params.id])
    const Goback =() =>{
        props.history.push(`/MoviesPage/${props.match.params.id}`)
    }
    return(
        <div>
            <h1>Sub Page {name} </h1>
            name: {name} <br/> <br/>
            email: {email}<br/> <br/>
            city: {city}<br/> <br/>
            <input type="button" value="Go Back To Movies" onClick={Goback}/>
        </div>
    )
}