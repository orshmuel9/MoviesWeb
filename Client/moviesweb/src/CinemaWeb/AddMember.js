import React, {useState,useEffect} from 'react'
import Utils from './Utils'
import './AddMember.css'
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
export default function AddMember(props){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [city,setCity]=useState("");
    const Goback =() =>{
        props.history.push(`/SubscriptionsPage/${props.match.params.id}`)
    }
    const checkemail =async (email) =>{
        let bol=true;
        let members= await Utils.GetAllMembers();
        members.forEach(member => {
            if(member.email==email){
                bol=false;
            }
        });
        return bol;
    }
    const checkFullName=(fullName) =>{
        const notVlaidInputArr = ["0","1","2","3","4","5","6","7","8","9",",","<",".",">","/","?","!","@","#","$","%","^","&","*","(",")","-","_","=","+","*","`","~",];
        let flageFullName = true;
        for(let i=0;i<fullName.length;i++){
            for(let j=0;j<notVlaidInputArr.length;j++){
                if(fullName[i].includes(notVlaidInputArr[j])){
                    flageFullName=false;
                }
            }
        }
        return flageFullName;
    }
    const emailIsValid= (email)=> {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    const addmember= async()=>{
        let bolname=checkFullName(name);
        let bolemail=await checkemail(email);
        let bolemailvalid=emailIsValid(email)
        if(name==""){
            alert("should write name")
        }
        else if(bolname==false){
            alert("name not valid")
        }
        else if(email==""){
            alert("should write email")
        }
        else if(bolemailvalid==false){
            alert("email should be like _____@___.")
        }
        else if(bolemail==false){
            alert("email already taken")
        }
        else if(city==""){
            alert("should write city")
        }
        else{
            let member={
                name:name,
                email:email,
                city:city
            }
            let newmember= await Utils.AddMember(member);
            props.history.push(`/SubscriptionsPage/${props.match.params.id}`)
        }
    }
    return(
        <div>
            <h3>Add New Member</h3>
            Name: <input type="text" onChange={e=>setName(e.target.value)} className="input" /><br/>
            Email: <input type="text" onChange={e=>setEmail(e.target.value)} className="input"/> <br/>
            City:  <input type="text" onChange={e=>setCity(e.target.value)} className="input"/><br/>
            <Button onClick={Goback}  variant="contained" color="secondary" size="small">Go Back</Button>
            <Button onClick={addmember} variant="contained" color="primary" startIcon={<SaveIcon />} size="small">Add Member</Button>
        </div>
    )
    
}