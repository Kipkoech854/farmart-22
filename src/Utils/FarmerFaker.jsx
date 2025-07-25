import { faker } from '@faker-js/faker';

// Generate realistic animal images
function generateImages(count) {
  const queries = ['dog', 'cat', 'goat', 'rabbit'];
  return Array.from({ length: count }, () => {
    const query = faker.helpers.arrayElement(queries);
    return `https://source.unsplash.com/640x480/?${query}&sig=${faker.number.int({ min: 1, max: 1000 })}`;
  });
}

// Create a single item
function generateItem() {
  const animalType = faker.helpers.arrayElement(['Dog', 'Cat', 'Goat', 'Rabbit']);
  const breedMap = {
    Dog: ['Labrador', 'German Shepherd', 'Pug'],
    Cat: ['Siamese', 'Persian', 'Maine Coon'],
    Goat: ['Boer', 'Nubian', 'Alpine'],
    Rabbit: ['Lop', 'Rex', 'Dutch']
  };
  const price = faker.number.float({ min: 1000, max: 3000, precision: 0.01 });
  const quantity = faker.number.int({ min: 1, max: 4 });
  const imageCount = faker.number.int({ min: 3, max: 7 });

  return {
    animal_id: faker.string.uuid(),
    name: faker.person.firstName(),
    type: animalType,
    breed: faker.helpers.arrayElement(breedMap[animalType]),
    age: faker.number.int({ min: 1, max: 5 }),
    price,
    description: faker.lorem.sentence(),
    is_available: faker.datatype.boolean(),
    images: generateImages(imageCount),
    image_count: imageCount,
    quantity,
    price_at_order_time: price
  };
}

// Create a full order
function generateOrder({ status = null } = {}) {
  const itemCount = faker.number.int({ min: 1, max: 3 });
  const items = Array.from({ length: itemCount }, generateItem);
  const totalAmount = items.reduce((sum, item) => sum + item.price_at_order_time * item.quantity, 0);

  // Determine a valid status
  const chosenStatus = status || faker.helpers.arrayElement(['pending', 'confirmed', 'rejected', 'cancelled']);

  // Determine paid & delivered based on status constraints
  let paid = faker.datatype.boolean();
  let delivered = faker.datatype.boolean();

  // Enforce logical constraints
  if (chosenStatus === 'pending') {
    paid = true;
    delivered = false;
  } else if (chosenStatus === 'confirmed') {
    paid = true;
    delivered = faker.datatype.boolean();
  } else if (['rejected', 'cancelled'].includes(chosenStatus)) {
    paid = false;
    delivered = false;
  }

  return {
    id: faker.string.uuid(),
    user_id: faker.string.uuid(),
    status: chosenStatus,
    created_at: faker.date.recent().toISOString(),
    delivered,
    paid,
    amount: totalAmount.toFixed(2),
    items,
    customer_email: faker.internet.email(),
    customer_username: faker.internet.userName(),
    customer_picture: faker.image.avatar()
  };
}

// Generate and export 10 fake orders
export const FarmerOrders = Array.from({ length: 10 }, generateOrder);

// Optional: Print result
console.log(JSON.stringify(FarmerOrders, null, 2));
