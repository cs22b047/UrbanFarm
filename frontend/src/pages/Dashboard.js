import img_icon from "../assets/image_icon.png";
import { Link } from "react-router-dom";
import Chatbot from "../components/chat-bot";


const Dashboard = () => {

    return (
        <>
                <h1>In Dashboard</h1>
                <Link to="/upload_image">
                    <div className="w-fit flex flex-row mx-10 border-2 border-green-500 no-underline class">
                        <img src={img_icon} className="h-10" />
                        <p className="m-0 text-green-500 no-underline text-ellipsis text-3xl mx-10" style={{ textDecoration: "none" }}>UPLOAD IMAGE</p>
                    </div>
                </Link>
                <div className="w-[400px] z-10 fixed right-0 bottom-0 mr-20">
                    <Chatbot></Chatbot>
                </div>



        </>
    )
}

export default Dashboard;