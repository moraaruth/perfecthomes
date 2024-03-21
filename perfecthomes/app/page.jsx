import Navbar from "@/components/Navbar";
import Link from "next/link";

const HomePage = () => {
    return <div>
        <Navbar />
        <h1 className="text-3xl">Welcome</h1>
        <Link href="/properties">Show Properties</Link>
    </div>
}

export default HomePage;