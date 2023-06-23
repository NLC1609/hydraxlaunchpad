import React from 'react';
import { Text, Center, Grid, GridItem, Box, Container, VStack } from '@chakra-ui/react';
import { Stack, Button, HStack, Image, Input } from '@chakra-ui/react';
import Twitter from '../assets/icons/twitter.png';
import Discord from '../assets/icons/discord.png';
import Website from '../assets/icons/click.png';
import Link from 'next/link';

const Collections = () => {
  return (
    <Container maxW={'100%'} bg="white" color={'black'} pt="5%" pb="2%">
       <VStack>
        <Text fontSize='3xl' mt={5}><b>All Active Offerings</b></Text>
        <Text align='center'>
          <b>Launched on HydraX</b>
          </Text><br />
          <Text fontSize={'ml'} color='grey'>Search by name or address</Text>
        <Input onChange={(event) => {
          setSearch(event.target.value)
        }}maxWidth={['80%', '80%', '70%', '60%', '50%' ]} placeholder='Search...'
        borderRadius='40' borderColor={'#FF0080'} borderWidth='2px' />
        </VStack>
        <Center>
        <Grid templateColumns={['repeat(1, 1fr)', null, 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)']} gap={6} w='75%' mt={10}>
            <GridItem w='100%' h='10' align='center' mb={['400', '400', '420', '400', '380', '400']}>
       <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' bgGradient='linear(to-r, #141E30, #243B55)' color={'white'}>
      <Box w={'200'} h='200' bgRepeat="no-repeat" bgPosition={'center'} bgSize='200%'>
      {/* <Image src={project.link}
        width='100' height='200' alt={project.link} display='block'
      /> */}
      </Box>
    
    <Stack direction='column' mx={4} mb='5%' mt='5%' alignItems="center" my={4}>  
        <Text fontSize={'29px'}><b>Singapore 18 Sin Ming Lane 0711</b></Text>
        <Text fontSize={'14px'}>Token Price: $1.022</Text>
        <Text fontSize={'14px'}>Market Cap: $662,420</Text>
        <Stack direction='row' mb='5%' mt='5%'>
        <Button
              variant={'solid'}
              size='sm' my={4}
              bgGradient='linear(to-l, #7928CA, #FF0080)'
              color='white'
              maxW={['100%', null, '100%', '100%', '100%']}
              fontSize={['12px', null, null, null, '100%']}
              _hover={{bgGradient: "linear(to-l, #8a32e3, #FF0080)", color: "white"}}
                 px={6} borderRadius={20}>
              Mint Now
            </Button>
            </Stack>
            <HStack>
            <a href="RealEstate" target='_blank' rel="noreferrer"><Image src={Twitter.src} alt='Twitter' w={5}/></a>
            <a href="RealEstate" target='_blank' rel="noreferrer"><Image src={Discord.src} alt='Discord' w={5}/></a>
            <a href="RealEstate" target='_blank' rel="noreferrer"><Image src={Website.src} alt='Website' w={5}/></a>
           </HStack>
            </Stack>
        
    </Box>
    </GridItem>
            <br />
          </Grid>
        </Center>
    </Container>
  );
};

export default Collections;
