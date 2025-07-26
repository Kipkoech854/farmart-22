export const OrderConstructor = ({ cart, totalprice, pickupLocation, deliveryMethod, total, paymentMethod }) => {
  const normalizedAnimals = Array.isArray(cart)
    ? cart
    : cart && typeof cart === "object"
    ? [cart]
    : [];

  const itemsArray = normalizedAnimals.map((animal) => ({
    animal_id: animal.id,
    quantity: animal.quantity || 1,
    price_at_order_time: animal.price,
  }));

  return {
    amount: totalprice,
    pickup_station: pickupLocation?.name,
    total: total,
    payment_method: paymentMethod,
    delivery_method: deliveryMethod,
    items: itemsArray,
  };
};
