import { User as NextUiUser} from '@nextui-org/react';
import type React from 'react'
import { BASE_URL } from '../../constans';

type Props = {
    name: string;
    avatarUrl: string;
    description?: string;
    className?: string
}

export const User: React.FC<Props> = ({
    name = '',
    avatarUrl = '',
    description = '',
    className = ''
}) => {
  return (
    <NextUiUser 
        name={name}
        className={className}
        description={description}
        avatarProps={{
            src: `${BASE_URL}${avatarUrl}`
        }}
    />
  )
}
