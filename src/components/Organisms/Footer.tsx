"use client";

import { useState, useEffect } from "react";
import { Gift, Facebook, Instagram, Twitter, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Footer() {
	const [expandedSection, setExpandedSection] = useState<string | null>(null);
	const [email, setEmail] = useState("");
	const [isEmailValid, setIsEmailValid] = useState(false);

	const toggleSection = (section: string) => {
		setExpandedSection(expandedSection === section ? null : section);
	};

	useEffect(() => {
		setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
	}, [email]);

	const footerSections = [
		{
			title: "Discover",
			links: [
				{ name: "Our Story", href: "/about" },
				{ name: "Gift Finder", href: "/gift-finder" },
				{ name: "Gift Cards", href: "/gift-cards" },
			],
		},
		{
			title: "Customer Care",
			links: [
				{ name: "FAQs", href: "/faqs" },
				{ name: "Shipping", href: "/shipping" },
				{ name: "Returns", href: "/returns" },
			],
		},
	];

	const giftBoxes = [...Array(20)].map((_, i) => {
		const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
		const position = Math.random() * 100;
		let initial, animate;

		switch (side) {
			case 0: // top
				initial = { top: -50, left: `${position}%` };
				animate = { top: "100%", left: `${position}%` };
				break;
			case 1: // right
				initial = { top: `${position}%`, right: -50 };
				animate = { top: `${position}%`, right: "100%" };
				break;
			case 2: // bottom
				initial = { bottom: -50, left: `${position}%` };
				animate = { bottom: "100%", left: `${position}%` };
				break;
			case 3: // left
				initial = { top: `${position}%`, left: -50 };
				animate = { top: `${position}%`, left: "100%" };
				break;
		}

		return (
			<motion.div
				key={i}
				className="absolute text-accent/20"
				initial={initial}
				animate={animate}
				transition={{
					duration: Math.random() * 10 + 15,
					repeat: Infinity,
					ease: "linear",
					delay: Math.random() * 20,
				}}>
				<Gift size={48} />
			</motion.div>
		);
	});

	return (
		<footer className="bg-gradient-to-b from-primary/90 to-primary text-primary-foreground pt-12 pb-6 relative overflow-hidden bottom">
			{/* Animated gift boxes background */}
			{giftBoxes}

			<div className="container mx-auto px-4 relative z-10">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
					{/* Logo and tagline */}
					<div className="col-span-1 lg:col-span-2 flex flex-col items-center lg:items-start">
						<Link href="/" className="flex items-center mb-4 group">
							<motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.5 }}>
								<Gift
									size={48}
									className="text-accent mr-2 group-hover:text-secondary transition-colors duration-300"
								/>
							</motion.div>
							<span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary">
								GiftOnline
							</span>
						</Link>
						<p className="text-center lg:text-left text-lg italic mb-4">
							"Unwrap happiness, one click at a time"
						</p>
						<div className="flex space-x-4 mb-4">
							<TooltipProvider>
								{[
									{ icon: MapPin, tooltip: "123 Gift Street, Presentville", href: "/locations" },
									{ icon: Phone, tooltip: "+1 (555) 123-4567", href: "tel:+15551234567" },
									{
										icon: Mail,
										tooltip: "hello@giftonline.com",
										href: "mailto:hello@giftonline.com",
									},
								].map((item) => (
									<Tooltip key={item.tooltip}>
										<TooltipTrigger asChild>
											<Link
												href={item.href}
												className="hover:text-accent transition-colors duration-200">
												<item.icon size={24} />
											</Link>
										</TooltipTrigger>
										<TooltipContent>
											<p>{item.tooltip}</p>
										</TooltipContent>
									</Tooltip>
								))}
							</TooltipProvider>
						</div>
					</div>

					{/* Footer sections */}
					{footerSections.map((section) => (
						<div key={section.title} className="col-span-1">
							<h3 className="text-xl font-semibold mb-4 flex items-center">
								<motion.span
									initial={{ width: 0 }}
									animate={{ width: "auto" }}
									transition={{ duration: 0.5 }}
									className="h-1 bg-accent mr-2 inline-block"
								/>
								{section.title}
							</h3>
							<ul className="space-y-2">
								{section.links.map((link) => (
									<motion.li
										key={link.name}
										whileHover={{ x: 5 }}
										transition={{ type: "spring", stiffness: 300 }}>
										<Link
											href={link.href}
											className="hover:text-accent transition-colors duration-200">
											{link.name}
										</Link>
									</motion.li>
								))}
							</ul>
						</div>
					))}

					{/* Newsletter signup */}
					<div className="col-span-1 lg:col-span-2">
						<h3 className="text-xl font-semibold mb-4">Join Our Mailing List</h3>
						<p className="mb-4">Be the first to know about new gifts and exclusive offers!</p>
						<form onSubmit={(e) => e.preventDefault()} className="flex flex-col space-y-2">
							<Input
								type="email"
								placeholder="Your email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="bg-primary-foreground/10 border-accent"
							/>
							<Button
								type="submit"
								disabled={!isEmailValid}
								className="bg-accent hover:bg-accent/90 text-accent-foreground transition-colors duration-200">
								Subscribe
							</Button>
						</form>
					</div>
				</div>

				{/* Social media and legal */}
				<div className="mt-8 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center">
					<div className="flex space-x-4 mb-4 md:mb-0">
						{[
							{ icon: Facebook, href: "https://facebook.com", name: "Facebook" },
							{ icon: Instagram, href: "https://instagram.com", name: "Instagram" },
							{ icon: Twitter, href: "https://twitter.com", name: "Twitter" },
						].map((social) => (
							<motion.a
								key={social.name}
								href={social.href}
								whileHover={{ y: -5, scale: 1.1 }}
								className="hover:text-accent transition-colors duration-200">
								<social.icon size={24} />
								<span className="sr-only">{social.name}</span>
							</motion.a>
						))}
					</div>
					<div className="text-sm text-center md:text-right">
						<p>&copy; {new Date().getFullYear()} GiftOnline. Spreading joy worldwide.</p>
						<nav className="flex justify-center md:justify-end gap-4 mt-2">
							<Link href="/privacy" className="hover:text-accent transition-colors duration-200">
								Privacy
							</Link>
							<Link href="/terms" className="hover:text-accent transition-colors duration-200">
								Terms
							</Link>
							<Link
								href="/accessibility"
								className="hover:text-accent transition-colors duration-200">
								Accessibility
							</Link>
						</nav>
					</div>
				</div>
			</div>
		</footer>
	);
}
