import { faker } from '@faker-js/faker';

// Sample image pools (you can expand this with more URLs)
const animalImagePool = [
  "https://i.pinimg.com/736x/01/32/6d/01326db27da19a9478069e72fb0c6c17.jpg",
  "https://i.pinimg.com/736x/71/59/5b/71595b3f777815e053fa8678e90bb5ce.jpg",
  "https://i.pinimg.com/736x/61/cf/d2/61cfd23a5b1cc34a8db610f26353661f.jpg"
];

const farmerImagePool = [
  "https://i.pinimg.com/736x/eb/76/a4/eb76a46ab920d056b02d203ca95e9a22.jpg",
  "https://i.pinimg.com/736x/bf/f9/38/bff938f16bcb5296e1c1be4dfd8a9a7b.jpg",
  "https://i.pinimg.com/736x/aa/1f/89/aa1f89e3e50d512c6bce1f64c9d0ea62.jpg"
];

// Breed map for animal types
const breedMap = {
  Dog: ['Labrador', 'German Shepherd', 'Pug'],
  Cat: ['Siamese', 'Persian', 'Maine Coon'],
  Goat: ['Boer', 'Nubian', 'Alpine'],
  Rabbit: ['Lop', 'Rex', 'Dutch']
};

function generateImages(count) {
  return Array.from({ length: count }, () =>
    faker.helpers.arrayElement(animalImagePool)
  );
}

function generateItem() {
  const animalType = faker.helpers.arrayElement(['Dog', 'Cat', 'Goat', 'Rabbit']);
  const price = faker.number.float({ min: 1000, max: 3000, precision: 0.01 });
  const quantity = faker.number.int({ min: 1, max: 4 });
  const imageCount = faker.number.int({ min: 2, max: 3 });

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
    price_at_order_time: price,
    farmer_email: faker.internet.email(),
    farmer_username: faker.internet.userName(),
    farmer_picture: faker.helpers.arrayElement(farmerImagePool)
  };
}

function generateOrder() {
  const itemCount = faker.number.int({ min: 1, max: 3 });
  const items = Array.from({ length: itemCount }, generateItem);
  const totalAmount = items.reduce((sum, item) => sum + item.price_at_order_time * item.quantity, 0);

  return {
    id: faker.string.uuid(),
    user_id: faker.string.uuid(),
    status: faker.helpers.arrayElement(['pending', 'confirmed', 'rejected', 'delivered']),
    created_at: faker.date.recent().toISOString(),
    delivered: faker.datatype.boolean(),
    paid: faker.datatype.boolean(),
    amount: parseFloat(totalAmount.toFixed(2)),
    items
  };
}

// Generate multiple orders
export const UserOrders = Array.from({ length: 10 }, generateOrder);

// Optional: log example to console

