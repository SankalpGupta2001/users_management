import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, Picker, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';


const SignupScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');
  const [hearAbout, setHearAbout] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [password, setPassword] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
  };


  const handleHearAboutChange = (selectedButton) => {
    setHearAbout(selectedButton);
  };

  const handleSignup = async () => {

    if (!isConnected) {
      alert('Please enable Wi-Fi or Mobile Data');

    }


    const userData = {
      name,
      email,
      phone,
      gender,
      hearAbout,
      city,
      state,
      password
    };

    try {
      const response = await fetch('http://localhost:5000/app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log(response);

      if (response.ok) {
        const responseData = await response.json();
        console.log('Signup successful:', responseData);
        navigation.navigate('Home');

      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {!isConnected && <Text style={styles.message}>Please enable Wi-Fi or Mobile Data</Text>}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ width: 150, backgroundColor: 'linear-gradient(145deg, #d4d4d4, #ffffff)', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Sign Up</Text>
        </View>
      </View>
      <TextInput
        placeholder="Name"
        onChangeText={(text) => setName(text)}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          width: 500,
          marginBottom: 10,
          borderRadius: 10,
          padding: 5,
        }}
      />

      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          width: 500,
          marginBottom: 10,
          borderRadius: 10,
          padding: 5,
        }}
      />

      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          width: 500,
          marginBottom: 10,
          borderRadius: 10,
          padding: 5,
        }}
      />

      <TextInput
        placeholder="Phone"
        onChangeText={(text) => setPhone(text)}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          width: 500,
          marginBottom: 10,
          borderRadius: 10,
          padding: 5,
        }}
      />


      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
        <View style={{ alignItems: 'flex-start' }}>
          <Text>Please select your gender:</Text>
          <RadioButton.Group onValueChange={handleGenderChange} value={gender}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <RadioButton value="Male" />
              <Text>Male</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <RadioButton value="Female" />
              <Text>Female</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <RadioButton value="Other" />
              <Text>Other</Text>
            </View>
          </RadioButton.Group>
        </View>

        <View style={{ width: 300 }}></View>

        <View style={{ alignItems: 'flex-start' }}>
          <Text>How did you hear about this?</Text>
          <RadioButton.Group onValueChange={handleHearAboutChange} value={hearAbout}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <RadioButton value="LinkedIn" />
              <Text>LinkedIn</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <RadioButton value="Friends" />
              <Text>Friends</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <RadioButton value="Job Portal" />
              <Text>Job Portal</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <RadioButton value="Others" />
              <Text>Others</Text>
            </View>
          </RadioButton.Group>
        </View>
      </View>


      <Picker
        selectedValue={city}
        onValueChange={(itemValue) => setCity(itemValue)}
        style={{
          width: 500,
          marginBottom: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: 'gray',
          padding: 5,
        }}
      >
        <Picker.Item label="Select City" value="" />
        <Picker.Item label="Mumbai" value="Mumbai" />
        <Picker.Item label="Pune" value="Pune" />
        <Picker.Item label="Ahmedabad" value="Ahmedabad" />
      </Picker>
      <TextInput
        placeholder="State"
        onChangeText={(text) => setState(text)}
        style={{
          borderWidth: 1,
          borderColor: 'gray',
          width: 500,
          marginBottom: 10,
          borderRadius: 10,
          padding: 5,
        }}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 300 }}>
        <Button title="Sign Up" onPress={handleSignup} style={{ flex: 1 }} />
        <View style={{ width: 30 }} />
        <Text >Already have an account</Text>

        <Button title="Login" onPress={() => navigation.navigate('Login')} style={{ flex: 1 }} />
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default SignupScreen;
