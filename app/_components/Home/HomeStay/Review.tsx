"use client"

import React, {useState} from 'react'
import UpvoteButton from "@/app/_components/Upvote";
import List from "@/app/_components/List";
import ReviewForm from "@/app/_components/Home/HomeStay/ReviewForm";
import Edit from "@/app/_components/Home/HomeStay/Edit";

type IReview = {
    _id: string;
    body: string;
    createdAt: string;
    commentUpvotes: number;
}

const Review = ({review}: { review: IReview[] }) => {
    const [openForm, setOpenForm] = useState<boolean>(false);
    return (
        <section className="mb-4 w-full relative h-[60vh] overflow-hidden">
            <div className="w-full relative flex-between">
                <h2 className="text-xl font-semibold">Reviews </h2>
                <button className="px-5 py-2 bg-green-500 rounded-md text-sm font-bold cursor-pointer"
                        onClick={() => setOpenForm(true)}>Add Review
                </button>

            </div>
            {
                openForm && <ReviewForm setOpenForm={setOpenForm}/>
            }
            <div className="w-full relative overflow-x-hidden mt-2">

                {
                    review.length === 0 ? (<div className="text-gray-500">No reviews yet.</div>) :
                        <List className="w-full overflow-y-scroll overflow-x-hidden h-full" data={review}
                              render={(item) => (<li
                                  key={item._id}
                                  className="bg-gray-100 rounded-lg p-3 flex flex-col md:flex-row md:items-center justify-between mb-2 relative"
                              >
                                  <Edit id={item._id}/>
                                  <div>
                                      <div className="text-gray-800">{item.body}</div>
                                      <div className="text-xs text-gray-500 mt-1">
                                          {new Date(item.createdAt).toLocaleString()}
                                      </div>
                                  </div>
                                  <UpvoteButton
                                      count={item.commentUpvotes}
                                  />
                              </li>)}/>
                }
            </div>
        </section>
    )
}
export default Review
