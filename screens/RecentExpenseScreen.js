import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ExpenseList from "../components/ExpenseList";
import { Ionicons } from "@expo/vector-icons";
import { ExpensesContext } from "../store/context/expensesContext";
import { getData } from "../util/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import Toast from "react-native-toast-message";

function RecentExpenseScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const expensesCxt = useContext(ExpensesContext);

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
          setIsError(true);
          setIsLoading(false);
          Toast.show({
            type: "error",
            text1: "Error",
            text2: "An error occurred while fetching expenses",
            });

        }
      const expenses = await getData();
      setTimeout(() => {
        expensesCxt.setExpenses(expenses);
        setIsLoading(false);
      }, 2000);
    }
    getExpenses();
  }, []);

  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  const recentExpenses = expensesCxt.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= last7Days;
  });

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
        <Text>Last 7 Days</Text>
        <Text>
          ${recentExpenses.reduce((sum, exp) => sum + exp.price, 0).toFixed(2)}
        </Text>
      </View>
      {isLoading ? <LoadingOverlay size={'large'} /> : <ExpenseList data={recentExpenses} />}
    </ScrollView>
  );
}

export default RecentExpenseScreen;

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
