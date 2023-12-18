import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const UpdateScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params;


    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/app/users/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await response.json();
                console.log(data);
                setUserName(data.userName);
                setEmail(data.email);
                setPhone(data.phone);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:5000/app/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, email, phone }),
            });
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Update Employee Details</Text>
            <TextInput
                value={userName}
                onChangeText={(text) => setUserName(text)}
                placeholder="UserName"
                style={styles.input}
            />
            <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
                style={styles.input}
            />
            <TextInput
                value={phone}
                onChangeText={(text) => setPhone(text)}
                placeholder="Phone"
                keyboardType="numeric"
                style={styles.input}
            />
            <Button title="Update" onPress={handleUpdate} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        width: '80%',
        marginBottom: 20,
        padding: 10,
    },
});

export default UpdateScreen;
