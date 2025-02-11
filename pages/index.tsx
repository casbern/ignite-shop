import Image from "next/image"
import shirt1 from '../assets/shirts/shirt1.png'
import shirt2 from '../assets/shirts/shirt2.png'
import shirt3 from '../assets/shirts/shirt3.png'
import shirt4 from '../assets/shirts/shirt4.png'

export default function Home() {
  return (
    <div className="flex gap-12">
       <div className="">
        <Image src={shirt1} alt="" width={520} height={480}/>
        
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
       </div>

       <div>
        <Image src={shirt2} alt="" width={520} height={480}/>
        
        <footer>
          <strong>Camiseta X</strong>
          <span>R$ 79,90</span>
        </footer>
       </div>
    </div>
  )
}
