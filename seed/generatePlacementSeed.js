const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const outputPath = path.join(__dirname, 'placement_seed.sql');

const hashTpo = bcrypt.hashSync('tpo12345', 12);
const hashCompany = bcrypt.hashSync('hr12345', 12);
const hashStudent = bcrypt.hashSync('student12345', 12);

const tpoOfficers = [
  'Anjali Mehta',
  'Rakesh Sharma',
  'Priyanka Nair',
  'Vikram Desai',
  'Sneha Kulkarni',
  'Arun Prakash',
  'Neha Bansal',
  'Saurabh Patel',
  'Kavita Rao',
  'Manoj Verma',
  'Deepa Iyer',
  'Rohan Trivedi',
  'Pooja Singh',
  'Ashish Bhatt',
  'Nidhi Chawla',
  'Ketan Joshi',
  'Shweta Kapoor',
  'Harshad Shah',
  'Mitali Ghosh',
  'Rahul Saxena'
];

const colleges = [
  { name: 'L.D. College of Engineering', city: 'Ahmedabad', website: 'https://www.ldce.ac.in', nirf: '101-150', nacc: 'A', ncte: 'NA', aicte: 'Approved', ugc: 'Recognized' },
  { name: 'Dharmsinh Desai University', city: 'Nadiad', website: 'https://www.ddu.ac.in', nirf: '151-200', nacc: 'A+', ncte: 'NA', aicte: 'Approved', ugc: 'Recognized' },
  { name: 'Nirma University', city: 'Ahmedabad', website: 'https://www.nirmauni.ac.in', nirf: '101-150', nacc: 'A+', ncte: 'NA', aicte: 'Approved', ugc: 'Recognized' },
  { name: 'Charusat University', city: 'Anand', website: 'https://www.charusat.ac.in', nirf: '151-200', nacc: 'A+', ncte: 'NA', aicte: 'Approved', ugc: 'Recognized' },
  { name: 'PDEU', city: 'Gandhinagar', website: 'https://www.pdpu.ac.in', nirf: '101-150', nacc: 'A', ncte: 'NA', aicte: 'Approved', ugc: 'Recognized' },
  { name: 'MS University of Baroda', city: 'Vadodara', website: 'https://www.msubaroda.ac.in', nirf: '151-200', nacc: 'A+', ncte: 'NA', aicte: 'Approved', ugc: 'Recognized' },
  { name: 'Government Engineering College Gandhinagar', city: 'Gandhinagar', website: 'https://www.gecg28.ac.in', nirf: '201-250', nacc: 'B++', ncte: 'NA', aicte: 'Approved', ugc: 'Recognized' },
  { name: 'SVNIT Surat', city: 'Surat', website: 'https://www.svnit.ac.in', nirf: '65', nacc: 'A', ncte: 'NA', aicte: 'Approved', ugc: 'Recognized' },
  { name: 'DAIICT', city: 'Gandhinagar', website: 'https://www.daiict.ac.in', nirf: '151-200', nacc: 'A', ncte: 'NA', aicte: 'Approved', ugc: 'Recognized' },
  { name: 'Parul University', city: 'Vadodara', website: 'https://paruluniversity.ac.in', nirf: '151-200', nacc: 'A++', ncte: 'Approved', aicte: 'Approved', ugc: 'Recognized' },
  { name: 'Pandit Deendayal Energy University', city: 'Gandhinagar', website: 'https://www.pdpu.ac.in', nirf: '101-150', nacc: 'A', ncte: 'NA', aicte: 'Approved', ugc: 'Recognized' },
  { name: 'Silver Oak University', city: 'Ahmedabad', website: 'https://silveroakuni.ac.in', nirf: '201-250', nacc: 'A', ncte: 'Approved', aicte: 'Approved', ugc: 'Recognized' },
  { name: 'Indus University', city: 'Ahmedabad', website: 'https://indusuni.ac.in', nirf: '201-250', nacc: 'A', ncte: 'Approved', aicte: 'Approved', ugc: 'Recognized' },
  { name: 'Ganpat University', city: 'Mehsana', website: 'https://www.ganpatuniversity.ac.in', nirf: '151-200', nacc: 'A', ncte: 'Approved', aicte: 'Approved', ugc: 'Recognized' },
  { name: 'RK University', city: 'Rajkot', website: 'https://rku.ac.in', nirf: '201-250', nacc: 'A', ncte: 'Approved', aicte: 'Approved', ugc: 'Recognized' },
  { name: 'Marwadi University', city: 'Rajkot', website: 'https://www.marwadiuniversity.ac.in', nirf: '201-250', nacc: 'A+', ncte: 'Approved', aicte: 'Approved', ugc: 'Recognized' },
  { name: 'Atmiya University', city: 'Rajkot', website: 'https://atmiyauni.ac.in', nirf: '201-250', nacc: 'A', ncte: 'Approved', aicte: 'Approved', ugc: 'Recognized' },
  { name: 'Uka Tarsadia University', city: 'Bardoli', website: 'https://utu.ac.in', nirf: '201-250', nacc: 'A+', ncte: 'Approved', aicte: 'Approved', ugc: 'Recognized' },
  { name: 'Adani University', city: 'Ahmedabad', website: 'https://adaniuni.ac.in', nirf: '201-250', nacc: 'A', ncte: 'NA', aicte: 'Approved', ugc: 'Recognized' },
  { name: 'CEPT University', city: 'Ahmedabad', website: 'https://cept.ac.in', nirf: '151-200', nacc: 'A+', ncte: 'NA', aicte: 'Approved', ugc: 'Recognized' }
];

