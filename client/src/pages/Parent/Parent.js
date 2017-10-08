import React, { Component } from "react";
import './Parent.css';
import API from "../../utils/API";
import {KidDropDown} from "../../components/KidDropDown/KidDropDown.js";
import {Chore} from "../../components/Chore/Chore.js"
import {Reward} from "../../components/Reward/Reward.js"
import { Link } from "react-router-dom";

class Parent extends Component {
    state = {
        selectedKidid:"",selectedKidName:"",
        chores:[{taskName:"Do the dishes",RedeemStatus:"undone"},{taskName:"Take out the trash",RedeemStatus:"done"}],
        rewards:[{RewardName:"soccer ball",RewardPoints:"500"},{RewardName:"iphone",RewardPoints:"1000"}],
        kids:[{childName:"Alex",childid:"1"},{childName:"Mary",childid:"2"},{childName:"Lauren",childid:"3"}] 
    };
    componentDidMount(){
        API.allKids("sessionid").then(res=>console.log("this.setState({kids:res});"));
    };
    handleKidChange=(event)=>{
        this.setState({selectedKidid:event.target.id});
        this.setState({selectedKidName:event.target.value});
        API.allChildChores(event.target.id).then(res=>console.log("this.setState({chores:res})"));
      };
    render() {
    return (
        <div>
        <div className="navbar">
        <div className="row">
        <div className="col-sm-6">
        <img className="logo" src = "assets/logo.png" alt= "logo" />
        <span className="chore">ChoreScore</span>  
        </div>
        <div className="col-sm-6">
         <KidDropDown  kids={this.state.kids} handleKidChange={this.handleKidChange}  />
       </div>
        </div>

        </div>
       
        <div className="text-center"> <h2> {this.state.selectedKidName} </h2></div>

        
        <div className="row">
        <div className="col-sm-6">
           <div className="calender">
             <b>October 14th</b>
           </div> 

           <div className="reward-list">
           {this.state.rewards.map(reward=>
            <Reward title={reward.RewardName} points={reward.RewardPoints} />
            )}
            <div className="link-btn text-center"> 
             <Link to="/parent/addreward" >
              Add Reward
             <img src = "/assets/addChoresBtn.png" alt="add chores button" />
             </Link> 
             </div>  
         </div>
        </div>



        <div className="col-sm-6 kid-chores">
            {this.state.chores.map(chore=>
          <Chore type="parent" title={chore.taskName} status={chore.RedeemStatus} />
            )}
            <div className="link-btn text-right">  
            <Link to="/parent/addchore" >
            Add Chores
            <img src = "/assets/addChoresBtn.png" alt="add chores button" />
            </Link>        
            </div>
        </div>
        </div>
        


        </div>
);
    }
}

export default Parent;