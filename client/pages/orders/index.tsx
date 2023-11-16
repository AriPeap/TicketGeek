import React, { FC, useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { buildClient } from "../api/build-client";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "@/hooks/useRequest";
import Link from "next/link";

const OrderIndex = ({
  currentUser,
  orders,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <ul>
        {orders.map((order: any) => {
          return (
            <li key={order.id}>
              {order.ticket.title} - {order.status}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const getServerSideProps = (async (context) => {
  const client = buildClient(context);
  const {
    data: { currentUser },
  } = await client.get("api/users/currentuser");
  const { orderId } = context.query;
  const { data } = await client.get("/api/orders");

  return {
    props: {
      orders: data,
      currentUser,
    },
  };
}) satisfies GetServerSideProps<{
  orders: any;
  currentUser: any;
}>;

export default OrderIndex;
