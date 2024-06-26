import React from "react"
import { NavButton } from "../nav-button"
import { BsPostcard } from "react-icons/bs"
import { FiUsers } from "react-icons/fi"
import { FaUsers } from "react-icons/fa"

export const Navbar = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li className="">
          <NavButton href="" icon={<BsPostcard />}>
            Пости
          </NavButton>
        </li>
        <li className="">
          <NavButton href="following" icon={<FiUsers />}>
            Подписки
          </NavButton>
        </li>
        <li className="">
          <NavButton href="followers" icon={<FaUsers />}>
            Подписчики
          </NavButton>
        </li>
      </ul>
    </nav>
  )
}
