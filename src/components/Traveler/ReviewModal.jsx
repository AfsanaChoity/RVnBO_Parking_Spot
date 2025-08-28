import { useState } from "react";
import { Modal, Rate, Input, Button, Spin } from "antd";
import { useSubmitReviewMutation } from "../../redux/api/travelerApi";
import { toast } from "react-hot-toast";  // Import toast from react-hot-toast

const { TextArea } = Input;
const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];

const ReviewModal = ({ open, onClose, landId }) => {
  const [rating, setRating] = useState(3);
  const [reviewText, setReviewText] = useState(""); // Store review text

  const [submitReview, { isLoading, isSuccess, isError, error }] = useSubmitReviewMutation();

  // Handle the review submission
  const handleSubmit = async () => {
    if (!reviewText) {
      toast.error("Review text cannot be empty");
      return;
    }

    try {
      await submitReview({ reviewText, rating, landId }).unwrap();
      toast.success("Review submitted successfully");
      onClose(); // Close modal on success
    } catch (err) {
      toast.error("Failed to submit review");
    }
  };

  return (
    <Modal
      title="Give Review"
      centered
      open={open}
      onOk={handleSubmit} 
      onCancel={onClose}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          loading={isLoading}
        >
          {isLoading ? <Spin /> : "Submit Review"}
        </Button>,
      ]}
    >
      <TextArea
        rows={4}
        placeholder="Give your review here"
        maxLength={300} // You can adjust this if needed
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
      />

      <div className="flex flex-col items-center gap-4 mt-4">
        <Rate
          tooltips={desc}
          onChange={setRating}
          value={rating}
        />
        {rating ? <span>{desc[rating - 1]}</span> : null}
      </div>
    </Modal>
  );
};

export default ReviewModal;
