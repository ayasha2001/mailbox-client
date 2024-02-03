import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginSignup from "./LoginSignup";
import { Provider } from "react-redux";
import store from "../../store/store";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

describe("LoginSignup Component", () => {
  test("should render the component", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginSignup />
        </BrowserRouter>
      </Provider>
    );
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByText("Sign up");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("should go to forgot password screen the component", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginSignup />
        </BrowserRouter>
      </Provider>
    );

    const loginbtn = screen.getByText("Have an account? Login", {
      exact: false,
    });
    userEvent.click(loginbtn);

    // waitFor to wait for the text to appear after the button click
    waitFor(() => {
      const btn = screen.getByText("forgot password?");
      userEvent.click(btn);
    });

    const text = screen.getByText("forgot password?");
    expect(text).toBeInTheDocument();
  });

  test("should show the login screen on click of login button", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginSignup />
        </BrowserRouter>
      </Provider>
    );

    const loginbtn = screen.getByText("Have an account? Login", {
      exact: false,
    });
    userEvent.click(loginbtn);

    const loginText = screen.getAllByText("Login");
    expect(loginText).not.toHaveLength(0)
  });
});
