import React, {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, Text, View} from 'react-native';
import Contacts from 'react-native-contacts';

const App = () => {
  const [myContacts, setMyContacts] = useState([]);

  useEffect(() => {
    getContacts();
  }, []);

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

  const getContacts = async () => {
    const resultPermission = requestContactPermission();

    if (resultPermission) {
      try {
        const contractList = await Contacts.getAll();

        setMyContacts(contractList);
      } catch (err) {
        console.log('Contacts Error ===> ', err);
      }
    }
  };

  console.log('myContacts ===> ', myContacts);
  return (
    <View>
      <Text>React Native Address Access</Text>
    </View>
  );
};

export default App;
