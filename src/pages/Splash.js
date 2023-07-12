import {Box, Image, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Animated} from 'react-native';
import {getDataFromMMKV, saveDataToMMKV} from '../utils/ConfigMMKV';
import {PRIMARY} from '../utils/Statis';
import {CommonActions} from '@react-navigation/native';

const Splash = route => {
  const Navigation = route.route.navigation;
  const [text, setText] = useState('');
  const [opacity] = useState(new Animated.Value(0));

  useEffect(() => {
    animateText();
  }, []);

  const animateText = () => {
    const isSigned = getDataFromMMKV('isSigned');
    const message = 'Dansmultipro App';

    let index = 0;
    const typingInterval = setInterval(() => {
      setText(message.substring(0, index));
      index++;
      if (index > message.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          if (isSigned == true) {
            Navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Home'}], // Replace 'Home' with the name of the screen you want to navigate to
              }),
            );
          } else {
            Navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'Login'}], // Replace 'Home' with the name of the screen you want to navigate to
              }),
            );
          }
        }, 500); // Mengatur timeout sesuai dengan kebutuhan Anda
      }
    }, 100);

    Animated.timing(opacity, {
      toValue: 1,
      duration: message.length * 10, // Mengatur durasi animasi sesuai panjang teks
      useNativeDriver: true,
    }).start(() => {});
  };
  return (
    <Box
      bg={PRIMARY.BLUE}
      flex={1}
      alignItems={'center'}
      justifyContent={'center'}>
      <Image
        position={'absolute'}
        source={require('../assets/images/BgCard.png')}
        alt="Alternate Text"
        size="full"
      />
      <Animated.View fad>
        <Animated.Text style={{opacity}}>
          <Text fontWeight={'semibold'} color="white" fontSize="xl">
            {text}
          </Text>
        </Animated.Text>
      </Animated.View>
    </Box>
  );
};

export default Splash;
