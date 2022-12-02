import { ReactNode } from "react";
import { Header } from "./Header";

interface Props {
    children: ReactNode;
}
export function Page({ children }: Props) {
    return (
        <>
            <Header />
            <section className="container mx-auto py-8">
                { children }
            </section>
        </>
    )
}