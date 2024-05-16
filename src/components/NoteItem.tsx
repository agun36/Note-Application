import { AppButton } from "./AppButton"

interface Props {
    title?: string,
    description?: string,
    onViewClick?(): void,
    onEditClick?(): void,
    onDelete?(): void
}
export const NoteItem: React.FC<Props> = ({ title, description, onViewClick, onEditClick, onDelete }) => {

    return (
        <div className="bg-white shadow-md rounded p-5">
            <p className="font-semibold text-gray-700 text-lg mb-4">{title}</p>
            {description && <p className="ml-2  text-lg ">{description}</p>}
            <div className="space-x-4">
                <AppButton
                    title={description ? "Hide " : "View"}
                    type="regular"
                    onClick={onViewClick}
                />
                <AppButton
                    title="Edit"
                    type="normal"
                    onClick={onEditClick}
                />
                <AppButton
                    title="Delete"
                    type="danger"
                    onClick={onDelete}
                />
            </div>
        </div>
    )
}