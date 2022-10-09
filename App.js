import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import RecipeInfoScreen from './src/screens/RecipeInfoScreen';
import CommentsScreen from './src/screens/CommentsScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={HomeScreen}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name = "Category" component={CategoryScreen}/>
        <Stack.Screen name = "RecipeInfo" component={RecipeInfoScreen}/>
        <Stack.Screen name= "Comments" component={CommentsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;