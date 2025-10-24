import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function PaymentSuccess() {
	const location = useLocation();
	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const sessionId = params.get("session_id");
		console.log({ sessionId });
	}, []);

    const dummyFunction = () => {
    //     if (sessionId) {
    //   fetch(`http://localhost:4242/api/v1/stripe/status?session_id=${sessionId}`)
    //     .then(res => res.json())
    //     .then(data => console.log('Payment verified:', data))
    //     .catch(console.error);
    // }
    }
	return <div>Payment added succesfully</div>;
}
