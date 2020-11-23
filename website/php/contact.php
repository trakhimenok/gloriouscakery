<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

	$name = $_POST['fullname'];
	$email_address = $_POST['email'];
	$message = $_POST['message'];

	$to = 'support@themediv.com'; // Write your e-mail here
	$email_subject = "Contact form submitted by:  $name";
	$email_body = "You have received a new message. <br/>".
				"Here are the details: <br/><br/> Name: $name <br/><br/>".
				"Email: $email_address <br/><br/> Message: <br/> $message";
	$headers="From:<$email_address>\n";
	$headers.="Content-Type:text/html; charset=UTF-8";
	
	if( $email_address != "") {
		mail($to,$email_subject,$email_body,$headers);
	}
} else {
	// Not a POST request, set a 403 (forbidden) response code.
	http_response_code(403);
	echo "Access forbidden.";
}
?>
