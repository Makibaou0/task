import React, {useEffect, useState} from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Center,
  Image,
  VStack,
  Text,
  Input,
  SunIcon,
  HStack,
  Pressable,
  Button,
  Box,
  useToast,
} from 'native-base';
import {DATAUSER, PRIMARY, SECONDARY, WW} from '../utils/Statis';
import AnimatedLottieView from 'lottie-react-native';
import {Keyboard} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {saveDataToMMKV} from '../utils/ConfigMMKV';

const Login = route => {
  const Navigation = route.route.navigation;
  const insets = useSafeAreaInsets();
  const [username, setusername] = useState(0);
  const [password, setPassword] = useState('');
  const toast = useToast();
  const handleLogin = () => {
    if (DATAUSER.username === username && DATAUSER.password === password) {
      saveDataToMMKV('isSigned', true);
      Navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}], // Replace 'Home' with the name of the screen you want to navigate to
        }),
      );
    } else {
      toast.show({
        title: 'Username / Password Salah!',
        bg: SECONDARY.RED,
        duration: 800,
      });
    }
  };

  return (
    <Pressable flex={1} onPress={() => Keyboard.dismiss()}>
      <Box
        style={{
          backgroundColor: PRIMARY.BLUE,
          flex: 1,
        }}>
        <Image
          position={'absolute'}
          source={require('../assets/images/BgCard.png')}
          alt="Alternate Text"
          size="full"
        />

        <Box mt={insets.top} size={WW} p={4} space={1}>
          <AnimatedLottieView
            autoPlay
            source={require('../assets/lotties/login.json')}
            loop={false}
          />
          {/* <Text fontWeight={'semibold'} color={PRIMARY} fontSize="xl">
          Login
        </Text>
        <Text numberOfLines={2} color={'gray.400'} fontSize="sm">
          We happy to see you again. To use your account, you must log in first.
        </Text> */}
        </Box>
        <VStack p={4}>
          <VStack mb={5} space={2}>
            <Text fontWeight={'semibold'} color={'white'} fontSize="md">
              Username
            </Text>
            <Input
              onChangeText={TEXT => setusername(TEXT)}
              rounded={'xl'}
              p={5}
              borderWidth={1}
              borderColor={'white'}
              fontSize={'sm'}
              bg={'blue.50'}
              placeholder="Username"
              _focus={{
                backgroundColor: 'blue.50',
                borderColor: PRIMARY,
              }}
            />
          </VStack>
          <VStack mb={10} space={2}>
            <Text fontWeight={'semibold'} color={'white'} fontSize="md">
              Password
            </Text>
            <Input
              onChangeText={TEXT => setPassword(TEXT)}
              rounded={'xl'}
              p={5}
              borderWidth={1}
              borderColor={'white'}
              fontSize={'sm'}
              bg={'blue.50'}
              secureTextEntry
              placeholder="Password"
              _focus={{
                backgroundColor: 'blue.50',
                borderColor: PRIMARY,
              }}
            />
          </VStack>
          <VStack space={5}>
            <Button
              py={4}
              rounded={'xl'}
              bg={PRIMARY.ORANGE}
              colorScheme="blue"
              onPress={() => handleLogin()}>
              <Text fontWeight={'semibold'} color="white" fontSize="lg">
                Login
              </Text>
            </Button>
          </VStack>
        </VStack>
      </Box>
    </Pressable>
  );
};

export default Login;
