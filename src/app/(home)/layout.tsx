import { Navbar } from "@/modules/home/ui/components/navbar";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        className="absolute inset-0 opacity-5 -z-10 w-full min-h-full h-full bg-background dark:bg-[linear-gradient(#4c566a_1px,transparent_1px),linear-gradient(90deg,#4c566a_1px,transparent_1px)] 
      bg-[linear-gradient(#d8dee9_1px,transparent_1px),linear-gradient(90deg,#d8dee9_1px,transparent_1px)] 
        [background-size:20px_20px]
      "
      />
      <Navbar />
      <main className="">{children}</main>
    </div>
  );
}
