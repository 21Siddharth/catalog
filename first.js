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
    const jsonData = {
        "keys": {
            "n": 4,
            "k": 3
        },
        "1": {
            "base": "10",
            "value": "4"
        },
        "2": {
            "base": "2",
            "value": "111"
        },
        "3": {
            "base": "10",
            "value": "12"
        },
        "6": {
            "base": "4",
            "value": "213"
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
