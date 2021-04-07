const appReducer = (state = {users:[]},action)=>{
    switch (action.type){
        case "ADD":
            {
                return { ...state, users: [...state.users, action.payload] }
            }
        case "DELETE":{
            state.users = undefined
        }
    }
}
export default appReducer