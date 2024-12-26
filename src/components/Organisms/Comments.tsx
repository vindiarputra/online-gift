"use client"

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";

interface TestimonialCardProps {
	quote: string;
	author: string;
	avatarSrc?: string;
	rating?: string;
	platform?: string;
}

function TestimonialCard({
	quote,
	author,
	avatarSrc = "/placeholder.svg?height=40&width=40",
	rating,
	platform = "Our Website",
}: TestimonialCardProps) {
	const initials = author
		.split(" ")
		.map((name) => name[0])
		.join("")
		.toUpperCase();

	return (
		<Card className="bg-teal-200 h-full">
			<CardContent className="p-6 flex flex-col justify-between h-full text select-none cursor-grab">
				<div>
					<div className="text-4xl text-teal-300 mb-2">"</div>
					<p className="text-teal-800 text-sm leading-relaxed mb-4">{quote}</p>
				</div>
				<div>
					<div className="flex items-center space-x-3 mb-2">
						<Avatar>
							<AvatarImage src={avatarSrc} alt={author} />
							<AvatarFallback>{initials}</AvatarFallback>
						</Avatar>
						<p className="text-teal-700 font-semibold">{author}</p>
					</div>
					{(rating || platform) && (
						<p className="text-teal-600 text-xs">
							{rating && `Rating: ${rating} `}
							{platform && `on ${platform}`}
						</p>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

export function Comments() {
	const testimonials = [
		{
			quote:
				"The personalized photo frame I ordered was absolutely perfect! It arrived quickly and was even more beautiful than I expected. A great gift for any occasion!",
			author: "Emily Johnson",
			rating: "5.0",
			platform: "GiftWonders.com",
		},
		{
			quote:
				"I was impressed by the wide selection of unique gifts. Found a handcrafted wooden music box that my wife adored. Excellent quality and fast shipping!",
			author: "Michael Chen",
			rating: "4.9",
			platform: "TreasuredPresents.net",
		},
		{
			quote:
				"The customer service was outstanding. They helped me choose the perfect gift basket for my parents' anniversary. Will definitely shop here again!",
			author: "Sarah Thompson",
			rating: "5.0",
			platform: "GiftGuru.com",
		},
		{
			quote:
				"I ordered a custom engraved watch as a graduation gift. The engraving was flawless, and it arrived in a beautiful gift box. Highly recommend!",
			author: "David Rodriguez",
			rating: "4.8",
			platform: "LuxeGifting.com",
		},
		{
			quote:
				"The eco-friendly gift options are amazing! I found a solar-powered garden ornament that my environmentally conscious friend absolutely loved.",
			author: "Olivia Green",
			rating: "4.9",
			platform: "EcoGifts.org",
		},
	];

	return (
		<>
			<Separator />
			<h1 className="font-semibold ml-4 pb-14 text-2xl mt-8 text-slate-600">
				What Are They Saying
			</h1>
			<Carousel
				plugins={[
					Autoplay({
						delay: 2500,
					}),
				]}
				className="w-full">
				<CarouselContent>
					{testimonials.map((testimonial, index) => (
						<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
							<div className="p-1">
								<TestimonialCard {...testimonial} />
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
			<Separator className="my-14" />
		</>
	);
}
