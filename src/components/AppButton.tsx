
interface Props {
    title?: string,
    type?: "danger" | "normal" | "regular"
    onClick?(): void
}
export const AppButton: React.FC<Props> = ({ title, type, onClick }) => {
    let color = "";
    switch (type) {
        case "danger": color = "bg-red-500";
            break;
        case "normal": color = "bg-blue-500";
            break;
        case "regular": color = "bg-gray-500";
            break;
        default: color = "bg-blue-500";
            break;
    }

    return <button className={` ${color} text-white p-2`} onClick={onClick}>{title}</button>

}