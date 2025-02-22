import { useContext } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/helpers/format-currency";

import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-product-item";

const CartSheet = () => {
  const { isOpen, toggleCart, products, total } = useContext(CartContext);
  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-[80%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
          <div className="flex flex-col py-5 h-full">
            <div className="flex-auto ">
              {products.map((product) => (
                <CartProductItem key={product.id} product={product}/>
              ))}
            </div>
            <Card className="mb-6">
              <CardContent className="p-5">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="text-sm font-semibold">{formatCurrency(total)}</span>
                </div>
              </CardContent>
            </Card>
            <Button className="w-full rounded-full ">Finalizar Pedido!</Button>
          </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
