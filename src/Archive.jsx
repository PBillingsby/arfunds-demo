import { FormLabel, Text, VStack, Input, Button, HStack, Center, Flex, FormControl, Box } from '@chakra-ui/react'
import Arfund from "arfunds";
import { useState } from 'react'

export default function Archive({ arweave }) {
  const [mintContract, setMintContract] = useState()

  const mint = async () => {
    await mintContract
    try {
      const fund = new Arfund(mintContract, arweave, true);
      const fundState = await fund.getState();
      const tags = await fund.getNftTags(fundState.title, fund.poolId, false);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Center>
      <Flex gap={'12rem'} pt={8} px={6}>
        <Box>
          <FormControl w={'30rem'}>
            <FormLabel fontSize='xl'>Mint</FormLabel>
            <VStack mb={4} py={2.5} border={`1px solid`} borderColor='gray.300' borderRadius='md'>
              <Text fontSize='xs'>Pool creators can mint their pool to a random contributor</Text>
            </VStack>
            <VStack py={4} px={8} border={`1px solid`} borderColor='gray.300' borderRadius='md'>
              <Text fontSize='xs'>Pool creators can mint their pool to a random contributor</Text>
              <Input onChange={(e) => setMintContract(e.target.value)} type='text' size='sm' placeholder='paste pool id here'></Input>
              <Button boxShadow='xl' bg={'#eee'} border={'1px solid black'} _hover={{ bg: '#fff' }} mr={3} size={'xs'} onClick={mint}>
                Mint
            </Button>
            </VStack>
          </FormControl>
        </Box>
        {/* <FormLabel fontSize='xl'>Mint</FormLabel> */}
        <VStack px={8}>
          <FormLabel fontSize='xl'>Archive</FormLabel>
          <Text fontSize='xs'>Pool creators can mint their pool to a random contributor</Text>
          <Input border='none' multiple='multiple' onChange={(e) => setMintContract(e.target.value)} type='file' size='sm' placeholder='paste pool id here'></Input>
          <Button boxShadow='xl' bg={'#eee'} border={'1px solid black'} _hover={{ bg: '#fff' }} mr={3} size={'xs'} onClick={mint}>
            Archive Data
          </Button>
        </VStack>
      </Flex>
    </Center >
  )
}