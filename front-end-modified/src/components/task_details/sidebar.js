import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class Sidebar extends Component {
	render() {
		const { user } = this.props;
		let anchor = '#'
		let imagealt = 'image'
		let publicUrl = process.env.PUBLIC_URL+'/'
		return (
			<div className="col-lg-4 go-top">
				<aside className="sidebar-area blog-sidebar ltn__right-sidebar">
					{/* Author Widget */}
					<div className="widget ltn__author-widget">
					<div className="ltn__author-widget-inner text-center">
						<img src={publicUrl+"assets/img/team/4.jpg"} alt="Image" />
							<h5>{user.name}</h5>
							<small>{user.role}</small>
						<div className="product-ratting">
						<ul>
							<li><a href="#"><i className="fas fa-star" /></a></li>
							<li><a href="#"><i className="fas fa-star" /></a></li>
							<li><a href="#"><i className="fas fa-star" /></a></li>
							<li><a href="#"><i className="fas fa-star-half-alt" /></a></li>
							<li><a href="#"><i className="far fa-star" /></a></li>
							<li className="review-total"> <a href="#"> ( 1 Reviews )</a></li>
						</ul>
						</div>
							<p> { user.email } </p>

					</div>
					</div>

					{/* Form Widget */}
					<div className="widget ltn__form-widget">
					<h4 className="ltn__widget-title ltn__widget-title-border-2">Drop Messege For Book</h4>
					<form action="#">
						<input type="text" name="yourname" placeholder="Your Name*" />
						<input type="text" name="youremail" placeholder="Your e-Mail*" />
						<textarea name="yourmessage" placeholder="Write Message..." defaultValue={""} />
						<button type="submit" className="btn theme-btn-1">Send Messege</button>
					</form>
					</div>

				</aside>
			</div>
			)
	 }
}

export default Sidebar;
