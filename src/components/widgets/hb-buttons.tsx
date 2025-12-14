interface HbButtonProps {
    text: string;
    type: 'primary' | 'secondary' | 'danger' | 'outline';
    onClick?: () => void;
}

export default function HbButton({ text, type }: HbButtonProps) {
    const buttonStyles: Record<string, string> = {
        primary: 'bg-hb-green rounded-md text-white hover:bg-hb-green-dark px-4 sm:px-6 text-base sm:text-lg py-2 sm:py-2.5 font-bold border-2 border-hb-green min-w-40 sm:min-w-64',
        secondary: 'bg-hb-green rounded-md text-white hover:bg-hb-green-dark px-4 sm:px-6 text-base sm:text-lg py-2 sm:py-2.5 font-bold border-2 border-hb-green',
        danger: 'bg-red-300 rounded-md text-white hover:bg-red-700 px-4 sm:px-6 text-base sm:text-lg py-2 sm:py-2.5 font-bold border-2 border-red-600',
        outline: 'bg-white rounded-md text-hb-green hover:bg-hb-green hover:text-white border-2 border-hb-green text-base sm:text-lg px-4 sm:px-5 py-2 sm:py-2.5 font-bold'
    };

    return <button className={buttonStyles[type]}>{text}</button>;
}
