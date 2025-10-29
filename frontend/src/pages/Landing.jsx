import React, { useEffect, useState } from "react";
import LandingHeader from "../components/layout/LandingHeader";
import Footer from "../components/layout/Footer";
import { FaQuoteRight } from "react-icons/fa";
import { stripeService } from "../services/stripeService";
import authService from "../services/authService";
import { useProfile } from "../contexts/ProfileContext";
import { useNavigate } from "react-router-dom";
import BackgroundUnpaid from "../components/BackgroundUnpaid";
import BackgroundPending from "../components/BackgroundPending";
const Landing = () => {
	const [userDetails, setUserDetails] = useState();
	const [paymentIsLoading, setPaymentIsLoading] = useState(false);
	const [isMemberPaymentLoading, setIsMemberPaymentLoading] = useState(false);
	const { profileData } = useProfile();
	const isAuthenticated = authService.isAuthenticated() || profileData !== null;
	console.log({ profileData });
	const navigate = useNavigate();
	const handlePayForVerification = async (productType) => {
		if (!isAuthenticated) return navigate("/login");
		if (productType === "basic_membership" || productType === "upgrade_membership") {
			setIsMemberPaymentLoading(true);
		} else {
			setPaymentIsLoading(true);
		}
		const response = await stripeService.createCheckoutSession(
			1000,
			"usd",
			"ORD_001",
			productType,
		);
		console.log({ response });
		window.location.href = response?.sessionUrl;
	};

	const getProfile = async () => {
		const profileCheck = await authService.checkProfileCompletion();
		console.log({ profileCheck });
		const userDetails = profileCheck?.profile || {};
		console.log({ userDetails });
		setUserDetails(userDetails || {});
	};

	useEffect(() => {
		getProfile();
	}, []);
	return (
		<div className='min-h-screen' style={{ backgroundColor: "#F5F5F5" }}>
			<LandingHeader />

			{/* Hero Section */}
			<section
				className='relative pt-10 md:pt-20 pb-0 px-4 sm:px-6 lg:px-8'
				style={{ backgroundColor: "#F5F5F5" }}
			>
				<div className='max-w-7xl mx-auto'>
					<div className='relative'>
						{/* Dark Gray Card */}
						<div
							className='rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl relative z-10 w-full min-h-[400px] md:min-h-[500px] lg:min-h-[570px] flex items-center overflow-hidden'
							style={{ backgroundColor: "#333333" }}
						>
							<div className='text-white w-full lg:w-[60%] xl:w-[55%] flex flex-col justify-center'>
								<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight break-words'>
									<div className='max-w-full'>
										Stop Swiping, <span style={{ color: "#038386" }}>Start Living.</span>
									</div>
								</h1>

								<div className='flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6 xl:gap-8 mb-4 sm:mb-6 lg:mb-8'>
									<div className='flex-shrink-0 lg:mt-12'>
										<button
											onClick={() => (window.location.href = "/contact")}
											className='w-full sm:w-auto inline-block text-white font-bold py-2.5 sm:py-3 lg:py-4 px-5 sm:px-6 lg:px-8 rounded-full transition-colors duration-200 text-sm sm:text-base lg:text-lg cursor-pointer whitespace-nowrap'
											style={{
												color: "#FFFFFF",
												background: "linear-gradient(135deg, #A42831, #A42831)",
												boxShadow:
													"0 4px 15px rgba(0, 0, 0, 0.3), 0 0 10px rgba(164, 40, 49, 0.5), 0 0 0 1px rgba(164, 40, 49, 0.3)",
												border: "none",
											}}
										>
											Join Mixer Today
										</button>
									</div>

									<div
										className='space-y-2 sm:space-y-3 text-xs sm:text-sm md:text-base leading-relaxed max-w-full break-words'
										style={{ color: "#FFFFFFB3" }}
									>
										<p>
											You wouldn't hire someone without a background check- so why meet a
											date without knowing who they are?
										</p>
										<p>
											Mixer is the local dating service that puts safety first so you can
											connect with confidence.
										</p>
									</div>
								</div>

								<h5 className='text-white text-xs font-semibold mt-4 lg:mt-8'>
									A whole new way to connect — safely!
								</h5>
							</div>
						</div>
					</div>
				</div>
			</section>

      {/* Meet with Mixer Section */}
      <section
        className="pt-6 md:pt-6 pb-10 md:pb-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: "#F5F5F5" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative flex items-center">
            {/* Red Container on the Left */}
            <div
              className="rounded-3xl shadow-2xl w-full lg:w-[55%] relative z-10"
              style={{
                backgroundColor: "#A42831",
                margin: "10px 0 30px 0",
                padding: "32px 24px 24px 24px",
              }}
            >
              <div className="text-white">
                <style jsx>{`
                  p a {
                    color: #020101;
                  }
                `}</style>
                <h2
                  className="text-2xl md:text-4xl font-bold mb-4 md:mb-6"
                >
                  Meet with Mixer
                </h2>
                <p className="text-sm md:text-lg mb-6 md:mb-8 leading-relaxed">
                  We're not your average dating service. Our events are
                  thoughtfully curated to bring singles together in a safe,
                  inclusive, and enjoyable environment. Every participant is
                  background-checked and every gathering is designed to foster
                  genuine interaction. Whether you're looking for a new connection
                  or just want to get out and enjoy life, we offer a unique
                  approach to dating that blends technology with personal touch.
                </p>
                <a
                  href="/events"
                  className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 md:py-3 px-6 md:px-8 rounded-full transition-colors duration-200 text-sm md:text-base"
                >
                  Upcoming Events
                </a>
              </div>
            </div>

            {/* Image overlapping on the Right */}
            <div className="hidden lg:block absolute right-24 top-[20%] transform -translate-y-1/2 w-[30%] z-20">
              <img
                src="/assets/mixer-image.png"
                alt="Dining experience"
                className="w-full h-auto shadow-2xl"
                style={{
                  maxHeight: "650px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Full Screen Fluid Background Section */}
      <div className="ui-fluid-gradient-wrapper ui-e-fluid-canvas w-full min-h-screen py-12 md:py-0">
        <div className="ui-fluid-gradient"></div>
        <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Column 1 - Two Paragraphs */}
            <div className="flex flex-col items-center justify-center p-4 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-black mb-3 md:mb-4 text-center">
                BACKGROUND CHECKS
              </h3>
              <p className="text-sm md:text-base text-black leading-relaxed text-center mb-6 md:mb-8">
                All participants undergo a thorough background check to ensure a
                safe and trustworthy community. Your peace of mind is our
                priority, so you can focus on making genuine connections.
              </p>

							<h3 className='text-xl md:text-2xl font-bold text-black mb-3 md:mb-4 text-center'>
								CURATED MIXERS
							</h3>
							<p className='text-sm md:text-base text-black leading-relaxed text-center'>
								We host fun and engaging singles events right here in Colorado Springs,
								bringing local people together in meaningful ways. From blind dating to
								social mixers, every event is curated to help you connect in a relaxed,
								real-life setting.
							</p>
						</div>

            {/* Column 2 - Images */}
            <div className="hidden lg:flex flex-col items-center justify-center gap-8">
              <div className="w-full flex items-center justify-center">
                <img
                  src="/assets/coffe.png"
                  alt="Coffee date"
                  className="w-full h-auto max-w-sm object-cover"
                />
              </div>
              <div className="w-full flex items-center justify-center">
                <img
                  src="/assets/candle.png"
                  alt="Romantic dinner"
                  className="w-full h-auto max-w-sm object-cover"
                />
              </div>
            </div>

						{/* Column 3 - Two Paragraphs */}
						<div className='flex flex-col items-center justify-center p-4 md:p-8'>
							<h3 className='text-xl md:text-2xl font-bold text-black mb-3 md:mb-4 text-center'>
								AGE-INCLUSIVE
							</h3>
							<p className='text-sm md:text-base text-black leading-relaxed text-center mb-6 md:mb-8'>
								Our events are designed for singles ages 21 to 60, creating
								opportunities for meaningful connections across a wide age range.
								Whether you're in your twenties or nearing retirement, there's a place
								for you here.
							</p>

							<h3 className='text-xl md:text-2xl font-bold text-black mb-3 md:mb-4 text-center'>
								BLIND MIXER
							</h3>
							<p className='text-sm md:text-base text-black leading-relaxed text-center'>
								Blind Mixer takes all the guesswork out of dating. We handle every
								detail from matching to reservations—carefully curated to give you the
								best chance at real connection. Just show up and enjoy.
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Testimonial and Pricing Section */}
			<section
				className='py-20 px-4 sm:px-6 lg:px-8'
				style={{ backgroundColor: "#FFFFFF" }}
			>
				<div className='max-w-7xl mx-auto'>
					{/* Testimonial Section */}
					<div className='mb-12 md:mb-16'>
						<div className='flex flex-col md:flex-row max-w-4xl mx-auto'>
							{/* Left Column - Quote Symbol */}
							<div className='w-full md:w-2/5 relative mb-4 md:mb-0 flex justify-center md:justify-start'>
								<div className='w-16 md:w-20 h-16 md:h-20 rounded-lg relative'>
									<FaQuoteRight
										size={62}
										className='md:hidden'
										style={{
											color: "#A42831",
											position: "absolute",
											top: "8px",
											left: "50%",
											transform: "translateX(-50%)",
										}}
									/>
									<FaQuoteRight
										size={82}
										className='hidden md:block'
										style={{
											color: "#A42831",
											position: "absolute",
											top: "8px",
											right: "-120px",
										}}
									/>
								</div>
							</div>

							{/* Right Column - Content */}
							<div className='w-full md:w-3/5 md:pl-8'>
								<div className='mb-3 md:mb-4'>
									<h4
										className='text-xl md:text-2xl font-bold text-center md:text-left'
										style={{ color: "#000000" }}
									>
										- Jennifer M. <br />
										Colorado Springs
									</h4>
								</div>
								<p
									className='text-base md:text-lg leading-relaxed text-center md:text-left'
									style={{ color: "#374151" }}
								>
									"I've tried all the major dating apps, Mixer is the first one that
									actually makes me feel safe. Knowing everyone is background checked
									gives me so much more confidence to meet people in real life. I can't
									wait to experience the app once it launches."
								</p>
							</div>
						</div>
					</div>

					{/* Pricing Sections */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto'>
						{/* Basic Plan */}
						<div className='bg-white overflow-hidden border border-black'>
							<div
								className='w-full py-6 md:py-8 text-center'
								style={{ backgroundColor: "#038386" }}
							>
								<h3 className='text-xl md:text-2xl font-bold text-white uppercase tracking-wide'>
									Basic Plan
								</h3>
							</div>
							<div className='p-6 md:p-12 text-center'>
								<div className='mb-8 md:mb-10 flex items-baseline justify-center'>
									<span className='text-2xl md:text-4xl font-bold text-gray-900'>$</span>
									<span className='text-5xl md:text-7xl font-bold text-gray-900'>
										24
									</span>
									<span className='text-2xl md:text-4xl font-bold text-gray-900'>
										.99
									</span>
									<span className='text-lg md:text-2xl text-gray-600 ml-2 md:ml-3'>
										/ Month
									</span>
								</div>
								<button
									className='w-full md:w-auto py-3 md:py-4 px-8 md:px-10 font-semibold text-xs transition-colors duration-200 mt-8 md:mt-16'
									style={{
										backgroundColor: "#E9E8E6",
										color: "#000000",
									}}
									disabled={isMemberPaymentLoading}
									onClick={() => handlePayForVerification("basic_membership")}
								>
									{isMemberPaymentLoading ? "Loading..." : "GET BASIC"}
								</button>
							</div>
						</div>

						{/* Upgrade Plan */}
						<div className='bg-white overflow-hidden border border-black'>
							<div
								className='w-full py-6 md:py-8 text-center'
								style={{ backgroundColor: "#667eea" }}
							>
								<h3 className='text-xl md:text-2xl font-bold text-white uppercase tracking-wide'>
									Upgrade Plan
								</h3>
							</div>
							<div className='p-6 md:p-12 text-center'>
								<div className='mb-8 md:mb-10 flex items-baseline justify-center'>
									<span className='text-2xl md:text-4xl font-bold text-gray-900'>$</span>
									<span className='text-5xl md:text-7xl font-bold text-gray-900'>
										34
									</span>
									<span className='text-2xl md:text-4xl font-bold text-gray-900'>
										.99
									</span>
									<span className='text-lg md:text-2xl text-gray-600 ml-2 md:ml-3'>
										/ Month
									</span>
								</div>
								<button
									className='w-full md:w-auto py-3 md:py-4 px-8 md:px-10 font-semibold text-xs transition-colors duration-200 mt-8 md:mt-16'
									style={{
										backgroundColor: "#E9E8E6",
										color: "#000000",
									}}
									disabled={isMemberPaymentLoading}
									onClick={() => handlePayForVerification("upgrade_membership")}
								>
									{isMemberPaymentLoading ? "Loading..." : "GET UPGRADE"}
								</button>
							</div>
						</div>
					</div>

					<div className='max-w-lg mx-auto mt-8'>
						{/* Background Check Section */}
						{profileData?.backgroundVerification === "unpaid" && (
							<BackgroundUnpaid
								handlePayForVerification={handlePayForVerification}
								isLoading={paymentIsLoading}
							/>
						)}
						{profileData?.backgroundVerification === "pending" && (
							<BackgroundPending
								handlePayForVerification={handlePayForVerification}
								isLoading={paymentIsLoading}
							/>
						)}
						{/* <div className='bg-white overflow-hidden border border-black'>
							<div
								className='w-full py-6 md:py-8 text-center'
								style={{ backgroundColor: "#F97316" }}
							>
								<h3 className='text-xl md:text-2xl font-bold text-white uppercase tracking-wide'>
									Background Check
								</h3>
							</div>

							<div className='p-6 md:p-12 text-center'>
								<div className='mb-8 md:mb-10 flex items-baseline justify-center'>
									<span className='text-2xl md:text-4xl font-bold text-gray-900'>$</span>
									<span className='text-5xl md:text-7xl font-bold text-gray-900'>7</span>
									<span className='text-2xl md:text-4xl font-bold text-gray-900'>
										.99
									</span>
									<span className='text-lg md:text-2xl text-gray-600 ml-2 md:ml-3'>
										One Time Payment
									</span>
								</div>
								<button
									className='w-full md:w-auto py-3 md:py-4 px-8 md:px-10 font-semibold text-xs transition-colors duration-200 mt-8 md:mt-16'
									style={{
										backgroundColor: "#E9E8E6",
										color: "#000000",
									}}
									onClick={() => handlePayForVerification("background_check")}
									disabled={paymentIsLoading}
								>
									{paymentIsLoading ? "loading" : "APPLY NOW"}
								</button>
							</div>
						</div> */}
					</div>
				</div>
			</section>

			{/* How It Started Section */}
			<section
				className='py-12 md:py-20 px-4 sm:px-6 lg:px-8'
				style={{ backgroundColor: "#F5F5F5" }}
			>
				<div className='max-w-7xl mx-auto'>
					<div
						className='flex flex-col md:flex-row'
						style={{
							backgroundColor: "#F5F5F5",
							minHeight: "auto",
							padding: "24px",
						}}
					>
						{/* Left div - Title */}
						<div className='w-full md:w-2/5 md:pr-16 mb-6 md:mb-0'>
							<div className='w-20 md:w-85 h-px bg-teal-600 mb-4 md:mb-6'></div>
							<h4
								className='text-2xl md:text-4xl font-semibold'
								style={{ color: "#5E1053" }}
							>
								How It Started
							</h4>
						</div>

						{/* Right div - Content */}
						<div
							className='w-full md:w-3/5 text-gray-700 md:text-base md:leading-loose'
							style={{
								fontSize: "14px",
								fontWeight: "400",
								lineHeight: "1.8em",
							}}
						>
							<p className='mb-4'>
								At Mixer, we're not just changing how people date—we're changing what
								people expect from dating.
							</p>
							<p className='mb-4'>
								Founded by a decades-long dating app user who, like you, got tired of
								swiping and wondering, "Is this really it?" Mixer was created for people
								who want more: real connections, in-person events, and a dating
								experience grounded in authenticity and safety.
							</p>
							<p className='mb-4'>
								That's why every applicant is background-checked, and why membership
								comes with a price tag. Because let's be honest—the best investment you
								can make is in yourself, and when people pay to be here, it shows
								they're serious about showing up.
							</p>
							<p className='mb-4'>
								Mixer is a local-first platform that brings like-minded singles together
								through curated events where chemistry happens in real life—not just
								behind a screen.
							</p>
							<p>
								If you're ready to stop browsing and start building something real,
								welcome to Mixer.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Final CTA Section */}
			<section
				className='py-12 md:py-20 px-4 sm:px-6 lg:px-8'
				style={{ backgroundColor: "#F5F5F5" }}
			>
				<div className='max-w-6xl mx-auto'>
					<div
						className='rounded-3xl shadow-2xl'
						style={{
							backgroundColor: "#333333",
							minHeight: "auto",
							width: "100%",
						}}
					>
						{/* Image at the top */}
						<div className='w-full h-32 md:h-48 flex justify-center overflow-hidden rounded-t-3xl'>
							<img
								src='https://mixerltd.com/wp-content/uploads/2025/10/kelly-sikkema-4le7k9XVYjE-unsplash-scaled.jpg.webp'
								alt='Ready to Meet Someone Real'
								className='h-full w-auto object-contain'
							/>
						</div>

						{/* Content below the image */}
						<div className='p-6 md:p-12 text-white flex flex-col'>
							{/* Top section with headline and content */}
							<div className='flex flex-col md:flex-row flex-1 gap-6 md:gap-0'>
								{/* Left div - Headline */}
								<div className='w-full md:w-1/2 md:pr-8 md:pl-16 text-center md:text-right'>
									<h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 leading-tight'>
										READY TO MEET
										<br />
										SOMEONE REAL —<br />
										AND VERIFIED?
									</h2>
								</div>

								{/* Right div - Content */}
								<div className='w-full md:w-1/2 md:pl-4'>
									<p
										className='text-xs md:text-sm leading-relaxed text-center'
										style={{ color: "#FFFFFFB3" }}
									>
										Join a community where safety comes first and real connections happen
										locally. With background checks built in, Mixer gives you peace of
										mind while you focus on finding the right match.
									</p>
								</div>
							</div>

							{/* Bottom section with centered button */}
							<div className='flex justify-center mt-6 md:mt-8'>
								<button
									onClick={() => (window.location.href = "/contact")}
									className='inline-block text-white font-bold py-2 md:py-3 px-6 md:px-8 rounded-full transition-colors duration-200 text-base md:text-lg cursor-pointer'
									style={{
										backgroundColor: "#D59331",
									}}
								>
									Contact Mixer
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default Landing;
