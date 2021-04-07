import React, {useState,useEffect} from 'react';
import Utils from './Utils'
export default function MoviePageFromSub(props){
    const [movie,setMovie] = useState({genres:[],name:""});
    const [genres,setGenres] = useState(movie.genres);
    const [name,setName] = useState(movie.name);
    const [image,setImage] = useState(movie.image);
    const [premiered,setPremiered] = useState(movie.premiered)
    useEffect(()=>{
        const getdata=async ()=>{
            let moviedata=await Utils.GetMovieById(props.match.params.movieid)
            setMovie(moviedata);
            setGenres(moviedata.genres);
            setName(moviedata.name);
            setImage(moviedata.image);
            let date=moviedata.premiered;
            let newdate="";
            for(let i=0;i<10;i++){
                newdate=newdate+date[i]
            }
            setPremiered(newdate);
        }
        getdata()
    },[props.match.params.id])
    const Goback =() =>{
        props.history.push(`/SubscriptionsPage/${props.match.params.id}`)
    }
    return(
        <div>
            <h3> movie page  {name}</h3>
            name: {name} <br/> <br/>
            genres: {genres}<br/> <br/>
            premeird: {premiered}<br/> <br/>
            <img src={image} />
            <br/>
            <input type="button" value="goback" onClick={Goback}/>
        </div>
    )
}