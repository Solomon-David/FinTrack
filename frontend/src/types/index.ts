// data types for the API requests and responses

// user -> id, email, first name, last name, nickname, photo, token, 
// refresh token, dob, 

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    nickname?: string;
    photoData?: Base64URLString;
    token: string;
    refreshToken: string;
    dob?: Date;
}


