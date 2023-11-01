import React, { Component, useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useHistory } from 'react-router-dom';
import Sidebar from './sidebar';

function TaskDetails () {
	const { taskId } = useParams();
	const [task, setTaskDetails] = useState({});
	const [user, setUser] = useState({});//store user info

	useEffect(() => {
		// 在组件加载时，根据 taskId 加载任务详情
		fetch(`/api/tasks/${taskId}`)
			.then((response) => response.json())
			.then((data) => {
				setTaskDetails(data);
				//request user id
				fetch(`/api/user/getuser/${data.user_id}`)
					.then((response) => response.json())
					.then((userData) => {
						setUser(userData);
					});
			});
	}, [taskId]); // 当 taskId 改变时重新加载任务详情

	let publicUrl = process.env.PUBLIC_URL + '/';



		return (
			<div className="ltn__blog-area mb-120">
				<div className="container">
					<div className="row">
						<div className="col-lg-8">
							<div className="ltn__blog-list-wrap">

								{/* Blog Item (Gallery) */}
								<div className="ltn__blog-item ltn__blog-item-5 ltn__blog-item-gallery">
									{/* if images are not null then display them, otherwise hide image part*/}
									{Array.isArray(task.images) && task.images.length > 0 && (
										<div className="ltn__blog-gallery-active slick-arrow-1 slick-arrow-1-inner">
											{task.images.map((image, index) => (
												<div className="ltn__blog-gallery-item" key={index}>
													<Link to="/blog-details"><img src={publicUrl + image.url} alt="Image" /></Link>
												</div>
											))}
										</div>
									)}
									<div className="ltn__blog-brief">
										<div className="ltn__blog-meta">
											<ul>
												<li className="ltn__blog-category">
													<Link to="/blog-grid">{task.title}</Link>
												</li>
											</ul>
										</div>
										<h3 className="ltn__blog-title"><Link to="/blog-details">{task.description}</Link></h3>
										<div className="ltn__blog-meta">
											<ul>
												<li>
													<Link to="/blog-details"><i className="far fa-eye" />232 Views</Link>
												</li>
												<li>
													<Link to="/blog-details"><i className="far fa-comments" />35 Comments</Link>
												</li>
												<li className="ltn__blog-date">
													<i className="far fa-calendar-alt" />June 22, 2020
												</li>
											</ul>
										</div>
										<p> {task.description} </ p>
										<div className="ltn__blog-meta-btn">
											<div className="ltn__blog-meta">
												<ul>
													<li className="ltn__blog-author">
														<Link to="/blog-grid"><img src={publicUrl + "assets/img/blog/author.jpg"} alt="#" />By: Ethan</Link>
													</li>
												</ul>
											</div>
											<div className="ltn__blog-btn">
												<Link to="/blog-details"><i className="fas fa-arrow-right" />Bid it</Link>
											</div>
										</div>
									</div>
								</div>

								{/*  */}
							</div>
						</div>
						<Sidebar user={ user } />
					</div>
				</div>
			</div>
		)
	}

export default TaskDetails;
