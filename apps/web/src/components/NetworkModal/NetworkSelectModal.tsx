import { Button, Modal, Text, Grid, Box, Message, MessageText } from '@pancakeswap/uikit'
import { ChainId } from '@pancakeswap/sdk'
import Image from 'next/image'
import { useSwitchNetwork, useSwitchNetworkLocal } from '../../hooks/useSwitchNetwork'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { chains } from '../../utils/wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { useMemo, useState } from 'react'
import { useHistory } from '../../contexts/HistoryContext'
import NextLink from 'next/link'
import { useMenuItems } from '../Menu/hooks/useMenuItems'
import { getActiveMenuItem, getActiveSubMenuItem } from '../Menu/utils'
import { useRouter } from 'next/router'
import useAuth from '../../hooks/useAuth'
import { useActiveChainId } from 'hooks/useActiveChainId'
import {
     ArrowDownIcon,
     ArrowUpIcon,
     BoxProps,
     Flex,
     InfoIcon,
     UserMenu,
     UserMenuDivider,
     UserMenuItem,
     useTooltip,
     Input,
     SearchIcon,
     IconButton
   } from '@pancakeswap/uikit'
import { useNetwork } from 'wagmi'
import { useLocalNetworkChain } from 'hooks/useActiveChainId'
import { useSessionChainId } from 'hooks/useSessionChainId'
import { useHover } from 'hooks/useHover'
import { ChainLogo } from 'components/Logo/ChainLogo'
import { useSupportedChains } from 'hooks/useSupportedChains'
import chainName from 'config/constants/chainName'

const WrongNetworkSelect = ({ switchNetwork, chainId }) => {
     const { t } = useTranslation()
     const { targetRef, tooltip, tooltipVisible } = useTooltip(
       t(
         'The URL you are accessing (Chain id: %chainId%) belongs to %network%; mismatching your wallet’s network. Please switch the network to continue.',
         {
           chainId,
           network: chains.find((c) => c.id === chainId)?.name ?? 'Unknown network',
         },
       ),
       {
         placement: 'auto-start',
         hideTimeout: 0,
       },
     )
     const { chain } = useNetwork()
     const localChainId = useLocalNetworkChain() || ChainId.CORE
     const [, setSessionChainId] = useSessionChainId()
   
     const localChainName = chains.find((c) => c.id === localChainId)?.name ?? 'BSC'
   
     const [ref1, isHover] = useHover<HTMLButtonElement>()
   
     return (
       <>
         <Flex ref={targetRef} alignItems="center" px="16px" py="8px">
           <InfoIcon color="textSubtle" />
           <Text color="textSubtle" pl="6px">
             {t('Please switch network')}
           </Text>
         </Flex>
         {tooltipVisible && tooltip}
         <UserMenuDivider />
         {chain && (
           <UserMenuItem ref={ref1} onClick={() => setSessionChainId(chain.id)} style={{ justifyContent: 'flex-start' }}>
             <ChainLogo chainId={chain.id} />
             <Text color="secondary" bold pl="12px">
               {chain.name}
             </Text>
           </UserMenuItem>
         )}
         <Box px="16px" pt="8px">
           {isHover ? <ArrowUpIcon color="text" /> : <ArrowDownIcon color="text" />}
         </Box>
         <UserMenuItem onClick={() => switchNetwork(localChainId)} style={{ justifyContent: 'flex-start' }}>
           <ChainLogo chainId={localChainId} />
           <Text pl="12px">{localChainName}</Text>
         </UserMenuItem>
         <Button mx="16px" my="8px" scale="sm" onClick={() => switchNetwork(localChainId)}>
           {t('Switch network in wallet')}
         </Button>
       </>
     )
}


const NetworkSelect = ({ switchNetwork, chainId, onCloseModal, filters }) => {
     const { t } = useTranslation()
     const supportedChains = useSupportedChains()

     const contents = chains
        .filter((chain) => chainName[chain.id].toLowerCase().indexOf(filters.toLowerCase())>=0)
        .filter((chain) => !chain.testnet || chain.id === chainId)
        .filter((chain) => supportedChains.includes(chain.id));
     return (
          <>
          {contents.length>0?
               contents.map((chain) => (
               <UserMenuItem
               key={chain.id}
               style={{ justifyContent: 'flex-start', minWidth:"350px", overflow:"hidden" }}
               onClick={() => {
                if(chain.id === chainId) return;
                switchNetwork(chain.id);
                onCloseModal(false);
              }}
               >
               <ChainLogo chainId={chain.id} />
               <Text color={chain.id === chainId ? 'secondary' : 'text'} bold={chain.id === chainId} pl="12px">
                    {chainName[chain.id]}
               </Text>
               </UserMenuItem>
               )) : <><h2>No available networks</h2><br/></>}
          </>
     )
}
   
export function NetworkSelectModal({onCloseModal}) {
  const { chainId, isWrongNetwork, isNotMatched } = useActiveChainId()
  const { pendingChainId, isLoading, canSwitch, switchNetworkAsync } = useSwitchNetwork()

  const [query, setQuery] = useState<string>("");
  const [filters, setFilters] = useState<string>("");
  const handleQuery = (e: any) => {
    setQuery(e.target?.value);
  }

  const handleEnter = () => {
    setFilters(query);
  }
  
  return (
    <Modal title={"Select Network"} onDismiss={()=> onCloseModal(false)} style={{minWidth:"100px"}}>
      <Box style={{display:'flex', marginBottom: '8px'}}>
          <Input
            id="search-network"
            placeholder={'Search Network'}
            scale="lg"
            autoComplete="off"
            value={query}
            onChange={handleQuery}
          />
      </Box> <br />
      <Box style={{ gap: '16px', overflowY:"scroll", overflowX:"hidden", paddingBottom:"10px"}} maxHeight="300px">
            <NetworkSelect switchNetwork={switchNetworkAsync} chainId={chainId} onCloseModal={onCloseModal} filters={query}/>
      </Box>
      {/* <Button onClick={()=> onCloseModal(false)}>Close</Button> */}
    </Modal>
  )
}
