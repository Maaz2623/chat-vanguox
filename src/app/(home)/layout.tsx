import { Navbar } from "@/modules/home/ui/components/navbar";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="">{children}</main>
    </div>
  );
}
