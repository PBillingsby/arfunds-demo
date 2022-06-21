import { useState } from 'react';
import Arfund, { createPool } from "arfunds";

import PoolModal from './PoolModal'
import {
  Tooltip,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  HStack,
  Button,
  Center,
  VStack,
  Text,
  Link,
  Box,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { QuestionOutlineIcon, ExternalLinkIcon } from '@chakra-ui/icons';


export default function PoolForm({ arweave }) {
  const poolObject = {}
  const [noWallet, setNoWallet] = useState(false)
  const [noDescription, setNoDescription] = useState(false)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const { onOpen } = useDisclosure()

  const handleChange = (e) => {
    poolObject[e.target.name] = e.target.value
  }

  const handlePoolCreate = async (e) => {
    e.preventDefault()

    const {
      title,
      description,
      website,
      wallet,
      operatorInfo,
      rewards
    } = poolObject;

    try {
      if (validateFormInput(wallet, description)) return
      setLoading(true)
      const txId = await createPool(arweave, title, description, "use_wallet", wallet, website, operatorInfo, rewards);
      const fund = new Arfund(txId, arweave, true);
      debugger
      if (fund && fund.poolId) {
        setData([poolObject, fund.poolId])
        setLoading(false)
        onOpen()
      }
    } catch (error) {
      console.log(error)
      setData({ error: error.message })
      onOpen()
    }
  }

  const validateFormInput = (wallet, description) => {
    let anyInvalid = false
    if (wallet === undefined) {
      setNoWallet(true);
      anyInvalid = true
    }
    if (description === undefined) {
      setNoDescription(true)
      anyInvalid = true
    }
    return anyInvalid
  }

  return (
    <>
      <Center maxH={'75vh'}>
        {loading ?
          <Center h={'410px'}>
            <VStack>
              <Spinner size='xl' color='blue.400' />
            </VStack>
          </Center>
          :
          <>
            <VStack px={16} pt={8}>
              <FormControl>
                <FormLabel fontSize='xl'>Pool Title</FormLabel>
                <Input type='text' name='title' onChange={(e) => handleChange(e)} />
              </FormControl>
              <FormControl isInvalid={noDescription}>
                <HStack pt={1.5}>
                  <FormLabel fontSize='xl'>Description</FormLabel>
                  <Tooltip
                    label={<DescriptionLabel />}
                    fontSize='md'
                  >
                    <QuestionOutlineIcon color='blue' />
                  </Tooltip>
                </HStack>
                <Textarea name='description' onChange={(e) => handleChange(e)} w='30rem' h='32vh' />
                {noDescription && <FormErrorMessage>Description is required.</FormErrorMessage>}
              </FormControl>
            </VStack>
            <VStack px={16} w={'xl'}>
              <FormControl>
                <FormLabel fontSize='xl'>Website</FormLabel>
                <Input type='text' name='website' onChange={(e) => handleChange(e)} />
              </FormControl>
              <FormControl isInvalid={noWallet} id='wallet'>
                <HStack>
                  <FormLabel fontSize='xl' pt={1.5}>Wallet</FormLabel>
                  <Tooltip
                    label={<WalletLabel />}
                  >
                    <QuestionOutlineIcon color='blue' />
                  </Tooltip>
                </HStack>
                <Input type='text' name='wallet' onChange={(e) => handleChange(e)} />
                {noWallet && <FormErrorMessage>Arwallet address is required.</FormErrorMessage>}
              </FormControl>
              <FormControl>
                <FormLabel fontSize='xl'>Operator Info</FormLabel>
                <Input type='text' name='operatorInfo' onChange={(e) => handleChange(e)} />
              </FormControl>
              <FormControl>
                <FormLabel fontSize='xl'>Rewards</FormLabel>
                <Input type='text' name='rewards' onChange={(e) => handleChange(e)} />
              </FormControl>
            </VStack>
          </>
        }
      </Center>
      <VStack p={12}>
        <Button mt={8} onClick={(e) => handlePoolCreate(e)} px={8} mx={12} size='auto' fontSize='3rem' bg={'#eee'} border={'1px solid black'} _hover={{ bg: '#fff' }}>
          {loading ? "Creating...." : "Create Pool"}
        </Button>
        <Box pt={12}>
          <Text fontSize='xs'>All fields are required.</Text>
          <Text fontSize='xs'>You can get an ArConnect wallet from <Link href='https://www.arconnect.io/' isExternal>here <ExternalLinkIcon /></Link></Text>
        </Box>
      </VStack>
      {/* This needs to be replaced with REAL value. This is currently first index of ALL contracts */}
      {data && <PoolModal data={data} loading={loading} />}
    </>
  )
}

const DescriptionLabel = () => {
  return (
    <div>
      <p>This description should include:</p>
      <p>• Here</p>
      <p>• Goes</p>
      <p>• What is needed for description</p>
    </div >
  )
}

const WalletLabel = () => {
  return (
    <div>
      <Text fontSize='xs'>• To instantiate a pool, you must have Arconnect with two web wallet addresses.</Text>
      <Text fontSize='xs'>• Paste the address with 0 funds on it into this field.</Text>
    </div >
  )
}