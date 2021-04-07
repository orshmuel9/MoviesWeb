import React, { useState } from 'react';
import {Route, Switch} from 'react-router-dom';
import Loginpage from './Loginpage';
import CreateAccount from './CreateAccount'
import MainPage from './MainPage'
import UsersMangemengt from './UsersMangement'
import UserCreate from './UserCreate'
import EditUser from './EditUser'
import MoviesPage from './MoviesPage'
import EditMovie from './EditMovie'
import AddMovie from './AddMovie'
import SubscriptionsPage from './SubscriptionsPage'
import AddMemebr from './AddMember'
import EditMember from './EditMember'
import MoviePageFromSub from './MoviePageFromSub'
import SubPageFromMovie from './SubPageFromMovie'
export default function Main(props){
    return(
        <div>
            <Switch>
                {/* log in and create */}
                <Route path="/" exact component={Loginpage} />
                <Route path="/CreateAcoount" exact  component={CreateAccount}/>
                {/* main page */}
                <Route path="/MainPage/:id"  component={MainPage} />
                {/* users */}
                <Route path="/UsersMangement/:id"  component={UsersMangemengt} />
                <Route path="/UserCreate/:id" component={UserCreate}/>
                <Route path="/EditUser/:id/:userid" component={EditUser} />
                {/* movies */}
                <Route path="/MoviesPage/:id" component={MoviesPage} />
                <Route path="/EditMovie/:id/:movieid" component={EditMovie} />
                <Route path="/AddMovie/:id" component={AddMovie} />
                <Route path="/SubPage/:id/:subid" component={SubPageFromMovie} />
                {/* sub */}
                <Route path="/SubscriptionsPage/:id" component={SubscriptionsPage} />
                <Route path="/AddMember/:id" component={AddMemebr} />
                <Route path="/EditMember/:id/:memberid" component={EditMember}/>
                <Route path="/MoviePage/:id/:movieid" component={MoviePageFromSub}/>
            </Switch>
        </div>
    )
}
