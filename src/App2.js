import { Component } from 'react';
import dummy from './dummy';
export default class App extends Component {
  constructor() {
    super()
    this.state = {
      employees: dummy,

      duplicateError: {
        idstatus: false,
        mailstatus: false
      }
      // pageColor : "#fffff"

    }
    this.departments = [
      { key: 1, value: "FrontEnd Developer",color : "alert-primary" },
      { key: 2, value: "Java Developer",color:"alert-warning"},
      { key: 3, value: "Android Developer",color:"alert-info" }
    ]
    // this.bgColors = [
    //   {key : 1, value : '#ccaaff'},
    //   {key : 2, value : '#B0E0E6'},
    //   {key : 3, value : '#00BFFF'},
    //   {key : 4, value : '#7B68EE'},
    //   {key : 5, value : '#EE82EE'},
    // ]
  }

  clear = () => {
    this.idbox.value = ""
    this.namebox.value = ""
    this.salbox.value = ""
    this.mailbox.value = ""
    this.selectbox.value = ""
  }

  saveEmp = () => {
    var id = this.idbox.value;
    var name = this.namebox.value;
    var salary = this.salbox.value;
    var mail = this.mailbox.value;
    var dep = this.selectbox.value;

    var ob = { empid: id, name: name, salary: salary, email: mail, department: dep }
    this.setState({ employees: [...this.state.employees, ob] })
    this.clear()
  }
  // DUPLICATE ERROR PROBLEM
  // checkId = ()=>{
  //   var id = this.idbox.value
  //   var isFound = this.state.employees.find(ob=>ob.empid==id)!=undefined
  //   if(isFound){
  //     this.setState({duplicateError: {...this.state.duplicateError,idstatus:true}})
  //   }else{
  //     this.setState({duplicateError: {...this.state.duplicateError,idstatus:false}})
  //   }
  // }
  // checkMail = ()=>{
  //   var mail = this.mailbox.value
  //   var isFound = this.state.employees.find(ob=>ob.email==mail)!=undefined
  //   if(isFound){
  //     this.setState({duplicateError: {...this.state.duplicateError,mailstatus:true}})
  //   }else{
  //     this.setState({duplicateError: {...this.state.duplicateError,mailstatus:false}})
  //   }
  // }



  checkId = () => {
    var id = this.idbox.value
    var isFound = this.state.employees.find(ob => ob.empid == id) != undefined;
    this.setState({ duplicateError: { ...this.state.duplicateError, idstatus: isFound } })
  }

  checkMail = () => {
    var mail = this.mailbox.value
    var isFound = this.state.employees.find(ob => ob.email == mail) != undefined;
    this.setState({ duplicateError: { ...this.state.duplicateError, mailstatus: isFound } })
  }

deleteEmp = (id)=>{
    const isConfirmed = window.confirm("Are you sure you want to delete this employee?");  
    if (isConfirmed) {
      this.setState({ employees: this.state.employees.filter(ob => ob.empid !== id) });
    }
  
  
  // window.confirm("are you")
  // this.setState({employees : this.state.employees.filter(ob=>ob.empid!=id)})
}

render() {
  // return <div className='container' style={{backgroundColor:this.state.pageColor}}>
  return <div className='container'>
    <h1 className='alert-danger text-center'>Employee Records</h1>
    <hr />
    {/* <div>
           {this.bgColors.map((ob,index)=><>
           <button onClick={()=>this.setState({pageColor:ob.value})} style={{backgroundColor:ob.value}}>BG-{index+1}</button>&nbsp;&nbsp;
           </>)}
      </div> 
      <hr/>*/}
    <div className='container'>
      <h1 className='text-center alert-success'>Add Employees</h1>
      <div className='row mt-3'>
        <div className='col-lg-4 col-md-4'>
          <input type='text' className='form-control' ref={c => this.idbox = c} onBlur={this.checkId} placeholder='Emp Id' />
          {this.state.duplicateError.idstatus && <span className="text-danger">ID already exists!</span>}
        </div>
        <div className='col-lg-4 col-md-4'>
          <input type='text' className='form-control' ref={c => this.namebox = c} placeholder='Emp Name' />
        </div>
        <div className='col-lg-4 col-md-4'>
          <input type='number' className='form-control' ref={c => this.salbox = c} placeholder='Emp salary' />
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-lg-4 col-md-4 '>
          <input type='text' className='form-control' ref={c => this.mailbox = c} onBlur={this.checkMail} placeholder='Emp Email' />
          {this.state.duplicateError.mailstatus && <span className="text-danger">ID already exists!</span>}
        </div>
        <div className='col-lg-4 col-md-4'>
          <select className='form-control' ref={c => this.selectbox = c}>
            <option value=''>Choose Department</option>
            {this.departments.map(dep => <option value={dep.key}>
              {dep.value}
            </option>)}
          </select>
        </div>
        <div className='col-lg-4 col-md-4'>
          <button onClick={this.saveEmp} disabled={this.state.duplicateError.idstatus || this.state.duplicateError.mailstatus} className='btn btn-primary'>Save Employee</button>
        </div>
      </div>

    </div>
    <hr />
    <div className='row'>
      <div className='col-lg-2 col-md-2'>
        <b className='alert-success'>Total :{this.state.employees.length}</b>
      </div>
      <div className='col-lg-4 col-md-4'>

      </div>
      <div className='col-lg-2 col-md-2'>
        <b className='alert-primary'>FrontEnd Developer :{this.state.employees.reduce((x, ob) => ob.department == '1' ? x + 1 : x, 0)} </b>
      </div>
      <div className='col-lg-2 col-md-2'>
        <b className='alert-warning'>Java Developer :{this.state.employees.reduce((x, ob) => ob.department == '2' ? x + 1 : x, 0)} </b>
      </div>
      <div className='col-lg-2 col-md-2'>
        <b className='alert-info'>Android Developer :{this.state.employees.reduce((x, ob) => ob.department == '3' ? x + 1 : x, 0)} </b>
      </div>
    </div>
    <hr />
    {/* <h1 style={{color:'darkgreen',backgroundColor:'greenyellow',textAlign:'center'}}>Employee Records</h1>
      <hr/> */}
    <table className='table table-striped table-hover text-center'>
      <thead>
        <tr>
          <th>S.no</th>
          <th>Employee Id</th>
          <th>Employee Name</th>
          <th>Salary</th>
          <th>Email Id</th>
          <th>Department</th>
          <th>Operation</th>
        </tr>
      </thead>
      <tbody>
        {this.state.employees.map((ob, index) => {
          return <tr key={index} className={this.departments.find(dep => dep.key == ob.department).color}>
            <td>{index + 1}</td>
            <td>{ob.empid}</td>
            <td>{ob.name}</td>
            <td>{ob.salary}</td>
            <td>{ob.email}</td>
            <td>{this.departments.find(dep => dep.key == ob.department).value}</td>
            <td>
              <button onClick={()=>{this.deleteEmp(ob.empid)}} className='btn btn-outline-success'>Delete</button>
            </td>
          </tr>
        })}
      </tbody>
    </table>
  </div>
}
}
