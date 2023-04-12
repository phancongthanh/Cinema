export type Role = 'Admin' | 'Manager' | 'Member';

export default interface User
{
    id: string,
    username: string,
    name: string,
    email: string,
    role: Role
}