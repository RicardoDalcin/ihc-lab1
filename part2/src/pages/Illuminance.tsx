import { LightSensor } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export const Illuminance = () => {
  const [{ illuminance }, setData] = useState({ illuminance: 0 });

  const [subscription, setSubscription] = useState(null);

  const _subscribe = () => {
    setSubscription(LightSensor.addListener(setData));
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
        Luminosidade
      </Text>

      <View className="flex flex-row w-full flex-1">
        <TextInput
          className="flex-1 h-10 border border-neutral-500 rounded-lg px-3"
          editable={false}
          value={`${illuminance.toFixed(2)} lx`}
        />
      </View>
    </View>
  );
};
