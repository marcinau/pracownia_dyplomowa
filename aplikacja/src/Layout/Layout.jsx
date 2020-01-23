import React from 'react'
import { Route, Switch } from "react-router-dom";
import MainPage from './Views/MainPage/MainPage';
import NewPlan from './Views/NewPlan/NewPlan'
import NavBar from '../Components/Navbar'
import Messages from './Views/Messages/Messages'
import CreateMessage from './Views/Messages/CreateMessage'
import SideBar from '../Components/Sidebar'
import PlanDetail from './Views/PlanDetail/PlanDetail'
import AllPlans from './Views/AllPlans/AllPlans'
import UserPlans from './Views/UserPlans/UserPlans';
import UserProfile from './Views/UserProfile/UserProfile'
import AdminPanel from './Views/AdminPanel/AdminPanel'

import './Style/Layout.css'


const Layout = props => {
    return (
        <div className="LayoutBox">
        <NavBar className='navBarComponent'/>
        <SideBar className='sideBarComponent'/>
        <Switch>
            <Route path="/add_plan" component={NewPlan}/>
            <Route path="/home"  component={MainPage}/>
            <Route path="/Create_message"   component={CreateMessage}/>
            <Route path="/messages"   component={Messages}/>
            <Route path="/allplans"  component={AllPlans} />
            <Route path="/userplans"  component={UserPlans} />
            <Route path='/profile' component={UserProfile}/>
            <Route path='/admin_panel' component={AdminPanel}/>
            <Route path="/plan/:id"  component={PlanDetail} />
            <Route path="/"  component={MainPage}/>
        </Switch>
        </div>
    )
}

export default Layout;