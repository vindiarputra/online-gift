import { ShoppingCart } from "lucide-react";

export default function Card({ title, price, image }) {
	return (
		<div className="w-full max-w-sm mx-auto">
			<div className="bg-white border-4 border-black p-4 transform rotate-1 hover:-rotate-1 transition-transform duration-300">
				<div className="relative h-48 mb-4">
					<img
						src={image || "/placeholder.svg?height=200&width=200"}
						alt={title}
						className="w-full h-full object-cover border-2 border-black"
					/>
					<div className="absolute top-2 right-2 bg-[#A6FAFF] text-black font-bold py-1 px-2 border-2 border-black transform -rotate-3">
						${price}
					</div>
				</div>
				<h3 className="text-xl font-bold mb-2 transform -rotate-1">{title}</h3>
				<button className="w-full flex items-center justify-center p-2 bg-[#A6FAFF] border-2 border-black hover:bg-[#79F7FF] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] transition-all duration-200">
					<ShoppingCart size={20} className="mr-2" />
					Add to Cart
				</button>
			</div>
		</div>
	);
}
