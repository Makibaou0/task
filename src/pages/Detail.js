import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Box,
  ChevronLeftIcon,
  HStack,
  Pressable,
  ScrollView,
  Text,
  VStack,
  Image,
} from 'native-base';
import {PRIMARY, SECONDARY, WW} from '../utils/Statis';
import {Linking} from 'react-native';
import RenderHTML from 'react-native-render-html';

const Detail = route => {
  const Navigation = route.route.navigation;
  const params = route.route.route.params;
  const inset = useSafeAreaInsets();

  return (
    <Box flex={1}>
      <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        bg={PRIMARY.BLUE}
        px={5}
        pt={inset.top}>
        <Pressable
          size={22}
          justifyContent={'center'}
          onPress={() => Navigation.goBack()}>
          <ChevronLeftIcon color={'white'} size={'md'} />
        </Pressable>
        <Text py={5} color={'white'} fontSize="lg">
          Job Detail
        </Text>
        <Box size={22} />
      </HStack>
      <ScrollView
        p={5}
        contentContainerStyle={{
          paddingBottom: inset.bottom + 100,
        }}>
        <VStack space={2}>
          <Text fontWeight={'semibold'} fontSize="md">
            Company
          </Text>

          <HStack space={2} borderWidth={1} bg="white" p="2" rounded="lg">
            <Image
              source={{
                uri: 'https://wallpaperaccess.com/full/317501.jpg',
              }}
              alt="Alternate Text"
              size="md"
              rounded="md"
            />
            <VStack space={1} flex={1}>
              <Text fontWeight={'semibold'} numberOfLines={1} fontSize="md">
                {params.company}
              </Text>
              <Text numberOfLines={1} fontSize="sm">
                {params.location}
              </Text>
              <Pressable
                onPress={() => {
                  Linking.openURL(params.company_url);
                }}>
                <Text
                  textDecorationLine={'underline'}
                  color={PRIMARY.BLUE}
                  numberOfLines={1}
                  fontSize="sm">
                  Go to website
                </Text>
              </Pressable>
            </VStack>
          </HStack>
        </VStack>
        <VStack space={2} mt={5}>
          <Text fontWeight={'semibold'} fontSize="md">
            Job Spesification
          </Text>
          <VStack p={2} borderWidth={1} bg="white" rounded="md" space={5}>
            <VStack space={1} flex={1}>
              <Text
                color={SECONDARY.GREY1}
                fontWeight={'semibold'}
                numberOfLines={1}
                fontSize="md">
                Title
              </Text>
              <Text numberOfLines={1} fontSize="sm">
                {params.title}
              </Text>
            </VStack>
            <VStack space={1} flex={1}>
              <Text
                color={SECONDARY.GREY1}
                fontWeight={'semibold'}
                numberOfLines={1}
                fontSize="md">
                Fulltime
              </Text>
              <Text numberOfLines={1} fontSize="sm">
                {params.type === 'Full Time' ? 'Yes' : 'Remote'}
              </Text>
            </VStack>
            <VStack space={1} flex={1}>
              <Text
                color={SECONDARY.GREY1}
                fontWeight={'semibold'}
                numberOfLines={1}
                fontSize="md">
                Description
              </Text>
              <RenderHTML
                contentWidth={WW}
                source={{html: `${params.description}`}}
              />
            </VStack>
          </VStack>
        </VStack>
      </ScrollView>
    </Box>
  );
};

export default Detail;
