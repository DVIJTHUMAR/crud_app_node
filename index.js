const express = require( 'express' );
var bodyParser = require('body-parser')
const app = express();

const port = 3000;

app.set( 'view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/view',(req,res)=>{
    res.render('view',{emp})
})



let emp = [];

app.post('/employeeForm',(req,res)=>{
    
const myEmp = {

    id : emp.length + 1,
    name : req.body.name ,
    post : req.body.post ,
    zender : req.body.zender ,

}

emp.push(myEmp)

res.redirect("/view")

})

app.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    emp = emp.filter(employee => employee.id != id);
    res.redirect("/view");
});

app.get("/edit/:id", (req, res) => {
    const id = req.params.id;
    const employee = emp.find(employee => employee.id == id);
    res.render("edit", { employee });
});


app.post("/update/:id", (req, res) => {
    const id = req.params.id;
    const updatedEmployee = {
        id: parseInt(id),
        name: req.body.name,
        post: req.body.post,
        zender: req.body.zender,
        
    };
 emp = emp.map(employee => {
        if (employee.id == id) {
            return updatedEmployee;
        } else {
            return employee;
        }
    });
    res.redirect("/view");
});


app.listen(port,()=>{

    console.log(`surver is runing : ${port}`);

})