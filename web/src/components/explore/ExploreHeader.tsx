'use client';

import useDeployment from "@/hooks/useDeployment";
import BigTitle from "../base/BigTitle";


type TitleProps = {
    title: string;

}

export default function ExploreHeader(props: TitleProps) {

    const { deploy } = useDeployment();


    return (
        <>
            <div className="text-xs pl-4">
                {deploy.chain}
            </div>
            <BigTitle title={props.title} />
        </>
    );
}

