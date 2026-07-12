import { readData, saveData } from "./io.js";

const orders = await readData("orders.json");

export async function createOrder(data) {
  const newId = orders.length > 0 ? Math.max(...orders.map((o) => o.id)) : 1;
  const newOrder = { id: newId, status: "new", ...data };
  orders.push(newOrder);
  await saveData("orders.json", orders);
  return newId;
}

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
