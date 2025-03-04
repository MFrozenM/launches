import React from 'react';
import Image from "next/image";
import RocketIcon from "@/icons/rocket.icon.svg";
import {_utc_to_local_time} from "@/components/launches/launches.logic";
import {LaunchModel} from "@/features/launches/launches.model";
import clsx from "clsx";

interface Props {
    launch_data: LaunchModel;
}

const Launch = ({launch_data}: Props) => {
    const [expanded, setExpanded] = React.useState(false);

    function on_details_clicked() {
        setExpanded(expanded => !expanded);
    }

    return (
        <li className='flex flex-col'>
            <div className="flex flex-col gap-4 bg-secondary mt-4 rounded-2xl"
                 style={{background: 'linear-gradient(to right, #000000, #282828)'}}>

                {launch_data.links.flickr_images[0] ? <Image src={launch_data.links.flickr_images[0]}
                                                             alt={'image for ' + launch_data.mission_name}
                                                             width={700}
                                                             height={500}
                                                             style={{height: 'auto'}}
                                                             className='rounded-t-2xl'/> :
                    <div className='flex flex-col justify-center items-center w-full h-96 bg-white/5 rounded-t-2xl'>
                        <RocketIcon stroke="#ffffff" opacity={0.7} strokeWidth={3} width={75} height={75}/>
                    </div>

                }


                <div className='w-full p-5'>
                    <div className="flex items-center">
                        <RocketIcon stroke="white" strokeWidth={3} width={45} height={45}/>
                        <h3 className="text-4xl font-bold text-white ml-3">{launch_data.mission_name}</h3>
                    </div>


                    <p className={clsx('mt-7 cursor-pointer select-none text-lg leading-6 font-medium text-white/80', expanded ? 'line-clamp-none' : 'line-clamp-2')}
                       onClick={on_details_clicked}>
                        {launch_data.details}
                    </p>

                    <div className="mt-4 flex flex-col">
                        <div className="mt-1 max-w-2xl font-medium text-lg text-white flex flex-col md:flex-row">
                            <p className='text-white/80'>Launch Date:</p>
                            <p className='ml-0 md:ml-2'>
                                {_utc_to_local_time(launch_data.launch_date_utc)}
                            </p>
                        </div>

                        <div className="mt-1 max-w-2xl font-medium text-lg text-white flex flex-col md:flex-row">
                            <p className='text-white/80'>Mission ID:</p>
                            <p className='ml-0 md:ml-2'>
                                {launch_data.mission_id}
                            </p>
                        </div>

                        <div className="mt-1 max-w-2xl font-medium text-lg text-white flex flex-col md:flex-row">
                            <p className='text-white/80'>Recovered:</p>
                            <p className='ml-0 md:ml-2'>
                                {typeof launch_data.rocket.fairings?.recovered === 'boolean' ? launch_data.rocket.fairings?.recovered.toString() : '-'}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </li>
    );
};

export default Launch;
