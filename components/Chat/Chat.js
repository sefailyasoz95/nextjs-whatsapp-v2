import { Avatar } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import getRecipientEmail from "../../utils/getRecipientEmail";
import Link from "next/link";
const Chat = ({ id, users }) => {
	const [user] = useAuthState(auth);
	const router = useRouter();
	const recipientEmail = getRecipientEmail(users, user);
	const [recipientSnapshot] = useCollection(db.collection("users").where("email", "==", recipientEmail));
	const recipient = recipientSnapshot?.docs?.[0]?.data();
	const [active, setActive] = useState("");
	useEffect(() => {
		router.query.id === id && setActive("active");
		router.query.id !== id && setActive("");
	}, [router.query.id]);
	return (
		<Link href={`/chat/${id}`}>
			<Container className={`${active} chat`}>
				{recipient ? <UserAvatar src={recipient.photoURL} /> : <UserAvatar>{recipientEmail[0]}</UserAvatar>}
				<span>{recipientEmail}</span>
			</Container>
		</Link>
	);
};
const Container = styled.div`
	display: flex;
	cursor: pointer;
	align-items: center;
	padding: 5px;
	word-break: break-word;
	background-color: transparent;
	:hover {
		/* backdrop-filter: blur(10px); */
	}
	border-radius: 10px;
	margin-top: 3px;
`;

const UserAvatar = styled(Avatar)`
	margin: 10px;
	:hover {
		opacity: 0.8;
	}
`;

export default Chat;
