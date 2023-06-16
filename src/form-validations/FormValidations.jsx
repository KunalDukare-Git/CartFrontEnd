import * as Yup from "yup";

export const SignupValidations = Yup.object({
    first_name: Yup.string()
        .min(2)
        .required("Please enter first name*")
        .matches("^[a-zA-Z]*$", "Only alphabets are allowed"),
    last_name: Yup.string()
        .min(2)
        .required("Please enter last name*")
        .matches("^[a-zA-Z]*$", "Only alphabets are allowed"),
    email: Yup.string()
        .email("Enter a valid email!!!")
        .required("Email is required*"),
    add_line1: Yup.string().required("Address Line1 is required*"),
    state: Yup.string().required("State is required*"),
    city: Yup.string().required("City is required*"),
    mobile: Yup.string()
        .required("Mobile is required*")
        .matches("^((\\+91-?)|0)?[0-9]{10}$", "Enter 10 digit phone"),
    password: Yup.string().required("Password is required*").min(8),
    confirmPassword: Yup.string()
        .required("Confirm Password is required*")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const LoginValidations = Yup.object({
    email: Yup.string().email().required("Email is required*"),
    password: Yup.string().min(8).required("Password is required*"),
});

export const CheckOutForm = Yup.object({
    fullname: Yup.string()
        .min(2)
        .required("Please enter full name*"),
    email: Yup.string()
        .email("Enter a valid email!!!")
        .required("Email is required*"),
    address: Yup.string().required("Address is required*"),
    mobile: Yup.string()
        .required("Mobile is required*")
        .matches("^((\\+91-?)|0)?[0-9]{10}$", "Enter 10 digit phone"),
});

