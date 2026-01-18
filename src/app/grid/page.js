'use client';

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen px-8 py-24 sm:px-48 sm:py-8 box-border">
            <div
                className="
          grid
          grid-cols-2
          gap-4
          flex-grow
          auto-rows-fr
          sm:grid-cols-6
          sm:auto-rows-fr
        "
            >
                {/* title */}
                <div className="bg-[#DA003740] backdrop-blur-sm rounded-xl col-span-2 sm:col-span-6 flex items-center justify-center text-xl font-bold">
                    <h1 className="font-bold w-full text-center">
                        Hi 👋 I'm Sakshham, a developer
                    </h1>
                </div>

                {/* MOBILE LAYOUT (default) */}
                <div className="bg-[#DA003740] backdrop-blur-sm rounded-xl col-span-2 row-span-2 sm:col-span-3 sm:row-span-3 flex items-center justify-center">
                    <p className="text-center">
                        About Me: I am a computer science student passionate about development, music production, and designing.
                    </p>
                </div>

                <div className="bg-[#DA003740] backdrop-blur-sm rounded-xl col-span-1 row-span-3 sm:col-span-1 sm:row-span-3 flex items-center justify-center">
                    <p className="text-center">
                        Skills: React, Next.js, TailwindCSS, Python, Flutter, Firebase, SQL, MongoDB, APIs, Java, Canva, FL Studio.
                    </p>
                </div>

                <div className="bg-[#DA003740] backdrop-blur-sm rounded-xl col-span-1 row-span-3 sm:col-span-2 sm:row-span-4 flex items-center justify-center">
                    <p className="text-center">
                        Projects: Check out my work like CCS Merch Store, GoSnap, PortaNote, and more.
                    </p>
                </div>

                <div className="bg-[#DA003740] backdrop-blur-sm rounded-xl col-span-2 row-span-1 sm:col-span-2 sm:row-span-3 flex items-center justify-center">
                    <p className="text-center">
                        Education: B.Tech. in COE from Thapar Institute of Engineering & Technology, Patiala, Punjab, India.
                    </p>
                </div>

                <div className="bg-[#DA003740] backdrop-blur-sm rounded-xl col-span-1 row-span-2 sm:col-span-2 sm:row-span-3 flex items-center justify-center">
                    <p className="text-center">
                        Hobbies: Music Production, Gaming, Designing, Photography.
                    </p>
                </div>

                <div className="bg-[#DA003740] backdrop-blur-sm rounded-xl col-span-1 row-span-2 sm:col-span-2 sm:row-span-2 flex items-center justify-center">
                    <p className="text-center">
                        Connect: Visit my <a href="https://github.com/sakshhamthecoder" target="_blank" className="text-primary underline">GitHub</a> or <a href="https://music.sakshham.tech" target="_blank" className="text-primary underline">Music Portfolio</a>.
                    </p>
                </div>
            </div>
        </main>
    );
}