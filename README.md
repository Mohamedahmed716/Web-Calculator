# 🧮 Web Calculator (Angular + Spring Boot)

## 📋 Overview
This project is a **web-based calculator** built using **Angular (frontend)** and **Spring Boot (backend)**.  
All calculations are performed in the backend via a REST API to demonstrate full-stack communication.

---

## ⚙️ Architecture
```
Frontend (Angular)
   ↓ HTTP POST (JSON)
Backend (Spring Boot)
   ↓
Result returned to Frontend
```

---

## 🧩 Frontend (Angular)

### 📁 Main Files
| File | Description |
|------|--------------|
| `calculator.html` | Calculator user interface layout |
| `calculator.css` | Styles the calculator and display |
| `calculator.ts` | Handles all logic, user interactions, and backend calls |
| `app.config.ts` | Configures API endpoints and providers |
| `main.ts` | Bootstraps the Angular application |

### 🖥️ Features
- Dark-themed calculator with responsive layout.
- Live display of input and a smaller preview line for current operations.
- Handles all core operations: `+`, `-`, `×`, `÷`, `%`.
- Unary operations supported: `√`, `x²`, `1/x`, `±`.
- Prevents typing after errors.
- Prevents number concatenation to the result after evaluation.
- Dynamic text resizing and ellipsis for long numbers.

### 💻 Communication
The frontend sends a JSON request via `HttpClient` to `/api/calc`:

**Request:**
```json
{
  "operator": "+",
  "operand1": "2",
  "operand2": "3"
}
```

**Response:**
```json
{
  "result": "5"
}
```

---

## 🧮 Backend (Spring Boot)

### 📁 Main Files
| File | Description |
|------|--------------|
| `CalculatorController.java` | REST controller managing API endpoints |
| `CalculatorService.java` | Business logic for mathematical operations |
| `CalculationRequest.java` | Model representing incoming requests |
| `CalculationResponse.java` | Model representing responses |

### 🚀 API Endpoint

**POST** `/api/calc`

**Example Request:**
```json
{
  "operator": "/",
  "operand1": "10",
  "operand2": "2"
}
```

**Example Response:**
```json
{
  "result": "5"
}
```

### 🧠 Controller
Uses `@RestController` and `@PostMapping("/calc")` to handle POST requests.  
Calls `CalculatorService` and returns a JSON response.

### 🧮 Service Logic
```java
switch (operator) {
    case "+": result = a + b; break;
    case "-": result = a - b; break;
    case "*": result = a * b; break;
    case "/":
        if (b == 0) throw new IllegalArgumentException("Division by zero");
        result = a / b;
        break;
    case "sqrt": result = Math.sqrt(a); break;
    // ...
}
```

### 🧾 Models
**CalculationRequest.java**
```java
public class CalculationRequest {
    private String operator;
    private String operand1;
    private String operand2;
}
```

**CalculationResponse.java**
```java
public class CalculationResponse {
    private String result;
    private String error;
}
```

---

## ⚙️ How to Run

### 🔹 Backend
1. Open the backend project in IntelliJ or Eclipse.
2. Run `WebCalculatorApplication.java`.
3. The backend runs at: `http://localhost:8080/api/calc`

### 🔹 Frontend
1. Navigate to the Angular project folder in terminal.
2. Run:
   ```bash
   npm install
   ng serve
   ```
3. Open your browser at: `http://localhost:4200`

---

## ✅ Example Usage

| Operation | Input | Output |
|------------|--------|--------|
| 5 + 2 | `5 + 2 =` | `7` |
| 10 ÷ 0 | `10 / 0 =` | `Error` |
| √9 | `√9` | `3` |
| Repeat last op | `2 + 3 = =` | `5`, `8`, `11` |

---

## 🧑‍💻 Future Enhancements
- Keyboard input support.
- Memory features (`M+`, `M-`, `MR`, `MC`).
- Smooth animation transitions for display updates.
- Offline support (PWA).

---

## 👨‍💻 Author
Developed as part of a full-stack project using **Angular 22** and **Spring Boot 3**.
