import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';


import { useNavigation, useRoute } from '@react-navigation/native';

const DetailUser = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { id } = route.params; 
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/app/users/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserDetails();
    }, [id]);

    const handleUpdate = () => {
        navigation.navigate('UsersUpdate', { id }); 
    };

    const handleDelete = async (userId) => {
        const confirmation = window.confirm('Are you sure you want to delete this user?');
        if (confirmation) {
          try {
            const response = await fetch(`http://localhost:5000/app/users/${userId}`, {
              method: 'DELETE',
            });
            if (!response.ok) {
              throw new Error('Failed to delete user');
            }
      
            let storedData = await AsyncStorage.getItem('usersData');
            storedData = JSON.parse(storedData);
            storedData = storedData.filter(user => user.id !== userId);
            await AsyncStorage.setItem('usersData', JSON.stringify(storedData));
      
            navigation.navigate('Home');
          } catch (error) {
            console.error('Error deleting user:', error);
          }
        } else {
          alert('Deletion cancelled');
        }
      };
  

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>User Details</Text>
            {user ? (
                <View>
                    <Text>User ID: {user._id}</Text>
                    <Text>User Name: {user.userName}</Text>
                    <Text>Email: {user.email}</Text>
                    <Text>Phone: {user.phone}</Text>
                    <View style={styles.btnContainer}>
                        <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
                            <Text>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteBtn} onClick={confirmDelete}>
                            <Text>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <Text>Loading...</Text>
            )}

            

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
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    updateBtn: {
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    deleteBtn: {
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        marginBottom: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },

});

export default DetailUser;
