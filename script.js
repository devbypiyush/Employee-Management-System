let employees = [];

let deleteEmployeeId = null;


/* ================================
   INITIAL DATA
================================ */

const defaultEmployees = [

    {
        id: 1,
        firstName: "Rahul",
        lastName: "Sharma",
        email: "rahul.sharma@empcore.com",
        phone: "+91 9876543210",
        department: "Information Technology",
        position: "Senior Software Engineer",
        joiningDate: "2022-04-15",
        salary: 85000,
        status: "Active"
    },

    {
        id: 2,
        firstName: "Priya",
        lastName: "Patil",
        email: "priya.patil@empcore.com",
        phone: "+91 9876543211",
        department: "Human Resources",
        position: "HR Manager",
        joiningDate: "2021-07-10",
        salary: 72000,
        status: "Active"
    },

    {
        id: 3,
        firstName: "Amit",
        lastName: "Kulkarni",
        email: "amit.kulkarni@empcore.com",
        phone: "+91 9876543212",
        department: "Finance",
        position: "Financial Analyst",
        joiningDate: "2023-01-20",
        salary: 65000,
        status: "Active"
    },

    {
        id: 4,
        firstName: "Neha",
        lastName: "Joshi",
        email: "neha.joshi@empcore.com",
        phone: "+91 9876543213",
        department: "Marketing",
        position: "Marketing Executive",
        joiningDate: "2023-09-05",
        salary: 55000,
        status: "On Leave"
    },

    {
        id: 5,
        firstName: "Rohan",
        lastName: "Deshmukh",
        email: "rohan.deshmukh@empcore.com",
        phone: "+91 9876543214",
        department: "Operations",
        position: "Operations Manager",
        joiningDate: "2020-11-12",
        salary: 90000,
        status: "Active"
    },

    {
        id: 6,
        firstName: "Sneha",
        lastName: "More",
        email: "sneha.more@empcore.com",
        phone: "+91 9876543215",
        department: "Information Technology",
        position: "UI/UX Designer",
        joiningDate: "2024-02-18",
        salary: 60000,
        status: "Active"
    },

    {
        id: 7,
        firstName: "Vikas",
        lastName: "Jadhav",
        email: "vikas.jadhav@empcore.com",
        phone: "+91 9876543216",
        department: "Finance",
        position: "Accountant",
        joiningDate: "2022-12-01",
        salary: 58000,
        status: "Inactive"
    },

    {
        id: 8,
        firstName: "Pooja",
        lastName: "Shinde",
        email: "pooja.shinde@empcore.com",
        phone: "+91 9876543217",
        department: "Human Resources",
        position: "Recruiter",
        joiningDate: "2024-05-20",
        salary: 48000,
        status: "Active"
    }

];


/* ================================
   DEPARTMENTS
================================ */

const departments = [

    "Information Technology",
    "Human Resources",
    "Finance",
    "Marketing",
    "Operations",
    "Sales"

];


/* ================================
   INITIALIZE
================================ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadEmployees();

        populateDepartments();

        renderEmployees();

        updateDashboard();

        renderDepartmentChart();

    }
);


/* ================================
   LOCAL STORAGE
================================ */

function loadEmployees() {

    const storedEmployees =
        localStorage.getItem("employees");

    if (storedEmployees) {

        employees =
            JSON.parse(storedEmployees);

    } else {

        employees =
            defaultEmployees;

        saveEmployees();

    }

}


function saveEmployees() {

    localStorage.setItem(
        "employees",
        JSON.stringify(employees)
    );

}


/* ================================
   DEPARTMENTS
================================ */

function populateDepartments() {

    const departmentSelect =
        document.getElementById("department");

    const departmentFilter =
        document.getElementById("departmentFilter");


    departments.forEach(
        department => {

            departmentSelect.innerHTML += `
                <option value="${department}">
                    ${department}
                </option>
            `;


            departmentFilter.innerHTML += `
                <option value="${department}">
                    ${department}
                </option>
            `;

        }
    );

}


/* ================================
   RENDER EMPLOYEES
================================ */

