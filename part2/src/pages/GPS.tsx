import { LightSensor } from 'expo-sensors';
import { useEffect, useState } from 'react';
import { Platform, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import * as Location from 'expo-location';

export const GPS = () => {
  const [location, setLocation] = useState<Location.LocationObject>(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setIsLoading(false);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View className="flex px-3 py-4 mt-8">
      <Text className="text-2xl font-medium text-neutral-700 mb-4">
        Localização
      </Text>

      <View className="flex flex-row w-full flex-1">
        <TextInput
          className="flex-1 h-10 border border-neutral-500 rounded-lg px-3 mr-3"
          editable={false}
          value={
            isLoading
              ? 'Carregando...'
              : `Latitude ${location?.coords?.latitude}`
          }
        />

        <TextInput
          className="flex-1 h-10 border border-neutral-500 rounded-lg px-3"
          editable={false}
          value={
            isLoading
              ? 'Carregando...'
              : `Longitude ${location?.coords?.longitude}`
          }
        />
      </View>
    </View>
  );
};
