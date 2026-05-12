const restaurants = [
  {
    name: "Spice Hub",
    menu: ["Paneer Biryani", "Veg Hakka Noodles", "Butter Naan"]
  },
  {
    name: "Burger Street",
    menu: ["Classic Burger", "Cheese Fries", "Cold Coffee"]
  },
  {
    name: "Pizza Point",
    menu: ["Margherita Pizza", "Farmhouse Pizza", "Garlic Bread"]
  }
];

const orderFlow = [
  "Order Placed",
  "Restaurant Accepted",
  "Food Ready",
  "Picked by Delivery Boy",
  "Delivered"
];

const restaurantSelect = document.getElementById("restaurantSelect");
const menuSelect = document.getElementById("menuSelect");
const placeOrderBtn = document.getElementById("placeOrderBtn");
const acceptOrderBtn = document.getElementById("acceptOrderBtn");
const markReadyBtn = document.getElementById("markReadyBtn");
const pickupOrderBtn = document.getElementById("pickupOrderBtn");
const deliverOrderBtn = document.getElementById("deliverOrderBtn");
const statusTimeline = document.getElementById("statusTimeline");
const restaurantOrder = document.getElementById("restaurantOrder");
const deliveryOrder = document.getElementById("deliveryOrder");

let currentOrder = null;
let currentStep = -1;

function initializeRestaurants() {
  restaurants.forEach((restaurant, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = restaurant.name;
    restaurantSelect.appendChild(option);
  });

  refreshMenu();
}

function refreshMenu() {
  const selectedRestaurant = restaurants[restaurantSelect.value];
  menuSelect.innerHTML = "";

  selectedRestaurant.menu.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    menuSelect.appendChild(option);
  });
}

function renderTimeline() {
  statusTimeline.innerHTML = "";

  orderFlow.forEach((step, index) => {
    const item = document.createElement("li");
    const completed = index <= currentStep;
    item.textContent = completed ? `✅ ${step}` : `⏳ ${step}`;
    statusTimeline.appendChild(item);
  });
}

function updateButtons() {
  acceptOrderBtn.disabled = currentStep !== 0;
  markReadyBtn.disabled = currentStep !== 1;
  pickupOrderBtn.disabled = currentStep !== 2;
  deliverOrderBtn.disabled = currentStep !== 3;
}

placeOrderBtn.addEventListener("click", () => {
  const restaurant = restaurants[restaurantSelect.value].name;
  const foodItem = menuSelect.value;

  currentOrder = `${foodItem} from ${restaurant}`;
  currentStep = 0;

  restaurantOrder.textContent = currentOrder;
  deliveryOrder.textContent = "Waiting for restaurant to mark food ready";

  renderTimeline();
  updateButtons();
});

acceptOrderBtn.addEventListener("click", () => {
  currentStep = 1;
  renderTimeline();
  updateButtons();
});

markReadyBtn.addEventListener("click", () => {
  currentStep = 2;
  deliveryOrder.textContent = currentOrder;
  renderTimeline();
  updateButtons();
});

pickupOrderBtn.addEventListener("click", () => {
  currentStep = 3;
  renderTimeline();
  updateButtons();
});

deliverOrderBtn.addEventListener("click", () => {
  currentStep = 4;
  renderTimeline();
  updateButtons();
});

restaurantSelect.addEventListener("change", refreshMenu);

initializeRestaurants();
renderTimeline();
