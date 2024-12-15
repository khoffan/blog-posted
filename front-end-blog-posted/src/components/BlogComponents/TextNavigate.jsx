import { faCirclePlay, faImage } from "@fortawesome/free-solid-svg-icons";
import IconAwesome from "../IconAwesome";

export default function TextNavigate({ handleFile }) {
    return (
        <>
            <ul className="flex gap-4 p-2 h-[60px] w-full">
                <label
                    htmlFor="file-upload"
                    className="w-[40px] h-[30px] py-2 cursor-pointer"
                >
                    <IconAwesome iconName={faImage} />
                </label>
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={console.log("file")}
                />
                <button type="button" className="inline w-[40px] h-[40px] mr-2">
                    <IconAwesome iconName={faCirclePlay} />
                </button>
            </ul>
        </>
    );
}
