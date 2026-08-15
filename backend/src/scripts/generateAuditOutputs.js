const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const connectDB = require("../config/database");
const auditService = require("../services/auditService");

const cases = [
    "CASE-001",
    "CASE-002",
    "CASE-003",
    "CASE-004",
    "CASE-005",
];

async function generate() {
    try {
        await connectDB();

        const outputDir = path.join(__dirname, "../audit-outputs");

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        for (const caseId of cases) {
            const audit = await auditService.generateAudit(caseId);

            if (!audit) {
                console.log(`Skipping ${caseId} (no data found)`);
                continue;
            }

            fs.writeFileSync(
                path.join(outputDir, `${caseId}.json`),
                JSON.stringify(audit, null, 2)
            );

            console.log(`Generated audit for ${caseId}`);
        }

        console.log("\nAll audit files generated successfully.");

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

generate();