import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";

// interface TeamMember {
// 	name: string;
// 	role: string;
// 	photo: string;
// }

// const teamMembers: TeamMember[] = [
// 	{ name: "Andi Pratama", role: "Project Manager", photo: "/placeholder.svg?height=80&width=80" },
// 	{ name: "Budi Santoso", role: "UI/UX Designer", photo: "/placeholder.svg?height=80&width=80" },
// 	{ name: "Citra Dewi", role: "Frontend Developer", photo: "/placeholder.svg?height=80&width=80" },
// 	{ name: "Dian Putri", role: "Backend Developer", photo: "/placeholder.svg?height=80&width=80" },
// 	{
// 		name: "Eko Nugroho",
// 		role: "Marketing Specialist",
// 		photo: "/placeholder.svg?height=80&width=80",
// 	},
// ];

export default function Footer() {
	return (
		<footer className="bg-gradient-to-r from-pink-100 to-purple-100 text-gray-700">
			<div className="max-w-6xl mx-auto px-4 py-10">
				{/* Team Info */}
				{/* <div className="mb-8">
					<h3 className="text-lg font-semibold mb-4">Our Team</h3>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
						{teamMembers.map((member, index) => (
							<div key={index} className="flex flex-col items-center text-center">
								<Image
									src={member.photo}
									alt={member.name}
									width={80}
									height={80}
									className="rounded-full mb-2"
								/>
								<h4 className="font-medium">{member.name}</h4>
								<p className="text-sm text-gray-600">{member.role}</p>
							</div>
						))}
					</div>
				</div> */}

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Quick Links */}
					<div>
						<h4 className="font-semibold mb-4">Quick Links</h4>
						<ul className="space-y-2 text-sm">
							<li>
								<Link href="#" className="hover:underline">
									Home
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:underline">
									Shop
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:underline">
									Gift Ideas
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:underline">
									About Us
								</Link>
							</li>
						</ul>
					</div>

					{/* Customer Service */}
					<div>
						<h4 className="font-semibold mb-4">Customer Service</h4>
						<ul className="space-y-2 text-sm">
							<li>
								<Link href="#" className="hover:underline">
									Contact Us
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:underline">
									FAQs
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:underline">
									Shipping & Returns
								</Link>
							</li>
							<li>
								<Link href="#" className="hover:underline">
									Gift Cards
								</Link>
							</li>
						</ul>
					</div>

					{/* Newsletter */}
					<div>
						<h4 className="font-semibold mb-4">Newsletter</h4>
						<p className="text-sm mb-4">Stay updated with our latest offers and gift ideas!</p>
						<form className="space-y-2">
							<Input type="email" placeholder="Enter your email" className="w-full bg-white" />
							<Button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white">
								Subscribe
							</Button>
						</form>
					</div>
				</div>

				{/* Social Media */}
				<div className="mt-8 flex justify-center space-x-4">
					<Link href="#" className="hover:text-pink-500 transition-colors">
						<Facebook size={20} />
						<span className="sr-only">Facebook</span>
					</Link>
					<Link href="#" className="hover:text-pink-500 transition-colors">
						<Instagram size={20} />
						<span className="sr-only">Instagram</span>
					</Link>
					<Link href="#" className="hover:text-pink-500 transition-colors">
						<Twitter size={20} />
						<span className="sr-only">Twitter</span>
					</Link>
				</div>

				{/* Copyright */}
				<div className="mt-8 pt-8 border-t border-gray-200 text-sm text-center">
					<p>&copy; {new Date().getFullYear()} OnlineGift Team Project. All rights reserved.</p>
					<div className="mt-2 space-x-4">
						<Link href="#" className="hover:underline">
							Privacy Policy
						</Link>
						<Link href="#" className="hover:underline">
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
