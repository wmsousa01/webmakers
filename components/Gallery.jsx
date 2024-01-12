import React, { useState } from "react";
import Image from "next/image";
import Modal from "./Modal"; // Um componente de modal que você precisará criar

import ProdutoImg1 from "../public/assets/galeria/pt-img-1.jpeg";
import ProdutoImg2 from "../public/assets/galeria/pt-img-2.jpeg";
import ProdutoImg3 from "../public/assets/galeria/pt-img-3.jpeg";

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const images = [ProdutoImg1, ProdutoImg2, ProdutoImg3];

  const handleClick = (img) => {
    setSelectedImg(img);
  };

  const handlePrev = () => {
    const currentIndex = images.indexOf(selectedImg);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImg(images[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = images.indexOf(selectedImg);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImg(images[nextIndex]);
  };

  return (
    <div id="galeria" className="container mx-auto text-black p-4">
      <div className="grid justify-items-center">
        <div className="text-white text-2xl p-2">
          <p>Galeria de fotos</p>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-3">
          {images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`imagem do produto ${index + 1}`}
              width={400}
              height={400}
              className="rounded-lg p-4 cursor-pointer"
              onClick={() => handleClick(img)}
            />
          ))}
        </div>
      </div>
      {selectedImg && (
        <Modal
          img={selectedImg}
          onClose={() => setSelectedImg(null)}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
};

export default Gallery;
