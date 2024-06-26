import { Input as NextInput } from "@nextui-org/react"
import type React from "react"
import { useController, type Control } from "react-hook-form"

type Props = {
//   children: React.ReactNode
  name: string
  label: string
  placeholder?: string
  type?: string
  control: Control<any>
  required?: string
//   endContent?: JSX.Element
}

export const Input = ({
  name,
  label,
  placeholder,
  type,
  control,
  required = ""}: Props) => {
  const {
    field,
    fieldState: { invalid },
    formState: { errors },
  } = useController({
    name,
    control,
    rules: {
      required,
    },
  })

  return (
    <NextInput
      id={name}
      label={label}
      type={type}
      placeholder={placeholder}
      value={field.value}
      name={field.name}
      isInvalid={invalid}
      onChange={field.onChange}
      onBlur={field.onBlur}
      errorMessage={`${errors[name]?.message ?? ""}`}
    />
  )
}
