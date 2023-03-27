export default interface User
{
    id: string,
    username: string,
    name: string,
    email: string,
    role: 'Admin'|'Manager'|'Member'
}