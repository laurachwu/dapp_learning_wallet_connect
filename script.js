document.getElementById("connectButton").addEventListener("click", async () => {
    console.log("按鈕被點擊了！");

    if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask 被偵測到！");

        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            document.getElementById("walletAddress").innerText = `已連結: ${accounts[0]}`;
            currentAccount = accounts[0]; // 記錄當前錢包
            getBalance(); // 取得 ETH 餘額
        } catch (error) {
            console.error("連接失敗", error);
        }
    } else {
        console.log("MetaMask 未被偵測到！");
        alert("請安裝 MetaMask 錢包");
    }
});

// 🔥 監聽「錢包切換」事件（原本的方法）
if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
        console.log("🔥 偵測到錢包切換事件！新的帳戶是:", accounts);

        if (accounts.length > 0) {
            document.getElementById("walletAddress").innerText = `已連結: ${accounts[0]}`;
            getBalance(); // 重新獲取 ETH 餘額
        } else {
            console.log("⛔ 錢包已完全斷開");
            document.getElementById("walletAddress").innerText = "";
            document.getElementById("walletBalance").innerText = "";
        }
    });
}

// 🔥 手動偵測錢包變更（每 3 秒執行一次）
let currentAccount = null;
setInterval(async () => {
    if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });

        if (accounts.length > 0 && currentAccount !== accounts[0]) {
            console.log("🔄 偵測到錢包變更，更新畫面...");
            currentAccount = accounts[0];
            document.getElementById("walletAddress").innerText = `已連結: ${currentAccount}`;
            getBalance();
        }
    }
}, 3000);

// 🔥 讓「斷開連接」按鈕清除畫面資訊
document.getElementById("disconnectButton").addEventListener("click", () => {
    document.getElementById("walletAddress").innerText = "";
    document.getElementById("walletBalance").innerText = "";
    console.log("已斷開連接");
});

// 🔥 獲取 ETH 餘額
async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        console.log("🔄 正在獲取 ETH 餘額...");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const balance = await provider.getBalance(await signer.getAddress());
        document.getElementById("walletBalance").innerText = `ETH 餘額: ${ethers.utils.formatEther(balance)} ETH`;
        console.log("✅ 餘額獲取成功:", ethers.utils.formatEther(balance));
    }
}
