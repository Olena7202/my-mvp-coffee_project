/* eslint-env jest */
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./components/Header/Header";
import ProductCard from "./components/ProductCard/ProductCard";
import RandomCoffee from "./components/RandomCoffee/RandomCoffee";
import WhyUs from "./components/WhyUs/WhyUs";
import CartPage from "./pages/CartPage/CartPage";

// ---------- Header ----------
test("Header renders logo", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  expect(screen.getByText("☕ Coffee Shop")).toBeInTheDocument();
});

test("Header highlights Catalog link when on /catalog", () => {
  render(
    <MemoryRouter initialEntries={["/catalog"]}>
      <Header />
    </MemoryRouter>
  );
  expect(screen.getByText("Каталог")).toHaveClass("active");
});

test("Header does not highlight Catalog link when on /", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <Header />
    </MemoryRouter>
  );
  expect(screen.getByText("Каталог")).not.toHaveClass("active");
});

// ---------- ProductCard ----------
const product = {
  id: 1,
  name: "Espresso",
  description: "Strong coffee",
  price: 50,
  image: "test.jpg",
};

test("ProductCard renders product info", () => {
  render(<ProductCard product={product} addToCart={() => {}} />);
  expect(screen.getByText("Espresso")).toBeInTheDocument();
  expect(screen.getByText("Strong coffee")).toBeInTheDocument();
});

test("ProductCard has add button", () => {
  render(<ProductCard product={product} addToCart={() => {}} />);
  expect(screen.getByRole("button")).toBeInTheDocument();
});

// ---------- RandomCoffee ----------
test("RandomCoffee renders coffee of the day", () => {
  const coffee = { name: "Cappuccino", description: "Foamy", price: 70 };
  render(<RandomCoffee coffee={coffee} />);
  expect(screen.getByText("Кава дня")).toBeInTheDocument();
  expect(screen.getByText("Cappuccino")).toBeInTheDocument();
});

// ---------- WhyUs ----------
test("WhyUs renders reasons", () => {
  render(<WhyUs />);
  expect(screen.getByText("Свіже обсмаження")).toBeInTheDocument();
  expect(screen.getByText("Швидка доставка")).toBeInTheDocument();
  expect(screen.getByText("Натуральні зерна")).toBeInTheDocument();
});

// ---------- CartPage ----------
test("CartPage renders cart title", () => {
  render(<CartPage cartItems={[]} setCartItems={() => {}} />);
  expect(screen.getByText("Кошик")).toBeInTheDocument();
});

test("CartPage renders default cart item", () => {
  render(<CartPage cartItems={[]} setCartItems={() => {}} />);
  expect(screen.getByText("Latte Macchiato")).toBeInTheDocument();
});

test("CartPage shows quantity", () => {
  render(<CartPage cartItems={[]} setCartItems={() => {}} />);
  expect(screen.getByText("1")).toBeInTheDocument();
});

test("CartPage has remove button", () => {
  render(<CartPage cartItems={[]} setCartItems={() => {}} />);
  expect(screen.getByText("Видалити")).toBeInTheDocument();
});

test("CartPage has quantity controls", () => {
  render(<CartPage cartItems={[]} setCartItems={() => {}} />);
  expect(screen.getByText("+")).toBeInTheDocument();
  expect(screen.getByText("-")).toBeInTheDocument();
});

test("CartPage shows total price", () => {
  render(<CartPage cartItems={[]} setCartItems={() => {}} />);
  expect(screen.getByText(/Разом/i)).toBeInTheDocument();
});