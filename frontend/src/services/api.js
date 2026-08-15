const API = "http://localhost:5000/api";

export async function getDecisions() {
    const response = await fetch(`${API}/decisions`);
    return await response.json();
}

export async function getHistory(caseId) {
    const response = await fetch(`${API}/history/${caseId}`);
    return await response.json();
}

export async function getAudit(caseId) {
    const response = await fetch(`${API}/audit/${caseId}`);
    return await response.json();
}

export async function getDrift(page = 1, limit = 10) {
    const response = await fetch(
        `${API}/drift?page=${page}&limit=${limit}`
    );

    return await response.json();
}

export async function getReconciledDecision(caseId) {
    const response = await fetch(
        `${API}/reconcile/${caseId}`
    );

    return await response.json();
}

export async function createDecision(data) {
    const response = await fetch(`${API}/decisions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return await response.json();
}