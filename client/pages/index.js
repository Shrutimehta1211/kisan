import React from 'react'
import { useRouter } from "next/router";

const Home = () => {
    const router = useRouter()
    return (
        <div className="relative overflow-hidden bg-no-repeat bg-cover" style={{
            backgroundPosition: "50%",
            backgroundImage: "url('https://mdbcdn.b-cdn.net/img/new/slides/146.webp')",
            height: "100vh"
        }}>
            <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}>
                <div className="flex justify-center items-center h-full">
                    <div className="text-center text-white px-6 md:px-12">
                        <h1 className="text-6xl font-extrabold mt-0 mb-6">KrushiVikas</h1>
                        <h3 className="text-4xl font-bold mb-8">Predict Your Crops and Plant Disease</h3>
                        <button type="button"
                            className="inline-block px-8 py-4 border-2 border-white text-white font-medium text-lg leading-tight uppercase rounded hover:bg-black hover:opacity-50 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                            data-mdb-ripple="true" data-mdb-ripple-color="light"
                            onClick={() => router.push("/register")}
                        >
                            Get started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home