package com.MohamedAhmed716.Web_Calculator.controller;

import com.MohamedAhmed716.Web_Calculator.model.CalculationRequest;
import com.MohamedAhmed716.Web_Calculator.model.CalculationResponse;
import com.MohamedAhmed716.Web_Calculator.service.CalculatorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class CalculatorController {

    @Autowired
    private CalculatorService calculatorService;

    @PostMapping("/calc")
    public CalculationResponse calculate(@RequestBody CalculationRequest request) {
        try {
            String op = request.getOperator();
            double operand1 = Double.parseDouble(request.getOperand1());
            Double operand2 = (request.getOperand2() != null && !request.getOperand2().isEmpty())
                    ? Double.parseDouble(request.getOperand2())
                    : null;

            double result;
            if (operand2 == null) {
                result = calculatorService.unary(op, operand1);
            } else {
                result = calculatorService.calculate(op, operand1, operand2);
            }

            return new CalculationResponse(String.valueOf(result), null);

        } catch (NumberFormatException e) {
            return new CalculationResponse(null, "Invalid number format");
        } catch (ArithmeticException e) {
            return new CalculationResponse(null, e.getMessage());
        } catch (IllegalArgumentException e) {
            return new CalculationResponse(null, e.getMessage());
        } catch (Exception e) {
            return new CalculationResponse(null, "Unexpected error: " + e.getMessage());
        }
    }
}
