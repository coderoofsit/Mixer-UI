export default function BackgroundUnpaid({
	handlePayForVerification,
	isLoading,
}) {
	return (
		<div className='bg-white overflow-hidden border border-black'>
			<div
				className='w-full py-8 text-center'
				style={{ backgroundColor: "#F97316" }}
			>
				<h3 className='text-2xl font-bold text-white uppercase tracking-wide'>
					Background Check
				</h3>
			</div>
			<div className='p-12 text-center'>
				<div className='mb-10 flex items-baseline justify-center'>
					<span className='text-4xl font-bold text-gray-900'>$</span>
					<span className='text-7xl font-bold text-gray-900'>7</span>
					<span className='text-4xl font-bold text-gray-900'>.99</span>
					<span className='text-2xl text-gray-600 ml-3'>One Time Payment</span>
				</div>

				<button
					onClick={() => handlePayForVerification("background_check", 7.99)}
					className='w-100 py-4 px-10 font-semibold text-xs transition-colors duration-200 mt-16'
					style={{
						backgroundColor: "#E9E8E6",
						color: "#000000",
					}}
				>
					{isLoading ? "Loading" : "APPLY NOW"}
				</button>
			</div>
		</div>
	);
}