function renderEmployees() {

    const table =
        document.getElementById(
            "employeeTable"
        );


    const search =
        document.getElementById(
            "employeeSearch"
        ).value.toLowerCase();


    const department =
        document.getElementById(
            "departmentFilter"
        ).value;


    const status =
        document.getElementById(
            "statusFilter"
        ).value;


    const filteredEmployees =
        employees.filter(
            employee => {

                const fullName =
                    `${employee.firstName} ${employee.lastName}`
                    .toLowerCase();


                const searchMatch =

                    fullName.includes(search) ||

                    employee.email
                        .toLowerCase()
                        .includes(search) ||

                    employee.position
                        .toLowerCase()
                        .includes(search) ||

                    employee.department
                        .toLowerCase()
                        .includes(search);


                const departmentMatch =

                    department === "" ||

                    employee.department === department;


                const statusMatch =

                    status === "" ||

                    employee.status === status;


                return (
                    searchMatch &&
                    departmentMatch &&
                    statusMatch
                );

            }
        );


    table.innerHTML = "";


    if (filteredEmployees.length === 0) {

        table.innerHTML = `

            <tr>

                <td colspan="8"
                    style="text-align:center;padding:40px;color:#6b7280;">

                    No employees found.

                </td>

            </tr>

        `;

        document.getElementById(
            "recordCount"
        ).textContent =
            "Showing 0 employees";

        return;

    }


    filteredEmployees.forEach(
        employee => {

            const initials =
                employee.firstName.charAt(0) +
                employee.lastName.charAt(0);


            let avatarColor =
                getAvatarColor(employee.id);


            let statusClass = "";


            if (employee.status === "Active") {

                statusClass =
                    "status-active";

            } else if (
                employee.status === "Inactive"
            ) {

                statusClass =
                    "status-inactive";

            } else {

                statusClass =
                    "status-leave";

            }


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>

                    <input
                        type="checkbox"
                        class="employee-checkbox"
                        value="${employee.id}">

                </td>


                <td>

                    <div class="employee-cell">

                        <div
                            class="employee-avatar"
                            style="background:${avatarColor.background};
                                   color:${avatarColor.color};">

                            ${initials}

                        </div>


                        <div class="employee-details">

                            <strong>
                                ${employee.firstName}
                                ${employee.lastName}
                            </strong>

                            <span>
                                ID: EMP-${String(employee.id).padStart(4, "0")}
                            </span>

                        </div>

                    </div>

                </td>


                <td>
                    ${employee.department}
                </td>


                <td>
                    ${employee.position}
                </td>


                <td>
                    ${formatDate(employee.joiningDate)}
                </td>


                <td>
                    ₹${formatSalary(employee.salary)}
                </td>


                <td>

                    <span class="status ${statusClass}">

                        ${employee.status}

                    </span>

                </td>


                <td>

                    <div class="actions">

                        <button
                            class="action-btn action-edit"
                            onclick="editEmployee(${employee.id})"
                            title="Edit">

                            <i class="fa-solid fa-pen"></i>

                        </button>


                        <button
                            class="action-btn action-delete"
                            onclick="openDeleteModal(${employee.id})"
                            title="Delete">

                            <i class="fa-solid fa-trash"></i>

                        </button>

                    </div>

                </td>

            `;


            table.appendChild(row);

        }
    );


    document.getElementById(
        "recordCount"
    ).textContent =

        `Showing ${filteredEmployees.length} of ${employees.length} employees`;

}


/* ================================
   DASHBOARD
================================ */

function updateDashboard() {

    const total =
        employees.length;


    const active =
        employees.filter(
            e => e.status === "Active"
        ).length;


    const leave =
        employees.filter(
            e => e.status === "On Leave"
        ).length;


    document.getElementById(
        "totalEmployees"
    ).textContent = total;


    document.getElementById(
        "activeEmployees"
    ).textContent = active;


    document.getElementById(
        "leaveEmployees"
    ).textContent = leave;


    document.getElementById(
        "totalDepartments"
    ).textContent =
        departments.length;

}


/* ================================
   DEPARTMENT CHART
================================ */

function renderDepartmentChart() {

    const chart =
        document.getElementById(
            "departmentChart"
        );


    chart.innerHTML = "";


    const counts = {};


    employees.forEach(
        employee => {

            if (!counts[employee.department]) {

                counts[employee.department] = 0;

            }

            counts[employee.department]++;

        }
    );


    const maxCount =
        Math.max(
            ...Object.values(counts),
            1
        );


    Object.entries(counts)
        .forEach(
            ([department, count]) => {

                const percentage =
                    (count / maxCount) * 100;


                chart.innerHTML += `

                    <div class="department-row">

                        <div class="department-info">

                            <span>
                                ${department}
                            </span>

                            <span>
                                ${count} employees
                            </span>

                        </div>


                        <div class="progress">

                            <div
                                class="progress-bar"
                                style="width:${percentage}%">

                            </div>

                        </div>

                    </div>

                `;

            }
        );

}


/* ================================
   ADD EMPLOYEE
================================ */

function openEmployeeModal() {

    document.getElementById(
        "employeeModal"
    ).classList.add("show");


    document.getElementById(
        "employeeForm"
    ).reset();


    document.getElementById(
        "employeeId"
    ).value = "";


    document.getElementById(
        "modalTitle"
    ).textContent =
        "Add Employee";

}


function closeEmployeeModal() {

    document.getElementById(
        "employeeModal"
    ).classList.remove("show");

}


/* ================================
   SAVE EMPLOYEE
================================ */

document.getElementById(
    "employeeForm"
).addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const id =
            document.getElementById(
                "employeeId"
            ).value;


        const employee = {

            firstName:
                document.getElementById(
                    "firstName"
                ).value.trim(),

            lastName:
                document.getElementById(
                    "lastName"
                ).value.trim(),

            email:
                document.getElementById(
                    "email"
                ).value.trim(),

            phone:
                document.getElementById(
                    "phone"
                ).value.trim(),

            department:
                document.getElementById(
                    "department"
                ).value,

            position:
                document.getElementById(
                    "position"
                ).value.trim(),

            joiningDate:
                document.getElementById(
                    "joiningDate"
                ).value,

            salary:
                Number(
                    document.getElementById(
                        "salary"
                    ).value
                ),

            status:
                document.getElementById(
                    "employeeStatus"
                ).value

        };


        if (id) {

            const index =
                employees.findIndex(
                    e => e.id === Number(id)
                );


            if (index !== -1) {

                employees[index] = {

                    id: Number(id),

                    ...employee

                };

            }


            showToast(
                "Employee updated successfully."
            );

        } else {

            employee.id =
                getNextId();


            employees.unshift(
                employee
            );


            showToast(
                "Employee added successfully."
            );

        }


        saveEmployees();

        closeEmployeeModal();

        renderEmployees();

        updateDashboard();

        renderDepartmentChart();

    }
);


/* ================================
   EDIT EMPLOYEE
================================ */

function editEmployee(id) {

    const employee =
        employees.find(
            e => e.id === id
        );


    if (!employee) {

        return;

    }


    document.getElementById(
        "employeeId"
    ).value =
        employee.id;


    document.getElementById(
        "firstName"
    ).value =
        employee.firstName;


    document.getElementById(
        "lastName"
    ).value =
        employee.lastName;


    document.getElementById(
        "email"
    ).value =
        employee.email;


    document.getElementById(
        "phone"
    ).value =
        employee.phone;


    document.getElementById(
        "department"
    ).value =
        employee.department;


    document.getElementById(
        "position"
    ).value =
        employee.position;


    document.getElementById(
        "joiningDate"
    ).value =
        employee.joiningDate;


    document.getElementById(
        "salary"
    ).value =
        employee.salary;


    document.getElementById(
        "employeeStatus"
    ).value =
        employee.status;


    document.getElementById(
        "modalTitle"
    ).textContent =
        "Edit Employee";


    document.getElementById(
        "employeeModal"
    ).classList.add("show");

}


/* ================================
   DELETE
================================ */

function openDeleteModal(id) {

    deleteEmployeeId = id;

    document.getElementById(
        "deleteModal"
    ).classList.add("show");

}


function closeDeleteModal() {

    deleteEmployeeId = null;

    document.getElementById(
        "deleteModal"
    ).classList.remove("show");

}


function confirmDelete() {

    if (!deleteEmployeeId) {

        return;

    }


    employees =
        employees.filter(
            employee =>
                employee.id !== deleteEmployeeId
        );


    saveEmployees();

    closeDeleteModal();

    renderEmployees();

    updateDashboard();

    renderDepartmentChart();

    showToast(
        "Employee deleted successfully."
    );

}


/* ================================
   SELECT ALL
================================ */

function selectAllEmployees() {

    const checked =
        document.getElementById(
            "selectAll"
        ).checked;


    document
        .querySelectorAll(
            ".employee-checkbox"
        )
        .forEach(
            checkbox => {

                checkbox.checked =
                    checked;

            }
        );

}


/* ================================
   SIDEBAR
================================ */

function toggleSidebar() {

    document.getElementById(
        "sidebar"
    ).classList.toggle("open");

}


/* ================================
   GLOBAL SEARCH
================================ */

function globalSearch() {

    const search =
        document.getElementById(
            "globalSearch"
        ).value;


    document.getElementById(
        "employeeSearch"
    ).value =
        search;


    renderEmployees();

}


/* ================================
   NEXT ID
================================ */

function getNextId() {

    if (employees.length === 0) {

        return 1;

    }


    return Math.max(
        ...employees.map(
            employee => employee.id
        )
    ) + 1;

}


/* ================================
   FORMAT DATE
================================ */

function formatDate(date) {

    if (!date) {

        return "";

    }


    const d =
        new Date(date);


    return d.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* ================================
   FORMAT SALARY
================================ */

function formatSalary(salary) {

    return Number(salary)
        .toLocaleString("en-IN");

}


/* ================================
   AVATAR COLORS
================================ */

function getAvatarColor(id) {

    const colors = [

        {
            background: "#dbeafe",
            color: "#1d4ed8"
        },

        {
            background: "#dcfce7",
            color: "#15803d"
        },

        {
            background: "#fef3c7",
            color: "#b45309"
        },

        {
            background: "#f3e8ff",
            color: "#7e22ce"
        },

        {
            background: "#fce7f3",
            color: "#be185d"
        }

    ];


    return colors[
        id % colors.length
    ];

}


/* ================================
   TOAST
================================ */

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    document.getElementById(
        "toastMessage"
    ).textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function () {

            toast.classList.remove(
                "show"
            );

        },
        3000
    );

}


/* ================================
   LOGOUT
================================ */

function logout() {

    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (confirmLogout) {

        showToast(
            "Logout successful."
        );

    }

}


/* ================================
   CLOSE MODALS ON BACKGROUND CLICK
================================ */

document.getElementById(
    "employeeModal"
).addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            this
        ) {

            closeEmployeeModal();

        }

    }
);


document.getElementById(
    "deleteModal"
).addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            this
        ) {

            closeDeleteModal();

        }

    }
);