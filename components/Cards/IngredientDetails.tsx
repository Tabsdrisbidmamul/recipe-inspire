import BaseCard from './BaseCard';
import { Step } from '../../interfaces/results.interface';
import { useLayoutEffect, useState } from 'react';
import { Text } from 'react-native';

interface IProps {
  steps: Step[];
}

export default function IngredientDetails({ steps }: IProps) {
  const [ingredients, setIngredients] = useState<string[]>([]);

  useLayoutEffect(() => {
    steps.forEach((step) => {});
  }, [steps]);

  return (
    <BaseCard>
      <Text>afdwd</Text>
    </BaseCard>
  );
}
