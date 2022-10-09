import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Button, Text, TextInput, ViewComponent, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';
import jsonFile from '../../Data.json';

function CommentsScreen({route, navigation}){
    const {id, title} = route.params;
    const data = title+id
    const [initialElements, setInitialElements] = useState([]);
    const [retrieve, setRetrieve] = useState(true);
    const [author, setAuthor] = useState('val');
    const [text, setText] = useState('tekstas');
    const [categorieID, setCategorieID] = useState('');
    const [recipeID, setRecipeID] = useState('');
    const [visibility, setVisibility] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const retrieveData = async () => {
            try {
                const valueString = await AsyncStorage.getItem(data);
                const value = JSON.parse(valueString);
                console.log('retrieve: ', valueString);
                //setInitialElements(value);
                value === null ? setInitialElements([]) : setInitialElements(value);
            } catch(error) {
                console.log(error);
            }
        }
        if (retrieve)
        retrieveData();
        setRetrieve(false);
    }, [retrieve])

    const saveComment = async (author, text) => {
        try {
            console.log('author', author);
            const newObj = {
            id: uuid.v4(),
            author: author,
            text: text
            }
            console.log('55: ' , newObj)
            console.log('56: ', initialElements)
            const jsonValue = JSON.stringify([...initialElements, newObj]);
            console.log(jsonValue)
            await AsyncStorage.setItem(data, jsonValue);
            setInitialElements(JSON.parse(jsonValue));
            console.log('yes');
          
        } catch (e) {
          console.log('Can not save value');
        }
    }
    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(data);
            console.log('Get data: ', jsonValue);
            setInitialElements(JSON.parse(jsonValue));
            jsonValue === null ? setInitialElements([]) : setInitialElements(JSON.parse(jsonValue));
        } catch (e) {
          console.log('Can not read data');
        }
    }

    const removeComment = async (id) => {
        try {
          const posts = await AsyncStorage.getItem(data);
          let postsFav = JSON.parse(posts);
          const postsItems = postsFav.filter(function(e){ return e.id !== id });
          
          const jsonValue = JSON.stringify(postsItems);
          setInitialElements(JSON.parse(jsonValue));
          console.log(jsonValue)
          await AsyncStorage.setItem(data, jsonValue);
          console.log('Item was deleted')
        } catch(error) {
          console.log('error: ', error);
        }}; 

    const clearAll = async () => {
        try {
          await AsyncStorage.clear();
          const emptyArray = [];
          setInitialElements(emptyArray);
        } catch (e) {
    
        }
    }

    const renderItem = ({item}) => {
        return(
            <TouchableOpacity 
                onPress = {() => 
                {
                    setSelectedItem(item)
                }}
                >
                <Text>{item.author}</Text>
                <Text>{item.text}</Text>
                <Text>____________________________</Text>
                               
            </TouchableOpacity>
            
                            
        )               
    }
    return(
    <SafeAreaView style={{flex: 2, alignItems: 'flex-start', justifyContent: 'center'}}>          
        <Text>Comments: </Text>
        {(() => {
            if(selectedItem!=null){ 
                return <Button title = "Delete" onPress={() => 
                    {
                        removeComment(selectedItem.id)
                        setSelectedItem(null)
                    }
                    
                }/> 
            }
              
            return null;
        })()}          
        <FlatList
            data={initialElements}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
        <Text>Your comment: </Text>
        <TextInput
            style={{ height: 40 }}
            placeholder="Type your comment here"
            defaultValue={text}
            onChangeText={(value) => setText(value)}
        />
        <Button title = "Save comment" onPress = {() => saveComment(author, text)}/>
        
    </SafeAreaView>
    )
}
export default CommentsScreen;