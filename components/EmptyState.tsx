import { EmptyStateProps } from '@/types'
import React from 'react'
import Image from 'next/image'
const EmptyState = ({title,buttonLink,buttonText}:EmptyStateProps) => {
  return (
    <section>
    <Image
    src="/icons/emptyState.svg"
    width={250}
    height={250}
    alt='empty state'
    />
    </section>
  )
}

export default EmptyState