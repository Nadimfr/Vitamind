import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Detect from './screens/Branded/Detect';
import Login from './screens/Unbranded/Login';
import Home from './screens/Branded/Home';
import Register from './screens/Unbranded/Register';
import Onboard from './screens/Unbranded/OnBoard';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import Profile from './screens/Branded/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Appearance from './screens/Branded/Appearance';
import Settings from './screens/Branded/Settings';
import OnBoard from './screens/Unbranded/OnBoard';
import DoctorDetails from './screens/Branded/DoctorDetails';
import Verify from './screens/Unbranded/Verify';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LoggedInTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarVisible: route.name !== 'Appearance', // hide the Appearance screen from the tab bar
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Journal"
        component={Detect}
        options={{
          tabBarLabel: 'Journal',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="notebook-outline" size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Detect"
        component={Detect}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="circle-outline" size={26} />
          ),
          tabBarStyle: { display: 'none' },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Doctors"
        component={Home}
        options={{
          tabBarLabel: 'Doctors',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="doctor" size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={26} />
          ),
          tabBarStyle: { display: 'none' },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [user, setUser] = useState();
  let [fontsLoaded] = useFonts({
    Poppins: require('./assets/fonts/Poppins.ttf'),
    Poppins_SemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    Poppins_Bold: require('./assets/fonts/Poppins-Bold.ttf'),
    Lato: require('./assets/fonts/Lato-Regular.ttf'),
  });

  useEffect(() => {
    getToken();
    console.log('WHATS MY TOKEN => ', token);
  }, [token]);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
      return token;
    } catch (error) {
      console.log('Error getting token:', error);
    }
  };

  const getUser = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      setUser(user);
      return user;
    } catch (error) {
      console.log('Error getting user:', error);
    }
  };

  useEffect(() => {
    getUser();
    console.log('WHos MY USER => ', user);
  }, [user]);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user && (
          <Stack.Screen
            name="Onboard"
            component={OnBoard}
            options={{
              headerShown: false,
              tabBarStyle: {
                display: 'none',
              },
            }}
          />
        )}
        {!token && (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
              tabBarStyle: {
                display: 'none',
              },
            }}
          />
        )}

        {!token && (
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
              tabBarStyle: {
                display: 'none',
              },
            }}
          />
        )}
        {!token && (
          <Stack.Screen
            name="Verify"
            component={Verify}
            options={{
              headerShown: false,
              tabBarStyle: {
                display: 'none',
              },
            }}
          />
        )}

        <Stack.Screen
          name="Home"
          component={LoggedInTabs}
          options={{
            headerShown: false,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Stack.Screen
          name="Appearance"
          component={Appearance}
          options={{
            headerShown: false,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
            tabBarStyle: {
              display: 'none',
            },
          }}
        />
        <Stack.Screen
          name="DoctorDetailed"
          component={DoctorDetails}
          options={{
            headerShown: false,
            tabBarStyle: {},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
