import React, {useState,useEffect} from 'react'
import Utils from './Utils'
import "./MoviePage.css"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MoviesShowSubscriptions from './MoviesShowSubscriptions'
export default function MoviePage(props){
    // const [showmovie,setShowmovie]=useState ("show");
    const [showedit,setShowedit]=useState("hide");
    const [showdelete,setShowdelete]=useState("hide");
    const [viewsub,setViewSub] = useState("hide");
    const userperm = useSelector(state=>state.users);
    useEffect(()=>{
        if(userperm[0].permissions.indexOf("Delete Movies")>-1){
            setShowdelete("DeleteMovie")
        }
        if(userperm[0].permissions.indexOf("Update Movies")>-1){
            setShowedit("EditMovie")
        }
        if(userperm[0].permissions.indexOf("View Subscriptions")>-1){
            setViewSub("show")
        }
    },[props.id])
    const deletemovie = async() =>{
        let deletemovie=await Utils.DeleteMovie(props.movie._id);
        let sub = await Utils.GetAllSubs();
        let subIdarr=[];
        if(sub != ""){
            for(let i=0;i<sub.length;i++){
                for(let j=0;j<sub[i].movies.length;j++){
                    if(sub[i].movies[j].movieId==props.movie._id);
                    let moviesarr=sub[i].movies.filter(x=>x.movieId != props.movie._id);
                    sub[i].movies=moviesarr;
                    subIdarr.push(sub[i]);
                }
            }
            for(let i=0;i<subIdarr.length;i++){
                let obj={
                    memberId:subIdarr[i].memberId,
                    movies:subIdarr[i].movies
                }
                let update = await Utils.EditSub(obj,subIdarr[i]._id)
                let sub1=await Utils.GetSubById(subIdarr[i].memberId)
                let sub2=sub1[0];
            }
        }
        props.callback(props.movie._id)
    }
    return(
        <div >
            <br/> 
            {props.movie.name} , {props.movie.premiered} <br/>
            genres: {props.movie.genres}
            <br/>
            <img src={props.movie.image}></img>
            <div className="row">
                <div>
                    <Link to={`/EditMovie/${props.id}/${props.movie._id}`}><input type="button" value="Edit Movie"  className={showedit}/></Link>
                </div>
                <div>
                    <input className={showdelete} type="button" value="Delete Movie" onClick={deletemovie} />
                </div>
            </div>
            <div className={viewsub}>
                <MoviesShowSubscriptions id={props.id} idmovie={props.movie._id} />
            </div>
        </div>
    )
}