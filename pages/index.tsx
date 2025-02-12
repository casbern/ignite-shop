import Image from "next/image"
import shirt1 from '../assets/shirts/shirt1.png'
import shirt2 from '../assets/shirts/shirt2.png'
import shirt3 from '../assets/shirts/shirt3.png'
import shirt4 from '../assets/shirts/shirt4.png'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

export default function Home() {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })
  return (
    <div ref={sliderRef} className=" keen-slider flex  w-full max-w-custom-calc ml-auto min-h-656 ">
       <a className="keen-slider__slide  group bg-product-gradient rounded-lg  cursor-pointer relative flex items-center justify-center object-cover">
        <Image src={shirt1} alt="" width={520} height={480}/>
        
        <footer className="absolute bottom-1 left-1 right-1 rounded-md p-8 flex items-center justify-between bg-product-footer translate-y-full opacity-0 transition-all duration-200 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
          <strong className="text-lg">Camiseta X</strong>
          <span className="text-xl font-bold text-green-300">R$ 79,90</span>
        </footer>
       </a>

       <a className="keen-slider__slide group bg-product-gradient rounded-lg  cursor-pointer relative flex items-center justify-center object-cover">
        <Image src={shirt2} alt="" width={520} height={480}/>
        
        <footer className="absolute bottom-1 left-1 right-1 rounded-md p-8 flex items-center justify-between bg-product-footer translate-y-full opacity-0 transition-all duration-200 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
          <strong className="text-lg">Camiseta X</strong>
          <span className="text-xl font-bold text-green-300">R$ 79,90</span>
        </footer>
       </a>

       <a className="keen-slider__slide group bg-product-gradient rounded-lg  cursor-pointer relative flex items-center justify-center object-cover">
        <Image src={shirt3} alt="" width={520} height={480}/>
        
        <footer className="absolute bottom-1 left-1 right-1 rounded-md p-8 flex items-center justify-between bg-product-footer translate-y-full opacity-0 transition-all duration-200 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
          <strong className="text-lg">Camiseta X</strong>
          <span className="text-xl font-bold text-green-300">R$ 79,90</span>
        </footer>
       </a>

       <a className="keen-slider__slide group bg-product-gradient rounded-lg p-1 cursor-pointer relative flex items-center justify-center object-cover">
        <Image src={shirt4} alt="" width={520} height={480}/>
        
        <footer className="absolute bottom-1 left-1 right-1 rounded-md p-8 flex items-center justify-between bg-product-footer translate-y-full opacity-0 transition-all duration-200 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
          <strong className="text-lg">Camiseta X</strong>
          <span className="text-xl font-bold text-green-300">R$ 79,90</span>
        </footer>
       </a>
    </div>
  )
}
