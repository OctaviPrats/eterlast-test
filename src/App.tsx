import React, { useEffect, useState } from "react"
import UserInfo from "./components/UserInfo"
// import { useEffect, useState } from "react"
import "./App.css"
import { ethers } from "ethers"
import MintNft from "./components/MintNft"
import axios from "axios"

function onAccountsChanged(setLoader: Function) {
  window.ethereum.on("accountsChanged", async () => {
    // Do something
    setLoader(true)
  })
}

async function connect(setWalletInfo: Function, setLoader: Function) {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.")

    await window.ethereum.send("eth_requestAccounts")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const address = await provider.getSigner().getAddress()
    const network = (await provider.getNetwork()).name
    const eth = ethers.utils.formatEther(await provider.getBalance(address))
    setWalletInfo({
      address: address,
      network: network,
      ethAmount: eth,
    })
    onAccountsChanged(setLoader)
  } catch (err: any) {
    console.error(err.message)
  } finally {
    setLoader(false)
  }
}

async function mint(
  collection: Array<any>,
  walletInfo: any,
  setMessage: Function
) {
  console.info("Minted: ", collection)
  axios
    .post("https://mint-test.free.beeceptor.com/my/api/path", {
      collection: collection,
      address: walletInfo.address,
      network: walletInfo.network,
    })
    .then(function (response) {
      console.log(response)
      setMessage(response.data)
    })
    .catch(function (error) {
      console.error(error)
    })
}

function App() {
  const [walletInfo, setWalletInfo] = useState({})
  const [loader, setLoader] = useState(true)
  const [apiMessage, setApiMessage] = useState("")

  useEffect(() => {
    connect(setWalletInfo, setLoader)
  }, [])

  function init() {
    connect(setWalletInfo, setLoader)
  }

  function mintNftCollection(nfts: Array<any>) {
    mint(nfts, walletInfo, setApiMessage)
  }

  if (loader) {
    return (
      <div className="App">
        <p>Connect your Wallet...</p>
        <p>or</p>
        <button onClick={() => init()}>Connect Wallet</button>
      </div>
    )
  } else {
    return (
      <div className="App">
        <UserInfo walletInfo={walletInfo} />
        <MintNft mintNftCollection={mintNftCollection} />
        {apiMessage.length ? <p>{apiMessage}</p> : ""}
      </div>
    )
  }
}

export default App
