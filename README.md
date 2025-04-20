Steps for Run Project:

Install Node:
  1. Downlad link: https://nodejs.org/en. install the setup.
  2. Check node verion: node -v.

Steps for project setup:
  1. Go to directory folder.
  2. Clone project from git using: git clone https://github.com/manish93solanki/TransactionBanking.git.

Install Angular:
  1. Go to directory folder TransactionBanking.
  2. Command for install angular: npm install @angular/cli@15.
  3. Then install the npm using npm install.

Install PostgreDB:
  1. Download the postgreDB from this: https://www.enterprisedb.com/downloads/postgres-postgresql-downloads for windows or mac (verison 17.4) and 
  uncheck the stackbuilder and then install and finish.
  2. Click on intall and then set the password and then port and locale selected by default.
  3. Start the installation.
  4. Open PgAdmin and enter password and create database "Transactions" by right click on the Database.
  5. Open Schemas then Tables and create table and select the Tablespace pg_default.

SQL Shell:
  1. Open SQL Shell 
  2. Server [localhost]: <Press Enter>
  3. Database [postgres]: Transactions
  4. Port [5432]:<Press Enter>
  5. Username [postgres]:<Press Enter>
  6. Password for user postgres:<Press Enter>

  Query for create tables:
     first create table accounts using below Query:


      CREATE TABLE accounts (
        account_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        account_number VARCHAR(20) NOT NULL UNIQUE,
        account_name VARCHAR(100) NOT NULL,
        account_type VARCHAR(20) NOT NULL CHECK (
            account_type IN ('savings', 'current', 'business', 'fixed_deposit')
        ),
        balance DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
        currency VARCHAR(3) NOT NULL DEFAULT 'INR',
        status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (
            status IN ('active', 'closed', 'suspended')
        ),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()  
      );
      
      CREATE TABLE transactions (
      transaction_id SERIAL PRIMARY KEY,
      account_id INT NOT NULL,
      transaction_type VARCHAR(50) NOT NULL CHECK (
          transaction_type IN ('deposit', 'withdrawal', 'transfer', 'payment')
      ),
      amount DECIMAL(12, 2) NOT NULL CHECK (amount > 0),
      currency VARCHAR(3) NOT NULL DEFAULT 'INR',
      transaction_date TIMESTAMP NOT NULL DEFAULT NOW(),
      description TEXT,
      status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (
          status IN ('pending', 'completed', 'failed')
      ),
      reference_number VARCHAR(100) UNIQUE,
      balance_after DECIMAL(12, 2),
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),

      -- Foreign key to the accounts table
      CONSTRAINT fk_account FOREIGN KEY (account_id)
          REFERENCES accounts(account_id) ON DELETE CASCADE
  );

  insert query for acounts table:

   INSERT INTO accounts (
    account_id,
    user_id,
    account_number,
    account_name,
    account_type,
    balance,
    currency,
    status
) VALUES
(101, 201, 'ACC2000001', 'Arjun Mehta', 'savings', 75000.00, 'INR', 'active'),
(102, 202, 'ACC2000002', 'Neha Verma', 'current', 135000.00, 'INR', 'active'),
(103, 203, 'ACC2000003', 'Quantum Solutions Pvt Ltd', 'business', 580000.00, 'INR', 'active'),
(104, 204, 'ACC2000004', 'Suresh Patil', 'fixed_deposit', 250000.00, 'INR', 'active'),
(105, 205, 'ACC2000005', 'Kiran Joshi', 'savings', 62000.00, 'INR', 'active');

insert query for transaction table:

INSERT INTO transactions (
    transaction_id,
    account_id,
    transaction_type,
    amount,
    currency,
    transaction_date,
    description,
    status,
    reference_number,
    balance_after
) VALUES 
-- Account 101
(1, 101, 'deposit', 20000.00, 'INR', '2025-04-10 09:00:00', 'April salary credit', 'completed', 'TXN100001', 95000.00),
(2, 101, 'withdrawal', 2000.00, 'INR', '2025-04-11 10:30:00', 'ATM withdrawal - Mumbai', 'completed', 'TXN100002', 93000.00),
(3, 101, 'payment', 1500.00, 'INR', '2025-04-16 13:30:00', 'Mobile recharge', 'completed', 'TXN100011', 91500.00),
(4, 101, 'deposit', 5000.00, 'INR', '2025-04-17 10:00:00', 'Cash deposit', 'completed', 'TXN100012', 96500.00),

-- Account 102
(5, 102, 'payment', 1200.00, 'INR', '2025-04-12 15:15:00', 'Electricity bill', 'completed', 'TXN100003', 133800.00),
(6, 102, 'transfer', 8000.00, 'INR', '2025-04-13 11:45:00', 'Transfer to savings account', 'completed', 'TXN100004', 125800.00),
(7, 102, 'withdrawal', 3000.00, 'INR', '2025-04-16 09:45:00', 'ATM withdrawal - Delhi', 'completed', 'TXN100013', 122800.00),
(8, 102, 'payment', 2200.00, 'INR', '2025-04-18 12:00:00', 'DTH subscription', 'completed', 'TXN100014', 120600.00),

-- Account 103
(9, 103, 'deposit', 150000.00, 'INR', '2025-04-09 13:20:00', 'Client payment: Project X', 'completed', 'TXN100005', 730000.00),
(10, 103, 'payment', 20000.00, 'INR', '2025-04-14 17:00:00', 'Vendor payment: Hosting fees', 'completed', 'TXN100006', 710000.00),
(11, 103, 'transfer', 25000.00, 'INR', '2025-04-16 14:10:00', 'Transfer to joint account', 'completed', 'TXN100015', 685000.00),
(12, 103, 'deposit', 30000.00, 'INR', '2025-04-18 16:45:00', 'Refund received', 'completed', 'TXN100016', 715000.00),

-- Account 104
(13, 104, 'withdrawal', 2500.00, 'INR', '2025-04-10 08:45:00', 'ATM withdrawal - Bangalore', 'completed', 'TXN100007', 247500.00),
(14, 104, 'deposit', 10000.00, 'INR', '2025-04-13 18:30:00', 'Gift received', 'completed', 'TXN100008', 257500.00),
(15, 104, 'payment', 6000.00, 'INR', '2025-04-16 11:20:00', 'Online shopping', 'completed', 'TXN100017', 251500.00),
(16, 104, 'withdrawal', 5000.00, 'INR', '2025-04-19 17:50:00', 'ATM withdrawal - Pune', 'completed', 'TXN100018', 246500.00),

-- Account 105
(17, 105, 'deposit', 75000.00, 'INR', '2025-04-08 09:00:00', 'FD maturity', 'completed', 'TXN100009', 137000.00),
(18, 105, 'transfer', 50000.00, 'INR', '2025-04-15 14:45:00', 'Transfer to current account', 'pending', 'TXN100010', 87000.00),
(19, 105, 'payment', 3500.00, 'INR', '2025-04-16 08:15:00', 'Credit card bill', 'completed', 'TXN100019', 83500.00),
(20, 105, 'deposit', 10000.00, 'INR', '2025-04-18 10:00:00', 'Cashback reward', 'completed', 'TXN100020', 93500.00);


Run Project:
 1. Angular: Go to TransactionBanking folder and then run the command <ng serve>.
 2. Node: Go to  TransactionBanking folder and install nodemon for nodeJS server using: npm install --save-dev nodemon then run command "npx nodemon src/app/server.js".  
 3. Run project localhost:4200. 



