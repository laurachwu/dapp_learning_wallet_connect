async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        console.log("開始獲取 ETH 餘額...");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const balance = await provider.getBalance(await signer.getAddress());
        document.getElementById("walletBalance").innerText = `ETH 餘額: ${ethers.utils.formatEther(balance)} ETH`;
        console.log("ETH 餘額獲取成功！");
    } else {
        console.log("無法獲取 ETH 餘額，請確認 MetaMask 是否安裝。");
    }
}
