export declare class createUser {
    name: string;
    email: string;
    password: string;
    address: string;
    phone: number;
    country: string;
    city: string;
    confirmPassword: string;
    isAdmin?: boolean;
    birthdate: string;
}
export declare class updateUser {
    name?: string;
    email?: string;
    password?: string;
    address?: string;
    phone?: number;
    country?: string;
    city?: string;
    isAdmin?: boolean;
}
