import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, TextInput, Button, Snackbar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';





const DashboardScreen = () => {
    const [usersData, setUsersData] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('');





    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                let storedData = await AsyncStorage.getItem('usersData');


                const response = await fetch('http://localhost:5000/app/users');

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                storedData = JSON.stringify(data.users);
                await AsyncStorage.setItem('usersData', storedData);


                setUsersData(JSON.parse(storedData));
                setFilteredUsers(JSON.parse(storedData));
                console.log(JSON.parse(storedData));
            } catch (error) {
                console.error('Error fetching data:', error);

            }
        };

        fetchUsersData();
    }, []);




    useEffect(() => {
        applySorting();
    }, [sortOption, usersData]);

    const applySorting = () => {
        let sortedUsers = [...usersData];


        switch (sortOption) {
            case 'A-Z':
                sortedUsers.sort((a, b) => a.userName.localeCompare(b.userName));
                break;
            case 'Z-A':
                sortedUsers.sort((a, b) => b.userName.localeCompare(a.userName));
                break;
            case 'Last Modified':
                break;
            case 'Last Inserted':
                break;
            default:
                break;
        }

        if (searchQuery !== '') {
            sortedUsers = sortedUsers.filter((user) =>
                user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.phone.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredUsers(sortedUsers);
    };


    const handleSearch = (query) => {
        setSearchQuery(query);


        const filtered = usersData.filter((user) =>
            user.userName.toLowerCase().includes(query.toLowerCase()) || // Search by name
            user.email.toLowerCase().includes(query.toLowerCase()) || // Search by email
            user.phone.toLowerCase().includes(query.toLowerCase()) // Search by phone
        );
        setFilteredUsers(filtered);

    };

    const handleSort = (option) => {
        setSortOption(option);
    };



    const navigation = useNavigation();

    const handleUpdate = (employeeId) => {
        navigation.navigate('UsersUpdate', { id: employeeId });

    }
    useEffect(() => {
        const loadFilterSettings = async () => {
            try {
                const savedSearchQuery = await AsyncStorage.getItem('searchQuery');
                const savedSortOption = await AsyncStorage.getItem('sortOption');

                if (savedSearchQuery) setSearchQuery(savedSearchQuery);
                if (savedSortOption) setSortOption(savedSortOption);
            } catch (error) {
                console.error('Error loading filter settings:', error);
            }
        };

        loadFilterSettings();
    }, []);

    useEffect(() => {
        const saveFilterSettings = async () => {
            try {
                await AsyncStorage.setItem('searchQuery', searchQuery);
                await AsyncStorage.setItem('sortOption', sortOption);
            } catch (error) {
                console.error('Error saving filter settings:', error);
            }
        };

        saveFilterSettings();
    }, [searchQuery, sortOption]);




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


    const handleDetails = (employeeId) => {
        navigation.navigate('DetailUser', { id: employeeId });
    };

    const navigateToNewUser = () => {
        navigation.navigate('NewUser');
    };





    return (
        <div>

            <TextInput
                placeholder="Search by Name, Email, or Phone"
                onChangeText={handleSearch}
                value={searchQuery}
                style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    marginBottom: 10,
                    padding: 5,
                    width: 300, // Set width to 300px
                    borderRadius: 10, // Set border radius for rounded corners
                    float: 'right'
                }}
            />

            <Button title="Add User" onPress={navigateToNewUser} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 40 }}>
                <View style={{ width: 150, backgroundColor: 'linear-gradient(145deg, #d4d4d4, #ffffff)', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>User Details</Text>
                </View>
            </View>

            {filteredUsers.length !== 0 ?
                <div>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                        <TouchableOpacity onPress={() => handleSort('A-Z')}>
                            <Text>A-Z</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSort('Z-A')}>
                            <Text>Z-A</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSort('Last Modified')}>
                            <Text>Last Modified</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleSort('Last Inserted')}>
                            <Text>Last Inserted</Text>
                        </TouchableOpacity>
                    </View>

                    <table style={{ borderCollapse: 'collapse', width: '90%', margin: 'auto' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#ccc' }}>
                                <th>S.no</th>
                                <th>UserName</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Update</th>
                                <th>Delete</th>
                                <th>Details</th>
                            </tr>

                        </thead>
                        <tbody>
                            {filteredUsers.map((employee, index) => (

                                <tr key={employee._id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff', padding: '10px' }}>
                                    <td style={{ padding: '15px' }}>{index + 1}</td>
                                    <td style={{ padding: '15px' }}>{employee.userName}</td>
                                    <td >{employee.email}</td>
                                    <td style={{ padding: '15px' }}>{employee.phone}</td>
                                    <td>
                                        <button key={employee._id} onClick={() => handleUpdate(employee._id)} style={{ padding: '15px', background: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }}>
                                            <Text>Update</Text>
                                        </button>

                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <button onClick={() => handleDelete(employee._id)} style={{ padding: '15px', background: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }}>Delete</button>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <button key={employee._id} onClick={() => handleDetails(employee._id)} style={{ padding: '15px', background: '#f44336', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }}>
                                            <Text>Details</Text>
                                        </button>

                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                :
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: 150, backgroundColor: 'linear-gradient(145deg, #d4d4d4, #ffffff)', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20, textAlign: 'center' }}>No Data Found</Text>
                    </View>
                </View>

            }

        </div>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
});

export default DashboardScreen;
