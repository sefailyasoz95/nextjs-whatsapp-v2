import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "../Message/Message";
import { InsertEmoticon, Mic } from "@material-ui/icons";
import firebase from "firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";
import TimeAgo from "timeago-react";

const ChatScreen = ({ chat, messages }) => {
	const [user] = useAuthState(auth);
	const router = useRouter();
	const endOfMessageRef = useRef();
	const scrollToBottom = () => {
		endOfMessageRef.current.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};
	const [input, setInput] = useState("");
	const [messagesSnapshot] = useCollection(
		db.collection("chats").doc(router.query.id).collection("messages").orderBy("timestamp", "asc"),
	);
	const sendMessage = async (e) => {
		e.preventDefault();
		if (input) {
			await db.collection("users").doc(user.uid).set(
				{
					lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
				},
				{ merge: true },
			);

			await db.collection("chats").doc(router.query.id).collection("messages").add({
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				message: input,
				user: user.email,
				photoURL: user.photoURL,
			});

			setInput("");
			scrollToBottom();
		}
	};
	useEffect(() => {
		scrollToBottom();
	}, [messagesSnapshot]);
	const showMessages = () => {
		if (messagesSnapshot) {
			return messagesSnapshot.docs.map((message) => (
				<Message
					key={message.id}
					user={message.data().user}
					message={{
						...message.data(),
						timestamp: message.data().timestamp?.toDate().getTime(),
					}}
				/>
			));
		} else {
			return JSON.parse(messages).map((message) => (
				<Message
					key={message.id}
					user={message.user}
					message={{
						...message.message,
						timestamp: message.timestamp,
					}}
				/>
			));
		}
	};
	const recipientEmail = getRecipientEmail(chat.users, user);
	const [recipientSnapshot] = useCollection(db.collection("users").where("email", "==", recipientEmail));
	const recipient = recipientSnapshot?.docs?.[0]?.data();
	return (
		<Container>
			<Header>
				{recipient ? <Avatar src={recipient?.photoURL} /> : <Avatar>{recipientEmail[0]}</Avatar>}
				<Info>
					<h3>{recipientEmail}</h3>
					{recipientSnapshot ? (
						<small>
							Last Active:{" "}
							{recipient?.lastSeen?.toDate() ? <TimeAgo datetime={recipient?.lastSeen?.toDate()} /> : "Unknown"}
						</small>
					) : (
						<small>Loading...</small>
					)}
				</Info>
				<Icons>
					<IconButton>
						<AttachFileIcon style={{ color: "white" }} />
					</IconButton>

					<IconButton>
						<MoreVertIcon style={{ color: "white" }} />
					</IconButton>
				</Icons>
			</Header>
			<MessageContainer>
				{showMessages()}
				<EndOfMessage ref={endOfMessageRef} />
			</MessageContainer>
			<InputContainer onSubmit={sendMessage}>
				<InsertEmoticon />
				<Input value={input} onChange={(e) => setInput(e.target.value)} />
				<Mic />
			</InputContainer>
		</Container>
	);
};
const Container = styled.div`
	height: 100vh;
	padding: 5px;
	overflow: scroll;
	::-webkit-scrollbar {
		display: none;
	}
	--ms-overflow-style: none;
	scrollbar-width: none;
	flex: 1;
`;

const Header = styled.div`
	position: sticky;
	z-index: 100;
	display: flex;
	padding: 11px;
	align-items: center;
	height: 80px;
	top: -5px;
	backdrop-filter: blur(10px);
`;
const Info = styled.div`
	margin-left: 10px;
	flex: 1;
`;
const Icons = styled.div``;
const MessageContainer = styled.div``;
const Input = styled.input`
	flex: 1;
	align-items: center;
	padding: 10px;
	position: sticky;
	bottom: 0;
	background-color: whitesmoke;
	border-radius: 10px;
	margin: 5px;
	outline: none;
`;
const InputContainer = styled.form`
	display: flex;
	align-items: center;
	padding: 5px;
	position: sticky;
	bottom: -5px;
	z-index: 100;
`;
const EndOfMessage = styled.div``;

export default ChatScreen;
