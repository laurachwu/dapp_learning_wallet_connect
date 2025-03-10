document.getElementById("connectButton").addEventListener("click", async () => {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            document.getElementById("walletAddress").innerText = `已連結: ${accounts[0]}`;
        } catch (error) {
            console.error("連接失敗", error);
        }
    } else {
        alert("請安裝 MetaMask 錢包");
    }
});
