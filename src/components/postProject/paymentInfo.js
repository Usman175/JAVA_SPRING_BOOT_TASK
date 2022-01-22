import React from "react";
import './postProject.scss'

const PaymentInfoMap = {
    Milestone: {
        head: "Milestone Payments",
        subHeads: {
            "Creating Milestone Payments":
                "The project payment can be made by installments as the project goes fund is being hold until empolyer decide to release the fund.",
            "Releasing Milestone":
                "By releasing payments to the freelancer, it proves client is satisfied with the work completed so far.",
            "Cancel Milestone":
                "Freelancer can cancel the pending payments, and the holding funds will be returned to the employee's account.",
        },
    },
    Hourly: {
        head: "Hourly Work",
        subHeads: {
            "Creating Hourly Work":
                "The part-time system is conducted in a mutually verifiable method,Unlike milestones, regardless of the satisfaction level of the work result, unless it is a violation of Jungle Works It is impossible to refuse payment of the salary, but it can be canceled at any time. The operator's work is verified.",
            "Weekly Billing":
                "The payment is automatically paid every Tuesday of the previous week.",
            "Cancel Milestone":
                "Freelancer can cancel the pending payments, and the holding funds will be returned to the employee's account.",
        },
    },
    Contest: {
        head: "Contest",
        subHeads: {
            "Creating Hourly Work":
                "The part-time system is conducted in a mutually verifiable method,Unlike milestones, regardless of the satisfaction level of the work result, unless it is a violation of Jungle Works It is impossible to refuse payment of the salary, but it can be canceled at any time. The operator's work is verified.",
            "Weekly Billing":
                "The payment is automatically paid every Tuesday of the previous week.",
            "Cancel Milestone":
                "Freelancer can cancel the pending payments, and the holding funds will be returned to the employee's account.",
        },
    },
    OfficeWork: {
        head: "Office Work Contest",
        subHeads: {
            "Creating Office Work Work":
                "The part-time system is conducted in a mutually verifiable method,Unlike milestones, regardless of the satisfaction level of the work result, unless it is a violation of Jungle Works It is impossible to refuse payment of the salary, but it can be canceled at any time. The operator's work is verified.",
            "Agreed Payment Term":
                "The payment is automatically paid every Tuesday of the previous week.",
            "Cancel Milestone":
                "Freelancer can cancel the pending payments, and the holding funds will be returned to the employee's account.",
        },
    },
    FreeContract: {
        head: "Free Contract",
        subHeads: {
            "Creating Free Contract":
                "The part-time system is conducted in a mutually verifiable method,Unlike milestones, regardless of the satisfaction level of the work result, unless it is a violation of Jungle Works It is impossible to refuse payment of the salary, but it can be canceled at any time. The operator's work is verified.",
            "Weekly Billing":
                "The payment is automatically paid every Tuesday of the previous week.",
            "Cancel Milestone":
                "Freelancer can cancel the pending payments, and the holding funds will be returned to the employee's account.",
        },
    },
};

function PaymentInfo({ projectType }) {
    const paymentInfo = PaymentInfoMap[projectType];

    if (!paymentInfo) {
        return null;
    }

    return (
        <div className="map_div">
            <label>{paymentInfo.head}</label>
            {
                Object.entries(paymentInfo.subHeads).map(([key, value]) => (
                    <div key={`${key}`} className="my-2">
                        <span className="font-weight-bold">
                            {key}:&nbsp;&nbsp;
                        </span>
                        <span className="text-justify">{value}</span>
                    </div>
                ))
            }
        </div>
    );
}

export default PaymentInfo;
