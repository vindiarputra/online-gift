import React from "react";
import { SignIn } from "@clerk/nextjs";

const page = (): React.ReactElement => {
	return (
		<div className="flex justify-center items-center ">
			<SignIn />
		</div>
	);
};

export default page;
