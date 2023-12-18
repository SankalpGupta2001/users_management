import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();


    const handleLogin = async () => {
        const userData = {
            email,
            password,
        };

        try {
            const response = await fetch('http://localhost:5000/app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Login successful:', responseData);
                navigation.navigate("Home")

            } else {
                console.error('Login failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: 150, backgroundColor: 'linear-gradient(145deg, #d4d4d4, #ffffff)', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>Login</Text>
            </View>
            <TextInput
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                style={{ borderWidth: 1, borderColor: 'gray', width: '80%', marginBottom: 10, padding: 5 }}
            />
            <TextInput
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={{ borderWidth: 1, borderColor: 'gray', width: '80%', marginBottom: 10, padding: 5 }}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;
