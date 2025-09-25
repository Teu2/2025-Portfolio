import React from "react";
import { FaRegSmile } from "react-icons/fa";
import { FaList } from "react-icons/fa";

export const Message = ({ userName, avatarUrl, time, text }) => {
	return (
		<div className="message">
			<div className="right">
				<div className="message-header">
					<div className="left">
						<div className="profile-icon">
							{avatarUrl ? (
							<img src={avatarUrl} alt="Profile" />
							) : (
							<div className="avatar-fallback">
								{userName.charAt(0).toUpperCase()}
							</div>
							)}
						</div>
					</div>
					<div className="right">
						<p className="user">{userName}</p>
						<p className="time"><FaList/> {time}</p>
					</div>
				</div>
				<p className="message-text">{text}</p>
			</div>
		</div>
	);
};
