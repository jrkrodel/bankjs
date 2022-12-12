# BankJS

## [Firebase Live Link](https://bankjs.web.app)

[Adobe XD Design](https://xd.adobe.com/view/28155087-f6ec-4c2d-908d-3c60ec2a964c-7d46/)

BankJS is a simulated experience that allows a user to create an account, complete transactions, create budgets, and edit and delete these. It is a fully responsive application created with React, ChartJS (react-chartjs-2), a little bit of MUI for the styling of a modal, and Firebase to handle all the data.

## Transactions

To make a transaction, the user can browse the transaction page after creating an account or logging in. Here they can fill out a form for either payment or deposit. For payments, a user can select from a list of predefined categories, leave a comment, select an amount, and pick a date. For deposits, the user can enter an amount and make the deposit.

After making a transaction, the transaction data is stored in Firebase. We get this data and display it within a list and search box where the user can also sort and search through the transactions. They can sort the transactions by latest, oldest, highest, and lowest. Users can also filter these transactions, for example, only show deposits. Using the search bar, the user can search a term that is then matched against payment categories and comments the user selected or left.

A user can click on any transaction to open up a modal that displays the information about the transaction and also allows the user to delete the selected transaction.

## Budgets

A user can go to the budget screen to create or find a list of their created budgets. They can click on the create budget button to be brought to a form where they can begin. The user is required to give the budget a name and can choose the budget length. They can then fill out the budget form, entering an amount for the same set of categories that they can select for payments. By leaving a category at 0, it will not display on the generated budget. After filling out a budget to their liking, the user can click the create budget button.

The chosen length of the budget will control which payments show up next to the budgeted spending. So, if the budget length is two weeks, then only payments from the last two weeks will show next to the budgeted spending amounts.

After creating the budget, the user is brought to the budget details screen. Here they see a graph that displays their budgets and can find buttons to edit or delete it. The user can select edit budget to be brought again to form where they can edit their budget information, such as name, changing category amounts, and updating the length of the budget.

Again, all of this functionality utilizes Firebase to store, update, retrieve, and delete budget data.

## User Profile

A user can go to their profile page to few some of their account details, such as their name, email, and when they created their account. They can also see how many transactions they have made, how many budgets they have created, their funds, and their total earnings and spendings.

From this page, they can edit their account details, updating their first name, last name, or email. They can also choose to delete their account from this page.

## Other neat stuff

Throughout the application, user feedback is provided on errors, such as missing required fields or confirming if they wish to delete a transaction, budget, or profile.

The application also keeps track and constantly displays the user's funds on the navigation bar, so they can see if they are currently in the negative or positive.

Users can also look at the home page to see the current days plus or minus, to see if they gained or lost money overall for that specific day. If they make a payment for a future date to plan, then on that day, it will count towards this plus or minus.
