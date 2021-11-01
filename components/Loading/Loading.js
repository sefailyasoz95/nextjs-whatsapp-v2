import React from "react";
import styled, { css } from "styled-components";
import ClockLoader from "react-spinners/ClockLoader";
const override = css`
	background-color: purple;
`;
const Loading = () => {
	return (
		<Container>
			<InnerContainer>
				<ClockLoader css={override} size={100} />
			</InnerContainer>
		</Container>
		// <div style={{ display: "grid", placeItems: "center" }}>Loading...</div>
	);
};
const Container = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background: transparent;
`;
const InnerContainer = styled.div`
	padding: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	:hover {
		backdrop-filter: blur(10px);
		cursor: pointer;
	}
`;

export default Loading;
