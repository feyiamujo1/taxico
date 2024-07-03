import * as Menubar from "@radix-ui/react-menubar";
import { FiCheck } from "react-icons/fi";

const DriverAccountFilter = ({
  filterValue,
  setFilterValue
}: {
  filterValue: string;
  setFilterValue: Function;
}) => {
  return (
    <Menubar.Root className="MenubarRoot">
      <Menubar.Menu>
        <Menubar.Trigger className="MenubarTrigger cursor-pointer rounded px-2.5 py-1.5 text-sm 2xl:text-base font-medium border capitalize">
          Filter: {filterValue}
        </Menubar.Trigger>
        <Menubar.Portal>
          {/* Filter items */}
          <Menubar.Content
            className="MenubarContent py-4"
            align="start"
            sideOffset={5}
            alignOffset={-14}>
            <Menubar.Item
              className="MenubarItem text-sm 2xl:text-base font-medium cursor-pointer"
              onClick={() => setFilterValue("all")}>
              <div>
                <FiCheck
                  className={`mr-2 ${
                    filterValue === "all" ? "visible" : "invisible"
                  }`}
                />
              </div>
              All
            </Menubar.Item>
            <Menubar.Separator className="MenubarSeparator" />
            <Menubar.Item
              className="MenubarItem text-sm 2xl:text-base font-medium cursor-pointer"
              onClick={() => setFilterValue("verified")}>
              <div>
                <FiCheck
                  className={`mr-2 ${
                    filterValue === "verified" ? "visible" : "invisible"
                  }`}
                />
              </div>
              Verified
            </Menubar.Item>
            <Menubar.Separator className="MenubarSeparator" />
            <Menubar.Item
              className="MenubarItem text-sm 2xl:text-base font-medium cursor-pointer"
              onClick={() => setFilterValue("unverified")}>
              <div>
                <FiCheck
                  className={`mr-2 ${
                    filterValue === "unverified" ? "visible" : "invisible"
                  }`}
                />
              </div>
              Unverified
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  );
};

export default DriverAccountFilter;
