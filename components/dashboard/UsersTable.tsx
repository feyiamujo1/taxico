import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
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
  return (
    <div>
      <div className="flex justify-between items-center">
        <p className="text-sm 2xl:text-base font-medium"></p>
        <button className=" rounded px-2.5 py-1.5 text-sm 2xl:text-base font-medium border">
          Filter
        </button>
      </div>
      <div className="w-full overflow-x-scroll">
        <table className="w-full table-auto">
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
          <thead className="!text-left font-normal border-b-[0.5px] ">
            <tr>
              <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg pr-4 md:pr-2">
                S/N
              </th>
              <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg pr-4 md:pr-2">
                Name
              </th>
              <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg pr-4 md:pr-2">
                Email Address
              </th>
              {type === "Driver" ? (
                <>
                  <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg pr-4 md:pr-2">
                    License Number
                  </th>
                  <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg pr-4 md:pr-2">
                    Verification Status
                  </th>
                  <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg pr-4 md:pr-2"></th>
                </>
              ) : (
                <>
                  <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg pr-4 md:pr-2">
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
                <td className="py-3 text-sm 2xl:text-base text-nowrap pr-4 md:pr-2">
                  {id + 1}
                </td>
                <td className="py-3 text-sm 2xl:text-base text-nowrap pr-4 md:pr-2">
                  {user.name}
                </td>
                <td className="py-3 text-sm 2xl:text-base text-nowrap pr-4 md:pr-2">
                  {user.email}
                </td>
                {type === "Driver" ? (
                  <>
                    <td className="py-3 text-sm 2xl:text-base text-nowrap pr-4 md:pr-2">
                      {user?.licenseNumber}
                    </td>
                    <td className="py-3 text-sm 2xl:text-base text-nowrap pr-4 md:pr-2">
                      {user?.status}
                    </td>
                    <td className="py-3 text-sm 2xl:text-base text-right text-nowrap">
                      <DriverPopup />
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-3 text-sm 2xl:text-base capitalize text-nowrap pr-4 md:pr-2">
                      {user?.userType}
                    </td>
                    <td className="py-3 text-sm 2xl:text-base text-nowrap">
                      {user?.lastAccess}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-7 pb-7">
        <button className="flex gap-1 items-center text-sm md:text-base text-[#BFBFBF]">
          <PiArrowLeft className="md:text-lg" />
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
