import React, {useState} from 'react';
import {PermissionsAndroid, Platform, Text, View} from 'react-native';

const App = () => {
  const [myContacts, setMyContacts] = useState([]);

  const requestContactPermission = async () => {
    if (Platform.OS === 'ios') {
      console.warn('IOS');

      return true;
    } else {
      console.warn('Android');

      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      ]);

      if (
        granted['android.permission.WRITE_CONTACTS'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.READ_CONTACTS'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <View>
      <Text>App</Text>
    </View>
  );
};

export default App;
