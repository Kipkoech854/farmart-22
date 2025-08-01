import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AnimalCard = ({ animal }) => {
    const images = Array.isArray(animal.images) ? animal.images : [];
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    // Function to get the correct image URL
    const getImageUrl = (image) => {
        if (!image) return '';
        // Handle static uploads (paths starting with /static/uploads/)
        if (image.url.startsWith('/static/uploads/')) {
            return `https://farmart-y80m.onrender.com${image.url}`; // Prepend the base URL for static files
        }
        return image.url;
    };

    return (
        <div
            style={{
                display: 'flex',
                backgroundColor: '#f0fff4',
                border: '1px solid #b2f5ea',
                margin: '1rem 0',
                borderRadius: '10px',
                fontFamily: 'Quicksand, sans-serif',
                overflow: 'hidden',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
            }}
        >
            {/* Left side - Details */}
            <div style={{ flex: 1, padding: '1rem' }}>
                <h2 style={{ color: '#2f855a', fontSize: '1.5rem' }}>{animal.name || 'Unnamed Animal'}</h2>
                <p><strong>Breed:</strong> {animal.breed || 'N/A'}</p>
                <p><strong>Type:</strong> {animal.type || 'N/A'}</p>
                <p><strong>Location:</strong> {animal.location || 'N/A'}</p>
                <p><strong>Age:</strong> {animal.age ? `${animal.age} years` : 'N/A'}</p>
                <p><strong>Price:</strong> {animal.price ? `KSh ${animal.price.toLocaleString()}` : 'N/A'}</p>
                <p><strong>Description:</strong> {animal.description || 'No description available'}</p>
            </div>

            {/* Right side - Carousel */}
            <div
                style={{
                    position: 'relative',
                    width: '300px',
                    height: '250px',
                    overflow: 'hidden',
                }}
            >
                {images.length > 0 ? (
                    <>
                        <img
                            src={getImageUrl(images[currentIndex])}
                            alt={`${animal.name || 'Animal'} ${currentIndex + 1}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                transition: '0.5s',
                            }}
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/300x250?text=Image+Not+Available';
                            }}
                        />
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '10px',
                                        transform: 'translateY(-50%)',
                                        background: 'rgba(255,255,255,0.8)',
                                        border: 'none',
                                        borderRadius: '50%',
                                        padding: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <ChevronLeft color="#2f855a" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        right: '10px',
                                        transform: 'translateY(-50%)',
                                        background: 'rgba(255,255,255,0.8)',
                                        border: 'none',
                                        borderRadius: '50%',
                                        padding: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <ChevronRight color="#2f855a" />
                                </button>
                            </>
                        )}
                    </>
                ) : (
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#e2e8f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <p
                            style={{
                                textAlign: 'center',
                                color: '#718096',
                                fontStyle: 'italic',
                                padding: '1rem',
                            }}
                        >
                            No images available
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnimalCard;