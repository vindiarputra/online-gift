"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function CategoryBanner({
	id,
	label,
	description,
	image_url,
}: {
	id: string;
	label: string;
	description: string;
	image_url: string;
}) {
	const bannerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const banner = bannerRef.current;
		if (banner) {
			const handleMouseMove = (e: MouseEvent) => {
				const { left, top, width, height } = banner.getBoundingClientRect();
				const x = (e.clientX - left) / width;
				const y = (e.clientY - top) / height;

				banner.style.setProperty("--mouse-x", `${x}`);
				banner.style.setProperty("--mouse-y", `${y}`);
			};

			banner.addEventListener("mousemove", handleMouseMove);
			return () => banner.removeEventListener("mousemove", handleMouseMove);
		}
	}, []);

	return (
		<div
			ref={bannerRef}
			className="relative overflow-hidden rounded-lg shadow-2xl transition-all duration-300 ease-in-out hover:shadow-3xl"
			style={
				{
					"--mouse-x": "0.5",
					"--mouse-y": "0.5",
				} as React.CSSProperties
			}>
			<div
				className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 opacity-80"
				style={{
					backgroundPosition: "calc(var(--mouse-x) * 100%) calc(var(--mouse-y) * 100%)",
				}}></div>
			<Image
				src={image_url}
				alt={label}
				className="w-full h-[300px] md:h-[400px] object-cover object-center transition-transform duration-300 ease-in-out hover:scale-105"
				width={500}
				height={500}
			/>
			<div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-12">
				<h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
					{label.includes("Him") ? (
						<>
							Gifts for <span className="text-amber-400">Him</span>
						</>
					) : label.includes("Her") ? (
						<>
							Gifts for <span className="text-rose-400">Her</span>
						</>
					) : (
						""
					)}
				</h2>
				<p className="text-xl md:text-2xl text-gray-200 max-w-md font-light leading-relaxed">
					{description}
				</p>
				{label.includes("Him") ? (
					<div className="mt-6 w-16 h-1 bg-amber-400 rounded-full transition-all duration-300 ease-in-out hover:w-24"></div>
				) : label.includes("Her") ? (
					<div className="mt-6 w-16 h-1 bg-rose-400 rounded-full transition-all duration-300 ease-in-out hover:w-24"></div>
				) : (
					""
				)}
			</div>
		</div>
	);
}
