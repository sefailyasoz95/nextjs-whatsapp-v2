import styled from "styled-components";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { useTranslation } from "react-i18next";
import * as EmailValidator from "email-validator";
import { auth, db, firebaseClient } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "../Chat/Chat";
const Sidebar = ({}) => {
	// const { t } = useTranslation();
	const [user] = useAuthState(auth);
	const userChatRef = db.collection("chats").where("users", "array-contains", user.email);
	const [chatsSnapshot, loading] = useCollection(userChatRef);

	const logout = () => {
		firebaseClient.auth().signOut();
	};
	const createChat = () => {
		const input = prompt("enter email");
		// todo  alert("bir model açıp oradaki listeden arkadaşlarını seçtir"); } \\

		if (!input) return null;
		if (EmailValidator.validate(input) && input !== user.email && !isChatExist(input)) {
			// add chat into db chats collection
			db.collection("chats").add({
				users: [user.email, input],
			});
		}
	};
	const isChatExist = (recipientEmail) => {
		return !!chatsSnapshot?.docs.find((chat) => chat.data().users.find((user) => user === recipientEmail)?.length > 0);
	};
	return (
		<Container className='col-md-3 col-sm-3'>
			<Header>
				<UserAvatar src={user.photoURL} />
				<IconsContainer>
					<IconButton>
						<ChatIcon style={{ color: "white" }} />
					</IconButton>
					<IconButton>
						<MoreVertIcon style={{ color: "white" }} />
					</IconButton>
				</IconsContainer>
			</Header>
			<Search>
				<SearchInput placeholder={"Search in chats"} />
			</Search>
			<SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
			<SidebarButton onClick={logout}>Logout</SidebarButton>
			{chatsSnapshot?.docs.map((chat) => (
				<Chat key={chat.id} id={chat.id} users={chat.data().users} />
			))}
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none;
	}
	--ms-overflow-style: none;
	scrollbar-width: none;
	padding: 0;
	margin-left: -30px;
	height: 100vh;
	backdrop-filter: blur(10px);
`;

const Header = styled.div`
	display: flex;
	position: sticky;
	top: 0;
	backdrop-filter: blur(10px);
	z-index: 1;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	height: 80px;
`;

const UserAvatar = styled(Avatar)`
	cursor: pointer;
	:hover {
		opacity: 0.8;
	}
`;

const IconsContainer = styled.div``;

const Search = styled.div`
	display: flex;
	align-items: center;
	padding: 10px;
	border-radius: 6px;
`;

const SearchInput = styled.input`
	outline: none;
	border: none;
	flex: 1;
	box-shadow: inset 2px 2px 2px #777, inset -2px -2px 2px #ccc;
	padding: 10px;
	background: transparent;
	border-radius: 10px;
	transition: all 0.4s ease-in;
	color: white;
	:hover,
	:focus {
		box-shadow: inset 2px 2px 2px #ccc, inset -2px -2px 2px #777;
	}
`;

const SidebarButton = styled.button`
	width: 100%;
	padding: 8px;
`;
export default Sidebar;
