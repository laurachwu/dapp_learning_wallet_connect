async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const balance = await provider.getBalance(await signer.getAddress());
        document.getElementById("walletBalance").innerText = `ETH 餘額: ${ethers.utils.formatEther(balance)} ETH`;
    }
}
