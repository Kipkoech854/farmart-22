export const fetchLivestock = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 1,
      name: 'Boran Heifer',
      type: 'Cattle',
      breed: 'Boran',
      age: 2,
      price: 45000,
      county: 'Nakuru',
      description: 'Healthy Boran heifer, vaccinated against LSD and foot-and-mouth. Raised in free-range conditions in Naivasha. Comes with veterinary records.',
      image: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8',
      is_available: true,
      recommendations: ['Livestock insurance', 'Mineral supplements', 'AI services']
    },
    {
      id: 2,
      name: 'Kienyeji Hens (10)',
      type: 'Poultry',
      breed: 'Kienyeji',
      age: 0.5, // 6 months
      price: 8000, // 800 per hen
      county: 'Kiambu',
      description: '10 Kienyeji hens, 6 months old, excellent layers (200+ eggs/year). Vaccinated against Newcastle disease. Ideal for free-range system.',
      image: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4',
      is_available: true,
      recommendations: ['Poultry house', 'Feeding trays', 'Egg incubator']
    },
    {
      id: 3,
      name: 'Galla Buck',
      type: 'Goat',
      breed: 'Galla',
      age: 1.5,
      price: 18000,
      county: 'Isiolo',
      description: 'Premium Galla breeding buck, 18 months old. Proven sire with excellent growth rate. Suitable for arid and semi-arid regions.',
      image: 'https://images.unsplash.com/photo-1551290464-66719418ca54',
      is_available: true,
      recommendations: ['Salt lick', 'Dewormers', 'Goat housing']
    }
  ];
};