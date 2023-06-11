import { Magnetometer as MagnetometerSensor } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { Text, TextInput, View } from 'react-native';

export const Magnetometer = () => {
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(MagnetometerSensor.addListener(setData));
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);

  return (
    <View className="flex px-3 py-4 mt-8">
      <Text className="text-2xl font-medium text-neutral-700 mb-4">
        Magnetômetro
      </Text>

      <View className="flex flex-row w-full flex-1">
        <TextInput
          className="flex-1 mr-3 h-10 border border-neutral-500 rounded-lg px-3"
          editable={false}
          value={`x: ${x.toFixed(2)}`}
        />

        <TextInput
          className="flex-1 mr-3 h-10 border border-neutral-500 rounded-lg px-3"
          editable={false}
          value={`y: ${y.toFixed(2)}`}
        />

        <TextInput
          className="flex-1 h-10 border border-neutral-500 rounded-lg px-3"
          editable={false}
          value={`z: ${z.toFixed(2)}`}
        />
      </View>
    </View>
  );
};
