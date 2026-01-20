import Image from 'next/image'

interface BaseImageProps {
  src: string
  alt: string
  [key: string]: any
}

const BaseImage = ({ src, alt, ...props }: BaseImageProps) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/Hupscale_Finale' : ''
  const imageSrc = src.startsWith('/') ? `${basePath}${src}` : src
  
  return <Image src={imageSrc} alt={alt} {...props} />
}

export default BaseImage
