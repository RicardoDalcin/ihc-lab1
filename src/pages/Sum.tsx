import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export const Sum = () => {
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');

  const [firstNumber, setFirstNumber] = useState<number | null>(null);
  const [secondNumber, setSecondNumber] = useState<number | null>(null);

  const calculateResult = useCallback(() => {
    if (Number.isNaN(firstNumber) || Number.isNaN(secondNumber)) {
      setError('Você precisa digitar apenas números');
      setResult(null);
      return;
    }

    setError('');
    setResult(firstNumber + secondNumber);
  }, [firstNumber, secondNumber]);

  return (
    <View className="flex flex-1 items-center gap-3 py-8 px-4">
      <TextInput
        className="w-full h-10 border border-neutral-500 rounded-lg px-3"
        placeholder="Digite o primeiro número"
        keyboardType="numeric"
        onChangeText={(text) => setFirstNumber(Number(text))}
      />

      <TextInput
        className="w-full h-10 border border-neutral-500 rounded-lg px-3"
        placeholder="Digite o segundo número"
        keyboardType="numeric"
        onChangeText={(text) => setSecondNumber(Number(text))}
      />

      <TouchableOpacity
        onPress={calculateResult}
        className="bg-neutral-300 w-full h-10 flex justify-center items-center rounded-lg"
      >
        <Text>Calcular</Text>
      </TouchableOpacity>

      {result !== null && <Text>Resultado: {result}</Text>}
      {error && <Text>{error}</Text>}

      <StatusBar style="auto" />
    </View>
  );
};
