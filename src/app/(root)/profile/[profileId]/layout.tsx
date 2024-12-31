

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
	return (
		<section className="bg-background min-h-screen mt-16 max-w-4xl flex mx-auto">
			<div className="container mx-auto px-4 py-8">{children}</div>
		</section>
	);
}
