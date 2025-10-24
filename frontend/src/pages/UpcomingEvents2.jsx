import React, { useState, useEffect } from "react";
import apiClient from "../services/apiService";
import LandingHeader from "../components/layout/LandingHeader";
import Footer from "../components/layout/Footer";

import authService from "../services/authService";
import { Link } from "react-router-dom";
import { stripeService } from "../services/stripeService";

const UpcomingEvents = () => {
	// Event feed state management
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [userDetails, setUserDetails] = useState();

	// Event feed configuration (for future API integration)
	// const feedId = 536;
	// const uid = "68fa54e37ab5e";
	// const apiUrl = "https://mixerltd.com/wp-json/";

	// Fetch events from API
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				setLoading(true);
				// Simulate API call - replace with actual Eventbrite API integration
				const mockEvents = [
					{
						id: 1,
						title: "Puppy Love Singles Mixer",
						date: "2025-11-08",
						time: "11:00 AM - 12:30 PM",
						location: "1684 21st Street, Colorado Springs, CO 80904",
						price: "FREE",
						ticketsLeft: 19,
						description:
							"Sip coffee, meet fellow dog lovers, and let tails (and hearts) wag! Bring your pup—or just your love for them. Free & Fun!",
						eventType: "puppy-love",
					},
					{
						id: 2,
						title: "November Mixer: where real people meet, not just profiles",
						date: "2025-11-13",
						time: "7:00 PM - 10:00 PM",
						location: "4 South 28th Street, Colorado Springs, CO 80904",
						price: "$28.52",
						ticketsLeft: 95,
						description:
							"November Mixer! Cocktails, music & curated connections — meet face-to-face, not screen-to-screen.",
						eventType: "november-mixer",
					},
					{
						id: 3,
						title: "Flirt & Fall: Speed dating with a twist of Mixer",
						date: "2025-11-18",
						time: "5:30 PM - 7:30 PM",
						location: "To be announced",
						price: "$25.00",
						ticketsLeft: 40,
						description:
							"Our Flirt and fall series is a twist on Speed Dating. We're incorporating conversational Jenga because you know we like to mix things up!",
						eventType: "flirt-fall",
						availability: "UNAVAILABLE",
					},
					{
						id: 4,
						title: "Flirt & Fall: Speed dating with a twist of Mixer",
						date: "2025-11-18",
						time: "7:45 PM - 9:45 PM",
						location: "To be announced",
						price: "$25.00",
						ticketsLeft: 40,
						description:
							"Our Flirt and fall series is a twist on Speed Dating. We're incorporating conversational Jenga because you know we like to mix things up!",
						eventType: "flirt-fall",
						availability: "UNAVAILABLE",
					},
				];

				// Simulate API delay
				await new Promise((resolve) => setTimeout(resolve, 1000));
				setEvents(mockEvents);
				setLoading(false);
			} catch (err) {
				setError("Failed to fetch events");
				setLoading(false);
			}
		};

		const getProfile = async () => {
			const profileCheck = await authService.checkProfileCompletion();
			const userDetails = profileCheck?.profile?.data?.user || {};
			console.log({ userDetails });
			setUserDetails(userDetails || {});
		};
		getProfile();
		fetchEvents();
	}, []);

	const handlePayForVerification = async () => {
		const response = await stripeService.createCheckoutSession(
			1000,
			"usd",
			"ORD_001",
		);
		console.log({ response });
		window.location.href = response?.sessionUrl;
	};

	// Event Feed Component
	const EventFeed = () => (
		<div
			id='event-feed-for-eventbrite-app-68fa54e37ab5e'
			className='flex  items-center justify-center py-4'
			data-feed='536'
			data-uid='68fa54e37ab5e'
		>
			{userDetails?.backgroundVerification === "unpaid" && (
				<div className='bg-white overflow-hidden border border-black'>
					<div
						className='w-full py-8 text-center'
						style={{ backgroundColor: "#F97316" }}
					>
						<h3
							className='text-2xl font-bold text-white uppercase tracking-wide'
							style={{ fontFamily: "serif" }}
						>
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
							onClick={handlePayForVerification}
							className='w-100 py-4 px-10 font-semibold text-xs transition-colors duration-200 mt-16'
							style={{
								backgroundColor: "#E9E8E6",
								color: "#000000",
							}}
						>
							APPLY NOWss
						</button>
					</div>
				</div>
			)}
			{userDetails?.isVerified && (
				<div
					className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'
					style={{ border: "1px solid red" }}
				>
					{loading ? (
						<div className='flex justify-center items-center py-12'>
							<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
						</div>
					) : error ? (
						<div className='text-center py-12'>
							<p className='text-red-600'>{error}</p>
						</div>
					) : (
						<div className='space-y-8'>
							{events.map((event) => (
								<div key={event.id} className='bg-white overflow-hidden rounded-lg'>
									<div className='flex'>
										{/* Left Side - Date Only */}
										<div className='w-24 p-4 flex flex-col justify-start'>
											<div className='text-center'>
												<div className='text-sm text-blue-800 font-medium mb-1'>
													{new Date(event.date)
														.toLocaleDateString("en-US", { weekday: "short" })
														.toUpperCase()}
												</div>
												<div className='text-2xl font-bold text-blue-800'>
													{new Date(event.date).getDate()}
												</div>
											</div>
										</div>

										{/* Right Side - All Other Content */}
										<div className='flex-1 p-4'>
											{/* Date and Time */}
											<div className='text-xs mb-1' style={{ color: "#6f7287" }}>
												{new Date(event.date)
													.toLocaleDateString("en-US", {
														month: "long",
														day: "numeric",
														year: "numeric",
													})
													.toUpperCase()}{" "}
												@ {event.time}
											</div>

											{/* Event Title */}
											<h3 className='text-sm font-bold text-gray-900 mb-1'>
												{event.title}
											</h3>

											{/* Location */}
											<div
												className='flex items-center space-x-2 mb-1'
												style={{ color: "#6f7287" }}
											>
												<svg
													className='w-4 h-4'
													fill='none'
													stroke='currentColor'
													viewBox='0 0 24 24'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
													/>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth={2}
														d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
													/>
												</svg>
												<span className='text-xs'>{event.location}</span>
											</div>

											{/* Event Description */}
											<p
												className='text-xs leading-tight mb-2'
												style={{ color: "#6f7287" }}
											>
												{event.description}
											</p>

											{/* Ticket Info */}
											<div className='flex items-center space-x-1 mb-2'>
												{event.availability !== "UNAVAILABLE" && (
													<div className='border border-gray-300 rounded px-0.5 py-0.5'>
														<span className='text-xs' style={{ color: "#6f7287" }}>
															{event.price}
														</span>
													</div>
												)}
												{event.availability && (
													<div className='border border-gray-300 rounded px-0.5 py-0.5'>
														<span className='text-xs' style={{ color: "#6f7287" }}>
															{event.availability}
														</span>
													</div>
												)}
												<div className='border border-gray-300 rounded px-0.5 py-0.5'>
													<span className='text-xs' style={{ color: "#6f7287" }}>
														{event.ticketsLeft} TICKETS LEFT
													</span>
												</div>
											</div>
											{/* Action Buttons */}
											<div className='flex space-x-2 mt-1'>
												{event.availability === "UNAVAILABLE" ? (
													<button className='bg-white text-blue-600 border border-blue-600 px-3 py-1 rounded text-xs font-bold shadow-md hover:bg-blue-50 transition-colors'>
														View details
													</button>
												) : (
													<>
														<button className='bg-blue-800 text-white px-3 py-1 rounded text-xs font-bold shadow-md hover:bg-blue-900 transition-colors'>
															{event.price === "FREE" ? "Register" : "Buy tickets"}
														</button>
														<button className='bg-white text-blue-600 border border-blue-600 px-3 py-1 rounded text-xs font-bold shadow-md hover:bg-blue-50 transition-colors'>
															View details
														</button>
													</>
												)}
											</div>
										</div>

										{/* Right Side - Event Image/Graphic */}
										<div className='w-96 h-40 relative rounded-2xl shadow-sm border-2 border-transparent bg-gray-100 flex items-center justify-center'>
											<div className='text-center p-4'>
												<div className='text-sm text-gray-500 font-medium'>Event Image</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);

	return (
		<div
			className='min-h-screen bg-white'
			style={{ fontFamily: "'Times New Roman', serif" }}
		>
			<LandingHeader />

			{/* Main Content */}
			<div className='max-w-7xl mx-auto'>
				<div className='grid lg:grid-cols-5 gap-8 min-h-screen'>
					{/* Left Side - Image (40% width) */}
					<div className='lg:col-span-2 relative'>
						<div
							className='h-full w-full bg-cover bg-center bg-no-repeat'
							style={{
								backgroundImage:
									"url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
							}}
						>
							<div className='absolute inset-0 bg-black bg-opacity-10'></div>

							{/* Speech Bubble Overlay */}
							<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
								<div className='bg-white rounded-2xl px-6 py-4 shadow-lg max-w-xs'>
									<p className='text-gray-800 text-sm font-medium'>
										This fall, I'm looking for... <span className='text-red-500'>❤️</span>
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Right Side - Content (60% width) */}
					<div className='lg:col-span-3 bg-white p-8 lg:p-12 flex flex-col justify-center'>
						<div className='w-full'>
							{/* Skip the Swipe */}
							<p className='text-red-600 font-medium text-sm mb-2'>SKIP THE SWIPE</p>

							{/* Main Title */}
							<h1
								className='text-gray-900 mb-12 leading-tight'
								style={{
									fontSize: "65px",
									fontWeight: "600",
								}}
							>
								HOW OUR MIXER
								<br />
								EVENTS WORK
							</h1>

							{/* Steps */}
							<div className='space-y-10'>
								{/* Step 1 */}
								<div>
									<h3 className='text-lg font-bold mb-3' style={{ color: "#038386" }}>
										STEP 1 | WE PICK THE PERFECT LOCAL SPOT
									</h3>
									<p className='text-gray-700 leading-relaxed text-sm'>
										We scout out the best places in town — think cozy lounges, rooftop
										patios, or that new wine bar everyone's talking about. All you have to
										do is show up ready to mingle (and maybe fall for someone unexpected).
									</p>
								</div>

								{/* Step 2 */}
								<div>
									<h3 className='text-lg font-bold mb-3' style={{ color: "#A42831" }}>
										STEP 2 | GET BACKGROUND CHECKED AND BECOME A MEMBER
									</h3>
									<p className='text-gray-700 leading-relaxed text-sm'>
										No catfish. No creeps. Just real people looking for real connections.
										Before joining the fun, every member goes through a quick background
										check to keep our community safe, classy, and ick-free.
									</p>
								</div>

								{/* Step 3 */}
								<div>
									<h3 className='text-lg font-bold mb-3' style={{ color: "#D59331" }}>
										STEP 3 | YOU ENJOY CURATED EVENT
									</h3>
									<p className='text-gray-700 leading-relaxed text-sm'>
										Sip, laugh, and spark something new. Each Mixer is designed to take
										the pressure off — no awkward setups, just organic connections in a
										fun, relaxed atmosphere. You never know who you'll meet next.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Event Feed Section - MERN Integration */}
			<EventFeed />

			{/* Spacing between content and footer */}
			<div className='py-8'></div>

			<Footer />
		</div>
	);
};

export default UpcomingEvents;
