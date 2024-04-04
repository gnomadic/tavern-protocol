import Image from 'next/image';
import divider1 from '../images/divider1.svg';
import { GlobeAltIcon } from '@heroicons/react/20/solid';

// import type * as CSS from 'csstype';
export default function Divider() {
  // const style: CSS.Properties = {
  //     color: 'white', // Type error on property
  //     textAlign: 'center', // Type error on value
  // };

  //   .custom-shape-divider-top-1712199679 {
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     width: 100%;
  //     overflow: hidden;
  //     line-height: 0;
  //     transform: rotate(180deg);
  // }

  // .custom-shape-divider-top-1712199679 svg {
  //     position: relative;
  //     display: block;
  //     width: calc(100% + 1.3px);
  //     height: 62px;
  // }

  // .custom-shape-divider-top-1712199679 .shape-fill {
  //     fill: #9B9B9B;
  // }

  return (
    // <div className="custom-shape-divider-top-1712199679">
    //     <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
    //         <path d="M892.25 114.72L0 0 0 120 1200 120 1200 0 892.25 114.72z" className="shape-fill"></path>
    //     </svg>
    // </div>
    <div className='flex justify-center'>
      {/* <Image width={45} height={45} src={GlobeAltIcon} alt="divider" /> */}
      <GlobeAltIcon
        className='mx-8 my-8 h-8 w-8'
        // style={{ display: "inline" }}
      />
    </div>
  );
}
