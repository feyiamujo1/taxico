import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
// import ShortInformationContainer from "~/components/dashboard/ShortInformationContainer";

const CommutersHomePage = () => {
  return (
    <div className="w-11/12 mx-auto py-5 md:py-7 ">
      {/* 
      Insert on automation
      <ShortInformationContainer type={"tickets"}/> 
      */}
      <div className="w-full py-2.5 border-b-[0.5px] border-[#DFDFDF]">
        <p className="text-sm font-medium">Available Tickets</p>
        <p className="font-semibold text-xl mt-1">1</p>
      </div>
      <div className="flex justify-between gap-3 ">
        <div className="w-1/2 py-2.5 border-b-[0.5px] border-[#DFDFDF]">
          <p className="text-sm font-medium flex gap-1.5">
            <GoArrowDownLeft className="text-[#37AF35] text-lg" /> Used Tickets
          </p>
          <p className="font-semibold text-xl mt-1">1</p>
        </div>
        <div className="w-1/2 py-2.5 border-b-[0.5px] border-[#DFDFDF]">
          <p className="text-sm font-medium flex gap-1.5">
            <GoArrowUpRight className="text-[#EF2929] text-lg" /> Unused Tickets
          </p>
          <p className="font-semibold text-xl mt-1">1</p>
        </div>
      </div>
      <div className="mt-10">
        <p className=" font-semibold text-xl ">More Information</p>
        <table className="w-full table-auto">
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <thead className="!text-left font-normal border-b-[0.5px]">
            <tr>
              <th className="py-4 font-medium text-lg">S/N</th>
              <th className="py-4 font-medium text-lg">Date</th>
              <th className="py-4 font-medium text-lg">Payment Ref</th>
              <th className="py-4 font-medium text-lg">Cost</th>
              <th className="py-4 font-medium text-lg">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3">1</td>
              <td className="py-3">29th May, 2024</td>
              <td className="py-3">PASHA32WQ12Q</td>
              <td className="py-3">200</td>
              <td className="py-3">Used</td>
            </tr>
            <tr>
              <td className="py-3">2</td>
              <td className="py-3">30th May, 2024</td>
              <td className="py-3">PASHA32WQ12Q</td>
              <td className="py-3">200</td>
              <td className="py-3">Used</td>
            </tr>
            <tr>
              <td className="py-3">3</td>
              <td className="py-3">31th May, 2024</td>
              <td className="py-3">PASHA32WQ12Q</td>
              <td className="py-3">200</td>
              <td className="py-3">Used</td>
            </tr>
            <tr>
              <td className="py-3">4</td>
              <td className="py-3">30th May, 2024</td>
              <td className="py-3">PASHA32WQ12Q</td>
              <td className="py-3">200</td>
              <td className="py-3">Used</td>
            </tr>
            <tr>
              <td className="py-3">5</td>
              <td className="py-3">31th May, 2024</td>
              <td className="py-3">PASHA32WQ12Q</td>
              <td className="py-3">200</td>
              <td className="py-3">Used</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommutersHomePage;
