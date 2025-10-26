export default function UpgradePlan({ handlePayForVerification }) {
	return (
		<div className='max-w-xl max-h-5xl mx-auto'>
			<div className='bg-white overflow-hidden border border-black'>
				<div
					className='w-full py-8 text-center'
					style={{ backgroundColor: "#038386" }}
				>
				<h3
					className='text-2xl font-bold text-white uppercase tracking-wide'
				>
					Memberships
				</h3>
				</div>

				{/* Content */}
				<div className='p-12 text-center'>
					<div className='mb-10 flex items-baseline justify-center'>
						<span className='text-4xl font-bold text-gray-900'>$</span>
						<span className='text-7xl font-bold text-gray-900'>24</span>
						<span className='text-4xl font-bold text-gray-900'>.99</span>
						<span className='text-2xl text-gray-600 ml-3'>Month</span>
					</div>

					{/* Button */}
					<button
						onClick={() => handlePayForVerification("quarterly_membership", 24.99)}
						className='w-100 py-4 px-10 font-semibold text-xs transition-colors duration-200 mt-16'
						style={{
							backgroundColor: "#E9E8E6",
							color: "#000000",
						}}
					>
						START MIXER
					</button>
				</div>
			</div>
		</div>
	);
}
