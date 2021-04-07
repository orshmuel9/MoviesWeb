import React, {useState} from 'react'
import Utils from './Utils'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './CreateAccount.css'
export default function CreateAccount(props){
    const [username,setUsername] =useState("");
    const [password,setPassword] = useState("");
    const goback =() =>{
        props.history.push('/')
    }
    const createuser =async (event) =>{
        event.preventDefault();
        if(username==""){
            alert("must write username")
        }
        else if(password==""){
            alert("must write pw")
        }
        else{
            let option ={
                username:username,
                password:password
            }
            let answer=await Utils.CreateAccount(option);
            if(answer=="No user"){
                alert("should call admin to create for u a user");
            }
            else if(answer=="Created user"){
                alert("now u can log in to the web !")
                props.history.push('/')
            }
        }
    } 
    
    return(
        <div>
            <form onSubmit={createuser}>
            username <TextField type="text" onChange={e=>setUsername(e.target.value)}/> <br/>
            password: <TextField type="password" onChange={e=>setPassword(e.target.value)} /> <br/> <br/>
            <input type="button" value="Go Back" onClick={goback} className="backtologin"/>
            <input type="submit" value="Create User" className="createuser"/>
            </form>
        </div>
    )
}