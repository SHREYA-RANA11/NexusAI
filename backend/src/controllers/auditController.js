const auditService = require("../services/auditService");

const getAudit = async (req, res, next) => {
  try {
    const { caseId } = req.params;

    const audit = await auditService.generateAudit(caseId);

    if (!audit) {
      return res.status(404).json({
        success: false,
        message: "No audit found for this case",
      });
    }

    return res.status(200).json({
      success: true,
      data: audit,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAudit,
};