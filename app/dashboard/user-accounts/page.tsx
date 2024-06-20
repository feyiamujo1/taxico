import UsersTable from "~/components/dashboard/UsersTable";

const UserAccountsPage = () => {
  const userInfo = [
    {
      name: "Chioma Okafor",
      email: "chiomaokafor@gmail.com",
      userType: "driver",
      lastAccess: "05/05/2024"
    },
    {
      name: "Adebayo Adekunle",
      email: "adebayoadekunle@gmail.com",
      userType: "commuter",
      lastAccess: "12/05/2024"
    },
    {
      name: "Folake Adebisi",
      email: "folakeadebisi@gmail.com",
      userType: "commuter",
      lastAccess: "19/05/2024"
    },
    {
      name: "Ifeanyi Nwankwo",
      email: "ifeanyinwankwo@gmail.com",
      userType: "driver",
      lastAccess: "23/05/2024"
    },
    {
      name: "Ngozi Chukwu",
      email: "ngozichukwu@gmail.com",
      userType: "commuter",
      lastAccess: "15/05/2024"
    },
    {
      name: "Yemi Alade",
      email: "yemialade@gmail.com",
      userType: "driver",
      lastAccess: "08/05/2024"
    },
    {
      name: "Chinedu Uche",
      email: "chineduuche@gmail.com",
      userType: "commuter",
      lastAccess: "26/05/2024"
    },
    {
      name: "Aisha Bello",
      email: "aishabello@gmail.com",
      userType: "driver",
      lastAccess: "21/05/2024"
    },
    {
      name: "Samuel Oluwaseun",
      email: "samueloluwaseun@gmail.com",
      userType: "commuter",
      lastAccess: "14/05/2024"
    },
    {
      name: "Bola Tinubu",
      email: "bolatinubu@gmail.com",
      userType: "driver",
      lastAccess: "10/05/2024"
    }
  ];
  return (
    <div>
      <UsersTable type={"Users"} data={userInfo} />;
    </div>
  );
};

export default UserAccountsPage;
