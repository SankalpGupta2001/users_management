import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const NewUser = () => {
    const [userName, setuserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const navigation = useNavigation();

    const handleCreateUser = async () => {
        const userData = {
            userName,
            email,
            phone
        };

        try {
            const response = await fetch('http://localhost:5000/app/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            console.log(response);

            if (response.ok) {
                let storedData = await AsyncStorage.getItem('usersData');
                storedData = storedData ? JSON.parse(storedData) : [];

                storedData.push(userData);
                await AsyncStorage.setItem('usersData', JSON.stringify(storedData));

                navigation.navigate('Home');
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Add New User</Text>

            <TextInput
                placeholder="Name"
                value={userName}
                onChangeText={text => setuserName(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={text => setEmail(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Phone"
                value={phone}
                onChangeText={text => setPhone(text)}
                style={styles.input}
            />


            <Button title="Submit" onPress={handleCreateUser} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        padding: 5,
    },
});

export default NewUser;
