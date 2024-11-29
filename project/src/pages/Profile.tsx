import React from 'react';

const mockProducts = [
  {
    id: 1,
    name: 'Wireless Earbuds',
    price: '$49.99',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Smartphone Stand',
    price: '$19.99',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Portable Charger',
    price: '$29.99',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    price: '$59.99',
    image: 'https://via.placeholder.com/150',
  },
];

export default function Profile() {
  return (
    <div className="p-6">
      
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">
        Welcome to the page! 🎉 Happy Shopping!
      </h1>

      {/* Products Section */}
      <h2 className="text-xl font-medium text-gray-800 mb-4">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.price}</p>
              <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
