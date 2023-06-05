const Roles = {
    ADMIN: 'ADMIN',
    USER: 'USER'
}

const users = [
    {id:1,name:'Alex',role:Roles.ADMIN},
    {id:2,name:'Nikola',role:Roles.USER},
    {id:3,name:'Milos',role:Roles.USER}
];

const projects = [
    {id:1,userId:2,name:'Student exchange',budget:2000},
    {id:2,userId:3,name:'Student exchange',budget:3000},
    {id:3,userId:1,name:'Student exchange',budget:2500}
]

module.exports = {users, Roles, projects};