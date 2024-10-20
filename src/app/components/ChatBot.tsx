
import {useState} from "react";
import { useRouter } from "next/navigation";

const ChatComponent: React.FC = () => {
 const [visible,setVisible]=useState(false);
 const router=useRouter();
  return (
    <div className="fixed bottom-10 right-10">
        {
            visible && 
            <div className="absolute bottom-0 right-full">
                <iframe width="350" height="430" allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/2e6ba01d-3464-4215-8a85-c26f833a14bd"></iframe>
            </div>
        }
        <button onClick={()=>setVisible(!visible)}>
            <img  className="bg-transparent rounded-full w-20 h-20"  src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1729296000&semt=ais_hybrid" />
      </button>
    </div>
  );
};

export default ChatComponent;