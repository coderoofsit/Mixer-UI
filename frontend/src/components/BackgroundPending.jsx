export default function BackgroundPending({ handlePayForVerification }) {
	return (
		<div className='bg-white overflow-hidden border border-black'>
			<div
				className='w-full py-8 text-center'
				style={{ backgroundColor: "#F97316" }}
			>
				<h3
					className='text-2xl font-bold text-white uppercase tracking-wide'
					style={{ fontFamily: "serif" }}
				>
					Background Check is Pending
				</h3>
			</div>
		</div>
	);
}
