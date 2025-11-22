# Blockchain Transaction Simulator

A **Node.js-based blockchain simulation** that processes deposits, withdrawals, and fee transactions while maintaining ledger integrity. This interactive CLI application models how blocks are created, validated, and appended to a blockchain—using simple financial operations as transaction data.

---

## Overview

This project simulates a **minimal blockchain system** where each block contains a batch of processed or blocked transactions. It demonstrates:

- How transactions are validated  
- How balances change over time  
- How blocks are added to a chain  
- How the chain can be verified for tampering  
- How user input can dynamically drive block creation

It's designed as an educational tool to visualize blockchain concepts with real-time feedback.

---

##  Features

- **Interactive CLI** using `prompts`  
- **Deposit (D), Withdraw (W), and Fee (F)** transaction support  
- **Automatic validation** of:
  - Transaction types  
  - Number and type of inputs  
  - Preventing negative balances  
  - Minimum balance constraints  
- **Block creation** after each batch of transactions  
- **Chain integrity check** using hashing  
- **View full blockchain at any time**  
- **Detailed summaries**:
  - Per-block statistics
  - Final run totals

---

## Project Structure

```
.
├── src/
│   ├── Block.js        # Block class (hashing, linking, structure)
│   └── Blockchain.js   # Chain handler (add blocks, validate chain)
├── index.js            # CLI simulation logic
└── package.json        # Dependencies and scripts
```

---

## How It Works

1. **User provides:**
   - Initial balance  
   - Minimum allowed balance  

2. **For each block**, the user selects how many transactions to process.  

3. **Each transaction is validated:**
   - **Deposits (D)** always succeed  
   - **Withdrawals (W)** and **Fees (F)** require sufficient balance  

4. **Successful and failed transactions are recorded with:**
   - Status (Successful/Failed)
   - Amount  
   - Balance after processing  
   - Reason for outcome

5. **After the batch**, a new block is added to the blockchain.  

6. The user can **continue or view** the entire chain before exiting.  

7. The program concludes with a **full summary and chain validity check**.

---

## Tech Stack

- **Node.js** (ES Modules)  
- **crypto** (built-in hashing for block integrity)  
- **prompts** for interactive CLI UX  

---

## Running the Project

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation & Execution

```bash
# Clone the repository
git clone https://github.com/danmachooo/blockchain-simulation
cd blockchain-simulation

# Install dependencies
npm install

# Run the simulator
npm run dev
```

---

## Usage Example

```
Enter balance and min balance (>= 0): 1000 100
Enter number of transactions (or 0 to exit): 3
Current balance: 1000

Enter transaction (Type Amount: D/W/F): D 500
Enter transaction (Type Amount: D/W/F): W 300
Enter transaction (Type Amount: D/W/F): F 50

--- Block #1 Summary ---
Current Balance: 1150
Processed in this block: 3
Blocked in this block: 0

Enter number of transactions (or 0 to exit): 0
```

---

## Sample Output

The program provides:

- **Real-time balance updates** after each transaction
- **Block summaries** showing processed/blocked counts
- **Full JSON blockchain** with all transaction details
- **Validity verification**: `Chain valid: true/false`

Example blockchain structure:
```json
{
  "chain": [
    {
      "index": 0,
      "timestamp": "2025-01-15T10:30:00.000Z",
      "data": "Genesis Block",
      "previousHash": "0",
      "hash": "abc123..."
    },
    {
      "index": 1,
      "timestamp": "2025-01-15T10:35:00.000Z",
      "data": [
        {
          "type": "D",
          "amountNum": 500,
          "balanceAfter": 1500,
          "status": "Successful",
          "reason": "Deposit successful"
        }
      ],
      "previousHash": "abc123...",
      "hash": "def456..."
    }
  ]
}
```

---

## Purpose

This project is ideal for:

- **Students** learning blockchain fundamentals
- **Developers** exploring hashing and block validation
- **Anyone** wanting a clean, interactive visualization of ledger updates

---

## Transaction Types

| Type | Description | Validation |
|------|-------------|------------|
| **D** | Deposit | Always succeeds, increases balance |
| **W** | Withdrawal | Requires sufficient funds |
| **F** | Fee | Requires sufficient funds, doesn't trigger low balance warning |

---

## Security Features

- **Cryptographic hashing** for block integrity
- **Chain validation** to detect tampering
- **Balance constraints** prevent negative balances
- **Minimum balance tracking** with warnings


---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

Built as an educational demonstration of blockchain principles using Node.js and modern JavaScript features.
