export type User = {
    auth_user_uuid: string;
    created_at: string;
    email: string;
    name: string;
    id: number;
}
export type Users = {
    users: User[];
} 