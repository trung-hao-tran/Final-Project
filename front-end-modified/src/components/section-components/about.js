import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class AboutV1 extends Component {

	render() {

		let publicUrl = process.env.PUBLIC_URL + '/'

		return <div className="ltn__about-us-area pt-120 pb-90 ">
			<div className="container">
				<div className="row">
					<div className="col-lg-6 align-self-center">
						<div className="about-us-img-wrap about-img-left">
							<img src={publicUrl + "assets/img/contact.jpg"} alt="About Us Image" />
							<div className="about-us-img-info about-us-img-info-2 about-us-img-info-3">
								
							</div>
						</div>
					</div>
					<div className="col-lg-6 align-self-center">
						<div className="about-us-info-wrap">
							<div className="section-title-area ltn__section-title-2--- mb-20">
								<h6 className="section-subtitle section-subtitle-2 ltn__secondary-color">About Us</h6>
								<h1 className="section-title">COMP9900
									Task Management Team</h1>
								<p>We are a team dedicated to providing safe, convenient, fast and instant services to people who have task needs and want to find temporary jobs. This platform will be the most suitable platform for freelance enthusiasts!</p>
							</div>
							<ul className="ltn__list-item-half clearfix">
								<li>
									<i className="flaticon-home-2" />
									Tasks overthrough
								</li>
								<li>
									<i className="flaticon-mountain" />
									Tasks post
								</li>
								<li>
									<i className="flaticon-heart" />
									Tasks bid
								</li>
								<li>
									<i className="flaticon-secure" />
									Tasks communication
								</li>
							</ul>
							<div className="ltn__callout bg-overlay-theme-05  mt-30">
								<p>"There is no reason to hesitate anymore. If you have mission needs or want to take on a mission, go and try it!" </p>
							</div>
							<div className="btn-wrapper animated go-top">
								<Link to="/contact" className="theme-btn-1 btn btn-effect-1">OUR SERVICES</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	}
}

export default AboutV1
