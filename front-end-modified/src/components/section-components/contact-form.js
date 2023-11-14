// JavaScript source code
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

class ContactForm extends Component {

	componentDidMount() {

		const $ = window.$;

		// Get the form.
		var form = $('#contact-form');

		// Get the messages div.
		var formMessages = $('.form-messege');

		// Set up an event listener for the contact form.
		$(form).submit(function (e) {
			// Stop the browser from submitting the form.
			e.preventDefault();

			// Serialize the form data.
			//var formData = $(form).serialize();
			var reportData = {
				// ��������Ҫ���������ݸ�ʽ
				userId: '���ٱ��û���ID', // ���Ӧ��������Ӧ����ĳ���ɻ�õ�����
				message: $('#contact-form textarea[name="message"]').val(),
				// ������Ӹ�����ֶΣ����ݺ�˽ӿڵ�����
			};
			// Submit the form using AJAX.
			$.ajax({
				type: 'POST',
				url: '/user/report',
				
				contentType: 'application/json', // ������������Ϊ JSON
				data: JSON.stringify(reportData),
			})
				.done(function (response) {
					// Make sure that the formMessages div has the 'success' class.
					$(formMessages).removeClass('error');
					$(formMessages).addClass('success');

					// Set the message text.
					$(formMessages).text(response);

					// Clear the form.
					$('#contact-form input,#contact-form textarea').val('');
				})
				.fail(function (data) {
					// Make sure that the formMessages div has the 'error' class.
					$(formMessages).removeClass('success');
					$(formMessages).addClass('error');

					// Set the message text.
					if (data.responseText !== '') {
						$(formMessages).text(data.responseText);
					} else {
						$(formMessages).text('Oops! An error occured and your message could not be sent.');
					}
				});
		});
	}

	render() {

		let publicUrl = process.env.PUBLIC_URL + '/'

		return <div className="ltn__contact-message-area mb-120 mb--100">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="ltn__form-box contact-form-box box-shadow white-bg">
							<h4 className="title-2">Give us feedback</h4>
							<form id="contact-form" action={publicUrl + "mail.php"} method="post">
								<div className="row">
									<div className="col-md-6">
										<div className="input-item" >
											<select className="nice-select" name="service">
												<option>Select Service Type</option>
												<option>Consulting Service</option>
												<option>Task Biding</option>
												<option>Task Posting</option>
												<option>Task Editing</option>
											</select>
										</div>
									</div>

								</div>
								<div className="input-item input-item-textarea ltn__custom-icon">
									<textarea name="message" placeholder="Enter message" defaultValue={""} />
								</div>
								<div className="btn-wrapper mt-0">
									<button className="btn theme-btn-1 btn-effect-1 text-uppercase" type="submit">Submit Feedback</button>
								</div>
								<p className="form-messege mb-0 mt-20" />
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	}
}

export default ContactForm