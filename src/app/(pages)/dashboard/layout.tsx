import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="w-full">
                <Header />
                <main className="h-[calc(100%-84px)] p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
