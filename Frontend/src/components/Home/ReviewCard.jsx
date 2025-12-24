
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Star } from 'lucide-react';

const reviews1 = [
  {
    name: "Daniel Carter",
    role: "Verified Buyer",
    text: "The craftsmanship is exceptional. The weight, finish, and detailing feel truly premium. It’s become my everyday watch."
  },
  {
    name: "Arjun Mehta",
    role: "Watch Enthusiast",
    text: "I’ve owned several watches, but this one stands out for its precision and elegant design. Worth every penny."
  },
  {
    name: "Liam Thompson",
    role: "Verified Buyer",
    text: "From packaging to the watch itself, everything felt carefully thought out. The quality exceeded my expectations."
  },
  {
    name: "Rohit Sharma",
    role: "Verified Buyer",
    text: "Minimal, timeless, and beautifully crafted. I receive compliments every time I wear it."
  },
];

const reviews2 = [
  {
    name: "Ethan Brooks",
    role: "Collector",
    text: "The attention to detail is impressive. You can feel the quality the moment you put it on your wrist."
  },
  {
    name: "Kunal Verma",
    role: "Verified Buyer",
    text: "Delivery was smooth and the watch looks even better in person. Elegant without being flashy."
  },
  {
    name: "Oliver Hayes",
    role: "Style Consultant",
    text: "A perfect balance of modern design and classic watchmaking. This brand understands restraint."
  },
  {
    name: "Siddharth Jain",
    role: "Verified Buyer",
    text: "Solid build, refined dial, and comfortable fit. Easily one of my best purchases this year."
  },
];



const ReviewCard = ({ review }) => (
    <div className="w-[400px] p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mx-4 flex-shrink-0 hover:bg-white/10 transition-colors cursor-default">
        <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-[#D4AF37] text-[#D4AF37]" />
            ))}
        </div>
        <p className="text-gray-300 text-lg mb-6 leading-relaxed">"{review.text}"</p>
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center font-bold text-white">
                {review.name.charAt(0)}
            </div>
            <div>
                <h4 className="text-white font-bold">{review.name}</h4>
                <p className="text-gray-500 text-sm">{review.role}</p>
            </div>
        </div>
    </div>
);

const Reviews = () => {
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);

    useGSAP(() => {
        // Row 1 - Move Left
        const width1 = row1Ref.current.scrollWidth / 2;
        gsap.to(row1Ref.current, {
            x: -width1,
            duration: 40,
            ease: "none",
            repeat: -1,
        });

        // Row 2 - Move Right
        const width2 = row2Ref.current.scrollWidth / 2;
        gsap.fromTo(row2Ref.current,
            { x: -width2 },
            {
                x: 0,
                duration: 45,
                ease: "none",
                repeat: -1,
            }
        );
    });

    return (
        <div className="w-full bg-black py-32 overflow-hidden relative">
            {/* Gradient Masks */}
            <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

            <div className="text-center mb-20 px-6">
                <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
                    CLIENT <span className="text-[#D4AF37]">STORIES</span>
                </h2>
                <p className="text-gray-400 text-xl">
                    Don't just take our word for it.
                </p>
            </div>

            <div className="flex flex-col gap-8">
                {/* Row 1 */}
                <div ref={row1Ref} className="flex w-max hover:[animation-play-state:paused]">
                    {[...reviews1, ...reviews1, ...reviews1].map((review, i) => (
                        <ReviewCard key={i} review={review} />
                    ))}
                </div>

                {/* Row 2 */}
                <div ref={row2Ref} className="flex w-max hover:[animation-play-state:paused]">
                    {[...reviews2, ...reviews2, ...reviews2].map((review, i) => (
                        <ReviewCard key={i} review={review} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Reviews;
