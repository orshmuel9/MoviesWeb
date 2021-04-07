import React, { useState } from 'react';
import Utils from './Utils'
import './AddMovie.css'
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
export default function AddMovie(props){
    const [name,setName] = useState("");
    const [genres,setGenres] = useState("");
    const [image,setImage] = useState("");
    const [date,setDate] = useState("")
    const goback = () =>{
        props.history.push(`/MoviesPage/${props.match.params.id}`)
    }
    const checkname = async (name)=>{
        let bol=true;
        let movies=await Utils.GetAllMovies();
        movies.forEach(movie => {
            if(movie.name==name){
                bol=false
            }
        });
        return bol
    }
    const addmovie=async()=>{
        let word= "";
        let arr=[];
        let bolname=await checkname(name);
        for(let i=0;i<genres.length;i++){
            if(genres[i]!=","){
                word=word+genres[i]
            }
            else{
                arr.push(word);
                word="";
            }
        }
        if(word!=""){
            arr.push(word);
        }
        if(name==""){
            alert("must write name")
        }
        else if(bolname==false){
            alert("name already taken")
        }
        else if(arr==""){
            alert("need to write geners")
        }
        else if(image==""){
            alert("must write image")
        }
        else if(date==""){
            alert("must write date")
        }
        else{
            let movie={
                genres:arr,
                name:name,
                image:image,
                premiered:date
            }
            let add= await Utils.AddMovie(movie);
            props.history.push(`/MoviesPage/${props.match.params.id}`)
        }
    }
    return(
        <div>
            Name: <input type="text" onChange={e=>setName(e.target.value)} className="input" /> <br />
            genres: <input type="text" onChange={e=>setGenres(e.target.value)} className="input"/> <br />
            image url: <input type="text" onChange={e=>setImage(e.target.value)} className="input"/> <br />
            premeried: <input type="date" onChange={e=>setDate(e.target.value)} className="input"/> <br/>
            <Button onClick={goback} variant="contained" color="secondary" size="small">Go Back</Button>
            <Button onClick={addmovie} variant="contained" color="primary" startIcon={<SaveIcon />} size="small">Add Movie</Button>
        </div>
    )
}