const express=require('express');
const router=express.Router();
const {protect,authorize}=require("../middleware/authmiddleware");
//admin
// ie to display users client and serviceprovider in admin dashboard
router.get('/users', protect, authorize("admin"), getAllUsers);
router.delete('/user/:id',protect,authorize("admin"),deleteUser);

router.get('/providers/pending',protect,authorize("admin"),getpending)//to get the pending service provider

router.put('/provider/:id/approve', protect,authorize("admin"),approveServiceProvider); // approve Service Provider
router.put('/provider/:id/reject', protect,authorize("admin"),rejectServiceProvider); //reject service provider

router.get('/providers', protect, authorize("admin"), getAllproviders);
router.get('/providers/:id', protect, authorize("admin"), viewspecificprovider);
router.put('/providers/:id', protect, authorize("admin"), updatespecificprovider);
router.delete('/providers/:id', protect, authorize("admin"), deletespecificprovider);

router.get('/requests', protect, authorize("admin"), getallrequest);
router.get('/requests/:id', protect, authorize("admin"), getspecificrequest);


router.get('/transaction', protect, authorize("admin"), getalltransaction);

router.get('/reports/trends', protect, authorize("admin"), getservicetrendreport);
router.get('/reports/performance', protect, authorize("admin"), getperformancereport);











module.exports = router;