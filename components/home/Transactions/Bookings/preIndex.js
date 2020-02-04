import React, { Component } from 'react';
import Navbar from 'Components/Layout/Navbar';
import Breadcrumb from 'Components/Common/Breadcrumb';



import { connect } from "react-redux"
import { handleAccountLogout, retrieveUserProfile} from "Ducks/user/UserActions"

import Booking from '.'
import BookingForm from './Booking_Form'


class PreIndex extends Component {


    async componentDidMount() {  
        this._isMounted = true;
        this.loadInitial()   
    }

    loadInitial = async () => {
        try {            
            if(this._isMounted) {
                this.props.retrieveUserProfile(this.props.user)
            }
        } catch (e) {
            console.log(e)       
        }      
    } 

    _HandleLogout = () => {  
        this.props.handleAccountLogout()
    }

    _FetchProfile = () => {
        this.props.retrieveUserProfile(this.props.user)
    }



    render() {
        
        if(this.props.profile){
            const bookings = this.props.profile.bookings
            return (
                <section className="about-area pb-60" style={{border:'1px solid black'}}>  
                    <div className="container" style={{border:'1px solid black'}}>

                    <div style={{display:"flex", flex: 1, flexDirection:'row'}}>
                                                                                    
                        <div className="row align-items-center flex-column" style={{flex:0.3}}>

                    
                            <div>
                                Hello world
                                {this.props.profile.userInfo && 
                                    <div style={{display:"flex", flexDirection:'column'}}>
                                        <h2>Your Agent</h2>
                                        {this.props.profile.userInfo.name}
                                    </div>
                                }                             
                            </div>
                        </div>

                        <div style={{flex: 0.7}}>

                            All Bookings, Make Bookings, History, Transactions

                        </div>
                       
                    </div>
                    
                    <button onClick={this._HandleLogout} className="btn btn-primary">logout</button>

                </div>
                </section>
            );
        } else {
            return (
                <section className="about-area pb-60" style={{border:'1px solid black'}}>
                    <div className="container" style={{border:'1px solid black'}}>
                        Loading ...
                    </div>
                </section>
            )
        }
    }
}


const mapStateToProps = state => {
    const { UserState } = state
    const { user, profile } = UserState
    return { user, profile }
}
  
export default connect(
  mapStateToProps,
  {
    handleAccountLogout,
    retrieveUserProfile
  }
)(PreIndex)