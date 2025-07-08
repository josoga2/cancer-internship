"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface CarouselCardProps {
  content: string;
}

const CarouselCard: React.FC<CarouselCardProps> = ({ content }) => {
  return (
        <CarouselItem>
          <div className="p-1">
            <Card>
              <CardContent className="flex aspect-square items-center justify-center">
                <span className="text-2xl font-medium">{content}</span>
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
  );
};

export default CarouselCard;
