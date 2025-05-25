import Image from "next/image";
import { toast } from "sonner";

export function ShowToast(title:string,text:string,image?:string){
    toast(
        <div className="text-center w-full">
            <h2 className="text font-bold my-2">{title}</h2>
            <div className="flex items-center justify-center gap-4">
            {image && <Image src={image} alt="product" width={50} height={50} />}
            <p>{text}</p>
            </div>
        </div>
    );
}