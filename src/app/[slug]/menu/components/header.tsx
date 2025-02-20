"use client"

import { Restaurant } from "@prisma/client";
import { ChevronsLeftIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface RestaurantHeaderProps{
    restaurant: Pick<Restaurant, "coverImageUrl" | "name">
}

const RestaurantHeader = ({restaurant}: RestaurantHeaderProps) => {
    const router = useRouter();
    const handleBackCLick = () => router.back()
    return ( <div className="relative w-full h-[250px]">
    <Button 
        variant="secondary" 
        size="icon" 
        className="absolute top-4 left-4 rounded-full z-50"
        onClick={handleBackCLick}
        >
        <ChevronsLeftIcon />
    </Button>
    <Image
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
    />
    <Button variant="secondary" size="icon" className="absolute top-4 right-4 rounded-full z-50">
        <ScrollTextIcon/>
    </Button>
</div> );
}
 
export default RestaurantHeader;