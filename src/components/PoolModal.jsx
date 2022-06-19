import { useState, useEffect } from 'react'
import Arfund, { read } from "arfunds";

import { CopyIcon } from '@chakra-ui/icons';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  HStack,
  Button,
  useDisclosure
} from '@chakra-ui/react'

const PoolModal = (props) => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [returnedData, setReturnedData] = useState()

  useEffect(() => {
    const { data, arweave } = props
    const fetchData = async () => {
      const fund = new Arfund(data, arweave, true)
      const readData = await fund.getState()
      onOpen()
      setReturnedData(readData)
    }
    fetchData()
      .catch(console.error);
  }, [])

  const mint = () => {
    console.log('Mint')
  }


  return (
    <>
      {<Modal closeOnOverlayClick={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter='blur(1.5px) hue-rotate(90deg)' />
        {returnedData && (
          <ModalContent>
            <ModalHeader pt={4} fontWeight='normal' fontSize='2xl'>{returnedData.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>
                <HStack>
                  <Text>
                    <Text as={'strong'}>Contract:</Text> {`${returnedData.owner.slice(0, 9)}...${returnedData.owner.slice(returnedData.owner.length - 9)}`}
                  </Text>
                  <CopyIcon onClick={() => navigator.clipboard.writeText(returnedData.owner)} />
                </HStack>
                {returnedData.ownerInfo && <Text><Text as={'strong'}>Owner Info:</Text> {returnedData.ownerInfo}</Text>}
                {returnedData.website && <Text><Text as={'strong'}>Website:</Text> {returnedData.website}</Text>}
                {returnedData.useOfProceeds && <Text><Text as={'strong'}>Use of Proceeds:</Text> {returnedData.useOfProceeds}</Text>}
                {returnedData.rewards && <Text><Text as={'strong'}>Rewards:</Text> {returnedData.rewards}</Text>}
                {returnedData.totalContributions && <Text><Text as={'strong'}>Total Contributions:</Text> {returnedData.totalContributions}</Text>}
                {returnedData.totalSupply && <Text><Text as={'strong'}>Total Supply:</Text> {returnedData.totalSupply}</Text>}
              </div>
            </ModalBody>
            <ModalFooter margin='0 auto'>
              <Button bg={'#eee'} border={'1px solid black'} _hover={{ bg: '#fff' }} mr={3} onClick={mint}>
                Mint
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
      }
    </>
  )
}

export default PoolModal