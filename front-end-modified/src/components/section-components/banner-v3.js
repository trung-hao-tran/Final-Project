import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class BannerV3 extends Component {
	state = {
		task0: [],
		task1: [],
	};

	componentDidMount() {
		
		fetch('/api/tasks')
			.then((response) => response.json())
			.then((data) => {
				// fetch the first two tasks
				this.setState({ task0: data[0], task1: data[1] });
			})
			.catch((error) => {
				console.error('Error fetching tasks: ', error);
			});
	}
    render() {
		const { task0, task1 } = this.state;

        let publicUrl = process.env.PUBLIC_URL+'/'
        let imagealt = 'image'
		

    return  <div className="ltn__slider-area ltn__slider-3  section-bg-2">
			  <div className="ltn__slide-one-active slick-slide-arrow-1 slick-slide-dots-1">
			    {/* ltn__slide-item */}
			    <div className="ltn__slide-item ltn__slide-item-2 ltn__slide-item-3-normal--- ltn__slide-item-3 bg-image bg-overlay-theme-black-60" data-bs-bg={publicUrl+"assets/img/slider/11.jpg"}>
			      <div className="ltn__slide-item-inner text-center">
			        <div className="container">
			          <div className="row">
			            <div className="col-lg-12 align-self-center">
			              <div className="slide-item-info">
			                <div className="slide-item-info-inner ltn__slide-animation">
			                  <div className="slide-video mb-50 d-none">
			                    <a className="ltn__video-icon-2 ltn__video-icon-2-border" href="https://www.youtube.com/embed/tlThdr3O5Qo" data-rel="lightcase:myCollection">
			                      <i className="fa fa-play" />
			                    </a>
			                  </div>
			                  <h6 className="slide-sub-title white-color--- animated"> 9900 Anything Team</h6>
			                  <h1 className="slide-title animated ">Find Your Dream <br /> Tasks By Us</h1>
			                  <div className="slide-brief animated">
			                    <p>For the Past, For the Present, For the Future</p>
			                  </div>
			                  <div className="btn-wrapper animated go-top">
			                    <Link to="/shop" className="theme-btn-1 btn btn-effect-1">Lets do it!</Link>
			                  </div>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			    {/* ltn__slide-item */}
			    <div className="ltn__slide-item ltn__slide-item-2  ltn__slide-item-3-normal--- ltn__slide-item-3 bg-image bg-overlay-theme-black-60" data-bs-bg={publicUrl+"assets/img/slider/12.jpg"}>
			      <div className="ltn__slide-item-inner  text-right text-end">
			        <div className="container">
			          <div className="row">
			            <div className="col-lg-12 align-self-center">
			              <div className="slide-item-info">
			                <div className="slide-item-info-inner ltn__slide-animation">
										<h6 className="slide-sub-title white-color--- animated"><span><i className="fas fa-home" /></span>task0.title</h6>
										<h1 className="slide-title animated ">task0.title</h1>
			                  <div className="slide-brief animated">
											<p>task0.description</p>
			                  </div>
			                  <div className="btn-wrapper animated go-top">
			                    <Link to="/shop" className="theme-btn-1 btn btn-effect-1">Explore more</Link>
			                  </div>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			    {/* ltn__slide-item */}
			    <div className="ltn__slide-item ltn__slide-item-2  ltn__slide-item-3-normal--- ltn__slide-item-3 bg-image bg-overlay-theme-black-60" data-bs-bg={publicUrl+"assets/img/slider/13.jpg"}>
			      <div className="ltn__slide-item-inner  text-left">
			        <div className="container">
			          <div className="row">
			            <div className="col-lg-12 align-self-center">
			              <div className="slide-item-info">
			                <div className="slide-item-info-inner ltn__slide-animation">
										<h6 className="slide-sub-title white-color--- animated"><span><i className="fas fa-home" /></span>task1.title</h6>
										<h1 className="slide-title animated ">task1.title</h1>
			                  <div className="slide-brief animated">
											<p>task0.description</p>
			                  </div>
			                  <div className="btn-wrapper animated go-top">
			                    <Link to="/shop" className="theme-btn-1 btn btn-effect-1">Explore more</Link>
			                  </div>
			                </div>
			              </div>
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			    {/*  */}
			  </div>
			</div>

        }
}

export default BannerV3