import React, { use } from "react";

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
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-sm 2xl:text-base font-medium"></p>
        <button className=" rounded px-2.5 py-1.5 text-sm 2xl:text-base font-medium border">
          Filter
        </button>
      </div>
      <table className="w-full table-auto">
        <colgroup>
          <col style={{ width: "5%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "15%" }} />
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
              <td className="py-3 text-sm 2xl:text-base capitalize">{user?.userType}</td>
              <td className="py-3 text-sm 2xl:text-base">{user?.lastAccess}</td>
              <td className="py-3 text-sm 2xl:text-base">
                {user?.licenseNumber}
              </td>
              <td className="py-3 text-sm 2xl:text-base">{user?.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
