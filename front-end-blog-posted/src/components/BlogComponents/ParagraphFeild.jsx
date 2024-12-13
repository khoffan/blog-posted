import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import IconAwesome from "../IconAwesome";
import TextNavigate from "./TextNavigate";

export default function ParagraphFeild({
    paragraphs,
    handleContent,
    activeIndex,
    paragraphRef,
    handleKeydown,
    handleFocus,
    isTextnavigate,
    handleNavatebutton,
}) {
    return (
        <div className="flex flex-col justify-start w-1/2">
            {paragraphs.map((paragraph, index) => (
                <>
                    <div key={index} className="flex gap-4 relative">
                        {activeIndex === index && (
                            <button
                                className="absolute left-[-50px] pt-[16px] outline-none"
                                onClick={() => handleNavatebutton(index)}
                            >
                                <IconAwesome iconName={faCirclePlus} />
                            </button>
                        )}
                        {!isTextnavigate[index] ? (
                            <textarea
                                ref={(el) => (paragraphRef.current[index] = el)}
                                className="left-[0px] min-w-[80%] min-h-[20px] my-[8px] pt-[4px] text-base outline-none resize-none"
                                onChange={(event) =>
                                    handleContent(event, index)
                                }
                                onKeyDown={(event) =>
                                    handleKeydown(event, index)
                                }
                                onFocus={() => handleFocus(index)}
                                placeholder={index === 0 ? "Title" : "Content"}
                                value={paragraph}
                            ></textarea>
                        ) : (
                            <TextNavigate />
                        )}
                    </div>
                </>
            ))}
        </div>
    );
}
