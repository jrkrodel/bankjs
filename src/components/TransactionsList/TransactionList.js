import styles from "./TransactionList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";
import { deleteTransaction } from "../../firebase/utils/firebaseUtils";
import {
  faVideo,
  faBurger,
  faHeartPulse,
  faBook,
  faCar,
  faLightbulb,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const TransactionList = ({ transactions, getAllTransactions }) => {
  let allTransactions;

  const [open, setOpen] = useState(false);
  const [transactionInfo, setTransactionInfo] = useState({
    comment: "",
    date: "",
    category: "",
    amount: "",
    type: "",
  });

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleDelete = (id, amount, type) => {
    deleteTransaction(id, amount, type);
    handleClose();
    getAllTransactions();
  };

  const handleOpen = (comment, date, category, amount, type, id) => {
    if (type === "payment") {
      setTransactionInfo({
        comment: comment,
        date: date,
        category: category,
        amount: amount,
        type: type,
        id: id,
      });
    } else {
      setTransactionInfo({
        comment: "",
        date: date,
        category: "",
        amount: amount,
        type: type,
        id: id,
      });
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteConfirm(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    minWidth: "18rem",
    bgcolor: "#162636;",
    color: "white",
    boxShadow: 24,
    outline: "none",
    p: 4,
  };

  if (transactions) {
    allTransactions = transactions.map((transaction, index) => {
      if (transaction.type === "deposit") {
        return (
          <div
            className={
              index % 2 === 0 ? styles.transaction : styles.transactionEven
            }
            onClick={() =>
              handleOpen(
                transaction.for,
                transaction.date,
                transaction.category,
                transaction.amount,
                transaction.type,
                transaction.id
              )
            }
            key={index}
          >
            <div className={styles.leftSide}>
              <h1>{transaction.date}</h1>
            </div>
            <div className={styles.rightSide}>
              <h1>${transaction.amount}</h1>
              <h1 className={styles.deposit}>
                {transaction.type.toUpperCase()}
              </h1>
            </div>
          </div>
        );
      } else {
        let icon;
        if (transaction.category === "entertainment") {
          icon = faVideo;
        } else if (transaction.category === "food") {
          icon = faBurger;
        } else if (transaction.category === "health") {
          icon = faHeartPulse;
        } else if (transaction.category === "education") {
          icon = faBook;
        } else if (transaction.category === "transportation") {
          icon = faCar;
        } else if (transaction.category === "utilities") {
          icon = faLightbulb;
        } else if (transaction.category === "housing") {
          icon = faHouse;
        } else if (transaction.category === "personal") {
          icon = faUser;
        }
        return (
          <div
            className={
              index % 2 === 0 ? styles.transaction : styles.transactionEven
            }
            key={index}
            onClick={() =>
              handleOpen(
                transaction.for,
                transaction.date,
                transaction.category,
                transaction.amount,
                transaction.type,
                transaction.id
              )
            }
          >
            <div className={styles.leftSide}>
              <h1>{transaction.date}</h1>

              <h1>
                <FontAwesomeIcon className={styles.icon} icon={icon} />
                {transaction.category.charAt(0).toUpperCase() +
                  transaction.category.slice(1)}
              </h1>
            </div>
            <div className={styles.rightSide}>
              <h1>${transaction.amount}</h1>
              <h1 className={styles.payment}>
                {transaction.type.toUpperCase()}
              </h1>
            </div>
          </div>
        );
      }
    });
  }
  return (
    <div className={styles.transactionsContainer}>
      {allTransactions}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className={styles.cap}>
            {transactionInfo.type}
            <br></br>
            {transactionInfo.date}
          </h2>
          {transactionInfo.category !== "" ? (
            <p className={styles.cap}>
              Category: {transactionInfo.category} <hr></hr>
            </p>
          ) : (
            ""
          )}
          {transactionInfo.comment !== "" ? (
            <p>
              Comment: {transactionInfo.comment}
              <hr></hr>
            </p>
          ) : (
            ""
          )}
          <p>Amount: ${transactionInfo.amount}</p>
          <button
            onClick={() => {
              deleteConfirm === true
                ? handleDelete(
                    transactionInfo.id,
                    transactionInfo.amount,
                    transactionInfo.type
                  )
                : setDeleteConfirm(true);
            }}
            className={styles.deleteTransactionButton}
          >
            {deleteConfirm === false ? (
              "Delete Transaction"
            ) : (
              <>
                Are you sure?<br></br>
                <span>Click to confirm</span>
              </>
            )}
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default TransactionList;
