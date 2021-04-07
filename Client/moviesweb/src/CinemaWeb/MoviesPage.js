import React, {useState,useEffect} from 'react'
import Utils from './Utils'
import MoviePage from './MoviePage'
import './MoviesPage.css'
import { useSelector } from 'react-redux'
export default function MoviesPage(props){
    const [search,setFindmovie] = useState("");
    const [movies,setMovies] =useState([{genres:[],name:""}])
    const [showmovies,setShowmovies] = useState("show");
    const [showadd,setShowAdd] = useState("hide")
    const userperm = useSelector(state=>state.users);
    // use effect gel all movies
    useEffect(()=>{
        const getdata=async ()=>{
            let moviesdata=await Utils.GetAllMovies();
            setMovies(moviesdata)
        }
        getdata()
    },[props.match.params.id])
    useEffect(()=>{
        if(userperm[0].permissions.indexOf("Create Movies")>-1){
            setShowAdd("addmovie")
        }
    },[props.match.params.id])
    const Goback =() =>{
        props.history.push(`/MainPage/${props.match.params.id}`)
    }
    const showorhide = () =>{
        if(showmovies=="hide"){
            setShowmovies("show")
        }
        else{
            setShowmovies("hide")
        }
    }
    const deletemovie = (id) =>{
        let arr=movies;
        let newarr= arr.filter(x=> x._id !=id);
        arr=newarr;
        setMovies(arr);
    }
    // movie page
    let obj=movies.map((movie,index)=>{
        if(movie.name.includes(search)==true || movie.name.toLowerCase().includes(search)==true){
        return <MoviePage key={index} id={props.match.params.id}  movie={movie} callback={id=>deletemovie(id)}/>
        }
    })
    const addmovie= () =>{
        props.history.push(`/AddMovie/${props.match.params.id}`)
    }
    return(
        <div>
            <h3>Movies Page -  {userperm[1].FirstName} {userperm[1].LastName}</h3>
            <div className="row">
                <div>
                    <input type="button" value="Show movies" onClick={showorhide} className="showmovie"/>
                </div>
                <div>
                    <input type="button" value="Add movie" onClick={addmovie} className={showadd}/>
                </div>
                <div>
                    <input type="button" value="Back To Menu" onClick={Goback} className="goback"/> <br/> 
                </div>
            </div>
            Serch movie : <input type="text" onChange={e=>setFindmovie(e.target.value)} placeholder="serch movie" className="input"/>  <br/> <br/>
            <div className={showmovies}>
                {obj}
            </div>
            
        </div>
    )
}