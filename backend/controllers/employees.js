const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ✅ ดึงรายชื่อพนักงานทั้งหมด
const getEmployees = async (req, res) => {
    try {
        const employees = await prisma.officer.findMany();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employees' });
    }
};

// ✅ เพิ่มพนักงานใหม่
const createEmployee = async (req, res) => {
    const { first_name, last_name, Address, position, salary } = req.body;

    try {
        const newEmployee = await prisma.officer.create({
            data: { first_name, last_name, Address, position, salary }
        });

        res.status(201).json({
            message: "Employee added successfully",
            employee: newEmployee
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add employee' });
    }
};

// ✅ แก้ไขข้อมูลพนักงาน
const updateEmployee = async (req, res) => {
    const { first_name, last_name, Address, position, salary } = req.body;
    const { Officer_ID } = req.params;

    try {
        const updatedEmployee = await prisma.officer.update({
            where: { Officer_ID: parseInt(Officer_ID) },
            data: { first_name, last_name, Address, position, salary }
        });

        res.json({
            message: "Employee updated successfully",
            employee: updatedEmployee
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update employee' });
    }
};

// ✅ ลบพนักงาน
const deleteEmployee = async (req, res) => {
    const { Officer_ID } = req.params;

    try {
        await prisma.officer.delete({
            where: { Officer_ID: parseInt(Officer_ID) }
        });

        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete employee' });
    }
};

module.exports = { getEmployees, createEmployee, updateEmployee, deleteEmployee };
