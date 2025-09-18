// TOPIC
// Template Pattern in JavaScript (OOP Design Pattern)

// USE CASES
// - Data processing pipelines
// - Allowing subclasses to override specific steps of the algorithm
// - Promoting code reuse and consistency across different implementations

// PROBLEM IT SOLVES
// JavaScript doesn't have abstract classes. The Template 
// Pattern helps to define a common structure for a group 
// of related algorithms, allowing variations in the 
// implementation without changing the overall algorithm's structure.


// SOLUTION EXAMPLES
// 1) Data Processing Pipeline
class DataProcessor {
    process(data) {
        // define the skeleton of the algorithm
        this.loadData(data);
        this.transformData();
        this.saveData();
    }
}

class CSVProcessor extends DataProcessor {
    loadData(data) {
        this.data = data.split(',').map(item => item.trim());
        console.log("CSV Data Loaded:", this.data);
    }

    transformData() {
        this.data = this.data.map(item => item.toUpperCase());
        console.log("CSV Data Transformed:", this.data);
    }

    saveData() {
        console.log("CSV Data Saved:", this.data);
    }
}

class JSONProcessor extends DataProcessor {
    loadData(data) {
        this.data = JSON.parse(data);
        console.log("JSON Data Loaded:", this.data);
    }

    transformData() {
        this.data = Object.keys(this.data).map(key => {
            return { ...this.data[key], id: key };
        });
        console.log("JSON Data Transformed:", this.data);
    }

    saveData() {
        console.log("JSON Data Saved:", JSON.stringify(this.data));
    }
}