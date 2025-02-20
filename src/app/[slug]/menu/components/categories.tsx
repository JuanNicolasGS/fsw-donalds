"use client"

import { Prisma, } from "@prisma/client";
import { ClockIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import Products from "./products";


interface RestaurantCategoriesProps{
    restaurant: Prisma.RestaurantGetPayload<{
        include: {
            menuCategories: {
                include: { products: true};
            };
        }; 
    }>;
}

type MenuCategoriesWithProducts = Prisma.MenuCategoryGetPayload<{
    include: { products: true };
}>

const RestaurantCategories = ({ restaurant }: RestaurantCategoriesProps) => {
    const [selectedCategory, setSelectedCategory] = useState<MenuCategoriesWithProducts>(restaurant.menuCategories[0])
    const handleCatergoryClick = (category: MenuCategoriesWithProducts) => {
        setSelectedCategory(category)
    }
    const getCategoryButtonVariant = (category: MenuCategoriesWithProducts) => {
        return selectedCategory.id === category.id? "default" : "secondary"
    }
    return ( 
        <div className="relative z-50 rounded-t-3xl mt-[-1.5rem] bg-white ">
            <div className="p-5">
                <div className="flex items-center 
                gap-3">
                    <Image src={restaurant.avatarImageUrl} alt={restaurant.name} height={45} width={45}/>
                    <div className="">
                        <h2 className="font-semiblod text-lg">{restaurant.name}</h2>
                        <p className="text-xs opacity-55">{restaurant.description}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-emerald-500 mt-3">
                    <ClockIcon size={12}/>
                    <p>Aberto!</p>
                </div>
            </div>
            
            <ScrollArea className="w-full ">
                <div className="flex w-wax space-x-4 p-5 pt-0">
                    {restaurant.menuCategories.map(category => (
                        <Button onClick={() => handleCatergoryClick(category)} key={category.id} variant={
                            getCategoryButtonVariant(category)
                        } size="sm" className="rounded-full">
                            {category.name}
                        </Button>
                    ))}
                       
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            
            <h3 className="px-6 font-bold pt-1">{selectedCategory.name}</h3>
            <Products products={selectedCategory.products}/>
        </div>
     );
}
 
export default RestaurantCategories;