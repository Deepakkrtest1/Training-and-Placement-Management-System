const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');
const dbConnection = require('./database');
const multer = require('multer');
const readXlsxFile = require('read-excel-file/node');
const { body, validationResult } = require('express-validator');
const { response } = require('express');
//const flash = require('req-flash');
//const session = require('express-session');
const app = express();
app.use(express.urlencoded({extended:false}));

// SET OUR VIEWS AND VIEW ENGINE
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
//app.use(flash());
app.use('/css', express.static(__dirname + '/css'));
// APPLY COOKIE SESSION MIDDLEWARE
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge:  3600 * 1000 // 1hr
}));    
//TPO module
// DECLARING CUSTOM MIDDLEWARE
const ifNotLoggedin = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.render('tpo/login');
    }
    next();
}

const ifLoggedin = (req,res,next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/tpo/tpohome');
    }
    next();
}
// END OF CUSTOM MIDDLEWARE
// ROOT PAGE
app.get('/',function(req,res){
    res.render('home');
});
// END OF ROOT PAGE
// REGISTER PAGE LOGIN page
app.get('/tpo/login', ifNotLoggedin, (req,res,next) => {
    dbConnection.promise().execute("SELECT `tname` FROM `tpo` WHERE `tid`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('tpo/tpohome',{
            tname:rows[0].tname
        });
    });  
});
app.get('/tpo/signup',function(req,res){
    res.render('tpo/signup');
});


app.post('/tpo/signup', ifLoggedin, 
// post data validation(using express-validator)
[
    body('user_email','Invalid email address!').isEmail().custom((value) => {
        return dbConnection.promise().execute('SELECT `temail` FROM `tpo` WHERE `temail`=?', [value])
        .then(([rows]) => {
            if(rows.length > 0){
                return Promise.reject('This E-mail already in use!');
            }
            return true;
        });
    }),
    body('user_name','TPOname is Empty!').trim().not().isEmpty(),
    body('user_pass','The password must be of minimum length 6 characters').trim().isLength({ min: 6 }),
    body('collagename','Collagename is Empty!').trim().not().isEmpty(),
],// end of post data validation
(req,res,next) => {

    const validation_result = validationResult(req);
    const {user_name, user_pass, user_email, collagename} = req.body;
    // IF validation_result HAS NO ERROR
    if(validation_result.isEmpty()){
        // password encryption (using bcryptjs)
        bcrypt.hash(user_pass, 12).then((hash_pass) => {
            // INSERTING USER INTO DATABASE
            dbConnection.promise().execute("INSERT INTO `tpo`(`tname`,`temail`,`tpassword`,`collegename`) VALUES(?,?,?,?)",[user_name,user_email, hash_pass, collagename])
            .then((result) => {
                me="you add!"
                //res.render('tpo/signup',{message:me});
                res.redirect('/tpo/login');
            }).catch(err => {
                // THROW INSERTING USER ERROR'S
                if (err) throw err;
            });
        })
        .catch(err => {
            // THROW HASING ERROR'S
            if (err) throw err;
        })
    }
    else{
        // COLLECT ALL THE VALIDATION ERRORS
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        // REDERING login-register PAGE WITH VALIDATION ERRORS
        res.render('tpo/signup',{
            register_error:allErrors,
            old_data:req.body
        });
    }
});
// END OF REGISTER PAGE
app.post('/tpo/login', ifLoggedin, [
    body('user_email').custom((value) => {
        return dbConnection.promise().execute('SELECT `temail` FROM `tpo` WHERE `temail`=?', [value])
        .then(([rows]) => {
            if(rows.length == 1){
                return true;
                
            }
            return Promise.reject('Invalid Email Address!');
            
        });
    }),
    body('user_pass','Password is empty!').trim().not().isEmpty(),
], (req, res) => {
    const validation_result = validationResult(req);
    const {user_pass, user_email} = req.body;
    if(validation_result.isEmpty()){
        
        dbConnection.promise().execute("SELECT * FROM `tpo` WHERE `temail`=?",[user_email])
        .then(([rows]) => {
            bcrypt.compare(user_pass, rows[0].tpassword).then(compare_result => {
                if(compare_result === true){
                    req.session.isLoggedIn = true;
                    req.session.userID = rows[0].tid;

                    res.redirect('/tpo/tpohome');
                }
                else{
                    res.render('tpo/login',{
                        login_errors:['Invalid Password!']
                    });
                }
            })
            .catch(err => {
                if (err) throw err;
            });


        }).catch(err => {
            if (err) throw err;
        });
    }
    else{
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        // REDERING login-register PAGE WITH LOGIN VALIDATION ERRORS
        res.render('tpo/login',{
            login_errors:allErrors
        });
    }
});
// END OF LOGIN PAGE
// CHANGE PASSWORD PAGE
app.get("/tpo/changepass",function(req,res){
    dbConnection.promise().execute("SELECT * FROM `tpo` WHERE `tid`=?",[req.session.userID])
        .then(([rows])=> {
            if(!rows){
                res.send("invalid!");
            }
            else {
                console.log(rows);
                res.render('tpo/changepass', {res:rows[0], errs: [], success: []});
            }
        });
});
app.post("/tpo/changepass",(req,res)=>{
    const oldPassword= req.body.oldPassword;
    const newPassword= req.body.newPassword;
    const confirmPassword=req.body.confirmPassword;
    dbConnection.promise().execute("SELECT * FROM `tpo` WHERE `tid`=?",[req.session.userID])
        .then(([rows])=> {
         bcrypt.compare(oldPassword,rows[0].tpassword).then(comparresult =>{
            if(comparresult === true)
            {
                if(req.body.newPassword == req.body.confirmPassword){
                    bcrypt.hash(newPassword, 12).then(haspas=>{
                    dbConnection.execute("UPDATE tpo SET tpassword=? where tid=?",[haspas,req.session.userID],(result)=>{
                        res.render('tpo/changepass', {errs:[], res: [], success: [{message: "Password changed successfully"}]});
                    });
                 
                });
            }
            else {
                res.render('tpo/changepass', {errs:[{message: "Your new passwords don't match!"}], res: rows[0], success: []});
            } 
        }
        else{
            res.render('tpo/changepass', {errs: [{message: "Your old passsword does not match!"}], res: rows[0], success: []});
        }
    });   
    });
});
//END CHANGE PASSWORD PAGE
//TPOHOME PAGE
app.get('/tpo/tpohome',function(req,res){
    dbConnection.promise().execute("SELECT `tname` FROM `tpo` WHERE `tid`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('tpo/tpohome',{
            tname:rows[0].tname
        });
    });
});
//END OF TPOHOME PAGE
//TPOVIEW DETAILS
app.get('/tpo/viewdetailst',function(req,res){
        dbConnection.promise().execute("SELECT * FROM `tpo` WHERE `tid`=?",[req.session.userID])
        .then(([rows])=> {
            if(!rows){
                res.send("invalid!");
            }
            else {
                console.log(rows);
                res.render('tpo/viewdetailst', {res:rows[0]});
            }
        });
});
//END OF TPOVIEW DETAILS
//TPOEDIT DETAILS
app.get('/tpo/editdetailst',function(req,res){
        dbConnection.promise().execute("SELECT * FROM `tpo` WHERE `tid`=?",[req.session.userID])
        .then(([rows])=> {
            if(!rows){
                res.send("invalid!");
            }
            else {
                console.log(rows);
                res.render('tpo/editdetailst', {res:rows[0]});
            }
        });
});
app.post('/tpo/editdetailst',(req,res)=>{
    const {tname, collegename,mobileno,city,website,nirf,nacc,ncte,aicte,ugc} = req.body;
    dbConnection.execute("UPDATE `tpo` SET `tname` = ?,`collegename`= ?,city=?, `mobileno`= ?,website=?,nirf=?,nacc=?,ncte=?,aicte=?,ugc=? WHERE `tid` = ?",
    [tname, collegename,city,mobileno,website,nirf,nacc,ncte,aicte,ugc,req.session.userID],
    (err,results)=>{
        if (err) throw err;
            if(results.changedRows === 1){
                console.log('Post Updated');
                 res.redirect('/tpo/viewdetailst');
            }
    });
});
//END OF TPOEDIT DETAILS
//TPOVIEWCOMPANY DETAILS
app.get('/tpo/viewcompany',(req,res,next)=>{
    //res.render("tpo/viewcompany");
    var sql='SELECT * FROM company';
    dbConnection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('tpo/viewcompany', { title: 'User List', userData: data});
  });
});
//END OF TPOVIEWCOMPANY DETAILS
//TPOVIEWSTUDENT DETAILS
app.get('/tpo/viewstudent',(req,res,next)=>{
    dbConnection.query('SELECT s.sid,s.sname,s.semail,s.collegename,s.age,s.city,s.gender,s.smobileno,s.isverifed,UPPER(s.dname)as dname,s.passingyear,s.result10,s.result12,s.avgcgpa,s.backlogs FROM student s INNER JOIN tpo t on s.collegename=t.collegename WHERE t.tid=?',[req.session.userID], function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.render('tpo/viewstudent', { title: 'User List', userData: data});
  });
});
//END OF TPOVIEWSTUDENT DETAILS
//TPOEDIT DETAILS
app.get('/tpo(/editstudent/:id)',function(req,res){
    dbConnection.promise().execute("SELECT * FROM `student` WHERE `sid`=?",[req.params.id])
    .then(([rows])=> {
        if(!rows){
            res.send("invalid!");
        }
        else {
            console.log(rows[0]);
            res.render('tpo/editstudent', {res:rows[0]});
        }
    });
});
app.post('/tpo(/editstudent/:id)',(req,res)=>{
    const {sname,collegename,age,city,gender,smobileno,isverifed,dname,passingyear,result10,result12,avgcgpa,backlogs} = req.body;
    dbConnection.execute("UPDATE `student` SET sname=?,collegename=?,age=?,city=?,gender=?,smobileno=?,isverifed=?,dname=?,passingyear=?,result10=?,result12=?,avgcgpa=?,backlogs=? WHERE `sid` = ?",
    [sname,collegename,age,city,gender,smobileno,isverifed,dname,passingyear,result10,result12,avgcgpa,backlogs,req.params.id],
    (err,results)=>{
        if (err) throw err;
            if(results.changedRows === 1){
                console.log('Post Updated');
                 res.redirect('/tpo/viewstudent');
            }
    });
    });
