"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { HistoryCard } from "./HistoryCard";
import { History } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";

interface Transaction {
	id: string;
	created_at: string;
	gross_amount: number;
	payment_type: string;
	bank: string;
	item: Array<{
		id: string;
		label: string;
		price: number;
		quantity: number;
		image: string;
	}>;
	clerk_id: {
		id: string;
		tlp: number;
		name: string;
		email: string;
		address: string;
		clerk_id: string;
		imageUrl: string;
		created_at: string;
		postal_code: number;
	};
}

export function TransactionHistory() {
	const [isOpen, setIsOpen] = useState(false);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
    const { user } = useUser();

	useEffect(() => {
		const fetchTransactions = async () => {
			if (!isOpen) return;
			setIsLoading(true);
			setError(null);
			try {
				const res = await fetch(`/api/transactions/${user?.id}`);
				if (!res.ok) throw new Error("Failed to fetch transactions");
				const data = await res.json();
				setTransactions(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "An error occurred");
			} finally {
				setIsLoading(false);
			}
		};

		fetchTransactions();
	}, [isOpen, user]);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-white/50 w-full justify-start">
					<History className="h-4 w-4" />
					History
				</Button>
			</SheetTrigger>
			<SheetContent className="w-[95vw] sm:w-[90vw] lg:w-[80vw] max-w-[1200px]">
				<SheetHeader>
					<SheetTitle className="text-2xl">Transaction History</SheetTitle>
				</SheetHeader>
				<div className="mt-6 space-y-6 overflow-y-auto max-h-[calc(100vh-100px)]">
					{isLoading ? (
						Array.from({ length: 3 }).map((_, index) => (
							<Skeleton key={index} className="w-full h-48" />
						))
					) : error ? (
						<div className="text-center text-red-500">{error}</div>
					) : transactions.length > 0 ? (
						transactions.map((transaction) => <HistoryCard key={transaction.id} {...transaction} />)
					) : (
						<div className="text-center text-gray-500">No transactions found</div>
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
}
