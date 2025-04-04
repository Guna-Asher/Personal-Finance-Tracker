document.addEventListener("DOMContentLoaded", function () {
    fetchTransactions();
    fetchSummary();  // Load summary when the page loads
    loadDarkMode();  // Load dark mode if enabled
});

// Fetch and display transactions
async function fetchTransactions() {
    try {
        const response = await fetch("fetch_transactions.php");
        const transactions = await response.json();

        const transactionsTable = document.getElementById("transactionTableBody");
        transactionsTable.innerHTML = ""; // Clear old data

        if (transactions.length === 0) {
            transactionsTable.innerHTML = `<tr><td colspan="5" class="text-center">No transactions yet.</td></tr>`;
            return;
        }

        transactions.forEach(transaction => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${transaction.date}</td>
                <td>${transaction.description}</td>
                <td>₹${parseFloat(transaction.amount).toFixed(2)}</td>
                <td><span class="${transaction.type === 'income' ? 'text-success' : 'text-danger'}">${transaction.type.toUpperCase()}</span></td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteTransaction(${transaction.id})">🗑️</button>
                </td>
            `;
            transactionsTable.appendChild(row);
        });

        fetchSummary(); // Refresh summary after transactions update

    } catch (error) {
        console.error("Error fetching transactions:", error);
        alert("⚠️ Unable to fetch transactions. Please try again later.");
    }
}

// Fetch and update summary data
async function fetchSummary() {
    try {
        const response = await fetch("get_summary.php");
        const data = await response.json();

        document.getElementById("totalIncome").textContent = `₹${parseFloat(data.totalIncome).toFixed(2)}`;
        document.getElementById("totalExpense").textContent = `₹${parseFloat(data.totalExpenses).toFixed(2)}`;
        document.getElementById("totalBalance").textContent = `₹${parseFloat(data.totalSavings).toFixed(2)}`;

    } catch (error) {
        console.error("Error fetching summary:", error);
        alert("⚠️ Unable to fetch financial summary.");
    }
}

// Handle transaction form submission
document.getElementById("transactionForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Form validation
    const description = document.getElementById("description").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const date = document.getElementById("date").value;

    if (!description || isNaN(amount) || amount <= 0 || !date) {
        alert("⚠️ Please fill out all fields correctly.");
        return;
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("amount", amount);
    formData.append("type", type);
    formData.append("date", date);

    try {
        const response = await fetch("add_transaction.php", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        if (result.message) {
            alert("✅ " + result.message);
            fetchTransactions(); // Refresh transactions
            fetchSummary(); // Refresh summary
            this.reset(); // Reset form
        } else {
            alert("❌ Error: " + result.error);
        }

    } catch (error) {
        console.error("Fetch Error:", error);
        alert("⚠️ Network error. Please try again.");
    }
});

// Delete transaction
async function deleteTransaction(id) {
    if (!confirm("🗑️ Are you sure you want to delete this transaction?")) return;

    try {
        const response = await fetch(`delete_transaction.php?id=${id}`, { method: "GET" });
        const result = await response.json();
        
        if (result.message) {
            alert("✅ " + result.message);
            fetchTransactions();  // Refresh transactions
            fetchSummary(); // Refresh summary
        } else {
            alert("❌ Error: " + result.error);
        }

    } catch (error) {
        console.error("Error deleting transaction:", error);
        alert("⚠️ Unable to delete transaction. Try again later.");
    }
}

// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");

    // Change emoji dynamically
    document.getElementById("toggleIcon").textContent = isDark ? "☀️" : "🌙";
}

// Load Dark Mode Preference
function loadDarkMode() {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        document.getElementById("toggleIcon").textContent = "☀️";
    }
}

// Run on page load
document.addEventListener("DOMContentLoaded", loadDarkMode);
