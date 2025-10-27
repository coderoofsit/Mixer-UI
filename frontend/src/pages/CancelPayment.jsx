import { useNavigate } from "react-router-dom";

export default function CancelPayment() {
	const navigate = useNavigate();
	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className='bg-white p-8 rounded-xl shadow-lg text-center'>
				<h2 className='text-2xl font-semibold text-red-600 mb-4'>
					Your Payment has been canceled
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
