// data types for the API requests and responses

// user -> id, email, first name, last name, nickname, photo, token, 
// refresh token, dob, 

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    nickname?: string;
    photoData?: string;
    tokens: {
        accessToken: string;
        refreshToken: string;
    }
    isVerified: boolean;
    dob?: Date;
}


