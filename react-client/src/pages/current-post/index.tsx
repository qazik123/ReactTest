import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetPostByIdQuery } from '../../app/servises/postsApi'
import { Card } from '../../components/card'

export const CurrentPost = () => {
  const params = useParams<{id: string}>();
  const {data} = useGetPostByIdQuery(params?.id ?? '');

  if(!data) {
    return <h2>Поста не существует</h2>
  }

  const {
    content,
    id,
    authorId,
    comments,
    author,
    createdAt
  } = data;

  return (
    <>
      <Card
        cardFor='current-post'
        avatarUrl={author.avatarUrl ?? ''}
        content={content}
        name={author.name ?? ''}
        commentsCount={comments.length}
        authorId={authorId}
        id={id}
        createdAt={createdAt}
      />

    </>
  )
}


