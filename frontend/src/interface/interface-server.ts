export interface ResponseMessage {
    status?: number
    message?: string
    detail?: ErrorDetail[]
};

interface ErrorDetail {
    type: string;
    loc: any[];
    msg: string;
    input: string;
    ctx: any;
    url: string;
}