import React from "react";
import styled from "styled-components";
import Head from "next/head";
import ChatScreen from "../../components/Chat/ChatScreen";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipientEmail from "../../utils/getRecipientEmail";
const ChatPage = ({ chat, messages }) => {
	const [user] = useAuthState(auth);
	const messagingWith = getRecipientEmail(chat.users, user);
	return (
		<Container>
			<Head>
				<title>You are messaging with {messagingWith} | MessageMe.App</title>
			</Head>
			<ChatContainer>
				<ChatScreen messages={messages} chat={chat} />
			</ChatContainer>
		</Container>
	);
};
const Container = styled.div`
	margin-left: -15px;
`;
const ChatContainer = styled.div``;

export const getServerSideProps = async (context) => {
	const ref = db.collection("chats").doc(context.query.id);
	const messagesRes = await ref.collection("messages").orderBy("timestamp", "asc").get();
	const messages = messagesRes.docs
		.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}))
		.map((messages) => ({
			...messages,
			timestamp: messages.timestamp.toDate().getTime(),
		}));

	const chatRes = await ref.get();
	const chat = {
		id: chatRes.id,
		...chatRes.data(),
	};
	return {
		props: {
			messages: JSON.stringify(messages),
			chat,
		},
	};
};
export default ChatPage;
