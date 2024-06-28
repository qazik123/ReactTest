import type React from "react"
import {
  CardBody,
  CardFooter,
  CardHeader,
  Card as NextUiCard,
  Spinner,
} from "@nextui-org/react"
import {
  useDeletePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
} from "../../app/servises/postsApi"
import { useDeleteCommentMutation } from "../../app/servises/commentsApi"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { useSelector } from "react-redux"
import { selectCurrent } from "../../features/user/userSlice"
import { User } from "../user"
import { formatToClientData } from "../../utils/ormat-to-client-data"
import { RiDeleteBinLine } from "react-icons/ri"
import { Tapography } from "../tapography"
import { MetaInfo } from "../meta-info"
import { FaRegComment } from "react-icons/fa"
import { ErrorMessage } from "../error-message"
import { hasErrorField } from "../../utils/has-error-field"

type Props = {
  avatarUrl: string
  name: string
  authorId: string
  content: string
  commentId?: string
  commentsCount?: number
  createdAt?: Date
  id?: string
  cardFor: "comment" | "post" | "current-post"
}

export const Card: React.FC<Props> = ({
  avatarUrl = "",
  name = "",
  authorId = "",
  content = "",
  commentId = "",
  commentsCount = 0,
  createdAt,
  id = "",
  cardFor = "post",
}) => {
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
  const [triggerGetPostById] = useLazyGetPostByIdQuery()
  const [deletePost, deletePostStatus] = useDeletePostMutation()
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrent)

  const refetchPosts = async () => {
    switch (cardFor) {
        case 'post':
            await triggerGetAllPosts().unwrap();
            break;
        case 'current-post':
            await triggerGetAllPosts().unwrap();
            break;
        case 'comment':
            await triggerGetPostById(id).unwrap();
            break;
        default:
            throw new Error("неверний агрумент CardFor");
    }
  }

  const handleDelete = async () => {
    try {
        switch (cardFor) {
            case 'post':
                await deletePost(id).unwrap();
                await refetchPosts();
                break;
            case 'current-post':
                await deletePost(id).unwrap();
                navigate('/')
                break;
            case 'comment':
                await deleteComment(id).unwrap();
                await refetchPosts()
                break;
            default:
                throw new Error('неверний агрумент CardFor')
        }
    } catch (error) {
        if (hasErrorField(error)){
            setError(error.data.error)
        } else {
            setError(error as string)
        }
    }
  }

  return (
    <NextUiCard className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={`/users/${authorId}`}>
          <User
            name={name}
            className="text-small font-semibild leading-non text-default-600"
            avatarUrl={avatarUrl}
            description={createdAt && formatToClientData(createdAt)}
          />
        </Link>
        {authorId === currentUser?.id && (
          <div className="cursor-pointer" onClick={handleDelete}>
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBinLine />
            )}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        <Tapography>{content}</Tapography>
      </CardBody>
      {cardFor !== "comment" && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <Link to={`/posts/${id}`}>
              <MetaInfo count={commentsCount} Icon={FaRegComment} />
            </Link>
          </div>
          <ErrorMessage error={error} />
        </CardFooter>
      )}
    </NextUiCard>
  )
}
