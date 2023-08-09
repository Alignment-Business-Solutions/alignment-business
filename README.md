Alignment Business Solutions

Description

Duration: 2 Week Sprint

Alignment Business Solutions currently has a problem where data exported from Quickbooks as .csv files must be manually entered into an Excel spreadsheet.  This app allows the user to import .csv file information into the app, and save it to the database without needing any manual inputs.

Another problem ABS currently experiences is their clients not having up to the moment information available.  This app allows the clients to log in to their own accounts and view an overview of their account information including a weekly profit and loss breakdown, recent P&L data, and a cash flow chart.

To see the fully functional site, please visit: DEPLOYED VERSION OF APP

Prerequisites

Node.js
PostgreSQL
Postico

Installation

- Clone repo down to your machine
- Create new database named "abs"
- The queries in the tables.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on Postgres, so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries,
- Open up your editor of choice and run an `npm install`
- Create .env file containing: "SERVER_SESSION_SECRET=superdupersecret"
This key is used to manage server sessions for the application.  You can use a site such as this password generator for generating a random secret value. If you don't do this step, create a secret with less than eight characters, you will get a warning. 
- Run `npm run server` in your terminal
- Run `npm run client` in your terminal
- The `npm run client` command will open up a new browser tab for you!
- 


Usage

Accountant - The account logs in and is taken to the My Clients page where the accountant will see all clients currently assigned to them.  On this view the accountant is able to add new clients to the firm, assign/unassign clients to their account, and select a client to view the financial data for that client.  

The Overview view contains recently entered balance sheet and profit and loss data as well as a cash flow chart tracking end week cash balance for that client.  The accountant can use the dropdown menu to go to the single week profit and loss view for the week selected, or use the nav bar to navigate to the All Weeks P&L, the Balance Sheet, Clients list, and Cash Flow chart.  The accountant is also able to create new Profit and Loss weeks with the Create new Week button.

The All Week P&L view contains all P&L weeks containing data.  The accountant can quickly identify any improperly entered information that needs editing by scrolling through each week.  The accountant can also export each week as a .csv file with the Export Week button, or export all weeks at once using the Export All Weeks.  If the accountant spots any errors they can click the Edit this Week button to go to a detailed view of the week's transactions that can be edited.

The Single Week P&L view contains profit and loss data for the week selected on either the All Weeks P&L or the Overview.  Transaction data can be edited or deleted with the corresponding Icons, which is automatically updated when action is taken.  Accountant can add data to week by importing .csv files into the app, and adding each transaction with the add button, which automatcially adds a new transaction line to the profit and loss table.  Data is still able to be manually entered with the Create New Line button which brings up a modal with input fields for the new line.

The Balance Sheet view contains all balance sheet data for the selected client displayed in a table, broken down by week.  The accountant is able to edit or delete lines with the edit or delete buttons on each line, or add new lines with the Add Balance button.  Totals are automatically calculated when request is sent to database.

The Cash Flow view contains a cash flow chart tracking the end week cash balance for each week.  The accountant is able to simply view the cash flow chart on this page.

Built With
JavaScript, React, Redux, Express, Axios, Dotenv, Passport, Papaparse, MUI, MUI React Table

Acknowledgement
Thanks to Prime Digital Academy who equipped and helped me to make this application a reality and Latoya Bass for giving us the opportunity to work on this project.

Support
If you have suggestions or issues, please email me at oberle.adam@gmail.com