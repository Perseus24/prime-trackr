'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function CatLoadingIndicator() {
    return (
        <div className="fixed bottom-10 right-10 z-50 flex flex-col items-center gap-2 ">
            <DotLottieReact
                src="/animations/Loader-cat.lottie"
                loop
                autoplay
                />
            <div className="px-3 py-2 bg-white rounded-lg">
                <p>your content is loading...</p>
            </div>
        </div>
    )
}