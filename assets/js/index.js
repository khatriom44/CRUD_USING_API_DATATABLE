// let prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
// let html = document.querySelector('html');
 
// html.classList.add(prefers);
// html.setAttribute('data-bs-theme', prefers);


let input = document.querySelector("input");
let dataTableInsatnce;
let fetched_data;
let form = document.getElementById("myForm");
let editId = -1;
let click_id = -1;
$(document).ready(async function () {
    // THIS THING FETCH THE DATA AND THIS DATA WE CAN DISPLAY ON TABLE 
    await fetch('https://65e6bc96d7f0758a76e8e55c.mockapi.io/api/studentdata/todo')
        .then(response => response.json())
        .then(data => {render(data)
            // THIS COLLECTED DATA IS PASS ON GLOABLE VARIABLE TO ACCESS ANYWARE 
            fetched_data=data
        }
        )
        .catch(error => console.error('Error fetching data:', error)
        );

    function render(apidata) {
        console.log("first")
        dataTableInsatnce = $('#myTable').DataTable({
            data: apidata,
            columns: [
                {
                    className: 'dt-control',
                    orderable: false,
                    data: null,
                    defaultContent: ''
                },
                { data: 'firstName' },
                { data: 'lastName', "sortable": false },
                { data: 'dateOfBirth' },
                { data: 'email' },
                { data: 'address' },
                { data: 'graduationYear' },
                {
                    data: null,
                    "defaultContent": `
                        <button class=" btn btn-success my-1" id="edit_btn" onclick="edit1()" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                        <button class=" btn btn-danger my-1 " id="delete_btn" onclick="deletedata()">delete</button>                                                
                    `,
                }
            ],
        });
        dataTableInsatnce.draw();   
    }
    // THIS FUNCTION IS CALLED WHEN WE CLICK ON ARROW TO SHOW EDUCATIONAL DATA 
    $(document).on('click', '.dt-control', async function () {
        // THIS CAN CREATE DATATABLE 
        let table = new DataTable('#myTable');
        let id2 = $(this).closest('tr');
        // THIS CAN GIVE ID OF THAT ROW 
        let index = dataTableInsatnce.row(id2).index();
        let myRow = table.row(index)
        // THIS CAN FETCH THE EDUCATIONAL DATA UPDATED DATA WHICH WE CAN DECLARED IN GLOABLE VARIABLE NAME IS "fetched_data"
        let studentEdudetails = [...fetched_data[index].educationFields]
        // THIS CAN ADD THE NESTED TABLE WHEN WE CLICK ON THAT ARROW TO SHOW EDUCATIONAL DATA  
        let aTR = `
        <table class="table background-nested" id="eduTable">
            <thead>
                <tr>
                    <th class="text-center">Degree/Board</th>
                    <th class="text-center">School/College</th>
                    <th class="text-center">Start Date</th>
                    <th class="text-center">Passout Year</th>
                    <th class="text-center">Percentage</th>
                    <th class="text-center">Backlog</th>
                </tr>
             </thead>
            <tbody id="eduBody${index}">
          
            </tbody>
         </table>
        `;
        // THIS IF ELSE THING IS DO WHEN CLICK THAT ARROW TO SHOW EDUCATIONAL DATA THAT TIME WHAT HAPPENED THAT THIS INDICATE
        if (myRow.child.isShown()) {
            myRow.child.hide()
        } else {
            // THIS LOOP CLOSE ALL NESTED TABLE WHICH IS OPEN 
            dataTableInsatnce.rows().every(function () {
                this.child.remove();
            })
            myRow.child(aTR).show();
            // THIS CALLED FUNCTION IN THAT PARAMETER WE PASSED THE EDUCATIONAL DATA AND ID OF THAT PARTICULAR ROW WHICH WE WANT TO SEE DATA 
            converDT(studentEdudetails, index)
        }
    })
    function converDT(studentEdudetails, index1) {
        studentEdudetails.forEach((ele) => {
            let det = $(`<tr class="text-center"></tr>`).html(`
            <td>${ele.degree_board}</td>
            <td>${ele.school_college}</td>
            <td>${ele.startDate}</td>
            <td>${ele.passoutYear}</td>
            <td>${ele.percentage}</td>
            <td>${ele.backlog}</td>
            `)
            $(`#eduBody${index1}`).append(det)
        })
    }
});

