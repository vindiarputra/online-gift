import { useState } from "react";
import { ChevronDown, ChevronUp, Package, X } from "lucide-react";

type DrawerHistoryProps = {
	isOpen: Boolean;
	onClose: () => void;
};

export default function DrawerHistory({ isOpen, onClose }: DrawerHistoryProps) {
	const [expandedOrder, setExpandedOrder] = useState(null);

	const purchaseHistory = [
		{
			id: 1,
			date: "2023-06-15",
			total: 129.99,
			items: [
				{ name: "Cool T-Shirt", price: 29.99, quantity: 1 },
				{ name: "Awesome Sneakers", price: 89.99, quantity: 1 },
				{ name: "Stylish Socks", price: 10.01, quantity: 1 },
			],
		},
		{
			id: 2,
			date: "2023-05-30",
			total: 259.97,
			items: [{ name: "Stylish Watch", price: 129.99, quantity: 2 }],
		},
		{
			id: 3,
			date: "2023-05-15",
			total: 49.99,
			items: [
				{ name: "Trendy Hat", price: 24.99, quantity: 1 },
				{ name: "Fashionable Scarf", price: 25.0, quantity: 1 },
			],
		},
	];

	const toggleOrder = (orderId: any) => {
		setExpandedOrder(expandedOrder === orderId ? null : orderId);
	};

	return (
		<div
			className={`fixed h-screen  mt-[72px]   inset-y-0 right-0 w-full sm:w-96 bg-white border-2 border-black transform ${
				isOpen ? "translate-x-0" : "translate-x-full"
			} transition-transform duration-300 ease-in-out z-50`}>
			<div className="h-full flex flex-col">
				<div className="flex justify-between items-center p-4 bg-[#A6FAFF] border-b-4 border-black">
					<h2 className="text-2xl font-bold transform -rotate-1">Purchase History</h2>
					<button
						onClick={onClose}
						className="p-2 bg-white border-2 border-black hover:bg-[#79F7FF] transition-colors duration-200">
						<X size={24} />
						<span className="sr-only">Close</span>
					</button>
				</div>
				<div className="flex-grow overflow-y-auto p-4">
					{purchaseHistory.map((order) => (
						<div key={order.id} className="mb-4">
							<button
								onClick={() => toggleOrder(order.id)}
								className="w-full flex justify-between items-center p-4 bg-[#A6FAFF] border-4 border-black hover:bg-[#79F7FF] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] transition-all duration-200">
								<div className="flex items-center">
									<Package size={24} className="mr-4" />
									<span className="font-bold">Order #{order.id}</span>
									<span className="ml-4">{order.date}</span>
								</div>
								<div className="flex items-center">
									<span className="mr-4 font-bold">${order.total.toFixed(2)}</span>
									{expandedOrder === order.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
								</div>
							</button>
							{expandedOrder === order.id && (
								<div className="mt-2 p-4 bg-white border-4 border-black">
									<table className="w-full">
										<thead>
											<tr className="border-b-2 border-black">
												<th className="text-left p-2">Item</th>
												<th className="text-right p-2">Price</th>
												<th className="text-right p-2">Qty</th>
												<th className="text-right p-2">Subtotal</th>
											</tr>
										</thead>
										<tbody>
											{order.items.map((item, index) => (
												<tr key={index} className="border-b border-black">
													<td className="p-2">{item.name}</td>
													<td className="text-right p-2">${item.price.toFixed(2)}</td>
													<td className="text-right p-2">{item.quantity}</td>
													<td className="text-right p-2">
														${(item.price * item.quantity).toFixed(2)}
													</td>
												</tr>
											))}
										</tbody>
										<tfoot>
											<tr className="font-bold">
												<td colSpan={3} className="text-right p-2">
													Total:
												</td>
												<td className="text-right p-2">${order.total.toFixed(2)}</td>
											</tr>
										</tfoot>
									</table>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