const companies = [
  { cname: 'Tata Consultancy Services', city: 'Gandhinagar', ctype: 'IT Services', empl: 650000, website: 'https://www.tcs.com', cinfo: 'Enterprise software services, consulting, and digital transformation.' },
  { cname: 'Infosys', city: 'Pune', ctype: 'IT Services', empl: 340000, website: 'https://www.infosys.com', cinfo: 'Technology consulting and next-generation digital services provider.' },
  { cname: 'Wipro', city: 'Bengaluru', ctype: 'IT Services', empl: 250000, website: 'https://www.wipro.com', cinfo: 'Cloud, engineering, and business process transformation company.' },
  { cname: 'HCLTech', city: 'Noida', ctype: 'IT Services', empl: 225000, website: 'https://www.hcltech.com', cinfo: 'Global IT and engineering services organization.' },
  { cname: 'Tech Mahindra', city: 'Pune', ctype: 'IT Services', empl: 145000, website: 'https://www.techmahindra.com', cinfo: 'Digital engineering and telecom-focused IT solutions.' },
  { cname: 'Persistent Systems', city: 'Pune', ctype: 'Product Engineering', empl: 23000, website: 'https://www.persistent.com', cinfo: 'Software product engineering and enterprise modernization company.' },
  { cname: 'L&T Technology Services', city: 'Vadodara', ctype: 'Engineering Services', empl: 24000, website: 'https://www.ltts.com', cinfo: 'Engineering R&D services for manufacturing, telecom, and mobility.' },
  { cname: 'Reliance Jio Platforms', city: 'Mumbai', ctype: 'Telecom Technology', empl: 35000, website: 'https://www.jio.com', cinfo: 'Digital platforms, telecom products, and network innovation.' },
  { cname: 'Capgemini India', city: 'Mumbai', ctype: 'Consulting', empl: 185000, website: 'https://www.capgemini.com/in-en', cinfo: 'Consulting, technology services, and business transformation.' },
  { cname: 'Cognizant', city: 'Chennai', ctype: 'IT Services', empl: 280000, website: 'https://www.cognizant.com', cinfo: 'IT consulting, data engineering, and enterprise transformation.' },
  { cname: 'Oracle Financial Services', city: 'Mumbai', ctype: 'FinTech', empl: 9000, website: 'https://www.oracle.com/financial-services', cinfo: 'Banking technology products and enterprise financial software.' },
  { cname: 'ZS Associates', city: 'Pune', ctype: 'Analytics Consulting', empl: 13000, website: 'https://www.zs.com', cinfo: 'Analytics, strategy, and technology consulting firm.' },
  { cname: 'Deloitte India', city: 'Hyderabad', ctype: 'Consulting', empl: 120000, website: 'https://www2.deloitte.com/in', cinfo: 'Audit, consulting, risk advisory, and analytics practice.' },
  { cname: 'Accenture India', city: 'Bengaluru', ctype: 'Consulting', empl: 300000, website: 'https://www.accenture.com/in-en', cinfo: 'Cloud, AI, consulting, and managed services organization.' },
  { cname: 'Hexaware Technologies', city: 'Navi Mumbai', ctype: 'IT Services', empl: 28000, website: 'https://hexaware.com', cinfo: 'Automation-led IT and business process services firm.' },
  { cname: 'Mphasis', city: 'Bengaluru', ctype: 'IT Services', empl: 32000, website: 'https://www.mphasis.com', cinfo: 'Cloud and cognitive services for banking and insurance domains.' },
  { cname: 'Torrent Power', city: 'Ahmedabad', ctype: 'Energy', empl: 9000, website: 'https://www.torrentpower.com', cinfo: 'Power generation, transmission, distribution, and smart utilities.' },
  { cname: 'Adani Enterprises Digital Labs', city: 'Ahmedabad', ctype: 'Conglomerate Technology', empl: 12000, website: 'https://www.adani.com', cinfo: 'Digital products and internal technology platforms for group businesses.' },
  { cname: 'eInfochips', city: 'Ahmedabad', ctype: 'Semiconductor & Embedded', empl: 2500, website: 'https://www.einfochips.com', cinfo: 'Product engineering and semiconductor design services.' },
  { cname: 'Torus Innotech', city: 'Ahmedabad', ctype: 'SaaS Product', empl: 450, website: 'https://www.torusinnotech.com', cinfo: 'Mid-size SaaS company focused on workflow automation products.' },
  { cname: "Byju's FutureSchool", city: 'Remote', ctype: 'EdTech', empl: 15000, website: 'https://byjus.com', cinfo: 'Education technology products for students and learners.' },
  { cname: 'OpenXcell', city: 'Ahmedabad', ctype: 'Software Development', empl: 900, website: 'https://www.openxcell.com', cinfo: 'Custom software development and web/mobile engineering company.' },
  { cname: 'Aarav Solutions', city: 'Vadodara', ctype: 'Telecom Software', empl: 700, website: 'https://www.aaravsolutions.com', cinfo: 'OSS/BSS software products and digital solutions for telecom operators.' },
  { cname: 'Syndell Technologies', city: 'Surat', ctype: 'Data Platforms', empl: 350, website: 'https://www.syndelltech.com', cinfo: 'Data engineering, BI, and modern analytics services provider.' }
];