let educationField = {
    degree_board: "",
    school_college: "",
    startDate: "",
    passoutYear: "",
    percentage: "",
    backlog: ""
}

let person = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    address: "",
    graduationYear: "",
    educationFields: []
}

function validateAge() {

    var dobInput = document.getElementById('dateOfBirth');
    var selectedDate = new Date(dobInput.value);
    var today = new Date();
    var age = today.getFullYear() - selectedDate.getFullYear();
    var m = today.getMonth() - selectedDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < selectedDate.getDate())) {
        age--;
    }
    if (age < 18) {
        document.getElementById('ageError').style.display = 'block';
        return false;
    }
    else {
        document.getElementById('ageError').style.display = 'none';
        // Proceed with your logic if age is valid
        // document.querySelector("#graduationYear").dispatchEvent(new Event("input"));
        return true;
    }
}

function validateDates() {
    let isDateValid = true;

    var dobInput = document.getElementById('dateOfBirth').value;
    // Get the input field values
    looplength = document.querySelectorAll('.startDate1');
    // var startDateValues = document.querySelectorAll('.startDate1')[1].value;
    // var passoutYearValues = document.querySelectorAll('.passoutYear1')[1].value;

    looplength.forEach((element, index) => {
        var startDateValue = document.querySelectorAll('.startDate1')[index].value;
        var passoutYearValue = document.querySelectorAll('.passoutYear1')[index].value;
        // Parse the values into Date objects
        var startDate = new Date(startDateValue);
        var passoutYear = new Date(passoutYearValue);
        // Get the current date
        var currentDate = new Date();


        // Define the error message elements
        var startDateError = document.querySelectorAll('.startDateError1')[index];
        var passoutYearError = document.querySelectorAll('.passoutYearError1')[index];


        // Hide all error messages initially
        startDateError.style.display = 'none';
        passoutYearError.style.display = 'none';

        // Define the validation logic
        if (startDate > passoutYear) {
            passoutYearError.style.display = 'block';
            isDateValid =  false;
        }
        if (startDate >= currentDate) {
            startDateError.style.display = 'block';
            isDateValid = false;
        }

        var gap = document.getElementsByClassName("see")[index];

        gap.style.display = 'none';
        var differenceInYears = passoutYear.getFullYear() - startDate.getFullYear();

        if (differenceInYears < 2) {
            passoutYearError.style.display = 'block';

            gap.style.display = 'block';
            isDateValid =  false;
        }
    })
    return isDateValid;
}

function graduation_Year() {
    var dobInput = document.getElementById('dateOfBirth').value;
    var graduationYear = document.getElementById("graduationYear").value;
    var graduationYear1 = new Date(graduationYear);
    var dobInput1 = new Date(dobInput);


    var gymain = document.querySelector(".gy-main");
    console.log(gymain)

    // var currentDate = new Date();



    gymain.classList.add('d-none')
    if (graduationYear1 <= dobInput1) {
        gymain.classList.remove('d-none');
        gymain.classList.add('d-block');
        gymain.innerHTML = 'Graduation Year is not valid'
        return false;
    }

    if (graduationYear == "") {
        // gymain.style.display = 'block';
        gymain.classList.remove('d-none');
        gymain.classList.add('d-block');
        return false;
    }


    return true;
}

