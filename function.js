const { Roles } = require("./users.data");

const authUser = (req,res,next)=>{
    if(req.user == null){
        res.status(403);
        return res.send('You have to sign in');
    }
    next();
}

const authRole = (role)=>{
    return (req,res,next)=>{
        const inputRole = req.user.role;
        if(inputRole !== role){
            res.status(401); // nedozvoljen pristup unauthorized
            return res.send('Not allowed')
        }

        next();
    }
}

const canViewProject = (user,project)=>{
    return (
        user.role === Roles.ADMIN ||
        project.userId === user.id
    )
}

const scopedProjects = (user,projects)=>{
    if(user.role === Roles.ADMIN) return projects;
    return projects.filter(p=>p.userId === user.id)
}

const authGetProject = (req,res,next)=>{
    if(!canViewProject(req.user, req.project)){
        res.status(401); // not allowed
        return res.send('You dont have permission');
    }
    next();
}

const canDeleteProject = (user,project)=>{
    return user.id === project.userId;
}

authDelete = (req,res,next)=>{
    if(!canDeleteProject(req.user,req.project)){
        return res.send('You dont have permission to delete');
    }
    next()
}

module.exports = {
    authUser, authRole,authGetProject, scopedProjects
}