const studentBlueprints = [
  ['Aarav Patel', 'Male', 0, 'computer engineering'],
  ['Diya Shah', 'Female', 1, 'information technology'],
  ['Krish Mehta', 'Male', 2, 'computer engineering'],
  ['Ananya Iyer', 'Female', 3, 'electronics and communication'],
  ['Yash Desai', 'Male', 4, 'mechanical engineering'],
  ['Riya Trivedi', 'Female', 5, 'civil engineering'],
  ['Nisarg Joshi', 'Male', 6, 'electrical engineering'],
  ['Mihika Nair', 'Female', 7, 'computer engineering'],
  ['Parth Bhatt', 'Male', 8, 'information technology'],
  ['Ishita Kapoor', 'Female', 9, 'computer engineering'],
  ['Devansh Sharma', 'Male', 10, 'petroleum engineering'],
  ['Tanvi Kulkarni', 'Female', 11, 'computer engineering'],
  ['Meet Panchal', 'Male', 12, 'artificial intelligence and data science'],
  ['Sakshi Bedi', 'Female', 13, 'computer engineering'],
  ['Harsh Vyas', 'Male', 14, 'mechanical engineering'],
  ['Jhanvi Modi', 'Female', 15, 'computer engineering'],
  ['Rutvik Gohil', 'Male', 16, 'electronics and communication'],
  ['Khushi Soni', 'Female', 17, 'information technology'],
  ['Vedant Tiwari', 'Male', 18, 'computer engineering'],
  ['Nandini Rao', 'Female', 19, 'architecture technology'],
  ['Pratham Dubey', 'Male', 0, 'information technology'],
  ['Heerani Chauhan', 'Female', 1, 'computer engineering'],
  ['Omkar Jadhav', 'Male', 2, 'electronics and communication'],
  ['Snehal Mistry', 'Female', 3, 'mechanical engineering'],
  ['Rahul Solanki', 'Male', 4, 'electrical engineering'],
  ['Aditi Menon', 'Female', 5, 'computer engineering'],
  ['Darshil Gandhi', 'Male', 6, 'civil engineering'],
  ['Pallavi Rane', 'Female', 7, 'artificial intelligence and data science'],
  ['Kunal Saxena', 'Male', 8, 'computer engineering'],
  ['Mansi Kothari', 'Female', 9, 'information technology']
];

const branchSkills = {
  'computer engineering': ['Java', 'Node.js', 'Express', 'MySQL', 'React', 'Git', 'REST APIs'],
  'information technology': ['Python', 'SQL', 'Power BI', 'HTML', 'CSS', 'JavaScript', 'AWS Basics'],
  'electronics and communication': ['Embedded C', 'Verilog', 'MATLAB', 'PCB Design', 'Python'],
  'mechanical engineering': ['AutoCAD', 'SolidWorks', 'ANSYS', 'Manufacturing Processes', 'Excel'],
  'civil engineering': ['AutoCAD', 'STAAD Pro', 'Revit', 'Quantity Estimation', 'MS Project'],
  'electrical engineering': ['PLC', 'MATLAB', 'Power Systems', 'AutoCAD Electrical', 'SCADA'],
  'petroleum engineering': ['Reservoir Basics', 'Drilling Operations', 'Excel', 'Well Logging'],
  'artificial intelligence and data science': ['Python', 'Pandas', 'Machine Learning', 'SQL', 'Tableau'],
  'architecture technology': ['AutoCAD', 'SketchUp', 'Revit', 'Adobe Photoshop', 'Design Thinking']
};

const roleTemplates = [
  { title: 'Graduate Engineer Trainee', info: 'Entry-level role supporting development, testing, and deployment across client projects.', salary: 4.5, bondyears: 1, servagree: 'Yes' },
  { title: 'Software Engineer', info: 'Full-stack engineering role with API development, debugging, and production support responsibilities.', salary: 6.8, bondyears: 0, servagree: 'No' },
  { title: 'Associate Analyst', info: 'Business analytics and SQL-heavy role with reporting, dashboards, and stakeholder communication.', salary: 5.8, bondyears: 0, servagree: 'No' },
  { title: 'Data Engineer Trainee', info: 'Role focused on ETL pipelines, SQL transformations, and cloud data warehousing.', salary: 7.2, bondyears: 0, servagree: 'No' },
  { title: 'QA Automation Engineer', info: 'Test automation role using scripting, API validation, and CI pipeline checks.', salary: 5.4, bondyears: 1, servagree: 'Yes' },
  { title: 'Embedded Systems Trainee', info: 'Hands-on embedded development role for device firmware and board validation.', salary: 6.2, bondyears: 1, servagree: 'Yes' },
  { title: 'Business Technology Analyst', info: 'Consulting-oriented role working across client delivery, documentation, and analytics.', salary: 7.5, bondyears: 0, servagree: 'No' },
  { title: 'Management Trainee - Operations', info: 'Operations and coordination role with Excel reporting, process tracking, and client support.', salary: 4.2, bondyears: 0, servagree: 'No' }
];

