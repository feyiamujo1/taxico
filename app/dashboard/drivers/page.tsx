import UsersTable from "~/components/dashboard/UsersTable";

const DriversPage = () => {
  const driverInfo = [
    {
      name: "Chioma Okafor",
      email: "chiomaokafor@gmail.com",
      status: "Verified",
      licenseNumber: "HJ********DN"
    },
    {
      name: "Adebayo Adekunle",
      email: "adebayoadekunle@gmail.com",
      status: "Pending",
      licenseNumber: "HJ********DN"
    },
    {
      name: "Folake Adebisi",
      email: "folakeadebisi@gmail.com",
      status: "Pending",
      licenseNumber: "HJ********DN"
    },
    {
      name: "Ifeanyi Nwankwo",
      email: "ifeanyinwankwo@gmail.com",
      status: "Verified",
      licenseNumber: "HJ********DN"
    },
    {
      name: "Ngozi Chukwu",
      email: "ngozichukwu@gmail.com",
      status: "Pending",
      licenseNumber: "HJ********DN"
    },
    {
      name: "Yemi Alade",
      email: "yemialade@gmail.com",
      status: "Verified",
      licenseNumber: "HJ********DN"
    },
    {
      name: "Chinedu Uche",
      email: "chineduuche@gmail.com",
      status: "Pending",
      licenseNumber: "HJ********DN"
    },
    {
      name: "Aisha Bello",
      email: "aishabello@gmail.com",
      status: "Verified",
      licenseNumber: "HJ********DN"
    },
    {
      name: "Samuel Oluwaseun",
      email: "samueloluwaseun@gmail.com",
      status: "Pending",
      licenseNumber: "HJ********DN"
    },
    {
      name: "Bola Tinubu",
      email: "bolatinubu@gmail.com",
      status: "Verified",
      licenseNumber: "HJ********DN"
    }
  ];
  return (
    <>
      <UsersTable type={"Driver"} data={driverInfo} />
    </>
  );
};

export default DriversPage;
