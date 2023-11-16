import React, { FC, useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { buildClient } from "../api/build-client";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "@/hooks/useRequest";
import Router from "next/router";

type order = {
  expiresAt: any;
  id: string;
  status: string;
  ticket: any;
};

const OrderShow: FC<{ order: any; currentUser: any }> = ({
  order,
  currentUser,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push("/orders"),
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt).valueOf() - new Date().valueOf();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();

    const timer = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [order]);

  if (timeLeft < 0) return <div>Order expired</div>;

  return (
    <div>
      Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_51OCtxOBY0BccGVJfvsYFZVSngsVZGA8woYV8IeygJJySzf0R8PFnQYwM84Tu4eh0nlnGxOjmY4oV815KLR4xqcpS00ZhFeY43J"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

export const getServerSideProps = (async (context) => {
  const client = buildClient(context);
  const {
    data: { currentUser },
  } = await client.get("api/users/currentuser");
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return {
    props: {
      order: data,
      currentUser,
    },
  };
}) satisfies GetServerSideProps<{
  order: order;
  currentUser: any;
}>;

export default OrderShow;
