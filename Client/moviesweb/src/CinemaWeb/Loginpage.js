import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import Utils from './Utils'
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
export default function Loginpage(props){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("")
    const dispatch = useDispatch()
    const login =async ()=>{
        if(username==""){
            alert("must write username")
        }
        else if(password==""){
            alert("must write ps")
        }
        else{
            let obj={username:username,password:password};
            let login = await Utils.login(obj);
            if(login.bol==true){
                alert(` hey ${login.username}`)
                let perm=await Utils.Permmision(login.id)
                dispatch({ type: 'ADD',payload: perm})
                let Jsondata=await Utils.Json(login.id);
                let date= new Date();
                let date2=new Date();
                date2.setMinutes(date.getMinutes()+Jsondata.SessionTimeOut);
                dispatch({ type: 'ADD',payload: Jsondata});
                dispatch({type:'ADD',payload:date2})
                props.history.push(`/MainPage/${login.id}`)
            }
            else{
                alert("wrong username or pw")
            }
        }
    }
    return(
        <div>
            <h4>Log in Page</h4>
            Username: <TextField type="text" onChange={e=>setUsername(e.target.value)}/> <br/>
            Password: <TextField type="password" onChange={e=>setPassword(e.target.value)}/> <br/> <br/>
            <Button variant="contained" color="primary" onClick={login} >login</Button> <br/> <br/>
            new user? <Link to="/CreateAcoount">Create Account</Link>
        </div>
    )
}