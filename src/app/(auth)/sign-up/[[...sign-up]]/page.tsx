import React from "react";
import {SignUp } from "@clerk/nextjs";

const page = (): React.ReactElement => {
	return (
		<div className="flex justify-center items-center ">
			<SignUp />
		</div>
	);
};

export default page;
