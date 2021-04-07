const Subscription =require('./subscriptionsSchema');


//get All Subscriptions
const getAllSubscriptions =() =>{
    return new Promise((resolve,reject)=>{
        Subscription.find({},(err,subscriptionsData)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(subscriptionsData);
            }
        })
    })
}

// get Subscription by memberId
const getSubscriptionById =(id)=>{
    return new Promise((resolve,reject)=>{
        Subscription.find({"memberId":id},(err,subscriptionData)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(subscriptionData);
            }
        })
    })
}


// add Subscription
const addSubscription=(subscription)=>{
    return new Promise((resolve,reject)=>{
        let newSubscription= new Subscription({
            memberId:subscription.memberId,
            movies:subscription.movies
        })
        newSubscription.save((err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(newSubscription)
            }
        })
    })
}

//uppdate subscription
const updateSubscription=(subscription,id)=>{
    return new Promise((resolve,reject)=>{
        Subscription.findByIdAndUpdate(id,{memberId:subscription.memberId,movies:subscription.movies},(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("Sub updated")
            }
        })
    })
}

//delete subscription
const deleteSubscription=(id)=>{
    return new Promise((resolve,reject)=>{
        Subscription.findByIdAndDelete(id,(err)=>{
            if(err){
                reject(err)
            }
            else{
                resolve("Subscription deleted")
            }
        })
    })
}

module.exports ={deleteSubscription,addSubscription,updateSubscription,getAllSubscriptions,getSubscriptionById}