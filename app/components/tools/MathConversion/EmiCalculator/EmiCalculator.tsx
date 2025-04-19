'use client';

import { useState, useEffect } from 'react';
import styles from './EmiCalculator.module.css';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';

export default function EmiCalculatorTool() {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(7.5);
  const [tenureYears, setTenureYears] = useState(5);

  const [emi, setEmi] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    const principal = loanAmount;
    const annualRate = interestRate;
    const tenureMonths = tenureYears * 12;
    const monthlyRate = annualRate / 12 / 100;

    if (monthlyRate === 0) {
      const emi = principal / tenureMonths;
      setEmi(emi);
      setTotalPayment(principal);
      setTotalInterest(0);
    } else {
      const emi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);
      const total = emi * tenureMonths;
      setEmi(emi);
      setTotalPayment(total);
      setTotalInterest(total - principal);
    }
  }, [loanAmount, interestRate, tenureYears]);

  const formatCurrency = (amount: number) =>
    amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

  return (
    <Container className={styles.wrapper}>
      <Card className={`p-4 mb-4 ${styles.card}`}>
        <Form>
          <Row className="gy-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Loan Amount (₹)</Form.Label>
                <Form.Control
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  min={0}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Annual Interest Rate (%)</Form.Label>
                <Form.Control
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  step="0.1"
                  min={0}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Tenure (Years)</Form.Label>
                <Form.Control
                  type="number"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  min={1}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card>

      <Row className="gy-4">
        <Col md={4}>
          <Card className={`p-3 text-center ${styles.resultCard}`}>
            <h5>Monthly EMI</h5>
            <div className={styles.resultValue}>{formatCurrency(emi)}</div>
          </Card>
        </Col>
        <Col md={4}>
          <Card className={`p-3 text-center ${styles.resultCard}`}>
            <h5>Total Interest</h5>
            <div className={styles.resultValue}>{formatCurrency(totalInterest)}</div>
          </Card>
        </Col>
        <Col md={4}>
          <Card className={`p-3 text-center ${styles.resultCard}`}>
            <h5>Total Payment</h5>
            <div className={styles.resultValue}>{formatCurrency(totalPayment)}</div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
