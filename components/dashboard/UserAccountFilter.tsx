import * as Menubar from "@radix-ui/react-menubar";
import { FiCheck } from "react-icons/fi";

const UserAccountFilter = ({
  filterValue,
  setFilterValue
}: {
  filterValue: string;
  setFilterValue: Function;
}) => {
  return (
    <Menubar.Root className="MenubarRoot">
      <Menubar.Menu>
        <Menubar.Trigger className="MenubarTrigger cursor-pointer rounded px-2.5 py-2 text-sm 2xl:text-base font-medium border capitalize">
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
              onClick={() => setFilterValue("drivers")}>
              <div>
                <FiCheck
                  className={`mr-2 ${
                    filterValue === "drivers" ? "visible" : "invisible"
                  }`}
                />
              </div>
              Drivers
            </Menubar.Item>
            <Menubar.Separator className="MenubarSeparator" />
            <Menubar.Item
              className="MenubarItem text-sm 2xl:text-base font-medium cursor-pointer"
              onClick={() => setFilterValue("commuters")}>
              <div>
                <FiCheck
                  className={`mr-2 ${
                    filterValue === "commuters" ? "visible" : "invisible"
                  }`}
                />
              </div>
              Commuters
            </Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  );
};

export default UserAccountFilter;
