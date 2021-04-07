const Movie=require('./movieSchema');

//get All Movies
const getAllMovies =() =>{
    return new Promise((resolve,reject)=>{
        Movie.find({},(err,moviesdata)=>{
            if(err){
                reject(err);
            }
            else{
                
                resolve(moviesdata);
            }
        })
    })
}

// get movie by id
const getMovieById =(id)=>{
    return new Promise((resolve,reject)=>{
        Movie.findById(id,(err,moviedata)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(moviedata);
            }
        })
    })
}

// add movie
const addMovie=(movie)=>{
    return new Promise((resolve,reject)=>{
        let newmovie= new Movie({
            name:movie.name,
            genres:movie.genres,
            image:movie.image,
            premiered:movie.premiered
        })
        newmovie.save((err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("movie created!")
            }
        })
    })
}

//uppdate movie
const updateMovie=(movie,id)=>{
    return new Promise((resolve,reject)=>{
        Movie.findByIdAndUpdate(id,{name:movie.name,genres:movie.genres,image:movie.image,premiered:movie.premiered},(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("updated movie")
            }
        })
    })
}

//delete movie
const deletmovie=(id)=>{
    return new Promise((resolve,reject)=>{
        Movie.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("Movie deleted")
            }
        })
    })
}

module.exports ={getAllMovies,getMovieById,updateMovie,addMovie,deletmovie}