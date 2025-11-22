import { Block } from "./src/Block.js";
import { Blockchain } from "./src/Blockchain.js";
import prompts from "prompts";

const chain = new Blockchain();

// Helper function to get validated input
async function getInput(message, expectedCount, typeCheck = "any") {
  while (true) {
    const result = await prompts(
      {
        type: "text",
        name: "values",
        message,
        validate: (value) => {
          const parts = value.trim().split(/\s+/);

          if (parts.length !== expectedCount) {
            return `Please enter exactly ${expectedCount} value(s).`;
          }

          // Numeric check if required
          if (typeCheck === "number") {
            for (const part of parts) {
              if (isNaN(Number(part))) return "Please enter valid numbers.";
              if (Number(part) < 0) return "Numbers cannot be negative.";
            }
          }

          // Transaction type check
          if (typeCheck === "transaction") {
            const [type, amount] = parts;
            if (!["D", "W", "F"].includes(type.toUpperCase())) {
              return "Invalid transaction type. Use D, W, or F.";
            }
            if (isNaN(Number(amount))) return "Amount must be a number.";
            if (Number(amount) < 0) return "Amount cannot be negative.";
          }

          return true;
        },
      },
      { onCancel: () => process.exit(1) }
    );

    if (result.values) {
      return result.values.trim().split(/\s+/);
    }
  }
}

// Get initial values
let [balance, minBalance] = (
  await getInput("Enter balance and min balance (>= 0): ", 2, "number")
).map(Number);

while (balance < minBalance) {
  console.log("Balance must be greater than or equal to min balance.");
  [balance, minBalance] = (
    await getInput("Enter balance and min balance (>= 0): ", 2, "number")
  ).map(Number);
}

let currentBalance = balance;
let totalProcessed = 0;
let totalBlocked = 0;

// Main loop
while (true) {
  const [transactionsInput] = await getInput(
    "Enter number of transactions (or 0 to exit): ",
    1,
    "number"
  );
  const transactions = Number(transactionsInput);

  if (transactions === 0) {
    const action = await prompts({
      type: "select",
      name: "value",
      message: "Choose an action before exiting:  ",
      choices: [
        { title: "Exit Program", value: "exit" },
        { title: "View full blockchain", value: "view" },
      ],
    });

    if (action.value === "view") {
      console.log("\n=== Full Chain ===");
      console.log(JSON.stringify(chain, null, 2));
      continue; // ask again for number of transactions
    } else {
      break; // exit program
    }
  }

  let processedCount = 0;
  let blockedCount = 0;
  let chainData = [];

  // Process transactions for this block
  for (let i = 0; i < transactions; i++) {
    console.log(`Current balance: ${currentBalance}\n`);

    const [type, amount] = await getInput(
      "Enter transaction (Type Amount: D/W/F): ",
      2,
      "transaction"
    );

    const amountNum = Number(amount);
    const typeUpper = type.toUpperCase();
    let processed = false;

    if (typeUpper === "D") {
      currentBalance += amountNum;
      processed = true;
    } else if (typeUpper === "W" || typeUpper === "F") {
      if (currentBalance >= amountNum) {
        currentBalance -= amountNum;
        processed = true;
      }
    }

    if (processed) {
      processedCount++;
      if (currentBalance < minBalance && typeUpper !== "F") {
        console.log("LOW BALANCE");
      }
    } else {
      blockedCount++;
    }

    chainData.push({
      type: typeUpper,
      amountNum,
      balanceAfter: processed ? currentBalance : null,
      status: processed ? "Successful" : "Failed",
      reason: processed
        ? typeUpper === "D"
          ? "Deposit successful"
          : typeUpper === "W"
          ? "Withdrawal processed"
          : "Fee deducted"
        : typeUpper === "D"
        ? "Deposit failed"
        : typeUpper === "W"
        ? "Insufficient funds for withdrawal"
        : "Insufficient funds for fee",
    });
  }

  // Add block after all transactions are collected
  chain.addBlock(chainData);
  totalProcessed += processedCount;
  totalBlocked += blockedCount;

  console.log(`\n--- Block #${chain.chain.length - 1} Summary ---`);
  console.log(`Current Balance: ${currentBalance}`);
  console.log(`Processed in this block: ${processedCount}`);
  console.log(`Blocked in this block: ${blockedCount}\n`);
}

// Final summary
console.log("\n=== Final Summary ===");
console.log(`Final Balance: ${currentBalance}`);
console.log(`Total Processed Transactions: ${totalProcessed}`);
console.log(`Total Blocked Transactions: ${totalBlocked}`);
console.log(`Total Blocks: ${chain.chain.length - 1}`);

console.log("\n=== Full Chain ===");
console.log(JSON.stringify(chain, null, 2));

console.log("\nChain valid: ", chain.isValid());