//END OF TPOEDIT DETAILS
//TPO ADDSTUDENT 
global.__basedir = __dirname;
 
// -> Multer Upload Storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	   cb(null, __basedir + '/uploads/')
	},
	filename: (req, file, cb) => {
	   cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
	}
});

const upload = multer({storage: storage});
app.get('/tpo/addstudent',(req,res)=>{
	res.render('tpo/addstudent');
});
// -> Import Excel Data to MySQL database
function importExcelData2MySQL(filePath){
	// File path.
	readXlsxFile(filePath).then((rows) => {
		// `rows` is an array of rows
		// each row being an array of cells.	 
		// Remove Header ROW
		
        var tutorials = [];
        //var tutorial=[];
        console.log(rows[0].length)
        if(rows[0].length!=15){
          return 5;
        }
        rows.shift();
        rows.forEach((row) => {
            bcrypt.hash(row[2], 12).then((pas)=>{
                const newLocal = 2;
                row[newLocal]=pas; 
                console.log(row[newLocal]); 
                 var tutorial=[
                    sname=row[0],
                    semail=row[1],
                    spass=row[2],
                    collegename=row[3],
                    age=row[4],
                    city=row[5],
                    gender=row[6],
                    smobileno=row[7],
                    isverifed=row[8],
                    dname=row[9],
                    passingyear=row[10],
                    result10=row[11],
                    result12=row[12],
                    avgcgpa=row[13],
                    backlogs=row[14]
                ]  
                tutorials.push(tutorial);      
            });
           
        });
        //console.log(tutorials);      
        dbConnection.getConnection((error) => {
			
                var sql= 'INSERT INTO student (sname,semail,spass,collegename,age,city,gender,smobileno,isverifed,dname,passingyear,result10,result12,avgcgpa,backlogs) VALUES ?'
                dbConnection.query(sql, [tutorials], (error, response) => {  
                        console.log(error||response) ;        
                 });   
          
        });  
    });
    
}
// -> Express Upload RestAPIs
app.post('/tpo/addstudent', upload.single("uploadfile"), (req, res) =>{
	if (req.file == undefined) {
        var me="Please choose any Excel file !!";
        res.render("tpo/addstudent",{message:me,status:'danger'});
    }
    else if(['xls', 'xlsx'].indexOf(req.file.originalname.split('.')[req.file.originalname.split('.').length-1]) === -1) {
        var me="Please upload an excel file! you uploaded different format file.";
        res.render("tpo/addstudent",{message:me,status:'danger'}); 
    }
	else{
        var x= importExcelData2MySQL(__basedir + '/uploads/' + req.file.filename)
                var me="File uploaded/import and data add successfully!";
                res.render("tpo/addstudent",{message:me,status:'success'})       
           
	}
});

