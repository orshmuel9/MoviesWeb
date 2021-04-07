import axios from 'axios' ;

//LogIn
const login=async (option)=>{
    let data= await axios.post("http://localhost:8080/api/users/login",option);
    let login=data.data;
    return login;
}
//get perm by id for store
const Permmision=async (id)=>{
    let data=await axios.get(`http://localhost:8080/api/users/${id}/perm`)
    let perm=data.data;
    return perm;
}
//get Json by id for store
const Json=async (id)=>{
    let data=await axios.get(`http://localhost:8080/api/users/${id}/userJson`)
    let JsonData=data.data;
    return JsonData;
}
// get user by id
const GetUserById=async (id)=>{
    let data = await axios.get(`http://localhost:8080/api/users/${id}`)
    let user=data.data;
    return user;
}
// get all users
const GetUsers = async () =>{
    let data=await axios.get(`http://localhost:8080/api/users`)
    let users=data.data;
    return users;
}
// add user
const AddUser = async (user) =>{
    let data=await axios.post("http://localhost:8080/api/users",user);
    let newuser=data.data;
    return newuser;
}
// when add he should get PW 
const CreateAccount =async(option)=>{
    let data=await axios.post("http://localhost:8080/api/users/create",option)
    let answer=data.data;
    return answer
}
// for delete user
const DeleteUser = async(id)=>{
    let data=await axios.delete(`http://localhost:8080/api/users/${id}`);
    let answer=data.data;
    return answer;
}
// edit user
const EditUser = async(id,user)=>{
    let data=await axios.put(`http://localhost:8080/api/users/${id}`,user);
    let answer=data.data;
    return answer;
}
//movies
//Get al movies
const GetAllMovies= async()=>{
    let data=await axios.get("http://localhost:8080/api/movies/")
    let movies=data.data;
    return movies
}//get movie by id
// get by member id
const GetMovieById=async (id)=>{
    let data= await axios.get(`http://localhost:8080/api/movies/${id}`)
    let movie=data.data;
    return movie;
}//delete movie
const DeleteMovie=async(id)=>{
    let data= await axios.delete(`http://localhost:8080/api/movies/${id}`);
    let answer=data.data;
    return answer;
}//edit movie
const EditMovie = async(id,movie)=>{
    let data = await axios.put(`http://localhost:8080/api/movies/${id}`,movie);
    let answer=data.data;
    return answer
}// add movie
const AddMovie = async(movie)=>{
    let data= await axios.post("http://localhost:8080/api/movies/",movie)
    let answer=data.data;
    return answer
}
// memeber and sub 
const GetAllMembers = async() =>{
    let data = await axios.get("http://localhost:8080/api/members");
    let members=data.data;
    return members
}
//get member by id
const GetMemberById= async(id) =>{
    let data = await axios.get(`http://localhost:8080/api/members/${id}`);
    let member=data.data;
    return member
}
//add member
const AddMember = async(member)=>{
    let data=await axios.post("http://localhost:8080/api/members",member);
    let answer=data.data;
    return answer;
}
// edit member
const EditMember = async(member,id)=>{
    let data= await axios.put(`http://localhost:8080/api/members/${id}`,member);
    let answer=data.data;
    return answer;
}
// delete memebr 
const DeleteMember = async(id)=>{
    let data=await axios.delete(`http://localhost:8080/api/members/${id}`)
    let answer=data.data;
    return answer;
}
/// subscriptions
// get all
const GetAllSubs = async()=>{
    let data=await axios.get("http://localhost:8080/api/subscriptions");
    let subs=data.data;
    return subs
}
//get by id
const GetSubById = async(id)=>{
    let data=await axios.get(`http://localhost:8080/api/subscriptions/${id}`);
    let sub=data.data;
    return sub;
}
// get Add sub
const AddSub=async (sub)=>{
    let data=await axios.post("http://localhost:8080/api/subscriptions",sub);
    let answer=data.data;
    return answer
}
// edit sub
const EditSub=async (sub,id)=>{
    let data=await axios.put(`http://localhost:8080/api/subscriptions/${id}`,sub);
    let answer=data.data;
    return answer
}
// delete sub
const DeleteSub= async(id)=>{
    let data=await axios.delete(`http://localhost:8080/api/subscriptions/${id}`);
    let answer=data.data;
    return answer
}
export default {login,GetUserById,GetUsers,AddUser,CreateAccount,DeleteUser,EditUser,Permmision,Json,GetAllMovies,DeleteMovie,EditMovie,GetMovieById,AddMovie,GetAllMembers,GetMemberById,AddMember,EditMember,DeleteMember,GetAllSubs,GetSubById,AddSub,DeleteSub,EditSub}