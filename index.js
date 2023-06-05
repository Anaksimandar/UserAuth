const express = require('express');
const app = express();
const PORT = 5000;
const {projects,users,Roles} = require('./users.data');
const {authUser, scopedProjects, authGetProject, authRole} =  require('./function')

const setUser = (req,res,next)=>{
    const userId = req.body.userId;
    if(userId){
        req.user = users.find(user=>user.id === userId);
    }
    next();
}

const setProject = (req,res,next)=>{
    const projectId = parseInt(req.params.projectId);
    const project = projects.find(p=>p.id == projectId);
    req.project = project;
    console.log(project);
    if(req.project === null){
        res.status(404)
        return res.send('Project not found');
    }
    next();
}

app.use(express.json());
app.use(setUser);

app.get('/',authUser,(req,res)=>{
    res.json(scopedProjects(req.user,projects));
})

app.get('/project/:projectId',setProject, authUser, authGetProject, (req,res)=>{
    res.send(req.project);
})

app.get('/dashboard', authUser,(req,res)=>{
    res.send('Dashboard');
})

app.get('/admin', authUser ,authRole(Roles.ADMIN),(req,res)=>{
    res.send('Admin page');
})

app.post('/dasboard/add-user',(req,res)=>{
    res.send('User added');
})

app.delete('/project/:projectId',setProject,authUser, authDelete,(req,res)=>{
    res.send('Project is deleted');
})


app.listen(PORT,()=>{
    console.log('Server is active on port: ', PORT);
})
