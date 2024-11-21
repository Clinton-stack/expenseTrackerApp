import axios from "axios";

const url = "https://react-native-expenseapp-e6b84-default-rtdb.firebaseio.om";

async function getData() {
  const response = await axios.get(url + "/expenses.json");
  const expenses = [];

  for (const key in response.data) {
    expenses.push({
      id: key,
      title: response.data[key].title,
      price: response.data[key].price,
      date: response.data[key].date,
    });
  }
  return expenses;
}

async function postData(data) {
  const response = await axios.post(url + "/expenses.json", data);
  const id = response.data.name;
  return id 
}

function removeData(id) {
  return axios.delete(url+`/expenses/${id}.json`);
}

export { getData, postData, removeData };
