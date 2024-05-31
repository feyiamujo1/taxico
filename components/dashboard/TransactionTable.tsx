"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { PiArrowLeft, PiArrowRight } from "react-icons/pi";

const TransactionTable = ({
  data
}: {
  data: {
    id: number;
    date: string;
    amount: string;
    type: string;
    description: string;
    status: string;
  }[];
}) => {
  const pathname = usePathname();
  return (
    <div>
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
      <table className="w-full table-auto">
        <colgroup>
          <col style={{ width: "5%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "15%" }} />
          <col style={{ width: "25%" }} />
          <col style={{ width: "15%" }} />
        </colgroup>
        <thead className="!text-left font-normal border-b-[0.5px]">
          <tr>
            <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg">
              S/N
            </th>
            <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg">
              Date
            </th>
            <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg">
              Amount
            </th>
            <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg">
              Type
            </th>
            <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg">
              Description
            </th>
            <th className="py-4 font-medium text-sm md:text-base 2xl:text-lg">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction, id) => (
            <tr key={id}>
              <td className="py-3 text-sm 2xl:text-base">
                {transaction.id + 1}
              </td>
              <td className="py-3 text-sm 2xl:text-base">{transaction.date}</td>
              <td className="py-3 text-sm 2xl:text-base">
                {transaction.amount}
              </td>
              <td className="py-3 text-sm 2xl:text-base capitalize">
                {transaction.type}
              </td>
              <td className="py-3 text-sm 2xl:text-base">
                {transaction.description}
              </td>
              <td className={`py-3 text-sm 2xl:text-base text-center`}>
                <p
                  className={` p-1 rounded-3xl text-white w-[95px] ${
                    transaction.status === "Completed"
                      ? "bg-[#37AF35]"
                      : "bg-[#EF2929]"
                  }`}>
                  {transaction.status}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {pathname !== "/dashboard" && (
        <div className="flex justify-between items-center mt-7">
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
      )}
    </div>
  );
};

export default TransactionTable;
