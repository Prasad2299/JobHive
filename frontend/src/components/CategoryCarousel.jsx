import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "Graphic Designer",
  "Data Science",
];

function CategoryCarousel() {
  // const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch("");
  const searchQueryHandler = (query) => {
    console.log("query in cat", query);
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
              <Button
                onClick={() => searchQueryHandler(cat.toLowerCase())}
                className="rounded-full "
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious></CarouselPrevious>
        <CarouselNext></CarouselNext>
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
