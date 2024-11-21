import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { expenses } from "../data/dummy-data";
import ExpenseList from "../components/ExpenseList";
import { Ionicons } from "@expo/vector-icons";
import { ExpensesContext } from "../store/context/expensesContext";
import { getData } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import Toast from "react-native-toast-message";

function AllExpenseScreen({ navigation }) {
  const expensesCxt = useContext(ExpensesContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getExpenses() {
        try {
          const expenses = await getData();
          setTimeout(() => {
            expensesCxt.setExpenses(expenses);
            setIsLoading(false);
          }, 2000);
        }
        catch (error) {
          setIsLoading(false);
          Toast.show({  
            type: "error",
            text1: "Error",
            text2: "An error occurred while fetching expenses",
            });
        }
    
    }
    getExpenses();
  }, []);

  const total = expensesCxt.expenses
    .reduce((sum, exp) => sum + exp.price, 0)
    .toFixed(2);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={() => navigation.navigate("Add Expense")}>
            <Ionicons
              name="add"
              size={24}
              color="white"
              style={{ marginRight: 16 }}
            />
          </Pressable>
        );
      },
    });
  }, [navigation]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>Total </Text>
        <Text> ${total}</Text>
      </View>
      {isLoading ? <LoadingOverlay size={'large'}/> : <ExpenseList data={expensesCxt.expenses} />}
    </ScrollView>
  );
}

export default AllExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    padding: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
});
