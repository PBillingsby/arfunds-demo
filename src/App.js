import { useState } from 'react';
import Arweave from 'arweave';
import Arfund, { createPool } from "arfunds";
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
  Box
} from '@chakra-ui/react';
import { QuestionOutlineIcon, ExternalLinkIcon } from '@chakra-ui/icons';

function App() {
  const poolObject = {}
  const [noWallet, setNoWallet] = useState(false)
  const [noDescription, setNoDescription] = useState(false)
  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 20000,
    logging: false,
  });


  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    poolObject[e.target.name] = e.target.value
    console.log(poolObject)
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

      console.log(txId)
    } catch (error) {
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
            <FormLabel fontSize='xl'>Description</FormLabel>
            <HStack>
              <Textarea name='description' onChange={(e) => handleChange(e)} w='30rem' h='32vh' />
              <Tooltip
                label={<DescriptionLabel />}
                fontSize='md'
              >
                <QuestionOutlineIcon color='blue' />
              </Tooltip>
            </HStack>
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
            <FormLabel fontSize='xl'>Wallet</FormLabel>
            <Input type='text' name='wallet' placeholder={'empty Arconnect wallet'} onChange={(e) => handleChange(e)} />
            {noWallet && <FormErrorMessage>Arwallet address is required.</FormErrorMessage>}
          </FormControl>
          <FormControl>
            <FormLabel fontSize='xl'>Operator Info</FormLabel>
            <Input type='text' name='OperatorInfo' placeholder={'information about pool creator'} onChange={(e) => handleChange(e)} />
          </FormControl>
          <FormControl>
            <FormLabel fontSize='xl'>Rewards</FormLabel>
            <Input type='text' name='rewards' placeholder={'rewards for contributors'} onChange={(e) => handleChange(e)} />
          </FormControl>
        </VStack>
      </Center>
      <VStack p={12}>
        <Text fontSize='xs'>Fill the following fields with pool information.</Text>
        <Text fontSize='xs'>To instantiate a pool, you must have an Arconnect address with 0 funds on it.</Text>
        <Text fontSize='xs'>You can get one from <Link href='https://www.arconnect.io/' isExternal>Arconnect<ExternalLinkIcon /></Link>.</Text>
        <Text fontSize='xs'>Paste the address into the <Link href='#wallet'>field</Link></Text>
        <Button onClick={(e) => handlePoolCreate(e)} px={8} mx={16} fontSize='3xl' bg={'#eee'} border={'1px solid black'} _hover={{ bg: '#fff' }}>Create Pool</Button>
      </VStack >
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
export default App;