//END OF TPO ADDSTUDENT 
//TPO VIEW REQUEST OF COMPANY PAGE
app.get('/tpo/viewrequest',(req,res,next)=>{
    dbConnection.query('SELECT c.cname,j.jid,j.cid,j.place,j.salary,j.bondyears,j.jobtype,j.vacancy,j.lastdate,j.dateexam,j.dateinterview,j.college,j.department FROM jobdetail j INNER JOIN company c on j.cid=c.cid INNER JOIN tpo t on j.college=t.collegename WHERE j.request="yes" and j.accepted="no" and j.rejected="no" and t.tid=? ORDER BY j.jid DESC',[req.session.userID], function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.render('tpo/viewrequest', { title: 'User List', userData: data});
  });
});
//END OF TPO VIEW REQUEST OF COMPANY PAGE
app.get('/tpo/acceptrequest/:id',function(req,res){
    dbConnection.promise().execute("SELECT * FROM `jobdetail` WHERE `jid`=? ",[req.params.id])
    .then(([rows])=> {
        if(!rows){
            res.send("invalid!");
        }
        else {
            console.log(rows[0]);
            res.render('tpo/acceptrequest', {res:rows[0]});
        }
    });
});
app.post('/tpo/acceptrequest/:id',(req,res)=>{
    const {lastdate,dateexam,dateinterview} = req.body;
    dbConnection.execute("UPDATE `jobdetail` SET lastdate=?,dateexam=?,dateinterview=?,accepted=? WHERE `jid` = ?",
    [lastdate,dateexam,dateinterview,"yes",req.params.id],
    (err,results)=>{
        if (err) throw err;
            if(results.changedRows === 1){
                console.log('Post Updated');
                 res.redirect('/tpo/viewrequest');
            }
    });
});
app.get('/tpo/rejectrequest/:id',(req,res)=>{
    var id=req.params.id;
    dbConnection.execute("Update `jobdetail`set rejected=? where jid= ? ",["yes",id],
    (err,results)=>{
    if(err){
        res.send("Invalid");
    }
    else {
        res.redirect('/tpo/viewrequest');
    }
});
});
//END OF TPO VIEW REQUEST OF COMPANY PAGE
//TPO ONCAMPUSJOB PAGE
app.get('/tpo/oncampusjob',(req,res,next)=>{
    dbConnection.query('SELECT c.cname,j.jid,j.cid,j.place,j.salary,j.bondyears,j.jobtype,j.vacancy,j.lastdate,j.dateexam,j.dateinterview,j.college,j.department FROM jobdetail j INNER JOIN company c on j.cid=c.cid INNER JOIN tpo t on j.college=t.collegename WHERE j.request="yes" and j.accepted="yes" and j.rejected="no" and t.tid=?',[req.session.userID], function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.render('tpo/oncampusjob', { title: 'User List', userData: data});
  });
});
app.get('/tpo/editonjob/:id',function(req,res){
    dbConnection.promise().execute("SELECT * FROM `jobdetail` WHERE `jid`=? ",[req.params.id])
    .then(([rows])=> {
        if(!rows){
            res.send("invalid!");
        }
        else {
            console.log(rows[0]);
            res.render('tpo/editonjob', {res:rows[0]});
        }
    });
});
app.post('/tpo/editonjob/:id',(req,res)=>{
    const {lastdate,dateexam,dateinterview} = req.body;
    dbConnection.execute("UPDATE `jobdetail` SET lastdate=?,dateexam=?,dateinterview=? WHERE `jid` = ?",
    [lastdate,dateexam,dateinterview,req.params.id],
    (err,results)=>{
        if (err) throw err;
            if(results.changedRows === 1){
                console.log('Post Updated');
                 res.redirect('/tpo/oncampusjob');
            }
    });
});
app.get('/tpo/removeonjob/:id',(req,res)=>{
    var id=req.params.id;
    dbConnection.execute("Update `jobdetail` set accepted=? where jid= ? ",["no",id],
    (err,results)=>{
    if(err){
        res.send("Invalid");
    }
    else {
        res.redirect('/tpo/oncampusjob');
    }
});
});
app.get('/tpo/oncampapplied/:id',(req,res,next)=>{
    dbConnection.query('SELECT *,UPPER(dname)as dname FROM student s INNER JOIN applied a on s.sid=a.sid where a.jid=? ORDER BY a.aid desc ',[req.params.id], function (err, data, fields) {
    if (err) throw err;
    res.render('tpo/oncampapplied', { title: 'User List', userData: data});
  });
});
//END OF TPO ONCAMPUSJOB PAGE
//company module
// DECLARING CUSTOM MIDDLEWARE
const ifNotLoggedinc = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.render('company/login');
    }
    next();
}
const ifLoggedinc = (req,res,next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/company/companyhome');
    }
    next();
}
// END OF CUSTOM MIDDLEWARE
// COMPANY LOGIN AND SIGNUP PAGE
app.get('/company/login', ifNotLoggedinc, (req,res,next) => {
    dbConnection.promise().execute("SELECT `hrname` FROM `company` WHERE `cid`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('company/companyhome',{
            hrname:rows[0].hrname
        });
    });  
});
app.get('/company/signup',function(req,res){
    res.render('company/signup');
});

