import { useEffect, useState } from "react";

const ChatComponent = ({ onFilterChange }: { onFilterChange: (filter: any) => void }) => {
    const [userInput, setUserInput] = useState("");
    const [chatResponses, setChatResponses] = useState<string[]>([]);
    const [visible, setVisible] = useState(false);
    const [location, setLocation] = useState<string>("");
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [bedrooms, setBedrooms] = useState<number | null>(null);
    const [amenities, setAmenities] = useState<string[]>([]);

    const handleSendMessage = async () => {
        if (!userInput.trim()) return;

        try {
            const response = await fetch("/api/dialogflow", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: userInput }),
            });

            const result = await response.json();
            console.log(result);

            const payload = result.webhookPayload && result.webhookPayload.fields;

            if (payload) {

                if (payload.city.stringValue) {
                    setLocation(payload.city.stringValue);
                }
                else{
                    setLocation("");
                }
                if (payload.price.numberValue) {
                    setPriceRange([parseInt(payload.price.stringValue), parseInt(payload.price.stringValue)]);
                }
                else{
                    setPriceRange([0, 1000]);
                }
                if (payload.bed.numberValue>=0) {
                    console.log("setting bed");
                    console.log(payload.bed.numberValue);
                    setPriceRange(payload.bed.numberValue);
                }
                else{
                    setBedrooms(null);
                }
            }

            setChatResponses(prev => [...prev, `You: ${userInput}`, `Bot: ${result.fulfillmentText}`]);
            setUserInput("");
        } catch (error) {
            console.error("Error:", error);
        }
    };


    useEffect(() => {
        console.log(location);
        console.log(priceRange);
        console.log(bedrooms);
        onFilterChange({ location, priceRange, bedrooms,amenities });
    }, [priceRange, location, bedrooms]);

    return (
        <div className="fixed bottom-10 right-10">
            {visible && (
                <div className="bg-white rounded-lg absolute bottom-24 right-0 w-[350px] h-[500px] p-4 flex flex-col shadow-lg">
                    <div className="chat-response flex-grow overflow-y-auto mb-4 p-2 bg-gray-50 rounded-lg">
                        {chatResponses.map((message, index) => (
                            <p key={index} className={`p-2 rounded-lg mb-2 ${message.startsWith('You:') ? 'bg-blue-100 text-right' : 'bg-gray-200'}`}>
                                {message}
                            </p>
                        ))}
                    </div>
                    <div className="chat-box flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}

            <button
                onClick={() => setVisible(!visible)}
                className="bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
            >
                <img
                    className="w-16 h-16 rounded-full"
                    src="https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg?size=338&ext=jpg&ga=GA1.1.2113030492.1729296000&semt=ais_hybrid"
                    alt="Chat bot"
                />
            </button>
        </div>
    );
};

export default ChatComponent;