import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  ChevronDownIcon,
  ChevronRightIcon,
  FlatList,
  HStack,
  Image,
  Input,
  Pressable,
  SearchIcon,
  Switch,
  Text,
  VStack,
  Spinner,
} from 'native-base';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PRIMARY, SECONDARY} from '../utils/Statis';
import axios from 'axios';

const Home = route => {
  const Navigation = route.route.navigation;
  const inset = useSafeAreaInsets();
  const [showFilter, setshowFilter] = useState(false);
  const [fulltimeFilter, setfulltimeFilter] = useState(true);
  const [isSearch, setisSearch] = useState(false);
  const [data, setdata] = useState([]);
  const [filterData, setfilterData] = useState([]);
  const [location, setlocation] = useState('');
  const [search, setsearch] = useState('');
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    axios
      .get('http://dev3.dansmultipro.co.id/api/recruitment/positions.json')
      .then(res => {
        setdata(res.data);
        setfilterData(res.data);
        setisLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  const handleSearch = () => {
    let ft = 'Part Time';
    if (fulltimeFilter === true) {
      ft = 'Full Time';
    } else {
      ft = 'Part Time';
    }

    if (location === '') {
      const filteredDatas = data.filter(datas => {
        return datas.type === ft;
      });
      setfilterData(filteredDatas);
    } else {
      const filteredDatas = data.filter(datas => {
        return datas.type === ft;
      });
      const filteredDatasLocation = filteredDatas.filter(datas => {
        return datas.location === location;
      });
      console.log(filteredDatasLocation);
      setfilterData(filteredDatasLocation);
    }
  };
  const handleChange = Text => {
    setsearch(Text);
  };

  const handleInputFinish = () => {
    // Fungsi yang akan dijalankan setelah penginputan selesai
    const filtered = data.filter(item =>
      item.description.toLowerCase().includes(search.toLowerCase()),
    );
    setfilterData(filtered);
    setisSearch(true);
  };
  return (
    <Box flex={1} bg={SECONDARY.GREY4}>
      <Box bg={PRIMARY.BLUE} pt={inset.top}>
        <Text
          fontWeight={'semibold'}
          textAlign={'center'}
          py={5}
          color="white"
          fontSize="lg">
          Job List
        </Text>
      </Box>

      <Box>
        <HStack alignItems={'center'} mt={5} px={5} rounded="lg" space={5}>
          <Input
            onChangeText={handleChange}
            onBlur={handleInputFinish} //
            bg="white"
            fontSize={'sm'}
            leftElement={<SearchIcon size="md" ml={2} />}
            flex={1}
            placeholder="Search"
          />
          <Pressable onPress={() => setshowFilter(!showFilter)}>
            <ChevronDownIcon size="md" color={PRIMARY.ORANGE} />
          </Pressable>
        </HStack>
        {showFilter === true ? (
          <VStack
            space={5}
            borderWidth={1}
            borderColor={SECONDARY.GREY3}
            mx={5}
            mt={5}
            bg="white"
            p="2"
            rounded="lg">
            <HStack justifyContent={'space-between'} alignItems={'center'}>
              <Text fontSize="sm">Fulltime</Text>
              <Switch
                value={fulltimeFilter}
                onValueChange={text => setfulltimeFilter(text)}
                offTrackColor={SECONDARY.GREY4}
                onTrackColor={PRIMARY.ORANGE}
              />
            </HStack>
            <HStack
              space={5}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <Text fontSize="sm">Location</Text>
              <Input
                onChangeText={Text => setlocation(Text)}
                flex={1}
                placeholder="Location"
                fontSize={'sm'}
              />
            </HStack>
            <HStack justifyContent={'flex-end'}>
              <Button
                bg={PRIMARY.BLUE}
                colorScheme="blue"
                onPress={() => handleSearch()}>
                <Text color="white" fontSize="sm">
                  Apply Filter
                </Text>
              </Button>
            </HStack>
          </VStack>
        ) : (
          <></>
        )}
        {isSearch == true ? (
          <Text mt={2} fontWeight={'semibold'} mx={5} fontSize="md">
            Serach Result
          </Text>
        ) : (
          <></>
        )}
      </Box>

      <FlatList
        contentContainerStyle={{
          paddingBottom: inset.bottom,
        }}
        data={filterData}
        renderItem={({item}) => (
          <Pressable
            mx={5}
            mt={5}
            flex={1}
            bg="white"
            p="2"
            rounded="lg"
            onPress={() => Navigation.navigate('Detail', item)}>
            <HStack space={4} alignItems={'center'}>
              <Image
                source={{
                  uri: 'https://wallpaperaccess.com/full/317501.jpg',
                }}
                alt="Alternate Text"
                size="md"
                rounded={'md'}
              />
              <VStack flex={1} space={1}>
                <Text fontWeight={'semibold'} fontSize="sm" numberOfLines={2}>
                  {item.title}
                </Text>
                <Text numberOfLines={1} color={SECONDARY.GREY2} fontSize="xs">
                  {item.company}
                </Text>
                <Text numberOfLines={1} color={SECONDARY.GREY2} fontSize="xs">
                  {item.location}
                </Text>
              </VStack>

              <ChevronRightIcon size={'md'} color={PRIMARY.ORANGE} />
            </HStack>
          </Pressable>
        )}
      />
      {isLoading === true ? (
        <Box flex={1}>
          <Spinner size="lg" />
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

export default Home;