const jobLocations = ['Ahmedabad', 'Gandhinagar', 'Vadodara', 'Surat', 'Pune', 'Bengaluru', 'Hyderabad', 'Mumbai', 'Remote'];
const departments = [
  'computer engineering, information technology',
  'computer engineering, information technology, artificial intelligence and data science',
  'electronics and communication, electrical engineering',
  'mechanical engineering, civil engineering',
  'all departments'
];

const placedStudentIds = new Set([1, 2, 3, 8, 9, 10, 12, 18, 19, 22, 28, 29]);

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '.')
    .replace(/(^\.|\.$)/g, '');
}

function phone(seed) {
  const prefix = ['98', '97', '96', '95', '94', '93'][seed % 6];
  return `${prefix}${String(10000000 + seed * 3791).slice(0, 8)}`;
}

function sqlValue(value) {
  if (value === null || value === undefined) {
    return 'NULL';
  }

  if (typeof value === 'number') {
    return Number.isInteger(value) ? `${value}` : value.toFixed(2);
  }

  return `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "''")}'`;
}

function insertStatement(table, columns, rows) {
  const columnSql = columns.map((column) => `\`${column}\``).join(', ');
  const valueSql = rows
    .map((row) => `(${columns.map((column) => sqlValue(row[column])).join(', ')})`)
    .join(',\n');

  return `INSERT INTO \`${table}\` (${columnSql}) VALUES\n${valueSql};`;
}

function buildTpos() {
  return colleges.map((college, index) => ({
    tid: index + 1,
    tname: tpoOfficers[index],
    temail: `${slugify(tpoOfficers[index])}@${slugify(college.name)}.edu.in`,
    tpassword: hashTpo,
    collegename: college.name,
    city: college.city,
    mobileno: phone(index + 11),
    website: college.website,
    nirf: college.nirf,
    nacc: college.nacc,
    ncte: college.ncte,
    aicte: college.aicte,
    ugc: college.ugc,
    created_at: `2026-01-${String((index % 28) + 1).padStart(2, '0')} 09:00:00`,
    updated_at: `2026-05-${String((index % 14) + 1).padStart(2, '0')} 11:30:00`
  }));
}

function buildCompanies() {
  const hrNames = [
    'Sonal Kapoor', 'Abhishek Jain', 'Ritu Shah', 'Madhav Menon', 'Bhavna Arora', 'Karan Bhatia',
    'Shalini Gupta', 'Rohit Naidu', 'Nikita Sinha', 'Vivek Tandon', 'Prerna Rao', 'Aman Bedi',
    'Shruti Joshi', 'Nilesh Dave', 'Anupama Sen', 'Varun Choksi', 'Dhruvi Patel', 'Mitesh Soni',
    'Rashmi Kulshreshtha', 'Jay Vora', 'Pallav Gera', 'Ira Basu', 'Tanmay Kulkarni', 'Srushti Parekh'
  ];

  return companies.map((company, index) => ({
    cid: index + 1,
    hrname: hrNames[index],
    cemail: `hr.${slugify(company.cname)}@demo-placement.in`,
    cpassword: hashCompany,
    cname: company.cname,
    cwebsite: company.website,
    city: company.city,
    ctype: company.ctype,
    cinfo: company.cinfo,
    cmobileno: phone(index + 101),
    empl: company.empl,
    created_at: `2026-02-${String((index % 27) + 1).padStart(2, '0')} 10:15:00`,
    updated_at: `2026-05-${String((index % 12) + 1).padStart(2, '0')} 16:45:00`
  }));
}

function buildStudents() {
  return studentBlueprints.map(([name, gender, collegeIndex, branch], index) => {
    const college = colleges[collegeIndex];
    const baseCgpa = [8.9, 7.8, 9.1, 8.0, 7.2, 7.0, 6.8, 8.7, 8.4, 9.0, 7.5, 8.6, 8.2, 7.9, 6.9, 8.8, 7.4, 8.1, 8.5, 7.7, 7.6, 8.3, 7.3, 6.7, 7.1, 8.9, 6.8, 8.4, 8.6, 8.0][index];
    const backlog = [0, 0, 0, 1, 2, 0, 1, 0, 0, 0, 1, 0, 0, 1, 2, 0, 1, 0, 0, 0, 1, 0, 2, 1, 1, 0, 2, 0, 0, 0][index];
    const verified = index % 7 === 0 ? 'no' : 'yes';
    const emailLocal = slugify(name).replace(/\./g, '');

    return {
      sid: index + 1,
      sname: name,
      semail: `${emailLocal}${index + 1}@student.demo.in`,
      spass: hashStudent,
      collegename: college.name,
      age: 20 + (index % 4),
      city: college.city,
      gender,
      smobileno: phone(index + 201),
      isverifed: verified,
      dname: branch,
      passingyear: 2026,
      result10: 74 + (index % 17),
      result12: 71 + ((index * 2) % 19),
      avgcgpa: baseCgpa,
      backlogs: backlog,
      created_at: `2026-01-${String((index % 28) + 1).padStart(2, '0')} 08:20:00`,
      updated_at: `2026-05-${String((index % 13) + 1).padStart(2, '0')} 14:10:00`
    };
  });
}

