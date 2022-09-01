import React from "react"

const styles = {
  container: {
    backgroundColor: "#eee",
    borderRadius: "10px",
    margin: "20px 30px",
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "10px 30px",
  },
}

function UserInfo({ walletInfo }: any) {
  return (
    <div style={styles.container}>
      <p>Wallet: {walletInfo.address}</p>
      <p>Network: {walletInfo.network}</p>
      <p>Eth Amount: {walletInfo.ethAmount}</p>
    </div>
  )
}

export default UserInfo
