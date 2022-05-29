import React from 'react';
import Link from "next/link";
import {AiFillInstagram,AiOutlineTwitter} from "react-icons/ai";

function Footer(props: any) {
    return (
        <div className={"footer-container"}>
            <p>2022 JSM Headphones All rights reserved</p>
            <p className={"icons"}>
                <AiFillInstagram/>
                <AiOutlineTwitter/>
            </p>
        </div>
    );
}

export default Footer;
