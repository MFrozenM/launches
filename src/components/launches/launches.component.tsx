import React, {useMemo, useState} from 'react';
import {GET_LAUNCHES} from "@/features/launches/launches.gql";
import {useQuery} from "@apollo/client";
import {LaunchesReturnedModel} from "@/features/launches/launches.model";
import Image from "next/image";
import Input from "@/ui-kit/input";
import Spinner from "@/ui-kit/spinner";
import PrevNextButtons from "@/components/launches/prev-next.component";
import Saturn from '../../../public/saturn.jpg';
import Launch from "@/components/launches/launch.component";
import {useRouter} from "next/router";
import {_filter_launches} from "@/components/launches/launches.logic";
import {LIMIT} from "@/components/launches/launches.constants";

const LaunchesComponent = () => {
    const router = useRouter();
    const {query} = router;
    const [value, setValue] = useState("");

    const offset = useMemo(() => {
        let parsedOffset = parseInt(query.offset as string, 10);
        if (parsedOffset % 25 !== 0) {
            parsedOffset = 0
        }
        return isNaN(parsedOffset) || parsedOffset < 0 ? 0 : parsedOffset;
    }, [query.offset]);

    const {data, loading, error, previousData} = useQuery<LaunchesReturnedModel>(GET_LAUNCHES, {
        variables: {LIMIT, offset},
    });

    const filtered = useMemo(() => {
        if (loading) return previousData;
        if (!data) return {launches: []};
        return value
            ? ({
                launches: _filter_launches(data?.launches, value)
            }) : data;
    }, [data, value, loading]);

    const change_search_param = (next_offset: number) => {
        router.replace({
            pathname: router.pathname,
            query: {...query, offset: next_offset}
        }, undefined, {shallow: true});
    }

    const load_more = () => {
        if (loading) {
            return
        }

        window.scrollTo({top: 0});
        const next_offset = offset + LIMIT;

        change_search_param(next_offset)
    };

    const load_less = () => {
        if (loading) {
            return
        }

        window.scrollTo({top: 0});
        const next_offset = offset - LIMIT;
        change_search_param(next_offset)
    };

    if (error) {
        return <div className='italic text-center flex justify-center items-center mt-10'>
            {value !== '' ? 'There\'s no results for your search' : 'Error'}
        </div>;
    }

    return (
        <div className='pb-20 flex flex-col justify-center items-center mx-auto w-11/12 max-w-[700px]'>

            <Image src={Saturn} alt="My Image"
                   width={0} height={0}
                   style={{width: '100vw', height: 'auto'}}
                   className='fixed z-[-2] top-0 left-0 backdrop-blur-2xl blur-md'
            />

            <div className="bg-primary opacity-75 z-[-2] blur-md w-screen h-screen fixed top-0 left-0"/>

            <div className='flex mt-20 w-full'>
                <div className='flex flex-row'>
                    <h1 className='text-4xl font-medium'>
                        Launches
                    </h1>
                    {loading && <Spinner styles={'size-7 ml-5 my-auto'}/>}
                </div>
            </div>

            <div className='flex flex-col-reverse mt-10 w-full md:flex-row'>
                <Input styles='w-full mt-5 md:mt-0' placeholder={'Search...'} value={value}
                       onChange={(e) => {
                           setValue(e.target.value)
                       }}/>

                <div className='flex justify-end w-fit md:w-full ml-auto'>
                    <PrevNextButtons loadMore={load_more} loadLess={load_less} data={data} limit={LIMIT}
                                     offset={offset}/>
                </div>
            </div>


            {filtered?.launches?.length === 0 ?
                <div className='italic text-center flex justify-center items-center mt-10'>
                    {value !== '' ? 'There\'s no results for your search' : 'Error'}
                </div>
                : <ul className="overflow-hidden sm:rounded-md w-full max-w-[700px] mx-auto">
                    {filtered?.launches.map((launch) => {
                        return <Launch key={launch.mission_id} launch_data={launch}/>
                    })}
                </ul>}

            {filtered?.launches && filtered?.launches.length > 0 ?
                <div className='mt-10 flex justify-center items-center ml-auto'>
                    <PrevNextButtons loadMore={load_more} loadLess={load_less} data={data} limit={LIMIT}
                                     offset={offset}/>
                </div> : null}
        </div>
    )
};

export default LaunchesComponent;
