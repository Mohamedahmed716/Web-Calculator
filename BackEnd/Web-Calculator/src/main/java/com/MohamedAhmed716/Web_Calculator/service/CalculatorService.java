package com.MohamedAhmed716.Web_Calculator.service;

import org.springframework.stereotype.Service;

@Service
public class CalculatorService {

    public double calculate(String operator, double operand1, Double operand2) throws ArithmeticException {
        switch (operator) {
            case "+":
                return operand1 + operand2;
            case "-":
                return operand1 - operand2;
            case "*":
                return operand1 * operand2;
            case "/":
                if (operand2 == 0)
                    throw new ArithmeticException("Division by zero");
                return operand1 / operand2;
            default:
                throw new IllegalArgumentException("Unknown operator: " + operator);
        }
    }

    public double unary(String operator, double operand) {
        switch (operator) {
            case "sqrt":
                return Math.sqrt(operand);
            case "square":
                return operand * operand;
            case "reciprocal":
                if (operand == 0)
                    throw new ArithmeticException("Division by zero");
                return 1 / operand;
            case "percent":
                return operand / 100.0;
            case "negate":
                return -operand;
            default:
                throw new IllegalArgumentException("Unknown unary operator: " + operator);
        }
    }
}
