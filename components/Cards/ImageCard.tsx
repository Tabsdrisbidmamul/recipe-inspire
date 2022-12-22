import BaseCard from './BaseCard';
import { Image, StyleSheet } from 'react-native';
import { globalStyles } from '../../constants/globalStyles';

interface IProps {
  uri: string;
}

/**
 *
 * @returns
 */
export default function ImageCard({ uri }: IProps) {
  return (
    <BaseCard style={{ paddingHorizontal: 0, paddingVertical: 0 }}>
      <Image
        source={{
          uri,
        }}
        style={styles.image}
      />
    </BaseCard>
  );
}

const styles = StyleSheet.create({
  image: {
    height: undefined,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 12,
    aspectRatio: 135 / 76,
  },
});
