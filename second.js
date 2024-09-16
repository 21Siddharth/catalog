// Function to decode a value from a given base to a decimal number
function decodeValue(base, value) {
    return parseInt(value, base);
}

// Function to parse JSON and extract roots
function parseJsonData(jsonData) {
    const roots = [];
    for (const key in jsonData) {
        if (key === "keys") {
            continue;
        }
        const base = parseInt(jsonData[key]['base']);
        const value = jsonData[key]['value'];
        const x = parseInt(key);
        const y = decodeValue(base, value);
        roots.push({ x, y });
    }
    return roots;
}

// Function to calculate the constant term (c) using polynomial interpolation
function findConstantTerm(roots) {
    const n = roots.length;

    // Using Lagrange interpolation to find the polynomial coefficients
    function lagrangeInterpolation(x) {
        let result = 0;
        for (let k = 0; k < n; k++) {
            let term = roots[k].y;
            for (let i = 0; i < n; i++) {
                if (i !== k) {
                    term *= (x - roots[i].x) / (roots[k].x - roots[i].x);
                }
            }
            result += term;
        }
        return result;
    }

    // Evaluate the polynomial at x = 0 to get the constant term
    return lagrangeInterpolation(0);
}

// Main function to solve the problem
function solve() {
    // Example JSON data
    const jsonData ={
    "keys": {
        "n": 9,
        "k": 6
    },
    "1": {
        "base": "10",
        "value": "28735619723837"
    },
    "2": {
        "base": "16",
        "value": "1A228867F0CA"
    },
    "3": {
        "base": "12",
        "value": "32811A4AA0B7B"
    },
    "4": {
        "base": "11",
        "value": "917978721331A"
    },
    "5": {
        "base": "16",
        "value": "1A22886782E1"
    },
    "6": {
        "base": "10",
        "value": "28735619654702"
    },
    "7": {
        "base": "14",
        "value": "71AB5070CC4B"
    },
    "8": {
        "base": "9",
        "value": "122662581541670"
    },
    "9": {
        "base": "8",
        "value": "642121030037605"
    }
};

    // Parse the JSON and extract the roots
    const roots = parseJsonData(jsonData);

    // Find the constant term (c)
    const constantTerm = findConstantTerm(roots);

    // Output the result
    console.log(`The constant term of the polynomial is: ${constantTerm}`);
}

// Run the solution
solve();
