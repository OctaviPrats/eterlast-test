import { useEffect, useState } from "react"
import FormNFT from "./FormNFT"

/**
 *
 * @returns Component that mints a collection of NFTs
 */
class NFT {
  "name": ""
  "description": ""
}

function MintNft({ mintNftCollection }: any) {
  const [nftList, setNftList] = useState(new Array<NFT>())
  useEffect(() => {
    setNftList([new NFT()])
  }, [])

  function addNFT() {
    setNftList([...nftList, new NFT()])
  }
  function changeState(nft: NFT, index: number) {
    nftList[index] = nft
    setNftList([...nftList])
    console.log(nftList, nft)
  }
  const removeItem = (index: number) => {
    nftList.splice(index, 1)
    setNftList([...nftList])
  }
  return (
    <div>
      <div>
        {nftList.map((nft: NFT, index: number) => (
          <FormNFT
            nft={nft}
            index={index}
            key={index}
            changeState={changeState}
            remove={removeItem}
          />
        ))}
      </div>
      <button onClick={() => addNFT()}>Add NFT</button>
      <p>NFT to get Minted: {nftList.length}</p>
      <button onClick={() => mintNftCollection(nftList)}>Mint</button>
    </div>
  )
}

export default MintNft
