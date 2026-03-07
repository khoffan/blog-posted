import React from "react";
import FieldDataProfile from "./FieldDataProfile";

export default function UpdateProfileDetail({ id, oldData }) {
	return (
		<div className="w-full font-sans">
			<h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8 font-serif">
				Edit Profile
			</h1>
			
			<div className="bg-white border text-left border-gray-100 rounded-2xl shadow-sm p-8">
				<FieldDataProfile
					id={id}
					oldData={oldData}
					isUpdate={true}
				/>
			</div>
		</div>
	);
}
