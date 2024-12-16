import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import IconAwesome from "../IconAwesome";
import TextNavigate from "./TextNavigate";

export default function ParagraphFeild({
    paragraphs = [],
    handleContent,
    activeIndex,
    paragraphRef,
    handleKeydown,
    handleFocus,
    isTextnavigate,
    handleNavatebutton,
    handleFileUpload,
    handleDeleteImage,
    blogImage = [],
}) {
    const getImageFile = (imageid) => {
        const image = blogImage.find((img) => img.id === imageid);
        return image
            ? `${import.meta.env.VITE_BASE_API_URI}/${image.image_path}`
            : "";
    };

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
                            paragraph.type === "text" ? (
                                <textarea
                                    ref={(el) =>
                                        (paragraphRef.current[index] = el)
                                    }
                                    className="left-[0px] min-w-[80%] min-h-[20px] my-[8px] pt-[4px] text-base outline-none resize-none"
                                    onChange={(event) =>
                                        handleContent(event, index)
                                    }
                                    onKeyDown={(event) =>
                                        handleKeydown(event, index)
                                    }
                                    onFocus={() => handleFocus(index)}
                                    placeholder={
                                        index === 0 ? "Title" : "Content"
                                    }
                                    value={paragraph.content}
                                ></textarea>
                            ) : (
                                <div className="w-full my-4 relative group">
                                    <img
                                        src={getImageFile(paragraph.content)}
                                        alt="blog_image"
                                        className="max-w-full h-auto"
                                        style={{ objectFit: "contain" }}
                                    />
                                    <button
                                        onClick={() => handleDeleteImage(index)}
                                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                    >
                                        <IconAwesome
                                            iconName={faTrash}
                                            size="sm"
                                        />
                                    </button>
                                </div>
                            )
                        ) : (
                            <TextNavigate
                                handleFile={handleFileUpload}
                                index={index}
                            />
                        )}
                    </div>
                </>
            ))}
        </div>
    );
}
