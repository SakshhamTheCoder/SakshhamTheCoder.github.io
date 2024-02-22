'use client';

import { useState, useCallback, useEffect } from 'react';
import { FaGithub, FaMusic } from 'react-icons/fa';
import HighlightedSpan from './components/HighlightedSpan';

export default function Home() {
    const texts = ['developer', 'music producer', 'designer'];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => {
                return prevIndex + 1 < texts.length ? prevIndex + 1 : 0;
            });
        }, 2000);

        return () => clearInterval(interval);
    });
    return (
        <main className="px-8 py-24 sm:px-48 sm:py-8  flex min-h-screen flex-col items-center justify-center">
            <h1 className="my-2 text-5xl sm:text-8xl font-bold w-full text-center">
                Hi 👋 I'm Sakshham, <br className="hidden sm:block"></br>a{' '}
                <HighlightedSpan>{texts[index]}</HighlightedSpan>
            </h1>
            <p className="my-2 sm:text-xl w-4/5 sm:w-2/5 text-center text-textColor">
                I am a computer science student, passionate about development, music production, and designing.
            </p>
            <div className="w-1/2 flex flex-col sm:flex-row justify-evenly items-center m-4 text-center">
                <a
                    href="https://github.com/sakshhamthecoder"
                    target="_blank"
                    className="w-full m-2 bg-primary hover:bg-[#DA003790] font-bold py-2 px-4 rounded-xl flex flex-row items-center justify-center"
                >
                    <FaGithub className="mr-3" size={20} />
                    GitHub
                </a>
                <a
                    href="https://sakshhamthecoder.github.io/SKSHHM-Music/"
                    target="_blank"
                    className="w-full m-2 bg-primary hover:bg-[#DA003790] font-bold py-2 px-4 rounded-xl flex flex-row items-center justify-center"
                >
                    <FaMusic className="mr-3" size={20} />
                    Music Portfolio
                </a>
            </div>

            {/* <img
                src="https://sakshhamthecoder.github.io/assets/images/avatar2.png"
                alt="Sakshham"
                className="rounded-full h-96 w-96"
            /> */}
        </main>
    );
}

