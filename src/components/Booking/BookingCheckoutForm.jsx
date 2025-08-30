import { Button, Checkbox, Form, Input, Select } from "antd";
import { useState, useEffect } from "react";
import { useCreateBookingMutation } from "../../redux/api/bookingApi";
import toast from "react-hot-toast";
import CodeVerifyModal from "./CodeVerifyModal";


const { Option } = Select;

const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 8 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
};

const tailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } },
};

const usPhoneRegex = /^(\(\d{3}\)\s?\d{3}-\d{4}|\d{3}-\d{3}-\d{4}|\d{10})$/;

const BookingCheckoutForm = ({ landId }) => {
    const [form] = Form.useForm();
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [bookingId, setBookingId] = useState(null);

    const [showVerifyModal, setShowVerifyModal] = useState(false);

    useEffect(() => {
        const storedCheckIn = localStorage.getItem("checkIn");
        const storedCheckOut = localStorage.getItem("checkOut");
        if (storedCheckIn && storedCheckOut) {
            setCheckInDate(storedCheckIn);
            setCheckOutDate(storedCheckOut);
        } else {
            const today = new Date().toISOString().split("T")[0];
            setCheckInDate(today);
            setCheckOutDate(today);
        }
    }, []);

    const [createBooking, { isLoading }] = useCreateBookingMutation();

    const onFinish = async (values) => {
        if (!usPhoneRegex.test(values.phone)) {
            toast.error("Please enter a valid phone number");
            return;
        }

        const storedCheckIn = localStorage.getItem("checkIn");
        const storedCheckOut = localStorage.getItem("checkOut");

        const finalCheckInDate = storedCheckIn || checkInDate; 
        const finalCheckOutDate = storedCheckOut || checkOutDate; 

        // Format dates as YYYY-MM-DD before sending
        const formatDate = (date) => {
            const d = new Date(date);
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, "0");
            const dd = String(d.getDate()).padStart(2, "0");
            return `${yyyy}-${mm}-${dd}`;
        };

        const bookingData = {
            email: values.email,
            name: values.name,
            city: values.city,
            postcode: values.postcode,
            phoneNumber: values.phone, // include country code if needed
            gender: values.gender,
            checkIn: formatDate(finalCheckInDate),   // ✅ YYYY-MM-DD
            checkOut: formatDate(finalCheckOutDate), // ✅ YYYY-MM-DD
        };

        try {
            const response = await createBooking({ bookingData, landId }).unwrap();
            toast.success(response?.message || "Booking created successfully!");
            setBookingId(response.bookingId);
            setShowVerifyModal(true); // open OTP modal after booking
        } catch (err) {
            console.error("Error creating booking:", err);
            const backendError = err?.data?.error || err?.data?.message || "Something went wrong";
            toast.error(backendError);
        }
    };

    

    return (
        <div>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >
                <Form.Item
                    name="email"
                    label={<span style={{ fontWeight: 700 }}>E-mail</span>}
                    rules={[
                        { type: "email", message: "The input is not valid E-mail!" },
                        { required: true, message: "Please input your E-mail!" },
                    ]}
                >
                    <Input placeholder="Enter your registered email" />
                </Form.Item>

                <Form.Item
                    name="name"
                    label={<span style={{ fontWeight: 700 }}>Name</span>}
                    rules={[{ required: true, message: "Please input your name!" }]}
                >
                    <Input placeholder="Enter your registered name" />
                </Form.Item>

                <Form.Item
                    name="city"
                    label={<span style={{ fontWeight: 700 }}>City</span>}
                    rules={[{ required: true, message: "Please input your city!" }]}
                >
                    <Input placeholder="Enter your city" />
                </Form.Item>

                <Form.Item
                    name="postcode"
                    label={<span style={{ fontWeight: 700 }}>Postcode</span>}
                    rules={[{ required: true, message: "Please input your postcode!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label={<span style={{ fontWeight: 700 }}>Phone Number</span>}
                    rules={[{ required: true, message: "Please input your phone number!" }]}
                >
                    <Input
                        placeholder="(123) 456-7890"
                        addonBefore={
                            <Select style={{ width: 70 }} defaultValue="1">
                                <Option value="1">+1</Option>
                            </Select>
                        }
                    />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label={<span style={{ fontWeight: 700 }}>Gender</span>}
                    rules={[{ required: true, message: "Please select gender!" }]}
                >
                    <Select placeholder="Select your gender">
                        <Option value="Male">Male</Option>
                        <Option value="Female">Female</Option>
                        <Option value="Other">Other</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value
                                    ? Promise.resolve()
                                    : Promise.reject(new Error("Should accept agreement")),
                        },
                    ]}
                    {...tailFormItemLayout}
                >
                    <Checkbox>
                        I have read the{" "}
                        <a style={{ color: "#468F9D" }} href="/terms-conditions">
                            terms & conditions
                        </a>
                    </Checkbox>
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        // onClick={onFinish}
                        style={{
                            backgroundColor: "#468F9D",
                            fontWeight: "600",
                            fontSize: 20,
                            padding: "24px 44px",
                        }}
                        loading={isLoading}
                    >
                        Continue
                    </Button>
                </Form.Item>
            </Form>

            {/* ✅ OTP Modal */}
            <CodeVerifyModal
                open={showVerifyModal}
                onClose={() => setShowVerifyModal(false)}
                bookingId={bookingId}   // ✅ pass the id
            />

        </div>
    );
};

export default BookingCheckoutForm;
