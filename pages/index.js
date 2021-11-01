import Head from "next/head";
import Sidebar from "../components/Sidebar/Sidebar";

const Home = () => {
	return (
		<div>
			<Head>
				<title>MessageMe.App</title>
				<meta name='description' content='MessageMe.App is a platform that you can chat with your friends free!' />
				<meta name='keywords' content='MessageMe.App chat whatsapp message sms iMessage' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div>welcome home</div>
		</div>
	);
};

export default Home;
