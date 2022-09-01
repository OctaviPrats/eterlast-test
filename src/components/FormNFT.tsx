import { FaRemoveFormat } from "react-icons/fa"

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as "column",
    marginBottom: "20px",
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}

function FormNFT({ nft, index, changeState, remove }: any) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value
    switch (event.target.id) {
      case "name": {
        nft.name = value
        break
      }
      case "description": {
        nft.description = value
        break
      }
      default: {
        console.error("Property not found")
      }
    }
    changeState(nft, index)
  }
  return (
    <div style={styles.container}>
      <div style={styles.title}>
        <h3>NFT {index}</h3>
        <button onClick={() => remove(index)}>
          <FaRemoveFormat />
        </button>
      </div>
      <label htmlFor="name">name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={nft.name}
        onChange={handleChange}
      />
      <label htmlFor="description">description</label>
      <input
        type="text"
        name="description"
        id="description"
        value={nft.description}
        onChange={handleChange}
      />
    </div>
  )
}

export default FormNFT
