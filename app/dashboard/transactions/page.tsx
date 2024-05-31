import TransactionTable from "~/components/dashboard/TransactionTable";

const TransactionsPage = () => {
  const TransactionData = [
    {
      id: 0,
      date: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Funding",
      description: "From Paystack",
      status: "Completed"
    },
    {
      id: 1,
      date: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Transfer",
      description: "To Driver",
      status: "Completed"
    },
    {
      id: 2,
      date: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Funding",
      description: "From Paystack",
      status: "Completed"
    },
    {
      id: 3,
      date: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Transfer",
      description: "To Driver",
      status: "Completed"
    },
    {
      id: 4,
      date: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Transfer",
      description: "To Driver",
      status: "Completed"
    },
    {
      id: 5,
      date: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Funding",
      description: "From Paystack",
      status: "Completed"
    },
    {
      id: 6,
      date: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Funding",
      description: "From Paystack",
      status: "Completed"
    },
    {
      id: 7,
      date: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Transfer",
      description: "To Driver",
      status: "Completed"
    },
    {
      id: 8,
      date: "22 May 2024, 20:05:54",
      amount: "200",
      type: "Funding",
      description: "From Paystack",
      status: "Completed"
    }
  ];
  return (
    <>
      <TransactionTable data={TransactionData} />
    </>
  );
};

export default TransactionsPage;
