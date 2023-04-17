// In App.js in a new project

import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Detect from "./screens/Branded/Detect";
import Login from "./screens/Unbranded/Login";
import Home from "./screens/Branded/Home";
import Register from "./screens/Unbranded/Register";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import Profile from "./screens/Branded/Profile";

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Details")}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push("Details")}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function App() {
  let [fontsLoaded] = useFonts({
    Poppins: require("./assets/fonts/Poppins.ttf"),
    Poppins_SemiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    Poppins_Bold: require("./assets/fonts/Poppins-Bold.ttf"),
    Lato: require("./assets/fonts/Lato-Regular.ttf"),
  });
  const [loggedIn, setLoggedIn] = useState(true);
  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      {!loggedIn ? (
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              display: "none",
            },
            headerShown: false,
          }}
        >
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Register" component={Register} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "blue",
            tabBarLabelStyle: {
              // fontWeight: "800",
            },
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" size={26} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Journal"
            component={DetailsScreen}
            options={{
              tabBarLabel: "Journal",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="notebook-outline" size={26} />
              ),
            }}
          />
          <Tab.Screen
            name=" "
            component={Detect}
            options={{
              tabBarStyle: { display: "none" },
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="circle-outline" size={30} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Doctors"
            component={DetailsScreen}
            options={{
              tabBarLabel: "Doctors",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="doctor" size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" size={26} />
              ),
              headerShown: false,
              tabBarStyle: {
                display: "none",
              },
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