app.post('/company/signup', ifLoggedinc, 
// post data validation(using express-validator)
[
    body('user_email','Invalid email address!').isEmail().custom((value) => {
        return dbConnection.promise().execute('SELECT `cemail` FROM `company` WHERE `cemail`=?', [value])
        .then(([rows]) => {
            if(rows.length > 0){
                return Promise.reject('This E-mail already in use!');
            }
            return true;
        });
    }),
    body('user_name','HRname is Empty!').trim().not().isEmpty(),
    body('user_pass','The password must be of minimum length 6 characters').trim().isLength({ min: 6 }),
    body('companyname','Companyname is Empty!').trim().not().isEmpty(),
],// end of post data validation
(req,res,next) => {
    const validation_result = validationResult(req);
    const {user_name, user_pass, user_email, companyname} = req.body;
    // IF validation_result HAS NO ERROR
    if(validation_result.isEmpty()){
        // password encryption (using bcryptjs)
        bcrypt.hash(user_pass, 12).then((hash_pass) => {
            // INSERTING USER INTO DATABASE
            dbConnection.promise().execute("INSERT INTO `company`(`hrname`,`cemail`,`cpassword`,`cname`) VALUES(?,?,?,?)",[user_name,user_email, hash_pass, companyname])
            .then(result => {
                me="you add!"
               // res.render('company/signup',{message:me});
                res.redirect('/company/login');
            }).catch(err => {
                // THROW INSERTING USER ERROR'S
                if (err) throw err;
            });
        })
        .catch(err => {
            // THROW HASING ERROR'S
            if (err) throw err;
        })
    }
    else{
        // COLLECT ALL THE VALIDATION ERRORS
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        // REDERING login-register PAGE WITH VALIDATION ERRORS
        res.render('company/signup',{
            register_error:allErrors,
            old_data:req.body
        });
    }
});
// LOGIN PAGE
app.post('/company/login', ifLoggedin, [
    body('user_email').custom((value) => {
        return dbConnection.promise().execute('SELECT `cemail` FROM `company` WHERE `cemail`=?', [value])
        .then(([rows]) => {
            if(rows.length == 1){
                return true;
                
            }
            return Promise.reject('Invalid Email Address!');
            
        });
    }),
    body('user_pass','Password is empty!').trim().not().isEmpty(),
], (req, res) => {
    const validation_result = validationResult(req);
    const {user_pass, user_email} = req.body;
    if(validation_result.isEmpty()){
        
        dbConnection.promise().execute("SELECT * FROM `company` WHERE `cemail`=?",[user_email])
        .then(([rows]) => {
            bcrypt.compare(user_pass, rows[0].cpassword).then(compare_result => {
                if(compare_result === true){
                    req.session.isLoggedIn = true;
                    req.session.userID = rows[0].cid;

                    res.redirect('/company/companyhome');
                }
                else{
                    res.render('company/login',{
                        login_errors:['Invalid Password!']
                    });
                }
            })
            .catch(err => {
                if (err) throw err;
            });


        }).catch(err => {
            if (err) throw err;
        });
    }
    else{
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        // REDERING login-register PAGE WITH LOGIN VALIDATION ERRORS
        res.render('company/login',{
            login_errors:allErrors
        });
    }
});
// END OF COMPANY LOGIN AND SIGNUP PAGE
//COMPANY CHANGE PASSWORD
app.get("/company/changepass",function(req,res){
    dbConnection.promise().execute("SELECT * FROM `company` WHERE `cid`=?",[req.session.userID])
        .then(([rows])=> {
            if(!rows){
                res.send("invalid!");
            }
            else {
                console.log(rows);
                res.render('company/changepass', {res:rows[0], errs: [], success: []});
            }
        });
});
app.post("/company/changepass",(req,res)=>{
    const oldPassword= req.body.oldPassword;
    const newPassword= req.body.newPassword;
    const confirmPassword=req.body.confirmPassword;
    dbConnection.promise().execute("SELECT * FROM `company` WHERE `cid`=?",[req.session.userID])
        .then(([rows])=> {
         bcrypt.compare(oldPassword,rows[0].cpassword).then(comparresult =>{
            if(comparresult === true)
            {
                if(req.body.newPassword == req.body.confirmPassword){
                    bcrypt.hash(newPassword, 12).then(haspas=>{
                    dbConnection.execute("UPDATE company SET cpassword=? where cid=?",[haspas,req.session.userID],(result)=>{
                        res.render('company/changepass', {errs:[], res: [], success: [{message: "Password changed successfully"}]});
                    });
                 
                });
            }
            else {
                res.render('company/changepass', {errs:[{message: "Your new passwords don't match!"}], res: rows[0], success: []});
            } 
        }
        else{
            res.render('company/changepass', {errs: [{message: "Your old passsword does not match!"}], res: rows[0], success: []});
        }
    });   
    });
});
//END OF COMPANY CHANGE PASSWORD
//COMPANY HOME PAGE
app.get('/company/companyhome',function(req,res){
    dbConnection.promise().execute("SELECT `hrname` FROM `company` WHERE `cid`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('company/companyhome',{
            hrname:rows[0].hrname
        });
    });
});
//END OF COMPANY HOME PAGE
//COMPANY VIEWDETAILS
app.get('/company/viewdetailsc',function(req,res){
    dbConnection.promise().execute("SELECT * FROM `company` WHERE `cid`=?",[req.session.userID])
    .then(([rows])=> {
        if(!rows){
            res.send("invalid!");
        }
        else {
            console.log(rows);
            res.render('company/viewdetailsc', {res:rows[0]});
        }
    });
});
//END OF COMPANY VIEWDETAILS
//COMPANY EDITDETAILS
app.get('/company/editdetailsc',function(req,res){
    dbConnection.promise().execute("SELECT * FROM `company` WHERE `cid`=?",[req.session.userID])
    .then(([rows])=> {
        if(!rows){
            res.send("invalid!");
        }
        else {
            console.log(rows);
            res.render('company/editdetailsc', {res:rows[0]});
        }
    });
});
app.post('/company/editdetailsc',(req,res)=>{
const {hrname,cname,cwebsite,city,ctype,cinfo,cmobileno,empl} = req.body;
dbConnection.execute("UPDATE `company` SET `hrname` = ?,`cname`= ?, `cwebsite`= ?,`city`=?,`ctype`=?,`cinfo`=?,`cmobileno`=?,`empl`=? WHERE `cid` = ?",
[hrname, cname,cwebsite,city,ctype,cinfo,cmobileno,empl,req.session.userID],
(err,results)=>{
    if (err) throw err;
        if(results.changedRows === 1){
            console.log('Post Updated');
             res.redirect('/company/viewdetailsc');
        }
});
});
//END OF COMPANY EDITDETAILS
//COMPANY VIEW TPO PAGE
app.get('/company/viewtpo',(req,res,next)=>{
    var sql='SELECT * FROM tpo';
    dbConnection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('company/viewtpo', { title: 'User List', userData: data});
  });
});
//END OF COMPANY VIEW TPO PAGE
//COMPANY VIEW STUDENT PAGE
app.get('/company/viewstudent',(req,res,next)=>{
    dbConnection.query('SELECT *,UPPER(dname)as dname FROM student', function (err, data, fields) {
    if (err) throw err;
    res.render('company/viewstudent', { title: 'User List', userData: data});
  });
});
//END OF COMPANY VIEW STUDENT PAGE
//COMPANY DIRECTJOBANNOUNCE PAGE
app.get('/company/jobannounce',(req,res,next)=>{
    dbConnection.promise().execute("SELECT sid,sname,semail,spass,collegename,age,city,gender,smobileno,isverifed,UPPER(dname)as dname,passingyear,result10,result12,avgcgpa,backlogs FROM `student`")
    .then(([rows])=> {
        if(!rows){
            res.send("invalid!");
        }
        else {
            console.log(rows);
            res.render('company/jobannounce', {userData:rows,errs: [], success: []});
        }
    });
});
app.post('/company/jobannounce',(req,res)=>{
    var department
    for (department in req.body.department) {
        if (req.body.department) {
          var items = req.body.department;
            department = JSON.stringify(items).replace(/]|[[]|"/g, '',)
          //console.log(items);
        }
    }
    const {place,salary,bondyears,servagree,jobtype,jobinfo,vacancy,minavgcp,minblog,lastdate,dateexam,dateinterview,college} = req.body;
        dbConnection.promise().execute("INSERT INTO `jobdetail`(cid,place,salary,bondyears,servagree,jobtype,jobinfo,vacancy,minavgcp,minblog,lastdate,dateexam,dateinterview,college,department) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.session.userID,place,salary,bondyears,servagree,jobtype,jobinfo,vacancy,minavgcp,minblog,lastdate,dateexam,dateinterview,college,department])
        .then((results)=>{
        console.log(results)
        if(results[0].affectedRows === 1){
            console.log('JOB Updated');
            dbConnection.promise().execute("SELECT sid,sname,semail,spass,collegename,age,city,gender,smobileno,isverifed,UPPER(dname)as dname,passingyear,result10,result12,avgcgpa,backlogs FROM `student`")
            .then(([rows])=> {
            if(!rows){
                res.send("invalid!");
            }
            else {
                console.log(rows);
                res.render('company/jobannounce',{userData:rows, errs: [], success: [{message:"Job assign successfully"}]});
            }
            });  
        }
    });
    
});
//END OF COMPANY DIRECTJOBANNOUNCE PAGE
//COMPANY VIEWJOB PAGE
app.get('/company/viewjob',(req,res,next)=>{
    dbConnection.query('SELECT j.jid,j.cid,j.place,j.salary,j.bondyears,j.jobtype,j.vacancy,j.lastdate,j.dateexam,j.dateinterview,j.college,j.department FROM jobdetail j INNER JOIN company c on j.cid=c.cid WHERE c.cid=? and j.request="no" and j.accepted="no" ORDER BY j.jid DESC',[req.session.userID], function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.render('company/viewjob', { title: 'User List', userData: data});
  });
});
//END OF COMPANY VIEWJOB PAGE
//COMPANY EDITJOB PAGE
app.get('/company/editjob/:id',function(req,res){
    dbConnection.promise().execute("SELECT * FROM `jobdetail` WHERE `jid`=? and cid=?",[req.params.id,req.session.userID])
    .then(([rows])=> {
        if(!rows){
            res.send("invalid!");
        }
        else {
            console.log(rows[0]);
            res.render('company/editjob', {res:rows[0]});
        }
    });
});
app.post('/company/editjob/:id',(req,res)=>{
    const {place,salary,bondyears,servagree,jobtype,jobinfo,vacancy,minavgcp,minblog,lastdate,dateexam,dateinterview} = req.body;
    dbConnection.execute("UPDATE `jobdetail` SET place=?,salary=?,bondyears=?,servagree=?,jobtype=?,jobinfo=?,vacancy=?,minavgcp=?,minblog=?,lastdate=?,dateexam=?,dateinterview=? WHERE `jid` = ? and cid=?",
    [place,salary,bondyears,servagree,jobtype,jobinfo,vacancy,minavgcp,minblog,lastdate,dateexam,dateinterview,req.params.id,req.session.userID],
    (err,results)=>{
        if (err) throw err;
            if(results.changedRows === 1){
                console.log('Post Updated');
                 res.redirect('/company/viewjob');
            }
    });
});
app.get('/company/offcampapplied/:id',(req,res,next)=>{
    dbConnection.query('SELECT *,UPPER(dname)as dname FROM student s INNER JOIN applied a on s.sid=a.sid where a.jid=? ORDER BY a.aid desc',[req.params.id], function (err, data, fields) {
            if (err) throw err;
            res.render('company/offcampapplied', { title: 'User List', userData: data});
    });   
});
//END OF COMPANY EDITJOB PAGE
//COMPNAY DELETEJOB
app.get('/company/deletejob/:id',(req,res)=>{
    var id=req.params.id;
    dbConnection.execute("DELETE FROM `jobdetail` where jid= ? ",[id],
    (err,results)=>{
    if(err){
        res.send("Invalid");
    }
    else {
        res.redirect('/company/viewjob');
    }
});
});
//END OF COMPNAY DELETEJOB
//COMPANY REQUESTTPO PAGE
app.get('/company/requesttpo',(req,res,next)=>{
    dbConnection.promise().execute("SELECT t.tid,t.tname,t.temail,t.tpassword,t.collegename,t.city,t.mobileno,t.website,t.nirf,t.nacc,t.ncte,t.aicte,t.ugc,upper(s.dname) as dname FROM `tpo` t inner join student s on t.collegename=s.collegename")
    .then(([rows])=> {
        if(!rows){
            res.send("invalid!");
        }
        else {
            console.log(rows);
            res.render('company/requesttpo', {userData:rows,errs: [], success: []});
        }
    });
});
app.post('/company/requesttpo',(req,res)=>{
    var department
    for (department in req.body.department) {
        if (req.body.department) {
          var items = req.body.department;
            department = JSON.stringify(items).replace(/]|[[]|"/g, '',)
          //console.log(items);
        }
    }
    const {place,salary,bondyears,servagree,jobtype,jobinfo,vacancy,minavgcp,minblog,college} = req.body;
    console.log(req.body);
    const request="yes";
        dbConnection.promise().execute("INSERT INTO `jobdetail`(cid,place,salary,bondyears,servagree,jobtype,jobinfo,vacancy,minavgcp,minblog,college,department,request) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.session.userID,place,salary,bondyears,servagree,jobtype,jobinfo,vacancy,minavgcp,minblog,college,department,request])
        .then((results)=>{
        console.log(results)
        if(results[0].affectedRows === 1){
            console.log('request job');
            dbConnection.promise().execute("SELECT t.tid,t.tname,t.temail,t.tpassword,t.collegename,t.city,t.mobileno,t.website,t.nirf,t.nacc,t.ncte,t.aicte,t.ugc,upper(s.dname) as dname FROM `tpo` t inner join student s on t.collegename=s.collegename")
            .then(([rows])=> {
            if(!rows){
                res.send("invalid!");
            }
            else {
                console.log(rows);
                res.render('company/requesttpo',{userData:rows, errs: [], success: [{message:"Request sent to tpo for job assign successfully"}]});
            }
            });  
        }
    })
});
//END OF COMPANY REQUESTTPO PAGE
//COMPANY VIEWREQUEST PAGE
app.get('/company/viewrequest',(req,res,next)=>{
    dbConnection.query('SELECT j.jid,j.cid,j.place,j.salary,j.bondyears,j.jobtype,j.jobinfo,j.vacancy,j.college,j.department FROM jobdetail j INNER JOIN company c on j.cid=c.cid WHERE c.cid=? and j.request="yes" and j.accepted="no" and j.rejected="no" ORDER BY j.jid DESC',[req.session.userID], function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.render('company/viewrequest', { title: 'User List', userData: data});
  });
});
app.get('/company/editrequest/:id',function(req,res){
    dbConnection.promise().execute("SELECT * FROM `jobdetail` WHERE `jid`=? and cid=?",[req.params.id,req.session.userID])
    .then(([rows])=> {
        if(!rows){
            res.send("invalid!");
        }
        else {
            console.log(rows[0]);
            res.render('company/editrequest', {res:rows[0]});
        }
    });
});
app.post('/company/editrequest/:id',(req,res)=>{
    const {place,salary,bondyears,servagree,jobtype,jobinfo,vacancy,minavgcp,minblog} = req.body;
    dbConnection.execute("UPDATE `jobdetail` SET place=?,salary=?,bondyears=?,servagree=?,jobtype=?,jobinfo=?,vacancy=?,minavgcp=?,minblog=? WHERE `jid` = ? and cid=?",
    [place,salary,bondyears,servagree,jobtype,jobinfo,vacancy,minavgcp,minblog,req.params.id,req.session.userID],
    (err,results)=>{
        if (err) throw err;
            if(results.changedRows === 1){
                console.log('Post Updated');
                 res.redirect('/company/viewrequest');
            }
    });
});
app.get('/company/deleterequest/:id',(req,res)=>{
    var id=req.params.id;
    dbConnection.execute("DELETE FROM `jobdetail` where jid= ? ",[id],
    (err,results)=>{
    if(err){
        res.send("Invalid");
    }
    else {
        res.redirect('/company/viewrequest');
    }
});
});
//END OF COMPANY VIEWREQUEST PAGE
//COMPANY ACCEPTED REQUEST PAGE
app.get('/company/acceptedrequest',(req,res,next)=>{
    dbConnection.query('SELECT j.jid,j.cid,j.place,j.salary,j.bondyears,j.jobtype,j.vacancy,j.lastdate,j.dateexam,j.dateinterview,j.college,j.department FROM jobdetail j INNER JOIN company c on j.cid=c.cid WHERE c.cid=? and j.request="yes" and j.accepted="yes" and j.rejected="no"',[req.session.userID], function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.render('company/acceptedrequest', { title: 'User List', userData: data});
  });
});
app.get('/company/editacceptedjob/:id',function(req,res){
    dbConnection.promise().execute("SELECT * FROM `jobdetail` WHERE `jid`=? ",[req.params.id])
    .then(([rows])=> {
        if(!rows){
            res.send("invalid!");
        }
        else {
            console.log(rows[0]);
            res.render('company/editacceptedjob', {res:rows[0]});
        }
    });
});
app.post('/company/editacceptedjob/:id',(req,res)=>{
    const {place,salary,bondyears,servagree,jobtype,jobinfo,vacancy,minavgcp,minblog,lastdate,dateexam,dateinterview} = req.body;
    dbConnection.execute("UPDATE `jobdetail` SET place=?,salary=?,bondyears=?,servagree=?,jobtype=?,jobinfo=?,vacancy=?,minavgcp=?,minblog=?,lastdate=?,dateexam=?,dateinterview=? WHERE `jid` = ? ",
    [place,salary,bondyears,servagree,jobtype,jobinfo,vacancy,minavgcp,minblog,lastdate,dateexam,dateinterview,req.params.id],
    (err,results)=>{
        if (err) throw err;
            if(results.changedRows === 1){
                console.log('Post Updated');
                 res.redirect('/company/acceptedrequest');
            }
    });
});
app.get('/company/deleteacceptedjob/:id',(req,res)=>{
    var id=req.params.id;
    dbConnection.execute("DELETE FROM `jobdetail` where jid= ? ",[id],
    (err,results)=>{
    if(err){
        res.send("Invalid");
    }
    else {
        res.redirect('/company/acceptedrequest');
    }
});
});
app.get('/company/oncampapplied/:id',(req,res,next)=>{
    dbConnection.query('SELECT *,UPPER(dname)as dname FROM student s INNER JOIN applied a on s.sid=a.sid where a.jid=? ORDER BY a.aid DESC',[req.params.id], function (err, data, fields) {
    if (err) throw err;
    res.render('company/oncampapplied', { title: 'User List', userData: data});
  });
});
app.get('/company/rejectedrequest',(req,res,next)=>{
    dbConnection.query('SELECT j.jid,j.cid,j.place,j.salary,j.bondyears,j.jobtype,j.vacancy,j.lastdate,j.dateexam,j.dateinterview,j.college,j.department FROM jobdetail j INNER JOIN company c on j.cid=c.cid WHERE c.cid=? and j.request="yes" and j.accepted="no" and j.rejected="yes" ORDER BY j.jid DESC',[req.session.userID], function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.render('company/rejectedrequest', { title: 'User List', userData: data});
  });
});
app.get('/company/deleterejectedjob/:id',(req,res)=>{
    var id=req.params.id;
    dbConnection.execute("DELETE FROM `jobdetail` where jid= ? ",[id],
    (err,results)=>{
    if(err){
        res.send("Invalid");
    }
    else {
        res.redirect('/company/rejectedrequest');
    }
    });
});
//END OF COMPANY ACCEPTED REQUEST PAGE
//Student Module
const ifNotLoggedins = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.render('student/login');
    }
    next();
}

