export const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export const sendOtpEmail = async (email) => {
    if (!email || typeof email !== "string" || !email.includes("@")) {
        console.error("Invalid email provided.");
        return { success: false, message: "Invalid email address." };
    }

    const data = {
        recipient: email,
        code: generateOtp()
    };

    try {
        const response = await fetch('https://widgets-nmwnolh5hq-uc.a.run.app', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            console.error(`Error: ${response.status} ${response.statusText}`);
            return { success: false, message: `Failed to send email. HTTP ${response.status}` };
        }

        const responseData = await response.json();

        if (responseData.error) {
            console.error(`API Error: ${responseData.error}`);
            return { success: false, message: responseData.error };
        }

        console.log("Email sent successfully:", responseData);
        return { success: true, message: "Email sent successfully.", code: data.code, data: responseData, };

    } catch (error) {
        console.error("Fetch error:", error);
        return { success: false, message: "An error occurred while sending the email." };
    }
};