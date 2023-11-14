import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class FeaturesV1 extends Component {

    render() {

    let publicUrl = process.env.PUBLIC_URL+'/'

    let customClass = this.props.customClass ? this.props.customClass :''

    return <div className={ customClass } >
			  <div className="container">
			    <div className="row">
			      <div className="col-lg-12">
			        <div className="section-title-area ltn__section-title-2--- text-center">
			          <h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">Our Services</h6>
			          <h1 className="section-title">Our Main Focus</h1>
			        </div>
			      </div>
			    </div>
			    <div className="row ltn__custom-gutter--- justify-content-center go-top">
			      <div className="col-lg-4 col-sm-6 col-12">
			        <div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
			          <div className="ltn__feature-icon">
			            <img src={publicUrl+"assets/img/icons/icon-img/21.png"} alt="#" />
			          </div>
			          <div className="ltn__feature-info">
			            <h3><Link to="/add-task">Post A Task</Link></h3>
							<p> Tell others your task requirements and see if anyone is willing to take over your task and solve your troubles! </p>
							<Link className="ltn__service-btn" to="/add-task">Post A Task <i className="flaticon-right-arrow" /></Link>
			          </div>
			        </div>
			      </div>
			      <div className="col-lg-4 col-sm-6 col-12">
			        <div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1 active">
			          <div className="ltn__feature-icon">
			            <img src={publicUrl+"assets/img/icons/icon-img/22.png"} alt="#" />
			          </div>
			          <div className="ltn__feature-info">
							<h3><Link to="/tasks">Find A Task</Link></h3>
							<p>If you want to see if there are any tasks you are interested in and learn about them, come here and take a look!</p>
							<Link className="ltn__service-btn" to="/tasks">Find A Task <i className="flaticon-right-arrow" /></Link>
			          </div>
			        </div>
			      </div>
			      <div className="col-lg-4 col-sm-6 col-12">
			        <div className="ltn__feature-item ltn__feature-item-6 text-center bg-white  box-shadow-1">
			          <div className="ltn__feature-icon">
			            <img src={publicUrl+"assets/img/icons/icon-img/23.png"} alt="#" />
			          </div>
			          <div className="ltn__feature-info">
							<h3><Link to="/contact">Help you</Link></h3>
							<p>If you need any help or consultation, please do not hesitate to contact us</p>
							<Link className="ltn__service-btn" to="/contact">Help you <i className="flaticon-right-arrow" /></Link>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
        }
}

export default FeaturesV1