const ifLoggedins = (req,res,next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/student/studenthome');
    }
    next();
}
// END OF CUSTOM MIDDLEWARE
// STUDENT LOGIN SIGNUP PAGE
app.get('/student/login', ifNotLoggedins, (req,res,next) => {
    dbConnection.promise().execute("SELECT `sname` FROM `student` WHERE `sid`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('student/studenthome',{
            sname:rows[0].sname
        });
    });  
});
app.get('/student/signup',function(req,res){
    res.render('student/signup');
});
// REGISTER PAGE
app.post('/student/signup', ifLoggedins, 
// post data validation(using express-validator)
[
    body('user_email','Invalid email address!').isEmail().custom((value) => {
        return dbConnection.promise().execute('SELECT `semail` FROM `student` WHERE `semail`=?', [value])
        .then(([rows]) => {
            if(rows.length > 0){
                return Promise.reject('This E-mail already in use!');
            }
            return true;
        });
    }),
    body('user_name','Studentname is Empty!').trim().not().isEmpty(),
    body('user_pass','The password must be of minimum length 6 characters').trim().isLength({ min: 6 }),
    body('collagename','Collagename is Empty!').trim().not().isEmpty(),
],// end of post data validation
(req,res,next) => {

    const validation_result = validationResult(req);
    const {user_name, user_pass, user_email, collagename} = req.body;
    // IF validation_result HAS NO ERROR
    if(validation_result.isEmpty()){
        // password encryption (using bcryptjs)
        bcrypt.hash(user_pass, 12).then((hash_pass) => {
            // INSERTING USER INTO DATABASE
            dbConnection.promise().execute("INSERT INTO `student`(`sname`,`semail`,`spass`,`collegename`) VALUES(?,?,?,?)",[user_name,user_email, hash_pass, collagename])
            //dbConnection.promise().execute("INSERT INTO `academicdetail`(sid,collegename) SELECT a.sid a.collegename FROM student s INNER JOIN academicdetail a ON a.sid=s.sid ")
            .then(result => {
                me="you add!"
               // res.render('student/signup',{message:me});
                res.redirect('/student/login')
            }).catch(err => {
                // THROW INSERTING USER ERROR'S
                if (err) throw err;
            });
        })
        .catch(err => {
            // THROW HASING ERROR'S
            if (err) throw err;
        })
    }
    else{
        // COLLECT ALL THE VALIDATION ERRORS
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        // REDERING login-register PAGE WITH VALIDATION ERRORS
        res.render('student/signup',{
            register_error:allErrors,
            old_data:req.body
        });
    }
});// END OF REGISTER PAGE
// LOGIN PAGE
app.post('/student/login', ifLoggedins, [
    body('user_email').custom((value) => {
        return dbConnection.promise().execute('SELECT `semail` FROM `student` WHERE `semail`=?', [value])
        .then(([rows]) => {
            if(rows.length == 1){
                return true;
                
            }
            return Promise.reject('Invalid Email Address!');
            
        });
    }),
    body('user_pass','Password is empty!').trim().not().isEmpty(),
], (req, res) => {
    const validation_result = validationResult(req);
    const {user_pass, user_email} = req.body;
    if(validation_result.isEmpty()){
        
        dbConnection.promise().execute("SELECT * FROM `student` WHERE `semail`=?",[user_email])
        .then(([rows]) => {
            bcrypt.compare(user_pass, rows[0].spass).then(compare_result => {
                if(compare_result === true){
                    req.session.isLoggedIn = true;
                    req.session.userID = rows[0].sid;

                    res.redirect('/student/studenthome');
                }
                else{
                    res.render('student/login',{
                        login_errors:['Invalid Password!']
                    });
                }
            })
            .catch(err => {
                if (err) throw err;
            });


        }).catch(err => {
            if (err) throw err;
        });
    }
    else{
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        // REDERING login-register PAGE WITH LOGIN VALIDATION ERRORS
        res.render('student/login',{
            login_errors:allErrors
        });
    }
});
// END OF STUDENT LOGIN SIGNUP PAGE
//STUDENT CHANGEPASSWORD PAGE
app.get("/student/changepass",function(req,res){
    dbConnection.promise().execute("SELECT * FROM `student` WHERE `sid`=?",[req.session.userID])
        .then(([rows])=> {
            if(!rows){
                res.send("invalid!");
            }
            else {
                console.log(rows);
                res.render('student/changepass', {res:rows[0], errs: [], success: []});
            }
        });
});
app.post("/student/changepass",(req,res)=>{
    const oldPassword= req.body.oldPassword;
    const newPassword= req.body.newPassword;
    const confirmPassword=req.body.confirmPassword;
    dbConnection.promise().execute("SELECT * FROM `student` WHERE `sid`=?",[req.session.userID])
        .then(([rows])=> {
         bcrypt.compare(oldPassword,rows[0].spass).then(comparresult =>{
            if(comparresult === true)
            {
                if(req.body.newPassword == req.body.confirmPassword){
                    bcrypt.hash(newPassword, 12).then(haspas=>{
                    dbConnection.execute("UPDATE student SET spass=? where sid=?",[haspas,req.session.userID],(result)=>{
                        res.render('student/changepass', {errs:[], res: [], success: [{message: "Password changed successfully"}]});
                    });
                 
                });
            }
            else {
                res.render('student/changepass', {errs:[{message: "Your new passwords don't match!"}], res: rows[0], success: []});
            } 
        }
        else{
            res.render('student/changepass', {errs: [{message: "Your old passsword does not match!"}], res: rows[0], success: []});
        }
    });   
    });
});
//END OF STUDENT CHANGEPASSWORD PAGE
//STUDENT HOME PAGE
app.get('/student/studenthome',function(req,res){
    dbConnection.promise().execute("SELECT `sname` FROM `student` WHERE `sid`=?",[req.session.userID])
    .then(([rows]) => {
        res.render('student/studenthome',{
            sname:rows[0].sname
        });
    });
});
//END OF STUDENT HOME PAGE
//STUDENT VIEWDETAILS PAGE
app.get('/student/viewdetailss',function(req,res){
    dbConnection.promise().execute("SELECT * FROM `student` WHERE `sid`=?",[req.session.userID])
    .then(([rows])=> {
        if(!rows){
            res.send("invalid!");
        }
        else {
            console.log(rows);
            res.render('student/viewdetailss', {res:rows[0]});
        }
    });
});
//END OF STUDENT VIEWDETAILS PAGE
//STUDENT EDITDETAILS PAGE
app.get('/student/editdetailss',function(req,res){
    dbConnection.promise().execute("SELECT * FROM `student` WHERE `sid`=?",[req.session.userID])
    .then(([rows])=> {
        if(!rows){
            res.send("invalid!");
        }
        else {
            console.log(rows);
            res.render('student/editdetailss', {res:rows[0]});
        }
    });
});
app.post('/student/editdetailss',(req,res)=>{
const {sname,collegename,age,city,gender,smobileno,dname,passingyear,result10,result12,avgcgpa,backlogs} = req.body;
dbConnection.execute("UPDATE `student` SET sname=?,collegename=?,age=?,city=?,gender=?,smobileno=?,dname=?,passingyear=?,result10=?,result12=?,avgcgpa=?,backlogs=? WHERE `sid` = ?",
[sname,collegename,age,city,gender,smobileno,dname,passingyear,result10,result12,avgcgpa,backlogs,req.session.userID],
(err,results)=>{
    if (err) throw err;
        if(results.changedRows === 1){
            console.log('Post Updated');
             res.redirect('/student/viewdetailss');
        }
});
});
//END OF STUDENT EDITDETAILS PAGE
//STUDENT VIEWCOMPANY PAGE
app.get('/student/viewcompany',(req,res,next)=>{
    var sql='SELECT * FROM company';
    dbConnection.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('student/viewcompany', { title: 'User List', userData: data});
  });
});
//END OF STUDENT VIEWCOMPANY PAGE
//STUDENT VIEW TPO PAGE
app.get('/student/viewtpo',(req,res,next)=>{
    var sql='SELECT t.tname,t.temail,t.mobileno,t.city,t.website,t.nirf,t.nacc,t.ncte,t.aicte,t.ugc FROM tpo t INNER JOIN student s ON t.collegename=s.collegename WHERE s.sid=? and s.isverifed="yes"';
    dbConnection.query(sql,[req.session.userID] ,function (err, data, fields) {
    if (err) throw err;
    res.render('student/viewtpo', { title: 'User List', userData: data});
  });
});
//END OF STUDENT VIEW TPO PAGE
//STUDENT VIEW OFFCAMPUS JOB 
app.get('/student/offcampjob',(req,res,next)=>{
      
    var sql='SELECT c.cname,j.jid,j.cid,j.place,j.salary,j.bondyears,j.servagree,j.jobtype,j.jobinfo,j.vacancy,j.minavgcp,j.minblog,j.lastdate,j.dateexam,j.dateinterview,j.department,s.sname,s.dname FROM jobdetail j INNER JOIN student s ON j.college=s.collegename or j.college="all"  INNER JOIN company c ON j.cid=c.cid WHERE s.sid=? and j.request="no" and j.accepted="no" and j.rejected="no" ORDER BY j.jid DESC';
    dbConnection.query(sql,[req.session.userID] ,function (err, data, fields) {
    if (err) throw err;
    var sql1='select jid,cid,sid from applied where sid=?'
    var n
    dbConnection.promise().execute(sql1,[req.session.userID])
    .then(([rows])=> {
        //console.log(rows);
        //console.log(data)
       
            console.log(data)
            res.render('student/offcampjob', { title: 'User List', userData: data});
       
    });
    
  });
});
app.get('/student/applyjoboff/:id',(req,res)=>{
    var sql='SELECT c.cname,j.jid,j.cid,j.place,j.salary,j.bondyears,j.servagree,j.jobtype,j.jobinfo,j.vacancy,j.minavgcp,j.minblog,j.lastdate,j.dateexam,j.dateinterview,j.department,s.sname,s.dname FROM jobdetail j INNER JOIN student s ON j.college=s.collegename or j.college="all"  INNER JOIN company c ON j.cid=c.cid WHERE s.sid=? and j.jid=? and j.request="no" and j.accepted="no"';
    dbConnection.promise().execute(sql,[req.session.userID,req.params.id])
    .then(([rows])=> {
        if(!rows){
            res.send("invalid!");
        }
        else {
            console.log(rows[0]);
            res.render('student/applyjoboff', {res:rows[0],errs:[], success: []});
        }
    });
    
});
app.post('/student/applyjoboff/:id',(req,res)=>{
    const {cid,minavgcp,minblog} = req.body;
    console.log(req.body);
    var sql1='select jid,cid,sid from applied where sid=? and jid=?';
    dbConnection.promise().execute(sql1,[req.session.userID,req.params.id])
    .then(([rows])=> {
        console.log(rows);
        if(rows==0){
            var s='select avgcgpa,backlogs from student where sid=?'
            dbConnection.promise().execute(s,[req.session.userID])
            .then(([rows])=>{

                console.log(rows[0]);
                if((rows[0].avgcgpa>=minavgcp || minavgcp==0) && (rows[0].backlogs<=minblog || minblog==0))
                {
                    dbConnection.execute("INSERT INTO `applied` (jid,cid,sid,iseligible) VALUES(?,?,?,?)",[req.params.id,cid,req.session.userID,"yes"],
                    (err,results)=>{
                    //if (err) throw err;
                        console.log(results);
                        if(results.affectedRows === 1){
                            console.log('Post Updated with eligible');
                            res.redirect('/student/appliedoffjob');
                        }
                    });
                }
                else{
                    dbConnection.execute("INSERT INTO `applied` (jid,cid,sid,iseligible) VALUES(?,?,?,?)",[req.params.id,cid,req.session.userID,"no"],
                    (err,results)=>{
                    //if (err) throw err;
                        console.log(results);
                        if(results.affectedRows === 1){
                            console.log('Post Updated with not eligible');
                            res.redirect('/student/appliedoffjob');
                        }
                    });
                }
            });     
        }
        else{
            var sql='SELECT c.cname,j.jid,j.cid,j.place,j.salary,j.bondyears,j.jobtype,j.jobinfo,j.vacancy,j.lastdate,j.dateexam,j.dateinterview,j.department,s.sname,s.dname FROM jobdetail j INNER JOIN student s ON j.college=s.collegename or j.college="all"  INNER JOIN company c ON j.cid=c.cid WHERE s.sid=? and j.jid=? and j.request="no" and j.accepted="no"';
            dbConnection.promise().execute(sql,[req.session.userID,req.params.id])
            .then(([rows])=> {
             if(!rows){
                res.send("invalid!");
            }
            else {
                console.log(rows[0]);
                res.render('student/applyjoboff', {res:rows[0],errs:[{message: "Your already applied for job"}], res: rows[0], success: []});
            }
    });
        }
});
});
app.get('/student/appliedoffjob',(req,res,next)=>{
    dbConnection.query('SELECT a.aid,a.iseligible,c.cname,j.place,j.salary,j.bondyears,j.jobtype,j.jobinfo,j.vacancy,j.lastdate,j.dateexam,j.dateinterview,j.college,j.department FROM jobdetail j INNER JOIN applied a on j.jid=a.jid INNER JOIN company c on j.cid=c.cid where a.sid=? and j.request="no" and j.accepted="no" and j.rejected="no" ORDER BY a.aid DESC',[req.session.userID], function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.render('student/appliedoffjob', { title: 'User List', userData: data});
  });
});
//END OF STUDENT VIEW OFFCAMPUS JOB
//STUDENT VIEW ONCAMPUS JOB  
app.get('/student/oncampjob',(req,res,next)=>{
    dbConnection.query('SELECT c.cname,j.jid,j.cid,j.place,j.salary,j.bondyears,j.servagree,j.jobtype,j.jobinfo,j.vacancy,j.minavgcp,j.minblog,j.lastdate,j.dateexam,j.dateinterview,j.college,j.department FROM jobdetail j INNER JOIN company c on j.cid=c.cid INNER JOIN student s on j.college=s.collegename or j.college="all" WHERE j.request="yes" and j.accepted="yes" and j.rejected="no" and s.sid=? and s.isverifed="yes" ORDER BY j.jid DESC',[req.session.userID], function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.render('student/oncampjob', { title: 'User List', userData: data});
  });
});
app.get('/student/applyjobon/:id',(req,res)=>{
    var sql='SELECT c.cname,j.jid,j.cid,j.place,j.salary,j.bondyears,j.servagree,j.jobtype,j.jobinfo,j.vacancy,j.minavgcp,j.minblog,j.lastdate,j.dateexam,j.dateinterview,j.department,s.sname,s.dname FROM jobdetail j INNER JOIN student s ON j.college=s.collegename or j.college="all"  INNER JOIN company c ON j.cid=c.cid WHERE s.sid=? and j.jid=? and j.request="yes" and j.accepted="yes" and j.rejected="no"';
    dbConnection.promise().execute(sql,[req.session.userID,req.params.id])
    .then(([rows])=> {
        if(!rows){
            res.send("invalid!");
        }
        else {
            console.log(rows[0]);
            res.render('student/applyjobon', {res:rows[0],errs:[], success: []});
        }
    });
    
});
app.post('/student/applyjobon/:id',(req,res)=>{
    const {cid,minavgcp,minblog} = req.body;
    console.log(req.body);
    var sql1='select jid,cid,sid from applied where sid=? and jid=?';
    dbConnection.promise().execute(sql1,[req.session.userID,req.params.id])
    .then(([rows])=> {
        console.log(rows)
        if(rows==0){
            var s='select avgcgpa,backlogs from student where sid=?'
            dbConnection.promise().execute(s,[req.session.userID])
            .then(([rows])=>{

                console.log(rows[0]);
                if((rows[0].avgcgpa>=minavgcp || minavgcp==0) && (rows[0].backlogs<=minblog || minblog==0))
                {
                    dbConnection.execute("INSERT INTO `applied` (jid,cid,sid,iseligible) VALUES(?,?,?,?)",[req.params.id,cid,req.session.userID,"yes"],
                    (err,results)=>{
                    //if (err) throw err;
                        console.log(results);
                        if(results.affectedRows === 1){
                            console.log('Post Updated with eligible');
                            res.redirect('/student/appliedonjob');
                        }
                    });
                }
                else{
                    dbConnection.execute("INSERT INTO `applied` (jid,cid,sid,iseligible) VALUES(?,?,?,?)",[req.params.id,cid,req.session.userID,"no"],
                    (err,results)=>{
                    //if (err) throw err;
                        console.log(results);
                        if(results.affectedRows === 1){
                            console.log('Post Updated with not eligible');
                            res.redirect('/student/appliedonjob');
                        }
                    });
                }
            });
        }
        else{
            var sql='SELECT c.cname,j.jid,j.cid,j.place,j.salary,j.bondyears,j.jobtype,j.jobinfo,j.vacancy,j.lastdate,j.dateexam,j.dateinterview,j.department,s.sname,s.dname FROM jobdetail j INNER JOIN student s ON j.college=s.collegename or j.college="all"  INNER JOIN company c ON j.cid=c.cid WHERE s.sid=? and j.jid=? and j.request="yes" and j.accepted="yes" and j.rejected="no"';
            dbConnection.promise().execute(sql,[req.session.userID,req.params.id])
            .then(([rows])=> {
             if(!rows){
                res.send("invalid!");
            }
            else {
                console.log(rows[0]);
                res.render('student/applyjobon', {res:rows[0],errs:[{message: "Your already applied for job"}], res: rows[0], success: []});
            }
    });
        }
});
});
app.get('/student/appliedonjob',(req,res,next)=>{
    dbConnection.query('SELECT a.aid,a.iseligible,c.cname,j.place,j.salary,j.bondyears,j.jobtype,j.jobinfo,j.vacancy,j.lastdate,j.dateexam,j.dateinterview,j.college,j.department FROM jobdetail j INNER JOIN applied a on j.jid=a.jid INNER JOIN company c on j.cid=c.cid where a.sid=? and j.request="yes" and j.accepted="yes" and j.rejected="no" ORDER BY a.aid DESC',[req.session.userID], function (err, data, fields) {
    if (err) throw err;
    console.log(data);
    res.render('student/appliedonjob', { title: 'User List', userData: data});
  });
});
//END OF STUDENT VIEW ONCAMPUS JOB 
// LOGOUT
app.get('/logout',(req,res)=>{
    //session destroy
    req.session = null;
    res.redirect('/');
});
// END OF LOGOUT
//PORT OF LISTEN 8000
app.listen(8000, () => console.log("Server is Running...at 8000"));