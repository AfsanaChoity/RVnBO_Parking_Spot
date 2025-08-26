import { Modal, Button } from "antd"
import { CloseOutlined } from "@ant-design/icons"
import "../../../styles/DeleteModal.css";

export default function DeleteSpot({ isOpen, onConfirm, onCancel }) {
  return (
   <div className="">
     <Modal
      open={isOpen}
      closable={true}
      onCancel={onCancel}
      footer={null}
      centered
      className=""
      closeIcon={<CloseOutlined style={{ fontSize: '14px', color: '#999' }} />}
      wrapClassName="custom-delete-modal"
    >
      <div className=" text-center space-y-4">
        <h2 className=" font-semibold text-xl text-red-500 ">Are you sure !</h2>
        <p className="modal-text">Do you want to delete this?</p>
        <Button type="primary" danger className="confirm-button" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </Modal>
   </div>
  )
}
