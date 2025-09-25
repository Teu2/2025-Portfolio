import React, { useState, useEffect } from "react";
import "./ProfileGuestBook.scss";
import { FaGoogle, FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { createClient } from "@supabase/supabase-js";
import { Message } from "./Message";
import google from "../../assets/tech stack icons/google.png"
import { FiLogOut } from "react-icons/fi";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export const ProfileGuestBook = () => {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (!supabase) return setLoading(false);
		checkUser();
		fetchMessages();
		const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
		setUser(session?.user || null);
		});
		return () => subscription.unsubscribe();
	}, []);

	const checkUser = async () => {
		const { data: { session } } = await supabase.auth.getSession();
		setUser(session?.user || null);
		setLoading(false);
	};

	const fetchMessages = async () => {
		const { data, error } = await supabase
		.from("guestbook_messages")
		.select("*")
		.order("created_at", { ascending: false });
		if (!error) setMessages(data);
	};

	const signInWithGoogle = async () => {
		await supabase.auth.signInWithOAuth({
		provider: "google",
		options: { redirectTo: "http://localhost:5173/guestbook" },
		});
	};

	const signOut = async () => {
		await supabase.auth.signOut();
	};

	const handleSubmit = async () => {
		if (!message.trim() || !user) return;
		setSubmitting(true);
		await supabase.from("guestbook_messages").insert([
		{
			user_id: user.id,
			user_name: user.user_metadata.full_name || user.email,
			user_email: user.email,
			user_avatar_url: user.user_metadata.avatar_url,
			message: message.trim(),
		},
		]);
		setMessage("");
		setSubmitting(false);
		fetchMessages();
		signOut();
	};

	const formatDate = (date) =>
		new Date(date).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
	});

  	if (loading) return <div className="profile-guestbook-parent"><p>Loading...</p></div>;

  	return (
		<div className="profile-guestbook-parent">
			<div className="content">
				<div className="content-header" data-aos="fade-up" data-aos-duration="300">
					<h1>Guestbook</h1>
					<p>Feel free to leave a message! I'd love to hear what you think about this portfolio! feel free leave any suggestions, or just write anything that's on your mind! 😎</p>
				</div>
				
				<div className="container-body" data-aos="fade-up" data-aos-delay="200" data-aos-duration="300">
					{!user ? (
						<div className="auth-box">
							<button className="google-btn" onClick={signInWithGoogle}>
								<img src={google} alt="google"/> Sign in with Google to leave a message
							</button>
						</div>
					) : (
						<>
							<div className="user-info">
								<div className="top">
									<div className="left">
										<img src={user.user_metadata.avatar_url} alt="avatar" className="avatar" />
										<div className="welcome">
											<p className="white">Signed in as</p>
											<p>{user.user_metadata.full_name || user.email}</p>
										</div>
									</div>
									<button className="signout-btn" onClick={signOut}><FiLogOut /> Sign out</button>
								</div>
								
								<div className="bottom">
									<textarea placeholder="Write your message..." value={message} onChange={(e) => setMessage(e.target.value)} maxLength="500"/>
									<div className="form-actions">
										<span className="char-count">{message.length}/500</span>
										<button onClick={handleSubmit} disabled={!message.trim() || submitting} className="submit-btn">
											<IoSend /> {submitting ? "Sending..." : "Send"}
										</button>
									</div>
								</div>
							</div>

							
						</>
					)}

					<div className="messages-from-peeps">
						<h5>💚 MESSAGE BOARD</h5>
						<div className="messages-list">
							{messages.length === 0 && <p className="empty">No messages yet ✨</p>}
							{messages.map((msg) => (
								<Message key={msg.id} userName={msg.user_name} avatarUrl={msg.user_avatar_url} time={formatDate(msg.created_at)} text={msg.message}/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
  	);
};
