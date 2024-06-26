import React from 'react'
import { useGetAllPostsQuery } from '../../app/servises/postsApi'
import { CreatePost } from "../../components/create-post"

export const Posts = () => {
  const {data} = useGetAllPostsQuery();


  return (
    <>
      <div className='mb-10 w-full'>
        <CreatePost/>
      </div>
    </>
  )
}
