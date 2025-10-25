import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import authService from "../services/authService";
import { stripeService } from "../services/stripeService";
const producTypeMap = {
	background_check: "com.mixerltd.mixerltd.background_check",
	quarterly_membership: "com.mixerltd.mixerltd.upgrade",
};

export default function PaymentSuccess() {
	const location = useLocation();
	const navigate = useNavigate();
	const [userDetails, setUserDetails] = useState();
	const params = new URLSearchParams(location.search);
	const sessionId = params.get("session_id");
	const productType = params.get("productType");
	console.log({ sessionId, productType });
	useEffect(() => {
		console.log({ sessionId, productType });
		const getProfile = async () => {
			const profileCheck = await authService.checkProfileCompletion();
			console.log({ profileCheck });
			const userDetails = profileCheck?.profile || {};
			console.log({ userDetails });
			setUserDetails(userDetails || {});
		};
		if (!userDetails) {
			getProfile();
		}
		const dummyFunction = async () => {
			const response = await stripeService.verifyPaymentInIAP(
				userDetails?.id,
				producTypeMap[productType],
				sessionId,
			);
			console.log({ response });
		};
		if (productType && userDetails) {
			dummyFunction();
		}
	}, [userDetails, userDetails]);
	console.log({ userDetails });
	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='bg-white p-8 rounded-xl shadow-lg text-center'>
				<h2 className='text-2xl font-semibold text-green-600 mb-4'>
					✅ Payment added successfully
				</h2>
				<button
					onClick={() => navigate("/")}
					className='mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300'
				>
					Go to Home
				</button>
			</div>
		</div>
	);
}
