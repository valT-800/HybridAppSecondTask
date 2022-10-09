import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Button,
  ViewComponent
} from 'react-native';
import CommentsScreen from './CommentsScreen';

function RecipeInfoScreen({route, navigation: {navigate}}) {
    const { id, title, description, comments } = route.params;
    console.log(route.params);
    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
           <Text>{title}</Text>
           <Text>{description}</Text>
           <Button 
           title="View Comments " 
           onPress = {() => navigate('Comments', {id: id, title: 'recipeComments'})
          }
          />
       </SafeAreaView>
    )
}

export default RecipeInfoScreen;