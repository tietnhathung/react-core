import React from 'react';

type FaIconProps = {
    icon: string,
    className?:string
}
const FaIcon =  ({icon="",className=""}:FaIconProps) =>  <i className={`${className} ${icon}`}></i>;

export default FaIcon;
