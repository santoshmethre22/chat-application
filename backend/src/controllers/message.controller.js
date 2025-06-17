//  getMessages, getUsersForSidebar, sendMessage 


export const getMessages=async(req, res)=>{
    try {
        

        
    } catch (error) {
        res.status(500).json({ message: "Error fetching messages" });
    }

}

export const getUsersForSidebar=async(req, res)=>{
try {
    
} catch (error) {
    res.status(500).json({ message: "Error fetching users for sidebar" });
}
}

export const sendMessage=async(req,res)=>{
try {
    
} catch (error) {
    res.status(500).json({ message: "Error sending message" });
}

}