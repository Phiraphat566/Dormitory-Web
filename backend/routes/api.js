const express = require('express');
const rateLimit = require('express-rate-limit');

const router = express.Router();

// Middleware: จำกัดจำนวน request
const apiLimiter = rateLimit({
    windowMs: 1000 * 60 * 3, // จำกัด 3 นาที
    max: 100, // จำกัด 100 request
    message: 'Too many requests, please try again after 3 minutes!'
});

// ✅ Import Controllers
const tenantController = require('../controllers/tenants');
const roomsController = require('../controllers/rooms');
const employeesController = require('../controllers/employees');
const complaintsController = require('../controllers/complaints');
const contactTenantController = require("../controllers/contact_tenant");

// ✅ Controller ค่าใช้จ่าย
const electricityBillController = require("../controllers/electricityBillController");
const rentBillController = require("../controllers/rentBillController");
const waterBillController = require("../controllers/waterBillController");
const paymentProofController = require("../controllers/paymentProofController");

// 📌 Middleware ใช้กับทุก API
router.use(apiLimiter);

// ✅ Debugging: ตรวจสอบ complaintsController
console.log("✅ Checking complaintsController:", complaintsController);
if (!complaintsController) {
    throw new Error("❌ complaintsController is undefined. Check the import statement in api.js");
}

// ✅ หมวดหมู่ผู้เช่า (Tenants)
router.route('/tenants')
    .get(tenantController.getTenants)
    .post(tenantController.createTenant);

router.route('/tenants/:Tenant_ID')
    .get(tenantController.getTenant)
    .put(tenantController.updateTenant)
    .delete(tenantController.deleteTenant);

// ✅ หมวดหมู่ห้องพัก (Rooms)
router.route('/rooms')
    .get(roomsController.getRooms);

router.route('/rooms/:Room_ID')
    .get(roomsController.getRoomById);

// ✅ หมวดหมู่พนักงาน (Employees)
router.route('/employees')
    .get(employeesController.getEmployees)
    .post(employeesController.createEmployee);

router.route('/employees/:Officer_ID')
    .put(employeesController.updateEmployee)
    .delete(employeesController.deleteEmployee);

// ✅ หมวดหมู่คำร้องเรียน (Complaints)
if (
    !complaintsController.getAllComplaints ||
    !complaintsController.createGeneralComplaint ||
    !complaintsController.createPetComplaint ||
    !complaintsController.createOverstayComplaint
) {
    throw new Error("❌ Some complaintController methods are undefined. Check the export in controllers/complaints.js");
}

router.route('/complaints')
    .get(complaintsController.getAllComplaints);

router.get('/complaints/:id', complaintsController.getComplaintById);
router.post('/complaints/general', complaintsController.createGeneralComplaint);
router.post('/complaints/pets', complaintsController.createPetComplaint);
router.post('/complaints/overstay', complaintsController.createOverstayComplaint);

// ✅ หมวดหมู่ข้อมูลติดต่อผู้เช่า (Contact Tenant)
router.get("/contact_tenant/:id", contactTenantController.getContactTenantById);

// ✅ หมวดหมู่ค่าใช้จ่าย (Bills)
router.route("/bills/electricity")
    .get(electricityBillController.getElectricityBills);

router.route("/bills/water")
    .get(waterBillController.getWaterBills);

router.route("/bills/rent")
    .get(rentBillController.getRentBills);

router.route("/bills/electricity/:tenant_id")
    .get(electricityBillController.getElectricityBillByTenant);

router.route("/bills/water/:tenant_id")
    .get(waterBillController.getWaterBillByTenant);

router.route("/bills/rent/:tenant_id")
    .get(rentBillController.getRentBillByTenant);

// ✅ หมวดหมู่หลักฐานการชำระเงิน (Payment Proof)
router.get("/payment-proof/:id", paymentProofController.getPaymentProof);

module.exports = router;
