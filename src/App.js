import { useState } from 'react';
import Arweave from 'arweave';
import PoolForm from './components/PoolForm'
import Archive from './Archive'

import { Center, Text, Box, Switch, Flex } from '@chakra-ui/react';

function App() {
  const [isArchive, setIsArchive] = useState(false)

  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 20000,
    logging: false,
  });

  return (
    <Box pt={6}>
      <Center>
        <Flex align='center' direction='row' gap={6}>
          <Text fontWeight='bold' color={!isArchive ? 'blue.400' : ''}>Create Pool</Text>
          <Switch size='md' color='red' onChange={() => setIsArchive(!isArchive)} />
          <Text fontWeight='bold' color={isArchive ? 'blue.400' : ''}>Archive/Mint</Text>
        </Flex>
      </Center>
      {!isArchive ?
        <PoolForm arweave={arweave} />
        :
        <Archive arweave={arweave} />
      }
      <Center bg='#eee' position='fixed' bottom='0' left='0' w='100%'>
        <footer>Heroes of History - 2022</footer>
      </Center>
    </Box>
  )
}
export default App;
