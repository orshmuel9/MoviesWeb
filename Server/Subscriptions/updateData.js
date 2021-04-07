const axios = require('axios');
const memberBL=require('./models/memberBL');
const movieBL=require('./models/movieBL');
const subscriptionsBL=require('./models/subscriptionBL')

const updatemembers =async() =>{
    // all data my api
    let data=await memberBL.getAllMembers();
    let arr = data.map(member=>{
        return memberBL.deletemember(member._id);
    })
    //all members from api web
    let membersdata=await axios.get("https://jsonplaceholder.typicode.com/users")
    let members=membersdata.data;
    members.map(member=>{
        let obj={
            name:member.name,
            email:member.email,
            city:member.address.city
        }
        memberBL.addMember(obj)
    })
}

const updatemovies = async() =>{
    // all data my api
    let data= await movieBL.getAllMovies();
    let arr=data.map(movie=>{
        return movieBL.deletmovie(movie._id);
    })
    // all movies from api web
    let moviesdata= await axios.get("https://api.tvmaze.com/shows");
    let movies=moviesdata.data;
    movies.map(movie=>{
        let obj={
            name:movie.name,
            genres:movie.genres,
            image:movie.image.medium,
            premiered:movie.premiered
        }
        movieBL.addMovie(obj)
    })
}
// delete al sub 
const updatesubscriptions = async()=>{
    let data=await subscriptionsBL.getAllSubscriptions();
    let arr=data.map(subscription=>{
        return subscriptionsBL.deleteSubscription(subscription._id);
    })
}


module.exports ={updatemembers,updatemovies,updatesubscriptions}