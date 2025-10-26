import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiService";
import LandingHeader from "../components/layout/LandingHeader";
import Footer from "../components/layout/Footer";
import RegisterEventModal from "../components/ui/RegisterEventModal";
import { useProfile } from "../contexts/ProfileContext";

const UpcomingEvents = () => {
	// Get profile data from context (no API call needed!)
	const { profileData } = useProfile();
	const navigate = useNavigate();
	
	// Local state for events
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleRegisterClick = (event) => {
		setSelectedEvent(event);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setSelectedEvent(null);
	};

	// Fetch events for all users (authenticated or not)
	useEffect(() => {
		const fetchEvents = async () => {
			try {
				setLoading(true);
				setError(null);
				
				console.log('🔄 Fetching events for all users...');
				const response = await apiClient.get("/api/v1/events");

				if (response.data.success) {
					setEvents(response.data.data.events);
					console.log('✅ Events loaded');
				} else {
					setError("Failed to fetch events");
				}
			} catch (err) {
				console.error("Error fetching events:", err);
				setError(err.response?.data?.message || "Failed to load events");
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, []); // Only fetch once on mount

	// Event Feed Component
	const EventFeed = () => (
		<div
			id='event-feed-for-eventbrite-app-68fa54e37ab5e'
			className='event-feed-for-eventbrite-app event-feed-for-eventbrite-app-id-536'
			data-feed='536'
			data-uid='68fa54e37ab5e'
		>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				{loading ? (
					<div className='flex justify-center items-center py-12'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
					</div>
				) : error ? (
					<div className='text-center py-12'>
						<p className='text-red-600'>{error}</p>
					</div>
				) : (
					<>
						{/* Show Join Us banner for non-authenticated users */}
						{!profileData && (
							<div className='mb-8 text-center py-8 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg'>
								<h3 className='text-2xl font-bold text-gray-900 mb-4'>
									Ready to Join Our Events?
								</h3>
								<p className='text-gray-700 mb-6'>
									Sign up or log in to register for upcoming mixer events.
								</p>
								<button
									onClick={() => navigate('/login', { state: { from: '/upcoming-events' } })}
									className='bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg'
								>
									Join Us
								</button>
							</div>
						)}

						{/* Events List - Always visible */}
						<div className='space-y-6 md:space-y-8'>
							{events.map((event) => (
								<div key={event._id} className='bg-white overflow-hidden rounded-lg shadow-sm'>
									<div className='flex flex-col md:flex-row md:items-center'>
										{/* Left Side - Date Only */}
										<div className='w-full md:w-20 lg:w-24 p-3 md:p-4 flex md:flex-col justify-start flex-shrink-0 border-b md:border-b-0 md:border-r border-gray-100'>
											<div className='text-center md:text-center'>
												<div className='text-xs md:text-sm text-blue-800 font-medium mb-0 md:mb-1'>
													{new Date(event.date)
														.toLocaleDateString("en-US", { weekday: "short" })
														.toUpperCase()}
												</div>
												<div className='text-xl md:text-2xl font-bold text-blue-800 ml-2 md:ml-0'>
													{new Date(event.date).getDate()}
												</div>
											</div>
										</div>

										{/* Middle - All Other Content */}
										<div className='flex-1 p-3 md:p-4 min-w-0'>
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
											<h3 className='text-sm md:text-base font-bold text-gray-900 mb-1'>
												{event.title}
											</h3>

											{/* Location */}
											<div
												className='flex items-center space-x-2 mb-1'
												style={{ color: "#6f7287" }}
											>
												<svg
													className='w-3 h-3 md:w-4 md:h-4 flex-shrink-0'
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
												<span className='text-xs truncate'>{event.location}</span>
											</div>

											{/* Event Description */}
											<p
												className='text-xs leading-tight mb-2 line-clamp-2 md:line-clamp-none'
												style={{ color: "#6f7287" }}
											>
												{event.description}
											</p>

											{/* Tags */}
											{event.tags && event.tags.length > 0 && (
												<div className='flex items-center flex-wrap gap-1 mb-2'>
													{event.tags.map((tag, index) => (
														<div
															key={index}
															className='border border-gray-300 rounded px-2 py-0.5'
														>
															<span className='text-xs' style={{ color: "#6f7287" }}>
																{tag}
															</span>
														</div>
													))}
												</div>
											)}

										{/* Action Buttons */}
										<div className='flex flex-wrap gap-2 mt-2'>
											{profileData ? (
												<>
													{/* Register Button - for authenticated users */}
													<button
														onClick={() => handleRegisterClick(event)}
														className='bg-blue-800 text-white px-3 py-1.5 md:py-1 rounded text-xs font-bold shadow-md hover:bg-blue-900 transition-colors'
													>
														Register
													</button>
													{/* View Details Button - for authenticated users */}
													<a
														href={event.link}
														target='_blank'
														rel='noopener noreferrer'
														className='bg-white text-blue-600 border border-blue-600 px-3 py-1.5 md:py-1 rounded text-xs font-bold shadow-md hover:bg-blue-50 transition-colors inline-block'
													>
														View details
													</a>
												</>
											) : (
												/* Join Us Button - for non-authenticated users (replaces both buttons) */
												<button
													onClick={() => navigate('/login', { state: { from: '/upcoming-events' } })}
													className='bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg text-sm whitespace-nowrap'
												>
													Join Us
												</button>
											)}
										</div>
										</div>

										{/* Right Side - Event Image */}
										<div className='w-full md:w-48 lg:w-96 flex-shrink-0 p-3 md:p-2 md:ml-4 lg:ml-16'>
											<div className='w-full h-40 md:h-32 lg:h-48 relative rounded-xl md:rounded-2xl shadow-sm border-2 border-transparent overflow-hidden'>
												{event.imageUrl ? (
													<img
														src={event.imageUrl}
														alt={event.title}
														className='w-full h-full object-cover'
													/>
												) : (
													<div className='bg-gray-100 flex items-center justify-center h-full'>
														<div className='text-center p-4'>
															<div className='text-xs md:text-sm text-gray-500 font-medium'>
																Event Image
															</div>
														</div>
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);

	return (
		<div
			className='min-h-screen bg-white'
		>
			<LandingHeader />

			{/* Main Content */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-1 lg:grid-cols-5 gap-8 min-h-[400px] lg:min-h-screen'>
					{/* Left Side - Image (40% width) */}
					<div className='lg:col-span-2 relative h-64 lg:h-auto'>
						<div
							className='h-full w-full bg-cover bg-center bg-no-repeat rounded-lg lg:rounded-none'
							style={{
								backgroundImage:
									"url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
							}}
						>
							<div className='absolute inset-0 bg-black bg-opacity-10 rounded-lg lg:rounded-none'></div>

							{/* Speech Bubble Overlay */}
							<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
								<div className='bg-white rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-lg max-w-xs'>
									<p className='text-gray-800 text-xs md:text-sm font-medium'>
										This fall, I'm looking for... <span className='text-red-500'>❤</span>
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Right Side - Content (60% width) */}
					<div className='lg:col-span-3 bg-white p-6 md:p-8 lg:p-12 flex flex-col justify-center'>
						<div className='w-full'>
							{/* Skip the Swipe */}
							<p className='text-red-600 font-medium text-xs md:text-sm mb-2'>SKIP THE SWIPE</p>

							{/* Main Title */}
							<h1
								className='text-gray-900 mb-8 md:mb-12 leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
								style={{
									fontWeight: "600",
								}}
							>
								HOW OUR MIXER
								<br />
								EVENTS WORK
							</h1>

							{/* Steps */}
							<div className='space-y-6 md:space-y-10'>
								{/* Step 1 */}
								<div>
									<h3 className='text-base md:text-lg font-bold mb-2 md:mb-3' style={{ color: "#038386" }}>
										STEP 1 | WE PICK THE PERFECT LOCAL SPOT
									</h3>
									<p className='text-gray-700 leading-relaxed text-xs md:text-sm'>
										We scout out the best places in town — think cozy lounges, rooftop
										patios, or that new wine bar everyone's talking about. All you have to
										do is show up ready to mingle (and maybe fall for someone unexpected).
									</p>
								</div>

								{/* Step 2 */}
								<div>
									<h3 className='text-base md:text-lg font-bold mb-2 md:mb-3' style={{ color: "#A42831" }}>
										STEP 2 | GET BACKGROUND CHECKED AND BECOME A MEMBER
									</h3>
									<p className='text-gray-700 leading-relaxed text-xs md:text-sm'>
										No catfish. No creeps. Just real people looking for real connections.
										Before joining the fun, every member goes through a quick background
										check to keep our community safe, classy, and ick-free.
									</p>
								</div>

								{/* Step 3 */}
								<div>
									<h3 className='text-base md:text-lg font-bold mb-2 md:mb-3' style={{ color: "#D59331" }}>
										STEP 3 | YOU ENJOY CURATED EVENT
									</h3>
									<p className='text-gray-700 leading-relaxed text-xs md:text-sm'>
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

			{/* Register Event Modal */}
			{selectedEvent && (
				<RegisterEventModal
					isOpen={isModalOpen}
					onClose={handleCloseModal}
					event={selectedEvent}
				/>
			)}
		</div>
	);
};

export default UpcomingEvents;
