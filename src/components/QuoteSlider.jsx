"use client";
import React, {useEffect, useState} from "react";
import {FaArrowLeftLong} from "react-icons/fa6";
import {FaArrowRight} from "react-icons/fa6";
import {ImQuotesLeft} from "react-icons/im";

const quotes = [
  {
    text: "Jeg mærkede en tydelig forskel efter første behandling - det gav mig ny energi til arbejdsdagen.",
    author: "Medarbejder, kontor",
  },
  {
    text: "Ordningen er fleksibel, nem at håndtere og skaber værdi for både medarbejdere og ledelse.",
    author: "Driftsansvarlig, kontorhotel",
  },
  {
    text: "Behandlingen var både professionel og behagelig. Det føltes som en pause, jeg havde brug for.",
    author: "Grafisk designer, marketing",
  },
  {
    text: "Vores medarbejdere er glade, og vi kan mærke en forskel i både stemning og produktivitet.",
    author: "HR-chef, mellemstor virksomhed",
  },
];

export default function QuoteSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
    );
  };
  return (
    <section className="w-full bg-primary flex flex-col lg:flex lg:flex-row lg:justify-between text-secondary lg:py-40  px-desktop">
      <div className="flex flex-col gap-6">
        <div className=" ">
          <h1>
            En sundhedsordning skal kunne mærkes - både fysisk og i
            arbejdsmiljøet.
          </h1>
          <p>
            Her er hvad tidligere kunder fortæller om deres oplevelse med Motus
            & Manus.
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <button
            onClick={handlePrev}
            className="w-10 h-10 bg-secondary text-cta rounded-full flex justify-center items-center hover:text-secondary hover:bg-cta "
          >
            <FaArrowLeftLong />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 bg-secondary text-cta rounded-full flex justify-center items-center hover:text-secondary hover:bg-cta "
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      <div className="lg:w-3xl flex flex-col lg:gap-6">
        <h2 className="">
          <ImQuotesLeft />
          {quotes[currentIndex].text}"
        </h2>
        <h3 className="">- {quotes[currentIndex].author}</h3>
      </div>
    </section>
  );
}
