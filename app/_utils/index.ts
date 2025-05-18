
export type IShowcae = {
    id: number,
    heading: string,
    description: string,
}

export const showcase: IShowcae[] = [
    {
        id: 1,
        heading: "Convenient Living Solutions",
        description: "Proximity-based accommodation ensures students and staff have easy access to their institutions."
    },
    {
        id: 2,
        heading: "Secure and Anonymous Discussions",
        description: "We provide 100% secure environment, where you can speck without care the law."
    },
    {
        id: 3,
        heading: "Affordable Living Solutions",
        description: "We provide affordable living solutions for students and staff."
    },
    {
        id: 4,
        heading: "Local Area information",
        description: "We provide local area information like stores, restaurants, medical shop and all the important things.  "
    }

]

export interface IResponse {
    data?: string | number | unknown ;
    message?: string;
    flag: boolean;
}

export  class AppResponse implements IResponse {
    data?: string | number | unknown;
    message?: string;
    flag: boolean;

    constructor(data?: string | number | unknown, message?: string, flag: boolean = true) {
        this.data = data;
        this.message = message;
        this.flag = flag;
    }
}

export interface IError {

    code: number;
    flag: boolean;
}

export class AppError extends Error implements IError  {
    code: number;
    flag: boolean;

    constructor(message: string, code: number, flag: boolean = false, name: string = "AppError") {
        super(message);
        this.message = message;
        this.code = code;
        this.flag = flag;
        Object.setPrototypeOf(this, AppError.prototype);
        this.name = name;
    }

}