import React from 'react'
import Link from "next/link";

const Feature = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                {[
                    {
                        icon: '🏨',
                        title: 'PGs & Hotels',
                        text: 'Browse verified listings near your desired location.',
                        href: '/pg-hotel',
                        linkText: 'Explore',
                    },
                    {
                        icon: '📍',
                        title: 'Residing Areas',
                        text: 'Know more about popular student and working localities.',
                        href: '/areas',
                        linkText: 'Check Areas',
                    },
                    {
                        icon: '💬',
                        title: 'Community',
                        text: 'Post questions, reviews, or connect with fellow students.',
                        href: '/community',
                        linkText: 'Join Forum',
                    },
                ].map((card, idx) => (
                    <div key={idx} className="bg-blue-100 p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
                        <div className="text-3xl mb-4">{card.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                        <p className="text-sm text-gray-700 mb-3">{card.text}</p>
                        <Link href={card.href} className="text-blue-700 hover:underline font-medium">
                            {card.linkText}
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default Feature