// when we submit or update form 
async function sendData(event) {
    event.preventDefault();

    debugger;

    console.log('age', validateAge());
    console.log('gradyear', graduation_Year());
    console.log('dates', validateDates());

    // this is done when client click on form is submit button
    if (!document.getElementById('myForm').checkValidity() || !validateAge() || !graduation_Year() || !validateDates()) {
        event.preventDefault()
        event.stopPropagation()
        $('#myForm').addClass('was-validated');
        console.log("not valid")
    }
    else {
        let person = {
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            email: "",
            address: "",
            graduationYear: "",
            educationFields: []
        }

        document.querySelectorAll("form#myForm div .form-control.main").forEach((ele) => {

            person[ele.id] = ele.value;
        })

        educationField = [];
        // this loop print the education data 
        document.querySelectorAll("tbody.tb tr").forEach((elem) => {

            Array.from(elem.getElementsByTagName('input')).forEach((e) => {
                educationField = { ...educationField, [e.id]: e.value }
            })

            person.educationFields.push(educationField);
        })
        if($("#submit").text()=="Update"){
            try {
                const response = await fetch(`https://65e6bc96d7f0758a76e8e55c.mockapi.io/api/studentdata/todo/${click_id}`, {
                  method: 'PUT', // or 'PATCH' for partial update
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(person)
                });
                if (!response.ok) {
                  throw new Error('Failed to update data');
                }
                const data = await response.json();
                console.log('Data updated successfully:', data);
                fetched_data[editId] = data; 
                form.reset();
                $('#myForm').removeClass('was-validated');
                $('.btn-close').trigger('click');
                dataTableInsatnce.clear();
                dataTableInsatnce.rows.add(fetched_data);
                dataTableInsatnce.draw();
              } catch (error) {
                console.error('Error updating data:', error);
              }
             
        }
        if($("#submit").text()=="Submit"){
            try {
                const response = await fetch('https://65e6bc96d7f0758a76e8e55c.mockapi.io/api/studentdata/todo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(person)
                });
                if (!response.ok) {
                    throw new Error('Failed to add data');
                }
                const data = await response.json();
                console.log('Data added successfully:', data);
                fetched_data.push(data);
                console.log(fetched_data);    
            } catch (error) {
                console.error('Error adding data:', error);
            }
            form.reset();
            $('#myForm').removeClass('was-validated');
            $('.btn-close').trigger('click');
     
            dataTableInsatnce.row.add(person);
            dataTableInsatnce.draw();
        }
    
        click_id = -1;
        editId = -1;
    }
}

// fetch data when click on edit data
function edit1() {
    // THIS BELOW LINE FIRST REMOVE ALL CLICK EVENT AND ADD NEW CLICK EVENT THIS CAN PREVENT THE FUNCTION CALLING TWICE  
    $('#myTable tbody').off('click', '#edit_btn').on('click', '#edit_btn', function () {
        // var id1 = e.parentNode.parentNode.rowIndex - 1;
        var id2 = $(this).closest('tr');
        var id1 = dataTableInsatnce.row(id2).index();
        let id3 = fetched_data[id1].id;
        click_id = id3;
        editId = id1;
        // if id value id not null that time only this run 
        if (id1 >= 0) {
            $('#submit').text("Update");
            $('#heading').html("Update Form");
            $('#firstName').val(fetched_data[id1].firstName);
            $('#lastName').val(fetched_data[id1].lastName);
            $('#dateOfBirth').val(fetched_data[id1].dateOfBirth);
            $('#email').val(fetched_data[id1].email);
            $('#address').val(fetched_data[id1].address);
            $('#graduationYear').val(fetched_data[id1].graduationYear);

            $('table tbody.tb tr:gt(1)').remove();
            for (let i = 2; i < fetched_data[id1].educationFields.length; i++) {
                let newRow = `
                <tr>
                <td>
                <input type="text" class="form-control" id="degree_board" aria-describedby="degree_boardHelp" placeholder="Degree/Board" required pattern="[a-zA-Z0-9]+">
                <div class="invalid-feedback">Degree name is required</div>
                </td>
                <td><input type="text" class="form-control" id="school_college" aria-describedby="school_collegeHelp"placeholder="School/College" required pattern="[a-zA-Z0-9]+"><div class="invalid-feedback">School name is required</div></td>
                <td>
                    <input type="month" class="form-control startDate1" id="startDate" aria-describedby="startDateHelp" required oninput="validateDates()">
                    <div class="invalid-feedback startDateError1" id="startDateError">Invalid start date</div>
                </td>          
                <td>
                    <input type="month" class="form-control passoutYear1" id="passoutYear" aria-describedby="passoutYearHelp" required oninput="validateDates()">
                    <div class="invalid-feedback passoutYearError1" id="passoutYearError">Invalid passout year<span class="see"> gap required 2 year</span></div>
                </td>
                <td><input type="number" class="form-control" id="percentage" aria-describedby="percentageHelp" placeholder="Percentage"  min="0" max="100"step="0.01" required>
                    <div class="invalid-feedback">Percentage is required</div></td>
                <td><input type="number" class="form-control" id="backlog" aria-describedby="backlogHelp" placeholder="Percentage"  min="0"  value="0" required>
                <div class="invalid-feedback">Backlog is required</div></td>
                <td><button type="button" class="form-control delete-btn btn-primary rounded-circle  fs-2 my-auto" id="delete" aria-describedby="buttonHelp" onclick="deleteRow(this)"">-</button></td>
                </tr>
                `;
                //  $('table tbody.tb').remove()[i];    
                $('table tbody.tb').append(newRow);
            }

            let count = 0;
            document.querySelectorAll("tbody.tb tr").forEach(element => {
                Array.from(element.getElementsByTagName('input')).forEach((e) => {
                    e.value = fetched_data[id1].educationFields[count][e.id];
                })
                count++;
            });
        }
    })
}

