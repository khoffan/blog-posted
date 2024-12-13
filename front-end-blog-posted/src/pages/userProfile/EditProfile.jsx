import { useParams, useLocation } from "react-router-dom";
import UpdateProfileDetail from "../../components/profileComponents/UpdateProfileDetail";

export default function EditProfile() {
    const { id } = useParams();
    const location = useLocation();
    const { userObj } = location.state || {};

    return (
        <>
            <UpdateProfileDetail id={id} oldData={userObj} />
        </>
    );
}
