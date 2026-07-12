import { readData, saveData } from "./io.js";

let orders = await readData("orders.json");

export async function createOrder(data) {
  const newId =
    orders.length > 0 ? Math.max(...orders.map((o) => o.id)) + 1 : 1;
  const newOrder = { id: newId, status: "new", ...data };
  orders.push(newOrder);
  await saveData("orders.json", orders);
  return newId;
}

export async function getOrders(status, customer, table) {
  if (status) orders = orders.filter((order) => order.status === status);
  if (customer) orders = orders.filter((order) => order.customer === customer);
  if (table) orders = orders.filter((order) => order.table === table);

  return filteredOrders;
}

export async function getOrderById(orderId) {
  const order = orders.find((order) => order.id === orderId);
  if (!order) {
    const error = new Error(`Order with id ${orderId} not found!`);
    error.statusCode = 404;
    throw error;
  }
  return order;
}

export async function updateOrder(orderId, updatedData) {
  const order = await getOrderById(orderId);
  Object.assign(order, updatedData);
  await saveData("orders.json", orders);
}

export async function deleteOrder(orderId) {
  orders = orders.filter((order) => order.id !== orderId);
  await saveData("orders.json", orders);
}
