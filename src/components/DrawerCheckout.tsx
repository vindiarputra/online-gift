"use client";

import { useState } from "react";
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
} from "@/components/ui/drawer";
import { ShoppingCart, X } from "lucide-react";
import FormCheckout from "./Form/FormCheckout";

const DrawerCheckout = () => {
    const [isOpen, setIsOpen] = useState(false);
	return (
		<Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerContent>
                <FormCheckout/>
            </DrawerContent>
		</Drawer>
	);
};

export default DrawerCheckout;
