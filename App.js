import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpenseScreen from "./screens/AllExpenseScreen";
import RecentExpenseScreen from "./screens/RecentExpenseScreen";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import ExpensesContextProvider from "./store/context/expensesContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddExpenseScreen from "./screens/AddExpenseScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  const MyTabs = createBottomTabNavigator({});

  const TabScreen = () => {
    return (
      <MyTabs.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#351401",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          sceneStyle: {
            backgroundColor: "#3f2f25",
          },
          tabBarStyle: {
            backgroundColor: "#351401",
          },
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#e2b497",
        }}
      >
        <MyTabs.Screen
          name="All Expenses"
          component={AllExpenseScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={size} color={color} />
            ),
          }}
        />
        <MyTabs.Screen
          name="Recent"
          component={RecentExpenseScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="time" size={size} color={color} />
            ),
          }}
        />
      </MyTabs.Navigator>
    );
  };

  return (
    <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Expenses"
            component={TabScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Add Expense" component={AddExpenseScreen} 
            options={{
              headerStyle: {
                backgroundColor: "#351401",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
             contentStyle:{
              backgroundColor: "#3f2f25",
             }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
