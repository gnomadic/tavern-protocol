
import Link from 'next/link';

type GameCardProps = {
    url: string
}

export default function CreateCard(props: GameCardProps) {

    return (

        <Link 
        className=' py-24 border-2 border-tavernGreen text-tavernGreen rounded-md text-center relative' 
        href={props.url} >
                <div className='text-4xl top-1/2 right-1/2 absolute -translate-y-1/2'>
                    +
                </div>
        </Link>
    );
}