function buildJobs() {
  const jobs = [];
  const acceptedCampuses = [0, 1, 2, 3, 7, 8, 9, 10, 11, 15, 17, 18];
  const pendingCampuses = [4, 5, 12, 16];

  for (let index = 0; index < 30; index += 1) {
    const company = companies[index % companies.length];
    const role = roleTemplates[index % roleTemplates.length];
    const campusIndex = index % colleges.length;
    const college = colleges[campusIndex];
    const isAcceptedCampus = acceptedCampuses.includes(index);
    const isPendingCampus = pendingCampuses.includes(index);
    const request = isAcceptedCampus || isPendingCampus ? 'yes' : 'no';
    const accepted = isAcceptedCampus ? 'yes' : 'no';
    const rejected = isPendingCampus && index % 2 === 1 ? 'yes' : 'no';
    const location = jobLocations[index % jobLocations.length];
    const jobDateBase = index + 1;
    const department = departments[index % departments.length];
    const lastDate = request === 'no' || accepted === 'yes' ? `2026-06-${String((jobDateBase % 28) + 1).padStart(2, '0')}` : null;
    const examDate = request === 'no' || accepted === 'yes' ? `2026-06-${String(((jobDateBase + 5) % 28) + 1).padStart(2, '0')}` : null;
    const interviewDate = request === 'no' || accepted === 'yes' ? `2026-06-${String(((jobDateBase + 11) % 28) + 1).padStart(2, '0')}` : null;

    jobs.push({
      jid: index + 1,
      cid: (index % companies.length) + 1,
      place: location,
      salary: role.salary + ((index % 5) * 0.35),
      bondyears: role.bondyears,
      servagree: role.servagree,
      jobtype: role.title,
      jobinfo: `${role.info} Hiring focus for ${department} candidates with good communication and problem-solving skills.`,
      vacancy: 4 + (index % 9),
      minavgcp: 6.5 + ((index % 5) * 0.3),
      minblog: index % 6 === 0 ? 2 : 0,
      lastdate: lastDate,
      dateexam: examDate,
      dateinterview: interviewDate,
      college: request === 'no' ? (index % 4 === 0 ? 'all' : college.name) : college.name,
      department,
      request,
      accepted,
      rejected,
      created_at: `2026-04-${String((jobDateBase % 28) + 1).padStart(2, '0')} 10:00:00`,
      updated_at: `2026-05-${String((jobDateBase % 12) + 1).padStart(2, '0')} 15:00:00`
    });
  }

  return jobs;
}

function buildApplied(students, jobs) {
  const activeJobs = jobs.filter((job) => job.request === 'no' || (job.request === 'yes' && job.accepted === 'yes' && job.rejected === 'no'));
  const applications = [];
  let aid = 1;

  students.forEach((student, index) => {
    const firstJob = activeJobs[index % activeJobs.length];
    const secondJob = activeJobs[(index + 7) % activeJobs.length];
    const thirdJob = activeJobs[(index + 13) % activeJobs.length];
    const selectedJobs = [firstJob, secondJob];

    if (index % 3 === 0) {
      selectedJobs.push(thirdJob);
    }

    selectedJobs.forEach((job, jobOffset) => {
      const eligible = student.avgcgpa >= job.minavgcp && student.backlogs <= job.minblog ? 'yes' : 'no';
      applications.push({
        aid: aid,
        jid: job.jid,
        cid: job.cid,
        sid: student.sid,
        iseligible: eligible,
        applied_at: `2026-05-${String(((index + jobOffset) % 14) + 1).padStart(2, '0')} ${String(9 + jobOffset).padStart(2, '0')}:25:00`,
        created_at: `2026-05-${String(((index + jobOffset) % 14) + 1).padStart(2, '0')} ${String(9 + jobOffset).padStart(2, '0')}:25:00`,
        updated_at: `2026-05-${String(((index + jobOffset) % 14) + 1).padStart(2, '0')} ${String(9 + jobOffset).padStart(2, '0')}:25:00`
      });
      aid += 1;
    });
  });

  return applications;
}

