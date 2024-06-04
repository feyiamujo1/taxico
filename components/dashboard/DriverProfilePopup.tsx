import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { HiOutlineX } from "react-icons/hi";

const DriverProfilePopup = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-[#37AF35] hover:bg-[#9ce39b] py-1 px-2.5 rounded-3xl text-white">
          View
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay bg-[rgba(0,0,0,0.3)] backdrop-blur-sm " />
        <Dialog.Content className="DialogContent h-[85vh] md:h-[750px] 2xl:h-[800px]">
          <div className="flex justify-center items-center">
            <div className="bg-white px-3 py-4 md:px-6 md:py-8 space-y-4 md:space-y-6">
              <Dialog.Close asChild>
                <button
                  className="text-2xl hover:text-red-500 duration-300 "
                  aria-label="Close">
                  <HiOutlineX />
                </button>
              </Dialog.Close>
              <div className="">
                <Image
                  src={"/images/ajibs.png"}
                  alt="driver"
                  width={376}
                  height={376}
                  className="w-full h-fit rounded-md overflow-hidden object-cover object-center"
                />
              </div>
              <h2 className="text-lg md:text-xl ">Ajibade Samuel</h2>
              <div className=" space-y-3.5">
                <p className="text-sm flex justify-between items-center ">
                  <span className="text-[#444444]">Email</span>
                  <span className="font-medium">Saka@gmail.com</span>
                </p>
                <p className="text-sm flex justify-between items-center ">
                  <span className="text-[#444444]">License Number</span>
                  <span className="font-medium">HJD232HJDN</span>
                </p>
                <p className="text-sm flex justify-between items-center ">
                  <span className="text-[#444444]">ID Type</span>
                  <span className="font-medium">Driver’s License</span>
                </p>
                <p className="text-sm flex justify-between items-center ">
                  <span className="text-[#444444]">Registration Number</span>
                  <span className="font-medium">KSF-242-ZS</span>
                </p>
                <p className="text-sm flex justify-between items-center ">
                  <span className="text-[#444444]">Car Make</span>
                  <span className="font-medium">Toyota Corolla</span>
                </p>
                <p className="text-sm flex justify-between items-center ">
                  <span className="text-[#444444]">Date Registered</span>
                  <span className="font-medium">24/05/2024</span>
                </p>
                <p className="text-sm flex justify-between items-center ">
                  <span className="text-[#444444]">Trips Completed</span>
                  <span className="font-medium">230</span>
                </p>
              </div>
              <div className="w-full flex flex-col items-center">
                <button className="w-full py-3 px-6 rounded-3xl text-sm 2xl:text-base bg-custom-blue text-white ">
                  Approve Account
                </button>
                <button className="w-fit mx-auto text-center mt-3 text-sm 2xl:text-base text-[#666666] hover:text-custom-blue">
                  Suspend Account
                </button>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DriverProfilePopup;
