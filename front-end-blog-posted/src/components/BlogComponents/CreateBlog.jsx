import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Nav from "../NavbarComponents/Nav";
import { useNavigate } from "react-router-dom";
import TagFeold from "./TagFeold";
import ParagraphFeild from "./ParagraphFeild";
import { Alert } from "../Alert";
import { PropTypes } from "prop-types";

export default function CreateBlog({ id }) {
    CreateBlog.propTypes = {
        id: PropTypes.string.isRequired,
    };
    const [paragraphs, setParagraphs] = useState([
        { type: "text", content: "" },
    ]);
    const [activeIndex, setActiveIndex] = useState(null);
    const [isTextnavigate, setIstextNavigate] = useState(
        Array(paragraphs.length).fill(false)
    );
    const [isCreateBlog, setIscreateBlog] = useState(false);
    const paragraphRef = useRef([]);
    const [title, setTitle] = useState("");
    const [blogImage, setBlogImage] = useState([]);
    const [contents, setContents] = useState("");
    const [tags, setTags] = useState([]);
    const [inputTag, setInputTag] = useState("");
    const [author, setAuthor] = useState({
        name: "",
        email: "",
        image: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (isTextnavigate.length != paragraphs.length) {
            setIstextNavigate(Array(paragraphs.length).fill(false));
        }
    }, [paragraphs]);

    //ดึงข้อมูลจาก localstorage
    useEffect(() => {
        try {
            const saveParagraphs = JSON.parse(
                localStorage.getItem("paragraphs")
            );
            console.log(saveParagraphs);

            if (saveParagraphs?.paragraphs) {
                setParagraphs(saveParagraphs.paragraphs);
                setBlogImage(saveParagraphs.images || []);
            } else {
                setParagraphs([
                    { type: "text", content: "" },
                    { type: "text", content: "" },
                ]);
                setBlogImage([]);
            }
        } catch (error) {
            console.log("err: ", error);
            setParagraphs([
                { type: "text", content: "" },
                { type: "text", content: "" },
            ]);
            setBlogImage([]);
        }
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_API_URI}/api/profile/${id}`
            );
            const autherRes = response.data.profile;
            console.log(response.data.profile);
            setAuthor({
                name: autherRes.first_name + " " + autherRes.last_name,
                email: autherRes.email,
                image: autherRes.image_path,
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProfile();
        setIscreateBlog(true);
    }, []);

    const handleFileUpload = async (e, index, blogid) => {
        const file = e.target.files[0];
        if (!file) {
            Alert("กรุณาเลือกรูปภาพ", "warning", "top");
            return;
        }
        const formData = new FormData();
        const imageid = `img_${Date.now()}`;
        formData.append("blogid", blogid);
        formData.append("imageid", imageid);
        formData.append("blog", file);
        try {
            const newParagraphs = [...paragraphs];
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_API_URI}/api/blog/images`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
            );

            const file_path = response.data.file.path;
            const file_name = response.data.file.filename;
            if (response.status === 200) {
                setBlogImage((prev) => [
                    ...prev,
                    {
                        id: imageid,
                        image_path: file_path,
                        image_name: file_name,
                    },
                ]);
                newParagraphs[index] = {
                    type: "image",
                    content: imageid,
                };
                newParagraphs.splice(index + 1, 0, {
                    type: "text",
                    content: "",
                }); // เพิ่ม textarea ใหม่เป็นค่าพื้นฐาน (ข้อความว่าง)
                setParagraphs(newParagraphs);
                localStorage.setItem(
                    "paragraphs",
                    JSON.stringify({
                        paragraphs: newParagraphs,
                        images: [
                            ...blogImage,
                            { id: imageid, image_path: file_path },
                        ],
                    })
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleKeydown = (event, index) => {
        if (event.key === "Enter") {
            event.preventDefault();

            const newParagraphs = [...paragraphs];
            newParagraphs.splice(index + 1, 0, { type: "text", content: "" }); // เพิ่ม textarea ใหม่เป็นค่าพื้นฐาน (ข้อความว่าง)
            setParagraphs(newParagraphs);
            setActiveIndex(index + 1);

            requestAnimationFrame(() => {
                if (paragraphRef.current[newParagraphs.length - 1]) {
                    paragraphRef.current[newParagraphs.length - 1].focus();
                }
            }, 0);
        }
        if (event.key === "Backspace") {
            const currentParagraph = paragraphs[index];
            if (
                (currentParagraph.type === "text" &&
                    currentParagraph.content === "") ||
                currentParagraph.type === "image"
            ) {
                if (paragraphs.length > 1) {
                    event.preventDefault();
                    const newParagraphs = [...paragraphs];
                    newParagraphs.splice(index, 1);
                    setParagraphs(newParagraphs);
                    localStorage.setItem(
                        "paragraphs",
                        JSON.stringify(newParagraphs)
                    );

                    const newIndex = index > 0 ? index - 1 : 0;
                    setActiveIndex(newIndex);

                    requestAnimationFrame(() => {
                        if (paragraphRef.current[newIndex]) {
                            paragraphRef.current[newIndex].focus();
                        }
                    }, 0);
                }
            }
        }

        // ลบรูปภาพเมื่อกด Delete
        if (event.key === "Delete" && paragraphs[index].type === "image") {
            handleDeleteImage(index);
        }
    };

    const handleContent = (event, index) => {
        const newparagraphs = [...paragraphs];
        newparagraphs[index] = {
            type: "text",
            content: event.target.value,
        };
        setParagraphs(newparagraphs);
        localStorage.setItem(
            "paragraphs",
            JSON.stringify({
                paragraphs: newparagraphs,
                images: [...blogImage],
            })
        );
    };

    //const handleChangeDescription = (event) => {
    //	setDescription(event.target.value);
    //};
    const handleFocus = (index) => {
        setActiveIndex(index);
        setIstextNavigate((prevSate) =>
            prevSate.map((state, i) => (i === index ? false : null))
        );
        // เมื่อมีการโฟกัสที่ <p> จะตรวจสอบตำแหน่งของ cursor
    };

    const handleNavatebutton = (index) => {
        setIstextNavigate((prevState) =>
            prevState.map((state, i) => (i === index ? !state : state))
        );
    };

    const handleInputChange = (e) => {
        setInputTag(e.target.value);
    };

    const handleDeleteImage = (index) => {
        const imageid = paragraphs[index].content;
        const newImage = blogImage.filter((img) => img.id !== imageid);
        setBlogImage(newImage);

        const newParagraphs = [...paragraphs];
        newParagraphs.splice(index, 1);
        if (newParagraphs.length === 0) {
            newParagraphs.push({ type: "text", content: "" });
        }
        setParagraphs(newParagraphs);
        localStorage.setItem(
            "paragraphs",
            JSON.stringify({
                paragraphs: newParagraphs,
                images: newImage,
            })
        );
    };

    const handleTagInputKey = (e) => {
        if (e.key === "Enter") {
            setInputTag("");
            const triminput = inputTag.trim();
            if (triminput && !tags.includes(inputTag)) {
                setTags([...tags, inputTag]);
                localStorage.setItem(
                    "tags",
                    JSON.stringify([...tags, triminput])
                );
            } else if (!tags.includes(inputTag)) {
                Alert("tag นี้มีอยู่ในรายการแล้ว", "warning", "top");
            } else {
                Alert("กรุณากรอก tag", "warning", "top");
            }
        }
    };

    const handleCloseTag = (tag) => {
        const updatedTags = tags.filter((t) => t !== tag);
        setTags(updatedTags);
        localStorage.setItem("tags", JSON.stringify(updatedTags));
    };

    useEffect(() => {
        if (paragraphs.length >= 1) {
            let header = paragraphs[0].content;
            let result = paragraphs
                .slice(1)
                .map((p) => {
                    if (p.type === "text") {
                        return p.content;
                    } else if (p.type === "image") {
                        return `[image:${p.content}]`;
                    }
                    return "";
                })
                .join("\n");
            setTitle(header);
            setContents(result);
        }
    }, [paragraphs]);

    const handleSubmitBlog = async (event) => {
        event.preventDefault();
        try {
            if (title === "" || contents === "" || author === null) {
                Alert("Please fill all the fields", "warning", "top");
                return;
            }

            const response = await axios.post(
                `${import.meta.env.VITE_BASE_API_URI}/api/creatBlogs`,
                {
                    title: title,
                    description: contents,
                    author,
                    blogImage: blogImage,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            if (response.status === 201) {
                localStorage.removeItem("paragraphs");
                setTitle("");
                setContents("");
                setParagraphs([]);
                await new Promise((resolve) => setTimeout(resolve, 500));
                for (let i = 0; i < tags.length; i++) {
                    await axios.post(
                        `${import.meta.env.VITE_BASE_API_URI}/api/tags`,
                        {
                            blogid: response.data.blog._id,
                            tagname: tags[i],
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                            withCredentials: true,
                        }
                    );
                }
                setTags([]);
                localStorage.removeItem("tags");
                navigate("/");
                Alert("บันทึกสําเร็จ", "success", "top", false);
                // alertMessage("บันทึกสําเร็จ", "success");
            } else {
                alert("ไม่สามารถ publish blog ได้");
            }
        } catch (error) {
            alert("ไม่สามารถ publish blog ได้");
            console.log(error);
        }
    };

    useEffect(() => {
        const localTags = localStorage.getItem("tags");
        if (localTags) {
            setTags(JSON.parse(localTags));
        }
    }, []);

    return (
        <>
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 ">
                <Nav
                    isCreateBlog={isCreateBlog}
                    publicState={handleSubmitBlog}
                />

                <ParagraphFeild
                    paragraphs={paragraphs}
                    handleContent={handleContent}
                    activeIndex={activeIndex}
                    paragraphRef={paragraphRef}
                    handleKeydown={handleKeydown}
                    handleFocus={handleFocus}
                    isTextnavigate={isTextnavigate}
                    handleNavatebutton={handleNavatebutton}
                    handleFileUpload={handleFileUpload}
                    handleDeleteImage={handleDeleteImage}
                    blogImage={blogImage}
                />

                <TagFeold
                    handleInputChange={handleInputChange}
                    handleTagInputKey={handleTagInputKey}
                    inputTag={inputTag}
                    tags={tags}
                    handleCloseTag={handleCloseTag}
                />
                <div className="w-full h-10"></div>
                {/* เพิ่มของ blog */}
            </div>
        </>
    );
}
