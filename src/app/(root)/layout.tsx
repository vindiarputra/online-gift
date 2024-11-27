import Footer from "@/components/Organisms/Footer";
import Navbar from "@/components/Organisms/Navbar";
import { CartProvider } from "@/context/CartContext";


export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<CartProvider>
				<Navbar />
				<main>{children}</main>
				<Footer />
			</CartProvider>
		</>
	);
}
