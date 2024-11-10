import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/home";
import RegisterScreen from "../screens/register";
import LoginScreen from "../screens/login";
import PasswordListScreen from "../screens/passwordList"
import ResetPassScreen from "../screens/resetPass";
import NewPasswordScreen from "../screens/newPassword"
import PasswordDetailsScreen from "../screens/details"
import ProfileScreen from "../screens/profile"
import { RoutesParams } from "./routesParams";  // Certifique-se de que o caminho está correto

const Stack = createNativeStackNavigator<RoutesParams>();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="ResetPass" component={ResetPassScreen} />
                <Stack.Screen name="PasswordList" component={PasswordListScreen}/>
                <Stack.Screen name="NewPassword" component={NewPasswordScreen}/>
                <Stack.Screen name="PasswordDetails" component={PasswordDetailsScreen}/>
                <Stack.Screen name="Profile" component={ProfileScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}