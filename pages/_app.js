import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "./login";
import Loading from "../components/Loading/Loading";
import { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";
const MyApp = ({ Component, pageProps }) => {
	const [user, loading] = useAuthState(auth);
	const router = useRouter();
	useEffect(() => {
		if (user) {
			db.collection("users")
				.doc(user.uid)
				.set(JSON.parse(JSON.stringify(user)), { merge: true });
		}
	}, [user]);
	if (loading) return <Loading />;
	return user ? (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	) : (
		<Login />
	);
};

export default MyApp;
