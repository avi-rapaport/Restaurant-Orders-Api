import { readData, saveData } from "./io.js";

const orders = await readData("orders.json");

export async function getOrders(status, customer, table) {
  let filteredOrders = orders;
  if (status) {
    filteredOrders = filteredOrders.filter((order) => order.status === status);
  }
  if (customer) {
    filteredOrders = filteredOrders.filter(
      (order) => order.customer === customer,
    );
  }
  if (table)
    filteredOrders = filteredOrders.filter((order) => order.table === table);

  return filteredOrders;
}

export async function createOrder() {}
