export const buildCartItemFromAnimal = (animal) => {
  console.log("Original animal before building cart item:", animal);

  const imagesArray = animal.images
    ? animal.images.map((img, index) => ({
        id: index,
        url: img,
      }))
    : animal.image
    ? [{ id: 0, url: animal.image }]
    : [];

  return {
    id: animal.id,
    name: animal.name,
    price: animal.price,
    quantity: 1,
    description: animal.description,
    type: animal.type,
    breed: animal.breed,
    age: animal.age,
    is_available: animal.is_available,
    images: imagesArray,
    location: animal.location || animal.county, // <-- this line is key
  };
};
