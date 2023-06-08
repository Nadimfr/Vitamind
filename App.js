import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
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
import JournalGeneral from './screens/Branded/JournalGeneral';
import Journals from './screens/Branded/Journals';
import Recommender from './screens/Branded/Recommender';
import Questionary from './screens/Branded/Questionary';
import History from './screens/Branded/History';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

LogBox.ignoreAllLogs(true);

function LoggedInTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarVisible: route.name !== 'Appearance', // hide the Appearance screen from the tab bar
        tabBarStyle: {
          backgroundColor: '#42A45C',
          // borderTopWidth: 3,
          // borderTopColor: '#142F21',
          shadowColor: 'green',
          shadowOffset: { width: 0, height: -5 },
          shadowOpacity: 0.1,
          shadowRadius: 1,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabelStyle: { color: 'white', fontFamily: 'Poppins_SemiBold' },
          tabBarIconStyle: { marginTop: 10 },
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons color="white" name="home" size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Journals"
        component={Journals}
        options={{
          tabBarLabelStyle: { color: 'white', fontFamily: 'Poppins_SemiBold' },
          tabBarIconStyle: { marginTop: 10 },
          tabBarLabel: 'Journals',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              color="white"
              name="notebook-outline"
              size={26}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Detect"
        component={Detect}
        options={{
          tabBarLabel: 'V',
          // tabBarLabelStyle: { display: 'none' },
          // tabBarIcon: ({ color }) => (
          //   <MaterialCommunityIcons
          //     color="white"
          //     name="circle-outline"
          //     size={50}
          //   />
          // ),
          tabBarLabelStyle: {
            fontSize: 40,
            fontFamily: 'Poppins_SemiBold',
            color: 'white',
          },
          tabBarIconStyle: { display: 'none' },
          tabBarStyle: { display: 'none' },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarStyle: { display: 'none' }, //to be removed
          tabBarLabelStyle: { color: 'white', fontFamily: 'Poppins_SemiBold' },
          tabBarIconStyle: { marginTop: 10 },
          tabBarLabel: 'History',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons color="white" name="history" size={26} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabelStyle: { color: 'white', fontFamily: 'Poppins_SemiBold' },
          tabBarIconStyle: { marginTop: 10 },
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons color="white" name="account" size={26} />
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
    token && setLoggedIn(true);
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
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            gestureEnabled: false,
          }}
        >
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

          {!loggedIn && (
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

          {!loggedIn && (
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

          {!loggedIn && (
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
            name="Journal"
            component={JournalGeneral}
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
            name="Recommender"
            component={Recommender}
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
    </>
  );
}

export default App;
