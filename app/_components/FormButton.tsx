"use client"

import {useFormStatus} from "react-dom";

const FormButton = ({className}: {className:string}) => {
    const {pending} = useFormStatus();

    return (
        <button type="submit" className={className} disabled={pending}>
            {
                pending ? "Loading..." : "Submit"
            }
        </button>
    )
}

export default FormButton
