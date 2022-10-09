import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Button,
  FlatList
} from 'react-native';

function CategoryScreen({route, navigation: {navigate}}){
    const{id, title, recipes} = route.params;
    console.log(route.params);
    return(
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
           <Text>{title}</Text>
           <FlatList
                data={recipes}
                renderItem={({item}) => (
                    <Button 
                    title = {item.title}
                    onPress = {() => navigate('RecipeInfo', item)}
                    />
                )}
                
           ></FlatList>
           <Button 
           title="View Comments " 
           onPress = {() => navigate('Comments', {id: id, title: 'categoryComments'})
          }
          />
       </SafeAreaView>
    )
}
export default CategoryScreen;