import Image, { ImageProps } from 'next/image'
import ice from '../../../../public/images/icecream.png'

const GradientLogo: React.FC<any> = (props) => {
  return <Image src={ice} alt="IceCreamSwap" {...props} />
}

export default GradientLogo
