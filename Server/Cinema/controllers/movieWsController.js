const express = require('express');
const router = express.Router();
const axios = require('axios');
// get all movies
router.route('/').get(async(req,resp)=>{
    let movies=await axios.get("http://localhost:8000/api/movies");
    return resp.json(movies.data);
})
//get by id 
router.route('/:id').get(async(req,resp)=>{
    let id=req.params.id;
    let movie= await axios.get(`http://localhost:8000/api/movies/${id}`);
    return resp.json(movie.data);
})
// add Movie
router.route('/').post(async(req,resp)=>{
    let newmovie=req.body;
    let addmovie=await axios.post(`http://localhost:8000/api/movies`,newmovie);
    return resp.json(addmovie.data);
})
//update
router.route('/:id').put(async(req,resp)=>{
    let id=req.params.id;
    let updatemovie=req.body;
    let update= await axios.put(`http://localhost:8000/api/movies/${id}`,updatemovie);
    return resp.json(update.data)
})
//delete movie
router.route('/:id').delete(async(req,resp)=>{
    let id=req.params.id;
    let deletemovie= await axios.delete(`http://localhost:8000/api/movies/${id}`);
    return resp.json(deletemovie.data);
})
module.exports = router;