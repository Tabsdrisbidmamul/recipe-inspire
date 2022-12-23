import BaseCard from './BaseCard';
import { Image, ImageBackground, StyleSheet, View, Text } from 'react-native';
import { globalStyles } from '../../constants/globalStyles';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import colors from '../../constants/colors';

interface IProps {
  uri: string;
  readyInMinutes: number;
  servings: number;
  title: string;
}

/**
 *
 * @returns
 */
export default function ImageCard({ uri, readyInMinutes, servings, title }: IProps) {
  return (
    <View style={styles.imageContainer}>
      <ImageBackground source={{ uri }} imageStyle={{ borderRadius: 12 }} style={styles.image}>
        <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.9)']} style={styles.gradient} locations={[0.7, 1]} />
      </ImageBackground>

      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.header}>{title}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: -10, justifyContent: 'flex-end' }}>
          <Text style={styles.text}>Ready in {readyInMinutes} minutes</Text>
          <View style={styles.circle}></View>
          <Text style={styles.text}>Servings {servings}</Text>
        </View>
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
  },
  circle: {
    ...globalStyles.circle,
    marginHorizontal: 10,
    marginTop: 10,
    width: 6,
    height: 6,
  },
});
