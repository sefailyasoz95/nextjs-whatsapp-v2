import moment from "moment";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../../firebase";

const Message = ({ user, message }) => {
	const [loggedInUser] = useAuthState(auth);
	const ShowMessage = user === loggedInUser.email ? Sender : Reciever;
	return (
		<Container>
			<ShowMessage>
				{message.message}
				<Timestamp>{message.timestamp ? moment(message.timestamp).format("LT") : "..."}</Timestamp>
			</ShowMessage>
		</Container>
	);
};
const Container = styled.div``;
const MessageElement = styled.p`
	width: fit-content;
	padding: 8px;
	border-radius: 8px;
	position: relative;
	text-align: right;
	color: black;
	font-size: 14px;
	transition: all 0.3s ease-in-out;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Sender = styled(MessageElement)`
	margin-left: auto;
	box-shadow: inset 3px 3px 2px #ddd, inset -3px -3px 2px #999;
	background-color: rgba(255, 255, 255, 1);
	:hover {
		box-shadow: inset 3px 3px 2px #999, inset -3px -3px 2px #ddd;
		cursor: pointer;
	}
	align-items: flex-end;
`;
const Reciever = styled(MessageElement)`
	box-shadow: inset 3px 3px 2px #555, inset -3px -3px 2px #222;
	background-color: rgba(10, 10, 10, 1);
	text-align: left;
	color: white;
	:hover {
		box-shadow: inset 3px 3px 5px #222, inset -3px -3px 5px #555;
		cursor: pointer;
	}
	align-items: flex-start;
`;
const Timestamp = styled.span`
	color: gray;
	font-size: 9px;
	bottom: 0;
	right: 0;
	align-self: flex-end;
`;
export default Message;
