import React from "react";

type Billing = {
    firstName: string;
    lastName: string;
    companyName: string;
    countryName: string;
    address: string;
    addressTwo: string;
    town: string;
    country: string;
    phone: string;
    email: string;
};

interface OrderContextType {
    userId: string;
    firstName: string;
    lastName: string;
    companyName: string;
    countryName: string;
    address: string;
    addressTwo: string;
    town: string;
    country: string;
    phone: string;
    email: string;
    checkboxLabelTwo: boolean;
    isError: boolean[];
    errorMessage: Billing;
    handleSubmitBilling: (e: React.FormEvent) => void;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    setCompanyName: React.Dispatch<React.SetStateAction<string>>;
    setCountryName: React.Dispatch<React.SetStateAction<string>>;
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    setAddressTwo: React.Dispatch<React.SetStateAction<string>>;
    setTown: React.Dispatch<React.SetStateAction<string>>;
    setCountry: React.Dispatch<React.SetStateAction<string>>;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setCheckboxLabelTwo: React.Dispatch<React.SetStateAction<boolean>>;
    setIsError: React.Dispatch<React.SetStateAction<boolean[]>>;
    setErrorMessage: React.Dispatch<React.SetStateAction<Billing>>;
}

const OrderContext = React.createContext<OrderContextType | undefined>(undefined);

const OrderProvider = ({ children }: { children: React.ReactNode }) => {

    const [userId, setUserId] = React.useState("");
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [companyName, setCompanyName] = React.useState("");
    const [countryName, setCountryName] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [addressTwo, setAddressTwo] = React.useState("");
    const [town, setTown] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [checkboxLabelTwo, setCheckboxLabelTwo] = React.useState(false);
    const [isError, setIsError] = React.useState([false, false, false, false, false, false, false, false, false, false]);
    const [errorMessage, setErrorMessage] = React.useState({
        firstName: "",
        lastName: "",
        companyName: "",
        countryName: "",
        address: "",
        addressTwo: "",
        town: "",
        country: "",
        phone: "",
        email: ""
    });

    const handleSubmitBilling = (e) => {
        e.preventDefault();
        // This effect runs when the component mounts
        // You can perform any side effects here, such as fetching data
        setIsError([false, false, false, false, false, false, false, false, false, false]);
        if (!firstName) {
            setIsError([true, false, false, false, false, false, false, false, false, false]);
            setErrorMessage({ ...errorMessage, firstName: "First Name is required" });
        }
        if (!lastName) {
            setIsError([false, true, false, false, false, false, false, false, false, false]);
            setErrorMessage({ ...errorMessage, lastName: "Last Name is required" });
        }
        if (!companyName) {
            setIsError([false, false, true, false, false, false, false, false, false, false]);
            setErrorMessage({ ...errorMessage, companyName: "Company Name is required" });
        }
        if (!countryName) {
            setIsError([false, false, false, true, false, false, false, false, false, false]);
            setErrorMessage({ ...errorMessage, countryName: "Country Name is required" });
        }
        if (!address) {
            setIsError([false, false, false, false, true, false, false, false, false, false]);
            setErrorMessage({ ...errorMessage, address: "Address is required" });
        }
        if (!addressTwo) {
            setIsError([false, false, false, false, false, true, false, false, false, false]);
            setErrorMessage({ ...errorMessage, addressTwo: "Address Two is required" });
        }
        if (!town) {
            setIsError([false, false, false, false, false, false, true, false, false, false]);
            setErrorMessage({ ...errorMessage, town: "Town is required" });
        }
        if (!country) {
            setIsError([false, false, false, false, false, false, false, true, false, false]);
            setErrorMessage({ ...errorMessage, country: "Country is required" });
        }
        if (!phone) {
            setIsError([false, false, false, false, false, false, false, false, true, false]);
            setErrorMessage({ ...errorMessage, phone: "Phone is required" });
        }
        if (!email) {
            setIsError([false, false, false, false, false, false, false, false, false, true]);
            setErrorMessage({ ...errorMessage, email: "Email is required" });
        }
    };


    return (
        <OrderContext.Provider value={{
            userId,
            firstName,
            lastName,
            companyName,
            countryName,
            address,
            addressTwo,
            town,
            country,
            phone,
            email,
            checkboxLabelTwo,
            isError,
            errorMessage,
            handleSubmitBilling,
            setUserId,
            setFirstName,
            setLastName,
            setCompanyName,
            setCountryName,
            setAddress,
            setAddressTwo,
            setTown,
            setCountry,
            setPhone,
            setEmail,
            setCheckboxLabelTwo,
            setIsError,
            setErrorMessage
        }}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderProvider;

export const useOrder = () => {
    const context = React.useContext(OrderContext);
    if (context === undefined) {
        throw new Error("useOrder must be used within an OrderProvider");
    }
    return context;
};