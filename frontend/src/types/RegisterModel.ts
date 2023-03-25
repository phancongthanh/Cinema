export default interface RegisterModel
{
    username: string,
    name: string,
    email: string,
    password: string,
    role: 'Admin'|'Manager'|'Member'
}