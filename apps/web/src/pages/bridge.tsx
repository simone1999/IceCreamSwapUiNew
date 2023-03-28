import { BridgeProvider } from 'views/Bridge/BridgeProvider'
import Bridge from '../views/Bridge'
import {SUPPORT_BRIDGE} from "../config/constants/supportChains";

const BridgePage = () => {
  return (
    <BridgeProvider>
      <Bridge />
    </BridgeProvider>
  )
}

BridgePage.chains = SUPPORT_BRIDGE

export default BridgePage
