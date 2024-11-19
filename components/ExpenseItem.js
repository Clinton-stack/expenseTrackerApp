import React, { useContext, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { ExpensesContext } from "../store/context/expensesContext";

function ExpenseItem({ id, title, price, date }) {
  const [modalVisible, setModalVisible] = useState(false);
  const expenseContext = useContext(ExpensesContext)

  const handleDelete = () => {
    expenseContext.removeExpense(id);
    setModalVisible(false);
  }

  return (
    <View>
      <Pressable style={styles.expenseContainer} onPress={()=> setModalVisible(true)}>
          <View>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>{title}</Text>
            <Text style={{ color: "#fff" }}>{date}</Text>
          </View>
          <View style={styles.priceBox}>
            <Text style={{ color: "#351401" }}> {price.toFixed(2)}</Text>
          </View>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Do you want to delete this expense?
            </Text>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.deleteButton]}
              onPress={handleDelete}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ExpenseItem;

const styles = StyleSheet.create({
  priceBox: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  expenseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    marginHorizontal: 16,
    backgroundColor: "#c3a08a",
    marginTop: 8,
    marginBottom: 8,
    padding: 10,
    borderRadius: 8,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent overlay
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    width: "100%",
    borderRadius: 5,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#aaa",
  },
  deleteButton: {
    backgroundColor: "#d9534f", // Red color for delete
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
