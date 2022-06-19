import { useState } from 'react';
import Arweave from 'arweave';
import Arfund, { createPool, getAllContracts } from "arfunds";
import PoolModal from './components/PoolModal'
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
  useDisclosure
} from '@chakra-ui/react';
import { QuestionOutlineIcon, ExternalLinkIcon } from '@chakra-ui/icons';

function App() {
  const poolObject = {}
  const [noWallet, setNoWallet] = useState(false)
  const [noDescription, setNoDescription] = useState(false)
  const [data, setData] = useState()
  const { onOpen } = useDisclosure()

  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 20000,
    logging: false,
  });


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

      const txId = await createPool(arweave, title, description, "use_wallet", wallet, website, operatorInfo, rewards);
    } catch (error) {
      // These 3 below calls are placeholder to show contract after "creating pool"
      // They will need to be moved to the try block above when createPool works
      const contracts = await getAllContracts(arweave);
      setData(contracts)
      onOpen()
      console.log(error)
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
      <Center mt={20}>
        <VStack px={16} pt={8}>
          <FormControl>
            <FormLabel fontSize='xl'>Pool Title</FormLabel>
            <HStack>
              <Input type='text' name='title' onChange={(e) => handleChange(e)} />
            </HStack>
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
            <HStack>
              <Input type='text' name='website' onChange={(e) => handleChange(e)} />
            </HStack>
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
            <Input type='text' name='OperatorInfo' onChange={(e) => handleChange(e)} />
          </FormControl>
          <FormControl>
            <FormLabel fontSize='xl'>Rewards</FormLabel>
            <Input type='text' name='rewards' onChange={(e) => handleChange(e)} />
          </FormControl>
        </VStack>
      </Center>
      <VStack p={12}>
        <Button mt={8} onClick={(e) => handlePoolCreate(e)} px={8} mx={16} size='auto' fontSize='3rem' bg={'#eee'} border={'1px solid black'} _hover={{ bg: '#fff' }}>Create Pool</Button>
        <Box pt={12}>
          <Text fontSize='xs'>Fill all fields to create a pool</Text>
          <Text fontSize='xs'>You can get an ArConnect wallet from <Link href='https://www.arconnect.io/' isExternal>here <ExternalLinkIcon /></Link></Text>
        </Box>
      </VStack>
      {/* This needs to be replaced with REAL value. This is currently first index of ALL contracts */}
      {data && <PoolModal data={data[0]} arweave={arweave} />}
      <Center position='fixed' bottom='0' left='0' w='100%'>
        <footer>Heroes of History - 2022</footer>
      </Center>
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
      <p>This description should include:</p>
      <Text fontSize='xs'>• To instantiate a pool, you must have an Arconnect address with 0 funds on it.</Text>
      <Text fontSize='xs'>• Paste the address into the <Link href='#wallet'>field</Link></Text>
    </div >
  )
}
export default App;
