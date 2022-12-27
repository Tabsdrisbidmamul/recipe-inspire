import BaseCard from './BaseCard';
import { Image, ImageBackground, StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native';
import { globalStyles } from '../../constants/globalStyles';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../constants/colors';
import { AntDesign } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import Animated from 'react-native-reanimated';
import { ingredientsMode } from '../../types/ingredientsMode.types';

interface IProps {
  uri: string;
  readyInMinutes: number;
  servings: number;
  title: string;
  showInformation?: boolean;
  mode?: ingredientsMode;
  style?: StyleProp<ViewStyle>;
}

const slideLeft = {
  0: {
    translateX: 20,
  },
  to: {
    translateX: 0,
  },
};

const slideRight = {
  from: {
    translateX: -20,
  },
  to: {
    translateX: 0,
  },
};

/**
 * Drop fade effect for image cards
 * @returns
 */
export default function ImageCard({
  uri,
  readyInMinutes,
  servings,
  title,
  showInformation = true,
  mode = 'include',
  style,
}: IProps) {
  return (
    <View style={[styles.imageContainer, style]}>
      <ImageBackground source={{ uri }} imageStyle={{ borderRadius: 12 }} style={styles.image}>
        <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.9)']} style={styles.gradient} locations={[0.7, 1]} />
      </ImageBackground>

      <View style={[styles.contentContainer, !showInformation ? { maxWidth: undefined, width: '100%' } : null]}>
        <Animated.View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {!showInformation && mode === 'include' ? (
            <Animatable.View
              animation={slideLeft}
              iterationCount="infinite"
              direction="alternate"
              style={[styles.animatedView, styles.animatedText, styles.animatedTextLeft]}
            >
              <AntDesign name="arrowleft" size={24} style={styles.icon} />
              <Text style={styles.text}>remove</Text>
            </Animatable.View>
          ) : null}

          <Text style={[styles.header, mode === 'include' ? styles.headerRight : styles.headerLeft]}>{title}</Text>

          {!showInformation && mode === 'not-include' ? (
            <Animatable.View
              animation={slideRight}
              iterationCount="infinite"
              direction="alternate"
              style={[styles.animatedView, styles.animatedText, styles.animatedTextRight]}
            >
              <Text style={styles.text}>add</Text>
              <AntDesign name="arrowright" size={24} style={styles.icon} />
            </Animatable.View>
          ) : null}
        </Animated.View>
        {showInformation ? (
          <View style={{ flexDirection: 'row', marginTop: -10, justifyContent: 'flex-end' }}>
            <Text style={styles.text}>Ready in {readyInMinutes} minutes</Text>
            <View style={styles.circle}></View>
            <Text style={styles.text}>Servings {servings}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 12,
    position: 'relative',
    ...globalStyles.shadows,
    overflow: 'hidden',
  },
  image: {
    height: 'auto',
    width: '100%',
    resizeMode: 'cover',
    aspectRatio: 135 / 76,
    borderRadius: 12,
  },
  gradient: {
    height: '100%',
    width: '100%',
    borderRadius: 12,
  },
  contentContainer: {
    position: 'absolute',
    bottom: 10,
    right: 15,
    justifyContent: 'center',
    maxWidth: 300,
  },
  text: {
    ...globalStyles.baseText,
    color: colors.whites.pastel,
    fontFamily: 'nunito-medium',
    fontSize: 15,
  },
  header: {
    ...globalStyles.headerH2,
    color: colors.whites.pastel,
    textAlign: 'right',

    marginLeft: 'auto',
  },
  headerLeft: {
    textAlign: 'left',
    marginLeft: 30,
    marginRight: 'auto',
  },
  headerRight: {
    textAlign: 'right',
    marginLeft: 'auto',
    marginRight: 0,
  },
  circle: {
    ...globalStyles.circle,
    marginHorizontal: 10,
    marginTop: 10,
    width: 6,
    height: 6,
  },
  icon: {
    color: colors.whites.pastel,
    marginHorizontal: 5,
  },
  animatedView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  animatedText: {
    marginTop: 10,
  },
  animatedTextLeft: {
    marginLeft: 30,
  },
  animatedTextRight: {
    marginRight: 10,
  },
});
