export default function BackgroundPending({ handlePayForVerification }) {
	return (
		<div className='bg-white overflow-hidden border border-black'>
			<div
				className='w-full py-8 text-center'
				style={{ backgroundColor: "#F97316" }}
			>
			<h3
				className='text-2xl font-bold text-white uppercase tracking-wide'
			>
				Background Check is Pending
			</h3>
			</div>
			<div className="p-12 text-center bg-white">
				We are currently processing your background check. Please check back later.
			</div>
		</div>
	);
}
