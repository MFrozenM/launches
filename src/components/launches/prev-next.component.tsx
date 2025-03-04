import React from 'react';
import {LaunchesReturnedModel} from "@/features/launches/launches.model";

interface Props {
    loadLess: () => void;
    loadMore: () => void;
    offset: number;
    limit: number;
    data: LaunchesReturnedModel | undefined
}

const PrevNextButtons = ({loadMore, loadLess, offset, limit, data}: Props) => {
    return (
        <>
            <button onClick={loadLess} disabled={offset === 0} className='button disabled:bg-gray-500 disabled:cursor-default disabled:hover:scale-100 text-base'>
                Previous
            </button>
            <button className='button ml-5 disabled:bg-gray-500 disabled:cursor-default disabled:hover:scale-100 text-base' onClick={loadMore}
                    disabled={data ? data.launches.length < limit : false}>
                Next
            </button>
        </>
    );
};

export default PrevNextButtons;
