import React from 'react';
import { StyleSheet, Text, FlatList, Button } from 'react-native';
import { SafeAreaView } from 'react-native';
import data from '../../Data.json';

function HomeScreen({navigation: { navigate }}) {
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
           <Text>Receptai</Text>
           <FlatList
                data={data.categories}
                renderItem={({item}) => (
                    <Button 
                    title = {item.title}
                    onPress = {() => navigate('Category', item)}
                />
                )}
           ></FlatList>
       </SafeAreaView>
    )
}

export default HomeScreen;