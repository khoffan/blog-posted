import { useLocation } from "react-router-dom";
import DetailProfile from "../../components/profileComponents/DetailProfile";
import Footter from "../../components/Footter";
import Nav from "../../components/NavbarComponents/Nav";
export default function Profile() {
    const location = useLocation();
    const { user } = location.state || {};
    console.log(user);

    return (
        <>
            <div className="h-screen w-full flex flex-col gap-4">
                <Nav />
                <DetailProfile userObj={user} />
            </div>
            <Footter />
        </>
    );
}
