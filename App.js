import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import WelcomeScreen from "./components/Welcome/WelcomeScreen";
import HomeScreen from "./components/Home/HomeScreen";
import SignInScreen from "./components/authentication/SignInScreen";
import CartScreen from "./components/Cart/CartScreen";
import SignUpScreen from "./components/authentication/SignUpScreen";
import ProfileScreen from "./components/Profile/ProfileScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import PayScreen from "./components/Cart/PayScreen";
import Products from "./components/Home/Products";
import SearchResult from "./components/Home/SearchResult";
import ProductDescription from "./components/Cart/ProductDescription";
import ChangePasswordScreen from "./components/authentication/ChangePasswordScreen";
import OrderManagerScreen from "./components/Manager/OrderManagerScreen";
import UserManagerScreen from "./components/Manager/UserManagerScreen";
import CartDetail from "./components/Cart/CartDetail";
// import Loading from "./components/Loading/Loading";
const Tab = createBottomTabNavigator();

function Mytabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          unmountOnBlur: true,
          tabBarIcon: () => <AntDesign name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          unmountOnBlur: true,

          tabBarIcon: () => (
            <AntDesign name="shoppingcart" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          unmountOnBlur: true,

          tabBarIcon: () => (
            <Ionicons name="ios-person-outline" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="SearchResult" component={SearchResult} />
          <Stack.Screen name="MainScreen" component={Mytabs} />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen
            name="ProductDescription"
            component={ProductDescription}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
          />
          <Stack.Screen
            name="OrderManagerScreen"
            component={OrderManagerScreen}
          />
          <Stack.Screen
            name="UserManagerScreen"
            component={UserManagerScreen}
          />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="PayScreen" component={PayScreen} />
          <Stack.Screen name="Profile" component={Mytabs} />
          <Stack.Screen name="CartDetail" component={CartDetail} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}