// this is use to add new row 
$("#add").click((e) => {
    e.preventDefault();
    e.stopPropagation();
    let newRow = `
    <tr>
    <td>
    <input type="text" class="form-control" id="degree_board" aria-describedby="degree_boardHelp" placeholder="Degree/Board" required pattern="[a-zA-Z0-9]+">
    <div class="invalid-feedback">Degree name is required</div>
    </td>
    <td><input type="text" class="form-control" id="school_college" aria-describedby="school_collegeHelp"placeholder="School/College" required pattern="[a-zA-Z]+"><div class="invalid-feedback">School name is required</div></td>
    <td>
        <input type="month" class="form-control startDate1" id="startDate" aria-describedby="startDateHelp" required oninput="validateDates()">
        <div class="invalid-feedback startDateError1" id="startDateError">Invalid start date</div>
    </td>          
    <td>
        <input type="month" class="form-control passoutYear1" id="passoutYear" aria-describedby="passoutYearHelp" required oninput="validateDates()">
        <div class="invalid-feedback passoutYearError1" id="passoutYearError">Invalid passout year<span class="see"> gap required 2 year</span></div>
    </td>
    <td><input type="number" class="form-control" id="percentage" aria-describedby="percentageHelp" placeholder="Percentage"  min="0" max="100"step="0.01" required>
        <div class="invalid-feedback">Percentage is required</div></td>
    <td><input type="number" class="form-control" id="backlog" aria-describedby="backlogHelp" placeholder="Percentage"  min="0"  value="0" required>
    <div class="invalid-feedback">Backlog is required</div></td>
                                            
    <td><button type="button" class="form-control delete-btn btn-primary rounded-circle  fs-2 my-auto" id="delete" aria-describedby="buttonHelp" ">-</button></td>
    </tr>
    `;
    $('table tbody.tb').append(newRow);
})

// this fuction delete the row FROM EDUCAIONFIELDS
$(document).on('click', '#delete', function () {
    $(this).closest('tr').remove();
})


// this function specially run for delete the ROW FROM TABLE
function deletedata(event) {
    $('#myTable tbody').off('click', '#delete_btn').on('click', "#delete_btn", async function () {
        // THIS ID1 CAN FETCH THE NEAREST ROW 
        let id2 = $(this).closest('tr');
        // THIS CAN GIVE ID OF THAT ROW 
        let index = dataTableInsatnce.row(id2).index();
        let id = fetched_data[index].id;
        dataTableInsatnce.row(index).remove().draw('full-hold');
            try {
                const response = await fetch(`https://65e6bc96d7f0758a76e8e55c.mockapi.io/api/studentdata/todo/${id}`, {
                  method: 'DELETE'
                });
                if (!response.ok) {
                  throw new Error('Failed to delete data');
                }
               
                fetched_data.splice(index, 1);
                console.log(fetched_data);
                dataTableInsatnce.clear();
                dataTableInsatnce.rows.add(fetched_data);
                dataTableInsatnce.draw();
                console.log('Data deleted successfully');
              } catch (error) {
                console.error('Error deleting data:', error);
              }
           
    })
}

// THIS CAN CAHNGE THE INNERTEXT WHEN RETURN FROM EDIT TO ADD RECORD 
$('#add1').click(() => {
    $('#heading').html("Student Form");
    $('#submit').text("Submit");
})


// This can reset form and also remove was-validate class at close btn or outside the modal we can use 
$('.modal, .close').on('click', function (event) {
    if ($(event.target).hasClass('modal') || $(event.target).hasClass('close')) {
        $('table tbody.tb tr:gt(1)').remove();
        $('#myForm')[0].reset();
        $('#myForm').removeClass('was-validated');// location.  return false; // Break the loop
    }

});