function buildProfiles(students, jobs) {
  return students.map((student, index) => {
    const skills = branchSkills[student.dname] || ['Communication', 'Excel', 'Problem Solving'];
    const isPlaced = placedStudentIds.has(student.sid);
    const matchingJob = jobs[(index + 2) % jobs.length];
    const projectCount = 2 + (index % 3);
    const internshipCount = index % 4 === 0 ? 2 : 1;

    return {
      profile_id: index + 1,
      sid: student.sid,
      headline: isPlaced ? `${student.dname} graduate placed for 2026 batch` : `${student.dname} student actively seeking placement opportunities`,
      github_url: `https://github.com/${slugify(student.sname).replace(/\./g, '')}`,
      linkedin_url: `https://www.linkedin.com/in/${slugify(student.sname)}`,
      resume_url: `https://demo-placement-assets.s3.ap-south-1.amazonaws.com/resumes/${slugify(student.sname)}.pdf`,
      skillset: skills.join(', '),
      internships: internshipCount,
      projects_count: projectCount,
      certifications_count: 1 + (index % 4),
      preferred_location: jobLocations[(index + 3) % jobLocations.length],
      placement_status: isPlaced ? 'Placed' : (index % 5 === 0 ? 'Higher Studies' : 'Seeking'),
      placed_company: isPlaced ? companies[matchingJob.cid - 1].cname : null,
      placed_package_lpa: isPlaced ? matchingJob.salary : null,
      created_at: `2026-02-${String((index % 27) + 1).padStart(2, '0')} 12:00:00`,
      updated_at: `2026-05-${String((index % 14) + 1).padStart(2, '0')} 12:00:00`
    };
  });
}

function buildStatistics(students, profiles) {
  const stats = [];

  colleges.forEach((college, index) => {
    const collegeStudents = students.filter((student) => student.collegename === college.name);
    const collegeProfiles = profiles.filter((profile) => {
      const student = collegeStudents.find((item) => item.sid === profile.sid);
      return Boolean(student);
    });
    const placedProfiles = collegeProfiles.filter((profile) => profile.placement_status === 'Placed');
    const packages = placedProfiles.map((profile) => profile.placed_package_lpa).filter(Boolean).sort((a, b) => a - b);
    const totalStudents = collegeStudents.length;
    const placedStudents = placedProfiles.length;
    const averagePackage = packages.length ? packages.reduce((sum, value) => sum + value, 0) / packages.length : 0;
    const medianPackage = packages.length ? packages[Math.floor(packages.length / 2)] : 0;
    const topRecruiters = placedProfiles
      .slice(0, 3)
      .map((profile) => profile.placed_company)
      .filter(Boolean)
      .join(', ') || 'Pending for current cycle';

    stats.push({
      stat_id: index + 1,
      college_name: college.name,
      branch_name: 'All Branches',
      graduating_year: 2026,
      total_students: totalStudents,
      placed_students: placedStudents,
      unplaced_students: totalStudents - placedStudents,
      highest_package_lpa: packages.length ? packages[packages.length - 1] : 0,
      average_package_lpa: averagePackage,
      median_package_lpa: medianPackage,
      top_recruiters: topRecruiters,
      created_at: `2026-05-${String((index % 14) + 1).padStart(2, '0')} 18:00:00`
    });
  });

  return stats;
}

