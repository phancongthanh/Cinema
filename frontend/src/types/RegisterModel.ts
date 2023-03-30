export default interface RegisterModel
{
    name: string,
    email: string,
    password: string,
    role: 'Admin'|'Manager'|'Member'
}