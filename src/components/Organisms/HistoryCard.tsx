import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { CalendarIcon, MapPinIcon, TruckIcon, CreditCardIcon } from "lucide-react";

interface Item {
	id: string;
	label: string;
	price: number;
	quantity: number;
	image: string;
}

interface HistoryCardProps {
	id: string;
	created_at: string;
	gross_amount: number;
	payment_type: string;
    bank: string;
    clerk_id: {
        address: string
    }
	item: Item[];
}

export function HistoryCard({
	id,
	created_at,
	gross_amount,
	payment_type,
	bank,
    item,
    clerk_id
}: HistoryCardProps) {
	return (
		<Card className="mb-6 overflow-hidden ">
			<CardHeader className="bg-gray-50 pb-4">
				<div className="flex justify-between items-center">
					<CardTitle className="text-lg">Order #{id.slice(0, 8)}</CardTitle>
					<Badge className="bg-blue-100 text-blue-800 capitalize">{payment_type}</Badge>
				</div>
			</CardHeader>
			<CardContent className="pt-6 ">
				<div className="space-y-4">
					<div>
						<h4 className="font-semibold mb-2">Items:</h4>
						<ul className="space-y-2">
							{item.map((product) => (
								<li key={product.id} className="flex justify-between items-center">
									<div className="flex items-center">
										<img
											src={product.image}
											alt={product.label}
											className="w-10 h-10 object-cover rounded mr-2"
										/>
										<span>
											{product.label} x{product.quantity}
										</span>
									</div>
									<span className="text-gray-600 mx-2">
										{formatCurrency(product.price * product.quantity)}
									</span>
								</li>
							))}
						</ul>
					</div>
					<Separator />
					<div className="flex justify-between items-center font-semibold">
						<span>Total Price:</span>
						<span>{formatCurrency(gross_amount)}</span>
					</div>
					<Separator />
					<div className="grid grid-cols-2 gap-4">
						<div className="flex items-center">
							<MapPinIcon className="h-5 w-5 mr-2 text-gray-500" />
							<span className="text-sm">{clerk_id.address}</span>
						</div>
						<div className="flex items-center">
							<TruckIcon className="h-5 w-5 mr-2 text-gray-500" />
							<span className="text-sm">3-5 business days</span>
						</div>
						<div className="flex items-center">
							<CalendarIcon className="h-5 w-5 mr-2 text-gray-500" />
							<span className="text-sm">{new Date(created_at).toLocaleDateString()}</span>
						</div>
						<div className="flex items-center">
							<CreditCardIcon className="h-5 w-5 mr-2 text-gray-500" />
							<span className="text-sm capitalize">{bank} Bank</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
