import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

interface Props {
    message: string
    loadingMessage: string
}

export default function SubmitButton ({ message, loadingMessage }: Props) {
    const { pending } = useFormStatus();

    return (
        <Button 
            className={`bg-black text-white py-2 px-4 rounded-md flex items-center gap-3 
                cursor-pointer text-sm ${pending ? 'pointer-events-none opacity-50' : ''}`}
            type="submit" 
            disabled={pending}>
            {
                pending && (
                    <Loader className="h-4 w-4 animate-spin" />
                )
            }
            {pending ? loadingMessage : message}
        </Button>
    )
}