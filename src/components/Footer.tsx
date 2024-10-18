import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
	return (
		<footer className="bg-[#A6FAFF] border-t-4 border-black mt-12">
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="space-y-4">
						<h3 className="text-2xl font-bold transform -rotate-2">Our Company</h3>
						<ul className="space-y-2">
							<li>
								<a href="#" className="hover:underline">
									About Us
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									Careers
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									Press
								</a>
							</li>
						</ul>
					</div>
					<div className="space-y-4">
						<h3 className="text-2xl font-bold transform rotate-1">Customer Service</h3>
						<ul className="space-y-2">
							<li>
								<a href="#" className="hover:underline">
									Contact Us
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									FAQs
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									Shipping & Returns
								</a>
							</li>
						</ul>
					</div>
					<div className="space-y-4">
						<h3 className="text-2xl font-bold transform -rotate-1">Connect With Us</h3>
						<div className="flex space-x-4">
							<a
								href="#"
								className="bg-white p-2 border-2 border-black hover:bg-[#79F7FF] transition-colors duration-200">
								<Facebook size={24} />
								<span className="sr-only">Facebook</span>
							</a>
							<a
								href="#"
								className="bg-white p-2 border-2 border-black hover:bg-[#79F7FF] transition-colors duration-200">
								<Twitter size={24} />
								<span className="sr-only">Twitter</span>
							</a>
							<a
								href="#"
								className="bg-white p-2 border-2 border-black hover:bg-[#79F7FF] transition-colors duration-200">
								<Instagram size={24} />
								<span className="sr-only">Instagram</span>
							</a>
						</div>
					</div>
				</div>
				<div className="mt-8 pt-8 border-t-2 border-black">
					<form className="max-w-md mx-auto">
						<h3 className="text-2xl font-bold mb-4 transform rotate-1">
							Subscribe to Our Newsletter
						</h3>
						<div className="flex">
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-grow p-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-[#00E1EF]"
								required
							/>
							<button
								type="submit"
								className="bg-[#A6FAFF] border-2 border-black p-2 font-bold hover:bg-[#79F7FF] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-[#00E1EF] transition-all duration-200">
								<Mail size={24} />
								<span className="sr-only">Subscribe</span>
							</button>
						</div>
					</form>
				</div>
				<div className="mt-8 text-center">
					<p className="text-sm">
						&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
