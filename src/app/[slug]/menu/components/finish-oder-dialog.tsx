"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { z } from "zod"

import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import { Input } from "@/components/ui/input"

import { isValidCpf } from "../helpers/cpf";
  

const formSchema = z.object({
    name: z.string().trim().min(1, {
        message: "Por favor, digite seu nome.",
    }),
    cpf: z.string().trim().min(1, {
        message: "Por favor, digite um CPF.",
    }).refine((value) => isValidCpf(value), {
        message: "Por favor, digite um CPF válido.",
    })

})
  

type formSchema = z.infer<typeof formSchema>

interface FinishOderDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const FinishOderDialog = ({open, onOpenChange}: FinishOderDialogProps) => {
    const form = useForm<formSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cpf: "",
        },
        shouldUnregister: true,
    });
    
    const onSubmit = (data: formSchema) => {
        console.log({data})
    }
    return ( 
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerTrigger asChild>
                
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Finalizar pedido?</DrawerTitle>
                    <DrawerDescription>
                        Insira suas informações abaixo para finalizar o pedido.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="p-5">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Nome do cliente</FormLabel>
                                <FormControl>
                                    <Input placeholder="Digite seu nome..." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="cpf"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>CPF do cliente</FormLabel>
                                <FormControl>
                                    <PatternFormat placeholder="Digite seu cpf..."  format="###.###.###-##" customInput={Input} {...field}/>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <DrawerFooter>
                                <Button type="submit" variant="destructive" className="rounded-full">Finalizar!</Button>
                                <DrawerClose asChild>
                                    <Button variant="outline" className="w-full rounded-full">Cancelar</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </form>
                    </Form>
                </div>
                    
            </DrawerContent>
        </Drawer>

     );
}
 
export default FinishOderDialog;