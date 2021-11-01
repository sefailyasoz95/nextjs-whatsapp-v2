import Head from "next/head";
import styled from "styled-components";
import { auth, firebaseClient, provider } from "../firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: "popup",
	// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
	signInSuccessUrl: "/",
	// We will display Google and Facebook as auth providers.
	signInOptions: [provider.providerId],
};
const Login = () => {
	return (
		<Container className='align-items-center'>
			<Head>
				<title>Welcome to MessageMe.App | Login to start Messaging</title>
			</Head>
			<LoginContainer className='col-md-6'>
				<Welcome className='col-md-8'>
					<Title>MessageMe.App</Title>
					<Description>A new way of messaging. To get started, sign in with your Google account</Description>
				</Welcome>
				{/* Logo */}
				<StyledFirebaseAuth className='' uiConfig={uiConfig} firebaseAuth={firebaseClient.auth()} />
			</LoginContainer>
		</Container>
	);
};
const Container = styled.div`
	display: grid;
	place-items: center;
	height: 100vh;
`;
const LoginContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 8px;
	box-shadow: inset 2px 2px 2px #999, inset -2px -2px 2px #999, 0 0 21px 1px #555;
	height: 200px;
	padding: 10px;
`;

const Welcome = styled.div`
	display: flex;
	backdrop-filter: blur(2px);
	align-items: center;
	justify-content: center;
	flex-direction: column;
	box-shadow: inset 2px 2px 2px #333, inset -2px -2px 2px #333;
	font-weight: bold;
`;
const Title = styled.span`
	letter-spacing: 3px;
	padding: 3px;
`;
const Description = styled.small`
	font-size: 9px;
	font-style: italic;
`;
const Logo = styled.img`
	height: 200px;
	width: 200px;
	margin-bottom: 50px;
`;
export default Login;
