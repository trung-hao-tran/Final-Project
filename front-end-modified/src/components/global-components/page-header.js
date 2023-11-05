import React, { Component } from 'react';

class Page_header extends Component {

	render() {

		let HeaderTitle = this.props.headertitle;
		let publicUrl = '/'
		let CustomClass = this.props.customclass ? this.props.customclass : ''
		let Img = this.props.Img ? this.props.Img : '14.jpg'

		return (

			<div className={"ltn__breadcrumb-area text-left bg-overlay-white-30 bg-image " + CustomClass} data-bs-bg={publicUrl + "assets/img/bg/14.jpg"}>
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="ltn__breadcrumb-inner">
								<h1 className="page-title">{HeaderTitle}</h1>

							</div>
						</div>
					</div>
				</div>
			</div>


		)
	}
}


export default Page_header