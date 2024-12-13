import React, { useState } from "react";
import FeildData from "./FeildData";
export default function FeildDataProfile({ id, oldData, isUpdate }) {
    return (
        <>
            {isUpdate ? (
                <FeildData id={id} oldData={oldData} isUpdate={isUpdate} />
            ) : (
                <>
                    <div className="flex items-center">
                        <label className="text-xl font-bold w-[100px]">
                            Name:
                        </label>
                        <p className="text-xl">
                            {oldData.first_name + " " + oldData.last_name}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <label className="text-xl font-bold w-[100px]">
                            Email:
                        </label>
                        <p className="text-xl">{oldData.email}</p>
                    </div>
                    <div className="flex items-center">
                        <label className="text-xl font-bold w-[100px]">
                            Address:
                        </label>
                        <p className="text-xl">{oldData.address}</p>
                    </div>
                    <div className="flex items-center">
                        <label className="text-xl font-bold w-[100px]">
                            Phone:
                        </label>
                        <p className="text-xl">{oldData.phone_nuumber}</p>
                    </div>
                    <div className="flex items-center">
                        <label className="text-xl font-bold w-[100px]">
                            Blog_count:
                        </label>
                        <p className="text-xl">{oldData.blogs_count}</p>
                    </div>
                </>
            )}
        </>
    );
}
