import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CarSellingPage.css'; // Import your CSS file for styling

const CarSellingPage = () => {
    const [cars, setCars] = useState([
  { id: 1, make: 'Toyota', model: 'Camry', price: 20000, image: 'car1.jpg' },
  { id: 2, make: 'Honda', model: 'Civic', price: 18000, image: 'car2.jpg' },
  { id: 3, make: 'Ford', model: 'Mustang', price: 35000, image: 'car3.jpg' },
  { id: 4, make: 'Chevrolet', model: 'Malibu', price: 22000, image: 'car4.jpg' },
  { id: 5, make: 'Nissan', model: 'Altima', price: 23000, image: 'car5.jpg' },
  { id: 6, make: 'BMW', model: 'X3', price: 45000, image: 'car6.jpg' },
  { id: 7, make: 'Mercedes-Benz', model: 'C-Class', price: 48000, image: 'car7.jpg' },
  { id: 8, make: 'Audi', model: 'A4', price: 42000, image: 'car8.jpg' },
  { id: 9, make: 'Hyundai', model: 'Elantra', price: 17000, image: 'car9.jpg' },
  { id: 10, make: 'Kia', model: 'Optima', price: 20000, image: 'car10.jpg' },
]);


  const [selectedCar, setSelectedCar] = useState(null);

  const handleCarClick = (car) => {
    setSelectedCar(car);
  };

  return (
    <div className="car-selling-container">
      <div className="nav-container">
        <h1>Explore Our Cars</h1>
        <Link to="/login">
          <button className="login-button">Login</button>
        </Link>
      </div>
      <div className="car-cards-container">
        {cars.map((car) => (
          <div key={car.id} className="car-card" onClick={() => handleCarClick(car)}>
            <img className="car-image" src={car.image} alt={`${car.make} ${car.model}`} />
            <div className="car-details">
              <h2>{car.make} {car.model}</h2>
              <p>${car.price}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedCar && (
        <div className="car-details-popup">
          <img className="popup-image" src={selectedCar.image} alt={`${selectedCar.make} ${selectedCar.model}`} />
          <div className="popup-details">
            <h2>{selectedCar.make} {selectedCar.model}</h2>
            <p>${selectedCar.price}</p>
          </div>
          <button className="close-button" onClick={() => setSelectedCar(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default CarSellingPage;
