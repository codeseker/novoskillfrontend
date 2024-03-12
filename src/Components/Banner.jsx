import React from 'react'

export default function Banner() {
    return (
        <section class="text-gray-600 body-font ">
            <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
                <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                    <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">NovoSkill
                        <br class="hidden lg:inline-block" />The path to your Success
                    </h1>
                    <p class="mb-8 leading-relaxed">NovoSkill is more than just an online course platform, It's your personalized journey towards expertise and excellence. With a diverse range of meticulously curated courses.</p>
                    <div class="flex justify-center">
                        <button class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Explore Courses</button>
                    </div>
                </div>
                <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                    <img class="object-cover object-center rounded-lg" alt="hero" src="https://images.unsplash.com/photo-1620808629530-736c24a95f4b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=600&ixid=MnwxfDB8MXxyYW5kb218MHx8b25saW5lLWNvdXJzZXx8fHx8fDE3MDgwNzIwMTQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=720" />
                </div>
            </div>
        </section>
    )
}
