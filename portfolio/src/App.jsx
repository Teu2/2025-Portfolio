import { useState, useEffect, createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";

// components
import { Navbar } from "./components/navbar/Navbar.jsx";
import { ProfileHeadline } from "./components/profile headline/ProfileHeadline.jsx";
import { ProfileAbout } from "./components/profile about/ProfileAbout.jsx";
import { ProfileSkills } from "./components/profile skills/ProfileSkills.jsx";
import { ProfileServices } from "./components/profile services/ProfileServices.jsx";
import { Footer } from "./components/footer/Footer.jsx";
import { ProfileExperience } from "./components/profile experience/ProfileExperience.jsx";
import { ProfileProjects } from "./components/profile projects/ProfileProjects.jsx";
import { ProfileContact } from "./components/profile contact/ProfileContact.jsx";
import { ProfileSpotify } from "./components/profile spotify/ProfileSpotify.jsx";

function App() {

	const router = createBrowserRouter([
		{
			path: "/",
			element: (
				<div className="app-container">
					<Navbar />
					<div className="content">
						<ProfileHeadline />
						<ProfileAbout />
						<ProfileSkills />
						<ProfileServices />
					</div>
					<Footer />
				</div>
			)
		},
		{
			path: "/experience",
			element: (
				<div className="app-container">
					<Navbar />
					<div className="content">
						<ProfileExperience />
					</div>
					<Footer />
				</div>
			)
		},
		{
			path: "/projects",
			element: (
				<div className="app-container">
					<Navbar />
					<div className="content">
						<ProfileProjects />
					</div>
					<Footer />
				</div>
			)
		},
		{
			path: "/listening",
			element: (
				<div className="app-container">
					<Navbar />
					<div className="content">
						<ProfileSpotify />
					</div>
					<Footer />
				</div>
			)
		},
		{
			path: "/contact",
			element: (
				<div className="app-container">
					<Navbar />
					<div className="content">
						<ProfileContact />
					</div>
					<Footer />
				</div>
			)
		},
	])

	return (
		<div className="app-parent">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
