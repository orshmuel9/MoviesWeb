import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import './SubscriptionsPage.css'
import Utils from './Utils'
import { useSelector } from 'react-redux'
export default function SubscriptionShowMoviesAndAdd(props){
    const [subscription,setSubscription] = useState({_id:"",movies:[],memberId:""})
    const [moviewatch,setMoviewatch] =useState([])
    // add movie option
    const [showsubsnew,setShowsubsnew]=useState("hide")
    const [date,setDate] =useState("");
    const [movieid,setMovieid] = useState("");
    const [movies,setMovies]=useState([{genres:[],name:""}])
    // if can add movie
    const [showsubmovie,setShowsubmovie]=useState("hide")
    const userperm = useSelector(state=>state.users);
    useEffect(()=>{
        if(userperm[0].permissions.indexOf("Update Subscriptions")>-1){
            setShowsubmovie("show")
        }
    },[props.id])
    useEffect(()=>{
        const getdata=async()=>{
            let sub=await Utils.GetSubById(props.idmember);
            setSubscription(sub[0])
        }
        getdata()
    },[props.idmember])
    useEffect(()=>{
        // get all movies
        const getdata=async()=>{
            let moviesdata= await Utils.GetAllMovies();
            setMovies(moviesdata);
        }
        getdata()
    },[props.id])


    useEffect(()=>{
        //this function get all the movies that the sub saw
        const getnamemovies =async() =>{
            if(subscription != undefined){
                if(subscription.movies.length != 0){
                    let arr=subscription.movies;
                    let movies= [];
                    for(let i=0;i<arr.length;i++){
                        let movie = await Utils.GetMovieById(arr[i].movieId);
                        movies.push(movie);
                    }
                setMoviewatch(movies);
                }
            }
        }
        getnamemovies()
    },[subscription])



    // show and hide add new movie to sub
    const showsubscnew =() =>{
        if(showsubsnew=="hide"){
            setShowsubsnew("show")
        }
        else{
            setShowsubsnew("hide")
        }
    }
    const addmovietosub=async () =>{
        if(date==""){
            alert("must choose date")
        }
        else if(movieid==""){
            alert("must choose movie")
        }
        else{
            if(subscription==undefined){
                let obj={
                    memberId:props.idmember,
                    movies:[{movieId:movieid,date:date}]
                }
                let a = await Utils.AddSub(obj)
                setSubscription(a);
                // for render
                props.callback()
                // for choose new
                setMovieid("");
                setShowsubsnew("hide")
            }
            else{
                let arr=subscription.movies;
                arr.push({movieId:movieid,date:date})
                let obj={
                    memberId:props.idmember,
                    movies:arr
                }
                let b=await Utils.EditSub(obj,subscription._id);
                let updated={
                    _id:subscription._id,
                    memberId:props.idmember,
                    movies:arr
                }
                setSubscription(updated);
                // for render
                props.callback();
                // for choose new
                setMovieid("");
                setShowsubsnew("hide");
            }
        }
    }
    let arr =[];
    let arr2 = [];
    // doing the list for the movies
    if(subscription != undefined ){
        if(moviewatch.length>=0 ){
        for(let i =0;i<movies.length;i++){
            let flage=true;
            for(let j=0;j<moviewatch.length;j++){
                if(movies[i]._id == moviewatch[j]._id){
                    flage=false;
                }
            }
            if(flage==true){
                arr.push(movies[i]);
            }
        }
        arr2=arr.map((movie,index)=>{
            return <option value={movie._id} key={index}>{movie.name}</option> 
        })}
    }
    else{
        arr2=movies.map((movie,index)=>{
            return <option value={movie._id} key={index}>{movie.name}</option> 
        })
    }
    //ul
    let watch=moviewatch.map((movie,index)=>{
        if(subscription != undefined && subscription.movies.length != 0 && subscription.movies[index]!=undefined){
        return <li key={index}><Link to={`/MoviePage/${props.id}/${movie._id}`}>{movie.name} </Link>, {subscription.movies[index].date} </li>
        }
    })
    return(
        <div>
            <h4>Movies Watched</h4>
                <ul>
                    {watch}
                </ul>
                {/* subs new movie */}
                <div className="row">
                    <div>
                        <input type="button" value="subscribe to a new movie" onClick={showsubscnew} className={showsubmovie}/>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div>
                        <select className={showsubsnew} onChange={e=>setMovieid(e.target.value)}>
                            <option value="">Choose</option>
                            {/* all the movies  */}
                            {arr2}
                        </select>
                    </div>
                    <div>
                        <input type="date" className={showsubsnew} onChange={e=>setDate(e.target.value)}/>
                    </div>
                    <div>
                        <input type="button" value="add" className={showsubsnew} onClick={addmovietosub} />
                    </div>
                    {/* all this add new subs movie */}
                    </div>
        </div>
    )
}


































