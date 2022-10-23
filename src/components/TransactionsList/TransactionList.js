const TransactionList = ({ transactions }) => {
  console.log(transactions);
  let allTransactions;
  if (transactions) {
    allTransactions = transactions.map((transaction, index) => {
      console.log(transaction);
      return (
        <div key={index}>
          <h1>{transaction.deposit}</h1>
        </div>
      );
    });
  }
  return (
    <div>
      <h1>Results:</h1>
      {allTransactions}
    </div>
  );
};

export default TransactionList;
