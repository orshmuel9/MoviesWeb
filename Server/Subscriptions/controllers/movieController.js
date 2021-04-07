const express = require('express');
const movieBL=require('../models/movieBL');
const router = express.Router();
//get all movies
router.route('/').get( async(req,resp)=>{
    
    let data=await movieBL.getAllMovies();
    return resp.json(data);
})

//get by id
router.route('/:id').get(async (req,resp)=>{
    let id=req.params.id;
    let data= await movieBL.getMovieById(id);
    return resp.json(data);
})

//add movie

router.route('/').post(async(req,resp)=>{
    let newmovie=req.body;
    let data=await movieBL.addMovie(newmovie);
    return resp.json(data);
})

//updade movie
router.route('/:id').put(async(req,resp)=>{
    let updatemovie=req.body;
    let id=req.params.id;
    let data=await movieBL.updateMovie(updatemovie,id);
    return resp.json(data);
})

//delete movie
router.route('/:id').delete(async (req,resp)=>{
    let id=req.params.id;
    let data= await movieBL.deletmovie(id);
    return resp.json(data);
})

module.exports = router