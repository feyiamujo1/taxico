"use client";
import { useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { PiArrowRight } from "react-icons/pi";
import DriverPopup from "./DriverProfilePopup";

const UsersTable = ({
  type,
  data
}: {
  type: string;
  data: {
    name: string;
    email: string;
    userType?: string;
    lastAccess?: string;
    licenseNumber?: string;
    status?: string;
  }[];
}) => {
  const [showDriverPopup, setShowDriverPopup] = useState(false);
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-sm 2xl:text-base font-medium"></p>
        <button className=" rounded px-2.5 py-1.5 text-sm 2xl:text-base font-medium border">
          Filter
        </button>
      </div>
      <table className="w-full table-auto overflow-x-scroll">
        <colgroup>
          <col style={{ width: "5%" }} />
          <col
            style={type === "Driver" ? { width: "20%" } : { width: "30%" }}
          />
          <col style={{ width: "30%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "15%" }} />
          {type === "Driver" && <col style={{ width: "10%" }} />}
        </colgroup>
        <thead className="!text-left font-normal border-b-[0.5px]">
          <tr>
            <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg">
              S/N
            </th>
            <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg">
              Name
            </th>
            <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg">
              Email Address
            </th>
            {type === "Driver" ? (
              <>
                <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg">
                  License Number
                </th>
                <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg">
                  Verification Status
                </th>
                <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg"></th>
              </>
            ) : (
              <>
                <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg">
                  User Type
                </th>
                <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg">
                  Last Accessed
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((user, id) => (
            <tr key={id}>
              <td className="py-3 text-sm 2xl:text-base">{id + 1}</td>
              <td className="py-3 text-sm 2xl:text-base">{user.name}</td>
              <td className="py-3 text-sm 2xl:text-base">{user.email}</td>
              {type === "Driver" ? (
                <>
                  <td className="py-3 text-sm 2xl:text-base">
                    {user?.licenseNumber}
                  </td>
                  <td className="py-3 text-sm 2xl:text-base">{user?.status}</td>
                  <td className="py-3 text-sm 2xl:text-base text-right">
                    <DriverPopup />
                  </td>
                </>
              ) : (
                <>
                  <td className="py-3 text-sm 2xl:text-base capitalize">
                    {user?.userType}
                  </td>
                  <td className="py-3 text-sm 2xl:text-base">
                    {user?.lastAccess}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-7 pb-7">
        <button className="flex gap-1 items-center text-sm md:text-base text-[#BFBFBF]">
          <HiOutlineArrowLeft className="md:text-lg" />
          Previous
        </button>
        <div className="flex items-center gap-3">
          <p className="text-sm md:text-base px-2.5 py-0.5 rounded bg-[#F5F5F5] text-[#BFBFBF] ">
            1
          </p>
          <p className="text-sm md:text-base px-2.5 py-0.5 rounded bg-[#F5F5F5] text-[#BFBFBF] ">
            2
          </p>
          <p className="text-sm md:text-base px-2.5 py-0.5 rounded bg-[#F5F5F5] text-[#BFBFBF] ">
            3
          </p>
        </div>
        <button className="flex gap-1 items-center text-base text-[#BFBFBF]">
          Next
          <PiArrowRight className="md:text-lg" />
        </button>
      </div>
    </div>
  );
};

export default UsersTable;
