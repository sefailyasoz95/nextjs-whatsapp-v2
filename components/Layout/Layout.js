import React from "react";
import styled from "styled-components";
import Sidebar from "../Sidebar/Sidebar";
import Image from "next/image";
import bgImage from "../../public/Assets/dark-marble-bg.jpg";
const Layout = ({ children }) => {
	return (
		<LayoyutContainer className='col-md-12 d-flex justify-content-center bg-img'>
			<Sidebar />
			<main className='col-md-9 col-sm-9'>{children}</main>
		</LayoyutContainer>
	);
};
const LayoyutContainer = styled.div``;
export default Layout;
