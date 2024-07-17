"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";
import { getSavedState } from "~/lib/localStorage";
import { TransactionsType } from "~/lib/types/DashboardTypes";
import { format } from "date-fns";

const TransactionTable = ({ data }: { data: TransactionsType[] | null }) => {
  const pathname = usePathname();
  const userInfo = getSavedState("taxicoUser");
  const role = userInfo?.user_metadata?.role || "";
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        {pathname === "/dashboard" && (
          <>
            <p className="text-base md:text-lg font-medium pt-6 md:pt-8 md:pb-4">
              Recent Transactions
            </p>
            <Link
              href={"/dashboard/transactions"}
              className="text-sm text-custom-blue hover:text-grey-2">
              See All
            </Link>
          </>
        )}
      </div>
      <div className="w-full overflow-x-scroll">
       <table className="w-full table-auto "> 
          <colgroup>
            <col style={{ width: "5%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            {/* <col style={{ width: "25%" }} /> */}
            <col style={{ width: "15%" }} />
          </colgroup>
          <thead className="!text-left font-normal border-b-[0.5px]">
            <tr>
              <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg pr-4 md:pr-2">
                S/N
              </th>
              <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg pr-4 md:pr-2">
                Date
              </th>
              <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg pr-4 md:pr-2">
                Amount
              </th>
              <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg pr-4 md:pr-2">
                Type
              </th>
              {/* <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg pr-4 md:pr-2">
                Description
              </th> */}
              <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((transaction, id) => (
              <tr key={id}>
                <td className="py-3 text-sm 2xl:text-base pr-4 md:pr-2">
                  {id + 1}
                </td>
                <td className="py-3 text-sm 2xl:text-base text-nowrap pr-4 md:pr-2">
                  {format(
                    new Date(transaction?.created_at),
                    "do MMMM yyyy, HH:mm a"
                  )}
                  {/* {transaction?.created_at} */}
                </td>
                <td className="py-3 text-sm 2xl:text-base text-nowrap pr-4 md:pr-2">
                  {transaction?.amount}
                </td>
                <td className="py-3 text-sm 2xl:text-base capitalize text-nowrap pr-4 md:pr-2">
                  {transaction?.type}
                </td>
                {/* <td className="py-3 text-sm 2xl:text-base text-nowrap pr-4 md:pr-2">
                  {role === "admin"
                    ? transaction?.sender_first_name +
                      " " +
                      transaction?.sender_last_name +
                      " to " +
                      transaction?.receiver_first_name +
                      " " +
                      transaction?.receiver_last_name
                    : role === "driver"
                    ? transaction?.sender_first_name +
                        " " +
                        transaction?.sender_last_name || "Paystack"
                    : role === "driver"
                    ? transaction?.receiver_first_name +
                        " " +
                        transaction?.receiver_first_name || "Paystack"
                    : "Paystack"}
                </td> */}
                <td
                  className={`py-3 text-sm 2xl:text-base text-center text-nowrap`}>
                  <p
                    className={` p-1 rounded-3xl text-white w-[100px] ${
                      transaction?.status === "Completed" || !transaction.status
                        ? "bg-[#37AF35]"
                        : "bg-[#EF2929]"
                    }`}>
                    {"Completed"}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pathname !== "/dashboard" && (
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
      )}
    </div>
  );
};

export default TransactionTable;
