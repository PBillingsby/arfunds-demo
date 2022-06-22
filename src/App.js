import { useState } from 'react';
import Arweave from 'arweave';
import Arfund, { read } from "arfunds";

import PoolForm from './components/PoolForm'
import { Center, Text, Box, Link, Flex, Button, FormLabel, VStack, Input, Image } from '@chakra-ui/react';
import { ExternalLinkIcon, MinusIcon } from '@chakra-ui/icons'

function App() {
  const [mintContract, setMintContract] = useState()

  const mint = async () => {
    await mintContract
    try {

      const fund = new Arfund(mintContract, arweave, true);
      const fundState = await fund.getState();

      const tags = await fund.getNftTags(fundState.title, fund.poolId, false);
      debugger
    } catch (error) {
      console.log(error)
    }
  }

  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 20000,
    logging: false,
  });

  return (
    <Box pt={6}>
      <Image position='fixed' bottom='10px' w='6rem' h='6rem' src='https://pbs.twimg.com/profile_images/1529501015434743808/F0VdEkWe_400x400.jpg' />
      <PoolForm arweave={arweave} />
      <Center>
        <VStack>
          <Flex pt={2}>
            <MinusIcon pt={2.5} />
            <Text fontSize='lg' fontWeight='bold'>OR</Text>
            <MinusIcon pt={2.5} />
          </Flex>
          <VStack px={2} pb={2} w='30rem' border={`1px solid`} borderColor='black' borderRadius='md'>
            <Text fontWeight='semibold' fontSize='sm' px={4}>Pool creators can mint their rewards to a random contributor</Text>
            <Flex>
              <FormLabel>Artifact ID</FormLabel>
              <Input onChange={(e) => setMintContract(e.target.value)} border={'1.5px solid'} borderColor='black' size='sm' w={80} type='text' />
            </Flex>
          </VStack>
          <Button size='sm' w='10vw' fontSize='md' onClick={mint} bg='#A0CDF6' ml={4} border={'1.5px solid'} borderColor='black' _hover={{ bg: '#eee', borderColor: 'gray.300', border: '1.5px solid' }}>Mint</Button>
          <Text fontSize='xs'>You can get an ArConnect wallet from <Link href='https://www.arconnect.io/' isExternal>here <ExternalLinkIcon /></Link></Text>
        </VStack>
      </Center>
      <Center bg='#eee' position='fixed' bottom='0' left='0' w='100%'>
        <footer>Heroes of History - 2022</footer>
      </Center>
    </Box>
  )
}
export default App;
