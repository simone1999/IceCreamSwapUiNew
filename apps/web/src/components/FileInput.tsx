import { Input } from '@pancakeswap/uikit'
import React, { HTMLProps, useCallback, useEffect } from 'react'
import { Accept, useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { useTheme } from 'styled-components'

interface Props extends Omit<HTMLProps<HTMLInputElement>, 'accept'> {
  accept: Accept
}

const FileInput: React.FC<Props> = (props) => {
  const { name, accept, ...rest } = props
  const { register, unregister, setValue, watch } = useFormContext()
  const onDrop = useCallback(
    (droppedFiles) => {
      setValue(name, droppedFiles, { shouldValidate: true })
    },
    [setValue, name],
  )
  const files = watch(name) as File[]
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple: false,
  })
  useEffect(() => {
    register(name)
    return () => {
      unregister(name)
    }
  }, [register, unregister, name])
  const theme = useTheme()
  return (
    <>
      <Input
        as="div"
        {...getRootProps()}
        role="button"
        aria-label="File Upload"
        id={name}
        alignItems="center"
        display="inline-flex"
        style={{ color: files?.length ? theme.colors.text : theme.colors.textSubtle }}
      >
        {/* @ts-ignore */}
        <input {...rest} name={name} {...getInputProps()} />
        {(files && files[0].name) || 'Click here or drop a file to upload!'}
      </Input>
    </>
  )
}

export default FileInput
