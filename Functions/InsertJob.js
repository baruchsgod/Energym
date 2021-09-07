const JobAuto = require(__dirname + "/../Model/InvoiceJob.js");
exports.postJob = function(docSerial){
    try {
        const jobA = new JobAuto({
            tipo:"System Job",
            username:docSerial,
            fecha:new Date().toISOString(),
            usuario:"SYSTEM"
        })
    
        return jobA.save();
    } catch (error) {
        console(err);
    }
    
}