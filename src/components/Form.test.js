import React from "react";
import {render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Form from "./Form";
import App from "../App";
import { formValidation } from "./formValidation";

jest.mock("./formValidation");

test("form render correctly", () => {
  const { getByPlaceholderText } = render(<Form />);
  expect(getByPlaceholderText(/^İsim/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/Soyisim/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/Parola/i)).toBeInTheDocument();
  expect(getByPlaceholderText(/e-posta/i)).toBeInTheDocument();
});

test("password input", () => {
  const { getByPlaceholderText, getByRole } = render(<Form />);

  const passwordInput = getByPlaceholderText(/parola/i);
  const passwordShow = getByRole("button", { name: /göster/i });

  expect(passwordInput.type).toEqual("password");

  userEvent.click(passwordShow);

  expect(passwordInput.type).toEqual("text");

  expect(passwordShow).toHaveTextContent(/gizle/i);
});

test("form validation on works properly", () => {
  const { getByPlaceholderText, getByRole, getByTestId } = render(<Form />);

  const errorText = getByTestId("error-text");

  formValidation.mockReturnValueOnce("error");

  expect(errorText).toHaveTextContent("");

  userEvent.click(getByRole("button", { name: /kayıt/i }));

  expect(errorText).toHaveTextContent("error");

  userEvent.type(getByPlaceholderText(/e-posta/i), "ab");

  expect(errorText).toHaveTextContent("");
});

test("submit works properly", () => {
  const mockFormData = {
    firstName: "test name",
    lastName: "test last name",
    password: "test password",
    email: "test@mail.com",
  };

  const { getByPlaceholderText, getByRole,getByText } = render(<App />);

  userEvent.type(getByPlaceholderText(/^İsim/i), mockFormData.firstName);
  userEvent.type(getByPlaceholderText(/soyisim/i), mockFormData.lastName);
  userEvent.type(getByPlaceholderText(/parola/i), mockFormData.password);
  userEvent.type(getByPlaceholderText(/e-posta/i), mockFormData.email);

  userEvent.click(getByRole("button", { name: /kayıt/i }));

  getByText(/hoşgeldiniz/i);
});
