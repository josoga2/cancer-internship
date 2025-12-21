interface HbButtonProps {
    text: string;
    type: 'primary' | 'secondary' | 'danger' | 'outline';
    onClick?: () => void;
}

export default function HbButton({ text, type, onClick }: HbButtonProps) {
    const buttonStyles: Record<string, string> = {
        primary: 'bg-hb-green rounded-md text-white hover:bg-hb-green-dark px-4 sm:px-6 text-base sm:text-lg py-1 font-bold border-2 border-hb-green  ',
        secondary: 'bg-hb-green rounded-md text-white hover:bg-hb-green-dark px-4 sm:px-6 text-base sm:text-lg py-1 font-bold border-2 border-hb-green',
        danger: 'bg-red-300 rounded-md text-white hover:bg-red-700 px-4 sm:px-6 text-base sm:text-lg py-1 font-bold border-2 border-red-600',
        outline: 'bg-white rounded-md text-hb-green hover:bg-hb-green hover:text-white border-2 border-hb-green text-base sm:text-lg px-4 sm:px-5 py-1 font-bold'
    };

    return <button className={buttonStyles[type]} onClick={onClick}>{text}</button>;
}
