import React, {FC} from 'react';
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    styles?: string;
}

const Input: FC<InputProps> = ({...props}) => {
    return (
        <input
            {...props}
            className={clsx('bg-secondary outline-none appearance-none border-none focus:border-transparent focus:ring-0 focus:outline-none focus-visible:outline-none border-2 border-gray-200 rounded-lg py-3 px-4 text-white text-base leading-tight', props.styles)}
        />
    );
};

export default Input;
