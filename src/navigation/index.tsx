/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  // conditionally render the AuthNavigator or the AppNavigator
  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // TODO: add auth functionality
  // React.useEffect(() => {
  //   Auth.currentAuthenticatedUser()
  //     .then(() => setIsLoggedIn(true))
  //     .catch(() => setIsLoggedIn(false))
  //     .finally(() => setIsLoading(false));
  // }, []);
  if (isLoading) {
    return null;
  }
  return (
    <Stack.Navigator>
      {isLoggedIn ? (
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      ) : (
      <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
      )}
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * Auth stack navigator is used for displaying login and signup screens.
 */
 const AuthStack = createNativeStackNavigator<RootStackParamList>();

  function AuthNavigator() {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <AuthStack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
      </AuthStack.Navigator>
    );
  }


/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function getInitialRouteName(isAuthenticated: boolean) {
  return isAuthenticated ? 'TabOne' : 'Login';
}

function BottomTabNavigator({ navigation }: { navigation: any}) {
  const colorScheme = useColorScheme();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  // TODO: add auth functionality
  // React.useEffect(() => {
  //   async function checkAuth() {
  //     try {
  //       await Auth.currentAuthenticatedUser();
  //       setIsAuthenticated(true);
  //     } catch (err) {
  //       console.log('Not signed in', err);
  //     }
  //   }

  //   checkAuth();
  // }, []);

  // const handleLogout = async () => {
  //   try {
  //     await Auth.signOut();
  //     setIsAuthenticated(false);
  //   } catch (error) {
  //     console.log('Error signing out: ', error);
  //   }
  // };

  return (
    <BottomTab.Navigator
      initialRouteName={getInitialRouteName(isAuthenticated)}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      {isAuthenticated ? (
        <>
          <BottomTab.Screen
            name="TabOne"
            component={TabOneScreen}
            options={{
              title: 'Tab One',
              tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
              headerRight: () => (
                <Pressable
                  onPress={() => navigation.navigate('Modal')}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.5 : 1,
                  })}>
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme].text}
                    style={{ marginRight: 15 }}
                  />
                </Pressable>
              ),
            }}
          />
          <BottomTab.Screen
            name="TabTwo"
            component={TabTwoScreen}
            options={{
              title: 'Tab Two',
              tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
            }}
          />
          {/* <BottomTab.Screen
            name="Logout"
            component={() => <Text onPress={handleLogout}>Logout</Text>}
          /> */}
        </>
      ) : (
        <>
          <BottomTab.Screen
            name="Login"
            component={Login}
            options={{ title: 'Login', tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} /> }}
          />
          <BottomTab.Screen
            name="Signup"
            component={Signup}
            options={{ title: 'Signup', tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} /> }}
          />
        </>
      )}
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
