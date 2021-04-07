import Util from './Utils'
import React, {useState,useEffect} from 'react'
import './EditMovie.css'
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
export default function EditMovie(props){
    const [movie,setMovie] = useState({genres:[],name:""});
    const [genres,setGenres] = useState(movie.genres);
    const [name,setName] = useState(movie.name);
    const [image,setImage] = useState(movie.image);
    const [premiered,setPremiered] = useState(movie.premiered);
    useEffect(()=>{
        const getdata=async ()=>{
            let moviedata=await Util.GetMovieById(props.match.params.movieid)
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
    },[props.match.params.movieid])
    const goback = () =>{
        props.history.push(`/MoviesPage/${props.match.params.id}`)
    }
    const checkname = async (name)=>{
        let bol=true;
        let movies=await Util.GetAllMovies();
        movies.forEach(movie => {
            if(movie.name==name){
                bol=false
            }
        });
        let movie=await Util.GetMovieById(props.match.params.movieid);
        if(movie.name==name){
            bol=true;
        }
        return bol
    }
    const editmovie =async() =>{
        let string=genres.toString();
        let word= "";
        let arr=[];
        let bolname=await checkname(name);
        for(let i=0;i<string.length;i++){
            if(string[i]!=","){
                word=word+string[i]
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
        else if(premiered==""){
            alert("must write date")
        }
        else{
            let movie={
                genres:arr,
                name:name,
                image:image,
                premiered:premiered
            }
            let update = await Util.EditMovie(props.match.params.movieid,movie);
            props.history.push(`/MoviesPage/${props.match.params.id}`)
        }
    }
    

    return(
        <div>
            <h3>Edit Movie - {movie.name}</h3>
            name:<input type="text" defaultValue={name} onChange={e=>setName(e.target.value)} className="input"/> <br/>
            genres:<input type="text" defaultValue={genres}  onChange={e=>setGenres(e.target.value)} className="input"/> <br/>
            image: <input type="text" defaultValue={image}  onChange={e=>setImage(e.target.value)} className="input"/> <br/>
            premiered: <input type="date" defaultValue={premiered} className="input"/> <br/>
            <Button onClick={goback} variant="contained" color="secondary" size="small">Go Back</Button>
            <Button onClick={editmovie} variant="contained" color="primary" startIcon={<SaveIcon />} size="small">Edit</Button>
        </div>
    )
}