function buildSql() {
  const tpos = buildTpos();
  const companyRows = buildCompanies();
  const students = buildStudents();
  const jobs = buildJobs();
  const applications = buildApplied(students, jobs);
  const profiles = buildProfiles(students, jobs);
  const statistics = buildStatistics(students, profiles);

  const sections = [];

  sections.push('-- Training and Placement Management System demo seed');
  sections.push('-- Generated for MySQL Workbench');
  sections.push('-- Demo TPO/Admin login: anjali.mehta@l.d.college.of.engineering.edu.in / tpo12345');
  sections.push('-- Demo HR login: hr.tata.consultancy.services@demo-placement.in / hr12345');
  sections.push('-- Demo Student login: aaravpatel1@student.demo.in / student12345');
  sections.push('');
  sections.push('CREATE DATABASE IF NOT EXISTS `placement`;');
  sections.push('USE `placement`;');
  sections.push('');
  sections.push('SET FOREIGN_KEY_CHECKS = 0;');
  sections.push('DROP TABLE IF EXISTS `placement_statistics`;');
  sections.push('DROP TABLE IF EXISTS `student_profile`;');
  sections.push('DROP TABLE IF EXISTS `applied`;');
  sections.push('DROP TABLE IF EXISTS `jobdetail`;');
  sections.push('DROP TABLE IF EXISTS `student`;');
  sections.push('DROP TABLE IF EXISTS `company`;');
  sections.push('DROP TABLE IF EXISTS `tpo`;');
  sections.push('SET FOREIGN_KEY_CHECKS = 1;');
  sections.push('');
  sections.push(`CREATE TABLE \`tpo\` (
  \`tid\` INT NOT NULL AUTO_INCREMENT,
  \`tname\` VARCHAR(100) NOT NULL,
  \`temail\` VARCHAR(120) NOT NULL,
  \`tpassword\` VARCHAR(255) NOT NULL,
  \`collegename\` VARCHAR(150) NOT NULL,
  \`city\` VARCHAR(80) DEFAULT NULL,
  \`mobileno\` VARCHAR(15) DEFAULT NULL,
  \`website\` VARCHAR(200) DEFAULT NULL,
  \`nirf\` VARCHAR(30) DEFAULT NULL,
  \`nacc\` VARCHAR(30) DEFAULT NULL,
  \`ncte\` VARCHAR(30) DEFAULT NULL,
  \`aicte\` VARCHAR(30) DEFAULT NULL,
  \`ugc\` VARCHAR(30) DEFAULT NULL,
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`tid\`),
  UNIQUE KEY \`uq_tpo_email\` (\`temail\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
  sections.push('');
  sections.push(`CREATE TABLE \`company\` (
  \`cid\` INT NOT NULL AUTO_INCREMENT,
  \`hrname\` VARCHAR(100) NOT NULL,
  \`cemail\` VARCHAR(120) NOT NULL,
  \`cpassword\` VARCHAR(255) NOT NULL,
  \`cname\` VARCHAR(150) NOT NULL,
  \`cwebsite\` VARCHAR(200) DEFAULT NULL,
  \`city\` VARCHAR(80) DEFAULT NULL,
  \`ctype\` VARCHAR(80) DEFAULT NULL,
  \`cinfo\` TEXT,
  \`cmobileno\` VARCHAR(15) DEFAULT NULL,
  \`empl\` INT DEFAULT NULL,
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`cid\`),
  UNIQUE KEY \`uq_company_email\` (\`cemail\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
  sections.push('');
  sections.push(`CREATE TABLE \`student\` (
  \`sid\` INT NOT NULL AUTO_INCREMENT,
  \`sname\` VARCHAR(100) NOT NULL,
  \`semail\` VARCHAR(120) NOT NULL,
  \`spass\` VARCHAR(255) NOT NULL,
  \`collegename\` VARCHAR(150) NOT NULL,
  \`age\` INT DEFAULT NULL,
  \`city\` VARCHAR(80) DEFAULT NULL,
  \`gender\` VARCHAR(20) DEFAULT NULL,
  \`smobileno\` VARCHAR(15) DEFAULT NULL,
  \`isverifed\` VARCHAR(10) NOT NULL DEFAULT 'no',
  \`dname\` VARCHAR(120) DEFAULT NULL,
  \`passingyear\` INT DEFAULT NULL,
  \`result10\` DECIMAL(5,2) DEFAULT NULL,
  \`result12\` DECIMAL(5,2) DEFAULT NULL,
  \`avgcgpa\` DECIMAL(4,2) DEFAULT NULL,
  \`backlogs\` INT DEFAULT 0,
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`sid\`),
  UNIQUE KEY \`uq_student_email\` (\`semail\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
  sections.push('');
  sections.push(`CREATE TABLE \`jobdetail\` (
  \`jid\` INT NOT NULL AUTO_INCREMENT,
  \`cid\` INT NOT NULL,
  \`place\` VARCHAR(80) NOT NULL,
  \`salary\` DECIMAL(6,2) NOT NULL,
  \`bondyears\` INT DEFAULT 0,
  \`servagree\` VARCHAR(10) DEFAULT 'No',
  \`jobtype\` VARCHAR(120) NOT NULL,
  \`jobinfo\` TEXT,
  \`vacancy\` INT DEFAULT 1,
  \`minavgcp\` DECIMAL(4,2) DEFAULT 0.00,
  \`minblog\` INT DEFAULT 0,
  \`lastdate\` DATE DEFAULT NULL,
  \`dateexam\` DATE DEFAULT NULL,
  \`dateinterview\` DATE DEFAULT NULL,
  \`college\` VARCHAR(150) NOT NULL,
  \`department\` VARCHAR(200) DEFAULT NULL,
  \`request\` VARCHAR(10) NOT NULL DEFAULT 'no',
  \`accepted\` VARCHAR(10) NOT NULL DEFAULT 'no',
  \`rejected\` VARCHAR(10) NOT NULL DEFAULT 'no',
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`jid\`),
  KEY \`idx_jobdetail_cid\` (\`cid\`),
  CONSTRAINT \`fk_jobdetail_company\` FOREIGN KEY (\`cid\`) REFERENCES \`company\` (\`cid\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
  sections.push('');
  sections.push(`CREATE TABLE \`applied\` (
  \`aid\` INT NOT NULL AUTO_INCREMENT,
  \`jid\` INT NOT NULL,
  \`cid\` INT NOT NULL,
  \`sid\` INT NOT NULL,
  \`iseligible\` VARCHAR(10) NOT NULL DEFAULT 'yes',
  \`applied_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`aid\`),
  UNIQUE KEY \`uq_applied_job_student\` (\`jid\`, \`sid\`),
  KEY \`idx_applied_cid\` (\`cid\`),
  KEY \`idx_applied_sid\` (\`sid\`),
  CONSTRAINT \`fk_applied_job\` FOREIGN KEY (\`jid\`) REFERENCES \`jobdetail\` (\`jid\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_applied_company\` FOREIGN KEY (\`cid\`) REFERENCES \`company\` (\`cid\`) ON DELETE CASCADE,
  CONSTRAINT \`fk_applied_student\` FOREIGN KEY (\`sid\`) REFERENCES \`student\` (\`sid\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
  sections.push('');
  sections.push(`CREATE TABLE \`student_profile\` (
  \`profile_id\` INT NOT NULL AUTO_INCREMENT,
  \`sid\` INT NOT NULL,
  \`headline\` VARCHAR(180) DEFAULT NULL,
  \`github_url\` VARCHAR(200) DEFAULT NULL,
  \`linkedin_url\` VARCHAR(200) DEFAULT NULL,
  \`resume_url\` VARCHAR(255) DEFAULT NULL,
  \`skillset\` TEXT,
  \`internships\` INT DEFAULT 0,
  \`projects_count\` INT DEFAULT 0,
  \`certifications_count\` INT DEFAULT 0,
  \`preferred_location\` VARCHAR(80) DEFAULT NULL,
  \`placement_status\` VARCHAR(30) NOT NULL DEFAULT 'Seeking',
  \`placed_company\` VARCHAR(150) DEFAULT NULL,
  \`placed_package_lpa\` DECIMAL(6,2) DEFAULT NULL,
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  \`updated_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (\`profile_id\`),
  UNIQUE KEY \`uq_profile_sid\` (\`sid\`),
  CONSTRAINT \`fk_profile_student\` FOREIGN KEY (\`sid\`) REFERENCES \`student\` (\`sid\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
  sections.push('');
  sections.push(`CREATE TABLE \`placement_statistics\` (
  \`stat_id\` INT NOT NULL AUTO_INCREMENT,
  \`college_name\` VARCHAR(150) NOT NULL,
  \`branch_name\` VARCHAR(120) NOT NULL,
  \`graduating_year\` INT NOT NULL,
  \`total_students\` INT NOT NULL,
  \`placed_students\` INT NOT NULL,
  \`unplaced_students\` INT NOT NULL,
  \`highest_package_lpa\` DECIMAL(6,2) NOT NULL DEFAULT 0.00,
  \`average_package_lpa\` DECIMAL(6,2) NOT NULL DEFAULT 0.00,
  \`median_package_lpa\` DECIMAL(6,2) NOT NULL DEFAULT 0.00,
  \`top_recruiters\` VARCHAR(255) DEFAULT NULL,
  \`created_at\` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (\`stat_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`);
  sections.push('');
  sections.push(insertStatement('tpo', ['tid', 'tname', 'temail', 'tpassword', 'collegename', 'city', 'mobileno', 'website', 'nirf', 'nacc', 'ncte', 'aicte', 'ugc', 'created_at', 'updated_at'], tpos));
  sections.push('');
  sections.push(insertStatement('company', ['cid', 'hrname', 'cemail', 'cpassword', 'cname', 'cwebsite', 'city', 'ctype', 'cinfo', 'cmobileno', 'empl', 'created_at', 'updated_at'], companyRows));
  sections.push('');
  sections.push(insertStatement('student', ['sid', 'sname', 'semail', 'spass', 'collegename', 'age', 'city', 'gender', 'smobileno', 'isverifed', 'dname', 'passingyear', 'result10', 'result12', 'avgcgpa', 'backlogs', 'created_at', 'updated_at'], students));
  sections.push('');
  sections.push(insertStatement('jobdetail', ['jid', 'cid', 'place', 'salary', 'bondyears', 'servagree', 'jobtype', 'jobinfo', 'vacancy', 'minavgcp', 'minblog', 'lastdate', 'dateexam', 'dateinterview', 'college', 'department', 'request', 'accepted', 'rejected', 'created_at', 'updated_at'], jobs));
  sections.push('');
  sections.push(insertStatement('applied', ['aid', 'jid', 'cid', 'sid', 'iseligible', 'applied_at', 'created_at', 'updated_at'], applications));
  sections.push('');
  sections.push(insertStatement('student_profile', ['profile_id', 'sid', 'headline', 'github_url', 'linkedin_url', 'resume_url', 'skillset', 'internships', 'projects_count', 'certifications_count', 'preferred_location', 'placement_status', 'placed_company', 'placed_package_lpa', 'created_at', 'updated_at'], profiles));
  sections.push('');
  sections.push(insertStatement('placement_statistics', ['stat_id', 'college_name', 'branch_name', 'graduating_year', 'total_students', 'placed_students', 'unplaced_students', 'highest_package_lpa', 'average_package_lpa', 'median_package_lpa', 'top_recruiters', 'created_at'], statistics));
  sections.push('');
  sections.push('-- Summary counts');
  sections.push(`SELECT 'tpo' AS table_name, COUNT(*) AS total_records FROM tpo UNION ALL
SELECT 'company', COUNT(*) FROM company UNION ALL
SELECT 'student', COUNT(*) FROM student UNION ALL
SELECT 'jobdetail', COUNT(*) FROM jobdetail UNION ALL
SELECT 'applied', COUNT(*) FROM applied UNION ALL
SELECT 'student_profile', COUNT(*) FROM student_profile UNION ALL
SELECT 'placement_statistics', COUNT(*) FROM placement_statistics;`);

  return sections.join('\n');
}

const sql = buildSql();
fs.mkdirSync(__dirname, { recursive: true });
fs.writeFileSync(outputPath, sql, 'utf8');

console.log(`Seed SQL generated at ${outputPath}`);
