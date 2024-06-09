import React, { useState } from "react";

export default function FeildData({ id, oldData }) {
	const [user, setuser] = useState({
		name: oldData.first_name + " " + oldData.last_name,
		email: oldData.email,
		address: "ไม่มีข้อมูล",
		phone: "ไม่มีข้อมูล",
		blog_count: 0
	});

	const changeName = (event) => {
		setuser({ ...user, name: event.target.value });
	};

	const changeEmail = (event) => {
		setuser({ ...user, email: event.target.value });
	};

	const changeAddress = (event) => {
		setuser({ ...user, address: event.target.value });
	};

	const changePhone = (event) => {
		setuser({ ...user, phone: event.target.value });
	};

	return (
		<>
			<span className="relative py-[30px] mb-[10px] px-auto block text-xl hover:border hover:border-orange-400">
				Name:
				<input
					type="text"
					id="name"
					className="absolute left-[80px] top-[20px] min-w-[500px] max-w-full ml-[80px] px-[10px] rounded-md outline-none h-[50px] border caret-orange-400 focus:outline-none focus:border-gray-400"
					value={user.name}
					onChange={changeName}
				/>
			</span>
			<span className="relative py-[30px] my-[10px] text-xl px-auto  block hover:border hover:border-orange-400 ">
				Email:
				<input
					type="text"
					id="email"
					className="absolute left-[80px] top-[20px] min-w-[500px] max-w-full ml-[80px] px-[10px] rounded-md outline-none h-[50px] border caret-orange-400 focus:outline-none focus:border-gray-400"
					value={user.email}
					onChange={changeEmail}
				/>
			</span>
			<span className="relative py-[30px] mb-[10px] text-xl px-auto mt-[10px] block hover:border hover:border-orange-400 ">
				Address:
				<input
					type="text"
					id="address"
					className="absolute left-[80px] top-[20px] ml-[80px] min-w-[500px] max-w-full px-[10px] rounded-md outline-none h-[50px] border caret-orange-400 focus:outline-none focus:border-gray-400"
					value={user.address}
					onChange={changeAddress}
				/>
			</span>
			<span className="relative py-[30px] my-[10px] text-xl px-[20px]  block hover:border hover:border-orange-400  ">
				Phone:
				<input
					type="text"
					id="phone"
					className="absolute left-[80px] top-[20px] ml-[80px] px-[10px] min-w-[500px] max-w-full rounded-md outline-none  h-[50px] border caret-orange-400 focus:outline-none focus:border-gray-400"
					value={user.phone}
					onChange={changePhone}
				/>
			</span>
			<span className="py-[30px] my-[10px] text-xl px-auto  block  hover:border hover:border-orange-400 ">
				Blogs count:
				<p className="ml-[80px] text-xl inline px-[30px] ">0</p>
			</span>
		</>
	);
}
