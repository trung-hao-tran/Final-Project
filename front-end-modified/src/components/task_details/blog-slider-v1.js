import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';

class BlogSlider extends Component {
	state = {
		task0: [],
		task1: [],
		task2: [],
		task3: [],
		task4: [],
	};

	componentDidMount() {

		fetch('/api/tasks')
			.then((response) => response.json())
			.then((data) => {
				// fetch the first two tasks
				this.setState({ task0: data[0], task1: data[1], task2: data[2], task3: data[3], task4: data[4] });
			})
			.catch((error) => {
				console.error('Error fetching tasks: ', error);
			});
	}

render() {
		const { task0, task1, task2, task3, task4 } = this.state;
		let publicUrl = process.env.PUBLIC_URL + '/'
		let customClass = this.props.customClass ? this.props.customClass : ''
		let sectionClass = this.props.sectionClass ? this.props.sectionClass : ''

		return (
			<div className={"ltn__blog-area pt-115--- pb-70 go-top " + sectionClass}>
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="section-title-area ltn__section-title-2--- text-center">
								<h6 className={"section-subtitle ltn__secondary-color " + customClass}>News Posts</h6>
								<h1 className="section-title">Leatest Tasks</h1>
							</div>
						</div>
					</div>
					<div className="row  ltn__blog-slider-one-active slick-arrow-1 ltn__blog-item-3-normal">
						{/* Blog Item */}
						<div className="col-lg-12">
								<div className="ltn__blog-item ltn__blog-item-3">
									<div className="ltn__blog-img">
										<Link to="/blog-details"><img src={publicUrl + "assets/img/blog/1.jpg"} alt="#" /></Link>
									</div>
									<div className="ltn__blog-brief">
										<div className="ltn__blog-meta">
											<ul>
												<li className="ltn__blog-author">
													<Link to="/team-details"><i className="far fa-user" />by:task0.user</Link>
												</li>
												<li className="ltn__blog-tags">
													<Link to="/blog-grid"><i className="fas fa-tags" />Interior</Link>
													<Link to="/blog-grid"><i className="fas fa-tags" />Decorate</Link>
												</li>
											</ul>
										</div>
										<h3 className="ltn__blog-title"><Link to="/blog-details">task0.title</Link></h3>
										<div className="ltn__blog-meta-btn">
											<div className="ltn__blog-meta">
												<ul>
													<li className="ltn__blog-date"><i className="far fa-calendar-alt" />
														new Date(task0.updatedAt).toLocaleDateString() new Date(task0.updatedAt).toLocaleTimeString()
													</li>
												</ul>
											</div>
											<div className="ltn__blog-btn">
												<Link to="/blog-details">Read more</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						{/* Blog Item */}
						<div className="col-lg-12">
							<div className="ltn__blog-item ltn__blog-item-3">
								<div className="ltn__blog-img">
									<Link to="/blog-details"><img src={publicUrl + "assets/img/blog/2.jpg"} alt="#" /></Link>
								</div>
								<div className="ltn__blog-brief">
									<div className="ltn__blog-meta">
										<ul>
											<li className="ltn__blog-author">
												<Link to="/team-details"><i className="far fa-user" />by: Admin</Link>
											</li>
											<li className="ltn__blog-tags">
												<Link to="/blog-grid"><i className="fas fa-tags" />Interior</Link>
												<Link to="/blog-grid"><i className="fas fa-tags" />Interior</Link>
											</li>
										</ul>
									</div>
									<h3 className="ltn__blog-title"><Link to="/blog-details">The Most Inspiring Interior Design Of 2021</Link></h3>
									<div className="ltn__blog-meta-btn">
										<div className="ltn__blog-meta">
											<ul>
												<li className="ltn__blog-date"><i className="far fa-calendar-alt" />July 23, 2021</li>
											</ul>
										</div>
										<div className="ltn__blog-btn">
											<Link to="/blog-details">Read more</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* Blog Item */}
						<div className="col-lg-12">
							<div className="ltn__blog-item ltn__blog-item-3">
								<div className="ltn__blog-img">
									<Link to="/blog-details"><img src={publicUrl + "assets/img/blog/3.jpg"} alt="#" /></Link>
								</div>
								<div className="ltn__blog-brief">
									<div className="ltn__blog-meta">
										<ul>
											<li className="ltn__blog-author">
												<Link to="/team-details"><i className="far fa-user" />by: Admin</Link>
											</li>
											<li className="ltn__blog-tags">
												<Link to="/blog-grid"><i className="fas fa-tags" />Interior</Link>
												<Link to="/blog-grid"><i className="fas fa-tags" />Estate</Link>
											</li>
										</ul>
									</div>
									<h3 className="ltn__blog-title"><Link to="/blog-details">Recent Commercial Real Estate Transactions</Link></h3>
									<div className="ltn__blog-meta-btn">
										<div className="ltn__blog-meta">
											<ul>
												<li className="ltn__blog-date"><i className="far fa-calendar-alt" />May 22, 2021</li>
											</ul>
										</div>
										<div className="ltn__blog-btn">
											<Link to="/blog-details">Read more</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* Blog Item */}
						<div className="col-lg-12">
							<div className="ltn__blog-item ltn__blog-item-3">
								<div className="ltn__blog-img">
									<Link to="/blog-details"><img src={publicUrl + "assets/img/blog/4.jpg"} alt="#" /></Link>
								</div>
								<div className="ltn__blog-brief">
									<div className="ltn__blog-meta">
										<ul>
											<li className="ltn__blog-author">
												<Link to="/team-details"><i className="far fa-user" />by: Admin</Link>
											</li>
											<li className="ltn__blog-tags">
												<Link to="/blog-grid"><i className="fas fa-tags" />Interior</Link>
												<Link to="/blog-grid"><i className="fas fa-tags" />Room</Link>
											</li>
										</ul>
									</div>
									<h3 className="ltn__blog-title"><Link to="/blog-details">Renovating a Living Room? Experts Share Their Secrets</Link></h3>
									<div className="ltn__blog-meta-btn">
										<div className="ltn__blog-meta">
											<ul>
												<li className="ltn__blog-date"><i className="far fa-calendar-alt" />June 24, 2021</li>
											</ul>
										</div>
										<div className="ltn__blog-btn">
											<Link to="/blog-details">Read more</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/* Blog Item */}
						<div className="col-lg-12">
							<div className="ltn__blog-item ltn__blog-item-3">
								<div className="ltn__blog-img">
									<Link to="/blog-details"><img src={publicUrl + "assets/img/blog/5.jpg"} alt="#" /></Link>
								</div>
								<div className="ltn__blog-brief">
									<div className="ltn__blog-meta">
										<ul>
											<li className="ltn__blog-author">
												<Link to="/team-details"><i className="far fa-user" />by: Admin</Link>
											</li>
											<li className="ltn__blog-tags">
												<Link to="/blog-grid"><i className="fas fa-tags" />Interior</Link>
												<Link to="/blog-grid"><i className="fas fa-tags" />Trends</Link>
											</li>
										</ul>
									</div>
									<h3 className="ltn__blog-title"><Link to="/blog-details">7 home trends that will shape your house in 2021</Link></h3>
									<div className="ltn__blog-meta-btn">
										<div className="ltn__blog-meta">
											<ul>
												<li className="ltn__blog-date"><i className="far fa-calendar-alt" />June 24, 2021</li>
											</ul>
										</div>
										<div className="ltn__blog-btn">
											<Link to="/blog-details">Read more</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
						{/*  */}
					</div>
				</div>
			</div>
		)
	}
}

export default BlogSlider;