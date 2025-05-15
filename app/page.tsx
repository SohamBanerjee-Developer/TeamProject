import React from 'react'
import Card from "@/app/_components/Card";
import List from "@/app/_components/List";
import {IShowcae, showcase} from "@/app/_utils";

const Home = () => {
    return (
        <section className="h-full w-full relative overflow-x-hidden p-8 md:p-12 lg:flex lg:items-center lg:justify-center">
                <div className="hero flex-column gap-2 lg:w-1/2">
                    <div className="showcase-box flex-column gap-2">
                        <h1 className="text-4xl font-[700] header-font">Welcome to Senv</h1>
                        <p className="text-xl description-font">
                            Senv is a platform for sharing your homestay experience and anonymous reviews.
                            We provide 100% secure environment, <span className="text-orange-400 font-bold">
                            where you can speck without care the law.
                        </span>
                        </p>
                    </div>
                
                   <div className="relative w-full scorllbar-hide">
                       <div className="w-full relative text-center mb-5">
                           <h1 className="text-3xl header-font font-[700]">Our goals</h1>
                       </div>
                       <div className="w-full relative scrollbar-hide">
                           <List className="w-full overflow-x-hidden overflow-y-scroll flex-column gap-5 scrollbar-hide" data={showcase} render={(item: IShowcae) => <Card key={item.id} data={item} />}/>
                       </div>
                   </div>
                </div>

        </section>
    )
}
export default Home
