# BankJS

BankJS is a simulated experience that allows a user create an account, complete transactions, create budgets, and edit and delete these as well. It is a fully responsive application created with React, ChartJS, a little bit of MUI for styling of a modal, and Firebase to handle all the data of the application.

## Transactions

To make a transaction, the user can browse to the transaction page after creating an account or logging in. Here they can fill out a form for either a payment or deposit. For payments they can select from a list of predefined categories, leave a comment for the payment, select an amount, and date. For deposits, the user can select an amount and make the deposit.

After making a transaction, the transaction data is then stored in Firebase, we get this data and display it on the right side of the screen where the user can also sort and search through the transactions. They can sort the transactions by latest, oldests, highest, and lowests. Users can also filter these transactions, for example only show deposits or only show payments. By user the search bar, the user can search a term that is then matched against payment categories and comments the user selected or left.

A user can click on any transaction to open up a modal that displays the information about the transcation and also allows the user to delete the selected transaction.

## Budgets

A user can go to the budget screen to create or find a list of their created budgets. They can click on the create budget button to be brought to a form where they can begin. The user is required to give the budget a name and can choose the budget length. They can then fill out the budget form which allows the user to enter an amount for the same set of categories that they can select for payments. By leaving category at 0, it will not display on the generated budget. After filling out a budget to their liking, the user can select create budget and few a graph of their budget.

After creating the budget, the user is brought to the budget details screen. Here they see a graph that displays their budgets and also can find buttons to edit or delete their budget. The user can select edit budget to be brought again to form where they can edit their budget information, such as name, changing category amounts, and updating the length of the budget.

Again, all of this functionaliy utilizes Firebase to store, update, retrieve, and delete budget data.

## User Profile

A user can go to their profile page to few some of their account details, such as their name, email, and when they created their account. They can also see how many transactions they have made, how many budgets they have created, their funds, and their total earning and spendings.

From this page they can edit their account details, updating their first name, last name, or email. They can also choose to delete their account from this page.

## Other neat stuff

Throughout the application, user feedback is provided on errors, such as missing required fields, or confirming if they wish to delete a transcation, budget, or their profile.

The application also keeps track and constantly displays the users funds on the navigation bar, so they always can see if they are currently in the negative or positive.

Users can also look at the home page to see the current days plus or minus, to see if they gained or lost money overall for that specific day. If they make a payment for a future date to plan ahead, then on that day it will count towards this plus or minus.
